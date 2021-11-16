import '../css/Error.css';

const Error = ({text}) => {
    return (
        <div className="box">
            <p id="text-error">{text}</p>
        </div>
    );
};

export default Error;