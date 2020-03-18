import React from 'react';
import { useMediaQuery } from 'react-responsive'
import './TtpErrorPage.scss';
import './VideoDetail.scss';

const TtpErrorPage = ({handlePlayButton}) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 })
  const isPortrait = useMediaQuery({ orientation: 'portrait' })
	return(
		<div className="ttp__errorpage">
		<div className={'ttp__toyota'}><p className={'text-center'}style={{'margin':0,'color':'#fff'}}><span className={`align-middle`}>PRESENTED BY </span><img alt={'toyota logo'} src={'https://www.nba.com/resources/static/team/v2/timberwolves/projects/2019-20/ttp/toyota_logo.svg'} style={{'maxWidth':'150px'}}/></p></div>
		<div className="ttp__errorpage__body">
      <div className={'h-100 position-relative'}>
	      <div className={'video_detail__block position-absolute abs-center--vertical ' + (isPortrait || (isTabletOrMobile&&!isPortrait) ? 'col-12' : 'offset-md-2 col-md-6')}>
	          <div className={'mb-3 ttp__toyota' + (isTabletOrMobile ? ` d-none` : ` d-block`)}><p className={'text-left'}style={{'margin':0,'color':'#fff'}}><span className={`align-middle`}>PRESENTED BY </span><img alt={'toyota logo'} src={'https://www.nba.com/resources/static/team/v2/timberwolves/projects/2019-20/ttp/toyota_logo.svg'} style={{'maxWidth':'150px'}}/></p></div>
	          <h2 className='video_detail__header font-weight-bold text-uppercase'>We're having trouble with your connection.</h2>
	          <p className={`video_detail__text`}>Don't worry, you can still track the pack.</p>
	          <div className={'video_detail__cta video_detail__cta--loaded ' + ((isPortrait || (isTabletOrMobile&&!isPortrait)) ? 'text-center' : 'text-left')}>
	              <button className={'btn-lg text-uppercase'} onClick={() => {handlePlayButton()}}><span>WATCH HERE</span></button>
	          </div>
	      </div>
      </div>
    </div>
    </div>
	);
}

export default TtpErrorPage;