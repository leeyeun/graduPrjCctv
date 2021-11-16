/*global kakao*/
import React, { Component } from "react";
import { Mapdata } from "./Mapdata";
import './css/list.css';

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

                // var content = '<div class="wrap">' + 
                //             '    <div class="info">' + 
                //             '        <div class="title">' + 
                //             '            카카오 스페이스닷원' + 
                //             '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
                //             '        </div>' + 
                //             '        <div class="body">' + 
                //             '            <div class="desc">' + 
                //             '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
                //             '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
                //             '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
                //             '            </div>' + 
                //             '        </div>' + 
                //             '    </div>' +    
                //             '</div>';

                // // 마커 위에 커스텀오버레이를 표시합니다
                // // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
                // var overlay = new kakao.maps.CustomOverlay({
                //     content: content,
                //     map: map,
                //     position: marker.getPosition()       
                // });

                // // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                // kakao.maps.event.addListener(marker, 'click', function() {
                //     overlay.setMap(map);
                // });

                // // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
                // // function closeOverlay() {
                // //     overlay.setMap(null);     
                // // }
                // var closeOverlay = function () {
                //     overlay.setMap(null);     
                // }

                marker.setMap(map);
            });
        };
    }
    render(){
        return(
            <div className="kakao-map">
                <div id="map" style={{width:"100%", height:"100%"}}></div>
            </div>
        );
    }

}

export default KakaoMap;