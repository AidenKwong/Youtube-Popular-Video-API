const containerStyle = {
  margin: "1rem 0",
  border: `1px solid rgb(240, 240, 240)`,
  borderRadius: "0.5em",
  boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
  backgroundColor: "#fff",
  padding: "0.5rem 1rem 0.5rem 1rem",
  flexDirection: "column",
  gap: "1em",
};

const VideoContainer = ({ idx, video }) => {
  return (
    <div style={containerStyle} key={video.id}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "0.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ width: 27, textAlign: "center" }}>
              <h2> {idx + 1} </h2>
            </div>

            <div>
              <iframe
                title={video.id}
                allowFullScreen="allowfullscreen"
                id="player"
                width="450"
                height="270"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
              />
              <h3
                style={{
                  fontWeight: 500,
                  marginTop: "0.25rem",
                  maxWidth: 450,
                }}
              >
                {video.title}
              </h3>
            </div>
          </div>

          <h4
            style={{
              fontWeight: 500,
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
