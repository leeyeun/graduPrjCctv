import React, { Component } from "react";
import '../App.css';
import {Link} from "react-router-dom";
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
    _withProps = function (Component, props) {
        return function(matchProps) {
          return <Component {...props} {...matchProps} />
        }
      }
    _openModal = function() {
        return this.props._toggleModal(true);
      }
    
      _closeModal = function() {
        this.setState({
            visible : false
        });
      }
    
    _logout = function() {
        if(window.confirm('로그아웃 하시겠습니까?')) {
          this.props._logout();
        }
    }

    render(){
        const { admin, user_ip, login, login_modal, _toggleModal } = this.props;
        
        return (
            <div >
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
                            {login && admin ==='Y' && user_ip ==="192.168.55.244"
                            ?   <div><li><Link to="/write">글쓰기</Link></li>
                                {/* <li><Link to="/image">이미지</Link></li> */}
                                </div>
                             : null
                            }

                            {login ? <li><div onClick={() => this._logout()}>로그아웃</div></li>
                            : <li><div onClick={() => this._openModal()}>로그인</div></li>}
                            <Login
                                _login = {this.props._login}
                                login_modal = {login_modal}
                                _toggleModal = {_toggleModal} />
                            
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
