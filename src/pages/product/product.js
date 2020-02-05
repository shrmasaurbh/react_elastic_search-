import React, {Component} from "react";

import Loading from "../../common/loader.js";
import {getDetailsData} from "../../dataParser/getProductData.js"
import Header from "../../components/header/header.js";
import Footer from "../../components/footer/footer.js";
import ProductBody from "../../components/product_body/product_body.js";

class Product extends Component {

	constructor(props){
		super(props);
		this.state = {
      		propertyDetail : '',
      		showLoader : false
    	};
	}

	async componentDidMount () {
		this.setState({showLoader : true})
        const id  = this.props.match.params.id;
        var resData = {};
        resData = await getDetailsData(id);
        setTimeout(()=>{
        	if(resData.meta.status === 200 && resData.meta.error == false){
        		
		        this.setState({propertyDetail : resData.data}) ;
		        this.setState({showLoader : false})
        		window.scrollTo(0, 0);
        	}
        },2000)
    }

	render(){

		console.log("this.state.propertyDetail");
		// console.log(this.state.propertyDetail);

		return( 
			<div>
				<Loading show={this.state.showLoader} />
				<Header />
				<ProductBody  procData ={this.state.propertyDetail} />
				<Footer />
			</div>
		);
	};
};

export default Product;		