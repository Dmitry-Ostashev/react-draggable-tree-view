import React, { useRef, useReducer } from 'react';
import { treeToList } from '../utils/data-converter';
import { ACTION_TYPES, reducer } from './actions';
import NodeRow from './tree-view-node-row';

export default function (props) {
    const selfRef = useRef();

    const [state, dispatch] = useReducer(reducer, {
        data:           props.data,
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
                payload: { top, left, height, width, clientX: ev.clientX, clientY: ev.clientY }
            });
        }
    };

    const onDragEnd = (ev) => {
        ev.stopPropagation();

        if (selfRef?.current && state.draggingNodeId) {
            const { top, left, height, width } = selfRef.current.getBoundingClientRect();

            dispatch({
                type:    ACTION_TYPES.STOP_NODE_DRAGGING,
                payload: { top, left, height, width, clientX: ev.clientX, clientY: ev.clientY }
            });
        }
        // const plainData = [...this.state.plainData];

        // const draggingRow = plainData.find(el => el.node && el.node.rowId === this.state.draggingNodeId);

        // draggingRow.depth = this.state.dropPlace.depth;
        // plainData.splice(plainData.indexOf(draggingRow), 1);
        // plainData.splice(this.state.dropPlace.row, 0, draggingRow);
        // this.setState({ draggingNodeId: 0, dropPlace: null, plainData  });
    };

    const { draggingNodeId, dropPlace } = state;

    const plainData = [...state.plainData];

    if (dropPlace)
        plainData.splice(dropPlace.row, 0, { depth: dropPlace.depth })

    return (
        <div data-label="tree-container" ref={selfRef} style={{ display: 'flex', flexDirection: 'column', width: '250' }} >
            {plainData.map((row) =><NodeRow key={row.node && row.node.rowId || 0} {...row} 
                                            draggingNodeId={draggingNodeId}
                                            onDragStart={onDragStart}
                                            onDrag={onDrag}
                                            onDragEnd={onDragEnd}/>)}
            </div>
    );
}
