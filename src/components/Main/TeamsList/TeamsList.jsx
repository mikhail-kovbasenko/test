import { NavLink } from "react-router-dom";
import Table from "../../../commons/Table";

const TeamsList = props => {
	const titles = ['№', 'Name', 'Logo', 'Venue', 'Phone', 'Web Site', 'Address', 'Calendar'];
	
	console.log(props.data.teams);
	return (
		<Table titles={titles}>
			{
				props.data.teams.map((team, index) => {
					if(team.name.indexOf(props.search) === -1) return null;
					return <tr key={team.id}>
						<td>{index + 1}</td>
						<td>{team.name}</td>
						<td>
							{
								team.crestUrl 
								? <img src={team.crestUrl} alt="" />
								: 'no logo'
							}
						</td>
						<td>{team.venue}</td>
						<td>{team.phone}</td>
						<td><a href={team.website} target="_blank">{team.website}</a></td>
						<td>{team.address}</td>
						<td>
							<NavLink to={`/team_calendar/${props.data.competition.id}/${team.id}?season=${props.season}`} className="button">SHOW CALENDAR</NavLink>
						</td>	
					</tr>
				})
			}
		</Table>
	)
}

export default TeamsList;