import '../css/Error.css';

const Error = ({text}) => {
    return (
        <div id="box-error">
            <p id="text-error">{text}</p>
        </div>
    );
};

export default Error;