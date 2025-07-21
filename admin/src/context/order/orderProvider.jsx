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
      case "UpdateOrderStatus":
        return {
          ...state,
          orders: state.orders.map((order) => {
            if (order._id === action.payload._id) {
              return {
                ...order,
                status: action.payload.status,
                tracking_number:
                  action.payload.tracking_number ?? order.tracking_number,
              };
            }
            return order;
          }),
        };

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
