import React from 'react';
import {useState, useEffect} from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-creative';
// Import Swiper styles
import 'swiper/css';
import { EffectCreative } from 'swiper/modules';

function User(props) {
    const [modalTitle, newModalTitle] = useState();
    const [modalBody, newModalBody] = useState();
    const [modalId, newModalId] = useState()
    const [modal, setModal] = useState(false)

    const handleClickDelete = event => {
        props.delete(event.currentTarget.id);
        setModal(false)
      };

    const handleClickUpdate = event => {
        props.update(event.currentTarget.id, modalTitle, modalBody);
        setModal(!modal)
    };

    const changeTitle = (event) => {
        newModalTitle(event.target.value);
      };

      const changeBody = (event) => {
        newModalBody(event.target.value);
      };

    const handleEdit = async event => {
     
      setModal(!modal)
      const id = event.currentTarget.id;
      var details = {};

      const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
      const responseJson = await response.json();

      if(!response.ok ){
        // console.log("empty")
        console.log(props.data)
        newModalTitle(props.data[0].title)
        newModalBody(props.data[0].body)
        newModalId(props.data[0].id)
      }
      else{
      newModalTitle(responseJson.title)
      newModalBody(responseJson.body)
      newModalId(responseJson.id)
      }
    }
    
      var userPosts=[];
      userPosts= props.data;

      // console.log(props)

    return (
        <>
        {/* <h1 className='mt-5 text-light fw-normal fs-2'>User : {}</h1> */}
        
    <Swiper style={{width: "800px"}} onSliderMove={() => setModal(false)}
       grabCursor={true}
       effect={'creative'}
       creativeEffect={{
         prev: {
           shadow: true,
           translate: [0, 0, -400],
         },
         next: {
           translate: ['100%', 0, 0],
         },
       }}
       modules={[EffectCreative]}
       
       className="mySwiper"
        >
        {userPosts.map(post =>
        
      <SwiperSlide>
            <h1 className='mt-5 text-light fw-normal fs-2'>User : {post.userId}</h1>
            <div className="card bg-warning rounded-4 p-2" > 
                <div className="card-body" style={{borderBottom: "1px dotted black"}}>
                    <img src="https://cdn-icons-png.flaticon.com/256/7102/7102051.png" className="card-img-top" alt="..." style={{height : "200px", width : "200px"}}></img>
                    <h3 className='text-dark fw-normal border-bottom border-black'>Post : {post.id}</h3>
                    <h5 className="card-title text-dark fs-4 text">{post.title}</h5>
                    <p className="card-text fs-6 text ">{post.body}</p>
                    <button className = "btn btn-danger" onClick={handleClickDelete} id={post.id}>Delete</button>

                {/* <button onClick={handleEdit} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id={post.id}>Edit</button> */}
                <button onClick={handleEdit} className="btn btn-primary" id={post.id}>Edit</button>
                </div>
                {modal && (
                  <>
                    <form>
                     <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">Title:</label>
                        <input type="text" className="form-control" id="recipient-name"  value={modalTitle} onChange={changeTitle}></input>
                    </div>
                    <div className="mb-3" >
                    <label for="message-text" className="col-form-label">Body:</label>
                        <textarea className="form-control" id="message-text" value={modalBody} onChange={changeBody}></textarea>
                    </div>
                    </form>
                    
                    <div class="row">
                      <div class="col-6">
                        <button type="button" className="btn btn-secondary" onClick={() => setModal(false)}>Close</button>
                      </div>
                      <div class="col">
                        <button type="button" className="btn btn-primary" onClick={handleClickUpdate} id={modalId}>Save changes</button>
                      </div>
                    </div>
                 
                  </>
                )}
            </div>
      </SwiperSlide>
        )}
    </Swiper>
          
         
          

        </>
    );


}

export default User;