import VideoContainer from "../components/VideoContainer";
import { useState, useEffect } from "react";
import VideoLoadingContainer from "../components/VideoLoadingContainer";
import { InputLabel, MenuItem, FormControl, Select, Box } from "@mui/material";
import DatePicker from "../components/DatePicker";
import axios from "axios";

const listStyle = {
  paddingTop: "1rem",
  margin: "0 auto",
  maxWidth: "1280px",
};

const listHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const datePickerStyle = {
  width: "50%",
};

const unavailableStyle = {
  margin: "1rem auto",
  textAlign: "center",
  flex: "1",
};

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://youtube-most-api.herokuapp.com",
});

const List = () => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("United States");
  const [loadingRegion, setLoadingRegion] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videos, setVideos] = useState([]);
  const [date, setDate] = useState(new Date());
  const [unavailable, setUnavailable] = useState(false);

  const handleOnChange = (e) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoadingRegion(true);
        const { data } = await API.get("/regions/allRegions");

        setRegions(data.result.sort((a, b) => a.name.localeCompare(b.name)));
        if (data) setLoadingRegion(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.code);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingVideos(true);
      setUnavailable(false);
      await API.get("/videos/top10Videos", {
        params: {
          region: region,
          date: date,
        },
      })
        .then((res) => {
          if (res.data) {
            setLoadingVideos(false);
            setVideos(res.data.result);
          }
        })
        .catch((err) => {
          err.response.status === 404 && setUnavailable(true);
        });
    };
    fetchData();
  }, [region, date]);

  return (
    <div style={listStyle}>
      <div style={listHeaderStyle}>
        <div style={datePickerStyle}>
          <DatePicker date={date} setDate={setDate} />
        </div>
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

      {unavailable ? (
        <div style={unavailableStyle}>
          <h3>Sorry, we don't have records on this day.</h3>
        </div>
      ) : null}
      {loadingVideos && !unavailable && (
        <div>
          {[...Array(4)].map((x, i) => (
            <VideoLoadingContainer key={i} />
          ))}
        </div>
      )}
      {!loadingVideos && !unavailable && (
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
