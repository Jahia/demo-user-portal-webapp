import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS, MOCKS_PROPERTY, SIMPLE_CORE_NODE_FIELDS} from "./fragments"

export const queryUserPortal = gql`query($workspace: Workspace!, $id: String!,$language:String!){
    jcr(workspace: $workspace) {
        workspace
        nodeById(uuid:$id) {
            ...SimpleCoreNodeFields
            category: property(name:"dash4:category"){ refNode { ...SimpleCoreNodeFields } }
            jExpUserPropsToSync: property(name:"seu:jExpProperty"){ value }
            personalizedAds: property(name:"dash4:personalizedAds"){ refNode { ...SimpleCoreNodeFields } }
            userTheme: property(name:"dash4:webappTheme"){ value }
            ...MocksProperty
            mocks: property(name:"dash4:mocks"){ refNode { ...SimpleCoreNodeFields ...MocksProperty} }
            btnEditPreference: property(language:$language, name:"dash4:btnEditPreference"){ value }
        }
    }
}
${SIMPLE_CORE_NODE_FIELDS}
${MOCKS_PROPERTY}`;
