import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { api } from '../../../api/api';
import Table from '../../../commons/Table';
import Context from '../../../AppContainer';
import style from './LeaguesList.module.css';
import { getPathName } from '../../../utils/getpathname';

const LeaguesList = props => {
	if (!props.data.competitions) return null;
	
	const titles = ['Name', 'Country', 'Country Info', 'Last Update', 'Calendar', 'Teams'];
	
	return (
				
				<Table titles={titles}>
					{
						props.data.competitions.map(league => {
							if(league.name.indexOf(props.search) === -1) return null;

							return (
								<tr key={league.id}>
									<td>{league.name}</td>
									<td>{league.area.name}</td>
									<td>
										{
											league.area.ensignUrl
												? <img src={league.area.ensignUrl} alt="" />
												: 'no logo'
										}
									</td>
									<td>
										{
											new Intl.DateTimeFormat('ru', {
												year: 'numeric',
												month: 'numeric',
												day: 'numeric',
												hour: 'numeric',
												minute: 'numeric',
												second: 'numeric'
											}).format(new Date(league.lastUpdated))
										}
									</td>
									<td>
										<NavLink to={`/league_calendar/${league.id}?season=${props.season}`} className="button">SHOW CALENDAR</NavLink>
								
									</td>
									<td>	
										
										<NavLink to={`/teams_list/${league.id}?season=${props.season}`} className="button" onClick={() => props.setSearch('')}>SHOW TEAMS</NavLink>
												
									</td>
								</tr>
							)
						})
					}
				</Table>
		)
	}

export default LeaguesList;