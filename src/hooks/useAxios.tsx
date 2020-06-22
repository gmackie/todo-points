import { makeUseAxios } from "axios-hooks";
import Axios from "axios";
import { useAuthToken } from "../contexts/AuthTokenContext";

export default function useAxios() {
  const token = useAuthToken();
  return makeUseAxios({
    axios: Axios.create({
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  })
}