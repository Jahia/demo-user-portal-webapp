import React from 'react';
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd';

export const DndItem = ({ id, itemType, moveContent, children }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: itemType,
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [{ isOver }, drop] = useDrop(() => ({
        accept: itemType,
        drop: (draggedItem) => moveContent(draggedItem.id, id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{
                // padding: '20px',
                backgroundColor: isOver && !isDragging ? '#d3ffd3' : '#fff',
                opacity: isDragging ? 0.5 : 1,
                // cursor: 'move',
                // textAlign: 'center',
            }}
        >
            {children}
        </div>
    );
};

DndItem.propTypes = {
    id: PropTypes.number.isRequired,
    itemType: PropTypes.string.isRequired,
    moveContent: PropTypes.func.isRequired,
    children: PropTypes.element
};
