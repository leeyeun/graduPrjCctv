import React, { Component } from "react";
import './main.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component{
    
    render(){
        const { search } = this.props;
        if(search) {
            document.getElementsByName('search')[0].value = search
        }
        return(
            <div className="list-search">
                <form className="search-form">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input className="search-text" type='text' maxLength='20' name='search' placeholder='검색'></input>
                    <input className="search-btn" type='submit' value='검색'></input>
                </form>
            </div>
        );
    }
}
export default Search;