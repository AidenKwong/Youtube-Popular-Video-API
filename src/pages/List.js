import VideoContainer from "../components/VideoContainer";
import { useState, useEffect } from "react";
import VideoLoadingContainer from "../components/VideoLoadingContainer";
import { Autocomplete, TextField } from "@mui/material";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import clockWithWhiteFace from "../assets/images/clock-with-white-face.png";
import splash from "../assets/images/splash.png";

const listStyle = {
  paddingTop: "1rem",
  margin: "0 auto",
  maxWidth: "1280px",
};

const listHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  height: 422,
};

const optionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const datePickerStyle = {};

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
  const [regions, setRegions] = useState([{ label: "Loading..." }]);
  const [region, setRegion] = useState("United States");
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videos, setVideos] = useState([]);
  const [counts, setCounts] = useState("...");
  const [date, setDate] = useState(new Date());
  const [unavailable, setUnavailable] = useState(false);

  const handleOnChange = (e, newVal) => {
    setRegion(newVal.label);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const regionRes = await API.get("/regions/allRegions");
        const countRes = await API.get("/videos/totalVideosCount");
        setCounts(countRes.data.count);
        setRegions(
          regionRes.data.result
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((region) => ({ label: region.name, code: region.code }))
        );
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            width: "50%",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              marginTop: "2em",
              position: "relative",
              color: "rgb(50, 50, 50)",
            }}
          >
            <span style={{ fontSize: "4rem", color: "black" }}>Archive</span>{" "}
            Top 10 YouTube Most Popular Videos
            <span
              style={{
                height: "min-content",
                position: "absolute",
                marginLeft: "1rem",
              }}
            >
              <img src={clockWithWhiteFace} alt="clock" width="48px" />
            </span>
          </h1>

          <h2 style={{ fontWeight: 500 }}>
            <pre>Began keep track on popular video list on</pre>
            <pre>
              Since <span style={{ fontWeight: 700 }}>March 19 2022</span>
            </pre>
            <pre>
              Records across all <span style={{ fontWeight: 700 }}>107</span>
              regions
            </pre>
            <pre>
              Currently <span style={{ fontWeight: 700 }}>{counts}</span>{" "}
              records of videos' id in popular video list
            </pre>
          </h2>
          <img
            src={splash}
            alt="splash"
            width="100%"
            style={{
              position: "absolute",
              width: "800px",
              transform: "translate(15%,-20%) rotate(-20deg)",
              opacity: "10%",
            }}
          />
        </div>

        <div style={optionStyle}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={regions}
            sx={{ minWidth: 300 }}
            onChange={handleOnChange}
            renderInput={(params) => <TextField {...params} label="Region" />}
            style={{ width: "100%" }}
          />

          <div style={datePickerStyle}>
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
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
