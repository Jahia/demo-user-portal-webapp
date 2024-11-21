import {gql} from '@apollo/client';
import {SIMPLE_CORE_NODE_FIELDS} from './fragments';

export const mutationUserPreference = gql`mutation setUserPreference ($workspace: Workspace!, $userNodeId: String!,$preferences:String!) {
    jcr(workspace:$workspace){
        mutateNode(pathOrId:$userNodeId){
            mutateProperty(name:"dash4:userPreferences"){
                setValue(value: $preferences)
            }
        }
    }
}`;

export const queryUserPreference = gql`query getUserPreference ($workspace: Workspace!, $userNodeId: String!){
    jcr(workspace: $workspace) {
        workspace
        user: nodeById(uuid:$userNodeId) {
            ...SimpleCoreNodeFields
            preferences: property(name:"dash4:userPreferences"){ value }
        }
    }
}
${SIMPLE_CORE_NODE_FIELDS}`;

export const queryCurrentUserId = gql`query getCurrentUserId{
    currentUser{
        node{
            ...SimpleCoreNodeFields
        }
    }
}
${SIMPLE_CORE_NODE_FIELDS}`;
