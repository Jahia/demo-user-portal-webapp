export const chartData = {
    contents: {
        title: 'Ipsum by lorem',
        data: [
            {
                title: 'Blue',
                value: 15,
                icon: 'Bluetooth',
                color: '#3F51B5'
            },
            {
                title: 'Green',
                value: 23,
                icon: 'Handshake',
                color: '#FB8C00'
            },
            {
                title: 'Pink',
                value: 62,
                icon: 'PinDrop',
                color: '#E53935'
            }
        ]
    },
    data: {
        datasets: [
            {
                data: [15, 23, 62],
                backgroundColor: ['#3F51B5', '#FB8C00', '#E53935'],
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: ['Blue', 'Green', 'Pink']
    }
};
