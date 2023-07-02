/* eslint-disable no-useless-escape */
const API_URL = process.env.REACT_APP_DOMAIN;
export const truncate_string = (baseString, length = 50) => {
  return baseString.substring(0, length);
};

export const textCopier = (part) => {
  navigator.clipboard.writeText(API_URL + "/" + part);
};

export const wordCounter = (baseString) => {
  return baseString.split(" ").length;
};

export const wordTruncater = (baseString, words) => {
  return baseString.split(" ").splice(0, words).join(" ");
};

export const getDaysSinceLastMeeting = (meetingDate) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date()
  return Math.round(Math.abs((today - new Date(meetingDate)) / oneDay));
}

export const timeZoneMap = {
  EST: "America/New_York",
  CST: "America/Chicago",
  MST: "America/Denver",
  PST: "America/Los_Angeles",
};


export const angularRegx = /(\<.+\>)/g;
export const emailRegx =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneNumberRegx =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const localArrayObjectSort = (data, property, order) => {
  return data.sort((a, b) => !!getNestedObj(a, property) ? getNestedObj(a, property) > getNestedObj(b, property) ? order : -order : true);
}

export const getNestedObj = (obj, str) => str.split('.').reduce((p, c) => p && p[c] || null, obj)

// export const convertToInternationalCurrencySystem = number=>(Math.abs(Number(number)) / 1.0e+6).toFixed(2) + "m"

export const convertToInternationalCurrencySystem = (labelValue) => {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+8

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + "b"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+5

      ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "m"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+2

        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "k"

        : Math.abs(Number(labelValue)).toFixed(1);

}