import React, {useContext, useState} from 'react';
import {StoreCtx} from '../../../context';
import {DndItem} from '../../dndItem';
import {ItemTypes} from '../../../misc';
import * as Widget from './cmp';
import {Stack} from '@mui/material';

export const VisitsStack = () => {
    const {state} = useContext(StoreCtx);
    const {userPreferences: {blocks, layout}} = state;

    const [blockItems, setBlockItems] = useState(blocks[layout]?.visits ||
        ['VisitLast', 'VisitNumber', 'VisitFirst']
    );

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

        <Stack spacing={2} style={{height: '100%'}}>
            {blockItems.map((blockName, index) => (
                <DndItem key={blockName} id={index} itemType={ItemTypes.VISIT} moveContentProps={moveContentProps}>
                    {getCmp(blockName)}
                </DndItem>
            ))}
        </Stack>

    );
};
