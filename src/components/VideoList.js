import React from 'react';
import VideoItem from './VideoItem';

import './VideoList.scss'



const VideoList = ({videos, selected, playing, handleVideoSelect}) => {

  const renderedVideos = videos.map(function(video) {
    if(video.snippet.title === "Deleted video"){
      return false;
    } const videoId = (video.kind === "youtube#playlistItem") ? `${video.snippet.resourceId.videoId}` : `${video.id.videoId}`;
      const selectedId = (video.kind === "youtube#playlistItem") ? `${selected.snippet.resourceId.videoId}` : `${selected.id.videoId}`;
      return <VideoItem video={video} handleVideoSelect={handleVideoSelect} id={videoId} key={videoId} active={selectedId === videoId}/>
  });

  return <div className={`ttp__playlist pb-3 ` + (playing  ? `ttp__playlist--hidden` : ``)}>{renderedVideos}</div>
}
  
export default VideoList;