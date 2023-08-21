import '../App.css';
import Home from './Home';
import User from './User';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, newData] = useState([]);
  const [albumWise, newAlbum] = useState([]);
  const [albumTitle, newAlbumTitle] = useState();
  const [albumBody, newAlbumBody] = useState();

  //inputbox title handle change
  const handleChangeTitle = (event) => {
    newAlbumTitle(event.target.value);
  };

  //inputbox body handle change
  const handleChangeBody = (event) => {
    newAlbumBody(event.target.value);
  };

  // adding album
  const addAlbum = async () => {
    const title = albumTitle;
    const body = albumBody;
    var ans = {};
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => 
      ans = json
    );
    const arr = [];
    arr.push(ans)
    newData(oldArray => [...oldArray, arr]);
  }

  // deleting post
  const deletePost = (id) => { 
    var arr = [];

    //copying all arrays of albumsWise to arr
    albumWise.map(ele => {
      arr.push(ele);
    })

    // deleting the post from arr's inner array 
    for(let i=0; i<arr.length; i++){
      for(let j=0; j<arr[i].length; j++){
        if(arr[i][j].id == id){
          // console.log(arr[i][j].id)
          delete arr[i][j]
        }
      }
    }

    //updating the state of  albumWise data
    newAlbum(arr);

    //finally updating the data state which will be used by User Component
    newData(albumWise)
  }

  const updatePost = (id, title, body) => { 
    var arr = [];

    //copying all arrays of albumsWise to arr
    albumWise.map(ele => {
      arr.push(ele);
    })

    // deleting the post from arr's inner array 
    for(let i=0; i<arr.length; i++){
      for(let j=0; j<arr[i].length; j++){
        if(arr[i][j].id == id){
          
          arr[i][j].title = title
          arr[i][j].body = body

        }
      }
    }

    //updating the state of  albumWise data
    newAlbum(arr);

    //finally updating the data state which will be used by User Component
    newData(albumWise)
  }

  useEffect(() => {
    (async function getAlbums(){
      var albums = [];
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const responseJson = await response.json();

      for(let i=0; i<responseJson.length; i += 10){
        let singleAlbum = []
        singleAlbum = responseJson.slice(i,[i + 10])
        albums.push(singleAlbum)
      }
      newAlbum(albums);
      newData(albums);
    })();

  },[])

  return (
    <>
      
      <div className='App bg-dark'>
      <Home />
        <label className='me-3 text-light'>Title : </label>
        <input className='form-control me-5' style={{width: "200px", display: "inline" }} type="text" onChange={handleChangeTitle} value={albumTitle}></input>
        <label className='me-3 text-light'>Body : </label>
        <input className='form-control me-5' style={{width: "200px", display: "inline" }} type="text" onChange={handleChangeBody} value={albumBody}></input>
        <button className='bg-success btn text-light' onClick={addAlbum}>Add Post</button>


        {data.map(data =>
        <><User
            data={data}
            key={data.id} 
            delete={deletePost}
            update={updatePost}
          />
        </>
      )}
      
      </div>
      
    </>
  )
}

export default App;
