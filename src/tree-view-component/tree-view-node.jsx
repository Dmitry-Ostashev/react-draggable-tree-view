import React from 'react';

export default function DraggableTreeNode(props) {
    const { node, draggingNodeId, onDragStart, onDrag, onDragEnd } = props;

    const display         = node && draggingNodeId === node.rowId ? 'none' : 'flex';
    const nodeStyle       = { display, border: '2px solid gray', padding: '4px 8px', marginTop: 2 };
    const nodePlaceholder = <div style={{ backgroundColor: 'gray', height: 30, marginTop: 2, width: 100 }} />;

    return (
        <>
            {node && <div style={nodeStyle}
                data-nodeid={node.rowId}
                draggable={true}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}><span>{node.name}</span></div> || nodePlaceholder}
        </>
    );
}
