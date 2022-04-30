import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: prevState.value, isValid: prevState.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailSate, emailDispatcher] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, passwordDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("CHECK FORM VALIDITY");
      setFormIsValid(emailSate.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
      console.log("CLEANUP!");
    };
  }, [emailSate.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    emailDispatcher({ type: "USER_INPUT", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatcher({ type: "USER_INPUT", payload: event.target.value });
  };

  const validateEmailHandler = () => {
    emailDispatcher({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    passwordDispatcher({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailSate.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailSate.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailSate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
