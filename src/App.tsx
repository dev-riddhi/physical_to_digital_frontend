import { useState } from "react";
import Loading from "./pages/common/Loading";
import Guest from "./pages/guest/Guest";
// import Auth from "./pages/common/Auth";
// import User from "./pages/user/User";
// import Admin from "./pages/admin/Admin";

let isLoading = true;

export default function App() {
  const [webIntrface, setWebInterface] = useState(<Loading />);
  // const apiUrl = import.meta.env.VITE_API_URL;

  // const [accessToken, setAccessToken] = useState<string>(
  //   localStorage.getItem("access_token") ?? ""
  // );

  // const handleAuth = () => {
  //   if (localStorage.getItem("access_token")?.trim() != "") {
  //     setAccessToken(localStorage.getItem("access_token") ?? "");
  //   }
  // };

  // const handleAccess = () => {
  //   fetch(apiUrl + "/access", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Token": localStorage.getItem("access_token") ?? "",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       if (json.data)
  //         localStorage.setItem("access_token", json.data.access_token);
  //     })
  //     .catch(() => {
  //       localStorage.setItem("access_token", "");
  //     });
  // };

  // if (accessToken == undefined || accessToken == "") {
  //   return <Auth onAuth={handleAuth} />;
  // }

  // handleAccess();

  // if (localStorage.getItem("user_type") == "guest") {
  //   return <Guest />;
  // } else if (localStorage.getItem("user_type") == "user") {
  //   return <User />;
  // } else if (localStorage.getItem("user_type") == "admin") {
  //   return <Admin />;
  // }

  if (isLoading) {
    setTimeout(() => {
      isLoading = false;
      setWebInterface(<Guest />);
    }, 500);
  }

  console.log("app");

  return webIntrface;
}
