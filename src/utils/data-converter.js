function treeToList (data, depth = 0, parentId = -1) {
    const  resultArray = [];

    data.forEach(el => {
        const row = { node: el, depth: depth + 1};

        resultArray.push({ node: { name: el.name, rowId: el.rowId }, depth: depth + 1, parentId});
        
        if (el.children && el.children.length) {
            resultArray.push(...treeToList(el.children, depth + 1, el.rowId));
        }
    });

    return resultArray;
};

function updateNodeParent (listData, nodeId) {
    
}

function listToTree (listData, parentId = -1) {
    const result = listData.filter(el => el.parentId === parentId).map(el => el.node);

    for (let el of result) {
        const children = listToTree(listData, el.rowId);

        if (children?.length)        
            el.children = children;
    }

    return result;
}

module.exports = {
    treeToList,
    listToTree
};
