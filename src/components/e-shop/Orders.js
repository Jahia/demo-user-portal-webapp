import React/*, {useContext}*/ from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {SeverityPill} from "../severity-pill";
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
import {pastOrders} from "../../__mocks__";
// import {StoreCtx} from "../../context";


export const Orders = ({customOrdersData,...props}) => {
    // const { state } = useContext(StoreCtx);
    // const {userData} = state;
    let mocksOrders = pastOrders;
    if(typeof customOrdersData === 'string'){
        try{
            const customOrdersDataJson = JSON.parse(customOrdersData);
            if(customOrdersDataJson && Array.isArray(customOrdersDataJson))
                mocksOrders = customOrdersDataJson;
        }catch(e){
            console.error("leads property => \n"+customOrdersData+"\n => is not a json object : ",e);
        }
    };

    // const currentOrder = [];
    // if(userData && userData.profileProperties?.sfdc__leadID){
    //     const {profileProperties : user} = userData;
    //     const leadID = user?.sfdc__leadID || "-";
    //     const leadSource = user?.sfdc__leadSource || "-";
    //     const leadStatus = user?.sfdc__leadStatus || "-";
    //     //sfdc__leadQuality,
    //     const assignedToEmail = user?.sfdc__assignedToEmail || "-";
    //     const assignedToPhone = user?.sfdc__assignedToPhone || "-";
    //     const leadAssignedTo = user?.sfdc__leadAssignedTo || "Not yet assigned";
    //     //sfdc__leadComments,
    //     //sfdc__leadPreferences,
    //     currentOrder.push(
    //         {
    //             id:leadID,
    //             src:leadSource,
    //             status:leadStatus,
    //             contact:{
    //                 fullname : leadAssignedTo,
    //                 email : assignedToEmail,
    //                 phone : assignedToPhone
    //             }
    //         }
    //     )
    // }

    const orders=[/*...currentOrder,*/...mocksOrders]
    return (
        <Card {...props}>
            <CardHeader title="My Orders" />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 500 }}>
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
                            {orders.map((order) => (
                                <TableRow
                                    hover
                                    key={order.id}
                                >
                                    <TableCell>
                                        {order.id}
                                    </TableCell>
                                    <TableCell>
                                        {order.src}
                                    </TableCell>
                                    <TableCell>
                                        <SeverityPill
                                            color={(order.status === 'Closed' && 'success')
                                            || (order.status === 'In progress' && 'warning')
                                            || 'error'}
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
                                            color="textPrimary"
                                            gutterBottom
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </Box>
        </Card>
    )
}
