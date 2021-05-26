import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { api } from "../../../api/api";
import { Preloader } from "../../../commons/Preloader";
import LeaguesList from "./LeaguesList";

const query = require('query-string');

const LeaguesListContainer = props => {
	const [state, setState] = useState({
		competitions: null,
		count: 0
	});
	const season = query.parse(props.location.search).season;

	useEffect(() => {
		(async () => {
			api.getLeagues().then(data => {
				setState({
					competitions: data.competitions,
					count: data.count
				});
			})
		})();
		props.setReturnSrc('/leagues_list?season=' + season)
	}, [])
	
	return state.count < 1 
			 ? <Preloader/>
			 : <LeaguesList data={state} search={props.search} season={season} onClick={props.onClickOnLink} setSearch={props.setSearch}/>
}

export default withRouter(LeaguesListContainer);