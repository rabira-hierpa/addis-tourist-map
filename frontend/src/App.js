import "./app.css";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import {
  Fireplace,
  Hotel,
  LocationOff,
  Museum,
  Room,
  Search,
  Star,
} from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import Directions from "react-map-gl-directions";
import "react-map-gl-directions/mapbox-gl-directions.css";
import Attractions from "./components/Attractions";
import Museums from "./components/Museums";
import Hotels from "./components/Hotels";

function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [pins, setPins] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    longitude: 38.74689,
    latitude: 9.02497,
    zoom: 14,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userLocation, setUserLocation] = useState(false);
  const [showAttractions, setShowAttractions] = useState(false);
  const [showMuseums, setShowMuseums] = useState(false);
  const [showGuestHouses, setShowGuestHouses] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const mapBoxContainer = useRef(null);

  const hanldeGetuserLocation = () => {
    setUserLocation(!userLocation);
  };

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      console.log(`pins`, pins);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });
  };

  const successLocation = (position) => {
    setViewport({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      zoom: 14,
    });
  };

  const errorLocation = (position) => {
    setViewport({
      longitude: 38.74689,
      latitude: 9.02497,
      zoom: 14,
    });
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getAttractions = async () => {
      try {
        const allAttractions = await axios.get("/attractions");
        console.log({ allAttractions });
        setAttractions(allAttractions?.data[0]?.features);
      } catch (err) {
        alert(err);
      }
    };
    getPins();
    if (!attractions.length) {
      getAttractions();
    }
    getCurrentLocation();
  }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    return null;
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        ref={mapBoxContainer}
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoicmFicmEiLCJhIjoiY2tzaTR4cG1vMDhtZTJwbDQ4M2ljcm1yMCJ9.DDn0ldEzSIar94LsRfcoJQ"
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/rabra/cksjdndfyawl817pjy5okwbuz"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={currentUsername && handleAddClick}
      >
        {userLocation ? (
          <GeolocateControl
            style={{ position: "absolute", bottom: "210px", right: "10px" }}
            positionOptions={{ enableHighAccuracy: true }}
            onViewStateChange={(viewport) => setViewport(viewport)}
            trackUserLocation={false}
            auto
            onClick={hanldeGetuserLocation}
          />
        ) : (
          <div
            onClick={hanldeGetuserLocation}
            style={{ position: "absolute", bottom: "210px", right: "10px" }}
          >
            <LocationOff />
          </div>
        )}
        <NavigationControl
          style={{ position: "absolute", bottom: "120px", right: "10px" }}
        />
        <div class="search-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target[0].value);
            }}
            className="flex"
          >
            <input
              className="pl-3 border-none h-8 w-72"
              type="text"
              name="search"
              placeholder="Search Hotels.."
              onChange={handleSearchInput}
            />
          </form>
        </div>
        <Directions
          mapRef={mapBoxContainer}
          unit={"metric"}
          mapboxApiAccessToken={
            "pk.eyJ1IjoicmFicmEiLCJhIjoiY2tzaTR4cG1vMDhtZTJwbDQ4M2ljcm1yMCJ9.DDn0ldEzSIar94LsRfcoJQ"
          }
          position={"top-left"}
        />
        <div style={{ position: "absolute", top: "10rem" }}>
          <div className="pl-2 flex flex-col space-y-2">
            <button
              onClick={() => {
                setShowAttractions(!showAttractions);
              }}
              className="bg-green-400 focus:bg-green-600 hover:bg-green-dark text-white font-bold py-2 px-1 rounded
              flex space-x-2
              "
            >
              <Fireplace style={{ color: "white" }} />
              <span>Attractions</span>
            </button>
            <button
              onClick={() => {
                setShowMuseums(!showMuseums);
              }}
              className="bg-yellow-900 hover:bg-yellow-dark text-white font-bold py-2 px-1 rounded flex space-x-2"
            >
              <Museum style={{ color: "white" }} />
              <span>Museums</span>
            </button>
            <button
              onClick={() => {
                setShowGuestHouses(!showGuestHouses);
              }}
              className="bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-1 rounded flex space-x-2"
            >
              <Hotel style={{ color: "white" }} />
              Guest Houses
            </button>
          </div>
        </div>
        {showAttractions ? (
          <Attractions
            attractions={attractions}
            viewport={viewport}
            setViewport={setViewport}
          />
        ) : null}
        {showMuseums ? (
          <Museums viewport={viewport} setViewport={setViewport} />
        ) : null}
        {showGuestHouses ? (
          <Hotels
            viewport={viewport}
            setViewport={setViewport}
            searchTerm={searchTerm}
          />
        ) : null}
        {pins.map((p, idx) => (
          <div key={idx}>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              // offsetLeft={-3.5 * viewport.zoom}
              // offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 4 * viewport.zoom,
                  color:
                    currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </div>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
