import React from 'react';
import PropTypes from 'prop-types';

export const CloudinaryImage = ({baseUrl, endUrl, title, width, component, ...props}) => {
    const urlParams = `f_auto,w_${width ? width : '768'}`;
    const src = `${baseUrl}/${urlParams}/${endUrl}`;
    const Component = component || 'img';

    return (
        <Component {...{
            sx: {maxHeight: '215px'},
            ...props,
            className: '',
            component: 'img',
            src,
            alt: title
        }}
        />

    );
};

CloudinaryImage.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    endUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.string,
    component: PropTypes.elementType
};

// <img className="d-block w-100"
//      src={`${baseUrl}/${urlParams}/${endUrl}`}
//      alt={title}/>
