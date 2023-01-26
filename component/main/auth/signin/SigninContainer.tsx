import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Signin, handlers } from ".";
// import validateInput from "@utils/validator";
import { sleep } from "@utils/handlers";
import { setAuthAction } from "@store/actions";
import Router from "next/router";
import validateInput from "@utils/validator";
// import { any, any } from "@interface/components/siginin-interface";

// import { logoutAction } from "@store/actions";

const SigninContainer = (props: any) => {
  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({
    showPassword: false,
    buttonLoading: false,
    email: "",
    password: "",
    // email: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_EMAIL as string) : "",
    // password: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_PASSWORD as string) : "",
  });

  const [formError, setFormError] = useState<any>({
    // STATUS: valid, invalid, loading
    email: { status: "invalid", pristine: true, message: "Email cannot be empty" },
    password: { status: "invalid", pristine: true, message: "Password cannot be empty" },
  });

  const signinFormMouseMoveCapture = handlers.signinFormMouseMoveCapture;
  const loginHandler = () => handlers.loginHandler({ setValues, values });
  const onBlurHandler = handlers.onBlurHandler;
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange(e, setValues, setFormError);
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });

  return <Signin {...{ signinFormMouseMoveCapture, onInputChange, handleClickShowPassword, values, formError, loginHandler, onBlurHandler }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = {
    //
    // logoutAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
