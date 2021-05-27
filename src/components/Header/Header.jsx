import { NavLink } from 'react-router-dom';
import style from './Header.module.css';
import logo from './header-logo.jpg';

const Header = props => {
	return (
		<div className={style.header}>
			<div className={style.header_content}>
				<div className={style.header_logo}>
					<img src={logo} alt="" className={style.header_img} />
				</div>
				<div className={style.header_nav}>
					<div className={style.header_nav_content}>
						<div className={style.header_nav_item}>
							<NavLink to={props.src}>Return</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
