import {get, post} from "../utils/Methods.js";

export const getDetailsData = async (value)=>{
	// var params ={
	// 	"section":value
	// }
	let getDetailData = await get('/details/'+value.toString())
	
	// console.log('getDetailData ===>', getDetailData);
	return  getDetailData

}
