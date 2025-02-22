import Order from "../models/order.model";
const placeorderfromcart = async (req, res) => {
  const user = req.verifieduser;
  const cart = user.cart;
  if (cart.length === 0) {
    res.status(400).json({ message: "Cart is empty" });
    return;
  }
  const { shiipingaddress, city, postalcode, country } = req.body;
};

export { placeorderfromcart };
