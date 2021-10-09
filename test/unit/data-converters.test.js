const { treeToList, listToTree, updateNodeParent } = require('../../src/utils/data-converter');

const treeData = [
    { rowId: 1, name: 'salads' },
    {
        rowId: 2, name: 'drinks', children: [
            { rowId: 3, name: 'juice' },
            { rowId: 4, name: 'water' },
            {
                rowId: 5, name: 'alcohol', children: [
                    { rowId: 6, name: 'whiskey' },
                    { rowId: 7, name: 'wine' }
                ]
            },
            {
                rowId: 8, name: 'coctails', children: [
                    { rowId: 9, name: 'whiskey & soda' },
                    { rowId: 10, name: 'white russian' }
                ]
            }
        ]
    },
    {
        rowId: 11, name: 'cookies', children: [
            { rowId: 12, name: 'chocolate cookies' },
            { rowId: 13, name: 'bakery cookies' }
        ]
    }
];

const listData = [
    { node: { rowId: 1, name: 'salads' }, depth: 1, parentId: -1 },
    { node: { rowId: 2, name: 'drinks'}, depth: 1, parentId: -1 },
    { node: { rowId: 3, name: 'juice' }, depth: 2, parentId: 2 },
    { node: { rowId: 4, name: 'water' }, depth: 2, parentId: 2 },
    { node: { rowId: 5, name: 'alcohol'}, depth: 2, parentId: 2 },
    { node: { rowId: 6, name: 'whiskey' }, depth: 3, parentId: 5 },
    { node: { rowId: 7, name: 'wine' }, depth: 3, parentId: 5 },
    { node: { rowId: 8, name: 'coctails'}, depth: 2, parentId: 2 },
    { node: { rowId: 9, name: 'whiskey & soda'}, depth: 3, parentId: 8 },
    { node: { rowId: 10, name: 'white russian'}, depth: 3, parentId: 8 },
    { node: { rowId: 11, name: 'cookies' }, depth: 1, parentId: -1 },
    { node: { rowId: 12, name: 'chocolate cookies' }, depth: 2, parentId: 11 },
    { node: { rowId: 13, name: 'bakery cookies' }, depth: 2, parentId: 11 },
];

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