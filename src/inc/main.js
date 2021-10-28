import React, { Component } from "react";
import '../App.css';
import {Link} from "react-router-dom";
import Modal from 'react-awesome-modal';
import axios from 'axios';
import { Login } from './index';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            id : "",
            password : "",
        }
    }
    _openModal = function() {
        this.setState({
            visible : true
        });
      }
    
      _closeModal = function() {
        this.setState({
            visible : false
        });
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
        const res = await axios('/send/pw', {
            method : 'POST',
            data : obj,
            headers: new Headers()
        })

        if(res.data) {
            console.log(res.data.msg);
    
            if(res.data.suc) {
              this.props._login();
              this._closeModal();

              return alert('로그인 되었습니다.');
            }else{
                return alert('아이디 및 비밀번호가 일치하지 않습니다.');
            }
        } 
    }
    _logout = function() {
        if(window.confirm('로그아웃 하시겠습니까?')) {
          this.props._logout();
        }
    }

    render(){
        const { login } = this.props;
        
        return (
            <div>
                <nav className="header">
                    <div className="header_area">
                        <div className="header_left">
                            <a href="/">Logo</a>
                        </div>
                        <ul className="header_center">
                            {/* <li><Link to="/">소개</Link></li>
                            <li><Link to="/">맛집리스트</Link></li>
                            <li><Link to="/">FAQ</Link></li>
                            <li><Link to="/">공지사항</Link></li> */}
                            {/* <li><Link to="/">마이페이지</Link></li> */}
                        </ul>
                        <ul className="header_right">
                            <li><Link to="/write">글쓰기</Link></li>

                            {login ? <li><div onClick={() => this._logout()}>로그아웃</div></li>
                            : <li><div onClick={() => this._openModal()}>로그인</div></li>}
                            <Modal visible={this.state.visible} 
                                width="400" height="360"
                                effect="fadeInDown" 
                                onClickAway={() => this._closeModal()}>
                                <div>
                                    <h4 className='acenter login_tit'> 로그인 </h4>
                                    <form>
                                    <div className='login_div'>
                                    <div className='login_input_div'>
                                        <p> 아이디 </p>
                                        <input type='text' name='id' onChange={() => this._changeID()} autoComplete="off"/>
                                    </div>

                                    <div className='login_input_div' style={{ 'marginTop' : '40px'}}>
                                        <p> 비밀번호 </p>
                                        <input type='password' name='password' onChange={() => this._changePW()}/>
                                    </div>

                                    <div className='submit_div'>
                                        <div> <input type='button' value='로그인' onClick={() => this._selectUserData()}/> </div>
                                        <div> <input type='button' value='취소' onClick={() => this._closeModal()}/> </div>
                                    </div>
                                    </div>
                                    </form>
                                </div>
                            </Modal>
                            {!login 
                            ? <li><Link to="/signup">회원가입</Link></li> 
                            : null }
                             
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
};

export default Main;
