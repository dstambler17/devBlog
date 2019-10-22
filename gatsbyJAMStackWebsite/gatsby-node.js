/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const axios = require('axios');

const djangoBackendGraphQL = axios.create({
    baseURL: 'http://localhost:5000/graphql/',
  });

const GET_ALL_POSTS = `
query{
    allPosts{
      id
      title
    }
}
`;


/* Create new post*/
const createNewPost = (title) => {
  djangoBackendGraphQL
  .post('', { query: `mutation{
    insertPost(title: "${title}"){
      post{
        id
      }
    }
  }` })
  .then(result => {
      console.log(result)
      console.log(result['data']['data']['post']['id'])
  });
}

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

            //check if it fits into the post list
            djangoBackendGraphQL
            .post('', { query: GET_ALL_POSTS })
            .then(result => { 
               let backendPosts =  result['data']['data']['allPosts']
               let newVar = true
               backendPosts.forEach((backendPost) => {
                    if (backendPost['title'] === node.frontmatter.title){
                        newVar = false
                    }
               })

               if (newVar){
                    createNewPost(node.frontmatter.title)
               }

            });


        })
    })
}
