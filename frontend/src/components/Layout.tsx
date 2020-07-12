import * as React from 'react'

import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "react-use-auth";
import { Link } from "react-router-dom";

import styles from "./Layout.module.css";

type LayoutProps = {
	title?: string
}

const Login = () => {
    const { isAuthenticated, login, logout } = useAuth();

    if (isAuthenticated()) {
        return <Nav.Link className={styles.login} onClick={logout}>Logout</Nav.Link>;
    } else {
        return <Nav.Link className={styles.login} onClick={login}>Login</Nav.Link>;
    }
};

class BasicLayout extends React.Component<LayoutProps> {
	render() {
		return (
			<div>
				<Navbar className={styles.nav} bg="dark" variant="dark" expand="lg" sticky="top">
					<Navbar.Brand><Link className={styles.navItem} to="/">Lazulia</Link></Navbar.Brand>
					<Navbar.Toggle aria-controls="main-menu" />
  					<Navbar.Collapse id="main-menu">
						<Link className={styles.navItem} to="/">Home</Link>
						<Link className={styles.navItem} to="/about">About</Link>
						<Link className={styles.navItem} to="/tech">Programming and More</Link>
						<Link className={styles.navItem} to="/other">Fun Stuff</Link>
					</Navbar.Collapse>
					<Login />
				</Navbar>
				<div className={styles.body}>
					<div className={styles.content}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default BasicLayout;
