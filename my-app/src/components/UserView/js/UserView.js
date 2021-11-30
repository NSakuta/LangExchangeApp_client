import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addFavouritesAction, findUserById, getAllUsersAction } from '../../../store/userReducer/userReducer';
import { authSuccess } from '../../../store/appreducer/appReducer';
import { userSelector } from '../../../store/userReducer/userReducer';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getCurrentUserIdFromLocalStorage } from '../../../store/authReducer/authReducer';
import '../css/UserView.css';
import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-cool-form';
import { addNewMessageAction } from '../../../store/messageReducer/messagesReducer';
import { authSelector } from '../../../store/appreducer/appReducer';
const BASE_URL_IMAGE = 'http://localhost:8080/images/';


const UserView = () => {

    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    const navigate = useNavigate();

    dispatch(authSuccess())

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const { id } = useParams();
    const allUsers = useSelector(userSelector)
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const currentUser = findUserById(allUsers, currentUserId);
    const user = findUserById(allUsers, id);

    //////////////Form

    const { form } = useForm({
        defaultValues: { text: ''},
        onSubmit: (values, { reset }) => {
            const newValue = {...values, sentBy: currentUserId, recipient: id}
            console.log('onSubmit: ', newValue);
            dispatch(addNewMessageAction(newValue));
            reset();
        }
    })  


    /////////////////////////////////////Modal 

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '200px'
        },
    };

    Modal.setAppElement(document.getElementById('root'));

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function addToFavourites() {
        let favourites = Object.assign([], currentUser.favourites)
        let isDouble = false;
        isDouble = favourites.includes(user._id)
        console.log('isDouble:', isDouble)
        if(!isDouble) {
            favourites.push(user._id)
            dispatch(addFavouritesAction(currentUserId, favourites))
        }
    }

    return (
        <>
            {allUsers.length !== 0 && <div id="wrapper-userView">
                <div className="box" id="box-left">
                    <div id="box-left-top"></div>
                    <div id="box-left-img" style={{ "background": `url(${BASE_URL_IMAGE + user.img}) no-repeat center`, "backgroundSize": "cover" }}></div>
                    <div id="box-left-bottom">
                        <div id="box-left-bottom-info">
                            <h4 id="text-user-name">{user.firstName} {user.lastName}</h4>
                            <p className="text-user" id="text-user-about">{user.about}</p><br />
                            <p className="text-user" id="text-user-learn">Learn: {user.practiceLanguage}</p>
                            <p className="text-user" id="text-user-native">Native: {user.nativeLanguage}</p>
                        </div>
                        {auth ? <div id="box-left-bottom-btns">
                            <button className="left-bottom-btns" id="btn-add" onClick={() => addToFavourites()} 
                                
                            >add to favourites</button>
                            <button onClick={openModal} className="left-bottom-btns" id="btn-contact">send message</button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal">
                                <button id="modal-btn-close" onClick={closeModal}>X</button>
                                <div id="modal-title">Write your message:</div>
                                <form ref={form} noValidate>
                                    <textarea id="modal-text" name="text"/>
                                    <input id="modal-btn-submit" type="submit"></input>
                                </form>
                            </Modal>
                        </div>
                        : 
                        <div id="box-left-bottom-btns">
                            <p className="text-user">Please login or register to contact a person</p>
                            <button onClick={() => navigate('/auth/login')} className="left-bottom-btns" id="btn-contact">login</button>
                        </div>
                        }
                        
                    </div>
                </div>
                <div className="box" id="box-right">
                    <div id="box-right-content">
                        <div>
                            <h4>User Profile</h4>
                        </div>
                        <div id="box-right-firstName" className="box-right-style">
                            <p className="profile-text-styled">First name:</p>
                            <p className="profile-text-styled">{user.firstName}</p>
                        </div>
                        <div id="box-right-lastName" className="box-right-style">
                        <p className="profile-text-styled">Last name:</p>
                            <p className="profile-text-styled">{user.lastName}</p>
                        </div>
                        <div id="box-right-bdate" className="box-right-style">
                            <p className="profile-text-styled">Age:</p>
                            <p className="profile-text-styled">{user.age}</p>
                        </div>
                        <div id="box-right-address" className="box-right-style">
                            <p className="profile-text-styled">Address:</p>
                            <p className="profile-text-styled">Berlin, {user.zip}</p>
                        </div>
                        <div id="box-right-interests" className="box-right-style">
                            <p className="profile-text-styled">Interests:</p>
                            <p className="profile-text-styled">{user.interests}</p>
                        </div>
                        <div id="box-right-aboutme" className="box-right-style">
                        <p className="profile-text-styled">About me:</p>
                            <p className="profile-text-styled">{user.description}</p>
                        </div>
                    </div>
                </div>
                <div className="box" id="box-3"></div>
            </div>}
        </>
    )
}

export default UserView;



