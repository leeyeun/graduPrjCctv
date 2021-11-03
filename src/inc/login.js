import { Component } from "react";
import axios from 'axios';
import Modal from 'react-awesome-modal';

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
                return alert('로그인 되었습니다.');
            }else{
                return alert('아이디 및 비밀번호가 일치하지 않습니다.');
            }
        } 
    }

    render(){
        return(
            <div className='login-div'>
                {/* <div>로그인</div>
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
                        </div>
                        </div>
                </form> */}
                <Modal 
                    visible={this.props.login_modal} 
                    width="400" height="360"
                    effect="fadeInDown" 
                    onClickAway={() => this.props._toggleModal(false)}>
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
                            <div> <input type='button' value='취소' onClick={() => this.props._toggleModal(false)}/> </div>
                        </div>
                        </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Login;