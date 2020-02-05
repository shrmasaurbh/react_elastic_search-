import React, {Component} from "react";
import  "../../assets/css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Aux from "../../utils/Aux/aux.js"

class Filter extends Component {

	constructor(props){
		super(props);
		this.state = {
      		screenWidth: 0 ,
      		filters : [],
      		bhk : [],
      		from : 0,
      		to : 0,
      		active : false
    	};
    	window.addEventListener("resize", this.update);
	}

	componentDidMount() {
        this.update();

      }
    update = () => {
        this.setState({
          screenWidth: window.innerWidth
        });
    };

    handleLangChange = (event) => {
    	console.log("in the hanldle===============");
    	var arrBhk = [];
    	let filters = [];
        if(event.target.className.includes("filter_bhk")){
        	console.log("attrrrr",event.target.className)
        	var bhk = parseInt(event.target.getAttribute('value'));
        	arrBhk.push(bhk);
        	this.setState({bhk: arrBhk});
        }else{
        	if(event.target.className.includes("from_price")){
        	console.log("priceeeee",event.target.value)
        		var from = parseInt(event.target.value); 
	        	this.setState({from: from});
        	}else if(event.target.className.includes("to_price")){
        		var to = parseInt(event.target.value); 
        		this.setState({to: to});
        	}

        }
        // filters = [filterData];
        // "filters": [{"bed_config" :[2],"price":[{"from":20000,"to":500000}] }] 
        // this.setState({filters: filterData});

        // console.log("frommmmmmmmmmmmmmmmm",filters);
        // if(this.state.bhk>0){
        // 	this.setState({filters: [{"bed_config" :arrBhk.push(parseInt(event.target.getAttribute('value')))}]});

        // }else if(this.state.from>0 ) {
        // 	var price = [{"from":this.state.from}];
        // 	this.setState({filters: [...this.state.filters,price]});

        // }else if(this.state.to>0 || this.state.to == "DEFAULT") {
        // 	if(this.state.to == "DEFAULT"){
        // 		// this.setState({filters: [...this.state.filters,"price":[{"from":this.state.from}]]});

        // 		// this.setState({filters: [{"bed_config" :arrBhk.push(parseInt(event.target.getAttribute('value')))}]});

        // 	}else{

        // 	}
        // 	// this.setState({filters: [{"bed_config" :arrBhk.push(parseInt(event.target.getAttribute('value')))}]});
        	
        // }
        // // var price = event.target.value;

        // console.log(arrBhk);

        // this.props.onSelectLanguage(this.state.bhk);            
    }

    applyFilter= ()=>{

    	let filterData = {};
		if(this.state.bhk.length>0 && this.state.from >0 && this.state.to >0 ){
        filterData = {"bed_config" :this.state.bhk,"price":[{"from":this.state.from,"to":this.state.to}]};

    	}else if(this.state.from >0 && this.state.to >0 ){
        filterData = {"price":[{"from":this.state.from,"to":this.state.to}]};

    	}else if(this.state.bhk.length>0){
        	filterData = {"bed_config" :this.state.bhk};

    	}
    	// else if(){
     //    filterData = {"bed_config" :this.state.bhk,"price":[{"from":this.state.from,"to":this.state.to}]};
    		
    	// }
        console.log("=== state of the filter ====",filterData);
        this.props.filterData(filterData);  

    }

    clearFilter = ()=>{

    	let filterData = {};
	    this.setState({active : null})
	    this.option0.value =0;
	    this.option1.value =0;
        this.props.filterData(filterData);

        // console.log(this.state.active,"+++++++++++++++++++++");
    }

    toggle= (position) =>{
	    	console.log("in the toggle =============",this.state.active )
	    if (this.state.active === position) {
	      this.setState({active : null})
	    } else {
	      this.setState({active : position})
	    }
	}
  
  myColor = (position)=>{

	    if (this.state.active === position) {
	      return "#56A366";
	    }else{

	    }
	    return "";
	}

