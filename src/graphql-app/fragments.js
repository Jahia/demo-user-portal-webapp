import {gql} from '@apollo/client';

export const CORE_NODE_FIELDS = gql`
    fragment CoreNodeFields on JCRNode {
        workspace
        uuid
        path
        name
        primaryNodeType {
            name
            supertypes{name}
        }
        mixinTypes {name}
    }`;
export const MOCKS_PROPERTY = gql`
    fragment MocksProperty on JCRNode {
        products: property(name:"dash4:products"){ value }
        chart: property(name:"dash4:chart"){ value }
        leads: property(name:"dash4:leads"){ value }
        orders: property(name:"dash4:orders"){ value }
        contracts: property(name:"dash4:contracts"){ value }
        salesChart: property(name:"dash4:salesChart"){ value }
    }`;

export const LINKTO_PROPERTY = gql`
    ${CORE_NODE_FIELDS}
    fragment LinkToProperty on JCRNode {
        linkType: property(name:"seu:linkType"){ value }
        linkTarget: property(name:"seu:linkTarget"){ value }
        internalLink: property(name:"seu:internalLink"){ refNode { ...CoreNodeFields} }
        externalLink: property(name:"seu:externalLink"){ value }
        utm_source: property(name:"seu:utmSource"){ value }
        utm_medium: property(name:"seu:utmMedium"){ value }
        utm_campaign: property(name:"seu:utmCampaign"){ value }
        utm_term: property(name:"seu:utmTerm"){ value }
        utm_content: property(name:"seu:utmContent"){ value }

    }`;