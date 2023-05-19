import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Search() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userNameExists, setUserNameExists] = useState(true);
  const navigate = useNavigate();

  let userEndpoint = `https://api.github.com/users/${inputValue}`;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRef.current.focus();
    if (inputValue.length <= 0) {
      setErrorMessage('Please write a username');
      return;
    }
    getData();
  }

  const getData = async () => {
    try {
      const userResponse = await axios.get(userEndpoint);
      setUserNameExists(true);
      console.log(userResponse.data);
      navigate(`/user/${inputValue}`);
      setErrorMessage('');
      setInputValue('');
    } catch (error) {
      console.log(error);
      setUserNameExists(false);
      setErrorMessage('Invalid user name, try again');
      setInputValue('');
    }
  }

  return (
    <div className='search-form'>
      <h1>GitHub Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
            type='text'
            className={ userNameExists ? 'user-name' : 'user-name invalid'} 
            placeholder='User Name'
            onChange={handleChange}
            ref={inputRef}
            value={inputValue}
        />
        <input
            type='submit'
            className='user-search'
            value='SEARCH'
        />
      </form>
      <p>{errorMessage}</p>
    </div>
  )
}

export default Search
