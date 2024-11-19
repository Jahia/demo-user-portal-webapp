import React, {useContext, useState} from "react";
import {Box, Container, Grid, Stack} from "@mui/material";
import {DndItem} from "../dndItem";
import {ItemTypes} from "../../misc";
import {ProductCard} from "../user";
import * as Widget from "../widget"
import {JahiaCtx, StoreCtx} from "../../context";

export const PortalB = () => {
    const {workspace} = useContext(JahiaCtx);
    const {state, dispatch} = useContext(StoreCtx);
    const {portalData: {products},leadsOrOrderCmpName, userPreferences} = state;
    const [blockItems, setBlockItems] = useState(userPreferences?.blocks['PortalB'] ||
        ["AccountProfile","VisitLast","VisitNumber","VisitFirst",leadsOrOrderCmpName,"Chart","Ads","MultiChart"]
    );

    const moveContent = (fromId, toId) => {
        setBlockItems((prevItems) => {
            const newItems = [...prevItems];
            [newItems[fromId], newItems[toId]] = [newItems[toId], newItems[fromId]];
            dispatch({
                type: "PORTAL_LAYOUT_BLOCS_UPDATE",
                payload: {
                    workspace,
                    blocks: {
                        "PortalB":newItems
                    }
                }
            });
            return newItems;
        });
    };

    const getCmp = (item) => {
        const Cmp = Widget[item]
        return <Cmp/>
    }

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
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <DndItem id={0} itemType={ItemTypes.MD} moveContent={moveContent}>
                                    {getCmp(blockItems[0])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ProductCard product={products[0]}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={2}>
                                {blockItems.map((blockName,index) => (
                                    <DndItem id={index} itemType={ItemTypes.VISIT} moveContent={moveContent}>
                                        {getCmp(blockName)}
                                    </DndItem>
                                ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <DndItem id={4} itemType={ItemTypes.LG} moveContent={moveContent}>
                                    {getCmp(blockItems[4])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <DndItem id={5} itemType={ItemTypes.MD} moveContent={moveContent}>
                                    {getCmp(blockItems[5])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <DndItem id={6} itemType={ItemTypes.MD} moveContent={moveContent}>
                                    {getCmp(blockItems[6])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <DndItem id={7} itemType={ItemTypes.LG} moveContent={moveContent}>
                                    {getCmp(blockItems[7])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
