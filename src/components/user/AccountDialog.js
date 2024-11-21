import React, {useContext} from 'react';
import {
    Box, Button, Card,
    CardContent, CardHeader, Checkbox,
    Dialog,
    Divider, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch
} from '@mui/material';
import PropTypes from 'prop-types';
import {JahiaCtx, StoreCtx} from '../../context';
import {useQuery} from '@apollo/client';

import {getUserContext} from '../../data/context';
import {CxsCtx} from '../../context';
import {queryJcontentUserCategoryPreferences} from '../../graphql-app';
import * as layouts from '../layouts';
import {useTranslation} from 'react-i18next';

export const SimpleDialog = ({onClose, isOpen, portalData, layout, ...props}) => {
    const {t} = useTranslation();
    const nodepath = portalData?.category?.refNode?.path;
    const jExpUserPropsToSync = portalData?.jExpUserPropsToSync?.value;
    const cxs = useContext(CxsCtx);
    const {workspace} = useContext(JahiaCtx);
    const {state, dispatch} = useContext(StoreCtx);
    const {userData, locale} = state;

    const [jExpUserPropsValues, setJExpUserPropsValues] = React.useState([]);
    const [selectedLayout, setSelectedLayout] = React.useState(layout);

    const profileProperties = React.useMemo(() => userData?.profileProperties, [userData]);

    React.useEffect(() => {
        if (profileProperties && profileProperties[jExpUserPropsToSync]) {
            setJExpUserPropsValues(profileProperties[jExpUserPropsToSync]);
        }
    }, [profileProperties, jExpUserPropsToSync]);

    const {data, error, loading} = useQuery(queryJcontentUserCategoryPreferences, {
        variables: {
            workspace,
            path: nodepath,
            language: locale
        }
    });

    const handleClose = () => {
        onClose();
    };

    if (loading) {
        return (
            <Dialog
            fullWidth
            maxWidth="xs"
            open={isOpen}
            onClose={handleClose}
            >
                <p>Loading...</p>
            </Dialog>
        );
    }

    if (error) {
        return (
            <Dialog
            fullWidth
            maxWidth="xs"
            open={isOpen}
            onClose={handleClose}
            >
                <p>Error :(</p>
            </Dialog>
        );
    }

    const jcontentUserCategoryPreferences = data?.jcr?.nodeByPath?.children?.nodes?.map(item => item.displayName) || [];

    const handleSavePreferences = event => {
        const form = event.target.form;
        const checked = Array.from(form.querySelectorAll('input[name="jcontentUserCategoryPreferences"]:checked'));
        const isReset = Array.from(form.querySelectorAll('input[name="resetPortalPref"]:checked'));
        dispatch({
            type: 'UPDATE_PORTAL_LAYOUT_PREFERENCE',
            payload: {
                workspace,
                layout: selectedLayout,
                isReset: isReset[0]?.checked
            }
        });

        if (window.wem && cxs) {
            const syncUserPreferencesEvent = window.wem.buildEvent('updateUserPortalData',
                window.wem.buildTarget(jExpUserPropsToSync, 'user-property'),
                window.wem.buildSource(portalData.uuid, portalData.primaryNodeType.name));

            syncUserPreferencesEvent.properties = {
                update: {
                    [`properties.${jExpUserPropsToSync}`]: checked.map(check => check.value)
                }
            };

            window.wem.collectEvent(syncUserPreferencesEvent, function (/* xhr */) {
                console.log('UserPreferences sync event done');
                getUserContext(cxs, dispatch);
                onClose();
            }, function (xhr) {
                console.error('UserPreferences oups something get wrong : ', xhr);
            });
        } else {
            onClose();
        }
    };

    const handleChange = event => {
        const elt = event.target;
        if (elt.checked) {
            setJExpUserPropsValues([...jExpUserPropsValues, elt.value]);
        } else {
            setJExpUserPropsValues(jExpUserPropsValues.filter(item => item !== elt.value));
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={isOpen}
            onClose={handleClose}
        >
            <form
                // Ref={form}
                noValidate
                autoComplete="off"
                {...props}
            >
                <Card>
                    <CardHeader
                        subheader="Edit your preferences"
                        title="Preferences"
                    />
                    <Divider/>
                    <CardContent>
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                            <InputLabel id="userPortalLayout">Layout</InputLabel>
                            <Select
                                labelId="userPortalLayout"
                                id="userPortalLayoutSelector"
                                value={selectedLayout}
                                label="Layout"
                                onChange={e => setSelectedLayout(e.target.value)}
                            >
                                {Object.keys(layouts).map(layout => <MenuItem key={layout} value={layout}>{t(`layout.${layout}`)}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormGroup>
                            <FormControlLabel
                                required
                                control={<Switch name="resetPortalPref"/>}
                                label={t('layout.resetLayout')}
                            />
                        </FormGroup>
                        <Divider sx={{margin: '1.5rem 0'}}/>
                        <FormGroup>
                            {jcontentUserCategoryPreferences.map(jcontentCategory => (
                                <FormControlLabel
                                    key={jcontentCategory}
                                    value={jcontentCategory}
                                    control={<Checkbox value={jcontentCategory.toLowerCase()}
                                                       name="jcontentUserCategoryPreferences"/>}
                                    label={jcontentCategory}
                                    checked={jExpUserPropsValues.includes(jcontentCategory.toLowerCase())}
                                    onChange={handleChange}
                                />
                              )
                            )}

                        </FormGroup>
                    </CardContent>
                    <Divider/>
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
};

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    portalData: PropTypes.object.isRequired,
    layout: PropTypes.string
};
