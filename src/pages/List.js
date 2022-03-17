import VideoContainer from "../components/VideoContainer";
import { useState, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-config";

import axios from "axios";

const listStyle = {
  paddingTop: "1rem",
  margin: "0 auto",
  maxWidth: "1024px",
};

const listHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const selectStyle = {
  height: "2rem",
  borderRadius: "4px",
  textAlign: "center",
  backgroundColor: "black",
  color: "white",
  fontSize: "0.75rem",
};

const List = () => {
  const [items, setItems] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("US");

  const getRegions = httpsCallable(functions, "getRegions");
  const getVideos = httpsCallable(functions, "getVideos");

  useEffect(() => {
    getRegions()
      .then((result) => {
        const functionData = result.data;
        console.log(functionData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    // async function fetchData() {
    //   const { data } = await axios.get("/.netlify/functions/youtubeVid-api", {
    //     params: { region: selectedRegion },
    //   });
    //   setItems(data.items);
    // }
    // fetchData();
  }, [selectedRegion]);

  useEffect(() => {
    // async function fetchData() {
    //   const { data } = await axios.get("/.netlify/functions/youtubeRegion-api");
    //   setRegions(data.items);
    // }
    // fetchData();
  }, []);

  const handleOnChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handlegetVideos = () => {
    getVideos({ region: "US" })
      .then((result) => {
        const functionData = result.data;
        console.log(functionData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div style={listStyle}>
      <div style={listHeaderStyle}>
        <h2>Top 20</h2>
        <select style={selectStyle} onChange={handleOnChange}>
          {regions.map((region) => (
            <option
              value={region.id}
              key={region.id}
              selected={region.id === "US" ? "selected" : null}
            >
              {region.snippet.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handlegetVideos}>getVideos</button>

      <div>
        {items.map((item) => (
          <div key={item.id}>
            <VideoContainer items={items} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
