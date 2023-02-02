import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

// e: React.FocusEvent<HTMLInputElement>, setValues: Function, setFormStatus: Function)
export const onInputChange = async ({ e, setValues, setFormStatus, setCurrentError }: any) => {
  const { value, id } = e.target;

  setValues((values: any) => ({ ...values, [id]: value }));
  setFormStatus((values: any) => ({ ...values, [id]: { ...values[id], pristine: false, status: "loading" } })); // <= set component state to loading
  try {
    validator({ value, type: id, label: id === "email" ? "Email Address" : null });

    if (id === "email") {
      setFormStatus((values: any) => ({ ...values, [id]: { status: "loading", pristine: false, message: null } }));

      await fetcher({ api: "app", endpoint: "/profiles/emailTaken", method: "POST", payload: { email: value } })
        .then(async ({ payload: { emailTaken } }) => {
          await sleep(0.5);
          setFormStatus((values: any) => ({
            ...values,
            [id]: { status: emailTaken ? "invalid" : "valid", pristine: false, message: emailTaken ? "Email already in use" : null },
          }));
          setCurrentError(emailTaken ? "Email already in use" : null);
        })
        .catch(() => {
          setFormStatus((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: "Unable to validate mail" } }));
          setCurrentError("Unable to validate mail");
        });
    } else {
      setCurrentError(null);
      setFormStatus((values: any) => ({ ...values, [id]: { status: "valid", pristine: false, message: null } }));
    }
  } catch ({ message }) {
    setCurrentError(message);
    setFormStatus((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: message } }));
  }
};

export const registerHandler = async ({ setValues, values, formStatus, enqueueSnackbar }: any) => {
  // try {
  // const { email, handle, password, fullName } = values;
  // console.log(values);

  // const response = await fetcher({
  //   api: "app",
  //   endpoint: "/profiles/emailTaken",
  //   method: "POST",
  //   payload: { email, handle, password, fullName },
  // });

  const formErrorArray = Object.values(formStatus);

  const notPristineAndValid = formErrorArray.every((x: any) => !x.pristine || x.status === "valid");

  console.log(notPristineAndValid);

  // setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

  if (notPristineAndValid) {
    const { email, password } = values;

    // setValues((values: any) => ({ ...values, buttonLoading: false, accountCreated: true })); // deactivate botton loading

    // http://app-api.localhost:5000/profiles/emailTaken
    //  accountCreated: true
  } else {
    const invalidEntry = formErrorArray.filter((x) => x.message)[0]["message"]; // ? cannot return undefined since it's notPristineAndValid

    // Inform user of regex error
    enqueueSnackbar(invalidEntry, { variant: "error" });
    await sleep(0.2);
    setValues((values: any) => ({ ...values, buttonLoading: false })); // deactivate botton loading
  }
  // } catch (error: any) {
  //   console.log(error.message);
  // }
};
