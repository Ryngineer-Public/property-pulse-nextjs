"use client";

import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geoCodingError, setGeoCodingError] = useState(null);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "US",
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!property || !property.location) {
        setGeoCodingError("Property location is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fromAddress(
          `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`
        );
        if (response.results && response.results.length > 0) {
          const { lat, lng } = response.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
          setViewport((viewport) => ({
            ...viewport,
            latitude: lat,
            longitude: lng,
          }));
        } else {
          setGeoCodingError(true);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setGeoCodingError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (geoCodingError) {
    return (
      <div>
        Error fetching map coordinates. Please check the property location.
      </div>
    );
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{
          width: "100%",
          height: "500px",
        }}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 10,
        }}
      >
        <Marker
          latitude={lat}
          longitude={lng}
          anchor="bottom"
          offsetLeft={-20}
          offsetTop={-40}
        >
          <Image
            src={pin}
            alt="Property Location"
            style={{ width: "40px", height: "40px" }}
            width={40}
            height={40}
          />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
