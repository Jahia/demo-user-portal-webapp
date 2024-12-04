import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Box, Container, Grid} from '@mui/material';
import {DndItem} from '../dndItem';
import {ItemTypes} from '../../misc';
import * as Widget from '../widget';
import {StoreCtx} from '../../context';

export const PortalB = () => {
    const {state, dispatch} = useContext(StoreCtx);
    const {leadsOrOrderCmpName, userPreferences, isReset} = state;
    const defaultBlocks = useMemo(
        () => ['AccountProfile', 'Ads', 'VisitsStack', leadsOrOrderCmpName, 'ProductCard', 'Chart', 'MultiChart'],
        [leadsOrOrderCmpName]
    );

    const [blockItems, setBlockItems] = useState(userPreferences?.blocks?.PortalB?.main ||
        defaultBlocks
    );

    useEffect(() => {
        if (isReset) {
            setBlockItems([...defaultBlocks]);
            dispatch({
                type: 'TOGGLE_IS_RESET',
                payload: {
                    isReset: false
                }
            });
        }
    }, [defaultBlocks, dispatch, isReset, setBlockItems]);

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
                                <DndItem id={blockItems[1]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[1])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <DndItem id={blockItems[2]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[2])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <DndItem id={blockItems[3]} itemType={ItemTypes.LG} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[3])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <DndItem id={blockItems[4]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[4])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <DndItem id={blockItems[5]} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[5])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <DndItem id={blockItems[6]} itemType={ItemTypes.LG} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[6])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
