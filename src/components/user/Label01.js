import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import React, {useContext} from "react";
import {StoreCtx} from "../../context";
import ScheduleIcon from "@mui/icons-material/Schedule";

export const Label01 = ({portalData,props}) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const label01ValueCDP = userData?.profileProperties?._up_labe01Value || "-";

    const label01Text = portalData?.label01Text?.value  || "-";
    const label01Value = portalData?.label01Value?.value || "-";
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
                            {label01Text!=="-" &&
                            label01Text
                            }
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {label01ValueCDP !== "-" ? (
                                <span>{label01ValueCDP}</span>
                            ) : (
                                label01Value !== "-" && <span>{label01Value}</span>
                            )}
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
