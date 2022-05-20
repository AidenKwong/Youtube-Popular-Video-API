const containerStyle = {
  margin: "1rem 0",
  border: `1px solid rgb(240, 240, 240)`,
  borderRadius: "0.5em",
  boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
  backgroundColor: "#fff",
  padding: "0.5rem 1rem 1rem 1rem",
  flexDirection: "column",
  gap: "1em",
};

const VideoContainer = ({ idx, video }) => {
  return (
    <div style={containerStyle} key={video.id}>
      <h2> {idx + 1} </h2>

      <div>
        <div width="480" height="290">
          <iframe
            title={video.id}
            allowFullScreen="allowfullscreen"
            id="player"
            width="450"
            height="270"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameBorder="0"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <h3 style={{ fontWeight: 500, maxWidth: "75%" }}>{video.title}</h3>
          <h4
            style={{
              fontWeight: 500,
              marginLeft: "1rem",
              width: "max-content",
            }}
          >
            id: {video.id}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
