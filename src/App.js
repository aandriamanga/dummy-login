import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <main>
        {!authCtx.isLoggedIn && <Login />}
        {authCtx.isLoggedIn && <Home />}
      </main>
      <MainHeader
        isAuthenticated={authCtx.isLoggedIn}
        onLogout={authCtx.logoutHandler}
      />
    </React.Fragment>
  );
}

export default App;
