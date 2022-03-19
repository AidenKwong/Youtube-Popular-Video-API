const containerStyle = {
  margin: "1rem 0",
  border: `1px solid rgb(240, 240, 240)`,
  borderRadius: "0.5em",
  boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
  backgroundColor: "#fff",
  padding: "0.5rem 1rem 1rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5em",
};

const container1stPartStyle = {
  display: "flex",
  gap: "1rem",
};

const VideoContainer = ({ idx, video }) => {
  return (
    <div style={containerStyle} key={video.id}>
      <h2> {idx + 1} </h2>
      <div style={container1stPartStyle}>
        <div width="480" height="290">
          <iframe
            title={video.id}
            id="player"
            width="480"
            height="290"
            src={`http://www.youtube.com/embed/${video.id}?enablejsapi=1&origin=http://localhost:3000`}
            frameBorder="0"
          />
        </div>

        <h3>{video.title}</h3>
      </div>
    </div>
  );
};

export default VideoContainer;
