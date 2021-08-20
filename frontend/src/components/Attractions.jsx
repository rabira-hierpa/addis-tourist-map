import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";

function Attractions(props) {
  const [currentAttraction, setCurrentAttraction] = useState(null);
  const handleAttractionClick = (id, lat, long) => {
    setCurrentAttraction(id);
    props.setViewport({ ...props.viewport, latitude: lat, longitude: long });
  };
  return (
    <div>
      {props.attractions.map((attraction) => {
        return (
          <>
            <Marker
              longitude={attraction.geometry.coordinates[0]}
              latitude={attraction.geometry.coordinates[1]}
            >
              <img
                src="https://img.icons8.com/office/16/000000/eiffel-tower.png"
                alt="Attraction Marker"
                style={{ cursor: "pointer", fontSize: 2 * props.viewport.zoom }}
                onClick={() =>
                  handleAttractionClick(
                    attraction.properties.full_id,
                    attraction.geometry.coordinates[1],
                    attraction.geometry.coordinates[0]
                  )
                }
              />
            </Marker>
            {attraction.properties.full_id === currentAttraction && (
              <Popup
                key={attraction.properties.full_id}
                latitude={attraction.geometry.coordinates[1]}
                longitude={attraction.geometry.coordinates[0]}
                closeButton={true}
                closeOnClick={false}
                anchor="right"
                dynamicPosition={true}
                onClose={() => {
                  setCurrentAttraction(null);
                }}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{attraction.properties.name}</h4>
                  <label>Phone</label>
                  <p className="desc">
                    {attraction.properties?.phone ?? "N/A"}
                  </p>
                  <label>Website</label>
                  <div className="stars">
                    <p>{attraction?.properties?.website ?? "N/A"}</p>
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

export default Attractions;
