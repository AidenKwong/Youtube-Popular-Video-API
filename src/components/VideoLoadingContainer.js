import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  height: "168px",
  border: `1px solid rgb(240, 240, 240)`,
  borderRadius: "0.5em",
  boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
  backgroundColor: "#fff",
};

const VideoLoadingContainer = () => {
  return (
    <div style={containerStyle}>
      <CircularProgress style={{ color: "lightgray" }} />
    </div>
  );
};

export default VideoLoadingContainer;
