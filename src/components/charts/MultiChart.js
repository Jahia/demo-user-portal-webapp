import { Chart } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
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
import {useContext} from "react";
import {StoreCtx} from "../../context";

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


export const MultiChart = (props) => {
    const theme = useTheme();
    const {state} = useContext(StoreCtx);
    const {portalData : {multiChart : chartData} }= state;

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
        <Card
            sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
              {...props}
        >
            <CardHeader title={contents.title} />
            <Divider />
            <CardContent sx={{ flexGrow: 1 }}>
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
