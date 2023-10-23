export interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
export interface IGeometry {
  location: ILocation;
  location_type: string;
  viewport: IViewport;
}
export interface ILocation {
  lat: number;
  lng: number;
}
export interface IViewport {
  northeast: ILocation;
  southwest: ILocation;
}
export interface ILocationInfo {
  formatted_address: string;
  address_components: IAddressComponent[];
  place_id: string;
  geometry: IGeometry;
  types: string[];
  place_type: string;
}
