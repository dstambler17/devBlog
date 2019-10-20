/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = ({boundActionCreators, graphql}) => {
    const { createPage } = boundActionCreators

    const postTemplate = path.resolve('src/templates/blog-post.js')
    return graphql(`
     {
        allMarkdownRemark {
            edges {
                node {
                    html
                    id
                    frontmatter {
                        path
                        title
                        date
                        author
                    }
                }
            }
        }
     }
    `).then(result => {
        if (result.errors){
            return Promise.reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: postTemplate
            })
        })
    })
}
