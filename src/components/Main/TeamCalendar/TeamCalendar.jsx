import Table from '../../../commons/Table';
import { getCorrectDateFormat } from '../../../utils/dateformat';

const TeamCalendar = (props) => {
  const titles = [
    'Matchday',
    'Home team',
    'Score',
    'Away Team',
    'Date',
    'Main Refere',
  ];
  const { from, to } = props.filter;
  const fromDate = from ? from.getTime() : null;
  const toDate = to ? to.getTime() : null;

  return (
    <Table titles={titles}>
      {props.state.matches.map((match) => {
        const { homeTeam: homeScore, awayTeam: awayScore } = match.score.fullTime;
        const score = homeScore !== null && awayScore !== null ? `${homeScore}:${awayScore}` : 'no data';

        const matchDate = new Date(match.utcDate).getTime();
        const filter = fromDate !== null && toDate !== null
          ? matchDate > fromDate && matchDate < toDate
          : true;

        if (!filter) return null;

        const homeTeamStyle = match.score.winner === 'HOME_TEAM'
          ? { backgroundColor: 'green', color: 'white' }
          : match.score.winner === 'AWAY_TEAM'
            ? { backgroundColor: 'coral', color: 'white' }
            : {};
        const awayTeamStyle = match.score.winner === 'AWAY_TEAM'
          ? { backgroundColor: 'green', color: 'white' }
          : match.score.winner === 'HOME_TEAM'
            ? { backgroundColor: 'coral', color: 'white' }
            : {};

        return (
          <tr key={match.id}>
            <td>{match.matchday}</td>
            <td style={homeTeamStyle}>{match.homeTeam.name}</td>
            <td>{score}</td>
            <td style={awayTeamStyle}>{match.awayTeam.name}</td>
            <td>{getCorrectDateFormat(match.utcDate)}</td>
            <td>
              {match.referees.length ? match.referees[0].name : 'no data'}
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

export default TeamCalendar;
