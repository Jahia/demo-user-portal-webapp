import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS,MOCKS_PROPERTY} from "./fragments"

export const queryUserPortal = gql`query($workspace: Workspace!, $id: String!,$language:String!){
    jcr(workspace: $workspace) {
        workspace
        nodeById(uuid:$id) {
            ...CoreNodeFields
            category: property(name:"dash4:category"){ refNode { ...CoreNodeFields } }
            jExpUserPropsToSync: property(name:"seu:jExpProperty"){ value }
            personalizedAds: property(name:"dash4:personalizedAds"){ refNode { ...CoreNodeFields } }
            userTheme: property(name:"dash4:webappTheme"){ value }
            multichart: property(name:"dash4:multichart"){ value }
            label01Text: property(name:"dash4:label01"){ value }
            label01Value: property(name:"dash4:label01Value"){ value }
            label02Text: property(name:"dash4:label02"){ value }
            label02Value: property(name:"dash4:label02Value"){ value }
            label03Text: property(name:"dash4:label03"){ value }
            label03Value: property(name:"dash4:label03Value"){ value }
            ...MocksProperty
            mocks: property(name:"dash4:mocks"){ refNode { ...CoreNodeFields ...MocksProperty} }
            btnEditPreference: property(language:$language, name:"dash4:btnEditPreference"){ value }
        }
    }
}
${CORE_NODE_FIELDS}
${MOCKS_PROPERTY}`;
