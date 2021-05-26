import { useState } from "react";
import { withRouter } from "react-router";
import App from "./App";

const query = require('query-string');

const AppContainer = props => {
	const {
		season: seasonParam = null,
		search: searchParam = '',
		from = '',
		to = ''
	} = query.parse(props.location.search);
	
	const [season, setSeason] = useState(seasonParam);
	const [search, setSearch] = useState(searchParam);
	const [fromFilter, setFilterFrom] = useState(from);
	const [toFilter, setFilterTo] = useState(to);
	const [returnSrc, setReturnSrc] = useState('');

	const state = {
		data: {season, search, fromFilter, toFilter},
		handlers: {setSeason, setSearch, setFilterFrom, setFilterTo, setReturnSrc}
	}
	
	return (
		<App state={state} returnSrc={returnSrc}/>
	)
}

export default withRouter(AppContainer);