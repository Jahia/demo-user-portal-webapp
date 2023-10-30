import React from 'react';
import PropTypes from "prop-types";
import {JahiaCtx} from "context";
import {WidenAsset} from "components/media/components/widen";
import {JahiaAsset} from "components/media/components/jahia";
import {CloudinaryAsset} from "components/media/components/cloudinary";

export const Media = ({id,types,path,sourceID,alt,component,...props}) => {
    const { cndTypes } = React.useContext(JahiaCtx);
    const width="1024"; //Default background image size used by cloudy and widen

    switch(true){
        case types.includes(cndTypes.WIDEN) :
            return <WidenAsset {...{
                        ...props,
                        types,
                        id,
                        width,
                        component,
                        sourceID
                    }}/>

        case types.includes(cndTypes.CLOUDINARY) :
            return <CloudinaryAsset {...{
                        ...props,
                        types,
                        id,
                        width,
                        component,
                        sourceID
                    }} />

        default :
            return <JahiaAsset {...{
                        ...props,
                        types,
                        id,
                        path,
                        component,
                        alt,
                        sourceID
                    }}/>
    }
}

Media.propTypes={
    id:PropTypes.string,
    types:PropTypes.array,
    path:PropTypes.string,
    sourceID:PropTypes.string,
    alt:PropTypes.string,
    component:PropTypes.elementType
}
