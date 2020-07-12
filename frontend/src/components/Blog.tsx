import React from "react";
import { Card } from "react-bootstrap";
import Markdown from "react-markdown";

import { Article } from "./Structures";
import styles from "./Blog.module.css";

import {ExpandLess, ExpandMore} from "@material-ui/icons";


type PostProps = {
	title: string,
	image: JSX.Element,
	data: Promise<Article[]>
}

class BlogSite extends React.Component<PostProps> {
	state: {
		expanded?: number,
		data?: Article[]
	}

	constructor(props: PostProps) {
		super(props);
		this.state = {}
		props.data.then(data => {
			this.setState({
				data: data
			});
		});
	}


	render() {
		if (!!this.state.data) {
			return (
				<div>
					<div className={styles.header}>
						{this.props.image}
						<div className={styles.headerText}>{this.props.title}</div>
					</div>
					<div className={styles.content}>
						{
							this.state.data.map((doc, index) => {
								const date = new Date(doc.metadata.date.trim());
								const dateString = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
								return (	
										<div>
											<Card className={styles.post} key={`blogPost_${index}`}
											onClick={() => {
													if (index !== this.state.expanded) {
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
												{index !== this.state.expanded ?
													<ExpandMore className={styles.expandIcon} /> :
													<ExpandLess className={styles.expandIcon}/>}
												<div className={styles.title}>{doc.title}</div>
												<div className={styles.date}>{dateString}</div>
												<div className={styles.creator}>{doc.metadata.creator}</div>
											</Card.Header>
											<Card.Body className={styles.postBody}>
												<Markdown source={doc.content}/>
											</Card.Body>
										</Card>
										<div className={styles.like}><span role="img" aria-label="like">👍</span></div>
									</div>
										
								);
							})
						}
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className={styles.header}>
						{this.props.image}
						<div className={styles.headerText}>{this.props.title}</div>
					</div>
					<div className={styles.content}>
						<h1>LOADING</h1>
					</div>
				</div>
			);
		}
	}
}

export default BlogSite;