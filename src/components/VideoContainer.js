const containerStyle = {
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
            width: "100%",
            marginTop: "0.5rem",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                width: 27,
                height: 138,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>{idx + 1} </h2>
            </div>

            {/* <iframe
                title={video.id}
                allowFullScreen="allowfullscreen"
                id="player"
                width="246"
                height="138"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
              /> */}
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                width={246}
                height={138}
                src={`https://i3.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt={`thumbnail of ${video.id}`}
                style={{ objectFit: "cover" }}
              />
            </a>
          </div>

          <h4>{video.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
