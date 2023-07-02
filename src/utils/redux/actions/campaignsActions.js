import moment from "moment";
import ApiService from "../../middleware/ApiService";
import {
  SAVE_CAMPAIGNS_DATA,
  SAVE_SELECT_CAMPAIGN,RESET_DATA
} from "../types/AdCampaignsTypes";
import { setLoading } from "./commonActions";

export const saveCampaignsData = (payload) => {
  return { type: SAVE_CAMPAIGNS_DATA, payload };
};
export const saveSelectedCampaign = (payload) => {
  return { type: SAVE_SELECT_CAMPAIGN, payload };
};

export const getCampaigns = () => (dispatch, getState) => {
  const { userInfo } = getState().user;
  const { selectedLocation, filterDateRange,selectedClientId } = getState().commonReducer;
  const {selectedCampaign}=getState().campaignsReducer;

  dispatch(setLoading(true));

  const payload = {
    from_date: moment(filterDateRange[0]).format("YYYY-MM-DDT00:00:00"),
    to_date: moment(filterDateRange[1]).format("YYYY-MM-DDT00:00:00"),
    location: selectedLocation,
  };
  if(selectedClientId !== "") payload.client_id= selectedClientId
  const header = { Token: userInfo.token };
  ApiService.get("/v1/getCampaigns", payload, header, (res, err) => {
    if (err === null) {
      dispatch(saveCampaignsData({ ...res }));
      if(!(res.results && res.results.length>0 && res?.results[0]?.find(data=>data._id ===selectedCampaign))){
        dispatch(
          saveSelectedCampaign(
            res && res.results && res.results.length > 0
              ? res.results[0][0]._id
              : ""
          )
        );
      }
      dispatch(setLoading(false));
    } else {
      console.log(err);
      dispatch(setLoading(false));
    }
  });
};

export const Reset_DATA = () => {
  return { type: RESET_DATA };
};
