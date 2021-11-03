import './App.css';
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Main, Login, Signup, List, View, Image } from './inc';
import Write from './inc/write';
import axios from 'axios';


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      login: false,
      login_model : false,
      storeName : "",
      address : "",
      number : "",
      time : "",
      sit : "",
      introduce : "",
      image : "",
      // list_data : [],
      // list_page : 1,
      // list_limit : 9,
      // list_all_page : [],
      // list_search : "",

    }
  }
  componentDidMount(){
    if(sessionStorage.login) {
      this.setState({ login : true })
    }
  }

  _withProps = function (Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  _login = () => {
    this.setState({ login : true })
    return sessionStorage.setItem('login', true)
  }

  _logout = () => {
    this.setState({ login : false })
    return sessionStorage.removeItem('login')
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
    const { login, storeName, address, number, time, sit, introduce, image, login_modal } = this.state;
    const { _login, _logout, _getModifyData, _getstoreName, _toggleModal } = this;
    console.log(login);
    return(
      <div>
        {/* <Login /> */}
        <Main
          login = {login}
          _login = {_login}
          _logout = {_logout}
          login_modal = {login_modal}
          _toggleModal = {_toggleModal} />
        
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
          <Route exact={true} path={"/view/:data"} component={View} />
          <Route exact={true} path={"/image"} component={Image} />
        
      </div>
    );
  }
}
export default App;