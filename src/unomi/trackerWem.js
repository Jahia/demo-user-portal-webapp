import {useTracker as unomiTracker} from "apache-unomi-tracker";

export const syncTracker = () => {
    //needed for isCrawler
    window.Buffer = window.Buffer || require("buffer").Buffer;

    const wem = {
        ...unomiTracker(),
        init: function () {

            const {
                contextServerUrl,
                trackerSessionIdCookieName = 'wem-session-id'
            } = window.digitalData.wemInitConfig;

            wem.contextServerUrl = contextServerUrl;

            if (wem.getCookie(trackerSessionIdCookieName) == null) {
                wem.setCookie(trackerSessionIdCookieName, wem.generateGuid());
            }

            wem.initTracker(window.digitalData);

            wem._registerCallback(() => {
                window.cxs = wem.getLoadedContext();
            }, 'Unomi tracker context loaded', 5);

            //Load page view event
            const pageViewEvent = wem.buildEvent(
                'view',
                wem.buildTargetPage(),
                wem.buildSource(window.digitalData.site.siteInfo.siteID, 'site')
            );
            wem._registerEvent(pageViewEvent, true);

            wem.startTracker();
            wem.loadContext();
        }
    }
    wem.init();
    return wem;
};
