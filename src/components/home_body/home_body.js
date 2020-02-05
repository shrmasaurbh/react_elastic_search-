import React, {Component} from "react";

import {Link} from "react-router-dom";
import  "../../assets/css/main.css";
// import  "../../assets/js/search.js";
import siteImage from "../../assets/images/HomesfyLogo.png";
import HomeSearch from "../search/homeSearch/homeSearch.js";
import Loading from "../../common/loader.js"
// import Header from "../header/header.js";
import {getSliderData} from "../../dataParser/getHomeData.js";
import Footer from "../footer/footer.js";
import PropertyImg from "../../assets/images/Runwal-mobi.jpg";
import building1 from "../../assets/images/building1.jpeg";
import building2 from "../../assets/images/building2.jpeg";
import building3 from "../../assets/images/building3.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBuilding, faMapMarkedAlt, faUserTimes, faListOl, faHome, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


class HomeBody extends Component {

	constructor(props){
		super(props);
		this.state = {
      		screenWidth: 0,
      		trending : [],
      		featured: [],
      		showLoader : false
    	};
    	window.addEventListener("resize", this.update);
    	// this.trending = this.trending.bind(this);
    	// this.feature = this.feature.bind(this);
	}

	componentDidMount() {
        this.update();
        this.trending();
        this.feature();
      }
    update = () => {
        this.setState({
          screenWidth: window.innerWidth
        });
    };

    trending = async () =>{
    	this.setState({showLoader : true})
    	const type = 'trending';
    	let trendData = await getSliderData(type);
    	setTimeout(()=>{
        	if(trendData.meta.status === 200 && trendData.meta.error == false){
    			this.setState({trending: trendData.data});
		        this.setState({showLoader : false})
        	}
        },2000)

    }

    feature = async () =>{
    	this.setState({showLoader : true})
    	const type = 'feature';
    	let featureData = await getSliderData(type);
    	setTimeout(()=>{
        	if(featureData.meta.status === 200 && featureData.meta.error == false){
    			this.setState({featured: featureData.data});
		        this.setState({showLoader : false})
        	}
        },2000)
    }

