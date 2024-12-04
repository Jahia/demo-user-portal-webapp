import {Avatar, Card, CardContent, Grid, Typography} from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Moment from 'react-moment';
import React, {useContext} from 'react';
import {StoreCtx} from '../../../../context';
import {useTranslation} from 'react-i18next';

export const VisitFirst = props => {
    const {t} = useTranslation();
    const {state} = useContext(StoreCtx);
    const {userData} = state;
    const firstVisit = userData?.profileProperties?.firstVisit || '-';

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
                            {t('visits.firstVisit')}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {firstVisit !== '-' &&
                                <Moment format="ll" date={firstVisit}/>}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'error.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <PermContactCalendarIcon/>
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
