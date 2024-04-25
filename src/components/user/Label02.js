import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import React, {useContext} from "react";
import {StoreCtx} from "../../context";

export const Label02 = ({portalData,props}) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const label02ValueCDP = userData?.profileProperties?._up_labe02Value || "-";

    const label02Text = portalData?.label02Text?.value  || "-";
    const label02Value = portalData?.label02Value?.value || "-";
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
                            {label02Text!=="-" &&
                            label02Text
                            }
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {label02ValueCDP !== "-" ? (
                                <span>{label02ValueCDP}</span>
                            ) : (
                                label02Value !== "-" && <span>{label02Value}</span>
                            )}
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
                            <PriceCheckIcon />
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
