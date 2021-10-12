import React, { useRef, useReducer } from 'react';
import { treeToList } from '../utils/data-converter';
import { ACTION_TYPES, reducer } from './actions';
import NodeRow from './tree-view-node-row';

const DEFAULT_ROW_HEIGHT = 32;
const DEFAULT_ROW_INDENT = 32;

export default function (props) {
    const selfRef             = useRef();
    const { data, rowHeight = DEFAULT_ROW_HEIGHT, rowIndent = DEFAULT_ROW_INDENT } = props;

    const [state, dispatch] = useReducer(reducer, {
        data,
        plainData:      treeToList(props.data),
        draggingNodeId: 0,
        dropPlace: null
    });

    const onDragStart = (ev) => {
        const nodeId = parseInt(ev.target.dataset.nodeid, 10);

        setTimeout(() => dispatch({
            type:    ACTION_TYPES.START_NODE_DRAGGING,
            payload: { nodeId }
        }), 50);
    };

    const onDrag = (ev) => {
        ev.stopPropagation();

        if (selfRef?.current && state.draggingNodeId) {
            const { top, left, height, width } = selfRef.current.getBoundingClientRect();

            dispatch({
                type:    ACTION_TYPES.UPDATE_NODE_DROP_PLACE,
                payload: { rowHeight, rowIndent, top, left, height, width, clientX: ev.clientX, clientY: ev.clientY }
            });
        }
    };

    const onDragEnd = (ev) => {
        ev.stopPropagation();

        if (selfRef?.current && state.draggingNodeId) {
            const { top, left, height, width } = selfRef.current.getBoundingClientRect();

            dispatch({
                type:    ACTION_TYPES.STOP_NODE_DRAGGING,
                payload: { rowHeight, rowIndent, top, left, height, width, clientX: ev.clientX, clientY: ev.clientY }
            });
        }
    };

    const { draggingNodeId, dropPlace } = state;
    const plainData                     = [...state.plainData];

    if (dropPlace)
        plainData.splice(dropPlace.row, 0, { depth: dropPlace.depth });
    
    return (
        <div data-label="tree-container" ref={selfRef} style={{ display: 'flex', flexDirection: 'column', width: '250' }} >
            {plainData.map((row) =><NodeRow key={row.node && row.node.rowId || 0} {...row} 
                                            draggingNodeId={draggingNodeId}
                                            rowHeight={rowHeight}
                                            rowIndent={rowIndent}
                                            onDragStart={onDragStart}
                                            onDrag={onDrag}
                                            onDragEnd={onDragEnd}/>)}
            </div>
    );
}
