import { IconButton } from "@mui/material";
import "../styles/components/DashboardCard.css";
import { DataType } from "../utils/types";
import Space from "./Space";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { MODE } from "../context/types";
import { useContextValue } from "../context/StateProvider";

interface DashboardCardProps {
  data: DataType;
  index: number;
  setName: Function;
  setCost: Function;
  setWeight: Function;
  setQuantity: Function;
  removeCard: Function;
}

function DashboardCard({
  data,
  index,
  setName,
  setCost,
  setWeight,
  setQuantity,
  removeCard,
}: DashboardCardProps) {
  const [{ mode }] = useContextValue();

  if (data.quantity === 0) removeCard(index);

  return (
    <div
      className={`dashboardCard ${
        mode === MODE.light ? "dashboardCard__light" : "dashboardCard__dark"
      }`}
    >
      <input
        id={`${index}1`}
        name={`${index}1`}
        placeholder={`Name`}
        type="text"
        value={data.name}
        onChange={(e) => setName(e.target.value, index)}
        className={`dashboardCard__input ${
          mode === MODE.light
            ? "dashboardCard__input__light"
            : "dashboardCard__input__dark"
        }`}
      />
      <Space height={11} />
      <div className="dashboardCard__subSection">
        <input
          id={`${index}2`}
          name={`${index}2`}
          placeholder={`Cost (required)`}
          type="number"
          value={data.cost}
          onChange={(e) => setCost(e.target.value, index)}
          required={true}
          min={0}
          pattern="[0-9]"
          className={`dashboardCard__input ${
            mode === MODE.light
              ? "dashboardCard__input__light"
              : "dashboardCard__input__dark"
          }`}
        />
        <Space width={11} />
        <input
          id={`${index}3`}
          name={`${index}3`}
          placeholder={`Weight (required)`}
          type="number"
          value={data.weight}
          min={0}
          onChange={(e) => setWeight(e.target.value, index)}
          required={true}
          pattern="[0-9]"
          className={`dashboardCard__input ${
            mode === MODE.light
              ? "dashboardCard__input__light"
              : "dashboardCard__input__dark"
          }`}
        />
      </div>
      <Space height={21} />
      <input
        id={`${index}4`}
        name={`${index}4`}
        placeholder={`Quantity (required)`}
        type="number"
        min={1}
        value={data.quantity}
        onChange={(e) => setQuantity(e.target.value, index)}
        required={true}
        pattern="[0-9]"
        className={`dashboardCard__input ${
          mode === MODE.light
            ? "dashboardCard__input__light"
            : "dashboardCard__input__dark"
        }`}
      />
      <Space height={21} />
      <div
        className={`dashboardCard__bottom ${
          mode === MODE.light
            ? "dashboardCard__bottom__light"
            : "dashboardCard__bottom__dark"
        }`}
      >
        <p className="dashboardCard__bottom__title">
          {data.name ? data.name : `Item ${index + 1}`}
        </p>
        <IconButton onClick={() => removeCard(index)}>
          <RemoveIcon color="error" />
        </IconButton>
      </div>
    </div>
  );
}

export default DashboardCard;
