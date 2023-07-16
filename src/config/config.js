const hostname = window && window.location && window.location.hostname;

let backendHost = {
  getAPIUrl: () => {
    if (hostname === "localhost") {
      return `https://backend.siz.ae/api`;
    } else if (hostname === "siz-front-end.web.app") {
      return `https://backend.siz.ae/api`;
    } else return "https://backend.siz.ae/api";
  },
};

export { backendHost };
