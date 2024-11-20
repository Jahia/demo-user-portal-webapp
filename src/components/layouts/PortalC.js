import React, {useContext, useState} from "react";
import {Box, Container, Grid} from "@mui/material";
import {DndItem} from "../dndItem";
import {ItemTypes} from "../../misc";
import {ProductCard} from "../user";
import {StoreCtx} from "../../context";
import * as Widget from "../widget";

export const PortalC = () => {
    const {state} = useContext(StoreCtx);
    const {portalData: {products},leadsOrOrderCmpName, userPreferences} = state;
    const [blockItems, setBlockItems] = useState(userPreferences?.blocks?.PortalC?.main ||
        ["VisitsGridRow", "AccountProfile", leadsOrOrderCmpName,"Ads","MultiChart","Chart"]
    );

    const moveContentProps = {
        portal:"PortalC",
        blocks:"main",
        setBlockItems
    }
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
                    {getCmp(blockItems[0])}

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} md={3}>
                                <DndItem id={1} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[1])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                <DndItem id={2} itemType={ItemTypes.LG} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[2])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <ProductCard product={products[0]}/>
                            </Grid>
                            <Grid item xs={6}>
                                <DndItem id={3} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[3])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={9}>
                                <DndItem id={4} itemType={ItemTypes.LG} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[4])}
                                </DndItem>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <DndItem id={5} itemType={ItemTypes.MD} moveContentProps={moveContentProps}>
                                    {getCmp(blockItems[5])}
                                </DndItem>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}
