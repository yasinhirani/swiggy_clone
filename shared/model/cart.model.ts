// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
interface ICartData {
  RestaurantDetails?: ICartRestaurantDetails | null;
  Items: ICartItems[];
}
interface ICartRestaurantDetails {
  RestaurantId: string;
  RestaurantImage: string;
  RestaurantName: string;
  RestaurantLocation: string;
  RestaurantGeometry: {
    lat: number;
    lng: number;
  };
}
interface ICartItems {
  ItemId: string;
  IsVeg: boolean;
  ItemName: string;
  Quantity: number;
  Price: number;
  Total: number;
}
interface IOrders {
  orderId: string;
  orderDetails: ICartData;
  userLocation: {
    lat: number;
    lng: number;
  };
}
