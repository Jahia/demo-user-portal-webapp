import {Avatar, Card, CardContent, Grid, Typography} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import React, {useContext} from 'react';
import {StoreCtx} from '../../../../context';
import {useTranslation} from 'react-i18next';

export const VisitNumber = props => {
    const {t} = useTranslation();
    const {state} = useContext(StoreCtx);
    const {userData} = state;
    const nbOfVisits = userData?.profileProperties?.nbOfVisits || '-';

    return (
        <Card
            sx={{height: '100%'}}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{justifyContent: 'space-between'}}
                >
                    <Grid item>
                        <Typography
                            gutterBottom
                            color="textSecondary"
                            variant="overline"
                        >
                            {t('visits.numberOfVisit')}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {nbOfVisits}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'warning.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <AccessibilityNewIcon/>
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
