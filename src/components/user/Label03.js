import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import React, {useContext} from "react";
import {StoreCtx} from "../../context";

export const Label03 = ({portalData,props}) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const label03ValueCDP = userData?.profileProperties?._up_labe03Value || "-";

    const label03Text = portalData?.label03Text?.value  || "-";
    const label03Value = portalData?.label03Value?.value || "-";
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
                            {label03Text!=="-" &&
                            label03Text
                            }
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {label03ValueCDP !== "-" ? (
                                <span>{label03ValueCDP}</span>
                            ) : (
                                label03Value !== "-" && <span>{label03Value}</span>
                            )}
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
                            <TrendingUpIcon />
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
