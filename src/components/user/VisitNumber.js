import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import React, {useContext} from "react";
import {StoreCtx} from "../../context";

export const VisitNumber = (props) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const nbOfVisits = userData?.profileProperties?.nbOfVisits || "-";

    return(
        <Card
            sx={{ height: '100%', backgroundColor: 'transparent' }}
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
                            Number of visit
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
                            <AccessibilityNewIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
