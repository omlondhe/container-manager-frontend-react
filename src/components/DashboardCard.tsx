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
  removeCard: Function;
}

function DashboardCard({
  data,
  index,
  setName,
  setCost,
  setWeight,
  removeCard,
}: DashboardCardProps) {
  const [{ mode }] = useContextValue();

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
        required={true}
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
          placeholder={`Cost`}
          type="number"
          value={data.cost}
          onChange={(e) => setCost(e.target.value, index)}
          required={true}
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
          placeholder={`Weight`}
          type="number"
          value={data.weight}
          onChange={(e) => setWeight(e.target.value, index)}
          required={true}
          className={`dashboardCard__input ${
            mode === MODE.light
              ? "dashboardCard__input__light"
              : "dashboardCard__input__dark"
          }`}
        />
      </div>
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
