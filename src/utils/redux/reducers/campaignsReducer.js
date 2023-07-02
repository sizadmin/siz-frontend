import { SAVE_CAMPAIGNS_DATA, SAVE_SELECT_CAMPAIGN,RESET_DATA } from "../types/AdCampaignsTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    campaignsData: {},
    selectedCampaign: "",
};

export default  (state = initialState, action) =>{
    switch (action.type) {
        case SAVE_CAMPAIGNS_DATA:
            return { ...state, campaignsData: action.payload };
        case SAVE_SELECT_CAMPAIGN:
            return { ...state, selectedCampaign: action.payload };
        case RESET_DATA:
            return { ...initialState };
        default:
            return state;
    }
}
