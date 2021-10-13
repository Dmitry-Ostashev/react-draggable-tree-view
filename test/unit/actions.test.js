import { calculateDropPlace } from '../../src/utils/calculate-drop-place';
import { ACTION_TYPES, reducer } from '../../src/tree-view-component/actions';
import { listData } from '../data/test-data';

jest.mock('../../src/utils/calculate-drop-place', () => ({ calculateDropPlace: jest.fn() }));

let row = 1;

calculateDropPlace.mockImplementation(() => ({ row, depth: 3 }));

describe(ACTION_TYPES.STOP_NODE_DRAGGING, () => {
    it('should drop into a right place', () => {
        const draggingNodeId = 9;
        const state          = {
            plainData:      listData,
            draggingNodeId,
            dropPlace: { depth: 3, row: 13 }
        };

        const draggedNodePredicate = el => el.node.rowId === draggingNodeId;
        let newState               = reducer(state, { type: ACTION_TYPES.STOP_NODE_DRAGGING, payload: {} });

        expect(newState.plainData.length).toEqual(listData.length);
        expect(newState.plainData.filter(draggedNodePredicate).length).toEqual(1);
        expect(newState.plainData.findIndex(draggedNodePredicate)).toEqual(1);

        row = 12;

        newState = reducer(state, { type: ACTION_TYPES.STOP_NODE_DRAGGING, payload: {} });

        expect(newState.plainData.length).toEqual(listData.length);
        expect(newState.plainData.filter(draggedNodePredicate).length).toEqual(1);
        expect(newState.plainData.findIndex(draggedNodePredicate)).toEqual(11);

    });
});
