import { Component } from "react";
import axios from "axios";
import './css/write.css';

class Write extends Component{
    constructor(props){
        super(props);
        this.state = {
            storeName : "",
            address : "",
            number : "",
            time : "",
            sit : "",
            introduce : "",
            latitude : "",
            longitude : "",
        }

    }

    _submitStore = async function() {
        const storeName = document.getElementsByName('storeName')[0].value.trim();
        const address = document.getElementsByName('address')[0].value.trim();
        const number = document.getElementsByName('number')[0].value.trim();
        const time = document.getElementsByName('time')[0].value.trim();
        const sit = document.getElementsByName('sit')[0].value.trim();
        const introduce = document.getElementsByName('introduce')[0].value.trim();
        const latitude = document.getElementsByName('latitude')[0].value.trim();
        const longitude = document.getElementsByName('longitude')[0].value.trim();

        
        if(!this.props.match.params.data){

        if(storeName === ""){
            return alert("가게명을 입력해주세요.");
        } 
        else if(address===""){
            return alert("주소를 입력해주세요.");
        }
        else if(number===""){
            return alert("전화번호를 입력해주세요.");
        }
        else if(time===""){
            return alert("영업시간을 입력해주세요.");
        }
        else if(sit===""){
            return alert("총좌석을 입력해주세요.");
        }
        else if(introduce===""){
            return alert("가게 소개를 입력해주세요.");
        }
        else if(latitude===""){
            return alert("위도를 입력해주세요.");
        }
        else if(longitude===""){
            return alert("경도를 입력해주세요.");
        }

            const data = { 
                storeName : storeName, 
                address : address,
                number : number,
                time : time,
                sit : sit,
                introduce : introduce,
                latitude : latitude,
                longitude : longitude,
            };
            const res = await axios('/add/store', {
                method : 'POST',
                data : data,
                headers : new Headers()
            })

            if(res.data) {
                alert('글 등록이 완료되었습니다.');
                return window.location.replace('/')
            }
        }else{
            const data = { 
                storeName : storeName, 
                address : address,
                number : number,
                time : time,
                sit : sit,
                introduce : introduce,
                latitude : latitude,
                longitude : longitude,
                storeid : this.props.match.params.data
            };
            const res = await axios('/update/store', {
                method : 'POST',
                data : data,
                headers : new Headers()
            })
            if(res.data){
                alert('글 수정이 완료되었습니다.');

                const url = "/view/" + this.props.match.params.data;

                return window.location.href = url;
            }
        }
        
    }
    componentDidMount() {
        if(this.props.match.params.data && this.props.storeName.length === 0) {
          this.props._getModifyData(this.props.match.params.data);
        }
    }
    
    render() {
        const { storeName, address, number, time, sit, introduce, latitude, longitude} = this.props;
        return(
            <div>
                <div className="write-box">
                    <h3>store </h3>  
                    <form className="write-form" encType="multipart/form-data" method="post">
                        <div className="write-info">
                            <div className="info-name">
                                <label>가게명</label>
                            </div> 
                            <div className="info-input">
                                <input type="text" name="storeName" placeholder="가게명" defaultValue={storeName}></input>
                            </div>
                        </div>
                        <div className="write-info">
                            <div className="info-name">
                                <label>주소</label>
                            </div> 
                            <div className="info-input">
                                <input type="text" name="address" placeholder="주소" defaultValue={address}></input>
                            </div>  
                        </div>
                        <div className="write-info">
                            <div className="info-name">
                                <label>번호</label>
                            </div> 
                            <div className="info-input">
                                <input type="text" name="number" placeholder="번호" defaultValue={number}></input>
                            </div>
                        </div>
                        <div className="write-info">
                            <div className="info-name">
                                <label>영업시간</label>
                            </div> 
                            <div className="info-input">
                                <input type="text" name="time" placeholder="영업시간" defaultValue={time}></input>
                            </div>
                        </div>
                        <div className="write-info">
                            <div className="info-name">
                                <label>총 좌석</label>
                            </div> 
                            <div className="info-input">
                                <input type="text" name="sit" placeholder="총 좌석" defaultValue={sit}></input>
                            </div>
                        </div>
                        <div className="write-info">
                            <div className="info-name">
                                <label>가게 소개</label>
                            </div> 
                            <div className="info-input">
                                <input type="content" name="introduce" maxLength={300} placeholder="가게소개" defaultValue={introduce}></input>
                            </div>
                        </div>
                        <div className="write-info">
                            <div className="info-name">
                                <label>위도</label>
                            </div> 
                            <div className="info-input">
                                <input type="content" name="latitude" maxLength={300} placeholder="위도 입력" defaultValue={latitude}></input>
                            </div>
                        </div>
                        <div className="write-info">
                            <div className="info-name">
                                <label>경도</label>
                            </div> 
                            <div className="info-input">
                                <input type="content" name="longitude" maxLength={300} placeholder="경도 입력" defaultValue={longitude}></input>
                            </div>
                        </div>
                        <div className="write-info-submit">
                            <input type="button" value="등록하기" onClick={() => this._submitStore()}></input>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}
export default Write;