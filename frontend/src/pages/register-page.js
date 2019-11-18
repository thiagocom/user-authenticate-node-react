import React from "react"
import { withFormik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import api from "../services/api"
import "./Pages.css"

function Registerpage(props) {
	return (
		<Form>
			<div className="Form-Group">
				<Field className="Form-Field" type="text" name="username" placeholder="Username" />
			</div>
			<ErrorMessage name="username">
				{ message => <div className="Error-Message"><p>{ message }</p></div> }
			</ErrorMessage>
			<div className="Form-Group">
				<Field className="Form-Field" type="password" name="password" placeholder="Password" />
			</div>
			<ErrorMessage name="password">
				{ message => <div className="Error-Message"><p>{ message }</p></div> }
			</ErrorMessage>
			<button type="submit">Sign up</button>
		</Form>
	)
}

const EnhancedForm = withFormik({
	mapPropsToValues: () => ({ username: "", password: "" }),
	handleSubmit: async (values, { setSubmitting }) => {
		const response = await api.post("/register", values)
		const data = await response.data
		localStorage.setItem("auth_token", data.token)
		setSubmitting(false)
	},
	validationSchema: yup.object().shape({
		username: yup.string().min(4).max(8).required(),
		password: yup.string().min(4).max(8).required()
	})
})

export default EnhancedForm(Registerpage)