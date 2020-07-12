import React from "react";
import { Image } from "react-bootstrap";

import BasicLayout from "../components/Layout";
import BasicBlog from "../components/Blog";

import HeaderImage from "../resources/keyboard.jpg";

const TechBlog: React.FunctionComponent = () => {
    const data = fetch("")
        .then(response => {
            return response.json();
        }).then(data => {
            return JSON.parse(data);
        });
    
    return (
        <BasicLayout>
            <BasicBlog
                title="Tech Blog"
                image={<Image src={ HeaderImage } fluid/>}
                data={data}
            />
        </BasicLayout>
    );
}

export default TechBlog;

