export const getRandomString = (length, format) => {
    let mask = "";
    if (format.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
    if (format.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (format.indexOf("#") > -1) mask += "0123456789";
    if (format.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    let result = "";
    for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
};

export const getRandomInt = ({min, max}) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const resolveJahiaMediaURL = ({host,path, workspace}) => {
    const jahiaFilePath = `/files/${workspace === 'EDIT' ? 'default' : 'live'}`;
    if (!path) {
        return '';
    }
    return `${host}${jahiaFilePath}${encodeURI(path)}`;
};

export const resolveJahiaEmbeddedURL = ({host,path, isPreview,isEdit,locale}) => {
    if (!path) {
        return '';
    }

    const paths = {
        preview: '/cms/render/default',
        edit: '/cms/editframe/default'
    }

    let pagePath;
    switch (true){
        case (isPreview && isEdit) :
            pagePath = `${host}${paths.edit}/${locale}${path}.html`;
            break;
        case isPreview :
            pagePath = `${host}${paths.preview}/${locale}${path}.html`;
            break;
        default :
            pagePath = `${host}/${locale}${path}.html`;
            break;
    }

    return pagePath;
};

const utmTerms = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content"
]
const resolveUTM = (jcrProps,urlSearch) => {
    let params = new URLSearchParams(urlSearch);

    utmTerms.forEach(utmParamName=>{
        const utmParamValue = jcrProps[utmParamName]?.value;
        if(utmParamValue)
            params.append(utmParamName,utmParamValue)
    });

    return params.toString();
}
export const resolveLinkToURL = ({host, isPreview,isEdit,locale,jcrProps})  => {
    const {linkType,internalLink,externalLink} = jcrProps;
    if(!linkType?.value)
        return ;

    switch(linkType.value){
        case "internalLink":
            if (internalLink?.refNode) {
                const {path} = internalLink.refNode;
                const url = resolveJahiaEmbeddedURL({host,path,isPreview,isEdit,locale});
                return `${url}?${resolveUTM(jcrProps)}`
            }
            break;
        case "externalLink":
            if (externalLink?.value) {
                const url = new URL(externalLink.value);
                return `${url.origin}${url.pathname}?${resolveUTM(jcrProps,url.search)}`
            }
            break;
        default: return "#"
    }
}


export const getTypes = jcrProps => {
    if(!jcrProps)
        return [];

    const superTypes = jcrProps.primaryNodeType.supertypes?.map(({name}) => name) || [];
    const mixinTypes = jcrProps.mixinTypes.map(({name}) => name) || [];
    const primaryNodeType = jcrProps.primaryNodeType?.name;
    return [primaryNodeType,...superTypes,...mixinTypes];
}