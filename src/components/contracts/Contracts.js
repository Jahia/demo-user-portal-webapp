import React, {useContext} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {StoreCtx} from '../../context';
import {useTranslation} from 'react-i18next';


export const Contracts = ({customContractsData,...props}) => {
    const {t} = useTranslation();
    const { state } = useContext(StoreCtx);
    const {portalData: {contracts: mocksContracts}} = state;

    const contracts=[...mocksContracts]
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            {...props}
        >
            <CardHeader title={t('contract.title')} />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 500 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {t('contract.contractId')}
                                </TableCell>
                                <TableCell>
                                    {t('contract.contractDesc')}
                                </TableCell>
                                <TableCell>
                                    {t('contract.contractCost')}
                                </TableCell>
                                <TableCell>
                                    {t('contract.contractExpired')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contracts.map((contract) => (
                                <TableRow
                                    hover
                                    key={contract.id}
                                >
                                    <TableCell>
                                        {contract.id}
                                    </TableCell>
                                    <TableCell>
                                        {contract.desc}
                                    </TableCell>

                                    <TableCell>
                                        {contract.cost} {contract.currency.symbol}
                                    </TableCell>

                                    <TableCell>
                                        {contract.expiredAt}
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
                    {t('contract.viewAll')}
                </Button>
            </Box>
        </Card>
    )
}