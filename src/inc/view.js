/*global kakao*/
import axios from "axios";
import React,{ Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import './css/view.css';

class View extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            address : ""
        }
    }
    

    componentDidMount(){
        const storeid = this.props.match.params.data;
        console.log(storeid);

        this._getData(storeid);
        this._addViewCnt(storeid);
        
        
        // const script = document.createElement('script');
        // script.async = true;
        // script.src = 
        //     "https://dapi.kakao.com/v2/maps/sdk.js?appkey=70ccc3f711533e596eca244527ec422d&autoload=false";
        // document.head.appendChild(script);

        // script.onload = () => {
        //     kakao.maps.load(() => {
        //         var container = document.getElementById('map');
        //         var options = {
        //             center: new kakao.maps.LatLng(35.122343980231896, 129.10168308252204),
        //             level:3
        //         };
        //         //this.map = new kakao.maps.Map(container, options);
        //         //const map = new window.kakao.maps.Map(container, options);
        //         // var markerPosition  = new kakao.maps.LatLng(35.122343980231896, 129.10168308252204); 
        //         // var marker = new kakao.maps.Marker({
        //         //     position: markerPosition
        //         // });
        //         // marker.setMap(map);
        //         var map = new kakao.maps.Map(container, options);

        //         var geocoder = new kakao.maps.services.Geocoder();
        //         geocoder.addressSearch('부산 남구 신선로 423', function(result, status) {
        //             if(status === kakao.maps.services.Status.OK){
        //                 var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        //                 var marker = new kakao.maps.Marker({
        //                     map: map,
        //                     position: coords
        //                 });
        //                 var infowindow = new kakao.maps.InfoWindow({
        //                     content: '<div style="width:150px; text-align:center; padding:6px 0;">스타벅스 동명대DT점</div>'
        //                 });
        //                 infowindow.open(map, marker);
        //                 map.setCenter(coords);
        //             }
        //         });
        //      });
        // };
    }
    

    _getData = async function(storeid) {

        const getData = await axios('/get/store_data', {
            method : 'POST',
            headers : new Headers(),
            data : { storeid : storeid }
        });

        
        console.log(getData.data);
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
    // _toggleLike = async function(){
    //     const { user_id, login, _toggleModal } = this.props;

    //     if(!login){
    //         alert('로그인이 필요합니다.');
    //         return _toggleModal(true)
    //     }
    //     const storeid = this.props.match.params.data;

    //     const obj = { type : 'add', user_id : user_id, storeid : storeid}
    //     const res = await axios('/update/like', {
    //         method : 'POST',
    //         headers: new Headers(),
    //         data : obj
    //     })
    // }
    render(){
        const { data } = this.state;
        const { admin } = this.props;

        if(data.data) {
            var modify_url = '/write/modify/' + data.data[0].storeid;
        }

        return(
            <div className="view">
                {data.data 
                ? <div className="view-box">
                    <div className="view-header">
                        <div className="view-name">
                            <input className="view-storename" type="text" name="storeName" defaultValue={data.data[0].storeName} readOnly/>
                        </div>
                        <div className="view-icon">
                            <div className="info">
                                <div className="icon-eye"><FontAwesomeIcon icon={faEye} /></div>
                                <input className="view-viewcnt" type="text" name="view_cnt" defaultValue={data.data[0].view_cnt + 1} readOnly></input>
                                
                                {/* <div className="info">
                                    <FontAwesomeIcon icon={solidHeart} onClick={()=> this._toggleLike()}/>
                                    <FontAwesomeIcon icon={regularHeart} onClick={()=> this._toggleLike()}/>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="view-info">
                        <div className="info">
                            <div className="icon"><FontAwesomeIcon icon={faMapMarker} /></div>
                            <input className="view-address" type="text" name="address" defaultValue={data.data[0].address} readOnly/>
                        </div>
                        <div className="info">
                            <div className="icon">
                                <FontAwesomeIcon icon={faPhoneAlt} />
                            </div>
                            <input className="view-number" type="text" name="number" defaultValue={data.data[0].number} readOnly/>
                        </div>
                        <div className="info">
                            <div className="icon"><FontAwesomeIcon icon={faClock} /></div>
                            <input className="view-time" type="text" name="time" defaultValue={data.data[0].time} readOnly/>
                        </div>
                        <div className="info">
                            <div className="icon"><FontAwesomeIcon icon={faChair} /></div>
                            <input className="view-sit" type="text" name="sit" defaultValue={data.data[0].sit} readOnly/>
                        </div>
                        <div className="info">
                            <div className="icon"><FontAwesomeIcon icon={faUser} /></div>
                            <input className="view-curHead" type="text" name="curHead" defaultValue={data.data[0].curHead} readOnly/>
                        </div>
                        <div className="info">
                            <div className="icon"><FontAwesomeIcon icon={faEdit} /></div>
                            <input className="view-introduce" type="text" name="introduce" defaultValue={data.data[0].introduce} readOnly/>
                        </div>
                        
                        
                        
                    </div>
                    {/* <div className="view-map" id="map" style={{width:"350px", height:"270px"}}></div> */}
                    <div className="view-controll">
                        {admin === 'Y'
                        ? 
                            <div className="view-up-de">
                                <Link to={modify_url}><input type="button" value="수정" /></Link>
                                <input type="button" value="삭제" onClick={() =>this._removeView()}/>
                            </div>
                        : null }
                        
                        {/* <input type="button" value="목록" onClick={() => window.location.href='/'} /> */}
                    </div>
                    
                    
                </div> 
                : null }
                
            </div>
        );
    }
}
export default View;