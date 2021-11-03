import React, { Component } from "react";
import { post } from 'axios';

class Image extends Component{
    constructor(props){
        super(props);
        this.state={
            file:null,
            fileName: '',

        }
        
    }
    handleFormSubmit = (e) =>{
        e.preventDefault()
        this.addList()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            file:null,
            userID: "",
            title: "",
            content: "",
            fileName: ""
        })
    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }
    addList = () => {
        const url = '/api/lists';
        const formData = new FormData();
        formData.append('image', this.state.file);

        
        return post(url, formData);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit} encType="multipart/form-data" method="post" action="/upload">
                    <table>
                        <tbody>
                            <tr>
                                <td>이미지 : </td>
                                <td><input type="file" name="image" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input></td>
                            </tr>
                            <tr>
                                <td><input type="submit" ></input></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
export default Image;