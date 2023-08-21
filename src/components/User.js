import React from 'react';
import {useState} from 'react';

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

    const handleClickDelete = event => {
        props.delete(event.currentTarget.id);
      };

    const handleClickUpdate = event => {
        props.update(event.currentTarget.id, modalTitle, modalBody);
    };

    const changeTitle = (event) => {
        newModalTitle(event.target.value);
      };

      const changeBody = (event) => {
        newModalBody(event.target.value);
      };

    const handleEdit = async event => {
        const id = event.currentTarget.id;
        var details = {};
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
        const responseJson = await response.json();
        newModalTitle(responseJson.title)
        newModalBody(responseJson.body)
        newModalId(responseJson.id)
    }

      const userPosts= props.data;
    return (
        <>
        <h1 className='mt-5 text-light fw-normal fs-2'>User : {userPosts[0].userId}</h1>
    <Swiper style={{width: "800px"}}
       
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
            <div className="card bg-warning rounded-4 p-2" style={{borderBottom: "2px black solid"}}> 
                <div className="card-body">
                    <img src="https://cdn-icons-png.flaticon.com/256/7102/7102051.png" className="card-img-top" alt="..." style={{height : "200px", width : "200px"}}></img>
                    <h3 className='text-dark fw-normal border-bottom border-black'>Post : {post.id}</h3>
                    <h5 className="card-title text-dark fs-4 text">{post.title}</h5>
                    <p className="card-text fs-6 text ">{post.body}</p>
                    <button className = "btn btn-danger" onClick={handleClickDelete} id={post.id}>Delete</button>

                <button onClick={handleEdit} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id={post.id}>Edit</button>
                </div>
                
            </div>
      </SwiperSlide>
        )}
    </Swiper>
  

            {/* modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Id: {modalId}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                     <div className="mb-3">
                        <label for="recipient-name" className="col-form-label">Title:</label>
                        <input type="text" className="form-control" id="recipient-name" value={modalTitle} onChange={changeTitle}></input>
                    </div>
                    <div className="mb-3">
                    <label for="message-text" className="col-form-label">Body:</label>
                        <textarea className="form-control" id="message-text" value={modalBody} onChange={changeBody}></textarea>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleClickUpdate} id={modalId} data-bs-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </>
    );


}

export default User;