declare module "nativescript-custom-google-maps-utils" {
  import { MapView, Position, Marker } from "nativescript-google-maps-sdk";

  export function setupMarkerCluster(mapView: MapView, markers: Array<Marker>): void;
}
