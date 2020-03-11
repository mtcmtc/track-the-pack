import React from 'react';
import './VideoItem.scss'


const VideoItem = ({video, id, active, handleVideoSelect}) => {
  return(
  	<div onClick={ () => handleVideoSelect(video, id)} className={'video_item ' + (active ?  'video_item--active': '')} id={id}>
  		<img className='video_item__thumbnail' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
  		<div className='video_item__info'>
  			<div className='video_item__header'>{video.snippet.title}</div>
		</div>
	</div>
  )
};
  
export default VideoItem;