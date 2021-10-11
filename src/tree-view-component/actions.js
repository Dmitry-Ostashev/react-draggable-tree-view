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

function stopNodeDragging(state, payload) {
    const { plainData, draggingNodeId, dropPlace } = state;

    let newData = [...plainData];

    if (draggingNodeId) {
        const newDropPlace   = getNewDropPlace({ draggingNodeId, plainData, prevDropPlace: dropPlace, ...payload });
        const { row, depth } = newDropPlace;
        const draggingRow    = plainData.find(el => el.node?.rowId === draggingNodeId);
        const nodeIndex      = plainData.indexOf(draggingRow);
        const prevIndex      = Math.min(nodeIndex, row);
        const nextIndex      = Math.max(nodeIndex, row);

        draggingRow.depth = depth;

        if (row !== nodeIndex) {
            newData = [...plainData.slice(0, prevIndex)];

            if (row <= nodeIndex)
                newData.push(draggingRow);

            newData.push(...plainData.slice(prevIndex, nextIndex));

            if (row > nodeIndex)
                newData.push(draggingRow);

            newData.push(...plainData.slice(nextIndex, plainData.length));
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