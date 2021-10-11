const { ACTION_TYPES, reducer } = require('../../src/tree-view-component/actions');
const { listData }              = require('../data/test-data');

describe(ACTION_TYPES.START_NODE_DRAGGING, () => {
    it('should set draggingNodeId', () => {});
});

describe(ACTION_TYPES.UPDATE_NODE_DROP_PLACE, () => {
    it('should calculate new drop place', () => {});
});

describe(ACTION_TYPES.STOP_NODE_DRAGGING, () => {
    it('should drop into a right place', () => {
        const state = {
            plainData:      listData,
            draggingNodeId: 9,
            dropPlace: { depth: 2, row: 3 }
        };

        const payload = {
            top: 0, 
            left: 0,
            clientX: 15,
            clientY: 15,
            height: , width
        };
    });
});
