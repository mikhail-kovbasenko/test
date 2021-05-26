import './Preloader.css';

export const Preloader = props => {
	return (
		<div style={{
			width: '450px',
			margin: '0 auto',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		</div>
	)
}

