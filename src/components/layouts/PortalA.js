import React, {useContext, useEffect, useState} from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import {DndItem} from '../dndItem';
import {ItemTypes} from '../../misc';
import {ProductCard} from '../user';
import {StoreCtx} from '../../context';
import * as Widget from '../widget';

export const PortalA = () => {
    const {state} = useContext(StoreCtx);
    const {portalData: {products}, leadsOrOrderCmpName, userPreferences} = state;
    const [blockItems, setBlockItems] = useState(userPreferences?.blocks?.PortalA?.main ||
        ['VisitsGridRow', 'AccountProfile', 'Chart', leadsOrOrderCmpName, 'Ads', 'MultiChart']
    );

    const moveContentProps = {
        portal: 'PortalA',
        blocks: 'main',
        setBlockItems
    };

    const getCmp = item => {
        const Cmp = Widget[item];
        return <Cmp/>;
    };

    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {getCmp(blockItems[0])}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={4} md={3}>
                                <Stack spacing={3} height="100%">
                                    <DndItem id={blockItems[1]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                        {getCmp(blockItems[1])}
                                    </DndItem>
                                    <DndItem id={blockItems[2]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                        {getCmp(blockItems[2])}
                                    </DndItem>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={8} md={9}>
                                <Stack spacing={3} height="100%">
                                    <DndItem id={blockItems[3]} itemType={ItemTypes.LG} moveContentProps={moveContentProps}>
                                        {getCmp(blockItems[3])}
                                    </DndItem>
                                    <Box>
                                        <Grid container spacing={3}>
                                            <Grid item md={6} xs={12}>
                                                <ProductCard product={products[0]}/>
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <DndItem id={blockItems[4]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                                    {getCmp(blockItems[4])}
                                                </DndItem>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DndItem id={blockItems[5]} itemType={ItemTypes.LG} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[5])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
