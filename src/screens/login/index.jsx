import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TbLoader2 } from "react-icons/tb";
import Button from "../../components/button";
import InputCustom from "../../components/inputs";
import { Card } from "../../components/card";
import userAction from "../../redux/actions/userAction";

const Login = ({ user }) => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [password, setPassword] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    let emailVal = e.target.value.trim();
    if (emailVal === "") {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "Please enter your email address.",
      });
    } else if (
      !emailVal
        .trim()
        .charAt(0)
        .match(/[a-zA-Z/]/)
    ) {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "Email must start with a letter",
      });
    } else if (emailVal.charAt(emailVal.length - 4) === "@") {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "@ isn't used in last 4 charactor",
      });
    } else {
      setEmail({
        value: emailVal,
        isError: false,
        messageError: "",
      });
    }
  };

  const handlePassword = (e) => {
    let passwordVal = e.target.value;
    if (passwordVal === "") {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Please enter your password",
      });
    } else if (passwordVal.length < 6) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password should be greater than 6",
      });
    } else if (!passwordVal.match(/[a-zA-Z/]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Alphabats",
      });
    } else if (!passwordVal.match(/[0-9]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Numbers",
      });
    } else if (!passwordVal.match(/[!@#$%^&*]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Special Character",
      });
    } else {
      setPassword({
        value: passwordVal,
        isError: false,
        messageError: "",
      });
    }
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    let currentUser = "xyz";
    dispatch(userAction(currentUser));
    navigate("/", { replace: true });
    if (email.value === "") {
      setEmail({
        value: email.value,
        isError: true,
        messageError: "Please enter your email address",
      });
    }
    if (password.value === "") {
      setPassword({
        value: password.value,
        isError: true,
        messageError: "Please enter your password",
      });
    }

    if (email.value === "" || password.value === "") {
      return;
    }

    //validation cheeck
    if (!email.isError && !password.isError) {
      try {
        setLoader(true);
        const userCredential = await authSignIn(email.value, password.value);
        const user = userCredential.user;
        // dispatch(currentUserAction(user.uid));
        setLoader(false);
        setOpenModal(false);
        toast.success("Login successfully!", {
          autoClose: 1500,
        });
      } catch (err) {
        setLoader(false);
        toast.error(err.code, {
          autoClose: 1500,
        });
      }
    }
  };

  const handleCheckUser = () => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    handleCheckUser();
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-dark-100">
      <div className="flex flex-col items-center justify-center md:w-96 w-5/6 mx-auto h-screen">
        <Card>
          <div className="sm:p-9 p-6">
            <h2 className="text-center text-2xl font-bold pb-5 text-gray-700 dark:text-gray-200">
              Awesome
            </h2>
            <form className="">
              <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 pb-1">
                Welcome to Awesome! 👋
              </h4>
              <p className="text-gray-600 dark:text-gray-300 pb-5">
                Please sign-in to your account and start the adventure
              </p>
              <div>
                <label
                  id="email"
                  className="text-sm leading-none text-gray-600 dark:text-gray-300"
                >
                  Email
                </label>
                <InputCustom
                  type="email"
                  placeholder="Enter your email"
                  value={email.value}
                  isError={email.isError}
                  messageError={email.messageError}
                  onChange={handleEmail}
                />
              </div>
              <div className="mt-4  w-full">
                <label
                  htmlFor="pass"
                  className="text-sm leading-none text-gray-600 dark:text-gray-300"
                >
                  Password
                </label>
                <InputCustom
                  type="password"
                  placeholder="············"
                  value={password.value}
                  isError={password.isError}
                  messageError={password.messageError}
                  onChange={handlePassword}
                  autoComplete="off"
                />
              </div>
              <div className="mt-7 pb-1">
                {loader ? (
                  <Button
                    className="w-full justify-center"
                    disabled="disabled"
                    name={<TbLoader2 size="1.3rem" className="animate-spin" />}
                  />
                ) : (
                  <Button
                    name="Sign in"
                    className="w-full justify-center"
                    onClick={signInHandler}
                  />
                )}
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
