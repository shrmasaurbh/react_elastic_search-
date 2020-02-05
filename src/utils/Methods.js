import axios from 'axios';
import API from './api';


export const get = async (url,options) =>{

    if(options == null && options == ''){
        let res = await API.get(url);
        return res;
    }
    else{
        let res = await API.get(url,{params:options});
        
        if(res != null){
            return res.data;
        }else{
            console.log("in the erreo")
            let errorRes = "No data found";
            return errorRes;
        }
    }

}

export const post = async (url, options) => {

    // console.log("===========in the method Callllllll")
    // console.log(options);
    if(options == null && options == ''){

        let errorRes = "Data field is empty";
        return errorRes

    }else{
        let res = await API.post(url, options);
        return res.data;

    }
  // } catch (e) {
  //   console.log('😱 Axios request failed: ${e}',e);
  // }

};


const accessToken = () => {
  if (localStorage.getItem("homesfy_lg")) {
    return JSON.parse(window.atob(localStorage.getItem("homesfy_lg")));
  }
};

const isTokenValid = (status,message) => {
  if (
    (status === 400 && message === "Token Not Found") ||
    (status === 401 && message === "Authentication error")
  ) {
    window.localStorage.clear();
    window.location = "/";
  }

  return true;
};

const sendResponse = (res) => {
  if (isTokenValid(res.meta.status,res.meta.message)) {
    return res;
  }
};

// export const get = async url => {
//   let headers = new Headers({
//     "Content-Type": "application/json",
//     Accept: "*/*",
//     access_token: accessToken()
//   });

//   var request = new Request(url, {
//     method: "GET",
//     headers: headers
//   });

//   return fetch(request).then(stream =>
//     stream.json().then(res => {
//       return sendResponse(stream, res);
//     })
//   );
// };



export const put = (url, options) => {
  options.method = "PUT";
  options.headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    access_token: accessToken()
  };

  return fetch(url, options).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

export const Delete = url => {
  let headers = new Headers({
    "Content-Type": "application/json",
    Accept: "*/*",
    access_token: accessToken()
  });

  var request = new Request(url, {
    method: "DELETE",
    headers: headers
  });

  return fetch(request).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};

export const FileUpload = (url, options) => {
  options.method = "POST";
  options.headers = {
    Accept: "*/*",
    access_token: accessToken()
  };

  return fetch(url, options).then(stream =>
    stream.json().then(res => {
      return sendResponse(stream, res);
    })
  );
};
