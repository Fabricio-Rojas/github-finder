import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function User() {
  const [userPFP, setUserPFP] = useState('');
  const [userIRLName, setUserIRLName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userReposCount, setUserReposCount] = useState('');
  const [userFollowersCount, setUserFollowersCount] = useState('');
  const [userFollowingCount, setUserFollowingCount] = useState('');
  const [userGitHubURL, setUserGitHubURL] = useState('');

  const [userReposArray, setUserReposArray] = useState([]);

  const {username} = useParams();

  let userEndpoint = `https://api.github.com/users/${username}`;
  let userReposEndpoint = `https://api.github.com/users/${username}/repos`;

  useEffect(() => {

    const getData = async () => {
      try {
        const userResponse = await axios.get(userEndpoint);
        const reposResponse = await axios.get(userReposEndpoint);
        console.log(userResponse.data);
        setUserPFP(userResponse.data.avatar_url);
        setUserIRLName(userResponse.data.name);
        setUserDescription(userResponse.data.bio);
        setUserReposCount(userResponse.data.public_repos);
        setUserFollowersCount(userResponse.data.followers);
        setUserFollowingCount(userResponse.data.following);
        setUserGitHubURL(userResponse.data.html_url);
        console.log(reposResponse.data);
        setUserReposArray(reposResponse.data)
      } catch (error) {
        console.log(error);
      }
    }

    if (username) getData();
    // eslint-disable-next-line
  }, [username])

  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };

  return (
    <main>
      <div className='container'>
        <div className='user-info'>
          <img src={userPFP} alt='the users pfp' />
          <h2>{userIRLName}</h2>
          <p>{userDescription}</p>
          <div className='user-data'>
            <div>
              <span>{userReposCount}</span>
              <p>Repositories</p>
            </div>
            <div>
              <span>{userFollowersCount}</span>
              <p>Followers</p>
            </div>
            <div>
              <span>{userFollowingCount}</span>
              <p>Following</p>
            </div>
          </div>
          <a href={userGitHubURL}>Go to User's GitHub</a>
        </div>
        <h2>Listed Repositories</h2>
        <section className='repos-grid'>
          {userReposArray.map(repo => (
            <div key={repo.id} className='repo-div'>
              <div>
                <a href={repo.html_url}>{repo.name}</a>
                <p>{repo.description}</p>
              </div>
              <p>Updated at {new Date(repo.updated_at).toLocaleDateString('en-CA', dateOptions)}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

export default User
