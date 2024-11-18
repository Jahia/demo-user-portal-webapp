import React, {useContext} from "react";
import {CxsCtx} from "../unomi/cxs";
import {StoreCtx} from "../context";
import {getUserContext} from "../data/context";

import {styled} from "@mui/material"

import {userProfile as mocksUserData} from "../__mocks__";
import * as Layouts from "./layouts";

const PortalLayoutRoot = styled('div')(({theme}) => ({
    background: theme.palette.background.default,
}));


const App = () => {
    const cxs = useContext(CxsCtx);
    const {state, dispatch} = useContext(StoreCtx);

    const preferences = state.userPreferences
    const Cmp = Layouts[preferences.layout];

    React.useEffect(() => {
        if (!cxs && (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')) {
            dispatch({
                type: "USER_DATA_READY",
                payload: {
                    userData: mocksUserData
                }
            });
        }

        if (cxs)
            getUserContext(cxs, dispatch);

    }, [cxs, dispatch]);


    return (
        <PortalLayoutRoot>
            <Cmp/>
        </PortalLayoutRoot>
    );
}

export default App;
