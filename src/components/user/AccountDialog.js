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
import {getUserContext} from "../../data/context";
import {CxsCtx} from "../../unomi/cxs";
import {queryEnergyPreferences} from "../../graphql-app";

// const __mocks__categories = ['combustion', 'electric', 'hybrid', 'hydrogen'];

export const SimpleDialog = (props) => {
    const { onClose, open, nodepath } = props;
    const cxs = useContext(CxsCtx);
    const { workspace } = useContext(JahiaCtx);
    const { state, dispatch } = useContext(StoreCtx);
    const { userData, locale } = state;
    const userCategories = userData?.profileProperties?.sfdc__energyPreferences || [];
    const form = React.useRef(null);

    const {data, error, loading} = useQuery(queryEnergyPreferences, {
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

    const sysCategories = data?.jcr?.nodeByPath?.children?.nodes?.map(item => item.displayName) || [];

    const handleSavePreferences = () => {
        const _form = form.current
        const checked = Array.from(_form.querySelectorAll('input[name="categories2energyPreferences"]:checked'))
        // console.log("checked.map(check => check.value) : ",checked.map(check => check.value))
        if (window.wem) {
            const energyPreferencesFormEvent = window.wem.buildFormEvent('loggedUserEnergyPreferences');
            energyPreferencesFormEvent.properties = {
                categories2energyPreferences:checked.map(check => check.value)
            };

            window.wem.collectEvent(energyPreferencesFormEvent, function (xhr) {
                console.log("EnergyPreferences form submit event done");
            }, function (xhr) {
                console.error("EnergyPreferences oups something get wrong : ", xhr);
            })
        }
        onClose();
        if(cxs)
            setTimeout(()=>getUserContext(cxs,dispatch),200);
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
                            {sysCategories.map(category =>
                                <FormControlLabel
                                    key={category}
                                    control={<Checkbox value={category.toLowerCase()} name="categories2energyPreferences" defaultChecked={userCategories.includes(category.toLowerCase())} />}
                                    label={category}
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
    nodepath:PropTypes.string.isRequired
};
