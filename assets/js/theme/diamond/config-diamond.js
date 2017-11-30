const ConfigDiamond = {

    types: {
        shape: {
            name: 'shape'
        },
        price: {
            name: 'price',
            range: {'min': 100, 'max': 500000}
        },
        carat: {
            name: 'carat',
            range: {'min': 0.01, 'max': 10.75}
        },
        color: {
            name: 'color',
            values: ["D", "E", "F", "G", "H", "I", "J", "K", "N"]
        },
        clarity: {
            name: 'clarity',
            values: ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"]
        },
        cut: {
            name: 'cut',
            values: ["Ideal", "Excellent", "Very Good", "Good"]
        },
        polish: {
            name: 'polish',
            values: ["Excellent", "Very Good", "Good"]
        },
        symmetry: {
            name: 'symmetry',
            values: ["Excellent", "Very Good", "Good"]
        }

    },

};

export { ConfigDiamond };