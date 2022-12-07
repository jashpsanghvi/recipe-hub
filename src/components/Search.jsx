import {useState} from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const [searchInput, setSearchInput] = useState('')
  const {setSearchTerm, fetchRandomMeal} = useGlobalContext()

  const handleChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInput)
  }

  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='search a meal' className='form-input'
          value={searchInput} onChange={handleChange}/>
        <button type='submit' className='btn'>search</button>
        <button type='button' className='btn btn-hipster' onClick={fetchRandomMeal}>surprise me!</button>
      </form>
    </header>
  )
}

export default Search