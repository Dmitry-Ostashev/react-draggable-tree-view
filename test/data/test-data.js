export const treeData = [
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

export const listData = [
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
