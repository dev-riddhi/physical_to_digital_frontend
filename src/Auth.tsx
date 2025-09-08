import { useState } from "react";
import LoginView from "./pages/common/LoginView";
import SignupView from "./pages/common/SignupView";

export default function Auth() {
  const [login, setLogin] = useState(true);
  return (
    <>
      {login ? (
        <LoginView
          onChange={() => {
            setLogin(!login);
          }}
        />
      ) : (
        <SignupView />
      )}
    </>
  );
}
