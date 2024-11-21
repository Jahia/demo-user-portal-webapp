const headers = {
    'Content-Type': 'application/json'
};

export const getUserContext = (cxs, dispatch) => {
    // Console.log("[getUserContext] cxs :",cxs);
    const contextServerPublicUrl = window.digitalData.contextServerPublicUrl || window.digitalData.wemInitConfig.contextServerUrl;
    const body = {
        requiredProfileProperties: ['*'],
        requiredSessionProperties: ['*'],
        requireSegments: true,
        requireScores: false,
        sessionId: cxs.sessionId,
        source: {
            itemId: window.digitalData.page.pageInfo.pageID,
            itemType: 'page',
            scope: window.digitalData.scope
        }
    };

    fetch(`${contextServerPublicUrl}/context.json`, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
    }).then(response => {
        if (response.status !== 200) {
            throw new Error(`Failed to retrieve user profile, HTTP error! status: ${response.status}`);
        }

        return response.json();
    }).then(data => {
        dispatch({
            type: 'USER_DATA_READY',
            payload: {
                userData: data
            }
        });
        // SetUserData(response.data);
    }).catch(error => {
        console.log('Error in the call to retrieve user profiles data: ');
        console.log(error);
    });
};

// Export const getUserPropsInfo = (propsName,callback) => {
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
