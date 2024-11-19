import React from 'react';
import ReactDOM from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';
import App from './components/App';
import {CxsCtxProvider} from "./unomi/cxs";
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import {Store} from "./store";
import {JahiaCtxProvider} from "./context";
import {syncTracker} from './unomi/trackerWem';
import {getClient, queryCurrentUserId, queryUserPortal, queryUserPreference} from "./graphql-app";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import {registerChartJs} from './misc';
import {mergedTheme} from "./theme";
import {ThemeProvider} from "@mui/material";

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {appLanguageBundle} from 'i18n/resources';
import {ErrorHandler} from "./components/error";

registerChartJs();

const fetchData = async ({client,workspace, language,id}) => {
    try {
        const [/*userData,*/ portalData] = await Promise.all([
            // client.query({ query: queryCurrentUserId }),
            client.query({ query: queryUserPortal,  variables: {workspace, language,id}}),

        ]);
         const currentUserId = null;
        // const currentUserId = userData?.data?.currentUser?.node.uuid;
        let userPreferencesData,userPreferences = null;

        if(currentUserId)
            userPreferencesData = await client.query({
                query: queryUserPreference,
                variables: {workspace, userNodeId:currentUserId}
            })

        try {
            userPreferences = JSON.parse(userPreferencesData?.data?.jcr?.user?.preferences?.value)
        }catch(e){
            console.warn("current user preferences is not a valid json object or doesn't exist")
        }

        return({
            currentUserId,
            userPreferences,
            portalData: portalData?.data?.jcr?.nodeById,
        });
    } catch (err) {
        return({
            error:err
        });
    }
};

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
const render = async (target,context) =>{

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

    await i18n.use(initReactI18next) // Passes i18n down to react-i18next
        .init({
            resources: appLanguageBundle,
            lng: locale,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false // React already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        });

    const client = getClient(gqlEndpoint);
    const {currentUserId,portalData,userPreferences,error} = await fetchData({client,workspace,language:locale,id:portalId})
    const root = ReactDOM.createRoot(document.getElementById(target));

    if(error){
        root.render(
            <ErrorHandler
                item={error.message}
                errors={error.errors}
            />
        );
    }else{
        context.currentUserId = currentUserId;
        context.userPreferences= userPreferences;
        context.portalData = portalData;
        context.client = client;

        const userTheme = portalData?.userTheme?.value || {};

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
                                <DndProvider backend={HTML5Backend}>
                                    <ThemeProvider theme={mergedTheme(userTheme)}>
                                        <App />
                                    </ThemeProvider>
                                </DndProvider>
                            </CxsCtxProvider>
                        </ApolloProvider>
                        {/*</StyledEngineProvider>*/}
                    </Store>
                </JahiaCtxProvider>
            </React.StrictMode>
        )
    }
};

window.userDashboardReact = render;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
