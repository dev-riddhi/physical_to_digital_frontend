import { useState } from "react";
import LoginView from "./LoginView";
import SignupView from "./SignupView";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface Auth {
  onAuth: () => void;
}

export default function Auth({ onAuth }: Auth) {
  const [login, setLogin] = useState(true);

  const apiUrl: string = import.meta.env.VITE_API_URL;

  const handleLogin = (data: LoginData) => {
    fetch(apiUrl + "/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data) {
          console.log(json);
          localStorage.setItem("access_token", json.data.access_token);
          localStorage.setItem("user_type", json.data.user_type);
          onAuth();
        }
      })
      .catch(() => {
        console.error("login error");
      });
  };
  const handleSignup = (data: SignupData) => {
    fetch(apiUrl + "/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data) {
          localStorage.setItem("access_token", json.data.access_token);
          localStorage.setItem("user_type", json.data.user_type);
          onAuth();
        }
      })
      .catch(() => {
        console.error("login error");
      });
  };

  const hanleGuestRegister = () => {
    fetch(apiUrl + "/guest/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data) {
          localStorage.setItem("access_token", json.data.access_token);
          localStorage.setItem("user_type", json.data.user_type);
          onAuth();
        }
      })
      .catch(() => {
        console.error("login error");
      });
  };

  return (
    <>
      {login ? (
        <LoginView
          onChange={() => {
            setLogin(!login);
          }}
          onSubmit={handleLogin}
        />
      ) : (
        <SignupView
          onGuestRegister={hanleGuestRegister}
          onChange={() => {
            setLogin(!login);
          }}
          onSubmit={handleSignup}
        />
      )}
    </>
  );
}
