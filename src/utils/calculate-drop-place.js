export function calculateDropPlace (options) {
    const {
        draggingNodeId,
        plainData,
        prevDropPlace,
        rowHeight,
        rowIndent,
        top,
        left,
        clientX,
        clientY,
        height,
        width 
    } = options;

    const offsetX = clientX - left;
    const offsetY = clientY - top;

    let row   = 0;
    let depth = 1;

    if (offsetY > 0 && offsetY < height)
        row = Math.max(Math.round(offsetY / rowHeight), 0);

    if (row > 0) {
        let prevRow = plainData[row - 1];

        if ((!prevRow.node || prevRow.node.rowId === draggingNodeId) && row > 1)
            prevRow = plainData[row - 2];

        if (offsetX < 0)
            depth = 1;
        else if (offsetX > width)
            depth = prevRow.depth + 1;
        else
            depth = Math.max(1, Math.min(Math.round((offsetX / rowIndent) + 1), prevRow.depth + 1));
    }
    else
        depth = 1;


    return { row, depth };
}
