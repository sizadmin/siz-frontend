import moment from "moment";
import ApiService from "../../middleware/ApiService";
import {
  SET_FILTER_DATE_RANGE,
  SET_LOADING,
  SET_SELECTED_CLIENT,
  SET_SELECTED_CLIENT_ID, RESET_DATA,
  SET_SELECTED_LOCATION,
  SET_SEO_SORT,
  SET_CAMPAIGN_SORT,
  SET_CALL_RAIL_SORT,
  SET_SEARCH_TERM_SORT,
  SET_USER_SORT,
  SET_KPI_SORT,
} from "../types/CommonTypes";

export const setLoading = (payload) => {
  return { type: SET_LOADING, payload };
};

export const setFilterDateRange = (payload) => {
  // console.log("Set filter date range called");
  const filterDateRange = [
    moment(payload[0]).toDate(),
    moment(payload[1]).toDate(),
  ];
  return { type: SET_FILTER_DATE_RANGE, payload: [...filterDateRange] };
};

export const setSelectedLocation = (payload) => {
  return { type: SET_SELECTED_LOCATION, payload };
};

export const onSelectedClientChange = (clientId) => (dispatch, getState) => {
  dispatch(setSelectedClientId(clientId));
  if (!clientId) {
    dispatch(setSelectedClient({}));
    return;
  }

  const { userInfo } = getState().user;
  const header = { Token: userInfo.token };
  ApiService.get("/v1/user/" + clientId, {}, header, (res, err) => {
    if (err === null) {
      if (res.results.length > 0) {
        dispatch(setSelectedClient({ ...res.results[0] }));
      } else {
        dispatch(setSelectedClient({}));
      }
    }
  });
};

export const setSelectedClient = (payload) => {
  return { type: SET_SELECTED_CLIENT, payload };
};

export const setSelectedClientId = (payload) => {
  return { type: SET_SELECTED_CLIENT_ID, payload };
};

export const setSeoSort = (payload)=>{
  return { type: SET_SEO_SORT, payload }
}

export const setSearchTermSort = (payload)=>{
  return { type: SET_SEARCH_TERM_SORT, payload }
}

export const setCallRailSort = (payload)=>{
  return { type: SET_CALL_RAIL_SORT, payload }
}
export const setCampaignSort = (payload)=>{
  return { type: SET_CAMPAIGN_SORT, payload }
}
export const setKpiSort = (payload)=>{
  return { type: SET_KPI_SORT, payload }
}
export const setUserSort = (payload)=>{
  return { type: SET_USER_SORT, payload }
}

export const Reset_DATA = () => {
  return { type: RESET_DATA };
};