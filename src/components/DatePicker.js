import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import enLocale from "date-fns/locale/en-US";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";

export default function DatePicker({ date, setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        shouldDisableDate={(date) => {
          if (date < new Date("2022-03-19T22:01:43.688Z")) return true;
          if (date > new Date()) return true;
        }}
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
