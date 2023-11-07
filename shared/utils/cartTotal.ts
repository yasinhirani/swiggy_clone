const cartTotal = (cartItems: ICartData) => {
  return cartItems.Items.reduce((acc, item) => acc + item.Total, 0);
};
export default cartTotal;
