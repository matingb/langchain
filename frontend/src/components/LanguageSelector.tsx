import React from "react";
import { getLanguageEmoji, LanguageCode, LANGUAGES } from "./types";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  label: string;
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
}

export const LanguageSelector = ({ label, value, onChange }: Props) => {
  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ mr: 1 }}>
              {getLanguageEmoji(selected)}
            </Typography>
            {LANGUAGES.find((lang) => lang.code === selected)?.name}
          </Box>
        )}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ mr: 1 }}>
                {getLanguageEmoji(lang.code)}
              </Typography>
              {lang.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
