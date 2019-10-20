import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    {data.allMarkdownRemark.edges.map(blogPost => (
      <div key= {blogPost.node.id}>
        <h3 style = {{marginBottom: `5px` }}>{blogPost.node.frontmatter.title}</h3>
        <small>
          Posted by {blogPost.node.frontmatter.author} on {blogPost.node.frontmatter.date} 
        </small>
        <br/>
        <br/>
        <Link to={blogPost.node.frontmatter.path} style ={{textDecoration: `none`}}>Read More</Link>
        <br/>
        <br/>
        <hr/>
      </div>
    ))}
  </Layout>
)

export const pageQuery = graphql`
  query IndexQuery {
      allMarkdownRemark(sort:{
        fields:frontmatter___date,
        order:DESC
      }){
        edges{
          node{
            id
            frontmatter{
              path
              title
              author
              date
            }
          }
        }
      }
  }
`

export default IndexPage
