import React, {Component} from "react";

import ShowMoreText from 'react-show-more-text';
import Lightbox from 'react-image-lightbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpa, faBiking,faHandHoldingUsd, faTableTennis, faUtensils, faGopuram, faBuilding, faTty, faTree, faHome, faRoad, faFootballBall, faDumbbell, faShieldAlt, faSwimmer, faBatteryQuarter, faFan, faTools, faParking, faWifi, faWater, faBurn, faBookReader, faTheaterMasks, faWrench, faFireExtinguisher, faStore} from "@fortawesome/free-solid-svg-icons";
import  "../../assets/css/main.css";
import PropertyImg from "../../assets/images/Runwal-mobi.jpg";
import Floor_img from "../../assets/images/floorplan.jpg"
import map_img from "../../assets/images/mapImage.jpg"
import {priceConverter} from "../../common/priceConverter.js";

const images = [
	PropertyImg,
  '//placekitten.com/1500/500',
  '//placekitten.com/4000/3000',
  '//placekitten.com/800/1200',
  '//placekitten.com/1500/1500',
];

class ProductBody extends Component {

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      photoIndex: 0,
	      imagePopup: '',
	      isOpen: false,
	      isImageOpen:false
	    };
	}

	render(){
		 const {imagePopup, photoIndex, isOpen, isImageOpen } = this.state;
		 const procData = this.props.procData;
		 // console.log(procData.description);
		 
		const arrIcon = {"intercom facility":faTty, "lift(s)":faBuilding, "lift":faBuilding, "power backup":faBatteryQuarter, "feng shui / vaastu compliant":faGopuram, "security / fire alarm":faShieldAlt, "centrally air conditioned":faFan, "private garden / terrace":faTree, "park": faTree, "swimming pool":faSwimmer, "maintenance staff":faTools, "visitor parking":faParking, "internet/wi-fi connectivity":faWifi, "security personnel":faShieldAlt, "club house / community center":faHome, "fitness centre / gym":faDumbbell, "water softening plant":faTree, "water storage":faWater, "piped-gas":faBurn, "restaurant": faUtensils, "badminton court":faTableTennis, "cricket pitch":faFootballBall, "basketball court":faFootballBall, "squash court":faFootballBall, "atm":faHandHoldingUsd, "indoor game room":faTableTennis, "rainwater harvesting":faWater, "landscaped garden":faTree, "cycling & jogging track":faBiking, "children play area":faTableTennis, "gym":faDumbbell, "library":faBookReader, "spa":faSpa, "tennis court":faTableTennis, "amphitheatre":faTheaterMasks, "rain water harvesting" :faWater, "sports area":faTableTennis, "24x7 security":faShieldAlt, "service/goods lift":faBuilding, "sewage treatment plant":faWrench, "internal roads":faRoad, "community hall":faBuilding, "aerobics room": faDumbbell, "high-tech alarm system":faShieldAlt, "fire fighting systems":faFireExtinguisher, "utility shops":faStore};
		
		return(

			<div className="content-wrapper">
				<section className="pt-4 bg-white">
					<div className="container">
						<div className="row mb-4">
					        <div className="col-md-5">
					        	<div className="property_img">
					          		<img src={PropertyImg} alt="Property-Image" onClick={() => this.setState({ isOpen: true })}/>
					          		{isOpen && (
							          <Lightbox
							            mainSrc={images[photoIndex]}
							            nextSrc={images[(photoIndex + 1) % images.length]}
							            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
							            onCloseRequest={() => this.setState({ isOpen: false })}
							            onMovePrevRequest={() =>
							              this.setState({
							                photoIndex: (photoIndex + images.length - 1) % images.length,
							              })
							            }
							            onMoveNextRequest={() =>
							              this.setState({
							                photoIndex: (photoIndex + 1) % images.length,
							              })
							            }
							          />
							        )}
					        	</div>
					        </div>
					        <div className="col-md-7">
					        	<div className="productTitle mb-4">
						          <h4 className="t-capital">{procData.title}</h4>
						          <small className="t-capital">{procData.location}</small>
						        </div>
					          <ul className="list-unstyled prop_align mt-2">
					            <li>
					            	<div className="row">
						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Bedrooms</div>
					            				{procData.bed_config ? 
						            				<div className="p_value">{procData.bed_config}</div>
						            				:
						            				<div className="p_value">-</div>
							            		}
						            		</div>

						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Bathrooms</div>
					            				{procData.bath_no ? 
						            				<div className="p_value">{procData.bath_no}</div>
						            				:
						            				<div className="p_value">-</div>
								            	}
						            		</div>
						            	
						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Balcony</div>
						            			{procData.balcony ? 
						            				<div className="p_value">{procData.balcony}</div>
						            				:
						            				<div className="p_value">-</div>
								            	}	
						            		</div>
					            	</div>
				            	</li>
				            	<hr />
				            	<li>
					            	<div className="row">
					            			<div className="col-sm-4 col-4">
					            				<div className="p_title">Rate per Sq.ft</div>
					            				{procData.rateperfeet ? 
					            					<div className="p_value">{procData.rateperfeet}</div>
					            					:
					            					<div className="p_value">-</div>
							            		}
					            			</div>
					            		
						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Carpet area</div>
					            				{procData.property_area ? 
						            				<div className="p_value">{procData.property_area} sq.ft</div>
						            				:
						            				<div className="p_value">-</div>
								            	}
						            		</div>
						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Price</div>
						            			{procData.price ? 
						            				<div className="p_value">&#8377; {priceConverter(procData.price)}</div>
						            				:
						            				<div className="p_value">-</div>
								            	}
						            		</div>
					            	</div>
				            	</li>
				            	<hr />
				            	<li>
					            	<div className="row">
						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Status</div>
					            				{procData.sale_type ? 
						            				<div className="p_value">{procData.sale_type}</div>
					            					:
						            				<div className="p_value">-</div>
								            	}	
						            		</div>
						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Car parking</div>
					            				{procData.parking ? 
						            				<div className="p_value">{procData.parking}</div>
						            				:
						            				<div className="p_value">-</div>
								            	}
						            		</div>

						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Floor</div>
						            			{procData.floors ?
						            				<div className="p_value">{procData.floors}</div>
						            				:
						            				<div className="p_value">-</div>
								            	}	
						            		</div>
					            	</div>
				            	</li>
				            	<hr />
				            	<li>
					            	<div className="row">
					            		<div className="col-sm-6">
					            			<div className="thumb_img">
					            				<img src={Floor_img} alt="floor-plan" onClick={() => this.setState({ isImageOpen: true, imagePopup: Floor_img })}/>
					            				<span className="tag_name">Floor Plan</span>
					            				{isImageOpen && (
										          <Lightbox
										            mainSrc={imagePopup}
										            onCloseRequest={() => this.setState({ isImageOpen: false })}
										          />
										        )}
					            			</div>
					            		</div>
					            		<div className="col-sm-6">
					            			<div className="thumb_img">
					            				<img src={map_img} alt="floor-plan"/>
					            				<span className="tag_name">See Location</span>
					            			</div>
					            		</div>
					            	</div>
				            	</li>
					          </ul>
					        </div>
					    </div>

					    <div className="row">
					        <div className="col-md-12">
					          <h5 className="project_specs p-2">Overview</h5>
					        </div>
					        <div className="col-md-12">
					          <h6 className="pl-3">Description</h6>
					          	{procData.description ?
					          		<div className="pl-4 p_value mb-3">	
						          		<ShowMoreText
							                lines={3}
							                more='Show more'
							                less='Show less'
							                anchorClass='text-lowercase'
							                onClick={this.executeOnClick}
							                expanded={false}
							                width={0}
							            >
							              {procData.description}
							            </ShowMoreText> 
						           	</div> 
					          		:
					          		<p className="pl-4 p_value">Not available</p>
					          	}	
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">New</span></li>
					            <li><span>New</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Possession</span></li>
					            {procData.possession ?
						            <li><span>{procData.possession}</span></li>
						            :
						            <li><span>-</span></li>
						        }
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Booking Amount</span></li>
					            {procData.booking_amount ?
					            	<li><span>99,0000</span></li>
					            	:
					            	<li><span>-</span></li>
					            }	
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Security Deposit</span></li>
					            {procData.security_deposite ?	
					            	<li><span>No Deposit</span></li>
					            	:
					            	<li><span>-</span></li>
					            }	
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Facing</span></li>
					            {procData.facing ? 
					            	<li><span>{procData.facing}</span></li>
					            	:
					            	<li><span>-</span></li>
					            }	
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">overlooking</span></li>
					            {procData.overlooking ? 
					            	<li><span>Garden View</span></li>
					            	:
					            	<li><span>-</span></li>
					            }	
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Watersupply</span></li>
					            {procData.watersupply_type ? 
					            	<li><span>{procData.watersupply_type}</span></li>
					            	:
					            	<li><span>-</span></li>
					            }
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Property type</span></li>
					            {procData.property_type ?
						            <li><span>{procData.property_type}</span></li>
						            :
						            <li><span>-</span></li>
						        }
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Furnish</span></li>
					            {procData.furnish ?
						            <li><span>{procData.furnish}</span></li>
						            :
						            <li><span>-</span></li>
						        }
					          </ul>
					        </div>
					        <div className="col-md-3">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Room Configuration</span></li>
					            {procData.room_config ?	
					            	<li><span>{procData.room_config}</span></li>
					            	:
					            	<li><span>-</span></li>
					            }	
					          </ul>
					        </div>
					    </div>
					    <div className="row">
					        <div className="col-md-12 mb-4">
					          <h5 className="project_specs p-2">Amenities</h5>
					        </div>
					        {procData.amenities != undefined ? 
					        	procData.amenities.map(ameni => 

							        <div className="col-md-2 col-6" key={ameni}>
							          <ul className="list-unstyled text-center">
							            <li><span><FontAwesomeIcon icon={arrIcon[ameni]} className="text-danger animity_icon" /></span></li>
							            <li> <span className="animity_name" >{ameni}</span></li>
							          </ul>
							        </div>

				        		)

				        		:

				        		<div className="col-md-2 col-6">
						          <ul className="list-unstyled text-center">
						            <li><span><FontAwesomeIcon icon={faHome} className="text-danger animity_icon" /></span></li>
						            <li> <span className="animity_name">Amenities are not reveled yet.</span></li>
						          </ul>
						        </div>
					        }
					        
					    </div>
					</div>
				</section>
			</div>	
		);
	};

}

export default ProductBody;