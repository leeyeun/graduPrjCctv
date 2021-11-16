import { Component } from "react";
import axios from 'axios';
import './css/login.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : "",
            password : "",
            login : false,
        }
    }

    _changeID = function() {
        const id_v = document.getElementsByName('id')[0].value;
        this.setState({
            id : id_v
        });
    }

    _changePW = function() {
        const pw_v = document.getElementsByName('password')[0].value;
    
        this.setState({
            password : pw_v
        });
    }

    _selectUserData = async (e) => {
        const id = this.state.id.trim();
        const password = this.state.password.trim();

        if(id === "") {
        return alert('아이디를 입력해주세요.');

        } else if(password === "") {
        return alert('비밀번호를 입력해주세요.');
        }

        const obj = { id : id, password : password }
        const res = await axios('/api/login', {
            method : 'POST',
            data : obj,
            headers: new Headers()
        })

        if(res.data) {
    
            if(res.data.suc) {
                this.props._login(res.data);
                this.props._toggleModal(false);
                alert('로그인 되었습니다.');
                return window.location.href = '/';
            }else{
                return alert('아이디 및 비밀번호가 일치하지 않습니다.');
            }
        } 
    }

    render(){
        return(
            <div className='login-div'>
                <h4> LOGIN </h4>
                <form className="login-form">
                    <div className='login-input-div'>
                        <div className="login-input">
                            <input type='text' name='id' onChange={() => this._changeID()} autoComplete="off" placeholder="아이디"/>
                        </div>
                    </div>
                    <div className='login-input-div'>
                        <div className="login-input">
                            <input type='password' name='password' placeholder="비밀번호" onChange={() => this._changePW()}/>
                        </div>
                    </div>
                    <div className='login-submit'>
                        <div> <input type='button' value='로그인' onClick={() => this._selectUserData()}/> </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;