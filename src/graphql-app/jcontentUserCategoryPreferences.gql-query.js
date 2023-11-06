import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS} from "./fragments"

export const queryJcontentUserCategoryPreferences = gql`query($workspace: Workspace!, $path: String!,$language:String!){
    jcr(workspace: $workspace) {
        workspace
        nodeByPath(path:$path) {
            ...CoreNodeFields
            children{
                nodes{
                    ...CoreNodeFields
                    displayName(language:$language)
                }
            }
        }
    }
}
${CORE_NODE_FIELDS}`;
