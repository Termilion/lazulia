import * as React from 'react'

import { Navbar, Nav } from "react-bootstrap";

import styles from "./Layout.module.css";

type LayoutProps = {
	title?: string
}

class BasicLayout extends React.Component<LayoutProps> {
	render() {
		return (
			<div>
				<Navbar className={styles.nav} bg="dark" variant="dark" expand="lg" sticky="top">
					<Navbar.Brand href="/">Lazulia</Navbar.Brand>
					<Navbar.Toggle aria-controls="main-menu" />
  					<Navbar.Collapse id="main-menu">
						<Nav.Link className={styles.navItem} href="/">Home</Nav.Link>
						<Nav.Link className={styles.navItem} href="/about">About</Nav.Link>
						<Nav.Link className={styles.navItem} href="/blog">Blog</Nav.Link>
					</Navbar.Collapse>
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
