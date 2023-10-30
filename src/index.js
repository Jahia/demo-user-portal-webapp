import React from 'react';
import ReactDOM from 'react-dom/client';
import { /*ApolloClient, InMemoryCache,*/ ApolloProvider } from '@apollo/client';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';
import {CxsCtxProvider} from "./unomi/cxs";
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
// import {StyledEngineProvider, unstable_ClassNameGenerator as ClassNameGenerator} from '@mui/material';
// import {getRandomString} from './misc/utils';
import {Store} from "./store";
import {JahiaCtxProvider} from "./context";
import {syncTracker} from './unomi/trackerWem';

import { registerChartJs } from './utils/register-chart-js';
import {getClient} from "./graphql-app";
registerChartJs();

export const cndTypes = {
    WIDEN: "wdenmix:widenAsset",
    WIDEN_IMAGE: "wdennt:image",
    WIDEN_VIDEO: "wdennt:video",
    CLOUDINARY: "cloudymix:cloudyAsset",
    CLOUDINARY_IMAGE: "cloudynt:image",
    CLOUDINARY_VIDEO: "cloudynt:video",
    JNT_FILE: 'jnt:file',
    IMAGE: 'jmix:image',
    // CONTENT_PERSO: ["", ""],
}
const render = (target,context) =>{

    const {workspace,locale,host,isPreview,isEdit,scope,portalId,contextServerUrl,gqlEndpoint} = Object.assign({
        workspace:'LIVE',
        locale:'en',
        scope:'mySite',
        host:process.env.REACT_APP_JCONTENT_HOST,
        isPreview:false,
        isEdit:false,
        contextServerUrl:process.env.REACT_APP_JCUSTOMER_ENDPOINT,
        gqlEndpoint:process.env.REACT_APP_JCONTENT_GQL_ENDPOINT
    },context);

    Moment.globalMoment = moment;
    Moment.globalLocale = locale || 'en';



    if(workspace === "LIVE" && !window.wem){
        if(!window.digitalData)
            window.digitalData= {
                _webapp:true,
                scope,
                site: {
                    siteInfo: {
                        siteID: scope
                    }
                },
                page: {
                    pageInfo: {
                        pageID: `User Portal`,
                        pageName: document.title,
                        pagePath: document.location.pathname,
                        destinationURL: document.location.origin + document.location.pathname,
                        language: locale,
                        categories: [],
                        tags: []
                    },
                    attributes: {
                        portalId:portalId,
                    },
                    consentTypes: []
                },
                events: [],
                // loadCallbacks:[{
                //     priority:5,
                //     name:'Unomi tracker context loaded',
                //     execute: () => {
                //         window.cxs = window.wem.getLoadedContext();
                //     }
                // }],
                wemInitConfig: {
                    contextServerUrl,
                    timeoutInMilliseconds: "1500",
                    // contextServerCookieName: "context-profile-id",
                    activateWem: true,
                    // trackerProfileIdCookieName: "wem-profile-id",
                    trackerSessionIdCookieName: "wem-session-id"
                }
            }
        window.wem = syncTracker();
    }

    // ClassNameGenerator.configure((componentName) => `${getRandomString(8, 'aA')}-${componentName}`);

    const root = ReactDOM.createRoot(document.getElementById(target));
    root.render(
        <React.StrictMode>
            <JahiaCtxProvider value={{
                workspace,
                locale,
                portalId,
                host,
                isPreview,
                isEdit,
                cndTypes
            }}
            >
                <Store context={context}>
                {/*<StyledEngineProvider injectFirst>*/}
                <ApolloProvider client={getClient(gqlEndpoint)}>
                    <CxsCtxProvider>
                        <App />
                    </CxsCtxProvider>
                </ApolloProvider>
                {/*</StyledEngineProvider>*/}
                </Store>
            </JahiaCtxProvider>
        </React.StrictMode>
    )
};

window.userDashboardReact = render;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
