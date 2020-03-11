import React from 'react';
import './TtpMenu.scss';


const TtpMenu = ({vid, playing, menuIndex, updateMenu}) => {
	const menuItems = ['Episodes', 'Info', 'Enter Timberwolves.com'];

	return(
		<div className={`ttp__menu` + ((typeof vid === "string") ? ` ttp__menu--loaded` : ``) + (playing ? ` ttp__menu--hidden`: ``)}>
			<ul className={`ttp__menu__slide`}>
				{menuItems.map((item, idx) => (
					<li key={item} 
							className={`ttp__menu__item text-center` + (idx === menuIndex ? ` ttp__menu__item--active` : ``)}
							onClick={() => updateMenu(item, idx)}>
							{(item === 'Enter Timberwolves.com') ? <a href="https://www.nba.com/timberwolves" target='_blank' rel="noopener noreferrer"><span>{item}</span></a> : <span>{item}</span>}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TtpMenu;