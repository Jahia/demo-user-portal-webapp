import PropTypes from 'prop-types';
import {Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography} from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import React, {useContext} from 'react';
import Moment from 'react-moment';
import * as Muicon from '@mui/icons-material';
import {StoreCtx} from '../../context';

export const ProductCard = ({product, ...rest}) => {
    const {state} = useContext(StoreCtx);
    const {portalData: {products}} = state;
    const _product = product || products[0];

    const Icon = Muicon[_product.icon];
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            {...rest}
        >
            <CardContent sx={{flexGrow: 1}}>
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
                    gutterBottom
                    align="center"
                    color="textPrimary"
                    variant="h5"
                >
                    {_product.title}
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                >
                    {_product.description}
                </Typography>
            </CardContent>
            <Divider/>
            <Box sx={{p: 1}}>
                <Grid
                    container
                    spacing={2}
                    sx={{justifyContent: 'space-between'}}
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
                            sx={{pl: 1}}
                            variant="body2"
                        >
                            Expires <Moment fromNow date={_product.expiredAt}/>
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
                            // Color="primary"
                            sx={{
                                pl: 1,
                                color: 'primary.dark'
                            }}
                            variant="outlined"
                            startIcon={<AutorenewIcon/>}
                        >
                            Renew
                        </Button>
                        {/* <AutorenewIcon color="action" /> */}
                        {/* <DownloadIcon color="action" /> */}
                        {/* <Typography */}
                        {/*    color="textSecondary" */}
                        {/*    display="inline" */}
                        {/*    sx={{ pl: 1 }} */}
                        {/*    variant="body2" */}
                        {/* > */}
                        {/*    {product.totalDownloads} */}
                        {/*    {' '} */}
                        {/*    Downloads */}
                        {/* </Typography> */}
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object
};
