import {
  SET_FILTER_DATE_RANGE,
  SET_LOADING,
  SET_SELECTED_CLIENT,
  SET_SELECTED_CLIENT_ID,
  SET_SELECTED_LOCATION, RESET_DATA, SET_SEO_SORT, SET_SEARCH_TERM_SORT, SET_CALL_RAIL_SORT, SET_CAMPAIGN_SORT,
  SET_USER_SORT,
  SET_KPI_SORT,
} from "../types/CommonTypes";
import { startOfDay, subDays } from "date-fns";

const initialState = {
  loading: false,
  filterDateRange: [
    new Date(startOfDay(subDays(new Date(), 31))),
    new Date(startOfDay(subDays(new Date(), 1))),
  ],
  selectedLocation: "",
  selectedClient: {},
  selectedClientId: "",
  seoSort: { sortProperty: "position", sortOrder: 1 },
  searchTermsSort: { sortProperty: "clicks", sortOrder: -1 },
  calRailSort: { sortProperty: "start_time", sortOrder: -1 },
  campaignSort: { sortProperty: "", sortOrder: 1 ,campaignIndex:0},
  userSort: { sortProperty: "account_name", sortOrder: 1 },
  kpisort: { sortProperty: "", sortOrder:1}
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_FILTER_DATE_RANGE:
      return { ...state, filterDateRange: action.payload };

    case SET_SELECTED_LOCATION:
      return { ...state, selectedLocation: action.payload };
    case SET_SELECTED_CLIENT:
      return { ...state, selectedClient: action.payload };
    case SET_SELECTED_CLIENT_ID:
      return { ...state, selectedClientId: action.payload };
    case SET_SEO_SORT:
      return { ...state, seoSort: action.payload };
    case SET_SEARCH_TERM_SORT:
      return { ...state, searchTermsSort: action.payload };
    case SET_CALL_RAIL_SORT:
      return { ...state, calRailSort: action.payload };
    case SET_CAMPAIGN_SORT:
      return { ...state, campaignSort: action.payload };  
    case SET_USER_SORT:
        return { ...state, userSort: action.payload };
    case SET_KPI_SORT:
      return { ...state, kpisort: action.payload };  
    case RESET_DATA:
      return { ...initialState }
    default:
      return state;
  }
}

export default commonReducer