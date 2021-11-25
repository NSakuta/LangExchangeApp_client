import * as Yup from 'yup';
import { set, useForm } from 'react-cool-form';
import '../css/UserProfile.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { findUserById, getAllUsersAction, updateUserAction } from '../../../store/userReducer/userReducer';
import { userSelector } from '../../../store/userReducer/userReducer';
import { useEffect } from 'react';
import { currentUserSelector, getCurrentUserIdFromLocalStorage } from '../../../store/authReducer/authReducer';
import Input from '../../Registration-form/js/Input';
import Select from '../../Registration-form/js/Select';
import RadioButtons from '../../Registration-form/js/RadioButtons';
import Textarea from '../../Registration-form/js/Textarea';
import React from 'react';
import client from '../../../api/api';


const Profile = () => {

    const currentUserId = getCurrentUserIdFromLocalStorage();
    const dispatch = useDispatch();

    console.log(currentUserId);

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(updateUserAction())
    }, [dispatch])
    

    const users = useSelector(userSelector)
    const currentUser = findUserById(users, currentUserId);


    ///////

    const [img, setImg] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    //const navigate = useNavigate()

    console.log('avatar', avatar)

    const sendFile = React.useCallback(async () => {
        try {
            const data = new FormData()
            data.append('image', img);
            console.log('data: ', img)

            await client.post('/upload', data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('res', res)
                    return setAvatar(res.data.filename)
                })

        } catch (err) {
            console.log(err.message)
        }
    }, [img]);

    ///////////////////////

    const validateWithYup = (schema) => async (values) => {
        let errors = {};
        try {
            await schema.validate(values, { abortEarly: false });
        } catch (yupError) {
            yupError.inner.forEach(({ path, message }) => set(errors, path, message));
        }

        return errors;
    };

    const languages = [
        { key: "choose language", value: null },
        { key: "english", value: "english" },
        { key: "german", value: "german" },
        { key: "french", value: "french" },
        { key: "spanish", value: "spanish" },
        { key: "russian", value: "russian" },
        { key: "italian", value: "italian" },
        { key: "portuguese", value: "portuguese" }
    ]

    const initialValues = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        gender: currentUser.gender,
        email: currentUser.email,
        // password: '',
        // passwordConfirm: "",
        age: currentUser.age,
        img: currentUser.img,
        about: currentUser.about,
        zip: currentUser.zip,
        nativeLanguage: currentUser.nativeLanguage,
        practiceLanguage: currentUser.practiceLanguage,
        interests: currentUser.interests,
        description: currentUser.description
    }

    const gender = [
        { key: 'Male', value: 'm' },
        { key: 'Female', value: 'f' }
    ]

    const validationSchema = Yup.object({
        firstName: Yup.string().required().min(2),
        lastName: Yup.string().required().min(2),
        gender: Yup.string().required(),
        email: Yup.string().required(),
        //password: Yup.string().required(),
        age: Yup.number(),
        zip: Yup.string().required(),
        //passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        img: Yup.string(),
        about: Yup.string(),
        description: Yup.string(),
        interests: Yup.string(),
        nativeLanguage: Yup.string().required("Required"),
        practiceLanguage: Yup.string().required("Required")
    })

    const { form, use } = useForm({
        defaultValues: initialValues,
        validate: validateWithYup(validationSchema),
        onSubmit: (values) => {
            console.log("onSubmit: ", values)
            if(img) {
                dispatch(updateUserAction(currentUserId, {...values, img: avatar}));
            } else {
                dispatch(updateUserAction(currentUserId, values));
            }
            //navigate('/auth/login')
        }
    });

    const errors = use("errors", { errorWithTouched: true }); // Default is "false"


    return (
        <div id="wrapper-profile">
            <div id="box-profile-information">
                <div>
                    <h4>Profile information: </h4>
                    <form className="form-profile" ref={form} method="POST" enctype="multipart/form-data">
                        <RadioButtons
                            id="gender"
                            label="Sex"
                            name="gender"
                            options={gender}
                            error={errors.gender}
                        />
                        <Input
                            id="firstName"
                            type="text"
                            label="First name"
                            name="firstName"
                            error={errors.firstName}
                        />
                        <Input
                            id="lastName"
                            type="text"
                            label="Last name"
                            name="lastName"
                            error={errors.lastName}
                        />

                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            name="email"
                            className="two-columns"
                            error={errors.email}

                        />
                        {/* <Input
                id="password"
                type="password"
                label="password"
                name="password"
                error={errors.password}
              />
              <Input
                id="passwordConfirm"
                type="password"
                label="Password confirmation"
                name="passwordConfirm"
                error={errors.password}
              /> */}
                        <Input
                            id="age"
                            type="number"
                            label="Age"
                            name="age"
                            error={errors.age}

                        />
                        <Input
                            id="zip"
                            type="number"
                            label="Your ZIP(must be in Berlin)"
                            name="zip"
                        />
                        <Select
                            label="Your native language"
                            name="nativeLanguage"
                            options={languages}
                            error={errors.nativeLanguage}

                        />
                        <Select
                            label="Language you want to practice"
                            name="practiceLanguage"
                            options={languages}
                            error={errors.practiceLanguage}
                        />

                        <Input
                            id="about"
                            type="text"
                            label="Short infomation"
                            name="about"
                            className="two-columns"
                        />
                        <Textarea
                            label="Interests"
                            id="interests"
                            name="interests"
                            error={errors.interests}
                            className="two-columns"

                        />
                        <Textarea
                            label="About yourself"
                            id="description"
                            name="description"
                            error={errors.description}
                            className="two-columns"
                        />
                        <input className="btn-submit" type="submit"></input>
                    </form>
                </div>
            </div>
            <div id="box-profile-avatar">
                
                    {avatar ? 
                            <div id="profile-avatar" style={{"background": `url(http://localhost:8080/images/${avatar}) no-repeat center`, "backgroundSize": "cover" }} alt="avatar"></div>
                            : 
                            <div id="profile-avatar" style={{"background": `url(http://localhost:8080/images/${currentUser.img}) no-repeat center`, "backgroundSize": "cover" }} alt="defaultAvatar"></div>
                        }    
                  
                    <input id="btn-profile-setAvatar" type="file" onChange={e => setImg(e.target.files[0])} name="img"></input>
                    <br />
                    <button id="btn-profile-setAvatar" onClick={sendFile}>set avatar</button>
                    </div>
        </div>
    )
}

export default Profile;