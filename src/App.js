import React from 'react';
import axios from 'axios';
import dummydata from './apis/dummydata';
import VideoList from './components/VideoList';
import TtpMenu from './components/TtpMenu';
import TtpErrorPage from './components/TtpErrorPage';
import VideoDetail from './components/VideoDetail';
import TtpText from './components/TtpText';
import TtpFooter from './components/TtpFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends React.Component {
  state = {
    error: false,
    videos: [],
    selectedVideo: null,
    videoId: null,
    playing: false,
    ytPlayer: null,
    playerLoaded: false,
    played: false,
    playerState: null,
    menuSelect: 'Episodes',
    menuIndex: 0
  }

  handleLoad = () => {
    
    //console.log("Success")
    const videoArray = dummydata.items.slice(0).reverse();
    const firstVideo = videoArray[0]
    this.keyupHandler();
    this.setState({
      videos: videoArray,
      selectedVideo: firstVideo,
      videoId: firstVideo.snippet.resourceId.videoId,
    }, () => { this.loadVideo() })
  }

  keyupHandler = () => {
    window.addEventListener("keyup", (e) => {
      if(typeof this.state.ytPlayer.stopVideo === 'function'){
        if (e.keyCode === 27) this.state.ytPlayer.stopVideo();
      }
    });
  }

  scrollTo = (element, to, duration) => {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 50;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      this.scrollTo(element, to, duration - 10);
    }.bind(this), 10);
  }

  handleVideoSelect = (video, vid) => {
    this.scrollTo(document.documentElement, 0, 700);
    if (vid !== this.state.videoId){
      this.setState({
        selectedVideo: video,
        videoId: vid,
        playing: false,
        played: false
      }, () => { this.loadVideo(); })
    }
  }

  handlePlayButton = () => {
    if(!this.state.error){
      if(this.state.playerLoaded){
        this.setState({
          played: true,
        }, () => { this.state.ytPlayer.playVideo() })
      }
    }else{
      window.open('https://www.nba.com/timberwolves/video/search/?ls=channav&query=track%20the%20pack', '_blank', 'noopener');
    }
  }

  handlePauseButton = () => {
    // console.log('click');
    if(this.state.playerLoaded && this.state.playing){
      this.setState({
        playing: false,
      }, ()=> { this.state.ytPlayer.pauseVideo() })
    }
  }

  loadVideo = () => {
    // the Player object is created uniquely based on the id in props
    const player = new window.YT.Player(`ttp_player--${this.state.videoId}`, {
        playerVars : {
          host: '//',
          loop: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 1,
          controls: 1,
          iv_load_policy: 3,
          wmode: 'transparent',
          autohide: 1,
          disablekb: 0,
          fs: 1,
          html5: 1,
          enablejsapi: 1
        },
        videoId: this.state.videoId,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
    })
    this.setState({
      playerLoaded : false,
      ytPlayer : player,
    })
  }

  onPlayerStateChange = event => {
    this.setState({
      playerState: event.data
    }, () =>{
      if(event.data === 2){
        setTimeout(() =>{
          if(this.state.playerState === 2){
            this.setState({
              playing: false
            })
          }else{
            return false;
          }
        }, 300)
      }else if(this.state.playerState === -1){
        this.setState({
          playing: false
        })
      }else
        this.setState({
          playing: true
        });
    })

  }

  onPlayerReady = event => {
    // console.log('player loaded');
    this.setState({
      playerLoaded : true,
    });

  }

  updateMenu = (menuSelect, menuIndex) => {
    if (menuIndex === 2) menuIndex = this.state.menuIndex;
    this.setState({
      menuSelect,
      menuIndex
    })
  }

  componentDidMount() {
    // console.log('mounted')
    // On mount, check to see if the API script is already loaded
    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = () => {this.handleLoad()};

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.handleLoad();
    }
  };

  render(){
    const { 
      error,
      videoId, 
      selectedVideo, 
      playing, 
      playerLoaded, 
      played, 
      handlePlayButton, 
      handlePauseButton,
      videos,
      menuSelect,
      menuIndex } = this.state

    let body;

    if (!error) {
      return(
        <div className={`ttp__container container-fluid p-0` + ` menuIndex--` + menuIndex + ` ttp__player--` + (playing ? `playing` : `paused`)}>
          <VideoDetail key={videoId} video={selectedVideo} playing={playing} playerLoaded={playerLoaded} played={played} handlePlayButton={this.handlePlayButton} handlePauseButton={this.handlePauseButton}/>
          <TtpMenu vid={videoId} playing={playing} menuIndex={menuIndex} updateMenu={this.updateMenu} />
          <div className={`ttp__body`}>
            <div className={`ttp__body__slide` + ` ttp__body__slide--` + menuIndex}>
              <VideoList videos={videos} selected={selectedVideo} playing={playing} handleVideoSelect={this.handleVideoSelect}/>
              <TtpText 
                className={`ttp__info`} 
                headerText={`ABOUT TRACK THE PACK`} 
                bodyText={`There are so many stories to tell throughout a season. On the court. At home. At practice. In the community. Track The Pack is here to tell you those stories in a unique and behind-the-scenes way that you can’t experience anywhere else.`}
              />
            </div>
          </div>
          <TtpFooter />
        </div>
      )
    }

    return (
      <div className={`ttp__container container-fluid p-0`}>
        <TtpErrorPage handlePlayButton={this.handlePlayButton}/>
        <TtpFooter />
      </div>
    )
  }
}

export default App;
