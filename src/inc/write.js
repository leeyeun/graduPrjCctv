import { Component } from "react";
import axios from "axios";

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
            image : "",

        }

    }

    _submitStore = async function() {
        const storeName = document.getElementsByName('storeName')[0].value.trim();
        const address = document.getElementsByName('address')[0].value.trim();
        const number = document.getElementsByName('number')[0].value.trim();
        const time = document.getElementsByName('time')[0].value.trim();
        const sit = document.getElementsByName('sit')[0].value.trim();
        const introduce = document.getElementsByName('introduce')[0].value.trim();
        const image = document.getElementsByName('image')[0].value.trim();

        
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
        else if(image===""){
            return alert("사진을 추가해주세요.");
        }
            const data = { 
                storeName : storeName, 
                address : address,
                number : number,
                time : time,
                sit : sit,
                introduce : introduce,
                image :image
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
                image :image,
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
        const { storeName, address, number, time, sit, introduce, image} = this.props;
        return(
            <div>
                <div>
                    <h3>store </h3>  
                    <form encType="multipart/form-data" method="post">
                        <table>
                            <tbody>
                                <tr>
                                    <td>가게명 : </td>
                                    <td><input type="text" name="storeName" placeholder="가게명" defaultValue={storeName}></input></td>
                                </tr>
                                <tr>
                                    <td>주소 : </td>
                                    <td><input type="text" name="address" placeholder="주소" defaultValue={address}></input></td>
                                </tr>
                                <tr>
                                    <td>번호 : </td>
                                    <td><input type="text" name="number" placeholder="번호" defaultValue={number}></input></td>
                                </tr>
                                <tr>
                                    <td>영업시간 : </td>
                                    <td><input type="text" name="time" placeholder="영업시간" defaultValue={time}></input></td>
                                </tr>
                                <tr>
                                    <td>총 좌석 : </td>
                                    <td><input type="text" name="sit" placeholder="총 좌석" defaultValue={sit}></input></td>
                                </tr>
                                <tr>
                                    <td>가게 소개 : </td>
                                    <td><input type="content" name="introduce" placeholder="가게명" defaultValue={introduce}></input></td>
                                </tr>
                                <tr>
                                    <td>사진 추가 :</td>
                                    <td><input type="file" name="image" placeholder="이미지" ></input></td>
                                </tr>
                                
                                <tr>
                                    <td><input type="button" value="등록하기" onClick={() => this._submitStore()}></input></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}
export default Write;