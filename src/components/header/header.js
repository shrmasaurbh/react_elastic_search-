import React, {Component} from "react";
import {Link} from "react-router-dom";
import CommonSearch from "../../components/search/homeSearch/commonSearch.js"
import siteImage from "../../assets/images/HomesfyLogo.png";
import {getSearchData} from "../../dataParser/getHomeData.js"
import  "../../assets/css/main.css";
import Aux from "../../utils/Aux/aux.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faTimes ,faSearch, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

class Header extends Component {

	constructor(props){
		super(props);
		this.state = {
      		sideBar: false,
      		mobileSearch : false,
      		screenWidth: 0 
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
	handleChange = event => {
		const inputSearch = {searchInput : event.target.value};
	    var resData = getSearchData(inputSearch);
	}

	render(){
		// console.log("this.props.inputValue",this.props.inputValue);
		const inputProcVal =  this.props.inputValue;

		const isDesktop = this.state.screenWidth;

		return(

			<Aux>
				{isDesktop > 991 ? 
					  <nav className="navbar desktop">
					    <div className="container-fluid p-0">
						    <div className="three_header headerSize">
								<div className="col-lg-3 col-md-3">
						    		<Link to="/">
							        	<img className="site_img" src={siteImage} alt="site-image" />
						    		</Link>
						        </div>
						        <div className="col-lg-6 col-md-6">
							        <CommonSearch  inputProcVal= {inputProcVal} handleSearch= {this.props.handleSearch}/>
						    	</div>
						        <div className="ml-auto pr-3">
						        	<span className="agent">
		            					<FontAwesomeIcon icon={faPhoneAlt} className="text-white pr-1" />
						        		Contact Advisior
					        		</span>
						        </div>
						    </div>
					      
					      <div className={"desktopNavbar three_header" +" "+(this.state.sideBar ? 'three_header_mobile' : '')}>
					      	<ul className="headerMenu">
					      		<li className="menuList">Popular Project</li>
					      		<li className="menuList">New Launch</li>
					      		<li className="menuList">Featured Project</li>
					      		<li className="menuList">Contact Us</li>
					      		<li className="menuList">About Us</li>
					      	</ul>
					      </div>
					    	
					    </div>
					  </nav>
					:
					<header role="banner">
					  <nav className="navbar mobile ">
					    <div className="container-fluid p-0">
					      <div className="row main_header ml-0">
					      	<div className="three_bar d-lg-none" onClick={()=> this.setState({sideBar : !this.state.sideBar})}>
					    		<span className="p-2">
		            				<FontAwesomeIcon icon={this.state.sideBar ? faTimes  : faBars } className="text-success" />
	            				</span>
					    	</div>
					       	<div className="site_img_header col-8 p-0">
					    		<Link to="/">
						        	<img className="site_img" src={siteImage} alt="site-image" />
					    		</Link>	
					        </div>
					        <div className="mobile_search" onClick = {()=> this.setState({mobileSearch : !this.state.mobileSearch})}>
	            				<FontAwesomeIcon icon={faSearch} className="text-success" />
					        </div>
					      </div>
				        <div className={"input-group col-md-6 p-0 mt-3"+" "+(this.state.mobileSearch ? 'show' : 'hide')}>
				          <CommonSearch  inputProcVal= {inputProcVal} handleSearch= {this.props.handleSearch}/>
				        </div>
					      <div className={"bg-success three_header" +" "+(this.state.sideBar ? 'three_header_mobile' : '')}>
					      	<div className="col-lg-2 p-2 col-12 text-white media_sidebar">Popular Project</div>
					      	<div className="col-lg-2 p-2 col-12 text-white media_sidebar">New Launch</div>
					      	<div className="col-lg-2 p-2 col-12 text-white media_sidebar">Featured Project</div>
					      	<div className="col-lg-2 p-2 col-12 text-white media_sidebar">Contact Us</div>
					      	<div className="col-lg-2 p-2 col-12 text-white media_sidebar">About Us</div>
					      </div>
					    </div>
					  </nav>
					</header>

				}
			</Aux>	
			);
	}

}

export default Header;