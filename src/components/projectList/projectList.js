import React, {Component} from "react";

import {Link} from "react-router-dom";
import Loading from "../../common/loader.js"
import Header from "../header/header.js";
import Footer from "../footer/footer.js";
import Filter from "../filter/fiter.js";
import {getListData} from "../../dataParser/getListData.js";
// import  "../../assets/js/custom.js";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBuilding, faMapMarkedAlt, faTags, faBed, faCube, faFilter} from "@fortawesome/free-solid-svg-icons";

class ListingBody extends Component {

	constructor(props){
		super(props);
		this.state = {
      		filterPopUp: false,
      		meta: props.listValue.meta,
      		data: props.listValue.data,
      		activePage : 1,
      		filters : [],
      		showLoader : false
    	};
	}

	changeFilterState(event) {
	    this.setState({filterPopUp: !this.state.filterPopUp})
	}
	componentWillReceiveProps(nextProps) {
	 // console.log('componentWillReceiveProps', nextProps);
	 	if (this.props !== nextProps) {
	  	// this.setState({nextProps});
	  	this.setState({
	  		meta:nextProps.listValue.meta,
	  		data:nextProps.listValue.data
	 	 });
		// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx',nextProps);
		}
	}

	genericGetListData = async (...params) =>{
		console.log("genericGetListData......",params)
        // console.log("this.state.filters",this.state.filters);
    	var listData = {};
        listData.query = params[0].query || '';
        listData.size = 4;
        listData.pageId = params[0].pageNumber || 1;
        listData.filters = params[0].filters || [];

        var resData = {};
        resData = await getListData(listData);
        // console.log("========================================");
        // console.log(resData);
        setTimeout(()=>{
        	if(resData.meta.count >= 0){
        		
		        this.setState({
		        	meta: resData.meta,
		        	data : resData.data
		        })
		        this.setState({showLoader : false})
        		window.scrollTo(0, 0);
        	}
        },2000)
	}

	handleChangePage= async (pageNumber)=>{
		console.log(`active page is ${pageNumber}`);
        this.setState({showLoader : true})
    	this.setState({activePage: pageNumber});
    	const procName = this.props.inputValue
    	var listData = {};
        listData.query = procName;
        listData.size = 4;
        listData.pageId = pageNumber;
        listData.filters = [];
        
        this.genericGetListData(listData);

        // var resData = {};
        // resData = await getListData(listData);
        // // console.log("========================================");
        // // console.log(resData);
        // setTimeout(()=>{
        // 	if(resData.meta.count > 0){
        		
		      //   this.setState({
		      //   	meta: resData.meta,
		      //   	data : resData.data
		      //   })
		      //   this.setState({showLoader : false})
        // 		window.scrollTo(0, 0);
        // 	}
        // },2000)


       	// this.setState({listDetail : resData}) ;
	}

	handleFilter = async (filterData) => {
        this.setState({showLoader : true})
		console.log("===========FilterVal==========");
		console.log(filterData);
        // let filters = [];
        // const procName = this.props.inputValue
    	let listData = {};
    	listData.filters = [];
        listData.query = this.props.inputValue;
        listData.size = 4;
        listData.pageId = 1;
        listData.filters = [filterData];

    	console.log("listData.filters",listData.filters);
        this.genericGetListData(listData);

        // var resData = {};
        // resData = await getListData(listData);
        // // console.log();
        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",resData);
        // setTimeout(()=>{
        // 	if(resData.meta.count > 0){

		      //   this.setState({
		      //   	meta: resData.meta,
		      //   	data : resData.data
		      //   })
		      //   this.setState({showLoader : false})
        // 	}
        // },2000)

    }


	render(){

		// const listData = this.props.listValue;
		let {count, size} = this.state.meta;
		console.log("this.state.meta.count",this.state.meta.count);
		return(
				<div className="content-wrapper">
					<Loading show={this.state.showLoader} />
					<div className="container pt-3 pb-3">
						<div className="row">
							<Filter  
								changeFilter={this.changeFilterState.bind(this)} 
								showFilter = {this.state.filterPopUp}
								filterData = {this.handleFilter.bind(this)}
							/>
							<div className="col-lg-8 col-md-12">
								<div className="temp_filter" onClick={()=>this.setState({filterPopUp : !this.state.filterPopUp})}>
									<span className="pr-2 flter_funnel">
			            				<FontAwesomeIcon icon={faFilter} className="text-success" />
		            				</span>
									<span className="filter_media">Filter</span>
								</div>
								{this.state.meta['count'] ? 

										this.state.data.map(listVal => 
											<div className="main_area_display shadow card p-3 mb-2" key={listVal.id}>
												<div className="mb-2">
													<span className="pr-2">
							            				<FontAwesomeIcon icon={faBuilding} className="text-success" />
						            				</span>
						            				<Link to={"/product/"+(listVal.id)}>
														<span className="pl-1 flat_name t-capital text-info">{listVal.project_name}</span>
						            				</Link>
												</div>
												<div className="row">
													<div className="col-md-4 col-4 media_menu">
														<span className="pr-2">
								            				<FontAwesomeIcon icon={faTags} className="text-warning" />
							            				</span>	
														<span className="pl-1 price_flat ">{listVal.price}</span>
													</div>
													<div className="col-md-4 col-8 media_menu">
														<span className="pr-2">
								            				<FontAwesomeIcon icon={faBed} className="text-success" />
							            				</span>	
														<span className="bhk_flat ">{listVal.bed_config} BHK</span>
													</div>
													<div className="col-md-4 col-5">
														<span className="area_flat media_menu">
														<span className="pr-2">
								            				<FontAwesomeIcon icon={faCube} className="text-success" />
							            				</span>	
														{listVal.property_area}sq. ft.</span>
													</div>
												</div>
												<div className="mt-1 media_menu">
													<span className="pt-2 pl-1 pb-1 flat_address t-capital">
														<span className="pr-2">
							            					<FontAwesomeIcon icon={faMapMarkedAlt}/>
						            					</span>	{listVal.location}
						            				</span>
												</div>
											</div>
										)
								:
									<div className="main_area_display shadow card p-3">
										<h5>No Result Found For Request !!!</h5>
									</div>
								}
							</div>
						</div>
						{this.state.meta['count'] > 4 ? 
							<div className="row justify-content-end">
								<div className="paginationBlock">
									<Pagination
										hideDisabled	
								        activePage={this.state.activePage}
								        itemsCountPerPage={size}
								        totalItemsCount={count}
								        pageRangeDisplayed={5}
								        onChange={this.handleChangePage}
							        />
								</div>
							</div>
							:
							''
						}	
					</div>
				</div>

		);
	};
};		

export default ListingBody;