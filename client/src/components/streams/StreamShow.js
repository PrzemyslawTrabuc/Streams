import React, {useEffect, useRef, createRef, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../Actions';
import {useParams} from "react-router-dom";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const StreamShow = ({fetchStream, stream}) => {
    const {id} = useParams();
    // const videoRef = useRef();
    // const player = createRef(null);
    const videoRef2 = useRef(null);
    const playerRef2 = useRef(null);

    // const onVideo = useCallback((el) => {
    //     console.log(el)
    //     setVideoEl(el);
    // }, []);
    const newVideo = () => {
        if (playerRef2.current || !stream) {
            return;
        }
        playerRef2.current = videojs(videoRef2.current, {
                controls: true,
                autoplay: true,
                preload: 'auto',
                fluid: true,
                sources: [{
                    src: 'http://localhost:8000/live/1/index.m3u8',
                }]
            }
        );
        // playerRef2.current.on('error', function(){
        //     console.log(playerRef2.current.error());
        // })

    }

    useEffect(() => {
        fetchStream(id);
    }, [])

    useEffect(() => {
        newVideo();
    })

    useEffect(() => {
        const player = playerRef2.current;
        return () => {
            if (player) {
                player.dispose();
                playerRef2.current = null;
                console.log("destroyed player")
            }
        }
    }, [playerRef2])

    // const buildPlayer = () => {
    //     if (player.current || !stream) {
    //         return;
    //     }
    //     player.current = flv.createPlayer({
    //         type: 'flv',
    //         url: `http://localhost:8000/live/${id}.flv`
    //     });
    //     player.current.attachMediaElement(videoRef.current)
    //     player.current.load();
    //     console.log("build")
    // }

    const renderStream = (stream) => {
        if (stream) {
            const {title, description} = stream;
            return (
                <div className="data-vjs-player">
                    {/*<video id="video" ref={videoRef} style={{width: '100%'}} controls></video>*/}
                    <h1>{title}</h1>
                    <h5>{description}</h5>
                    <video style={{marginLeft: 'auto', marginRight: 'auto'}} className="vjs-matrix video-js"
                           ref={videoRef2}></video>
                </div>
            );
        } else {
            return 'Loading...'
        }
    }

    return (
        <div>
            {renderStream(stream)}
            {/*<video*/}
            {/*    id="my-video"*/}
            {/*    ref={onVideo}*/}
            {/*    className="video-js vjs-theme-city"*/}
            {/*    playsInline*/}
            {/*    controls*/}
            {/*    preload="auto"*/}
            {/*    width="640"*/}
            {/*    height="264"*/}
            {/*    autoPlay*/}
            {/*    >*/}
            {/*<source*/}
            {/*    src="http://localhost:8000/live/1/index.m3u8"*/}
            {/*    type="hls" />*/}
            {/*</video>*/}
        </div>
    )
};

const mapStateToProps = (state) => ({
    stream: state.streams[window.location.pathname.split("/")[window.location.pathname.split('/').length - 1]]
});

export default connect(mapStateToProps, {fetchStream})(StreamShow);