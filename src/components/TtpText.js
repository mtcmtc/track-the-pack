import React from 'react';
import './TtpText.scss';


const TtpText = ({className, headerText, bodyText}) => {
	return(
		<div className={`ttp__text ` + className}>
      <h3 className='text-center mb-2 mt-3'>{headerText}</h3>
      <p className='mb-3'>{bodyText}</p>
    </div>
	);
}

export default TtpText;