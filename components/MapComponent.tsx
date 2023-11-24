/* eslint-disable react/jsx-props-no-spreading */

"use client";

import { resetCart } from "@/features/addToCart/addToCart";
import React, { useEffect, useState } from "react";
import Map, { Layer, NavigationControl, Source, useMap } from "react-map-gl";
import { useDispatch } from "react-redux";

function MapImageRed() {
  const { current: map } = useMap();

  if (!map?.hasImage("map-pin-red")) {
    map?.loadImage("/images/map_pin_red.png", (error, image) => {
      if (error) throw error;
      if (!map.hasImage("map-pin-red") && image)
        map.addImage("map-pin-red", image, { sdf: false });
    });
  }

  return null;
}

function MapImageGreen() {
  const { current: map } = useMap();

  if (!map?.hasImage("map-pin-green")) {
    map?.loadImage("/images/map_pin_green.png", (error, image) => {
      if (error) throw error;
      if (!map.hasImage("map-pin-green") && image)
        map.addImage("map-pin-green", image, { sdf: false });
    });
  }

  return null;
}

function DeliveryManImage() {
  const { current: map } = useMap();

  if (!map?.hasImage("delivery-man")) {
    map?.loadImage("/images/delivery_man.png", (error, image) => {
      if (error) throw error;
      if (!map.hasImage("delivery-man") && image)
        map.addImage("delivery-man", image, { sdf: false });
    });
  }

  return null;
}

function MapComponent({ restaurantCoords, userCoords, isFromSuccess }: any) {
  const dispatch = useDispatch();
  const [directionCoords, setDirectionCoords] = useState<any>([]);
  const [deliveryManCoord, setDeliveryManCoord] = useState<number>(0);

  const geojson: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "LineString",
          coordinates: directionCoords
        }
      }
    ]
  };

  const startPoint: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "Point",
          coordinates: directionCoords[0]
        }
      }
    ]
  };

  const endpoint: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "Point",
          coordinates: directionCoords[directionCoords.length - 1]
        }
      }
    ]
  };

  const deliveryManPoint: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "Point",
          coordinates: isFromSuccess
            ? directionCoords[deliveryManCoord]
            : directionCoords[directionCoords.length - 1]
        }
      }
    ]
  };

  const lineStyle: any = {
    id: "lineStyle",
    type: "line",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#006EB3",
      "line-opacity": 0.6,
      "line-width": 6
    }
  };

  const lineStyleStartPoint: any = {
    id: "start",
    type: "symbol",
    layout: {
      "icon-image": "map-pin-red",
      "icon-size": 0.3,
      "icon-offset": [0, -20],
      "icon-allow-overlap": true
    }
  };

  const lineStyleEndpoint: any = {
    id: "end",
    type: "symbol",
    layout: {
      "icon-image": "map-pin-green",
      "icon-size": 0.3,
      "icon-offset": [0, -20],
      "icon-allow-overlap": true
    }
  };

  const lineStyleDeliveryMan: any = {
    id: "deliveryMan",
    type: "symbol",
    layout: {
      "icon-image": "delivery-man",
      "icon-size": 0.06,
      "icon-offset": [0, -20],
      "icon-allow-overlap": true
    }
  };

  const getRoutes = async () => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${
        restaurantCoords.lng
      },${
        restaurantCoords.lat
      };${userCoords.lng.toString()},${userCoords.lat.toString()}?geometries=geojson&access_token=pk.eyJ1IjoieWFzaW5oaXJhbmkiLCJhIjoiY2xwMHQxcndvMGZsZDJpbmxsdzB3MjFycyJ9.TC9JHMcPwo-dkuo2v46Dpg`
    );
    const data = await response.json();
    setDirectionCoords(data.routes[0].geometry.coordinates);
  };

  if (directionCoords.length > 0 && isFromSuccess) {
    const deliveryManTimeOut = setTimeout(() => {
      if (deliveryManCoord < directionCoords.length - 1) {
        setDeliveryManCoord((prev: number) => prev + 1);
      } else {
        clearTimeout(deliveryManTimeOut);
      }
    }, 5000);
  }

  useEffect(() => {
    if (restaurantCoords && userCoords) {
      getRoutes();
      if (isFromSuccess) {
        dispatch(resetCart());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantCoords, userCoords]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {restaurantCoords && userCoords && (
        <Map
          mapboxAccessToken="pk.eyJ1IjoieWFzaW5oaXJhbmkiLCJhIjoiY2xwMHQxcndvMGZsZDJpbmxsdzB3MjFycyJ9.TC9JHMcPwo-dkuo2v46Dpg"
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          initialViewState={{
            longitude: restaurantCoords.lng ?? "",
            latitude: restaurantCoords.lat ?? "",
            zoom: 15
          }}
          style={{
            width: "100%",
            height: 400,
            marginTop: "40px",
            marginBottom: "40px"
          }}
        >
          <Source id="geojson" type="geojson" data={geojson}>
            <Layer {...lineStyle} />
          </Source>
          <Source id="geojsonStartPoint" type="geojson" data={startPoint}>
            <Layer {...lineStyleStartPoint} />
          </Source>
          <Source
            id="geojsonDeliveryMan"
            type="geojson"
            data={deliveryManPoint}
          >
            <Layer {...lineStyleDeliveryMan} />
          </Source>
          <Source id="geojsonEndpoint" type="geojson" data={endpoint}>
            <Layer {...lineStyleEndpoint} />
          </Source>
          <NavigationControl />
          <MapImageRed />
          <MapImageGreen />
          <DeliveryManImage />
        </Map>
      )}
    </>
  );
}

export default MapComponent;
