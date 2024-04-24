import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'


export const SiteHeader = () => {

  const { loading, error, data: SiteCate } = useFetch(
    'http://localhost:1337/api/categories' 
  )

  if (loading) return <p>Loading...</p>
  console.log(SiteCate, 'this is loaded categories')
  if (error) return <p>Error :(</p>

  return (
    <div className='site-header'>
      <Link to='/'><h1>Ninja Reviews</h1></Link>
      <nav className='categories'>
        <span>Filter reviews by category:</span>
        {SiteCate.data.map(category => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
