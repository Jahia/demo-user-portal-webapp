import PropTypes from 'prop-types';
import {Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography} from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import React from "react";
import Moment from "react-moment";
import * as Muicon from "@mui/icons-material";

export const ProductCard = ({ product, ...rest }) => {
    // const {icon:Icon }= product;
    const Icon = Muicon[product.icon];
    return(
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            {...rest}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                    }}
                >
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.dark',
                            height: 56,
                            width: 56
                        }}
                    >
                        <Icon fontSize="large"/>
                    </Avatar>
                </Box>
                <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {product.title}
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                >
                    {product.description}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Box sx={{ p: 2 }}>
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <AccessTimeFilledIcon color="action"/>
                        <Typography
                            color="textSecondary"
                            display="inline"
                            sx={{ pl: 1 }}
                            variant="body2"
                        >
                            Expire <Moment fromNow date={product.expiredAt}/>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Button
                            // color="primary"
                            sx={{
                                pl: 1 ,
                                color:'primary.dark'
                            }}
                            variant="outlined"
                            startIcon={<AutorenewIcon/>}
                        >
                            Renouveller
                        </Button>
                        {/*<AutorenewIcon color="action" />*/}
                        {/*<DownloadIcon color="action" />*/}
                        {/*<Typography*/}
                        {/*    color="textSecondary"*/}
                        {/*    display="inline"*/}
                        {/*    sx={{ pl: 1 }}*/}
                        {/*    variant="body2"*/}
                        {/*>*/}
                        {/*    {product.totalDownloads}*/}
                        {/*    {' '}*/}
                        {/*    Downloads*/}
                        {/*</Typography>*/}
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};
