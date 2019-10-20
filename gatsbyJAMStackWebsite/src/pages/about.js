import React from 'react'
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
    return (
        <div>
        <Layout>
        <SEO title="About" />
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur possimus culpa accusantium quisquam! Ipsam sapiente odio quaerat aliquam veritatis. Architecto culpa sunt cum repellat? Quibusdam ab explicabo repellendus eius. Earum pariatur aliquam necessitatibus molestias, distinctio deleniti neque commodi odit excepturi dolorem perferendis rerum laborum exercitationem? Libero asperiores aut cupiditate.</p>
            <Link to="/" style ={{textDecoration: `none`}}>Back</Link>
        </Layout>
        </div>
    )
}

export default AboutPage;