	render(){
		const trend = this.state.trending;
		const homeFeature = this.state.featured;

		const responsive = {
			desktop: {
				breakpoint: { max: 3000, min: 1024 },
				items: 3,
				slidesToSlide: 1, // optional, default to 1.
			},
			tablet: {
				breakpoint: { max: 1024, min: 500 },
				items: 2,
				slidesToSlide: 2, // optional, default to 1.
			},
			mobile: {
				breakpoint: { max: 500, min: 0 },
				items: 1,
				slidesToSlide: 1, // optional, default to 1.
			},
		};

		const trendResponsive = {
			desktop: {
				breakpoint: { max: 3000, min: 1024 },
				items: 4,
				slidesToSlide: 1, // optional, default to 1.
			},
			tablet: {
				breakpoint: { max: 1024, min: 500 },
				items: 3,
				slidesToSlide: 2, // optional, default to 1.
			},
			mobile: {
				breakpoint: { max: 500, min: 0 },
				items: 1,
				slidesToSlide: 1, // optional, default to 1.
			},
		};

		return(
			<div>
				<section>
					<Loading show={this.state.showLoader} />
					<div className="container-fluid p-0 bgCommon">
						<div className="homeHeader">
					        <div className="col-lg-3 col-md-3 col-sm-3 col-6">
					        	<Link to="/">
					        		<img className="site_img" src={siteImage} alt="site-image" />
					        	</Link>
					        </div>
					        <div className="ml-auto mr-3">
					        	<span className="agent">
	            					<FontAwesomeIcon icon={faPhoneAlt} className="text-white pr-1" />
					        		Contact Advisior
				        		</span>
					        </div>
					    </div>
						<HomeSearch />
					</div>
				</section>
				<section>
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-12">
								<h3 className="featuredSection heading">Featured Projects By Our Leading Builders</h3>
							</div>
						</div> 
						<div className="prjectSuggestion">
							<Carousel
								swipeable={true}
								draggable={false}
								showDots={false}
								responsive={responsive}
								ssr={true} // means to render carousel on server-side.
								infinite={true}
								autoPlay={this.state.screenWidth !== "mobile" ? true : false}
								// autoPlay={false}
								autoPlaySpeed={2000}
								keyBoardControl={true}
								customTransition="all .5s"
								transitionDuration={1000}
								containerClass="carousel-container"
								removeArrowOnDeviceType={["tablet", "mobile"]}
								deviceType={this.state.screenWidth}
								dotListClass="custom-dot-list-style"
								itemClass="carousel-item-padding-40-px">
								
								{trend.map(trend => 
									<div className="p-1" key={trend.id}>
										<div className="procSuggestion_list">
											<Link to={"/product/"+(trend.id)}>
												<div className="propSuggest_image">
													<div className="img_container">
														<img src={PropertyImg} />
													</div>
												</div>
											</Link>	
											<div className="procSuggestion_desc">
												<Link to={"/product/"+(trend.id)}>
													<h3 className="textEllipsis procDescTitle t-capital">{trend.title}</h3>
												</Link>
												<p className="textEllipsis t-capital">{trend.project_name}</p>
												<div>
													<ul className="list-unstyled d-flex">
														<li className="mr-1 text-success"><span>{trend.price}</span></li>
														<li className="mr-1"><span>1BHK</span></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								)}
								
							</Carousel>
						</div>	
					</div>
				</section>
				<section>
					<div className="container-fluid">
						<div className="row homesExpanding_row">
							<div className="col-lg-6 pr-4 homesExpand_icon">
								<div className="homesExpanding_image">
									<div className="homesMumbai" style={{top: '137px', left: '162px', height: '130px', width: '110px'}}>
										<div className="homesMumabi_icon" data-toggle="tooltip" data-placement="bottom" title="Mumbai">
											<svg viewBox="0 0 40 40"><path id="svg_fill" fill="#3F474E" d="M39 19.75v-.5h-.75v-1h-10v-9h-.05c-.1-.48-.47-.85-.95-.95v-.8h-.5v.8c-.48.1-.85.47-.95.95h-.05v4h-11.5v-4h-.05c-.1-.48-.47-.85-.95-.95v-.8h-.5v.8c-.48.1-.85.47-.95.95h-.05v9h-10v1H1v.5h.75v2.5H1v.5h.75v12.5H1v.5h38v-.5h-.75v-12.5H39v-.5h-.75v-2.5H39zm-1.25-1v.5h-8.5v-.5h8.5zm-9 0v3.5h-3.5v-3.5h3.5zm5.5 5.5v-1.5h1.5v1.5h-1.5zm-.5 0h-1.5v-1.5h1.5v1.5zm-2 0h-1.5v-1.5h1.5v1.5zm-2 0h-.5v-1.5h.5v1.5zm-1 6h-3.5v-7.5h3.5v7.5zm-3.5.5h3.5v1.5h-3.5v-1.5zm-10-12.5h-1v-3.5h11.5v3.5h-10.5zm.5.5v1.75h.5v-1.75h1.5v1.75h.5v-1.75h1.5v1.75h.5v-1.75h1.5v1.75h.5v-1.75h1.5v1.75h.5v-1.75h.5v3.5h-9.5v-3.5h.5zm10.5-.5v-3.5h1.5v3.5h-1.5zm1.5-4h-1.5v-4.5h1.5v4.5zM27 8.75c.32 0 .6.2.7.5h-1.4c.1-.3.38-.5.7-.5zm-1.25 5v.5h-11.5v-.5h11.5zm-12 .5h-1.5v-4.5h1.5v4.5zM13 8.75c.32 0 .6.2.7.5h-1.4c.1-.3.38-.5.7-.5zm-.75 6h1.5v3.5h-1.5v-3.5zm-.5 4h3v3.5h-3.5v-3.5h.5zm-.5 12h3.5v1.5h-3.5v-1.5zm3.5-.5h-3.5v-7.5h3.5v7.5zm-10-7.5v1.5h-1.5v-1.5h1.5zm.5 0h1.5v1.5h-1.5v-1.5zm2 0h1.5v1.5h-1.5v-1.5zm2 0h1.5v1.5h-1.5v-1.5zm-7-4h8.5v.5h-8.5v-.5zm0 1h8.5v2.5h-8.5v-2.5zm.5 3v1.5h-.5v-1.5h.5zm2.5 12.5V32a1.25 1.25 0 0 1 2.5 0v3.25h-2.5zm3 0V32c0-.96-.8-1.75-1.75-1.75s-1.75.8-1.75 1.75v3.25h-.5v-5.5h4.5v5.5h-.5zm-4-6.25a2.25 2.25 0 1 1 4.5 0l-.03.25H4.28L4.25 29zm5 6.25v-6h-.02l.02-.25a2.75 2.75 0 1 0-5.5 0l.02.25h-.02v6h-1.5v-10.5h8.5v5.5H10v.5h.75v4.5h-1.5zm2 0v-2.5h3.5v2.5h-3.5zm11.5 0h-5.5v-8.2c0-1.42 1.23-2.57 2.75-2.57s2.75 1.15 2.75 2.57v8.2zm.5 0v-8.2c0-1.7-1.46-3.07-3.25-3.07s-3.25 1.38-3.25 3.07v8.2h-1.5v-12.5h9.5v12.5h-1.5zm2 0v-2.5h3.5v2.5h-3.5zm7 0V32a1.25 1.25 0 0 1 2.5 0v3.25h-2.5zm3 0V32c0-.96-.8-1.75-1.75-1.75s-1.75.8-1.75 1.75v3.25h-.5v-5.5h4.5v5.5h-.5zm-4-6.25a2.25 2.25 0 1 1 4.5 0l-.03.25h-4.45l-.02-.25zm5 6.25v-6h-.02l.02-.25a2.75 2.75 0 1 0-5.5 0l.02.25h-.02v6h-1.5v-4.5H30v-.5h-.75v-5.5h8.5v10.5h-1.5zm1.5-11h-1.5v-1.5h1.5v1.5zm0-2h-8.5v-2.5h8.5v2.5z"></path></svg>
										</div>
									</div>
									<div className="homesMumbai" style={{top: '16px', left: '300px', height: '130px', width: '110px'}}>
										<div className="homesMumabi_icon" data-toggle="tooltip" data-placement="bottom" title="Delhi">
											<svg viewBox="0 0 40 40"><g fill="#3F474E"><path id="svg_fill" d="M31.75 35.25v-1.5h.75v-.5h-.75v-19h-2v-3h-1v-4h-2v-2H24.7c-.26-1.14-2.22-2-4.7-2s-4.44.86-4.7 2h-2.05v2h-2v4h-1v3h-2v19H7.5v.5h.75v1.5H6.5v.5h27v-.5h-1.75zM20 3.75c2.25 0 3.88.75 4.2 1.5h-8.4c.3-.75 1.93-1.5 4.18-1.5zm-6.25 2h12.5v1.5h-12.5v-1.5zm-2 2h16.5v3.5h-16.5v-3.5zm-1 4h18.5v2.5h-18.5v-2.5zm-.5 23.5h-1.5v-1.5h1.5v1.5zm4 0h-3.5v-1.5h3.5v1.5zm0-2h-3.5v-5.5h3.5v5.5zm0-6h-3.5v-1.5h3.5v1.5zm0-2h-3.5v-.73c0-.42.35-.77.77-.77h1.96c.43 0 .77.35.77.77v.73zm2 10h-1.5v-1.5h1.5v1.5zm7-2h-.75v.5h.75v1.5h-6.5v-1.5h.75v-.5h-.75V24a3.25 3.25 0 1 1 6.5 0v9.25zm2 2h-1.5v-1.5h1.5v1.5zm4 0h-3.5v-1.5h3.5v1.5zm0-2h-3.5v-5.5h3.5v5.5zm0-6h-3.5v-1.5h3.5v1.5zm0-2h-3.5v-.73c0-.42.35-.77.77-.77h1.96c.43 0 .77.35.77.77v.73zm2 10h-1.5v-1.5h1.5v1.5zm0-2h-1.5v-5.5h.75v-.5h-.75v-1.5h.75v-.5h-.75v-.73c0-.7-.57-1.27-1.27-1.27h-1.96c-.7 0-1.27.57-1.27 1.27v.73h-.75v.5h.75v1.5h-.75v.5h.75v5.5h-1.5V24a3.75 3.75 0 0 0-7.5 0v9.25h-1.5v-5.5h.75v-.5h-.75v-1.5h.75v-.5h-.75v-.73c0-.7-.57-1.27-1.27-1.27h-1.96c-.7 0-1.27.57-1.27 1.27v.73H9.5v.5h.75v1.5H9.5v.5h.75v5.5h-1.5v-14.5h22.5v14.5zm0-15H8.75v-2.5h22.5v2.5zm0-3H8.75v-.5h22.5v.5z"></path><path id="svg_fill" d="M12.5 21.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0-2c.4 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zm15 2a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm0-2c.4 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zm-12.25-9h9.5v-2.5h-9.5v2.5zm.5-2h8.5v1.5h-8.5v-1.5z"></path></g></svg>
										</div>
									</div>
									<div className="homesMumbai" style={{top: '169px', left: '372px', height: '130px', width: '110px'}}>
										<div className="homesMumabi_icon" data-toggle="tooltip" data-placement="bottom" title="Pune">
											<svg viewBox="0 0 40 40"><path id="svg_fill" d="M14 14h12a.25.25 0 0 0 0-.5h-.25v-1.75a1.25 1.25 0 0 0-2.5 0v1.75h-.5v-1.75a1.25 1.25 0 0 0-2.5 0v1.75h-.5v-1.75a1.25 1.25 0 0 0-2.5 0v1.75h-.5v-1.75a1.25 1.25 0 0 0-2.5 0v1.75H14a.25.25 0 0 0 0 .5zm9.75-2.25a.75.75 0 0 1 1.5 0v1.75h-1.5zm-3 0a.75.75 0 0 1 1.5 0v1.75h-1.5zm-3 0a.75.75 0 0 1 1.5 0v1.75h-1.5zm-3 0a.75.75 0 0 1 1.5 0v1.75h-1.5zm1.5 5.75a.25.25 0 0 0-.25.25v1a.25.25 0 0 0 .5 0v-1a.25.25 0 0 0-.25-.25zm1.5 0a.25.25 0 0 0-.25.25v1a.25.25 0 0 0 .5 0v-1a.25.25 0 0 0-.25-.25zm1.5 0a.25.25 0 0 0-.25.25v1a.25.25 0 0 0 .5 0v-1a.25.25 0 0 0-.25-.25zm1.5 0a.25.25 0 0 0-.25.25v1a.25.25 0 0 0 .5 0v-1a.25.25 0 0 0-.25-.25zm1.5 0a.25.25 0 0 0-.25.25v1a.25.25 0 0 0 .5 0v-1a.25.25 0 0 0-.25-.25zm1.5 0a.25.25 0 0 0-.25.25v1a.25.25 0 0 0 .5 0v-1a.25.25 0 0 0-.25-.25z" fill="#3f474e"></path><circle cx="16.5" cy="21.75" r=".5" fill="#3f474e"></circle><circle cx="23.5" cy="21.75" r=".5" fill="#3f474e"></circle><path id="svg_fill" d="M39.5 18.5h-.85l-1-2h-.9v-1h-.65l-1-1h-7.35V9h1V7.5H26.1l-1-1H14.9l-1 1h-2.65V9h1v5.5H4.9l-1 1h-.65v1h-.9l-1 2H.5a.25.25 0 0 0 0 .5h.75v17h37.5V19h.75a.25.25 0 0 0 0-.5zM37.35 17l.75 1.5h-1.35V17zm-1.1 1.5h-.75v-.75l-.5-1-.5 1v.75H33v-.75l-.5-1-.5 1v.75h-2v-.75l-.5-1-.5 1v.75h-1.5v-.75l-.5-1-.5 1v.75h-.75V16h10.5v2.5zm-12.5 13h-7.5v-7.34c0-.34 1.74-1.34 3.75-2.14 2 .8 3.75 1.79 3.75 2.14zm-3.66-10h-.18c-1.25.49-4.16 1.74-4.16 2.64v7.36h-1V20h10.5v11.5h-1v-7.34c0-.9-2.91-2.16-4.16-2.64zM14.25 19v3.5h-.5v-1.75a.25.25 0 0 0-.5 0v1.75h-2.5v-1.75a.25.25 0 0 0-.5 0v1.75h-2.5v-1.75a.25.25 0 0 0-.5 0v1.75h-2.5v-1.75a.25.25 0 0 0-.5 0v1.75h-.5V19zm-10.5 4h10.5v8.5H3.75zm21.5-7.5v1h-10.5v-1h-.65l-.5-.5h12.8l-.5.5zm-10.5 3V17h10.5v2.5h-10.5zm11 4.5h10.5v8.5h-10.5zm10.5-.5h-.5v-1.75a.25.25 0 0 0-.5 0v1.75h-2.5v-1.75a.25.25 0 0 0-.5 0v1.75h-2.5v-1.75a.25.25 0 0 0-.5 0v1.75h-2.5v-1.75a.25.25 0 0 0-.5 0v1.75h-.5V19h10.5zM34.9 15l.5.5h-8.8l.5-.5h7.8zM15.1 7h9.8l.5.5H14.6zm-3.35 1.5V8h16.5v.5h-16.5zm1 .5h14.5v5.5h-14.5zM5.1 15h7.8l.5.5H4.6zm-1.35 1h10.5v2.5h-.75v-.75l-.5-1-.5 1v.75H11v-.75l-.5-1-.5 1v.75H8v-.75l-.5-1-.5 1v.75H5.5v-.75l-.5-1-.5 1v.75h-.75V16zm-1.1 1h.6v1.5H1.9zm-.9 18.5V19h1.5v16.5zm2 0V32h10.5v3.5zm11 0V32h10.5v3.5zm11 0V32h10.5v3.5zm12.5 0h-1.5V19h1.5z" fill="#3f474e"></path></svg>
										</div>
									</div>
									<div className="homesMumbai" style={{top: '284px', left: '207px', height: '130px', width: '110px'}}>
										<div className="homesMumabi_icon" data-toggle="tooltip" data-placement="bottom" title="Banglore">
											<svg viewBox="0 0 40 40"><path id="svg_fill" d="M14.25 26.25h-2.5v3.5h2.5zm-.5 3h-1.5v-2.5h1.5zm12 .5h2.5v-3.5h-2.5zm.5-3h1.5v2.5h-1.5z" fill="#3f474e"></path><path id="svg_fill" d="M39.25 27.28v-3h-1v-1.66a1 1 0 0 0 .27-.83c-.11-.69-.93-1.21-1.27-1.4v-1.1h-.5v1.11c-.73.39-1.15.84-1.24 1.34a1.17 1.17 0 0 0 .24.89v1.66h-6.5v-1h-1v-1.71a1 1 0 0 0 .27-.83c-.11-.69-.93-1.21-1.27-1.4v-1.1h-.5v1.11c-.73.39-1.15.84-1.24 1.34a1.17 1.17 0 0 0 .24.89v1.66h-.65l-1-1h-.85v-4.54h1v-3.5h-.6a2.57 2.57 0 0 0 .83-2c-.15-2.33-3.53-4.48-4.23-4.9V6.25h-.5v1.12c-3.14 2-4.67 3.77-4.54 5.3a2.31 2.31 0 0 0 .91 1.58h-.37v3.5h1v4.5h-.85l-1 1h-.65v-1.67a1 1 0 0 0 .27-.83c-.11-.69-.93-1.21-1.27-1.4v-1.1h-.5v1.11c-.73.39-1.15.84-1.24 1.34a1.17 1.17 0 0 0 .24.89v1.66h-1v1h-6.5v-1.67a1 1 0 0 0 .27-.83c-.11-.69-.93-1.21-1.27-1.4v-1.1h-.5v1.11c-.73.39-1.15.84-1.24 1.34a1.17 1.17 0 0 0 .24.89v1.66h-1v9.5h12v1h14.5v-1h12v-6.47zM37 20.78c.34.19 1 .62 1 1.05a.52.52 0 0 1-.15.42h-1.73a.64.64 0 0 1-.11-.48c.06-.33.4-.67.99-.99zm-.75 2h1.49v1.5h-1.49zm-.5 2h3v2.53h-.5v-.91a4.54 4.54 0 0 0-1.08-1.1l-.17-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.87h-.51v-.87a4.54 4.54 0 0 0-1.08-1.1l-.18-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.86h-.51v-.86a4.54 4.54 0 0 0-1.08-1.1l-.18-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.85h-.51v-2.5zm3 5.57h-.5v-.95a4.54 4.54 0 0 0-1.08-1.1l-.17-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.91h-.51v-.91a4.54 4.54 0 0 0-1.08-1.1l-.18-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.91h-.51v-.91a4.54 4.54 0 0 0-1.08-1.1l-.18-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.91h-.51v-2.56h9.5zm-1 0h-1.5v-.76a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zm-3 0h-1.5v-.76a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zm-3 0h-1.5v-.76a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zm0-3.06h-1.5v-.69a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zm3 0h-1.5v-.7a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zm3 0h-1.5v-.71a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zM27 19.78c.34.19 1 .62 1 1.05a.52.52 0 0 1-.15.42h-1.73a.64.64 0 0 1-.11-.48c.06-.33.4-.67.99-.99zm-.75 2h1.5v1.5h-1.5zm-10.54-9.16c-.08-.92.6-2.49 4.29-4.83.68.41 3.85 2.45 4 4.49a2.32 2.32 0 0 1-1.07 2h-5.88a2.23 2.23 0 0 1-1.34-1.66zm.54 4.63v-2.5h7.5v2.5h-7.5zm1 .5h5.5v1.46h-5.5zm0 2h5.5v2.54h-5.5zm-1.15 3h7.8l1.5 1.5H14.6zm9.65 10.5h-11.5v-.5h11.5zm-9-1h-.5v-5.5h.5zm4 0h-1.5v-5.5h1.5zm3 0h-.5v-5.5h.5zm.5 0v-6h-1.5v6h-1.5v-6h-2.5v6h-1.5v-6h-1.5v6h-.5v-7.5h9.5v7.5zM13 19.78c.34.19 1 .62 1 1.05a.52.52 0 0 1-.15.42h-1.73a.64.64 0 0 1-.11-.48c.06-.33.4-.67.99-.99zm-.75 2h1.5v1.5h-1.5zm-2.5 8.46h-1.5v-.66a4.3 4.3 0 0 1 .75-.76 4.3 4.3 0 0 1 .75.74zm.48-.81a4.54 4.54 0 0 0-1.08-1.1L9 28.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.82h-.52v-.82a4.54 4.54 0 0 0-1.08-1.1L6 28.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.83h-.52v-.83a4.54 4.54 0 0 0-1.08-1.1L3 28.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.84h-.52v-2.5h9.5v2.48h-.5v-.72zm-3.48.82h-1.5v-.67a4.3 4.3 0 0 1 .75-.76 4.3 4.3 0 0 1 .75.74zm-3 0h-1.5v-.69a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zm0-3h-1.5v-.69a4.31 4.31 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74zm3 0h-1.5v-.68a4.3 4.3 0 0 1 .75-.75 4.3 4.3 0 0 1 .75.74zm3 0h-1.5v-.67a4.3 4.3 0 0 1 .75-.76 4.3 4.3 0 0 1 .75.74zM3 20.78c.34.19 1 .62 1 1.05a.52.52 0 0 1-.15.42H2.12a.64.64 0 0 1-.12-.48c.07-.33.41-.67 1-.99zm-.75 2h1.5v1.5h-1.5zm-.5 2h9v2.48h-.5v-.86a4.54 4.54 0 0 0-1.08-1.1L9 25.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.83h-.52v-.83a4.54 4.54 0 0 0-1.08-1.1L6 25.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.84h-.52v-.84a4.49 4.49 0 0 0-1.07-1.1L3 25.19l-.15.12a4.5 4.5 0 0 0-1.08 1.1v.84h-.52v-2.5zm.5 8.5v-.69a4.3 4.3 0 0 1 .75-.77 4.3 4.3 0 0 1 .75.74v.69zm3 0v-.69a4.3 4.3 0 0 1 .75-.77 4.3 4.3 0 0 1 .75.74v.69zm3 0v-.69a4.3 4.3 0 0 1 .75-.77 4.3 4.3 0 0 1 .75.74v.69zm2 0v-.88a4.54 4.54 0 0 0-1.08-1.1L9 31.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.85h-.52v-.85a4.54 4.54 0 0 0-1.08-1.1L6 31.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.85h-.52v-.85a4.54 4.54 0 0 0-1.08-1.1L3 31.18l-.15.12a4.54 4.54 0 0 0-1.08 1.1v.85h-.52v-2.5h9.5v2.54zm1-9.5h3.15l-1 1h1.35v7.5h-1v1h-2.5zm15.5 10.5h-13.5v-.5h13.5zm-.5-1v-1h-1v-7.5h1.35l-1-1h3.15v9.5zm4 0v-.69a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74v.69zm3 0v-.69a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74v.69zm3 0v-.69a4.3 4.3 0 0 1 .75-.74 4.3 4.3 0 0 1 .75.74v.69zm2 0v-.88a4.54 4.54 0 0 0-1.08-1.1l-.17-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.85h-.51v-.85a4.54 4.54 0 0 0-1.08-1.1l-.18-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.85h-.51v-.85a4.54 4.54 0 0 0-1.08-1.1l-.18-.12-.15.12a4.54 4.54 0 0 0-1.08 1.1v.85h-.51v-2.43h9.5v2.43z" fill="#3f474e"></path></svg>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 homesExpand_city">
								<h3 className="featuredSection heading">Our Business Growing faster in these cities</h3>
								<p className="">More Locations. More Ease. More Affordable.</p>
								<div className="homesExpanding">
									<div className="homesExpanding_wrap">
										<div className="homesExpanding_item">
											<span className="is-fontBold">2700+</span> Happy Families
										</div>
									</div>
									<div className="homesExpanding_wrap">
										<div className="homesExpanding_item">
											<span className="is-fontBold">100+</span> Developers
										</div>
									</div>
									<div className="homesExpanding_wrap">
										<div className="homesExpanding_item">
											<span className="is-fontBold">98%</span> Customers Satisfaction
										</div>
									</div>
								</div>
								<ul className="list-unstyled homesCity">
									<li className="homesCity_list">
										<span className="cityDots" style={{backgroundColor:'rgb(26, 182, 79)'}}></span>
										<span>Mumbai</span>
									</li>
									<li className="homesCity_list">
										<span className="cityDots" style={{backgroundColor:'rgb(255, 127, 123)'}}></span>
										<span>Pune</span>
									</li>
									<li className="homesCity_list">
										<span className="cityDots" style={{backgroundColor:'rgb(245, 166, 35)'}}></span>
										<span>Banglore</span>
									</li>
									<li className="homesCity_list">
										<span className="cityDots" style={{backgroundColor:'rgb(95, 214, 242)'}}></span>
										<span>Delhi</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section className="mb-4">
				  <div className="container-fluid">
				  	<div className="row">
						<div className="col-lg-12 ">
							<h3 className="featuredSection heading">Our Trending Projects </h3>
						</div>
					</div> 
				    <div className="Homestrending">
				    	<Carousel
								swipeable={true}
								draggable={false}
								showDots={false}
								responsive={trendResponsive}
								ssr={true} // means to render carousel on server-side.
								infinite={false}
								autoPlay={false}
								autoPlaySpeed={2000}
								keyBoardControl={true}
								customTransition="all .5s"
								transitionDuration={1000}
								containerClass="carousel-container"
								removeArrowOnDeviceType={["tablet", "mobile"]}
								deviceType={this.state.screenWidth}
								dotListClass="custom-dot-list-style"
								itemClass="carousel-item-padding-40-px">
								{homeFeature.map(feature =>
							        <div className="col-sm-12 launch_block p-2" key={feature.id}>
							            <div className="new_launch">
							              	<Link to={"/product/"+(feature.id)}>
								              	<div className="palce_container">
										            <img src={PropertyImg} alt="Property-Image"/>
										            <span>Thane Property</span>
								              	</div>
								            </Link>  	
								            <div className="project_detail">
								            	<ul className="list-unstyled">
								            		<li>
								            			<Link to={"/product/"+(feature.id)}>
															<h3 className="p-1 textEllipsis procDescTitle t-capital">{feature.title}</h3>
														</Link>
							            			</li>
								            		<li className="p-1 t-capital">{feature.project_name}</li>
								            		<li className="p-1 text-info">1BHK, 2BHK, 3BHK</li>
								            		<li className="p-1">{feature.price}</li>
								            	</ul>
								            </div>
								        </div>    
							        </div>
								)}
					          
						</Carousel>		
				    </div>
				  </div>
				</section>
				<section>
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12 text-center">
								<div>
									<div className="headerStyleLine float-left leftCircleDiv"></div>
									<div className="homepage-caption-header">
									Why use Homesfy
									</div>
									<div className="headerStyleLine float-right rightCircleDiv"></div>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-lg-3 col-sm-6 col-6 aboutSpecial">
								<div className="aboutSpecial_icon">
									<FontAwesomeIcon icon={faUserTimes} className="text-muted" />
								</div>
								<div className="text-center aboutSpecial_desc">
									<h4>Avoid Brokers</h4>
									<p>We directly connect you to verified owners to save brokerage</p>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6 col-6 aboutSpecial">
								<div className="aboutSpecial_icon">
									<FontAwesomeIcon icon={faListOl} className="text-muted" />
								</div>
								<div className="text-center aboutSpecial_desc">
									<h4>Free Listing</h4>
									<p>Easy listing process. Also using WhatsApp</p>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6 col-6 aboutSpecial">
								<div className="aboutSpecial_icon">
									<FontAwesomeIcon icon={faHome} className="text-muted" />
								</div>
								<div className="text-center aboutSpecial_desc">
									<h4>Shortlist without Visit</h4>
									<p> Extensive Information makes it easy</p>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6 col-6 aboutSpecial">
								<div className="aboutSpecial_icon">
									<FontAwesomeIcon icon={faUserTimes} className="text-muted" />
								</div>
								<div className="text-center aboutSpecial_desc">
									<h4> Rental Agreement</h4>
									<p> Assistance in creating Rental agreement & Paper work</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>	
		);
	};

};

export default HomeBody;