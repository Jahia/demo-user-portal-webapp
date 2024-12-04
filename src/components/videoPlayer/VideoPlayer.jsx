import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

export const VideoPlayer = props => {
    const {videoURL/* ,ownerID,videoId */} = props;
    // Const { quizId,quizPath,quizType, isPreview } = React.useContext(JahiaCtx);

    const player = useRef(null);

    // Const handleVideoStatus = ({status}) => {
    //     if(!isPreview)
    //         syncVideoStatus({
    //             quiz:{
    //                 id:quizId,
    //                 path:quizPath,
    //                 type:quizType
    //             },
    //             parentId:ownerID,
    //             player,
    //             status,
    //             video:{
    //                 id:videoId,
    //                 url:videoURL
    //             }
    //         })
    // }

    // const onReadyHandler = () => {
    //     console.log("onReady seekTo 4.2s")
    //     player.current.seekTo(4.2,"seconds");
    // }
    const onStartHandler = () => {
        // Player.current.seekTo(4.2,"seconds");
    };
    // Const onPlayHandler = () => handleVideoStatus({status:"started"});
    // const onEndedHandler = () => handleVideoStatus({status:"end"});
    // const onPauseHandler = () => handleVideoStatus({status:"pause"});

    return (
        <div className>
            <ReactPlayer
                ref={player}
                controls
                className="react-player"
                url={videoURL}
                width="100%"
                // Height='100%'
                // onReady={onReadyHandler}
                onStart={onStartHandler}
                // OnProgress={(object)=> console.log("onProgress : ",object)}
                // onPlay={onPlayHandler}
                // onSeek={(seconds)=> console.log("onSeek : ",seconds)}
                // onDuration={(seconds)=> console.log("onDuration :",seconds)}
                // onPause={onPauseHandler}
                // onEnded={onEndedHandler}
            />
        </div>
    );
};

VideoPlayer.propTypes = {
    videoURL: PropTypes.string.isRequired
    // OwnerID: PropTypes.string.isRequired
};
