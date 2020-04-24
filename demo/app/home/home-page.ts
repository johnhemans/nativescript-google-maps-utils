/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { HomeViewModel } from "./home-view-model";

import { Marker, Position } from "nativescript-google-maps-sdk";

import * as GoogleMapsUtils from "nativescript-custom-google-maps-utils"

import data from '../data/bars.json';

export function onMapReady(args) {
    const mapView = args.object;

    const markers = data.map(bar => {
        const marker = new Marker();
        marker.position = Position.positionFromLatLng(bar.latitude, bar.longitude);
        marker.title = bar.name;
        return marker;
    })

    GoogleMapsUtils.setupMarkerCluster(mapView, markers);
}

export function onMarkerSelect(args) {
    console.log("Clicked on " +args.marker.title);
}

export function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera));
}

export function onCameraMove(args) {
    console.log("Camera moving: "+JSON.stringify(args.camera));
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;

    page.bindingContext = new HomeViewModel();
}
