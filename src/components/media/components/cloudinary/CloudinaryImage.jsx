import React from "react";

export const CloudinaryImage = ({baseUrl,endUrl,title,width,component,...props}) => {
    const urlParams = `f_auto,w_${width?width:'768'}`;
    const src = `${baseUrl}/${urlParams}/${endUrl}`;
    const Component = component || 'img';

    return (
        <Component {...{
            sx:{maxHeight:"215px"},
            ...props,
            className:"",
            component:'img',
            src,
            alt:title
        }}
        />

    )
}
// <img className="d-block w-100"
//      src={`${baseUrl}/${urlParams}/${endUrl}`}
//      alt={title}/>