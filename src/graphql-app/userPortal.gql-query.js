import {gql} from '@apollo/client';
import {MOCKS_PROPERTY, CORE_NODE_FIELDS, SIMPLE_CORE_NODE_FIELDS} from './fragments';

export const queryUserPortal = gql`query($workspace: Workspace!, $id: String!,$language:String!){
    jcr(workspace: $workspace) {
        workspace
        nodeById(uuid:$id) {
            ...CoreNodeFields
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
${CORE_NODE_FIELDS}
${MOCKS_PROPERTY}`;
