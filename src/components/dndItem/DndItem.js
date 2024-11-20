import React, {useContext} from 'react';
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd';
import {styled} from "@mui/material";
import {JahiaCtx, StoreCtx} from "../../context";


const DndDiv = styled("div")(({ theme, isOver, isDragging }) => ({
    position: "relative",
    height: "100%",
    opacity: isDragging ? 0.5 : 1,
    "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isOver && !isDragging ? '#d3ffd3' : 'transparent',
        opacity: isOver ? 0.5 : 0,
        pointerEvents: "none", // Allows interactions with parent content
    },
}));

const moveContent = ({fromId, toId,setBlockItems,dispatch,workspace,portal,blocks}) => {
    setBlockItems((prevItems) => {
        const newItems = [...prevItems];
        [newItems[fromId], newItems[toId]] = [newItems[toId], newItems[fromId]];
        dispatch({
            type: "PORTAL_LAYOUT_BLOCS_UPDATE",
            payload: {
                workspace,
                blocks: {
                    [portal]: {
                        [blocks]:newItems
                    }
                }
            }
        });
        return newItems;
    });
};

export const DndItem = ({ id, itemType, moveContentProps, children }) => {
    const {workspace} = useContext(JahiaCtx);
    const {dispatch} = useContext(StoreCtx);
    const {portal,blocks,setBlockItems} = moveContentProps

    const [{ isDragging }, drag] = useDrag(() => ({
        type: itemType,
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [{ isOver }, drop] = useDrop(() => ({
        accept: itemType,
        drop: (draggedItem) => moveContent({
            fromId: draggedItem.id,
            toId:id,
            setBlockItems,
            dispatch,
            workspace,
            portal,
            blocks
        }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
    }));



    return (
        <DndDiv
            ref={(node) => drag(drop(node))}
            isOver={isOver}
            isDragging={isDragging}
        >
            {children}
        </DndDiv>
    );
};

DndItem.propTypes = {
    id: PropTypes.number.isRequired,
    itemType: PropTypes.string.isRequired,
    moveContentProps: PropTypes.object.isRequired,
    children: PropTypes.element
};
