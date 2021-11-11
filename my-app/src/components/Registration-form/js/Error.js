import '../css/Error.css';

const Error = ({text}) => {
    return (
        <div className="box">
            <p>{text}</p>
        </div>
    );
};

export default Error;