	render(){
		const isDesktop = this.state.screenWidth;
		const {active} = this.state;
		// console.log("this.props.changeFilter");
		// console.log(this.props.changeFilter);
		return(
			<Aux>	
				{isDesktop > 991 ?

				<div className="col-lg-4 col-md-5 col-10 media_filter_block ">
			        <div className="filter_section p-2">
			        <div className="">
			          	<span className="pl-2 close_filter" onClick = {this.props.changeFilter}>
            				<FontAwesomeIcon icon={faTimesCircle} className="text-success" />
        				</span>
			          	<span className="filter_title">Filter</span>
			          	<span className="apply_filter" onClick = {this.applyFilter}>Apply</span>
			          	<span className="apply_filter mr-2" onClick = {this.clearFilter}>clear</span>
			        </div>
			          	<hr/>
				        <div className="bhk-count col-12">
			          		<span>BHK</span>
				            <ul className="list-unstyled row filter_ul text-center">
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3" 
				              	style={{background: this.myColor(0)}} onClick={(e) => {this.toggle(0);this.handleLangChange(e);}}	
				              	  value="1" ref={(ref) => this.li = ref}
			              		>1BHK</li>
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3"
				              	style={{background: this.myColor(1)}} onClick={(e) => {this.toggle(1);this.handleLangChange(e);}}
				              	 value="2" ref={(ref) => this.li = ref} 
				              >2BHK</li>
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3"
				               	style={{background: this.myColor(2)}} onClick={(e) => {this.toggle(2);this.handleLangChange(e);}} 
				               	value="3" ref={(ref) => this.li = ref}
				               >3BHK</li>
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3" 
				              	style={{background: this.myColor(3)}} onClick={(e) => {this.toggle(3);this.handleLangChange(e);}} 
				              	value="4" ref={(ref) => this.li = ref}
				              >4BHK</li>
				            </ul>
				        </div>
				        <hr/><div className="mb-2 pl-3">Price Range</div>
				        <div className="Price-range mb-2">
				          <select defaultValue={'DEFAULT'} className="custom-select from_price col-sm-5 ml-2 col-5"
				          	onChange={this.handleLangChange} ref={(ref) => this.option0 = ref}
				          >
				            <option  value="0">Min</option>
				            <option value="1000000">10 Lakh</option>
				            <option value="1500000">15 Lakh</option>
				            <option value="2000000">20 Lakh</option>
				            <option value="2500000">25 Lakh</option>
				          </select>
				          <select defaultValue={'DEFAULT'} className="custom-select to_price col-sm-5 ml-2 col-5" 
				          	onChange={this.handleLangChange} ref={(ref) => this.option1 = ref}
				          >
				            <option  value="0" >Max</option>
				            <option value="3000000">30 Lakh</option>
				            <option value="5000000">50 Lakh</option>
				            <option value="7000000">70 Lakh</option>
				            <option value="9000000">90 Lakh</option>
				            <option value="10000000">1 Cr</option>
				          </select>
				        </div>
			        </div>
			    </div>
			    :
			    <div className={"col-lg-4 col-md-5 col-10 media_filter_block " + " "+(this.props.showFilter ? 'show' : 'hide')}>
			        <div className="filter_section p-2">
			          	<span className="pl-2 close_filter" onClick = {this.props.changeFilter}>
            				<FontAwesomeIcon icon={faTimesCircle} className="text-success" />
        				</span>
			          	<span className="filter_title">Filter</span>
			          	<span className="apply_filter">Apply</span>
			          	<hr/>
				        <div className="bhk-count col-12">
			          		<span>BHK</span>
				            <ul className="list-unstyled row filter_ul text-center">
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3">1BHK</li>
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3">2BHK</li>
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3">3BHK</li>
				              <li className="card filter_bhk p-2 m-2 col-sm-3 col-3">4BHK</li>
				            </ul>
				        </div>
				        <hr/><div className="mb-2 pl-3">Price Range</div>
				        <div className="Price-range mb-2">
				          <select defaultValue={'DEFAULT'} className="custom-select col-sm-5 ml-2 col-5">
				            <option  value="DEFAULT">Min</option>
				            <option value="1">One</option>
				            <option value="2">Two</option>
				            <option value="3">Three</option>
				          </select>
				          <select defaultValue={'DEFAULT'} className="custom-select col-sm-5 ml-2 col-5">
				            <option  value="DEFAULT" >Max</option>
				            <option value="1">One</option>
				            <option value="2">Two</option>
				            <option value="3">Three</option>
				          </select>
				        </div>
			        </div>
			    </div>
			   } 
			</Aux>   
			);
	}

}

export default Filter;