// Third party imports
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function SelectSmall() {
  const [language, setLanguage] = useState("");
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    setLanguage(() => e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="language-selector">Language</InputLabel>
      <Select
        labelId="language-selector"
        id="demo-select-small"
        value={language || "en"}
        label="Language"
        onChange={handleChange}
      >
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"de"}>German</MenuItem>
        <MenuItem value={"cn"}>Chinese</MenuItem>
      </Select>
    </FormControl>
  );
}
