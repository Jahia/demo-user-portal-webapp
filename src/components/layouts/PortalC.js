import React, {useContext, useState} from "react";
import {Box, Container, Grid} from "@mui/material";
import {DndItem} from "../dndItem";
import {ItemTypes} from "../../misc";
import {AccountProfile, ProductCard} from "../user";
import * as Visit from "../user"
import {Chart, MultiChart} from "../charts";
import {Ads} from "../ads";
import {JahiaCtx, StoreCtx} from "../../context";
import * as Widget from "../widget";

export const PortalC = () => {
    const {workspace} = useContext(JahiaCtx);
    const {state, dispatch} = useContext(StoreCtx);
    const {portalData: {products},leadsOrOrderCmpName, userPreferences} = state;
    const [blockItems, setBlockItems] = useState(userPreferences?.blocks['PortalC'] ||
        ["VisitLast", "VisitNumber", "VisitFirst"]
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
                        "PortalA2": newItems
                    }
                }
            });
            return newItems;
        });
    };

    const getCmp = (item) => {
        const Cmp = Visit[item]
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
                    {blockItems.map((blockName, index) => (
                        <Grid item xs={12} md={4} key={`${blockName}-${index}`}>
                            <DndItem id={index} itemType={ItemTypes.VISIT} moveContent={moveContent}>
                                {getCmp(blockName)}
                            </DndItem>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} md={3}>
                                <AccountProfile />
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                {React.createElement(Widget[leadsOrOrderCmpName])}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <ProductCard product={products[0]}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Ads/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={9}>
                                <MultiChart/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Chart/>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}
