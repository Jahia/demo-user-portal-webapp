import React, {useContext, useState} from 'react';
import {Box, Container, Grid} from '@mui/material';
import {DndItem} from '../dndItem';
import {ItemTypes} from '../../misc';
import {ProductCard} from '../user';
import * as Widget from '../widget';
import {StoreCtx} from '../../context';

export const PortalB = () => {
    const {state} = useContext(StoreCtx);
    const {portalData: {products}, leadsOrOrderCmpName, userPreferences} = state;
    const [blockItems, setBlockItems] = useState(userPreferences?.blocks?.PortalB?.main ||
        ['AccountProfile', 'VisitsStack', leadsOrOrderCmpName, 'Chart', 'Ads', 'MultiChart']
    );

    const moveContentProps = {
        portal: 'PortalB',
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
                            <Grid item xs={12} md={4}>
                                <DndItem id={blockItems[0]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[0])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ProductCard product={products[0]}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <DndItem id={blockItems[1]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[1])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <DndItem id={blockItems[2]} itemType={ItemTypes.LG} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[2])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <DndItem id={blockItems[3]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[3])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <DndItem id={blockItems[4]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[4])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={8}>
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
