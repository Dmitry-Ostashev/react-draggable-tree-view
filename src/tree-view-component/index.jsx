import React, { useRef, useReducer } from 'react';
import { treeToList } from '../utils/data-converter';
import NodeRow from './tree-view-node-row';

const ACTION_TYPES = {
    START_NODE_DRAGGING:    'start-node-dragging',
    UPDATE_NODE_DROP_PLACE: 'update-drop-place',
    STOP_NODE_DRAGGING:     'stop-drag'
};

function startNodeDragging (state, payload) {
    const { plainData } = state;
    const { nodeId }    = payload;

    const draggingRow         = plainData.find(el => el.node && el.node.rowId === nodeId);
    const placeholderRowIndex = plainData.indexOf(draggingRow);

    return {
        ...state,
        draggingNodeId: nodeId, 
        dropPlace: { row: placeholderRowIndex, depth: draggingRow.depth }
    };
}

function getNewDropPlace({ draggingNodeId, plainData, prevDropPlace, top, left, clientX, clientY, height, width }) {
    const offsetX = clientX - left;
    const offsetY = clientY - top;

    let { row, depth } = prevDropPlace;

    if (offsetY > 0 && offsetY < height)
        row = Math.max(Math.round(offsetY / 32), 0);

    if (offsetX > 0 && offsetX < width) {
        if (row > 1) {
            const draggingNodeIndex = plainData.findIndex(el => el.node && el.node.rowId === draggingNodeId);
            const prevRowIndex = draggingNodeIndex === row - 1 ? row - 2 : row - 1;
            const prevDepth = plainData[prevRowIndex].depth;

            depth = Math.max(1, Math.min(Math.round(offsetX / 30 + 1), prevDepth + 1));
        }
        else
            depth = 1;
    }

    return { row, depth };
}

function updateNodeDropPlace (state, payload) {
    const { plainData, draggingNodeId, dropPlace } = state;

    if (draggingNodeId) {
        const newDropPlace = getNewDropPlace({ draggingNodeId, plainData,  prevDropPlace: dropPlace,  ...payload });
        
        return { ...state, dropPlace: newDropPlace };
    }

}

function stopNodeDragging (state, payload) {

}

const reducers = {
    [ACTION_TYPES.START_NODE_DRAGGING]:    startNodeDragging,
    [ACTION_TYPES.UPDATE_NODE_DROP_PLACE]: updateNodeDropPlace,
    [ACTION_TYPES.STOP_NODE_DRAGGING]:     stopNodeDragging
};

function reducer (state, action) {
    const { type, payload } = action;

    return reducers[type](state, payload);
};

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
