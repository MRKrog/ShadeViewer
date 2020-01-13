import { combineReducers } from "redux";

import { loadingReducer } from "./loadingReducer";
import { shadeReducer } from "./shadeReducer";
import { variantReducer } from "./variantReducer";
import { engineReducer } from "./engineReducer";

export const rootReducer = combineReducers({
  loading: loadingReducer,
  variant: variantReducer,
  shadeState: shadeReducer,
  engine: engineReducer,
})
