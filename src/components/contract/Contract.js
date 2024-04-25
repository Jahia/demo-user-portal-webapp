import React/*, {useContext}*/ from "react";
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
import {pastContracts} from "../../__mocks__";
// import {StoreCtx} from "../../context";


export const Contracts = ({customContractsData,...props}) => {
    // const { state } = useContext(StoreCtx);
    // const {userData} = state;
    let mocksContracts = pastContracts;
    if(typeof customContractsData === 'string'){
        try{
            const customContractsDataJson = JSON.parse(customContractsData);
            if(customContractsDataJson && Array.isArray(customContractsDataJson))
                mocksContracts = customContractsDataJson;
        }catch(e){
            console.error("contract property => \n"+customContractsData+"\n => is not a json object : ",e);
        }
    };


    const contracts=[/*...currentContract,*/...mocksContracts]
    return (
        <Card {...props}>
            <CardHeader title="My Contracts" />
            <PerfectScrollbar>
                <Box sx={{ minWidth: 500 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Contract ID
                                </TableCell>
                                <TableCell>
                                    Contract Desc.
                                </TableCell>
                                <TableCell>
                                    Annual Cost
                                </TableCell>
                                <TableCell>
                                   Expired at
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
                    View all
                </Button>
            </Box>
        </Card>
    )
}
