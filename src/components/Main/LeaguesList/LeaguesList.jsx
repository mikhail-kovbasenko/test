import { NavLink } from 'react-router-dom';
import Table from '../../../commons/Table';


const LeaguesList = props => {
	if (!props.data.competitions) return null;
	
	const titles = ['Name', 'Country', 'Flag', 'Last Update', 'Calendar', 'Teams'];
	
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