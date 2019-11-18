import React from "react"
import { Link } from "react-router-dom"

function Header(props) {
	return (
		<header className="Header">
			<nav>
				<li className="Nav-Item">
					<Link className="Nav-Link" to="/">Home</Link>
				</li>
				<li className="Nav-Item">
					<Link className="Nav-Link" to="/register">Sign up</Link>
				</li>
				<li className="Nav-Item">
					<Link className="Nav-Link" to="/login">Sign in</Link>
				</li>
			</nav>
		</header>
	)
}

export default Header