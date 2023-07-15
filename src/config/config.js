const hostname = window && window.location && window.location.hostname;

let backendHost = {
  getAPIUrl: () => {
    if (hostname === "localhost") {
      return `https://backend.siz.ae/api`;
     //return `http://13.49.49.212:8085/api`;
    } else if (hostname === "siz-front-end.web.app") {
      return `https://backend.siz.ae/api`;
     //return `http://13.49.49.212:8085/api`;
    } else return "https://backend.siz.ae/api";
    //else return `http://13.49.49.212:8085/api`;
  },
};

export { backendHost };
