import VideoContainer from "../components/VideoContainer";
import { useState, useEffect } from "react";
import VideoLoadingContainer from "../components/VideoLoadingContainer";
import { Autocomplete, TextField, Box } from "@mui/material";
import DatePicker from "../components/DatePicker";
import {
  regionAPI,
  countAPI,
  videosAPI,
  videoCatsAPI,
} from "../api/youtube-api";
import clockWithWhiteFace from "../assets/images/clock-with-white-face.png";
import worldImage from "../assets/images/world.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";

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

const videoCatListStyle = {
  width: "40%",
  backgroundColor: "#fff",
  height: "min-content",
  margin: "1rem 1rem 0 0",
  borderRadius: "0.5em",
  boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
};

const listContainerStyle = {
  width: "60%",
};

const optionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const datePickerStyle = {};

const unavailableStyle = {
  margin: "6rem auto",
  textAlign: "center",
  flex: "1",
};

const List = () => {
  const [regions, setRegions] = useState([{ label: "Loading..." }]);
  const [region, setRegion] = useState("United States");
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [videos, setVideos] = useState([]);
  const [counts, setCounts] = useState("...");
  const [date, setDate] = useState(new Date());
  const [unavailable, setUnavailable] = useState(false);
  const [videoCats, setVideoCats] = useState([]);
  const cols = ["Rank", "Category", "Count"];

  const handleOnChange = (e, newVal) => {
    setRegion(newVal.label);
  };

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    try {
      const fetchData = async () => {
        const regionRes = await regionAPI();
        const countRes = await countAPI();
        setCounts(countRes.data.count);
        setRegions(
          regionRes.data.result
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((region) => ({ label: region.name, code: region.code }))
        );
      };
      fetchData();
      (async () => {
        const { data } = await videoCatsAPI();
        setVideoCats(data.result.sort((a, b) => b.count - a.count));
      })();
    } catch (error) {
      console.log(error.code);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingVideos(true);
      setUnavailable(false);
      await videosAPI(region, date)
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
              Records across all <span style={{ fontWeight: 700 }}>107</span>{" "}
              regions
            </pre>
            <pre>
              Currently <span style={{ fontWeight: 700 }}>{counts}</span>{" "}
              records of videos' id in popular video list
            </pre>
          </h2>
          <img
            src={worldImage}
            alt="world"
            width="400"
            style={{
              position: "absolute",
              width: "400px",
              transform: "translate(80%,0%)",
              opacity: "10%",
              pointerEvents: "none",
            }}
          />
        </div>

        <div style={optionStyle}>
          {regions && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={regions}
              sx={{ minWidth: 300 }}
              onChange={handleOnChange}
              renderInput={(params) => <TextField {...params} label="Region" />}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.code && (
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                  )}

                  {option.label}
                </Box>
              )}
              style={{ width: "100%" }}
            />
          )}

          <div style={datePickerStyle}>
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <ins
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1890424135903675"
          data-ad-slot="7117210525"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <TableContainer style={videoCatListStyle}>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              gap: "0.5rem",
              overflow: "hidden",
            }}
          >
            <h3>Most Frequent Video Category in Popular List</h3>
            <p>(include category in all records)</p>
          </Container>
          <ins
            class="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1890424135903675"
            data-ad-slot="7117210525"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <Table>
            <TableHead>
              <TableRow>
                {cols.map((col, i) => (
                  <TableCell align={i === 2 ? "right" : "left"} key={i}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {videoCats.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{row.videoCat}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={listContainerStyle}>
          {unavailable ? (
            <div style={unavailableStyle}>
              <h3>Sorry, we don't have records on this day. 😔</h3>
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
      </div>
    </div>
  );
};

export default List;
