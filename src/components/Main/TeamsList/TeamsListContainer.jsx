import { useEffect, useState } from "react";
import { withRouter } from "react-router"
import { api } from "../../../api/api";
import { Preloader } from "../../../commons/Preloader";
import TeamsList from "./TeamsList";

const query = require('query-string');

const TeamsListContainer = props => {
	const [state, setState] = useState({
		competition: null,
		teams: null,
		season: null,
		count: 0
	})
	const league_id = +props.match.params.league_id;
	const season = +query.parse(props.location.search).season;

	console.log(league_id, season);

	useEffect(() => {
		(async () => {
			api.getTeamsByLeague(league_id, season).then(({competition, teams, season, count}) => {
				setState({competition, teams, season, count});
				props.changeTitle(competition.name);
			});
		})()
	}, [season])

	return state.count < 1 
			 ? <Preloader/>
			 : <TeamsList data={state} search={props.search} season={props.season}/>
}

export default withRouter(TeamsListContainer);