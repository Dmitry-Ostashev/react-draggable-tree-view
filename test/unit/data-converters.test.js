const { treeToList, listToTree } = require('../../src/utils/data-converter');

const treeData = [
    { rowId: 1, name: 'salads' },
    { rowId: 2, name: 'drinks', children: [
        { rowId: 3, name: 'juice' },
        { rowId: 4, name: 'water' },
        { rowId: 5, name: 'alcohol', children: [
            { rowId: 6, name: 'whiskey' },
            { rowId: 7, name: 'wine' }
        ] }
    ] },
    { rowId: 8, name: 'cookies', children: [
        { rowId: 9, name: 'chocolate cookies' },
        { rowId: 10, name: 'bakery cookies' }
    ] }
  ];

const plainData = [
    { node: { rowId: 1, name: 'salads' }, depth: 1 },
    { node: { rowId: 2, name: 'drinks'}, depth: 1 },
    { node: { rowId: 3, name: 'juice' }, depth: 2 },
    { node: { rowId: 4, name: 'water' }, depth: 2 },
    { node: { rowId: 5, name: 'alcohol'}, depth: 2 },
    { node: { rowId: 6, name: 'whiskey' }, depth: 3 },
    { node: { rowId: 7, name: 'wine' }, depth: 3 },
    { node: { rowId: 8, name: 'cookies' }, depth: 1 },
    { node: { rowId: 9, name: 'chocolate cookies' }, depth: 2 },
    { node: { rowId: 10, name: 'bakery cookies' }, depth: 2 }
];

describe('treeToList()', () => {
    it('should convert', () => {
        expect(treeToList(treeData)).toEqual(plainData);
    });
});

describe('listToTree()', () => {
    it('should convert', () => {
        console.dir(listToTree(plainData), { depth: null });
        expect(listToTree(plainData)).toEqual(treeData);
    });
});
