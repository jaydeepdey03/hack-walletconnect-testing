import {useContext} from "react";
import {GlobalContext} from "./GlobalContext";

export function useGlobalContextHook() {
  return useContext(GlobalContext);
}
