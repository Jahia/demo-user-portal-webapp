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

export const Orders = props => {
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
            <CardHeader title="My Orders"/>
            <Box sx={{flexGrow: 1}}>
                <PerfectScrollbar>
                    <Box sx={{minWidth: 500}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Order ID
                                    </TableCell>
                                    <TableCell>
                                        Order Source
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
                                                Status
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
                                                Total
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        Cur.
                                    </TableCell>
                                    <TableCell>
                                        Ordered for
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
                                                email: {order.contact.email}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                phone: {order.contact.phone}
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
                    View all
                </Button>
            </Box>
        </Card>
    );
};
