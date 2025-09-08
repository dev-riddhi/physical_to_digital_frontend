import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import User from "./pages/user/User";
import Loading from "./Loading";
import Admin from "./pages/admin/Admin";
import Guest from "./pages/guest/Guest";

export default function App() {
  const apiUrl = "http://127.0.0.1:8000/api";

  type AccessInterfaceType = "auth" | "user" | "guest" | "admin";

  const [accessToken, setAccessToken] = useState("");

  let accessInterfaceType: AccessInterfaceType = "auth";

  const [appInterface, setAppInterface] = useState<React.ReactNode>(
    <Loading />
  );

  async function initAuthCall() {
    fetch(apiUrl + "/refresh/access", {
      method: "post",
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.data) {
          if (json.data.user_type == "admin") {
            setAccessToken(json.data.access_token);
            accessInterfaceType = "admin";
          } else if (json.data.user_type == "user") {
            setAccessToken(json.data.access_token);
            accessInterfaceType = "user";
          } else if (json.data.user_type == "guest") {
            setAccessToken(json.data.access_token);
            accessInterfaceType = "guest";
          }
        }
      });
  }

  useEffect(() => {
    initAuthCall().then(() => {
      if (accessInterfaceType == "guest") {
        setAppInterface(<Guest />);
      } else if (accessInterfaceType == "user") {
        setAppInterface(<User />);
      } else if (accessInterfaceType == "admin") {
        setAppInterface(<Admin />);
      } else if (accessInterfaceType == "auth") {
        setAppInterface(<Auth />);
      } else {
        setAppInterface(<Auth />);
      }
    });
  });

  return appInterface;
}
