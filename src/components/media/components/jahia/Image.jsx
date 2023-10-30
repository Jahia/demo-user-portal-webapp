import React from "react";
import {JahiaCtx} from "context";
import PropTypes from "prop-types";
import {resolveJahiaMediaURL} from 'misc/utils';

export const Image = ({path,alt,component,...props}) =>{
    const { host, workspace } = React.useContext(JahiaCtx);
    const src = resolveJahiaMediaURL({host,path,workspace})
    const Component = component || 'img';
    return(
        <Component {...{
            ...props,
            className:"",
            component:'img',
            src,
            alt
            }}
        />
    )
}

Image.propTypes={
    path:PropTypes.string.isRequired,
    alt:PropTypes.string,
    component:PropTypes.elementType
}
