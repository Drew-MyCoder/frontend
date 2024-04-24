import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useQuery, gql } from "@apollo/client"
import useFetch from "../hooks/useFetch"

// const REVIEWS = gql`
//   query GetReviews {
//     api{
//       reviews {
//         title,
//         body,
//         rating,
//         id
//       }
//     }
//   }
// `

export const Homepage = () => {

  // const { loading, error, data } = useQuery(REVIEWS)

  const { loading, error, data } = useFetch('http://localhost:1337/api/reviews')

  if (loading) return <p>Loading...</p>
   console.log(data, 'this is loaded the data at home')
  if (error) return <p>Error :(</p>

  // if (!data || !data.length) return <p>No reviews yet.</p>;

  return (
    <div>
      { 
      data.data.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">
            {review.attributes.rating}
          </div>
          <h2>{review.attributes.title}</h2>

          <small>console list</small>

          {/* <p>{review.attributes.body}</p> */}
          <p>
              {review.attributes.body.map((paragraph) => (
                <span key={paragraph.id}>{
                  paragraph.children[0].text.substring(0, 100)}...</span>
              ))}
            </p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
        ))
        }
        {data?.reviews?.length === 0 && <p>No reviews found.</p>}
        
        
    </div>
    // <p>hi</p>
  )
}
