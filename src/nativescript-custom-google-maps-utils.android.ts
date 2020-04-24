import * as utils from "tns-core-modules/utils/utils";

import { MapView, Marker, Position } from "nativescript-google-maps-sdk"

const ClusterItem = com.google.maps.android.clustering.ClusterItem;
const ClusterManager = com.google.maps.android.clustering.ClusterManager;
const DefaultClusterRenderer = com.google.maps.android.clustering.view.DefaultClusterRenderer;

class CustomClusterItem extends com.google.maps.android.clustering.ClusterItem {
  public marker: Marker | null // will be attached manually later

  constructor() {
    super();
    return global.__native(this);
  }

  getMarker () {
    return this.marker;
  }

  getPosition () {
    return this.marker.position.android;
  }

  getTitle () {
    return this.marker.title;
  }

  getSnippet () {
    return this.marker.snippet;
  }
}

export function setupMarkerCluster(mapView: MapView, markers: Array<Marker>) {
  const clusterManager = new ClusterManager(utils.ad.getApplicationContext(), mapView.gMap);

  mapView.gMap.setOnCameraIdleListener(clusterManager);
  mapView.gMap.setOnMarkerClickListener(clusterManager);

  markers.forEach(marker => {
    const clusterItem = new CustomClusterItem();
    clusterItem.marker = marker;
    clusterManager.addItem(clusterItem);
  })

  clusterManager.cluster();
}