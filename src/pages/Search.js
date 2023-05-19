import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Search() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userNameExists, setUserNameExists] = useState(true);
  const navigate = useNavigate();

  const token = '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';
  const options = {headers: { Authorization: `Bearer ${token}`}};

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
    if (!userNameExists) {
      setErrorMessage('Invalid user name, try again');
      return;
    }
    setErrorMessage('');
    navigate(`user/${inputValue}`);
    setInputValue('');
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const userResponse = await axios.get(userEndpoint, options);
        setUserNameExists(true);
        console.log(userResponse.data);
      } catch (error) {
        console.log(error);
        setUserNameExists(false);
      }
    }

    if (inputValue) getData();
    // eslint-disable-next-line
  }, [inputValue])

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
