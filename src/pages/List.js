import VideoContainer from "../components/VideoContainer";
import { useState, useEffect } from "react";
import VideoLoadingContainer from "../components/VideoLoadingContainer";
import { Autocomplete, TextField, Box } from "@mui/material";
import DatePicker from "../components/DatePicker";
import {
  regionAPI,
  videosAPI,
  videoCatsAPI,
  channelAPI,
} from "../api/youtube-api";
import { MdArrowBack } from "react-icons/md";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import AdComponent from "../components/AdComponent";

const listStyle = {
  margin: "0 auto",

  padding: "0.5rem",
};

const videoCatListStyle = {
  backgroundColor: "#fff",
  width: "fit-content",
  borderRadius: "0.5em",
  boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
  height: "min-content",
};

const listContainerStyle = {
  width: 780,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const optionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: 480,
};

const datePickerStyle = {
  display: "flex",
};

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
  const [date, setDate] = useState(new Date());
  const [unavailable, setUnavailable] = useState(false);
  const [videoCats, setVideoCats] = useState([]);
  const [channels, setChannels] = useState([]);
  const cols = ["Rank", "Category", "Percentage"];
  const cols2 = ["Rank", "Channel", "Percentage"];

  const handleOnChange = (e, newVal) => {
    setRegion(newVal.label);
  };

  useEffect(() => {
    try {
      const fetchRegions = async () => {
        const { data } = await regionAPI();
        setRegions(
          data.result
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((region) => ({ label: region.name, code: region.code }))
        );
      };

      const fetchVideoCats = async () => {
        const { data } = await videoCatsAPI();
        const videoCatList = data.result;

        const totalCount = videoCatList.reduce(
          (acc, curr) => acc + curr.count,
          0
        );
        const videoCatList2 = videoCatList.map((cat) => {
          return {
            ...cat,
            percentage: ((cat.count / totalCount) * 100).toFixed(2) + "%",
          };
        });
        setVideoCats(videoCatList2.sort((a, b) => b.count - a.count));
      };

      const fetchChannels = async () => {
        const { data } = await channelAPI();
        const channelList = data.result;
        const totalCount = channelList.reduce(
          (acc, curr) => acc + curr.count,
          0
        );
        const channelList2 = channelList.map((channel) => {
          return {
            ...channel,
            percentage: ((channel.count / totalCount) * 100).toFixed(2) + "%",
          };
        });
        setChannels(channelList2.sort((a, b) => b.count - a.count));
      };

      fetchRegions();
      fetchVideoCats();
      fetchChannels();
    } catch (error) {
      console.log(error);
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
    document.title = `YMPV - ${region}`;
  }, [region, date]);

  return (
    <div style={listStyle}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
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
            <h3>Most Frequent Video Categories in Popular List</h3>
            <p>(include category in all records)</p>
          </Container>
          <AdComponent />
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
                  <TableCell align="right">{row.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            <h3>Most Frequent Channels in Popular List</h3>
            <p>(include category in all records)</p>
          </Container>
          <AdComponent />
          <Table>
            <TableHead>
              <TableRow>
                {cols2.map((col, i) => (
                  <TableCell align={i === 2 ? "right" : "left"} key={i}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">
                    <a
                      href={`https://youtube.com/channel/${row.id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "black" }}
                    >
                      {row.title}
                    </a>
                  </TableCell>
                  <TableCell align="right">{row.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={listContainerStyle}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={optionStyle}>
              {regions && (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={regions}
                  sx={{ minWidth: 300 }}
                  onChange={handleOnChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Region" />
                  )}
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
                <DatePicker date={date} setDate={setDate} style={{ flex: 1 }} />
              </div>
            </div>
            <div
              style={{
                border: `1px solid rgb(240, 240, 240)`,
                borderRadius: "0.5em",
                boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
                backgroundColor: "#fff",
                padding: "0.5rem 1rem 0.5rem 1rem",
                flex: 1,
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <MdArrowBack size={36} />
                <h3>{"Select the region you want to check"}</h3>
              </div>
            </div>
          </div>

          {unavailable ? (
            <div style={unavailableStyle}>
              <h3>Sorry, we don't have records on this day. 😔</h3>
            </div>
          ) : null}
          {loadingVideos && !unavailable && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[...Array(4)].map((x, i) => (
                <VideoLoadingContainer key={i} />
              ))}
            </div>
          )}
          {!loadingVideos && !unavailable && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
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
