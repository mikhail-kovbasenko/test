import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { api } from "../../../api/api";
import { Preloader } from "../../../commons/Preloader";
import LeagueCalendar from "./LeagueCalendar";

const LeagueCalendarContainer = props => {
	const id = +props.match.params.league_id;
	const [state, setState] = useState({
		competition: null,
		matches: null,
		count: 0,
		season: null
	});
	const filterData = {
		from: props.filterFrom ? new Date(props.filterFrom) : null,
		to: props.filterTo ? new Date(props.filterTo) : null
	}

	
	useEffect(() => {
		(async () =>{
			api.getAllMatchesByLeague(id, props.season).then(({competition, matches, count}) => {
				setState({competition, matches, count, season: props.season});
				props.changeTitle(competition.name);
			})
		})()
		props.setReturnSrc('/leagues_list?season=' + props.season);
	}, [props.season]);
	return state.count < 1 || state.season !== props.season
		    ? <Preloader/>
			 : <LeagueCalendar state={state} filter={filterData}/>
}

export default withRouter(LeagueCalendarContainer);