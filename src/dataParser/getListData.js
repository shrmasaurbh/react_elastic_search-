import {get, post} from "../utils/Methods.js"

export const getListData = async (value) => {
	console.log("the in the parser value");
	console.log(value);
	if(value.size == undefined && value.size == null){
		value.size = 10;
	}

	if(value.pageId == undefined && value.pageId == null){
		value.pageId = 1;
	}

	let procListData = await post('/list',value) 

    console.log("valuew before post request ========",procListData)
	return procListData
	// .then(response =>{
	// 	if(response.meta.status == 200 && response.data.length > 0){
	// 		var resData = response;
	// 		return resData.data;
	// 	}else{
	// 		let errorRes = "No data found";
 //            return errorRes;
	// 	}
	// });
	// console.log('loginData ===>', autoCompleteData);
	// return procListData

}