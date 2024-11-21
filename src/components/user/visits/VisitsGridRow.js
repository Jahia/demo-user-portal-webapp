import React, {useContext, useState} from 'react';
import {StoreCtx} from '../../../context';
import {DndItem} from '../../dndItem';
import {ItemTypes} from '../../../misc';
import * as Widget from './cmp';
import {Grid} from '@mui/material';

export const VisitsGridRow = () => {
    const {state} = useContext(StoreCtx);
    const {userPreferences: {blocks, layout}} = state;
    const [blockItems, setBlockItems] = useState(blocks[layout]?.visits || ['VisitLast', 'VisitNumber', 'VisitFirst']);

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
