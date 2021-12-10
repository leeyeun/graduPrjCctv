import { Component } from "react";
import axios from "axios";
import './css/signup.css';

class Signup extends Component{
    
  _signup = async function() {

      const id = document.getElementsByName('signup_id')[0].value.trim();
      const password = document.getElementsByName('signup_password')[0].value.trim();
      const pw_check = document.getElementsByName('signup_pswCheck')[0].value.trim();
      const name = document.getElementsByName('signup_name')[0].value.trim();
      const email = document.getElementsByName('signup_email')[0].value.trim();

      const eng_check = /^[a-z]+[a-z0-9]{5,19}$/g;
      if(!eng_check.test(id)) {
        return alert('아이디는 영문자로 시작하는 6~20자여야만 합니다.')
      }
      
      const pwcheck = /^[a-z]+[a-z0-9]{5,19}$/g;
      if(!pwcheck.test(password)) {
          return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.')

      } else if(password !== pw_check) {
          return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      }

      if(name.length === 0 || name.length < 2) {
          return alert('이름은 최소 2글자 이상 입력해야 합니다.');
    
      }

      const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      if(!email.match(email_check)) {
          return alert('올바른 이메일 형식을 입력해주세요.');
      }

      const data = { 
          id : id, 
          password : password, 
          name : name, 
          email : email };

      const add_user = await axios('/add/user', {
          method : 'POST',
          headers: new Headers(),
          data : data
      })

      if(!add_user) {
          return alert('이미 존재하는 아이디입니다.');
    
      } else {
        alert('회원가입이 완료되었습니다.');
        return window.location.href = '/';
      }

    }
    render(){
        return(
            <div className="sign-box">
              <h4> JOIN </h4>
              <form className="sign-form">
                <div className="sign-info">
                  <div className="sign-label">
                    <label>아이디</label>
                  </div>
                  <div className="sign-input">
                    <input type='text' name="signup_id"  placeholder="6~20자 영문자를 사용하세요"/>
                  </div>
                </div>
                <div className="sign-info">
                  <div className="sign-label">
                    <label>비밀번호</label>
                  </div>
                  <div className="sign-input">
                    <input type='password' name="signup_password" placeholder="6~20자 영문자를 사용하세요"/>
                  </div>
                  
                </div>
                <div className="sign-info">
                  <div className="sign-label">
                    <label>비밀번호 확인</label>
                  </div>
                  <div className="sign-input">
                    <input type='password' name="signup_pswCheck" placeholder="비밀번호를 한 번 더 입력해주세요"/>
                  </div>
                </div>
                <div className="sign-info">
                  <div className="sign-label">
                    <label>이름</label>
                  </div>
                  <div className="sign-input">
                    <input type='text' name="signup_name" placeholder="이름"/>
                  </div>
                </div>  
                <div className="sign-info">
                  <div className="sign-label">
                    <label>이메일</label>
                  </div>
                  <div className="sign-input">
                    <input type='text' name="signup_email" placeholder="이메일"/>
                  </div>
                </div>
                <div className="sign-submit">
                  <input type='button' value='가입하기' onClick={() => this._signup()} />
                </div>
              </form>
            </div>
        );
    }
}
export default Signup;