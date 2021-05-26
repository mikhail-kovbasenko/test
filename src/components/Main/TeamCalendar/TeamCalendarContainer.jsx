import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { api } from "../../../api/api";
import { Preloader } from "../../../commons/Preloader";
import TeamCalendar from "./TeamCalendar";

const TeamCalendarContainer = props => {
	const {team_id, league_id} = props.match.params;
	const [state, setState] = useState({
		matches: null,
		season: null
	});
	const filterData = {
		from: props.filterFrom ? new Date(props.filterFrom) : null,
		to: props.filterTo ? new Date(props.filterTo) : null
	}

	const filterMatchesByTeam = (matches, team_id) => {
		return matches.filter(match => {
			if(match.homeTeam.id === team_id || match.awayTeam.id === team_id) {
				return match;
			}
		})
	}
	useEffect(() => {
		(async () => {
			api.getAllMatchesByLeague(league_id, props.season).then(data => {
				setState({
					matches: filterMatchesByTeam(data.matches, +team_id),
					season: props.season
				})
			})
		})()
	}, [props.season])
	return state.matches && state.season === props.season
			 ? <TeamCalendar state={state} filter={filterData}/>
			 : <Preloader/>
}

export default withRouter(TeamCalendarContainer);