import React, {useContext, useEffect, useMemo, useState} from 'react';
import {StoreCtx} from '../../../context';
import {DndItem} from '../../dndItem';
import {ItemTypes} from '../../../misc';
import * as Widget from './cmp';
import {Grid} from '@mui/material';

export const VisitsGridRow = () => {
    const {state} = useContext(StoreCtx);
    const {userPreferences: {blocks, layout}, isReset} = state;
    const defaultBlocks = useMemo(
        () => ['VisitLast', 'VisitNumber', 'VisitFirst'],
        []
    );
    const [blockItems, setBlockItems] = useState(blocks[layout]?.visits || defaultBlocks);

    useEffect(() => {
        if (isReset) {
            setBlockItems([...defaultBlocks]);
            // IsReset is toggle a Portal level
        }
    }, [defaultBlocks, isReset, setBlockItems]);

    const moveContentProps = {
        portal: layout,
        blocks: 'visits',
        setBlockItems
    };

    const getCmp = item => {
        const Cmp = Widget[item];
        return <Cmp/>;
    };

    return (
        <>
            {
                blockItems.map(blockName => (
                    <Grid key={blockName} item xs={12} md={4}>
                        <DndItem id={blockName} itemType={ItemTypes.VISIT} moveContentProps={moveContentProps}>
                            {getCmp(blockName)}
                        </DndItem>
                    </Grid>
                ))
            }
        </>

    );
};
