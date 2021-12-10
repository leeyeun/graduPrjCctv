/*global kakao*/
import React, { Component } from "react";
import axios from "axios";
import { Mapdata } from "./Mapdata";
import './css/list.css';

class KakaoMap extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            latitude : "",
            longitude : "",
        }
    }

    componentDidMount(){
        // this._kakaomap();
        this._getData();
    };
    
    _kakaomap = function(latitude, longitude){
        const list = this.state.data.data;

        const script = document.createElement('script');
        script.async = true;
        script.src = 
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=70ccc3f711533e596eca244527ec422d&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                var container = document.getElementById('map');
                var options = {
                    center: new kakao.maps.LatLng(35.3784543358289, 129.14949906908825),
                    level:4
                };
                //this.map = new kakao.maps.Map(container, options);
                    var map = new kakao.maps.Map(container, options);

                
                // Mapdata.forEach((el) => {
                //     new kakao.maps.Marker({
                //         map : map,
                //         position : new kakao.maps.LatLng(el.lat, el.lng),
                //         title : el.title
                //     })
                // })
                list.forEach((el) => {
                    var markerPosition  = new kakao.maps.LatLng(el.latitude, el.longitude); 
                    var marker = new kakao.maps.Marker({
                            position: markerPosition
                    });
    
                    marker.setMap(map);
                })
                
            });
        }
    }
    _getData = async function() {

        const getData = await axios('/get/store_address', {
            method : 'POST',
            headers : new Headers(),
        });

        return this.setState({ data : getData });
    }
    render(){
        const list = this.state.data.data;
        return(
            <div className="kakao-map">
                {list ? list.map((el, key) => {
                    return(
                        <div id="map" style={{width:"100%", height:"100%"}} key={key}>
                            {this._kakaomap(el.latitude, el.longitude)}
                        </div>
                    )
                })
                : null}
               
            </div>
        );
    }

}

export default KakaoMap;