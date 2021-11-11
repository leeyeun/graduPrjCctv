
import './App.css';
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Main, Login, Signup, List, View, Image} from './inc';
import Write from './inc/write';
import axios from 'axios';


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      admin : false,
      user_ip : "",
      login: false,
      login_model : false,
      storeName : "",
      address : "",
      number : "",
      time : "",
      sit : "",
      introduce : "",
      image : "",
      user_id: "",
      // list_data : [],
      // list_page : 1,
      // list_limit : 9,
      // list_all_page : [],
      // list_search : "",

    }
  }
  componentDidMount(){
    if(sessionStorage.login && sessionStorage.IP) {
      this.setState({ 
        login : JSON.parse(sessionStorage.login).id, 
        admin : JSON.parse(sessionStorage.login).admin,
        user_ip : JSON.parse(sessionStorage.IP),
        user_id : JSON.parse(sessionStorage.login).user_id,
      })
    }
  }
  

  _withProps = function (Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  _login = (data) => {
    sessionStorage.setItem('login', JSON.stringify(data.suc))
    sessionStorage.setItem('IP', JSON.stringify(data.ip))

    this.setState({ login : JSON.parse(sessionStorage.login).id,  
                    admin : JSON.stringify(data.suc).admin,
                    user_ip : JSON.parse(sessionStorage.IP),
                    user_id : JSON.parse(sessionStorage.login).user_id,
    })

    return window.location.reload()
  }

  _logout = () => {
    this.setState({ login : false, admin : false, user_ip : "" })

    sessionStorage.removeItem('login')
    sessionStorage.removeItem('IP')
  }

  _getstoreName = () => {
    const storeName = document.getElementsByName('storeName')[0].value.trim();

    this.setState({ storeName : storeName })
  }
  //게시글 수정 (원래 글 불러오기)
  _getModifyData = async (storeid)=>{
    const getData = await axios('/get/store_data', {
      method : 'POST',
      headers : new Headers(),
      data : { storeid : storeid }
  });
    this.setState({
      storeName : getData.data[0].storeName,
      address : getData.data[0].address,
      number : getData.data[0].number,
      time : getData.data[0].time,
      sit : getData.data[0].sit,
      introduce : getData.data[0].introduce,
      image : getData.data[0].image,
    })
    console.log(getData)
  }
  _toggleModal = (boolean) => {
    this.setState({ login_modal : boolean })
  };

  render(){
    const { login, admin, user_ip, storeName, address, number, time, sit, introduce, image, login_modal } = this.state;
    const { _login, _logout, _getModifyData, _getstoreName, _toggleModal, user_id } = this;
    
    //console.log(login);
    return(
      <div className="app_div">
        {/* <Login /> */}
        <Main
          admin = {admin}
          user_ip = { user_ip}
          login = {login}
          _login = {_login}
          _logout = {_logout}
          login_modal = {login_modal}
          _toggleModal = {_toggleModal} 
          user_id = {user_id}
          />
        
        <Route exact={true} path={"/login"}  component={Login}/>
        <Route exact={true} path={"/signup"}  component={Signup}/>
        <Route exact={true} path={"/write"} component={Write}/>
        <Route exact={true} path={"/write/modify/:data"} 
              component={this._withProps(Write,{
                _getstoreName : _getstoreName,
                storeName : storeName,
                address : address,
                number : number,
                time : time,
                sit : sit,
                introduce : introduce,
                image : image,
                _getModifyData : _getModifyData,
              })} />
          <Route exact={true} path={"/"} component={List}/>
          <Route exact={true} path={"/view/:data"} 
              component={this._withProps(View,{
                admin : admin,
                login : login,
                user_id : user_id,
                address : address,
                _toggleModal : _toggleModal
                
              })} />
          <Route exact={true} path={"/image"} component={Image} />
      </div>
    );
  }
}
export default App;