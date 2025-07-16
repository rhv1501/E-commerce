import { useReducer } from "react";
import { OrderContext } from "./orderContext";

const OrderProvider = ({ children }) => {
  const Initial = {
    orders: [],
  };

  const Orderreducer = (state, action) => {
    switch (action.type) {
      case "GetOrders":
        return { ...state, orders: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(Orderreducer, Initial);

  return (
    <OrderContext.Provider value={{ orders: state.orders, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;
