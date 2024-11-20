import React, {useContext, useState} from "react";
import {StoreCtx} from "../../../context";
import {DndItem} from "../../dndItem";
import {ItemTypes} from "../../../misc";
import * as Widget from "./cmp"
import {Grid} from "@mui/material";

export const VisitsGridRow = () => {
    const { state } = useContext(StoreCtx);
    const {userPreferences : {blocks,layout}} = state;
    const [blockItems, setBlockItems] = useState(blocks[layout]?.visits ||
        ["VisitLast","VisitNumber","VisitFirst"]
    );

    const moveContentProps = {
        portal:layout,
        blocks:"visits",
        setBlockItems
    }

    const getCmp = (item) => {
        const Cmp = Widget[item]
        return <Cmp/>
    }

    return(
        <>
            {
                blockItems.map((blockName,index) => (
                    <Grid item xs={12} md={4} key={blockName}>
                        <DndItem id={index} itemType={ItemTypes.VISIT} moveContentProps={moveContentProps}>
                            {getCmp(blockName)}
                        </DndItem>
                    </Grid>
                ))
            }
        </>

    )
}
