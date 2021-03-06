import * as Yup from 'yup';
import { set, useForm } from 'react-cool-form';
import React from 'react';
import '../css/UserProfile.css'
import Input from '../../Registration-form/js/Input';
import Select from '../../Registration-form/js/Select';
import RadioButtons from '../../Registration-form/js/RadioButtons';
import Textarea from '../../Registration-form/js/Textarea';
import client from '../../../api/api';
import { useDispatch } from 'react-redux';
import { updateUserAction } from '../../../store/userReducer/userReducer';
import PhotoUpload from '../../Registration-form/js/PhotoUpload';

const UserForm = ({currentUser}) => {

    const dispatch = useDispatch();

    const [img, setImg] = React.useState(currentUser.img);
    const [avatar, setAvatar] = React.useState(null);

    const sendFile = React.useCallback(async () => {
        try {
            const data = new FormData()
            data.append('image', img);

            await client.post('/upload', data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('res', res)
                    return setAvatar(res.data.location)
                })

        } catch (err) {
            console.log(err.message)
        }
    }, [img]);
    

    ///////////Yup validation

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
        age: Yup.number(),
        zip: Yup.string().required(),
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
            if(img) {
                dispatch(updateUserAction(currentUser._id, {...values, img: avatar}));
                setTimeout(() => {
                    refreshPage()
                }, 500)
            } else {
                dispatch(updateUserAction(currentUser._id, values));
                setTimeout(() => {
                    refreshPage()
                }, 500)
            }
        }
    });

    const errors = use("errors", { errorWithTouched: true }); 


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
                        <input className="btn-submit" type="submit" value="Save"></input>
                    </form>
                </div>
            </div>
            <div id="box-profile-avatar">
                <PhotoUpload avatar={avatar}
                                img={img}
                                onClick={sendFile}
                                onChange={e => setImg(e.target.files[0])}
                                bgSize={"cover"}>
                </PhotoUpload>
            </div>
        </div>     
    )
}

export default UserForm;

const refreshPage = () => {
    window.location.reload(false)
}