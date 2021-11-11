import { addNewMessageAction } from "../../store/messageReducer/messagesReducer";
import { addNewUserAction, currentUserSelector, setCurrentUserAction } from "../../store/userReducer/userReducer";
import { useForm } from "react-cool-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Users = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentUserAction())
    }, [dispatch])

    const currentUser = useSelector(currentUserSelector);
    const recipient = "6187fdb7d3cbb1424b171960" // default

    const { form } = useForm({
        defaultValues: { text: ''},
        onSubmit: (values, { reset }) => {
            const newValue = {...values, sentBy: currentUser, recipient: recipient}
            console.log('onSubmit: ', newValue);
            dispatch(addNewMessageAction(newValue));
            reset();
        }
    })

    return (
        <div>
            <form ref={form}>
                <p>Write your message</p>
                <textarea name="text"></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Users;