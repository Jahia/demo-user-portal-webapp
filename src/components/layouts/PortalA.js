import React, {useContext, useState} from "react";
import {Box, Container, Grid} from "@mui/material";
import {DndItem} from "../dndItem";
import {ItemTypes} from "../../misc";
import {AccountProfile, ProductCard, VisitFirst, VisitLast, VisitNumber} from "../user";
import {Chart} from "../misc";
import {Leads} from "../sfdc";
import {Orders} from "../e-shop";
import {Ads} from "../ads";
import {MultiChart} from "../misc/MultiChart";
import {StoreCtx} from "../../context";
import {products as mocksProducts} from "../../__mocks__";

export const PortalA = () => {
    const {state} = useContext(StoreCtx);
    const {portalData/*,userPreferences*/} = state;
    const [visitItems, setVisitItems] = useState({
        1: <VisitLast/>,
        2: <VisitNumber/>,
        3: <VisitFirst/>,
    });

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
        setVisitItems((prevItems) => {
            const newItems = {...prevItems};
            [newItems[fromId], newItems[toId]] = [newItems[toId], newItems[fromId]];
            return newItems;
        });
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
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    {Object.keys(visitItems).map((id) => (
                        <Grid item xs={12} md={4} key={id}>
                            <DndItem id={id} itemType={ItemTypes.VISIT} moveContent={moveContent}>
                                {visitItems[id]}
                            </DndItem>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={4} md={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <AccountProfile portalData={portalData}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chart customChartData={customChartData}/>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={8} md={9}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        {show === "leads" &&
                                            <Leads customLeadsData={customLeadsData}/>
                                        }
                                        {show === "orders" &&
                                            <Orders customOrdersData={customOrdersData}/>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Grid
                                                container
                                                spacing={3}
                                            >
                                                <Grid
                                                    item
                                                    key={products[0].id}
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <ProductCard product={products[0]}/>
                                                </Grid>


                                                <Grid
                                                    item
                                                    key={portalData?.personalizedAds?.uuid}
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <Ads adsId={portalData?.personalizedAds?.refNode?.uuid}
                                                         jExpUserPropsToSync={portalData?.jExpUserPropsToSync?.value}/>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MultiChart customMultiChartData={customMultiChartData}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
