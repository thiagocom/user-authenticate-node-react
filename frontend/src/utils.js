import api from "./services/api"

export const authenticate = async () => {
	api.get("/authenticate")
		.then(response => {
			console.log("response", response.data)
			return response.data
		})
		.then(data => data.success)
		.catch(err => {
			console.log("error", err.response.data)
			return false
		})
}
