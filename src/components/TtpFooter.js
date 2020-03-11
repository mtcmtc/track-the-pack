import React from 'react';
import './TtpFooter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';


const TtpFooter = () => {
	return(
		<div className="ttp__footer border-top mt-3 pt-4 text-center">
      <a href="https://www.nba.com/timberwolves" target="_blank" rel="noopener noreferrer"><img src="https://www.nba.com/.element/media/2.0/teamsites/timberwolves/media/mntw-tagline-on-navy.png" className="img-fluid pl-5 pr-5" style={{'maxWidth':'300px'}}alt="minnesota timberwolves footer logo" /></a>
      <div className="text-center ttp__footer__social">
				<a href="https://twitter.com/timberwolves" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className='m-2' icon={faTwitter} /></a>
				<a href="https://www.facebook.com/MNTimberwolves" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className='m-2' icon={faFacebook} /></a>
				<a href="https://www.instagram.com/timberwolves" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className='m-2' icon={faInstagram} /></a>
      </div>
      <sub className={`pb-2`}style={{'fontSize':'.5rem'}}>© 2020 Minnesota Timberwolves. All Rights Reserved. <a href="https://www.nba.com/timberwolves?spot=memberPurl">Timberwolves.com</a></sub>
    </div>
	);
}

export default TtpFooter;