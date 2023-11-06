import React, {useContext} from "react";
// import Moment from 'react-moment';
// import { useTheme } from '@mui/material/styles';
import {Card, CardActions, CardContent, Typography, Button, Box, Avatar, Divider} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {SimpleDialog} from "./AccountDialog";
import {StoreCtx} from "../../context";

// const devHost = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_HOST : ""

export const AccountProfile = ({portalData,...props}) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;

    const [open, setOpen] = React.useState(false);

    const user = userData?.profileProperties;
    const firstName = user?.firstName || "-";
    const lastName = user?.lastName || "-";
    const email = user?.email || "-";
    const avatar = user?.profilePictureUrl;

    // const theme = useTheme();
    // const imgURL = `${devHost}/modules/drive-motor-user-portal/images/profile.jpg`;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };

    const getAvatar = () => {
        if(avatar)
            return <Avatar
                src={avatar}
                sx={{
                    height: 64,
                    mb: 2,
                    width: 64
                }}
            />
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
        )
    }

    return(
        <>
            <Card {...props}>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {getAvatar()}
                        <Typography
                            color="textPrimary"
                            gutterBottom
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
                        {/*<Typography*/}
                        {/*    color="textSecondary"*/}
                        {/*    variant="body2"*/}
                        {/*>*/}
                        {/*    {user.timezone}*/}
                        {/*</Typography>*/}
                    </Box>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        fullWidth
                        variant="text"
                        onClick={handleClickOpen}
                    >
                        {portalData?.btnEditPreference?.value}
                    </Button>
                </CardActions>
            </Card>
            <SimpleDialog
                portalData={portalData}
                open={open}
                onClose={handleClose}
            />
        </>
    );
}
