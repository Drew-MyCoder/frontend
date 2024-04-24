import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'

// const REVIEW = gql`
//   query GetReview($id: ID!) {
//     api {
//       review (id: $id) {
//         title,
//         body,
//         rating,
//         id,
//       }
//     }
//   }
// `

export const Reviewdetails = () => {
  const { id } = useParams()
  const { loading, error, data } = useFetch(
    'http://localhost:1337/api/reviews/' + id
  )

  // const { loading, error, data } = useQuery(REVIEW, {
  //   variables: { id: id }
  // })
  if (loading) return <p>Loading...</p>
  console.log(data, 'this is the loaded reviewdata')
  if (error) return <p>Error :(</p>

  return (
    <div className="review-card">
          <div className="rating">
            {data.data.attributes.rating}
          </div>
          <h2>{data.data.attributes.title}</h2>

          <small>console list</small>

          {/* <p>{review.attributes.body}</p> */}
          <p>
              {data.data.attributes.body.map((paragraph) => (
                <span key={paragraph.id}>{
                  paragraph.children[0].text}</span>
              ))}
            </p>
        </div>
  )
}
