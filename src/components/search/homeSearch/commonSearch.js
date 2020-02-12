import React, {Component} from "react";
import {getSearchData} from "../../../dataParser/getHomeData.js";
import {priceConverter} from "../../../common/priceConverter.js";
import  { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import {getListData} from "../../../dataParser/getListData.js";

class CommonSearch extends Component {
	constructor(props){
		super(props);
		this.state = {
      		searchInput: [],
      		searchList : false,
      		cursor:-1,
      		inputSearch : '',
      		autoInputValue : this.props.inputProcVal,
      		popupVisible: false
    	};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleKeyDown = this.handleKeyDown.bind(this);
    	this.handleSearch = this.handleSearch.bind(this);
	}
	handleChange = async event => {
	    this.setState({ inputSearch: event.target.value });
	    // const inputSearch = {inputSearch : event.target.value};
	    var resData = {};
	    if(event.target.value.length>=2){
		    resData =await getSearchData(event.target.value);
		    // console.log("homsearch");
		    console.log("resData11111111111111",resData.meta,resData.data);
		    if(resData.meta.count > 0){
		    	this.setState({
		    		searchList: true,
		    		searchInput : resData.data,
		    		// cursor : 1,
		    	})


		    }else{
		    	this.setState({
		    		searchList: true,
		    		searchInput : [{"id":1,"project_name":"No result Found!!!"}]
		    	});
		    }
	    }
	    	// this.handleDropdown();
	    	// this.handleDropdown();

	    
	}
	handleDropdown = () => {
    this.setState(prevState => ({
       popupVisible: !prevState.popupVisible,
    }));
    if (!this.state.popupVisible) {
      // attach/remove event handler
    		console.log("addEventListener")
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
    		console.log("reemoveEventListener")
	      
	      document.removeEventListener('click', this.handleOutsideClick, false);

	      this.setState({
			    		searchList: false,
			    	})
    }

  }
  

	handleOutsideClick=(e)=> {
		// console.log(e.target , "111111111111111111111111111");
	    // ignore clicks on the component itself
	    if (this.node.contains(e.target)) {
	      return;
	    }
	    
	    this.handleDropdown();
	}

	handleKeyDown=(e)=> {
	    const { cursor, searchInput } = this.state
	    // arrow up/down button should select next/previous list element
	    if (e.keyCode === 38 && cursor > 0) {
	    	this.setState({
	    		cursor : cursor-1	
	    	})	
	      // this.setState( prevState => ({
	      //   cursor: prevState.cursor - 1
	      // }))
	        // console.log(e.target.value)
	      var selected = searchInput[cursor-1].project_name;
	    } else if (e.keyCode === 40 && cursor < searchInput.length - 1) {
	      if(cursor===-1){
		      this.setState({
		        cursor: cursor + 1
		      })
		    }

	      this.setState({
	    		cursor : cursor+1	
	    	})
	    // this.setState({inputSearch: searchInput[cursor].project_name})
	      var selected = searchInput[cursor+1].project_name;
	      // console.log("xoooooooooooooooxoooxoooxoox", selected);
	    // console.log("selaected",selected);
	    }
	    this.setState({autoInputValue : selected})
	  	if (e.key === 'Enter' || e.keyCode == 13) {
	  		if (this.state.autoInputValue != ''  && this.state.autoInputValue != undefined){
	      		this.handleSearch()
	  		}
	  		else if(this.state.inputSearch != ''  && this.state.inputSearch != undefined){
	      		this.handleClick()
	  		}
	    }
  	}
  	handleSearch = async (e) =>{
  	// 	if (this.state.autoInputValue != ''  && this.state.autoInputValue != undefined){

			// // console.log("comming in this common");
	  //   	// console.log(this.state.autoInputValue);
	  //   	this.props.history.push('/list?q='+this.state.autoInputValue);
	  //   	// window.location.href="http://localhost:3003/#/list?q=asdasd"

  	// 	}

  		if (this.state.autoInputValue != ''  && this.state.autoInputValue != undefined){
  			this.setState({searchList: false})
  			const urlOrigin = window.location.origin;
  			const urlHref = window.location.href;
  			let urlVal = urlHref.substr(urlOrigin.length, 7);
  			console.log(urlVal);
  			console.log(this.state.inputSearch);
  			if(urlVal == "/#/list"){
				const procName = this.state.autoInputValue
		    	var listData = {};
		        listData.query = procName;
		        listData.size = 4;
		        listData.pageId = 1;
		        listData.filters = [];

		        var resData = {};
		        resData = await getListData(listData);
		        console.log("========================================");
		        // console.log(resData,"resData on enter serach");
		     
		        resData.procName = procName;
	        	if(resData.meta.count >= 0){
	        		
			        this.props.handleSearch(resData); 

	        	}
  			}else{

	    		this.props.history.push('/list?q='+this.state.autoInputValue);
  			}


  		}
  	}

  	handleClick = async ()=> {
  		if (this.state.inputSearch != ''  && this.state.inputSearch != undefined){
  			this.setState({searchList: false})
  			const urlOrigin = window.location.origin;
  			const urlHref = window.location.href;
  			let urlVal = urlHref.substr(urlOrigin.length, 7);
  			console.log(urlVal);
  			// console.log(this.state.inputSearch,"------------ input sreach data ------------------");
  			if(urlVal == "/#/list"){
				const procName = this.state.inputSearch
		    	var listData = {};
		        listData.query = procName;
		        listData.size = 4;
		        listData.pageId = 1;
		        listData.filters = [];

		        var resData = {};
		        resData = await getListData(listData);
		        // console.log("========================================");
		        // console.log(resData);
		     
		        resData.procName = procName;
	        	if(resData.meta.count >= 0){
	        		
			        this.props.handleSearch(resData); 

	        	}
  			}else{

	    		this.props.history.push('/list?q='+this.state.inputSearch);
  			}


  		}
  	}

  	handleSuggestClick = async (e)=>{

  		var suggestVal =  e.currentTarget.dataset.value;

  			this.setState({searchList: false})
  			this.setState({autoInputValue: suggestVal})
  			const urlOrigin = window.location.origin;
  			const urlHref = window.location.href;
  			let urlVal = urlHref.substr(urlOrigin.length, 7);
  			console.log(urlVal);
  			// console.log(this.state.inputSearch);
  			if(urlVal == "/#/list"){
				const procName = suggestVal
		    	var listData = {};
		        listData.query = procName;
		        listData.size = 4;
		        listData.pageId = 1;
		        listData.filters = [];

		        var resData = {};
		        resData = await getListData(listData);
		        console.log("========================================");
		        // console.log(resData);
		     
		        resData.procName = procName;
	        	if(resData.meta.count >= 0){
	        		
			        this.props.handleSearch(resData); 

	        	}
  			}else{

  				this.props.history.push('/list?q='+suggestVal);
	    		// this.props.history.push('/list?q='+this.state.inputSearch);
  			}
  	}

	render(){

			const prevSearchVal = this.props.inputProcVal;

			const { cursor,inputSearch,autoInputValue,searchInput } = this.state
			// console.log("00000000000000000000000", prevSearchVal);
		return(
				<div className="input-group searchWrap p-0">
					<input className="form-control prop_name" type="text" 
						onChange={this.handleChange} 
						onKeyDown={ this.handleKeyDown } 
						placeholder="Search by Project Name, City or Area Keywords" 
						aria-label="Recipient's username" aria-describedby="basic-addon2"
						value = {autoInputValue } />
					<input className="form-control name_hide" type="hidden" />
					<div className="input-group-append">
						<button className="input-group btn text-white" onClick={this.handleClick}>search</button>
					</div>
					<span>
						<div id="searchsuggestion" ref={node => { this.node = node; }} className={"searchSuggestion popup"+" "+(this.state.searchList ? 'show' : 'hide')}>
							<ul className="list-unstyled p-2 mb-0">
					        	{searchInput.map((searchInput, i) => <li onClick={this.handleSuggestClick} data-value={searchInput.project_name} className={"textEllipsis suggestList text-capitalize t-capital" +" "+(cursor === i ? 'active' : null)} key={searchInput.id}>
					        		<span>{searchInput.project_name}</span>
					        		<span className="float-right font-weight-bold text-danger">{priceConverter(searchInput.price)}</span>
					        		<span className="float-right font-weight-bold mr-3">{searchInput.bed_config}BHK</span>
				        		</li>)}
					    	</ul>
				      	</div>
					</span>
				</div>
		);
	};
};	
export default withRouter(CommonSearch)