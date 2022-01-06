import React from 'react';

const PhotoUpload = (props) => {

  const {onChange, onClick, avatar, img, bgSize} = props;

    return (
        <div>
            {avatar ?
              <div id="avatar" 
                    style={{ "background": `url(${avatar}) no-repeat center`, "backgroundSize": "cover" }} 
                    alt="avatar">
              </div>
              :
              <div id="avatar" 
                    style={{ "background": `url(${img}) no-repeat center`, "backgroundSize": `${bgSize}`}} 
                    alt="defaultAvatar">
              </div>
            }

            <input id="upload" type="file" style={{"display": "none"}} onChange={onChange}></input>
            <div id="btns-upload">
              <input id="btn-upload" 
                      value="browse..." 
                      type="button" 
                      onClick={() => document.getElementById('upload').click()}  
                      name="img">    
              </input>
              <button id="btn-setAvatar" 
                      onClick={onClick}>set avatar
              </button>
            </div>
          </div>

    )
}

export default PhotoUpload;