import React from "react";
import { Card, Image } from "react-bootstrap";
import { basename } from "path";
import Markdown from "react-markdown";

import Layout from '../components/Layout';
import styles from "./Blog.module.css";

import HeaderImage from "../../resources/keyboard.jpg";

import {ExpandLess, ExpandMore} from "@material-ui/icons";

const req = require.context("../../../content/", true, /\.md$/);
const docs = req.keys().map(key => {
	return {
		fileName: basename(key),
		content: req(key).default
	};
});

type PostProps = {
}

class BlogSite extends React.Component<PostProps> {
	state: {
		expanded?: number
	}

	constructor(props) {
		super(props);
		this.state = {}
	}


	render() {
		return (
			<Layout title="Blog">
				<div className={styles.header}>
					<Image src={ HeaderImage } fluid/>
					<div className={styles.headerText}>BLOG TITLE</div>
				</div>
				<div className={styles.content}>
					{
						docs.map((doc, index) => 
								<Card className={styles.post} key={`blogPost_${index}`}
								onClick={() => {
									if (index != this.state.expanded) {
										this.setState({
											expanded: index
										});
									}
								}
							}
							style={index === this.state.expanded ? 
								{
									height: "fit-content",
									cursor: "inherit",
									overflow: "hidden"
								} : {
									height: "500px",
									cursor: "pointer"
								}
							}
							>
								<Card.Header
									className={styles.postHeader}
									style={index === this.state.expanded ? 
										{
											cursor: "pointer"
										} : {
											cursor: "inherit"
										}
									}
									onClick={() => {
											if (index === this.state.expanded) {
												this.setState({
													expanded: null
												});
											}
										}
									}
								>
									{index != this.state.expanded ?
										<ExpandMore className={styles.expandIcon} /> :
										<ExpandLess className={styles.expandIcon}/>}
									{doc.fileName}
								</Card.Header>
								<Card.Body className={styles.postBody}>
									<Markdown source={doc.content}/>
								</Card.Body>
							</Card>
						)
					}
				</div>
			</Layout>
		)
	}
}

export default BlogSite;