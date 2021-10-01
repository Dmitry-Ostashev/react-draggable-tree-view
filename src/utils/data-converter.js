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

function listToTree (plainData) {
    const result =      [];
    const parentStack = {};

    let depth = 1;

    plainData.forEach(el => {
        if (el.depth === depth) {
            if (parentStack[depth - 1]) {
                const parent = parentStack[depth - 1];

                parent.children.push(el.node);
            }
            else
                result.push(el.node);
            
            parentStack[el.depth] = el.node;

            return;
        }

        if (el.depth > depth) {
            let prevEl = result[result.length - 1];

            if (parentStack[depth])
                prevEl = parentStack[depth];
            
            parentStack[depth] = prevEl;

            prevEl.children = [el.node];

            
            depth = el.depth;

            return;
        }
        
        let prevEl = parentStack[el.depth - 1];

        if (prevEl)
            prevEl.children.push(el.node);
        else
            result.push(el.node);

        depth = el.depth;
    });

    return result;
}

module.exports = {
    treeToList,
    listToTree
};
