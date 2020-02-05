import React, {Component} from "react";
import {getSearchData} from "../../../dataParser/getHomeData.js";
import  { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

class HomeSearch extends Component {
	constructor(props){
		super(props);
		this.state = {
      		searchInput: [],
      		searchList : false,
      		cursor:0,
      		inputSearch : '',
      		autoInputValue : '',
      		popupVisible: false
    	};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleKeyDown = this.handleKeyDown.bind(this);
    	this.handleSearch = this.handleSearch.bind(this);
	}
	handleChange = async event => {
		this.setState({ inputSearch: event.target.value });
	    // this.setState({ searchInput: event.target.value });
	    // const inputSearch = {searchInput : event.target.value};
	    var resData = {};
	    if(event.target.value.length>=2){
		    resData =await getSearchData(event.target.value);
		    // console.log("homsearch");
		    console.log("resData",resData);
		    if(resData.data.length>0){
		    	this.setState({})
		    	this.setState({
		    		searchList: true,
		    		searchInput : resData.data,
		    		// cursor : 1,
		    	})


	    	// this.handlePopUp();
		    }else{
		    	this.setState({
		    		searchList: true,
		    		searchInput : [{"id":1,"project_name":"No result Found!!!"}]
		    	});
	    	// this.handlePopUp();
		    }
	    }

	    
	}

	handlePopUp = () => {
	    if (!this.state.popupVisible) {
	      // attach/remove event handler
	      document.addEventListener('click', this.handleOutsideClick, false);
	    } else {
		      document.removeEventListener('click', this.handleOutsideClick, false);
		      this.setState({
				    		searchList: false,
				    	})
	    }
	    this.setState(prevState => ({
	       popupVisible: !prevState.popupVisible,
	    }));

  	}

  	handleOutsideClick=(e)=> {
	    // ignore clicks on the component itself
	    if (this.node.contains(e.target)) {
	      return;
	    }
	    
	    this.handlePopUp();
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
	      if(cursor===0){
		      this.setState( prevState => ({
		        cursor: prevState.cursor + 1
		      }))
		    }
	      this.setState({
	    		cursor : cursor+1	
	    	})
	    this.setState({inputSearch: searchInput[cursor].project_name})
	      var selected = searchInput[cursor+1].project_name;
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
  	handleSearch = (e) =>{
  		if (this.state.autoInputValue != ''){

	    	this.props.history.push('/list?q='+this.state.autoInputValue);
	    	// window.location.href="http://localhost:3003/#/list?q=asdasd"

  		}
  	}

  	handleClick = ()=> {
  		if (this.state.inputSearch != ''  && this.state.inputSearch != undefined){
  			
	    	this.props.history.push('/list?q='+this.state.inputSearch);
  			
  		}
  	}

	render(){
			const { cursor,inputSearch,autoInputValue } = this.state
		return(
			<div className="searchContainer">
				<h2 className="searchContainerTitle">Your destination for the perfect home</h2>
				<div className="d-flex justify-content-center">
					<div className="input-group col-lg-6 searchWrap p-0">
						<input className="form-control prop_name" type="text" 
							onChange={this.handleChange} 
							onKeyDown={ this.handleKeyDown } 
							placeholder="Search by Project Name, City or Area Keywords" 
							aria-label="Recipient's username" aria-describedby="basic-addon2"
							value = {autoInputValue} />
						<input className="form-control name_hide" type="hidden" />
						<div className="input-group-append">
							<button className="input-group btn text-white" onClick={this.handleClick}>search</button>
						</div>
						<span>
							<div id="searchsuggestion" ref={node => { this.node = node; }} className={"searchSuggestion popup"+" "+(this.state.searchList ? 'show' : 'hide')}>
								<ul className="list-unstyled p-2 mb-0">
						        	{ this.state.searchInput.map((searchInput, i) => <li className={"textEllipsis suggestList text-capitalize t-capital" +" "+(cursor === i ? 'active' : null)} key={searchInput.id}>{searchInput.project_name}</li>)}
						    	</ul>
					      	</div>
						</span>
					</div>
				</div>
			</div>
		);
	};
};	
export default withRouter(HomeSearch)