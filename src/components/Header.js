import youtube_icon from "../assets/images/youtube_icon.svg";

const headerStyle = {
  padding: "0.5rem",
  borderBottom: `2px solid rgb(240, 240, 240)`,
  backgroundColor: "#fff",
};

const headerContentStyle = {
  margin: "0 auto",
  maxWidth: "1024px",
};

const websiteLogoStyle = {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
};

export default function Header() {
  return (
    <div style={headerStyle}>
      <div style={headerContentStyle}>
        <div style={websiteLogoStyle}>
          <img src={youtube_icon} alt="youtube_icon" width={40}></img>
          <h1>Youtube Popular Video</h1>
        </div>
      </div>
    </div>
  );
}
