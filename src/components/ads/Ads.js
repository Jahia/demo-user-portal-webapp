import React, {useContext} from "react";
import PropTypes from "prop-types";
import {useLazyQuery} from "@apollo/client";
import {queryPersonalizedAdsVariant} from "../../graphql-app";
import {CxsCtx} from "../../unomi/cxs";
import {JahiaCtx, StoreCtx} from "../../context";
import {EmbeddedPathInHtmlResolver} from "../jahia";
import {Card, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material';
import {Media} from "../media";
import {getTypes, resolveLinkToURL} from 'misc/utils'

export const Ads = ({adsId,jExpUserPropsToSync,...props}) => {
    const cxs = useContext(CxsCtx);
    const {workspace, locale, host, isPreview, isEdit} = useContext(JahiaCtx);
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const jExpUserPropsValues = React.useMemo(()=>userData?.profileProperties?.[jExpUserPropsToSync],[userData,jExpUserPropsToSync]);

    const [loadVariant, {data,loading,error,refetch}] = useLazyQuery(queryPersonalizedAdsVariant);

    React.useEffect(() => {
        if (adsId && cxs) {
            console.log("do the call")
            loadVariant({
                variables: {
                    workspace,
                    id:adsId,
                    language: locale,
                    profileId: cxs.profileId,
                    sessionId: cxs.sessionId,
                }
            })
        }
    },[loadVariant,workspace,locale, adsId,cxs])

    React.useEffect(() => {
        if (data) {
            refetch().then(()=>console.log("refetch done with jExpUserPropsValues : ",jExpUserPropsValues));
        }
    },[jExpUserPropsValues])

    if (error) return <p>Error :(</p>;
    if (!data || loading)
        return(
            <Card
                {...props}
            >
                <CardMedia sx={{ height: 240, backgroundColor: "#EEE"}}
                    component="div"
                />
                <CardContent>
                    <Typography variant="h5" color="#CCC">
                        <span>Your ads here</span>
                    </Typography>
                    <Typography className="w-100" variant="body2" color="#CCC">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias iste ipsa excepturi nostrum sequi molestias?
                    </Typography>
                </CardContent>
            </Card>
        );

    const variant = data?.jcr?.nodeById?.jExperience?.resolve?.variant
    const {image,teaser,linkTarget} = variant;
    const href = resolveLinkToURL({
        host,
        isEdit,
        isPreview,
        locale,
        jcrProps:variant
    });

    return(
        <Card
            // sx={{ height: '100%' }}
            {...props}
        >
            <CardActionArea href={href || '#'} target={linkTarget.value}>
                {image &&
                    <Media id={image.refNode.uuid}
                           types={getTypes(image.refNode)}
                           path={image.refNode.path}
                           alt="background image"
                           component={CardMedia}
                           // height="250"
                    />
                }
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    height="140"*/}
                {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
                {/*    alt="green iguana"*/}
                {/*/>*/}
                <CardContent>
                    <Typography component="div"
                        children={<EmbeddedPathInHtmlResolver htmlAsString={teaser.value} />}/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

Ads.propTypes = {
    adsId: PropTypes.string,
    jExpUserPropsToSync: PropTypes.string
};