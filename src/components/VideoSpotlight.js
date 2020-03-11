import PropTypes from 'prop-types';
import React from 'react';
import youtube from '../apis/youtube';

// import classes from 'styles/VideoSpotlight.module.css';
const KEY = 'AIzaSyCshGUfuCjvrprMANR6onqIz2J36AdPyWU'
const PLAYLISTID = 'PLyzNV4-Mntvn5BFbkjQheeuP6Ie3MHGQY';

class VideoSpotlight extends React.Component {
  static propTypes = {
    setPlayerState: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded
    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  };

  loadVideo = async () => {
    
    const response = await youtube.get('/playlistItems', {
      params: {
        part: 'snippet',
        key: KEY,
        type: 'video',
        maxResults: 20,
        playlistId: PLAYLISTID
        //q: termFromSearchBar
      }
    })

    const videoArray = [...response.data.items].slice(0).reverse();
    const firstVideo = videoArray[0];
    const player = firstVideo.snippet.resourceId.videoId;

    this.props.setPlayerState(this.props.videoArray, this.props.firstVideo, this.props.player);

    const { videoId } = this.props;

    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player(`youtube-player-${videoId}`, {
      videoId: videoId,
      events: {
        onReady: this.onPlayerReady,
      },
    });
    console.log(this.player);
  };

  onPlayerReady = event => {
    console.log('video loaded');
    event.target.playVideo();
  };

  render = () => {
    const { videoId } = this.props;


    return (
      <div><div id={`youtube-player-${videoId}`}  /></div>
    );
  };
}

export default VideoSpotlight;