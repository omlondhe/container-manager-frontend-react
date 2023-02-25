import { HTMLInputTypeAttribute } from "react";
import "../styles/components/InputField.css";
import { MODE } from "../context/types";
import { useContextValue } from "../context/StateProvider";

interface InputFieldProps {
  id: string;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholderText: string;
  value: string;
  setValue: Function;
  required: boolean;
}

function InputField({
  id,
  name,
  type,
  placeholderText,
  setValue,
  value,
  required,
}: InputFieldProps) {
  const [{ mode }] = useContextValue();

  return (
    <div
      className={`inputField ${
        mode === MODE.light ? "inputField__light" : "inputField__dark"
      }`}
    >
      <div className="inputField__container">
        <label
          htmlFor={name}
          className={`inputField__placeholder ${
            mode === MODE.light
              ? "inputField__placeholder__light"
              : "inputField__placeholder__dark"
          }`}
        >
          <span
            className={`${"inputField__placeholder__text"}${
              value
                ? ` inputField__valued__input__placeholder ${
                    mode === MODE.light
                      ? "inputField__valued__input__placeholder__light"
                      : "inputField__valued__input__placeholder__dark"
                  }`
                : ""
            }`}
          >
            {placeholderText}
          </span>
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`inputField__input ${
              mode === MODE.light
                ? "inputField__input__light"
                : "inputField__input__dark"
            }`}
            required={required}
          />
        </label>
      </div>
    </div>
  );
}

export default InputField;
