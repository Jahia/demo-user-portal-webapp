import { Chart } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import {multiChartData as mocksChartData} from "../../__mocks__/multiChart";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);


export const MultiChart = ({customMultiChartData,...props}) => {
    const theme = useTheme();

    let chartData = mocksChartData;

    if(typeof customMultiChartData === 'string'){
        try{
            chartData = JSON.parse(customMultiChartData);
        }catch(e){
            console.error("chart property => \n"+customMultiChartData+"\n => is not a json object : ",e);
        }
    };

    const {contents,data} = chartData;
    const options = {
        animation: true,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    return (
        <Card {...props}>
            <CardHeader title={contents.title} />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Chart
                       data={data}
                       options={options}
                    />
                </Box>
            </CardContent>
        </Card>

    );
};