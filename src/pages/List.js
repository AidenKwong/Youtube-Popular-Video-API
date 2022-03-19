import VideoContainer from "../components/VideoContainer";
import { useState, useEffect } from "react";
import VideoLoadingContainer from "../components/VideoLoadingContainer";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";

import axios from "axios";

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

const List = () => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("United States");
  const [loadingRegion, setLoadingRegion] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videos, setVideos] = useState([]);

  const handleOnChange = (e) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoadingRegion(true);
        const { data } = await axios.get(
          `https://youtube-most-api.herokuapp.com/regions/allRegions`
        );

        setRegions(data.result.sort((a, b) => a.name.localeCompare(b.name)));
        if (data) setLoadingRegion(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoadingVideos(true);
        const { data } = await axios.get(
          "https://youtube-most-api.herokuapp.com/videos/top10Videos",
          {
            params: {
              region: region,
            },
          }
        );
        setVideos(data.result);
        if (data) setLoadingVideos(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [region]);

  return (
    <div style={listStyle}>
      <div style={listHeaderStyle}>
        <h2>Top 10</h2>

        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select value={region} label="Region" onChange={handleOnChange}>
              {loadingRegion && (
                <MenuItem value="United States">United States</MenuItem>
              )}

              {regions.map((region) => (
                <MenuItem value={region.name} key={region.code}>
                  {region.name}
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
          {videos.map((video, idx) => (
            <div key={video.id}>
              <VideoContainer idx={idx} video={video} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
