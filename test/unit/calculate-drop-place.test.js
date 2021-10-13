import { calculateDropPlace } from '../../src/utils/calculate-drop-place';
import { listData } from '../data/test-data';

describe('calculateDropPlace()', () => {
    it('should recalculate place according to the pointer coordinates', () => {
        const options        = {
            plainData:     listData,
            prevDropPlace: { row: 10, depth: 1 },
            rowHeight:     10,
            rowIndent:     10,
            top:           0,
            left:          0,
            clientX:       13,
            clientY:       17,
            height:        130, 
            width:         50
        };

        let newPlace = calculateDropPlace(options);

        expect(newPlace).toEqual({ row: 2, depth: 2 });

        options.clientX = 40;
        newPlace = calculateDropPlace(options);

        expect(newPlace).toEqual({ row: 2, depth: 2 });

        options.clientY = 23;
        newPlace = calculateDropPlace(options);

        expect(newPlace).toEqual({ row: 2, depth: 2 });

        options.clientY = 31;
        newPlace = calculateDropPlace(options);

        expect(newPlace).toEqual({ row: 3, depth: 3 });

        options.clientX = -1;
        newPlace = calculateDropPlace(options);

        expect(newPlace).toEqual({ row: 3, depth: 1 });

        options.clientX = 60;
        newPlace = calculateDropPlace(options);

        expect(newPlace).toEqual({ row: 3, depth: 3 });
    });

});