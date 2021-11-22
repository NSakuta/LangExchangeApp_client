import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { imagesSelector, uploadFile } from '../../store/uploadReducer/imgReducer';
import svg from '../../img-svg/star.svg'
import client from '../../api/api';

const Blog = () => {

    // const img = useSelector(imagesSelector);
    const dispatch = useDispatch();

    const [img, setImg] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);

    const sendFile = React.useCallback(async () => {
        try {
            const data = new FormData()
            data.append('image', img);
            console.log('data: ', data)

            await client.post('/upload', data, {
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then(res => {
                console.log('res', res)
                return setAvatar('http://localhost:8080/images/' + res.data.filename)
            })

        } catch (err) {
            console.log(err.message)
        }
    }, [img]);
   
    const logo = svg;

    // const imgValue = document.getElementById('imggg').value;

    return (
        <div>
            {avatar ? 
            
                <img src={`${avatar}`} alt="avatar"></img> : <img src={`${logo}`} alt="avatar"></img>
            
            }
            <input type="file" onChange={e => setImg(e.target.files[0])} name="img"></input>
            <button onClick={sendFile}>change avatar</button>
        </div>
    )
}

export default Blog;