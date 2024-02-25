import React, { useEffect, useState, createContext } from "react";

const UserContext = createContext();

const ThemeProvider = (props) => {
  // Context state
  const [userInfo, setUserInfo] = useState({
    name: "",
    isSideNavBarOpened:
      Boolean(sessionStorage.getItem("sidebarOpened")) ?? true,
  });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    // setUserInfo({
    //   name: "",
    //   isSideNavBarOpened:
    //     Boolean(sessionStorage.getItem("sidebarOpened")) ?? true,
    // });
    setUserInfo((prevData) => {
      return {
        ...prevData,
        isSideNavBarOpened:
          Boolean(sessionStorage.getItem("sidebarOpened")) ?? true,
      };
    });
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { ThemeProvider };
