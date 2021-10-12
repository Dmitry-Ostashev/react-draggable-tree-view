import { calculateDropPlace } from '../utils/calculate-drop-place';

export const ACTION_TYPES = {
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

function updateNodeDropPlace (state, payload) {
    const { plainData, draggingNodeId, dropPlace } = state;

    if (draggingNodeId) {
        const newDropPlace = calculateDropPlace({ draggingNodeId, plainData,  prevDropPlace: dropPlace,  ...payload });
        
        return { ...state, dropPlace: newDropPlace };
    }

}

function stopNodeDragging(state, payload) {
    const { plainData, draggingNodeId, dropPlace } = state;

    let newData = [...plainData];

    if (draggingNodeId) {
        const newDropPlace   = calculateDropPlace({ draggingNodeId, plainData, prevDropPlace: dropPlace, ...payload });
        const { row, depth } = newDropPlace;
        const draggingRow    = plainData.find(el => el.node?.rowId === draggingNodeId);
        const nodeIndex      = plainData.indexOf(draggingRow);

        draggingRow.depth = depth;

        if (row < nodeIndex) {
            newData = [
                ...plainData.slice(0, row),
                draggingRow,
                ...plainData.slice(row, nodeIndex),
                ...plainData.slice(nodeIndex + 1, plainData.length)
            ];
        }

        if (row > nodeIndex) {
            newData = [
                ...plainData.slice(0, nodeIndex),
                ...plainData.slice(nodeIndex + 1, row),
                draggingRow,
                ...plainData.slice(row, plainData.length)
            ];
        }
    }

    return { ...state, draggingNodeId: 0, dropPlace: null, plainData: newData };
}

const reducers = {
    [ACTION_TYPES.START_NODE_DRAGGING]:    startNodeDragging,
    [ACTION_TYPES.UPDATE_NODE_DROP_PLACE]: updateNodeDropPlace,
    [ACTION_TYPES.STOP_NODE_DRAGGING]:     stopNodeDragging
};

export function reducer (state, action) {
    const { type, payload } = action;

    return reducers[type](state, payload);
};