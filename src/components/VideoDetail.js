import React from 'react';
import { useMediaQuery } from 'react-responsive'
import './VideoDetail.scss';

const VideoDetail = ({video, playing, playerLoaded, played, handlePlayButton, handlePauseButton}) => {
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1024 })
    // const isBigScreen = useMediaQuery({ minDeviceWidth: 1440 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 })
    // const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1023 })
    const isPortrait = useMediaQuery({ orientation: 'portrait' })
    // const isRetina = useMediaQuery({ minResolution: '2dppx' })

    if (!video) {
        return <div>Loading ...</div>;
    }

    const videoId = (video.kind === "youtube#playlistItem") ? `${video.snippet.resourceId.videoId}` : `${video.id.videoId}`;
    const videoDetailStyle = {
        'desktop' : 'linear-gradient(to left, rgba(0, 0, 0, 0) 30%, #0C2340 60%, #0C2340), ',
        'mobile' : 'linear-gradient(rgba(0, 0, 0, 0) 60%, rgb(12, 35, 64))'
    }
    const videoDetailBg = (isPortrait || (isTabletOrMobile&&!isPortrait) ? '' : videoDetailStyle.desktop) + `url(${(video.kind !== "youtube#playlistItem") ? video.snippet.thumbnails.high.url : ((video.snippet.thumbnails.maxres) ? video.snippet.thumbnails.maxres.url : video.snippet.thumbnails.high.url)})`;
    const longDescription = (video.snippet.description.length > 270) ? true : false;

    const handleReadMore = (e) => {
        const text = e.target.previousElementSibling;
        if (text.className === 'video_detail__text--limit'){
            text.className = 'video_detail__text--clicked';
            text.nextElementSibling.innerHTML = 'READ LESS (-)'
        }else{
            text.className = 'video_detail__text--limit';
            text.nextElementSibling.innerHTML = 'READ MORE (+)'
        }
    }
    // console.log(isPortrait&&!isPortrait)
    return (
        <div className='video_detail position-relative'>
            <div className={'ttp__toyota'}><p className={'text-center'}style={{'margin':0,'color':'#fff'}}><span className={`align-middle`}>PRESENTED BY </span><img alt={'toyota logo'} src={'https://www.nba.com/resources/static/team/v2/timberwolves/projects/2019-20/ttp/toyota_logo.svg'} style={{'maxWidth':'150px'}}/></p></div>
            <div className={`video_detail__close ` + (playerLoaded && playing ? 'video_detail__close--visible' : '')} onClick={()=>{handlePauseButton()}}>
                <div className="bk-btn">
                    <span className="bk-btn-triangle"></span>
                    <span className="bk-btn-bar"></span>
                </div>
                <span>BACK TO BROWSE</span>
            </div>

            <div className='ttp__viewport--responsive'>
                <div id={`ttp_player--${videoId}`}></div>
                <div className='video_detail__overlay m-0' style={{
                    'backgroundImage': videoDetailBg,
                    'backgroundPosition': 'center',
                    'overflow': 'hidden',
                    'transition': 'height 0s, opacity .5s linear',
                    'height': ((!playing) ? '100%' : '0'),
                    'opacity': ((!playing) ? '1' : '0')
                }}>
                </div>
            </div>
            <div className={(isPortrait || (isTabletOrMobile&&!isPortrait) ? 'col-12' : 'col-md-5 position-absolute abs-center--vertical') + ' video_detail__block m-0 ' + ((playing && isDesktopOrLaptop) ? 'd-none' : 'd-block')}>
                <div className={'mb-3 ttp__toyota' + (isTabletOrMobile ? ` d-none` : ` d-block`)}><p className={'text-left'}style={{'margin':0,'color':'#fff'}}><span className={`align-middle`}>PRESENTED BY </span><img alt={'toyota logo'} src={'https://www.nba.com/resources/static/team/v2/timberwolves/projects/2019-20/ttp/toyota_logo.svg'} style={{'maxWidth':'150px'}}/></p></div>
                <h2 className='video_detail__header font-weight-bold text-uppercase'>{video.snippet.title}</h2>
                <p className={longDescription ? `video_detail__text--limit`:`video_detail__text`}>{video.snippet.description}</p>{longDescription ? <span className='video_detail__readmore' onClick={(e)=>{handleReadMore(e)}}>READ MORE (+)</span> : ``}
                <div className={'video_detail__cta ' + (playerLoaded ? 'video_detail__cta--loaded ' : '') + (playerLoaded && playing ? 'video_detail__cta--playing ' : '') + ((isPortrait || (isTabletOrMobile&&!isPortrait)) ? 'text-center' : 'text-left')}>
                    <div className={'lds-dual-ring'}></div>
                    <button className={'btn-lg text-uppercase'} onClick={() => {handlePlayButton()}}><span>{(played ? 'resume' : 'watch now')}</span></button>
                </div>
            </div>

        </div>
    )
}

export default VideoDetail;