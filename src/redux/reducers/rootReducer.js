import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import customerReducer from "./customerReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import itemOrderReducer from "./itemOrderReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    cus: customerReducer,
    product: productReducer,
    order: orderReducer,
    itemOrder: itemOrderReducer,
});

export default rootReducer;
