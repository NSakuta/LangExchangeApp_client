import '../css/Search.css'
import { useState } from "react";
import { useNavigate } from "react-router";

const Search = () => {

    const [searchByNativeLanguage, setSearchByNativeLanguage] = useState(null);
    const [searchByPracticeLanguage, setSearchByPracticeLanguage] = useState(null);

    const navigate = useNavigate();

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

    const onChangeByNativeLanguage = e => {
        setSearchByNativeLanguage(e.target.value);
    }
    const onChangeByPracticeLanguage = e => {
        setSearchByPracticeLanguage(e.target.value);
    }

    return (
        <div className="wrapper">
            <form id="form-search">
                <div id="wrapper-search">
                    <div className="box-search-languages">
                        <div className="m-center">
                            <div className="lb-search">
                                <label htmlFor="nativeLanguage">Find users by native language:</label>
                            </div>
                            <select className="select-custom" onChange={onChangeByNativeLanguage}>
                                {languages.map((el, index) => {
                                    return (
                                        <option key={index} name="nativeLanguage" value={el.value}>
                                            {el.key}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="box-search-languages">
                        <div className="m-center">
                            <div className="lb-search">
                                <label htmlFor="practiceLanguage">Find users by language they practice:</label>
                            </div>
                            <select className="select-custom" onChange={onChangeByPracticeLanguage}>
                                {languages.map((el, index) => {
                                    return (
                                        <option key={index} name="practiceLanguage" value={el.value}>
                                            {el.key}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                        <div id="box-search-btn">
                            <div className="m-center">
                            <button id="btn-search" onClick={() => {
                                if (searchByNativeLanguage && searchByPracticeLanguage) {
                                    return navigate(`/users/native=${searchByNativeLanguage}/practice=${searchByPracticeLanguage}`)
                                } else if (searchByNativeLanguage) {
                                    return navigate(`/users/native=${searchByNativeLanguage}`)
                                } else {
                                    return navigate(`/users/practice=${searchByPracticeLanguage}`)
                                }
                                }}>search
                            </button>
                        </div>
                    </div>
                </div>
            </form>   
        </div>
    )
}

export default Search;