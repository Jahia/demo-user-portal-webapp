import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import React, {useContext} from "react";
import {StoreCtx} from "../../context";

export const VisitNumber = (props) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const nbOfVisits = userData?.profileProperties?.nbOfVisits || "-";
    const subsAmount = userData?.profileProperties?._ins_subscription_amount || "-";


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
                            next premium due
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {subsAmount}
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
                            <AccessibilityNewIcon />
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
