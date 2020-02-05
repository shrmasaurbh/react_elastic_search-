import {get, post} from "../utils/Methods.js"

export const getSearchData = async (value) => {
	var params ={
		"q":value
	}
	// console.log("the in the parser value");
	// console.log(value);
	let autoCompleteData = await get('/autocomplete',params)
	// console.log('loginData ===>', autoCompleteData);
	return  autoCompleteData;

}

export const getSliderData = async (value)=>{
	var params ={
		"section":value
	}
	let sliderData = await get('/sectionlist',params)
	
	// console.log('loginData ===>', sliderData);
	return  sliderData

}