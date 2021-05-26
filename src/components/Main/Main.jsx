import { useState } from 'react';
import { Route, withRouter } from 'react-router';
import { getPathName } from '../../utils/getpathname';
import LeagueCalendarContainer from './LeagueCalendar/LeagueCalendarContainer';
import LeaguesListContainer from './LeaguesList/LeaguesListContainer';
import style from './Main.module.css';
import TeamCalendarContainer from './TeamCalendar/TeamCalendarContainer';
import TeamsListContainer from './TeamsList/TeamsListContainer';

const Main = props => {
	const {data, handlers} = props.state;

	const {season, search, fromFilter, toFilter} = data;
	const {setSeason, setSearch, setFilterFrom, setFilterTo, setReturnSrc} = handlers;
	
	const [title, setTitle] = useState('Leagues List');

	const changeTitle = value => setTitle(value);	
	const changeUrl = (param, value) => {
		const pathname = props.location.pathname;
		const name = getPathName(pathname);
		let url = '';
	
		switch(name) {
			case '/leagues_list': 
			case '/teams_list': {
				const seasonParam = param === 'season' ? value : season;
				const searchParam = param === 'search' ? value : search;
				url = `${props.location.pathname}?season=${seasonParam}&search=${searchParam}`;

				//setReturnSrc(`/leagues_list?season=${seasonParam}`);
			}; break;
			case '/league_calendar':
			case '/team_calendar': {
				const seasonParam = param === 'season' ? value : season;
				const fromParam = param === 'from' ? value : fromFilter;
				const toParam = param === 'to' ? value : toFilter;

				url = `${props.location.pathname}?season=${seasonParam}&from=${fromParam}&to=${toParam}`;

				// name === '/league_calendar'
				// ? setReturnSrc(`/leagues_list?season=${seasonParam}`)
				// : setReturnSrc(`/teams_list/?season=${seasonParam}`)
			}
			break;
		}

		props.history.push(url);
	}
	
	const getLeaguesList = () => <LeaguesListContainer season={season}
																		search={search} 
																		setSearch={setSearch}
																		setReturnSrc={setReturnSrc}/>;
	const getTeamsList = () => <TeamsListContainer season={season} 
																  search={search} 
																  changeTitle={changeTitle}
																  setReturnSrc={setReturnSrc}/>;
	const getLeagueCalendar = () => <LeagueCalendarContainer season={season}  
																			   filterFrom={fromFilter} 
																				filterTo={toFilter} 
																				changeTitle={changeTitle}
																				setReturnSrc={setReturnSrc}/>;
	const getTeamCalendar = () => <TeamCalendarContainer season={season}  
																	     filterFrom={fromFilter} 
																		  filterTo={toFilter}
																		  setReturnSrc={setReturnSrc}/>;

	const onChangeField = event => {
		const name = event.target.dataset.name;
		const value = event.target.value;	
		
		switch(name) {
			case 'season': setSeason(value); break;
			case 'search': setSearch(value); break;
			case 'from': setFilterFrom(value); break;
			case 'to': setFilterTo(value); break;
		}
		console.log(name, value);
		changeUrl(name, value);
	}

	if(props.history.location.pathname === '/leagues_list' && title !== 'Leagues List') setTitle('Leagues List');

	if(!season) {
		const currentYear = new Date().getFullYear() - 1;
		const pathname = `/leagues_list?season=${currentYear}`;
		
		setReturnSrc(pathname);
		setSeason(currentYear);

		props.history.push(pathname);
	}

	return (
		<div className={style.main}>
			<div className={style.panel}>
				<div className={style.select_year}>
					<label>Select year:</label>
					<div>
						<select value={season} onChange={onChangeField} className="textbox" data-name="season">
							<option value="2010">2010/2011</option>
							<option value="2011">2011/2012</option>
							<option value="2012">2012/2013</option>
							<option value="2013">2013/2014</option>
							<option value="2014">2014/2015</option>
							<option value="2015">2015/2016</option>
							<option value="2016">2016/2017</option>
							<option value="2017">2017/2018</option>
							<option value="2018">2018/2019</option>
							<option value="2019">2019/2020</option>
							<option value="2020">2020/2021</option>
						</select>
					</div>
				</div>
				<Route path="/(leagues_list|teams_list)" render={() => {
						return (
							<div className={style.search_input}>
								<label>Search:</label>
								<div>
									<input type="text" 
										    className="textbox" 
											 placeholder="Search..." 
											 value={search} 
											 data-name="search"
											 onChange={onChangeField}/>
								</div>
							</div>
						)
					}}></Route>
				<Route path="/(league_calendar|team_calendar)" render={() => {
					return (
						<div className={style.filter}>
							<div>
								<label>From:</label>
								<input type="date"
										 className="textbox"
									    data-name="from" 
										 value={fromFilter}
										 onChange={onChangeField}/>
							</div>
							<div>
								<label>To:</label>
								<input type="date"
										 className="textbox"
										 data-name="to" 
										 value={toFilter}
										 onChange={onChangeField}/>
							</div>
						</div>
					)
				}}>

				</Route>
			</div>
			<div className={style.title}>{title}</div>
			<div className={style.content}>
				<Route exact path="/" render={getLeaguesList}/>
				<Route path="/teams_list/:league_id" render={getTeamsList}/>
				<Route path="/league_calendar/:league_id" render={getLeagueCalendar}/>
				<Route path="/team_calendar/:league_id/:team_id" render={getTeamCalendar}/>
			</div>
		</div>
	)
}

export default withRouter(Main);