const { Component } = require("react");

class Search extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const { search } = this.props;
        if(search) {
            document.getElementsByName('search')[0].value = search
        }
        return(
            <div>
                <form>
                    <input type='text' maxLength='20' name='search' placeholder='검색'></input>
                    <input type='submit' value='검색'></input>
                </form>
            </div>
        );
    }
}
export default Search;