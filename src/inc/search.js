import React, { Component } from "react";
import './css/search.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component{
    
    render(){
        const { search } = this.props;
        if(search) {
            document.getElementsByName('search')[0].value = search
        }
        return(
            <div className="search-sclist">
                <form className="search-form">
                    {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
                    <div className="search-left">
                        <input className="search-text" type='text' maxLength='20' name='search' placeholder='검색'></input>
                    </div>
                    <div className="search-right">
                        <button className="search-btn" type='submit'>
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </button>
                    </div>
                    
                    
                </form>
            </div>
        );
    }
}
export default Search;