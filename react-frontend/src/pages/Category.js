import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

const CATEGORY= gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      title,
      id,
      blogs {
        title,
        body,
        author,
        published,
        id,
        slug,
        categories {
          id,
          title,
        }
      }
    }
  }
`

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      <h2>{ data.category.title } blogs</h2>
      {data.category.blogs.map(blog => (
        <div key={blog.id} className="blog-card">
          <div className="">{blog.author}</div>
          <h3>{blog.published}</h3>
          <h2>{blog.title}</h2>
          
          
          
          <p>{blog.body.substring(0, 200)}...</p>
          <Link to={`/details/${blog.id}`}>Read more</Link>

          {blog.categories.map(c => (
            <small key={c.id}>{c.title}</small>
          ))}
        </div>
      ))}
    </div>
  )
}