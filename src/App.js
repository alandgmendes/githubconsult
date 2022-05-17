import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App(props) {

  const [userName, setUserName] = useState("");
  const [userSelected, setUserSelected ] = useState(false);
  const [urlProfImg, setUrlProfImg] = useState("");
  const [displayName, setDisplayName ] = useState("");

  const onChangeInput = (e) =>{
    const userName = e.target.value;
    setUserName(userName);
  }

  const handleSearch =async (e)=>{

    await axios.get(`https://api.github.com/users/${userName}`)
    .then(response => {
      const data = response.data;
      setUrlProfImg(data.avatar_url);
      setDisplayName(data.name);
    });
    setUserSelected(true);
  }

  

  return (
    <>
      <h1>Github user's search:</h1> 
         
      <input value={userName} placeholder="user" className='input-user' id='input-user' onChange={e => onChangeInput(e)} />      
      <button onClick={e => handleSearch(e)}>Search</button>
      <br />
      {userSelected &&
      <> 
        <h1>{displayName}</h1> 
        <img src={urlProfImg} alt="profile from github"/>
        </>
      }
    </>
  );
}

export default App;
