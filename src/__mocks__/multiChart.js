import {getRandomInt} from "../misc/utils";
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const multiChartData = {
    contents : {
        title:"Multi Bars Annual Graph"
    },
    data : {
        datasets: [
            {
                type: 'line',
                label: 'Global Sales',
                borderColor: '#CCC',
                borderWidth: 2,
                fill: false,
                data: labels.map(() => getRandomInt({ min: 0, max: 1000 })),
            },
            {
                type: 'bar',
                label: 'Auto',
                backgroundColor: '#3F51B5',
                data: labels.map(() => getRandomInt({ min: 0, max: 1000 })),
                // borderColor: 'white',
                // borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Home',
                backgroundColor: '#FB8C00',
                data: labels.map(() => getRandomInt({ min: 0, max: 1000 })),
            },
            {
                type: 'bar',
                label: 'Health',
                backgroundColor: '#E53935',
                data: labels.map(() => getRandomInt({ min: 0, max: 1000 })),
            },
        ],
        labels
    }
};