import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const BLOGDETAILS = gql`
  query Getblog($id: ID!) {
    blog(id: $id) {
      title,
      body,
      author,
      published,
      id,
      slug  ,
      categories {
        title,
        id,
      }
    }
  }
` 

export default function BlogDetails() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(BLOGDETAILS, {  
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  
  if (error) return <p>Error :(</p>
    console.log(error)
  console.log(data)

  return (
    <div className="blog-card">
      <div className="">{data.blog.author}</div>
      <h2>{data.blog.published}</h2>
      <h2>{data.blog.title}</h2>

      {data.blog.categories.map(c => (
        <small key={c.id}>{c.title}</small>
      ))}

      <p>{data.blog.body}</p>
    </div>
  )
}