import React, {useContext, useState} from "react";
import {Box, Container, Grid, Stack} from "@mui/material";
import {DndItem} from "../dndItem";
import {ItemTypes} from "../../misc";
import {AccountProfile, ProductCard} from "../user";
import * as Visit from "../user"
import {Chart} from "../misc";
import {Leads} from "../sfdc";
import {Orders} from "../e-shop";
import {Ads} from "../ads";
import {MultiChart} from "../misc/MultiChart";
import {JahiaCtx, StoreCtx} from "../../context";
import {products as mocksProducts} from "../../__mocks__";

export const PortalB = () => {
    const {workspace} = useContext(JahiaCtx);
    const {state, dispatch} = useContext(StoreCtx);
    const {portalData,userPreferences} = state;
    const [blockItems, setBlockItems] = useState(userPreferences?.blocks['PortalB'] ||
        ["VisitLast","VisitNumber","VisitFirst"]
    );



    let products = mocksProducts;
    const customProducts = portalData?.products?.value || portalData?.mocks?.refNode?.products?.value;
    if (typeof customProducts === 'string') {
        try {
            products = JSON.parse(customProducts);
        } catch (e) {
            console.error("products property => \n" + customProducts + "\n => is not a json object : ", e);
        }
    }

    const customChartData = portalData?.chart?.value || portalData?.mocks?.refNode?.chart?.value;
    const customLeadsData = portalData?.leads?.value || portalData?.mocks?.refNode?.leads?.value;
    const customOrdersData = portalData?.orders?.value || portalData?.mocks?.refNode?.orders?.value;
    const customMultiChartData = portalData?.salesChart?.value || portalData?.mocks?.refNode?.salesChart?.value;

    const show = customLeadsData ? "leads" : customOrdersData ? "orders" : "leads";

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
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <AccountProfile portalData={portalData}/>
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
                                {show === "leads" &&
                                    <Leads customLeadsData={customLeadsData}/>
                                }
                                {show === "orders" &&
                                    <Orders customOrdersData={customOrdersData}/>
                                }
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Chart customChartData={customChartData}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Ads adsId={portalData?.personalizedAds?.refNode?.uuid}
                                     jExpUserPropsToSync={portalData?.jExpUserPropsToSync?.value}/>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <MultiChart customMultiChartData={customMultiChartData}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
