import React from "react";
import {StoreCtxProvider} from "../context";
import {mutationUserPreference} from "../graphql-app";

const DEFAULT_PORTAL = "PortalA"

const init = context => {
    const {locale,currentUserId,portalData,userPreferences,client} = context
    return {
        locale,
        currentUserId,
        portalData,
        userPreferences: !!userPreferences || {layout:DEFAULT_PORTAL,blocks:{}},
        client,
        userData:{}
    }
}
const reducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case "USER_DATA_READY":{
            const {userData} = payload;
            return {
                ...state,
                userData
            }
        }
        case "PORTAL_LAYOUT_UPDATE":{
            const {layout,workspace} = payload;
            //call GraphQL
            const preferences =  {
                ...state.userPreferences,
                layout
            }

            if(state.currentUserId)
                state.client.query({
                    query: mutationUserPreference,
                    variables: {
                        workspace,
                        userNodeId: state.currentUserId,
                        preferences
                    }
                })

            return {
                ...state,
                userPreferences : preferences
            }
        }
        case "PORTAL_LAYOUT_BLOCS_UPDATE":{
            const {blocks,workspace} = payload;
            //call GraphQL
            const preferences =  {
                ...state.userPreferences,
                blocks : {
                    ...state.userPreferences.blocks,
                    blocks
                }
            }

            if(state.currentUserId)
                state.client.query({
                    query: mutationUserPreference,
                    variables: {
                        workspace,
                        userNodeId: state.currentUserId,
                        preferences
                    }
                })

            return {
                ...state,
                userPreferences : preferences
            }
        }
        default:
            throw new Error(`[STORE] action case '${action.type}' is unknown `);
    }
}

export const Store = ({context,children}) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        context,
        init
    );
    return (
        <StoreCtxProvider value={{ state, dispatch }}>
            {children}
        </StoreCtxProvider>
    );
};
