import React, {useContext} from "react";
import {
    Box, Button, Card,
    CardContent, CardHeader, Checkbox,
    Dialog,
    Divider, FormControlLabel, FormGroup
} from "@mui/material";
import PropTypes from "prop-types";
import {JahiaCtx, StoreCtx} from "../../context";
import {/*gql,*/ useQuery} from "@apollo/client";
// import {CORE_NODE_FIELDS} from "../../graphql";
import {getUserContext, getUserPropsInfo} from "../../data/context";
import {CxsCtx} from "../../unomi/cxs";
import {queryJcontentUserCategoryPreferences} from "../../graphql-app";

// const __mocks__categories = ['combustion', 'electric', 'hybrid', 'hydrogen'];

export const SimpleDialog = (props) => {
    const { onClose, open, portalData} = props;
    const nodepath = portalData?.category?.refNode?.path;
    const jExpUserPropsToSync= portalData?.jExpUserPropsToSync?.value;
    const cxs = useContext(CxsCtx);
    const { workspace } = useContext(JahiaCtx);
    const { state, dispatch } = useContext(StoreCtx);
    const { userData, locale } = state;
    const jExpUserPropsValues = userData?.profileProperties?.[jExpUserPropsToSync] || [];
    const form = React.useRef(null);

    const {data, error, loading} = useQuery(queryJcontentUserCategoryPreferences, {
        variables: {
            workspace,
            path:nodepath,
            language: locale,
        }
    });

    const handleClose = () => {
        onClose();
    };

    if (loading) return (
        <Dialog
            fullWidth
            maxWidth="xs"
            onClose={handleClose}
            open={open}
        >
            <p>Loading...</p>
        </Dialog>
    );
    if (error) return (
        <Dialog
            fullWidth
            maxWidth="xs"
            onClose={handleClose}
            open={open}
        >
            <p>Error :(</p>
        </Dialog>
    );

    const jcontentUserCategoryPreferences = data?.jcr?.nodeByPath?.children?.nodes?.map(item => item.displayName) || [];

    const handleSavePreferences = () => {
        const _form = form.current
        const checked = Array.from(_form.querySelectorAll('input[name="jcontentUserCategoryPreferences"]:checked'))
        // console.log("checked.map(check => check.value) : ",checked.map(check => check.value))
        if (window.wem && cxs) {
            // getUserPropsInfo(jExpUserPropsToSync,(propsData)=>{
            //     let eventProps = {
            //         targetId: cxs.profileId,
            //         targetType: "profile"
            //     }
            //     if(propsData.type === 'string'){
            //         if(propsData.multivalued){
            //             eventProps.add = {
            //                 [`properties.${jExpUserPropsToSync}`]: checked.map(check => check.value)
            //             }
            //         }else{
            //             eventProps.update = {
            //                 [`properties.${jExpUserPropsToSync}`]: checked.map(check => check.value).toString()
            //             }
            //         }
            //     }else{
            //         console.warn("UserPreferences props to sync is not a string, cannot sync");
            //     }
            //
            //     const syncUserPreferencesEvent = window.wem.buildEvent('updateProperties');
            //     syncUserPreferencesEvent.properties = eventProps;
            //
            //     window.wem.collectEvent(syncUserPreferencesEvent, function (xhr) {
            //         console.log("UserPreferences sync event done");
            //         getUserContext(cxs,dispatch)
            //     }, function (xhr) {
            //         console.error("UserPreferences oups something get wrong : ", xhr);
            //     })
            // });

            const syncUserPreferencesEvent = window.wem.buildEvent('updateUserPortalProperties',
                window.wem.buildTarget(jExpUserPropsToSync,"user-property"),
                window.wem.buildSource(portalData.uuid,portalData.primaryNodeType.name));
            syncUserPreferencesEvent.properties =  {
                // targetId: cxs.profileId,
                // targetType: "profile",
                update : {
                    [`properties.${jExpUserPropsToSync}`]: checked.map(check => check.value)
                }
            };

            window.wem.collectEvent(syncUserPreferencesEvent, function (xhr) {
                console.log("UserPreferences sync event done");
                getUserContext(cxs,dispatch)
            }, function (xhr) {
                console.error("UserPreferences oups something get wrong : ", xhr);
            })

        }
        onClose();
        // if(cxs)
        //     setTimeout(()=>getUserContext(cxs,dispatch),200);
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            onClose={handleClose}
            open={open}
        >
            <form
                ref={form}
                autoComplete="off"
                noValidate
                {...props}
            >
                <Card>
                    <CardHeader
                        subheader="Select your preferred categories"
                        title="Preferences"
                    />
                    <Divider />
                    <CardContent>
                        <FormGroup>
                            {jcontentUserCategoryPreferences.map(jcontentCategory =>
                                <FormControlLabel
                                    key={jcontentCategory}
                                    control={<Checkbox value={jcontentCategory.toLowerCase()} name="jcontentUserCategoryPreferences" defaultChecked={jExpUserPropsValues.includes(jcontentCategory.toLowerCase())} />}
                                    label={jcontentCategory}
                                />
                            )}

                        </FormGroup>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSavePreferences}
                        >
                            Save preferences
                        </Button>
                    </Box>
                </Card>
            </form>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
    nodepath:PropTypes.string.isRequired,
    jExpUserPropsToSync:PropTypes.string
};
