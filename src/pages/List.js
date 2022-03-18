import VideoContainer from "../components/VideoContainer";
import { useState, useEffect } from "react";
import VideoLoadingContainer from "../components/VideoLoadingContainer";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-config";

const listStyle = {
  paddingTop: "1rem",
  margin: "0 auto",
  maxWidth: "1024px",
};

const listHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const loadingContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2rem",
  borderRadius: "4px",
  backgroundColor: "black",
  color: "white",
  fontSize: "14px",
  width: "12rem",
};

const selectStyle = {
  height: "2rem",
  borderRadius: "4px",
  textAlign: "center",
  backgroundColor: "black",
  color: "white",
  fontSize: "14px",
  width: "12rem",
};

const getRegions = httpsCallable(functions, "getRegions");
const getVideos = httpsCallable(functions, "getVideos");

const List = () => {
  const [items, setItems] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("United States");
  const [loadingRegion, setLoadingRegion] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const handleOnChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  useEffect(() => {
    getRegions().then((result) => {
      setRegions(result.data.regions);
      setLoadingRegion(false);
    });
  }, []);

  useEffect(() => {
    getVideos({ region: selectedRegion })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedRegion]);

  return (
    <div style={listStyle}>
      <div style={listHeaderStyle}>
        <h2>Top 10</h2>
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              value={selectedRegion}
              label="Region"
              onChange={handleOnChange}
            >
              {loadingRegion && (
                <MenuItem value="United States">United States</MenuItem>
              )}

              {regions.map((region) => (
                <MenuItem value={region.snippet.name} key={region.id}>
                  {region.snippet.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      {loadingVideos ? (
        <div>
          {[...Array(3)].map((x, i) => (
            <VideoLoadingContainer key={i} />
          ))}
        </div>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <VideoContainer items={items} item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
