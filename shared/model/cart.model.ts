interface ICartContext {
  CartData: ICartData;
  SetCartData: React.Dispatch<React.SetStateAction<ICartData>>;
}
interface ICartData {
  RestaurantDetails?: ICartRestaurantDetails | null;
  Items: ICartItems[];
}
interface ICartRestaurantDetails {
  RestaurantId: string;
  RestaurantImage: string;
  RestaurantName: string;
  RestaurantLocation: string;
}
interface ICartItems {
  ItemId: string;
  IsVeg: boolean;
  ItemName: string;
  Quantity: number;
  Price: number;
  Total: number;
}

interface ICartTotalContext {
  CartTotal: number;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
}
