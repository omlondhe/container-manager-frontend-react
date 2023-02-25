import { useContextValue } from "../context/StateProvider";
import { MODE } from "../context/types";
import "../styles/components/FormButton.css";

interface FormButtonProps {
  value: string;
}

function FormButton({ value }: FormButtonProps) {
  const [{ mode }] = useContextValue();
  return (
    <input
      type="submit"
      value={value}
      className={`formButton ${
        mode === MODE.light ? "formButton__light" : "formButton__dark"
      }`}
    />
  );
}

export default FormButton;
