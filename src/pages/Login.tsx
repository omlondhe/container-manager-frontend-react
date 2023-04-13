import { FormEvent, useState } from "react";
import "../styles/pages/Login.css";
import InputField from "../components/InputField";
import Space from "../components/Space";
import FormButton from "../components/FormButton";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useContextValue } from "../context/StateProvider";
import { MODE } from "../context/types";
import { getDomain } from "../utils/devdetector";

function Login() {
  const navigate = useNavigate();
  const [{ mode }] = useContextValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useOutletContext<{ showToast: Function }>();

  async function handleLogIn(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.get(
        `/api/auth/check-if-email-exist?email=${email}`
      );

      if (response.data.emailExist) {
        try {
          const response = await axios.post(`/api/auth/login`, {
            email,
            password,
          });
          const data = response.data;
          localStorage.setItem("user", data.user);
          navigate("/dashboard");
        } catch (error) {
          showToast("Wrong password!", "error");
        }
      } else showToast("Email does not exist, try signing up!", "error");
    } catch (error) {
      showToast("Internal server error.", "error");
      console.log(error);
    }
  }

  return (
    <form className="login" onSubmit={handleLogIn}>
      <p
        className={`login__title ${
          mode === MODE.light ? "login__title__light" : "login__title__dark"
        }`}
      >
        Log in
      </p>
      <Space height={21} />
      <InputField
        id={"email"}
        name={"email"}
        type="email"
        placeholderText={"Email"}
        value={email}
        setValue={setEmail}
        required={true}
      />
      <Space height={21} />
      <InputField
        id={"password"}
        name={"password"}
        type="password"
        placeholderText={"Password"}
        value={password}
        setValue={setPassword}
        required={true}
      />
      <Space height={21} />
      <FormButton value="Log in" />
    </form>
  );
}

export default Login;
