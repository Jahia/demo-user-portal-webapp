import React, {useContext} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {SeverityPill} from '../severity-pill';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip, Typography
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {StoreCtx} from '../../context';
import {useTranslation} from 'react-i18next';

export const Orders = props => {
    const {t} = useTranslation();
    const {state} = useContext(StoreCtx);
    const {portalData: {orders: mocksOrders}} = state;

    const orders = [...mocksOrders];
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            {...props}
        >
            <CardHeader title={t('shop.title')}/>
            <Box sx={{flexGrow: 1}}>
                <PerfectScrollbar>
                    <Box sx={{minWidth: 500}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {t('shop.orderId')}
                                    </TableCell>
                                    <TableCell>
                                        {t('shop.orderSource')}
                                    </TableCell>
                                    <TableCell sortDirection="desc">
                                        <Tooltip
                                            enterDelay={300}
                                            title="Sort"
                                        >
                                            <TableSortLabel
                                                active
                                                direction="desc"
                                            >
                                                {t('shop.orderStatus')}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sortDirection="desc">
                                        <Tooltip
                                            enterDelay={300}
                                            title="Sort"
                                        >
                                            <TableSortLabel
                                                direction="desc"
                                            >
                                                {t('shop.orderTotal')}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {t('shop.currency')}
                                    </TableCell>
                                    <TableCell>
                                        {t('shop.orderFor')}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map(order => (
                                    <TableRow
                                        key={order.id}
                                        hover
                                    >
                                        <TableCell>
                                            {order.id}
                                        </TableCell>
                                        <TableCell>
                                            {order.src}
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill
                                                color={(order.status === 'Closed' && 'success') ||
                                                    (order.status === 'In progress' && 'warning') ||
                                                    'error'}
                                            >
                                                {order.status}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            {order.total}
                                        </TableCell>
                                        <TableCell>
                                            {order.currency.symbol}
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                gutterBottom
                                                color="textPrimary"
                                                variant="h6"
                                            >
                                                {order.contact.fullname}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {t('shop.contact.email')}  {order.contact.email}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {t('shop.contact.phone')} {order.contact.phone}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small"/>}
                    size="small"
                    variant="text"
                >
                    {t('shop.viewAll')}
                </Button>
            </Box>
        </Card>
    );
};
