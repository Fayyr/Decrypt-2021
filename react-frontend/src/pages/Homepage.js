import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const blogS = gql`
  query Getblogs {
    blogs {
      title,
      body,
      author,
      id,
      slug,
      published,
      categories {
        id,
        title
      }
    }
  }
`

export default function Homepage() {
  const { loading, error, data } = useQuery(blogS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      {data.blogs.map(blog => (
        <div key={blog.id} className="blog-card">
          <div className="rating">{blog.rating}</div>
          <h2>{blog.title}</h2>
          <h2>{blog.author}</h2>
          
          {blog.categories.map(c => (
            <small key={c.id}>{c.title}</small>
          ))}

          <p>{blog.body.substring(0, 200)}...</p>
          <Link to={`/details/${blog.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}