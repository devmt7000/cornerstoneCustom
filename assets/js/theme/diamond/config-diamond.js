const ConfigDiamond = {
    pos: {
        SHAPE: 0,
        PRICE: 1,
        CARAT: 2,
        COLOR: 3,
        CLARITY: 4,
        CUT: 5,
        POLISH: 6,
        SYMMETRY: 7,
    },
    types: [
        {
            id: 'Shape',
            name: 'shape',
        },
        {
            id: 'price',
            name: 'price',
            range: { min: 100, max: 500000, step: 1000 },
        }, {
            id: 'Carat',
            name: 'carat',
            range: { min: 0.01, max: 10.75, step: 0.25 },
        },
        {
            id: 'Color',
            name: 'color',
            keys: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'N'],
            values: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'N'],
        },
        {
            id: 'Clarity',
            name: 'clarity',
            keys: ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'],
            values: ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'],
        },
        {
            id: 'Cut',
            name: 'cut',
            keys: ['GD', 'GD2', 'VG', 'VG1', 'VG2', 'EX', 'EX2', 'EX3', 'EX4'],
            values: ['GD', 'GD2', 'VG', 'VG1', 'VG2', 'EX', 'EX2', 'EX3', 'EX4'],
        },
        {
            id: 'Polish',
            name: 'polish',
            keys: ['GD', 'VG', 'EX'],
            values: ['Good', 'Very Good', 'Excellent'],
        },
        {
            id: 'Symmetry',
            name: 'symmetry',
            keys: ['GD', 'VG', 'EX'],
            values: ['Good', 'Very Good', 'Excellent'],
        },
    ],
};
export { ConfigDiamond };
