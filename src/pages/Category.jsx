import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min"
import useFetch from "../hooks/useFetch"


export const Category = () => {

  const { id } = useParams()
  const { loading, error, data: CatePage } = useFetch(
    'http://localhost:1337/api/categories/' + id
  )

  const { loading: newLoader, error: newError, data } = useFetch(
    'http://localhost:1337/api/reviews')

  if (loading) return <p>Loading...</p>
  console.log(CatePage, 'this is category page data')
  console.log(data, 'this is review data at category page')
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h2>{CatePage.data.attributes.name}</h2>
      { CatePage.data.attributes.id === data.data.id && (
      data.data.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">
            {review.attributes.rating}
          </div>
          <h2>{review.attributes.title}</h2>
{/* 
          {review.categories.map(c => (
            <small>{c.name}</small>
          ))} */}
          <p>
              {review.attributes.body.map((paragraph) => (
                <span key={paragraph.id}>{
                  paragraph.children[0].text.substring(0, 100)}...</span>
              ))}
            </p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
        ))
        )}
    </div>
  )
}
