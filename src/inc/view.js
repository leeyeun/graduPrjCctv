import axios from "axios";
import React,{ Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

class View extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
        }
    }

    componentDidMount(){
        const storeid = this.props.match.params.data;

        this._getData(storeid);
        this._addViewCnt(storeid);
    }

    _getData = async function(storeid) {

        const getData = await axios('/get/store_data', {
            method : 'POST',
            headers : new Headers(),
            data : { storeid : storeid }
        });

        console.log(getData);
        return this.setState({ data : getData });
    }
    _addViewCnt = async function (storeid) {
        await axios('/update/view_cnt', {
            method : 'POST',
            headers : new Headers(),
            data : { storeid : storeid }
        })

    }

    _removeView = async function(){
        if(window.confirm('해당 게시물을 삭제하시겠습니까?')){
            const storeid = this.props.match.params.data;

            await axios('/delete/store', {
                method : 'POST',
                headers : new Headers(),
                data : { storeid : storeid }
            })

            alert('게시물이 삭제되었습니다.');
            return window.location.href = '/';
        }
    }
    _toggleLike = async function(){
        alert('좋아요 버튼 클릭');
    }
    render(){
        const { data } = this.state;

        if(data.data) {
            var modify_url = '/write/modify/' + data.data[0].storeid;
        }

        return(
            <div>
                {data.data 
                ? <div>
                    <div>
                        <input type="text" name="storeName" defaultValue={data.data[0].storeName} readOnly/>
                    </div>
                    <div>
                        <input type="text" name="address" defaultValue={data.data[0].address} readOnly/>
                    </div>
                    <div>
                        <input type="text" name="number" defaultValue={data.data[0].number} readOnly/>
                    </div>
                    <div>
                        <input type="text" name="time" defaultValue={data.data[0].time} readOnly/>
                    </div>
                    <div>
                        <input type="text" name="sit" defaultValue={data.data[0].sit} readOnly/>
                    </div>
                    <div>
                        <input type="text" name="introduce" defaultValue={data.data[0].introduce} readOnly/>
                    </div>
                    {/* <div>
                        <img src={data.data[0].image} width="200px" height="200px" name="image" defaultValue={data.data[0].image}></img>
                    </div> */}
                    <div>
                        <input type="text" name="image" defaultValue={data.data[0].image} readOnly/>
                    </div>
                    <div>
                        <input type="text" name="view_cnt" defaultValue={data.data[0].view_cnt + 1} readOnly></input>
                    </div>
                    <div>
                        {/* <FontAwesomeIcon icon={solidHeart} onClick={()=> this._toggleLike()}/> */}
                        <FontAwesomeIcon icon={regularHeart} onClick={()=> this._toggleLike()}/></div>
                    <div>
                        <Link to={modify_url}><input type="button" value="수정" /></Link>
                        <input type="button" value="삭제" onClick={() =>this._removeView()}/>
                        <input type="button" value="목록" onClick={() => window.location.href='/'} />
                    </div>
                    
                </div> 
                : null }
            </div>
        );
    }
}
export default View;