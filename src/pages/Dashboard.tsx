import jwtDecode from "jwt-decode";
import { actionTypes } from "../context/reducer";
import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useContextValue } from "../context/StateProvider";
import DashboardCard from "../components/DashboardCard";
import { CalculationTypes, DataType } from "../utils/types";
import "../styles/pages/Dashboard.css";
import Space from "../components/Space";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MODE } from "../context/types";
import Dialog from "../components/Dialog";
import { getDomain } from "../utils/devdetector";

function Dashboard() {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [dataLength, setDataLength] = useState<number>(0);
  const [{ user, mode }, dispatch] = useContextValue();
  const [weight, setWeight] = useState<number>(0);
  const [data, setData] = useState<DataType[]>([]);
  const [responseData, setResponseData] = useState<CalculationTypes>();
  const [openCalculationDialog, setOpenCalculationDialog] =
    useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      const localStorageUser = localStorage.getItem(`user`);
      if (localStorageUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: {
            ...jwtDecode(localStorageUser),
            token: localStorageUser,
          },
        });
      } else navigate(`/auth/login`, { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (dataLength < data.length) {
      (itemRef as MutableRefObject<HTMLDivElement>).current.scrollTo({
        behavior: "smooth",
        left: 0,
        top: itemRef.current?.scrollHeight,
      });
    }
    setDataLength(data.length);
  }, [data]);

  function setItemName(name: string, index: number) {
    data[index].name = name;
    setData([...data]);
  }
  function setItemCost(cost: string, index: number) {
    data[index].cost = Number(cost);
    setData([...data]);
  }
  function setItemWeight(weight: string, index: number) {
    data[index].weight = Number(weight);
    setData([...data]);
  }

  function setItemQuantity(quantity: string, index: number) {
    data[index].quantity = Number(quantity);
    setData([...data]);
  }

  function addItem() {
    data.push(new DataType());
    setData([...data]);
  }

  function removeCard(index: number) {
    data.splice(index, 1);
    setData([...data]);
  }

  async function calculate(e: FormEvent) {
    e.preventDefault();
    try {
      const names: string[] = [];
      const costs: number[] = [];
      const weights: number[] = [];
      data.forEach((d) => {
        for (let i = 0; i < d.quantity; i++) {
          names.push(d.name);
          costs.push(d.cost);
          weights.push(d.weight);
        }
      });
      const response = await axios.post(`/api/calculate`, {
        weight,
        names,
        costs,
        weights,
        token: user?.token,
      });
      setResponseData(response.data);
      setOpenCalculationDialog(true);
    } catch (error) {
      toast(
        `${((error as AxiosError).response?.data as { error: string }).error}`,
        { type: "error" }
      );
      console.log((error as AxiosError).response?.data);
    }
  }

  return (
    <form
      className={`dashboard ${
        mode === MODE.light ? "dashboard__light" : "dashboard__dark"
      }`}
    >
      <Space height={100} />
      <Dialog
        open={openCalculationDialog}
        setOpen={setOpenCalculationDialog}
        responseData={responseData}
        user={user}
      />
      <input
        id={`weight`}
        name={`weight`}
        placeholder={`Weight capacity`}
        type="number"
        pattern="[0-9]"
        value={weight}
        min={0}
        onChange={(e) => setWeight(Number(e.target.value))}
        required={true}
        className={`dashboard__input ${
          mode === MODE.light
            ? "dashboard__input__light"
            : "dashboard__input__dark"
        }`}
      />
      <div className="dashboard__cards" ref={itemRef}>
        {data?.map((d, index) => (
          <DashboardCard
            key={index}
            index={index}
            data={d}
            setName={setItemName}
            setCost={setItemCost}
            setWeight={setItemWeight}
            setQuantity={setItemQuantity}
            removeCard={removeCard}
          />
        ))}
      </div>
      <button onClick={addItem} className="dashboard__button" type="button">
        Add an item
      </button>
      <Space height={7} />
      <button
        onClick={calculate}
        className="dashboard__button dashboard__button__submit"
        type="submit"
      >
        Calculate
      </button>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode === MODE.light ? "light" : "dark"}
      />
    </form>
  );
}

export default Dashboard;
