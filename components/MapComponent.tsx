/* eslint-disable react/jsx-props-no-spreading */

"use client";

import { resetCart } from "@/features/addToCart/addToCart";
import React, { useEffect, useState } from "react";
import Map, { Layer, NavigationControl, Source, useMap } from "react-map-gl";
import { useDispatch } from "react-redux";

function MapImage() {
  const { current: map } = useMap();

  if (!map?.hasImage("map-pin")) {
    map?.loadImage("/images/map_pin_red.png", (error, image) => {
      if (error) throw error;
      if (!map.hasImage("map-pin") && image)
        map.addImage("map-pin", image, { sdf: true });
    });
  }

  return null;
}

function MapComponent({ restaurantCoords, userCoords, isFromSuccess }: any) {
  const dispatch = useDispatch();
  const [directionCoords, setDirectionCoords] = useState<any>([]);

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
      "line-width": 8
    }
  };

  const lineStyleStartPoint: any = {
    id: "start",
    type: "symbol",
    layout: {
      "icon-image": "map-pin",
      "icon-size": 0.4,
      "icon-offset": [0, -20],
      "icon-allow-overlap": true
    }
  };

  const lineStyleEndpoint: any = {
    id: "end",
    type: "symbol",
    layout: {
      "icon-image": "map-pin",
      "icon-size": 0.4,
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
            zoom: 14
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
          <Source id="geojsonEndpoint" type="geojson" data={endpoint}>
            <Layer {...lineStyleEndpoint} />
          </Source>
          <NavigationControl />
          <MapImage />
        </Map>
      )}
    </>
  );
}

export default MapComponent;
