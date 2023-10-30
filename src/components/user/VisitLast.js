import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Moment from "react-moment";
import React, {useContext} from "react";
import {StoreCtx} from "../../context";

export const VisitLast = (props) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const lastVisit = userData?.profileProperties?.lastVisit || "-";

    return(

        <Card
            sx={{ height: '100%' }}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            Last visit
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {lastVisit!=="-" &&
                                <Moment fromNow date={lastVisit}/>
                            }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <ScheduleIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        pt: 2,*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center'*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ArrowDownwardIcon color="error" />*/}
                {/*    <Typography*/}
                {/*        color="error"*/}
                {/*        sx={{*/}
                {/*            mr: 1*/}
                {/*        }}*/}
                {/*        variant="body2"*/}
                {/*    >*/}
                {/*        12%*/}
                {/*    </Typography>*/}
                {/*    <Typography*/}
                {/*        color="textSecondary"*/}
                {/*        variant="caption"*/}
                {/*    >*/}
                {/*        Since last month*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
            </CardContent>
        </Card>
    );
}
