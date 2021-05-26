import style from './Table.module.css';

const Table = props => {
	const getTitles = props.titles.map((title, index) => {
		return <th key={index}>{title}</th>
	})
	return (
		<div className={style.table}>
			<div className={style.table_container}>
				<table>
					<thead>
						<tr>
							{getTitles}
						</tr>
					</thead>
					<tbody>
						{props.children}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Table;