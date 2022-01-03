import './Loader.css'

const Loader = (props) => {

    return (
        <div id="wrapper-loader">
            <div id="box-loader">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default Loader;