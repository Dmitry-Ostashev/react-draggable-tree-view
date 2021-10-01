import React from 'react';

import DraggableTreeView from '.';

const data = [
    { rowId: 1, name: 'salads' },
    { rowId: 2, name: 'drinks', children: [
        { rowId: 3, name: 'juice' },
        { rowId: 4, name: 'water' },
        { rowId: 5, name: 'alcohol', children: [
            { rowId: 6, name: 'whiskey' },
            { rowId: 7, name: 'wine' }
        ] }
    ] },
    { rowId: 8, name: 'cookies' }
  ];

export default {
    component: DraggableTreeView,
    title:     'components/Draggable Tree View'
}; 

export const Tree = () => <DraggableTreeView data={data}/>;
