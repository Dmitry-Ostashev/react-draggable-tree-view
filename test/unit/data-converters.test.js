const { treeToList, listToTree, updateNodeParent } = require('../../src/utils/data-converter');
const { treeData, listData }                       = require('../data/test-data');

describe('treeToList()', () => {
    it('should convert', () => {
        expect(treeToList(treeData)).toEqual(listData);
    });
});

describe('listToTree()', () => {
    it('should convert', () => {
        const data = JSON.parse(JSON.stringify(listData));

        expect(listToTree(data)).toEqual(treeData);
    });
});

describe('updateNodeParent()', () => {
    let data = [];

    beforeEach(() => {
        data = JSON.parse(JSON.stringify(listData));
    });

    it('should update when previous node is parent', () => {
        const draggedNode   = data[8];
        const dataToProcess = [...data.slice(0, 5), draggedNode, ...data.slice(5, 8),  ...data.slice(9)];
        
        const processedData = updateNodeParent(dataToProcess, draggedNode.node.rowId);

        expect(processedData[5].parentId).toEqual(5);
    });

    it('should update when previous node is not parent', () => {
        data[9].depth = 2;
        
        const processedData = updateNodeParent(data, data[9].node.rowId);

        expect(processedData[9].parentId).toEqual(2);
    });

    it('should update when the node at the root level', () => {
        data[9].depth = 1;
        
        const processedData = updateNodeParent(data, data[9].node.rowId);

        expect(processedData[9].parentId).toEqual(-1);
    });
});