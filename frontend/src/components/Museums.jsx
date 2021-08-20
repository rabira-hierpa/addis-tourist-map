import { Museum } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Marker, Popup } from "react-map-gl";

function Museums(props) {
  const [currentAttraction, setCurrentAttraction] = useState(null);
  const handleAttractionClick = (id, lat, long) => {
    setCurrentAttraction(id);
    props.setViewport({ ...props.viewport, latitude: lat, longitude: long });
  };
  const [museums, setMuseums] = useState([]);
  useEffect(() => {
    const getMuseums = async () => {
      try {
        const allMuseums = await axios.get("/museums");
        console.log({ allMuseums });
        setMuseums(allMuseums?.data[0]?.features);
      } catch (err) {
        alert(err);
      }
    };
    getMuseums();
  }, []);
  return (
    <div>
      {museums.map((attraction) => {
        return (
          <>
            <Marker
              longitude={attraction.geometry.coordinates[0]}
              latitude={attraction.geometry.coordinates[1]}
            >
              <Museum
                style={{
                  cursor: "pointer",
                  fontSize: 1 * props.viewport.zoom,
                  color: "brown",
                }}
                onClick={() =>
                  handleAttractionClick(
                    attraction.properties.full_id,
                    attraction.geometry.coordinates[1],
                    attraction.geometry.coordinates[0]
                  )
                }
              />
              {/* <p className="place">{attraction.properties.name}</p> */}
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

export default Museums;
