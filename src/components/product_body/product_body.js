import React, {Component} from "react";

import Lightbox from 'react-image-lightbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRoad, faTableTennis, faDumbbell, faShieldAlt, faSwimmer, faBatteryQuarter} from "@fortawesome/free-solid-svg-icons";
import  "../../assets/css/main.css";
import PropertyImg from "../../assets/images/Runwal-mobi.jpg";
import Floor_img from "../../assets/images/floorplan.jpg"
import map_img from "../../assets/images/mapImage.jpg"

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
		 console.log(procData);

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
					            		{procData.bed_config ? 
						            		<div className="col-sm-4 col-4">
						            			<div className="p_title">Bedrooms</div>
						            			<div className="p_value">{procData.bed_config}
						            			</div>
						            		</div>
						            		:
						            		''
					            		}
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Bathrooms</div>
					            			<div className="p_value">{procData.bath_no}</div>
					            		</div>
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Balcony</div>
					            			<div className="p_value">1</div>
					            		</div>
					            	</div>
				            	</li>
				            	<hr />
				            	<li>
					            	<div className="row">
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Rate per Sq.ft</div>
					            			<div className="p_value">{procData.rateperfeet}</div>
					            		</div>
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Carpet area</div>
					            			<div className="p_value">{procData.property_area} sq.ft</div>
					            		</div>
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Price</div>
					            			<div className="p_value">{procData.price}</div>
					            		</div>
					            	</div>
				            	</li>
				            	<hr />
				            	<li>
					            	<div className="row">
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Status</div>
					            			<div className="p_value">{procData.possession}</div>
					            		</div>
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Car parking</div>
					            			<div className="p_value">1 covered</div>
					            		</div>
					            		<div className="col-sm-4 col-4">
					            			<div className="p_title">Floor</div>
					            			<div className="p_value">{procData.floors}</div>
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
					          <p className="pl-4 p_value">{procData.desctipition}</p>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">New</span></li>
					            <li><span>New</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Price Negotiable</span></li>
					            <li><span>No</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Booking Amount</span></li>
					            <li><span>99,0000</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Security Deposit</span></li>
					            <li><span>No Deposit</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Facing</span></li>
					            <li><span>NorthEast</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">overlooking</span></li>
					            <li><span>Garden View</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Ownership Type</span></li>
					            <li><span>Freehold</span></li>
					          </ul>
					        </div>
					        <div className="col-md-2 col-6">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Status</span></li>
					            <li><span>Unfurnished</span></li>
					          </ul>
					        </div>
					        <div className="col-md-3">
					          <ul className="list-unstyled text-center">
					            <li><span className="over_prop">Property type</span></li>
					            <li><span>{procData.property_type}</span></li>
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
							            <li><span><FontAwesomeIcon icon={faHome} className="text-danger animity_icon" /></span></li>
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