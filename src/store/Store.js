import React from 'react';
import {StoreCtxProvider} from '../context';
import {mutationUserPreference} from '../graphql-app';
import {PortalDataLabels} from '../misc';
import * as Mocks from '../__mocks__';
import PropTypes from 'prop-types';

const DEFAULT_PORTAL = 'PortalA';

const getObject = ({src, fallback, testArray = false}) => {
    let ret = fallback;
    if (typeof src === 'string') {
        try {
            const _object = JSON.parse(src);
            switch (true) {
                case testArray && _object && Array.isArray(_object):
                    ret = _object;
                    break;
                default:
                    ret = _object;
            }
        } catch (e) {
            console.error('property => \n' + src + '\n => is not a json object : ', e);
        }
    }

    return ret;
};

const init = context => {
    const {locale, currentUserId, portalData, userPreferences, client} = context;
    const portalLeads = portalData?.leads?.value || portalData?.mocks?.refNode?.leads?.value;
    const portalOrders = portalData?.orders?.value || portalData?.mocks?.refNode?.orders?.value;
    const pData = {
        node: portalData,
        products: getObject({src: portalData?.products?.value || portalData?.mocks?.refNode?.products?.value, fallback: Mocks.products, testArray: true}),
        chart: getObject({src: portalData?.chart?.value || portalData?.mocks?.refNode?.chart?.value, fallback: Mocks.chartData}),
        leads: getObject({src: portalLeads, fallback: Mocks.pastLeads, testArray: true}),
        orders: getObject({src: portalOrders, fallback: Mocks.pastOrders, testArray: true}),
        multiChart: getObject({src: portalData?.salesChart?.value || portalData?.mocks?.refNode?.salesChart?.value, fallback: Mocks.multiChartData}),
        ads: {
            id: portalData?.personalizedAds?.refNode?.uuid,
            jExpUserPropsToSync: portalData?.jExpUserPropsToSync?.value
        }
    };
    const leadsOrOrderCmpName = portalLeads ? PortalDataLabels.LEADS : portalOrders ? PortalDataLabels.ORDERS : PortalDataLabels.LEADS;

    return {
        locale,
        currentUserId,
        portalData: pData,
        leadsOrOrderCmpName,
        userPreferences: (userPreferences !== null && 'layout' in userPreferences) ? userPreferences : {layout: DEFAULT_PORTAL, blocks: {}},
        client,
        userData: {}
    };
};

const reducer = (state, action) => {
    const {payload} = action;
    switch (action.type) {
        case 'USER_DATA_READY': {
            const {userData} = payload;
            return {
                ...state,
                userData
            };
        }

        case 'UPDATE_PORTAL_LAYOUT_PREFERENCE': {
            const {layout, blocks = state.userPreferences.blocks, isReset = false, workspace} = payload;
            const _blocks = {
                ...state.userPreferences.blocks,
                ...Object.keys(blocks).reduce((block, key) => {
                    block[key] = {
                        ...state.userPreferences.blocks[key],
                        ...blocks[key]
                    };
                    return block;
                }, {})
            };

            if (layout && isReset) {
                delete _blocks[layout];
            }

            const preferences = {
                ...state.userPreferences,
                layout: layout || state.userPreferences.layout,
                blocks: _blocks
            };

            if (state.currentUserId) {
                state.client.mutate({
                    mutation: mutationUserPreference,
                    variables: {
                        workspace,
                        userNodeId: state.currentUserId,
                        preferences: JSON.stringify(preferences)
                    }
                });
            }

            return {
                ...state,
                userPreferences: {...preferences}
            };
        }

        default:
            throw new Error(`[STORE] action case '${action.type}' is unknown `);
    }
};

export const Store = ({context, children}) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        context,
        init
    );
    return (
        <StoreCtxProvider value={{state, dispatch}}>
            {children}
        </StoreCtxProvider>
    );
};

Store.propTypes = {
    context: PropTypes.object.isRequired,
    children: PropTypes.node
};
