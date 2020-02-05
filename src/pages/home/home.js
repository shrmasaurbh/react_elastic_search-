import React, {Component} from "react";

// import Header from "../../components/header/header.js";
import Footer from "../../components/footer/footer.js";
import HomeBody from "../../components/home_body/home_body.js";

class Home extends Component {

	render(){

		return( 
			<div>
				<HomeBody />
				<Footer />
			</div>
		);
	};
};

export default Home;		