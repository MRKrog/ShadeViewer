import { combineReducers } from "redux";

import { loadingReducer } from "./loadingReducer";
import { shadeReducer } from "./shadeReducer";
import { variantReducer } from "./variantReducer";

export const rootReducer = combineReducers({
  loading: loadingReducer,
  variant: variantReducer,
  shadeState: shadeReducer,
})
