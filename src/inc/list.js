import './css/list.css';
import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Search } from './index';
import { Link } from 'react-router-dom';
import KakaoMap from './kakaomap';

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
    
        this.setState({ data : data_list, all_page : page_arr , search : search })
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
    
    


    render() {
        const list = this.state.data.data;
        const { all_page, page, search } = this.state;
    
        return (
            <div className="list-area">
                <div>
                    <div className="list_search">
                        <Search search = {search}/>
                    </div>
                <div className="main-list">
                    <div>
                        <KakaoMap />
                    </div>
                    <div className="list-box">
                        {list && list.length > 0 ?  list.map( (el, key) => {
                            const view_url = '/view/' + el.storeid;
                        return(
                            <div className="list-view" key={key}>
                                <div className="list-store"> <Link className="list-Link" to ={view_url}>{el.storeName} </Link> </div>
                                <div className="list-address"> {el.address} </div>
                                <div className="list-sit"> {el.sit} </div>
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
                    <div className="list-page">
                        <ul>
                            {all_page ? all_page.map( (el, key) => {
                            return(
                                el === page ? <li key={key} className='page_num'> <b> {el} </b> </li>
                                            : <li key={key} className='page_num' onClick={() => this._changePage(el)}> {el} </li>
                            )
                            })
                            
                            : null}
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
        );
    }
}
export default List;