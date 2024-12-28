import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
export default function UserContextProvider(props) {
  const [UserLogin, setUserLogin] = useState(null);
  const [userIdLogin, setUserIdLogin] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserLogin(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ UserLogin, setUserLogin, userIdLogin, setUserIdLogin }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
