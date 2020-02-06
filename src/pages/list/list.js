import React, {Component} from "react";

import Loading from "../../common/loader.js";
import queryString from 'query-string';
import {getListData} from "../../dataParser/getListData.js";
import Header from "../../components/header/header.js";
import Footer from "../../components/footer/footer.js";
import ListingBody from "../../components/projectList/projectList.js";

class List extends Component {

	constructor(props){
		super(props);
		this.state = {
      		listTitle : '',
      		listDetail : {},
      		showLoader : false

    	};
	}

	async componentDidMount () {
		this.setState({showLoader : true})
        const projectName  = queryString.parse(this.props.location.search);
        const procName = projectName.q;
        console.log("44444444444444444444444", procName);
        this.setState({listTitle : procName});

        var listData = {};
        listData.query = procName;
        listData.size = 4;
        listData.pageId = 1;
        listData.filters = [];

        var resData = {};
        resData = await getListData(listData);
        console.log("========================================");
        console.log(resData);
        setTimeout(()=>{
        	if(resData.meta.count >= 0){
        		
       			this.setState({listDetail : resData}) ;
		        this.setState({showLoader : false})
        		window.scrollTo(0, 0);
        	}
        },1000)
    }

    handleSearchData = (data) =>{
		this.setState({showLoader : true})
		console.log(data.procName,"1111111111110000000000000000000000");
		setTimeout(()=>{
        	if(data.meta.count >= 0){
        		
        		this.props.history.push('/list?q='+data.procName);
       			this.setState({listTitle : data.procName}) ;
       			this.setState({listDetail : data}) ;
		        this.setState({showLoader : false})
        		window.scrollTo(0, 0);
        	}
        },1000)
	}


	render(){
		console.log(this.state.listTitle)
		return( 
			<div>
				<Loading show={this.state.showLoader} />
				<Header inputValue = {this.state.listTitle} handleSearch = {this.handleSearchData.bind(this)}/>
				{this.state.listDetail.meta &&
				<ListingBody listValue = {this.state.listDetail} inputValue = {this.state.listTitle}/>

				}
				<Footer />
			</div>
		);
	};
};

export default List;		