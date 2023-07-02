const hostname = window && window.location && window.location.hostname;

let backendHost = {
  getAPIUrl: () => {
    if (hostname === "localhost") {
      return `http://localhost:9000/api`;
    } else if (hostname === "agency.leadsnearme.com") {
      return `https://agency.leadsnearme.com/api`;
    } else return "http://54.89.153.255:8081/api";
  },
};

export { backendHost };
