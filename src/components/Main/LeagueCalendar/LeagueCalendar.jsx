import Table from "../../../commons/Table";
import { getCorrectDateFormat } from "../../../utils/dateformat";

const LeagueCalendar = props => {
	const titles = ['Home team', 'Score', 'Away Team', 'Date', 'Main Refere'];
	const rows = [];
	const {from, to} = props.filter;
	const fromDate = from ? from.getTime() : null;
	const toDate = to ? to.getTime() : null;
	let matchday = null;
	props.state.matches.map(match => {
		const { homeTeam: homeScore, awayTeam: awayScore } = match.score.fullTime;
		const matchDate = new Date(match.utcDate).getTime();
		const filter = fromDate !== null && toDate !== null
							? matchDate > fromDate && matchDate < toDate
							: true;

		const matchdayStyle = { backgroundColor: 'black', fontWeight: 'bold', color: 'white'}
		const homeTeamStyle = match.score.winner === 'HOME_TEAM' ? { backgroundColor: 'green', color: 'white' } : match.score.winner === 'AWAY_TEAM' ? { backgroundColor: 'coral', color: 'white' } : {};
		const awayTeamStyle = match.score.winner === 'AWAY_TEAM' ? { backgroundColor: 'green', color: 'white' } : match.score.winner === 'HOME_TEAM' ? { backgroundColor: 'coral', color: 'white' } : {};

		if (match.matchday !== matchday && filter) {
			matchday = match.matchday;
			const last_index = rows.length;
			rows.push(
				<tr colSpan={5} key={last_index + 1}>
					<td colSpan={5} style={matchdayStyle}>{`Matchday ${matchday}`}</td>
				</tr>
			)

		} 
		//console.log(matchday);
		if(filter) {
			rows.push(
				<tr key={match.id}>
					<td style={homeTeamStyle}>{match.homeTeam.name}</td>
					<td>{`${homeScore}:${awayScore}`}</td>
					<td style={awayTeamStyle}>{match.awayTeam.name}</td>
					<td>{getCorrectDateFormat(match.utcDate)}</td>
					<td>{
						match.referees.length
							? match.referees[0].name
							: 'no data'
					}</td>
				</tr>
			)
		}
	})
	//console.log(rows);
	return (
		<Table titles={titles}>
			{rows}
		</Table>
	)
}

export default LeagueCalendar;