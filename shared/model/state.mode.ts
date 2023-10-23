import { ILocationInfo } from "@/core/model/location.model";

export interface IState {
  cart: ICartData;
  location: ILocationInfo;
  loading: { isLoading: boolean };
}
