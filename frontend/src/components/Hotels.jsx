import { Hotel } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-map-gl";

function Hotels(props) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const handleAttractionClick = (id, lat, long) => {
    setCurrentHotel(id);
    props.setViewport({ ...props.viewport, latitude: lat, longitude: long });
  };
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const getHotels = async () => {
      try {
        const allHotels = await axios.get("/guesthouses");
        console.log({ allHotels });
        setHotels(allHotels?.data[0]?.features);
      } catch (err) {
        alert(err);
      }
    };
    getHotels();
  }, []);
  return (
    <div>
      {hotels.map((hotel) => {
        return (
          <>
            <Marker
              longitude={hotel.geometry.coordinates[0]}
              latitude={hotel.geometry.coordinates[1]}
            >
              <Hotel
                style={{
                  cursor: "pointer",
                  fontSize: 1 * props.viewport.zoom,
                  color: "brown",
                }}
                onClick={() =>
                  handleAttractionClick(
                    hotel.properties.full_id,
                    hotel.geometry.coordinates[1],
                    hotel.geometry.coordinates[0]
                  )
                }
              />
              {/* <p className="place">{attraction.properties.name}</p> */}
            </Marker>
            {hotel.properties.full_id === currentHotel && (
              <Popup
                key={hotel.properties.full_id}
                latitude={hotel.geometry.coordinates[1]}
                longitude={hotel.geometry.coordinates[0]}
                closeButton={true}
                closeOnClick={false}
                anchor="right"
                dynamicPosition={true}
                onClose={() => {
                  setCurrentHotel(null);
                }}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{hotel.properties.name}</h4>
                  <label>Phone</label>
                  <p className="desc">{hotel.properties?.phone ?? "N/A"}</p>
                  <label>Website</label>
                  <div className="stars">
                    <p>{hotel?.properties?.website ?? "N/A"}</p>
                  </div>
                </div>
              </Popup>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Hotels;
