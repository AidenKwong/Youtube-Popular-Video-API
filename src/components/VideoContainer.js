import { useRef } from "react";

const containerStyle = {
  margin: "1rem 0",
  border: `1px solid rgb(240, 240, 240)`,
  borderRadius: "0.5em",
  boxShadow: `0rem 0.1rem 0.75rem rgb(230, 230, 230)`,
  backgroundColor: "#fff",
};

const indexStyle = {
  padding: "1rem 0 0 1rem",
};

const container1stPartStyle = {
  display: "flex",
  gap: "1rem",
  padding: "0.5rem 1rem",
};

const titleViewLikeStyle = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const container2ndPartStyle = {
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  borderTop: "2px solid lightGray",
  borderRadius: "0 0 0.5em 0.5em",
};

const barStyle = {
  flex: 1,
};

const VideoContainer = ({ items, item }) => {
  const barRef = useRef();

  return (
    <div style={containerStyle} key={item.id}>
      <h2 style={indexStyle}> {items.indexOf(item) + 1} </h2>
      <div style={container1stPartStyle}>
        <a
          href={`https://www.youtube.com/watch?v=${item.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="thumbnail"
            src={item.snippet.thumbnails.high.url}
            width={320}
          />
        </a>
        <div style={titleViewLikeStyle}>
          <h4>Title: {item.snippet.title}</h4>
          <p>
            Publish at: {new Date(item.snippet.publishedAt).toLocaleString()}
          </p>
          <p>Channel Title: {item.snippet.channelTitle}</p>
          <p>Views: {`${item.statistics.viewCount}`}</p>
          <p style={{ display: "flex" }}>
            Likes:
            {` ${
              item.statistics.likeCount
                ? item.statistics.likeCount
                : "hided by owner"
            }`}
          </p>
          <div style={barStyle} ref={barRef}></div>
        </div>
      </div>

      <div style={container2ndPartStyle}>
        <h4>Description:</h4>
        <pre>{`${item.snippet.description}`}</pre>
      </div>
    </div>
  );
};

export default VideoContainer;
