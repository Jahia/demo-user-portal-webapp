import React, {useContext} from 'react';
import {Card, CardActions, CardContent, Typography, Button, Box, Avatar, Divider} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {SimpleDialog} from './AccountDialog';
import {StoreCtx} from '../../context';

// Const devHost = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_HOST : ""

export const AccountProfile = props => {
    const {state} = useContext(StoreCtx);
    const {portalData: {node: portalData}, userData, userPreferences} = state;

    const [open, setOpen] = React.useState(false);

    const user = userData?.profileProperties;
    const firstName = user?.firstName || '-';
    const lastName = user?.lastName || '-';
    const email = user?.email || '-';
    const avatar = user?.profilePictureUrl;

    const handleDialogIsOpen = isOpen => {
        setOpen(isOpen);
    };

    const getAvatar = () => {
        if (avatar) {
            return (
                <Avatar
                src={avatar}
                sx={{
                    height: 64,
                    mb: 2,
                    width: 64
                }}
            />
            );
        }

        return (
            <Avatar
                sx={{
                    height: 64,
                    mb: 2,
                    width: 64
                }}
            >
                <PersonIcon fontSize="large"/>
            </Avatar>
        );
    };

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
                {...props}
            >
                <CardContent sx={{flexGrow: 1}}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        {getAvatar()}
                        <Typography
                            gutterBottom
                            color="textPrimary"
                            variant="h5"
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {email}
                        </Typography>
                        {/* <Typography */}
                        {/*    color="textSecondary" */}
                        {/*    variant="body2" */}
                        {/* > */}
                        {/*    {user.timezone} */}
                        {/* </Typography> */}
                    </Box>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button
                        fullWidth
                        color="primary"
                        variant="text"
                        onClick={() => handleDialogIsOpen(true)}
                    >
                        {portalData?.btnEditPreference?.value}
                    </Button>
                </CardActions>
            </Card>
            <SimpleDialog
                layout={userPreferences.layout}
                portalData={portalData}
                isOpen={open}
                onClose={() => handleDialogIsOpen(false)}
            />
        </>
    );
};
