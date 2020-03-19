import React from 'react';
import './TtpText.scss';


const TtpText = ({className, headerText, bodyText, image}) => {
	return(
		<div className={`ttp__text ` + className}>
      <h3 className='text-center mb-2 mt-3'>{headerText}</h3>
      <div className='d-flex flex-wrap'>
				<div className={'col-12 ' + (!image ? ` ` : `col-lg-4 offset-lg-2`)}>
		      <p className={!image ? `text-left` : `text-lg-right mb-3 mb-md-0`}>{bodyText}</p>
	      </div>
	      {image && (
	      	<div className='col-12 col-lg-4 col-md-6 offset-md-3 offset-lg-0'>
	      		<a href='https://www.toyota.com/tundra/' target='_blank' rel="noopener noreferrer">
	      			<img alt='presented by toyota ad messaging' src={image} className='img-fluid' />
      			</a>
    			</div>
      	)}
      </div>
    </div>
	);
}

export default TtpText;