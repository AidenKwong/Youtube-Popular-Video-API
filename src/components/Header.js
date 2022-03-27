import { useState, useEffect } from "react";
import youtube_icon from "../assets/images/youtube_icon.svg";
import BasicPopover from "./BasicPopover";
import { mostFqWordsAPI } from "../api/youtube-api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import styles from "./Header.module.css";

const headerStyle = {
  padding: "0.5rem",
  borderBottom: `2px solid rgb(240, 240, 240)`,
  backgroundColor: "#fff",
};

const headerContentStyle = {
  margin: "0 auto",
  maxWidth: "1280px",
  display: "flex",
  justifyContent: "space-between",
};

const websiteLogoStyle = {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
};

const webSiteNameStyle = {
  lineHeight: "40px",
  fontSize: 32,
};

const cols = ["rank", "word", "count"];

export default function Header() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await mostFqWordsAPI(10);
      for (let i = 0; i < data.result.length; i++) {
        data.result[i].id = i;
      }
      setRows(data.result);
    })();
  }, []);
  return (
    <div style={headerStyle}>
      <div style={headerContentStyle}>
        <div style={websiteLogoStyle}>
          <img src={youtube_icon} alt="youtube_icon" width={40}></img>
          <h1 style={webSiteNameStyle}>YMPV</h1>
        </div>
        <BasicPopover prompt={"Fun Data"}>
          <TableContainer className={styles.tableContainer}>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "0.75rem",
                overflow: "hidden",
              }}
            >
              <h3>Most Frequent Words in Title</h3>
              <h5>(include titles in all records)</h5>
            </Container>

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
                {rows.map((row, i) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="left">{row.word}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BasicPopover>
      </div>
    </div>
  );
}
