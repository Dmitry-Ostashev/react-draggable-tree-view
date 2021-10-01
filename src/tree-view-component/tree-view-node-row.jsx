import React from 'react';
import DraggableTreeNode from './tree-view-node';

export default function NodeRow (props) {
    const { depth } = props;

    const rowPlaceholder = new Array(depth - 1).fill('').map((el, index) => <div key={index} style={{ width: 30 }}/>);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            {rowPlaceholder}
            <DraggableTreeNode {...props}/>
        </div>
    );
}
