import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { faAngry} from '@fortawesome/free-regular-svg-icons';
import { faMeh} from '@fortawesome/free-regular-svg-icons';
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

class Icon extends Component{
    constructor(props) {
        super(props)
        this.state = {
            data : [],
        }
        
    }
    componentDidMount(){
        this._getListICon();
        // const sit = this.props.match.params.data;
        // console.log(sit);
    }

    _getListICon = async function() {
        const data_sit = await axios('/get/store_sit',{
            method : 'GET',
            headers: new Headers(),
            
        });

        
        this.setState({ data : data_sit });  
    }
    render (){
        
        
        return(
            
            <div className="list-icon">
                <FontAwesomeIcon icon={faSmile} />
                
                <FontAwesomeIcon icon={faMeh} />
                <FontAwesomeIcon icon={faFrown} />
                <FontAwesomeIcon icon={faAngry} />
                {/* {list ? list.map( (el, key)=> {
                    return(
                        <div key={key}>
                            <div>{el.sit}</div>
                        </div>
                    );
                    })
                    
                : null} */}
            </div>
        );
    }
}
export default Icon;