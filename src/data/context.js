import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}

// export const getUserContext = async (cxs) => {
//     console.log("[getUserContext] cxs :",cxs);
//     const data = {
//         requiredProfileProperties: ["*"],
//         requiredSessionProperties: ["*"],
//         requireSegments: true,
//         requireScores: false,
//         sessionId:cxs.sessionId,
//         source: {
//             itemId: window.digitalData.page.pageInfo.pageID,
//             itemType: "page",
//             scope: window.digitalData.scope
//         },
//     }
//     return axios({
//         method: 'post',
//         url: `${window.digitalData.contextServerPublicUrl}/context.json`,
//         headers,
//         data
//     });
// }


export const getUserContext = (cxs,dispatch) => {
    // console.log("[getUserContext] cxs :",cxs);
    const contextServerPublicUrl = window.digitalData.contextServerPublicUrl || window.digitalData.wemInitConfig.contextServerUrl;
    const data = {
        requiredProfileProperties: ["*"],
        requiredSessionProperties: ["*"],
        requireSegments: true,
        requireScores: false,
        sessionId:cxs.sessionId,
        source: {
            itemId: window.digitalData.page.pageInfo.pageID,
            itemType: "page",
            scope: window.digitalData.scope
        },
    }
    axios({
        method: 'post',
        url: `${contextServerPublicUrl}/context.json`,
        headers,
        data
    }).then(response => {
        if (response.status === 200) {
            dispatch({
                type:"USER_DATA_READY",
                payload:{
                    userData:response.data
                }
            });
            // setUserData(response.data);
        } else {
            console.log("Failed to retrieve user profile: ");
            console.log(response);
        }
    }).catch(error => {
        console.log("Error in the call to retrieve user profiles data: ");
        console.log(error);
    });
}

// export const getUserPropsInfo = (propsName,callback) => {
//     const contextServerPublicUrl = window.digitalData.contextServerPublicUrl || window.digitalData.wemInitConfig.contextServerUrl;
//     // let response = await axios({
//     //     method: 'get',
//     //     url: `${contextServerPublicUrl}/cxs/profiles/properties/${propsName}`,
//     //     headers
//     // })
//     // return response.data;
//     axios({
//         method: 'get',
//         url: `${contextServerPublicUrl}/cxs/profiles/properties/${propsName}`,
//         headers
//     }).then(response => {
//         if (response.status === 200) {
//             // return response.data
//             callback(response.data)
//         } else {
//             console.log("Failed to retrieve user profile property: ");
//             console.log(response);
//         }
//     }).catch(error => {
//         console.log("Error in the call to retrieve user profiles property: ");
//         console.log(error);
//     });
// }