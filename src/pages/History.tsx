import { SyntheticEvent, useEffect, useState } from "react";
import "../styles/pages/History.css";
import axios from "axios";
import { CalculationTypes } from "../utils/types";
import { useContextValue } from "../context/StateProvider";
import HistoryItem from "../components/HistoryItem";
import { actionTypes } from "../context/reducer";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { MODE } from "../context/types";
import { getDomain } from "../utils/devdetector";

function History() {
  const navigate = useNavigate();
  const [{ user, mode }, dispatch] = useContextValue();
  const [responseDataList, setResponseDataList] = useState<CalculationTypes[]>(
    []
  );
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpansion =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
    } else {
      axios
        .get(`/api/get-calculations?email=${user?.email}`)
        .then((response) => setResponseDataList(response.data))
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <div
      className={`history ${
        mode === MODE.light ? "history__light" : "history__dark"
      }`}
    >
      {responseDataList.map((responseData, index) => (
        <HistoryItem
          index={index}
          responseData={responseData}
          expanded={expanded}
          handleExpansion={handleExpansion}
        />
      ))}
    </div>
  );
}

export default History;
