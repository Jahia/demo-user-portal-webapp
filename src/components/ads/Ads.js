import React, {useContext} from "react";
import PropTypes from "prop-types";
import {useLazyQuery} from "@apollo/client";
import {queryPersonalizedAdsVariant} from "../../graphql-app";
import {CxsCtx} from "../../unomi/cxs";
import {JahiaCtx} from "../../context";
import {EmbeddedPathInHtmlResolver} from "../jahia";
import {Card, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material';
import {Media} from "../media";
import {getTypes, resolveLinkToURL} from 'misc/utils'

export const Ads = (props) => {
    const {adsid} = props;
    const cxs = useContext(CxsCtx);
    const {workspace, locale, host, isPreview, isEdit} = useContext(JahiaCtx);
    const [loadVariant, variantQuery] = useLazyQuery(queryPersonalizedAdsVariant);

    React.useEffect(() => {
        if (adsid && cxs) {
            loadVariant({
                variables: {
                    workspace,
                    id:adsid,
                    language: locale,
                    profileId: cxs.profileId,
                    sessionId: cxs.sessionId,
                }
            })
        }
    },[loadVariant,workspace,locale, adsid, cxs])

    // const {data, error, loading} = useQuery(queryPersonalizedAdsVariant, {
    //     variables: {
    //         workspace,
    //         id:adsid,
    //         language: locale,
    //         profileId: cxs.profileId,
    //         sessionId: cxs.sessionId,
    //     }
    // });
    if (variantQuery.error) return <p>Error :(</p>;
    if (!variantQuery.data || variantQuery.loading)
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
                    <Typography className="w-75" variant="body2" color="#CCC">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias iste ipsa excepturi nostrum sequi molestias?
                    </Typography>
                </CardContent>
            </Card>
        );

    const variant = variantQuery.data?.jcr?.nodeById?.jExperience?.resolve?.variant
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
    adsid: PropTypes.string
};