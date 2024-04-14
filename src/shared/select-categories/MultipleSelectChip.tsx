import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 600,
    },
  },
};

function getStyles(
  name: string,
  categoryName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  names,
  categoryName,
  setCategoryName,
}: any) {
  const theme = useTheme();
  const [selectKey, setSelectKey] = React.useState(0); // Add state for key

  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Update key whenever categoryName changes
  React.useEffect(() => {
    setSelectKey((prevKey) => prevKey + 1);
  }, [categoryName]);

  return (
    <div>
      <FormControl>
        <InputLabel id="multiple-chip-label">Категории</InputLabel>
        <Select
          key={selectKey} // Unique key
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: string, index: number) => (
                <Chip key={`${value}-${index}`} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name: string, index: number) => (
            <MenuItem
              key={`${name}-${index}`}
              value={name}
              style={getStyles(name, categoryName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
