import {Doughnut} from 'react-chartjs-2';
import {Box, Card, CardContent, CardHeader, Divider, Typography, useTheme} from '@mui/material';
import * as Muicon from "@mui/icons-material";
import {useContext} from "react";
import {StoreCtx} from "../../context";

export const Chart = (props) => {
    const theme = useTheme();
    const {state} = useContext(StoreCtx);
    const {portalData : {chart : chartData} }= state;

    const {contents, data} = chartData;
    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: {padding: 0},
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
            <CardHeader title={contents.title}/>
            <Divider/>
            <CardContent sx={{flexGrow: 1}}>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {contents.data.map(({
                                            color,
                                            icon,
                                            title,
                                            value,
                                            variant
                                        }) => {
                        const Icon = Muicon[icon];
                        return (
                            <Box
                                key={title}
                                sx={{
                                    p: 1,
                                    textAlign: 'center'
                                }}
                            >
                                <Icon color="action"/>
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    style={{color}}
                                    variant={variant || "h4"}
                                >
                                    {value}
                                    %
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};
