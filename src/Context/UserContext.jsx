import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
export default function UserContextProvider(props) {
  const [UserLogin, setUserLogin] = useState(null);
  const [userIdLogin, setUserIdLogin] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
    }
  }, [localStorage.getItem("userToken")]);

  return (
    <UserContext.Provider
      value={{ UserLogin, setUserLogin, userIdLogin, setUserIdLogin }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
