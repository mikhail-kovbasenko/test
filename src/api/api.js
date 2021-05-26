import axios from "axios";

const instance = axios.create({
	baseURL: 'https://api.football-data.org/v2/',
	headers: {
		'X-Auth-Token': process.env.REACT_APP_API_KEY,
	}
})

export const api = {
	getLeagues() {
		return instance.get(`competitions/`).then(response => {
			if(response.request.readyState === 4) {
				console.log(response.data);	
				return response.data;
			}
		})
	},
	getTeamsByLeague(id, season) {
		return instance.get(`competitions/${id}/teams?season=${season}`).then(response => {
			if(response.request.readyState === 4) {
				return response.data;
			}
		})
	},
	getAllMatchesByLeague(id, season) {
		return instance.get(`competitions/${id}/matches?season=${season}`).then(response => {
			if(response.request.readyState === 4) {
				return response.data;
			}
		})
	},
	// getAllMatchesByTeam(id) {
	// 	return instance.get(`teams/${id}/matches`).then(response => {
	// 		if(response.request.readyState === 4) {
	// 			return response.data;
	// 		}
	// 	});
	// }
}