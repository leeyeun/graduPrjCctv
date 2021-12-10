import './css/list.css';
import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Search } from './index';
import { Link } from 'react-router-dom';
import KakaoMap from './kakaomap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { faAngry} from '@fortawesome/free-regular-svg-icons';
import { faMeh} from '@fortawesome/free-regular-svg-icons';
import { faFrown } from "@fortawesome/free-regular-svg-icons";

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [],
            page : 1,
            limit : 9,
            all_page : [],
            search : "",
            file:null,
            fileName: "",

            curHead : 10,
            sit : 50
        }
    }
    componentDidMount() {
        this._getListData();
        this._setPage();
        
    }
    _getListData = async function() {
        const { limit } = this.state;
        const page = this._setPage();
        //검색
        let search = queryString.parse(this.props.location.search);
        if(search) {
            search = search.search;
        }

        //데이터 전체 수
        const total_cnt = await axios('/get/store_cnt',{

            method : 'POST',
            headers: new Headers(),
            data : { search : search }
        });

        //데이터 가져오기
        const data_list = await axios('/get/store', {
          method : 'POST',
          headers: new Headers(),
          data : { limit : limit, page : page, search : search }
        })
        //전체 페이지 수 구하기
        let page_arr = [];

        for(let i = 1; i <= Math.ceil(total_cnt.data.cnt / limit); i++) {
            page_arr.push(i);
        }
    
        this.setState({ data : data_list, all_page : page_arr , search : search, })
        
    }

    _changePage = function(el) {
        this.setState({ page : el })
        sessionStorage.setItem('page', el);

        return this._getListData();
    }

    _setPage = function() {
        if(sessionStorage.page) {
          this.setState({ page : Number(sessionStorage.page) })
          return Number(sessionStorage.page);
        }
        
        this.setState({ page : 1 })
        return 1;
    }
    
    _countHead = function (curHead, sit) {
        
        const exp = (curHead/sit)*100;

        if(76<=exp && exp<=100){
            return (
                <div>
                    <FontAwesomeIcon icon={faSmile} />
                    <FontAwesomeIcon icon={faMeh} />
                    <FontAwesomeIcon icon={faFrown} />
                    <FontAwesomeIcon icon={faAngry} style={{color: 'red'}}/>
                </div>
                
            )
        }
        else if(51<=exp && exp<=75){
            return(
                <div>
                    <FontAwesomeIcon icon={faSmile} />
                    <FontAwesomeIcon icon={faMeh} />
                    <FontAwesomeIcon icon={faFrown} style={{color: 'red'}}/>
                    <FontAwesomeIcon icon={faAngry} />
                </div>
                
            )
        }
        else if(26<=exp && exp<=50){
            return (
                <div>
                    <FontAwesomeIcon icon={faSmile} />
                    <FontAwesomeIcon icon={faMeh} style={{color: 'red'}}/>
                    <FontAwesomeIcon icon={faFrown} />
                    <FontAwesomeIcon icon={faAngry} />
                </div>
                
            )
        }
        else {
            return (
                <div>
                    <FontAwesomeIcon icon={faSmile} style={{color: 'red'}}/>
                    <FontAwesomeIcon icon={faMeh} />
                    <FontAwesomeIcon icon={faFrown} />
                    <FontAwesomeIcon icon={faAngry} />
                </div>
                
            )
        }
    }
    


    render() {
        const list = this.state.data.data;
        const { search } = this.state;
       
        return (
            <div className="list-area">
                <div className="list-box">
                    <div className="list-search">
                        <Search search = {search}/>
                    </div>
                    <div className="list-map">
                        <KakaoMap />
                    </div>
                    
                    <div className="list-list">
                        
                        <div className="list-ch">
                        {list && list.length > 0 ?  
                            list.map( (el, key) => {
                                const view_url = '/view/' + el.storeid;
                                return(
                                    <div className="list-view" key={key}>
                                        <div className="list-left" >
                                            <div className="list-store"> <Link className="list-Link" to ={view_url}>{el.storeName} </Link> </div>
                                            <div className="list-address"> {el.address} </div>
                                            <div className="list-time">{el.time}</div>
                                            
                                        </div>
                                        <div className="list-right">
                                            {this._countHead(el.curHead, el.sit)}
                                            <div className="list-sit"> {el.curHead} / {el.sit} </div>
                                        </div>
                                    </div>
                                    
                                    )
                                })
                            : 
                            <div>
                                {search !== "" ? <div>검색된 결과가 없습니다.</div>
                                            : <div>데이터가 없습니다.</div>
                                }
                            </div> 
                            }
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}
export default List;