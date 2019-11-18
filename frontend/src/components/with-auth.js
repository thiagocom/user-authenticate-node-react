import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import api from "../services/api"

function withAuth(ComponentProtect) {

	return class extends Component {

		constructor(props) {
			super(props)
			this.state = {
				loading: true,
				redirect: false
			}
		}

		async componentDidMount() {
			try {
				const response = await api.get("/authenticate", {
					headers: {
						"Authorization": localStorage.getItem("auth_token")
					}
				})
				const data = await response.data
				if (data.success) {
					this.setState({ loading: false })
				} else {
					this.setState({ loading: false, redirect: true })
				}
			} catch (err) {
				this.setState({ loading: false, redirect: true })
			}
		}

		render() {
			const { loading, redirect } = this.state
			if (loading) {
				return null
			}
			if (redirect) {
				return <Redirect to="/login" />
			}
			return <ComponentProtect { ...this.props } />
		}

	}
}

export default withAuth