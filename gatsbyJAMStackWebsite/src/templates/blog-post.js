import React, {useEffect, useState} from 'react'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import axios from 'axios';

import './blog-post.css';
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({data}){
    const post = data.markdownRemark
    const [likes, setLikes] = useState(0);
    const [userlike, setUserlike] = useState(
        false
    );

    console.log(userlike)
    

    /*graphql request sender and queries*/

    const djangoBackendGraphQL = axios.create({
        baseURL: 'http://localhost:5000/graphql/',
      });
    
    const GET_POST = `
    query{
        post(postTitle: "${post.frontmatter.title}"){
            id
            likes
            title
        }
    }
    `;

    const UPDATE_LIKE = `
    mutation{
        updatePost(title: "${post.frontmatter.title}", likeUpdate: ${!userlike}){
            post{
              likes
            }
          }
    }
    `

    /* graphql query end*/
    
    const loadLikes = () => {
      djangoBackendGraphQL
      .post('', { query: GET_POST })
      .then(result => {
          console.log(result)
          console.log(result['data']['data']['post']['likes'])
          const numLikes = result['data']['data']['post']['likes']
            setLikes(numLikes)
            if (localStorage.getItem('userlike' + post.frontmatter.title) === "true"){
                setUserlike(true)
            } else {
                setUserlike(false)
            }
      });
    }
    
    //Use Effect is pretty much componentDidMount
    useEffect(() => {
        loadLikes();
    });

    const handleClick = (e) => {
        console.log(e.target)
        //change likes
        if (userlike){
            setUserlike(false)
        } else {
            setUserlike(true)
        }
        
        localStorage.setItem('userlike' + post.frontmatter.title, e.target.checked)

        djangoBackendGraphQL
        .post('', { query: UPDATE_LIKE })
        .then(result => {
            console.log("THE DATA")
            console.log(result['data']['data']['updatePost']['post']['likes'])
            setLikes(result['data']['data']['updatePost']['post']['likes'])
            
        });


        console.log(e.target.checked)
    }
    

    return(
        <Layout>
        <SEO title={post.frontmatter.title} />
        <div >
            <Link to="/" style ={{textDecoration: `none`}}>Back</Link>
            <hr/>
            <div style={{display: `flex`, flexDirection: `column`, alignItems: `center` }}>
                <h2 style = {{marginBottom: `5px` }}>{post.frontmatter.title}</h2>
                <h5>Posted by {post.frontmatter.author} on {post.frontmatter.date}</h5>
                <div dangerouslySetInnerHTML={{__html: post.html}}/>
                
                <div className="likebar">
                    <div>Likes: {likes}</div>
                    <div className="heart">
                        <input type="checkbox" onChange={handleClick} className="heart__checkbox" checked={userlike}/>
                        <div className="heart__icon"></div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}



export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path} }){
            html
            frontmatter {
                path
                title
                author
                date
            }
        }
    }
`