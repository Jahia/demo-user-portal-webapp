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
            ...MocksProperty
            mocks: property(name:"dash4:mocks"){ refNode { ...CoreNodeFields ...MocksProperty} }
            btnEditPreference: property(language:$language, name:"dash4:btnEditPreference"){ value }
        }
    }
}
${CORE_NODE_FIELDS}
${MOCKS_PROPERTY}`;
