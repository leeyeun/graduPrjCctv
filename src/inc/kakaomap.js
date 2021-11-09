/*global kakao*/
import React, { Component } from "react";
import { Mapdata } from "./Mapdata";
import './main.css';

class KakaoMap extends Component{

    componentDidMount(){
        const script = document.createElement('script');
        script.async = true;
        script.src = 
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=70ccc3f711533e596eca244527ec422d&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                var container = document.getElementById('map');
                var options = {
                    center: new kakao.maps.LatLng(35.122343980231896, 129.10168308252204),
                    level:4
                };
                //this.map = new kakao.maps.Map(container, options);
                 var map = new kakao.maps.Map(container, options);

                // var geocoder = new kakao.maps.services.Geocoder();
                // geocoder.addressSearch('부산 남구 신선로 423', function(result, status) {
                //     if(status === kakao.maps.services.Status.OK){
                //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                //         var marker = new kakao.maps.Marker({
                //             map: map,
                //             position: coords
                //         });
                //         var infowindow = new kakao.maps.InfoWindow({
                //             content: '<div style="width:150px; text-align:center; padding:6px 0;">스타벅스 동명대DT점</div>'
                //         });
                //         infowindow.open(map, marker);
                //         map.setCenter(coords);
                //     }
                // });
                Mapdata.forEach((el) => {
                    new kakao.maps.Marker({
                        map : map,
                        position : new kakao.maps.LatLng(el.lat, el.lng),
                        title : el.title
                    })
                })
                var markerPosition  = new kakao.maps.LatLng(35.122343980231896, 129.10168308252204); 
                var marker = new kakao.maps.Marker({
                        position: markerPosition
                });
                marker.setMap(map);
            });
        };
    }
    render(){
        return(
            <div>
                <div className="list-map">
                    <div id="map" style={{width:"900px", height:"400px"}}></div>
                </div>
            </div>
                
        );
    }

}

export default KakaoMap;