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

export const Leads = props => {
    const {t} = useTranslation();
    const {state} = useContext(StoreCtx);
    const {userData, portalData: {leads: mocksLeads}} = state;

    const currentLead = [];
    if (userData && userData.profileProperties?.sfdc__leadID) {
        const {profileProperties: user} = userData;
        const leadID = user?.sfdc__leadID || '-';
        const leadSource = user?.sfdc__leadSource || '-';
        const leadStatus = user?.sfdc__leadStatus || '-';
        // Sfdc__leadQuality,
        const assignedToEmail = user?.sfdc__assignedToEmail || '-';
        const assignedToPhone = user?.sfdc__assignedToPhone || '-';
        const leadAssignedTo = user?.sfdc__leadAssignedTo || 'Not yet assigned';
        // Sfdc__leadComments,
        // sfdc__leadPreferences,
        currentLead.push(
            {
                id: leadID,
                src: leadSource,
                status: leadStatus,
                contact: {
                    fullname: leadAssignedTo,
                    email: assignedToEmail,
                    phone: assignedToPhone
                }
            }
        );
    }

    const leads = [...currentLead, ...mocksLeads];
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            {...props}
        >
            <CardHeader title={t('sfdc.title')}/>
            <Box sx={{flexGrow: 1}}>
                <PerfectScrollbar>
                    <Box sx={{minWidth: 500}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {t('sfdc.leadId')}
                                    </TableCell>
                                    <TableCell>
                                        {t('sfdc.leadSource')}
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
                                                {t('sfdc.leadStatus')}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {t('sfdc.yourContact')}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leads.map(lead => (
                                    <TableRow
                                        key={lead.id}
                                        hover
                                    >
                                        <TableCell>
                                            {lead.id}
                                        </TableCell>
                                        <TableCell>
                                            {lead.src}
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill
                                                color={(lead.status === 'Closed' && 'success') ||
                                                    (lead.status === 'Contacted' && 'warning') ||
                                                    'error'}
                                            >
                                                {lead.status}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                gutterBottom
                                                color="textPrimary"
                                                variant="h6"
                                            >
                                                {lead.contact.fullname}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {t('sfdc.contact.email')} {lead.contact.email}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {t('sfdc.contact.phone')} {lead.contact.phone}
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
                    {t('sfdc.viewAll')}
                </Button>
            </Box>
        </Card>
    );
};
