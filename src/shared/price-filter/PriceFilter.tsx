import React from "react";
import {
  StyledInputs,
  StyledSlider,
  StyledTextField,
} from "./PriceFilter.styled";

const PriceFilter = ({ value, setValue, min, max }: any) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleBlurFrom = () => {
    if (value[0] < min) {
      setValue((prev: number[]) => [min, prev[1]]);
    } else if (value[0] > max) {
      setValue((prev: number[]) => [max, prev[1]]);
    } else if (value[0] > value[1]) {
      setValue((prev: number[]) => [prev[1], prev[0]]);
    } else if (isNaN(value[0])) {
      setValue((prev: number[]) => [min, prev[1]]);
    }
  };

  const handleBlurTo = () => {
    if (value[1] < min) {
      setValue((prev: number[]) => [prev[1], min]);
    } else if (value[1] > max) {
      setValue((prev: number[]) => [prev[0], max]);
    } else if (value[0] > value[1]) {
      setValue((prev: number[]) => [prev[1], prev[0]]);
    } else if (isNaN(value[1])) {
      setValue((prev: number[]) => [prev[0], max]);
    }
  };

  return (
    <div>
      <h4>Цена</h4>
      <StyledInputs>
        <StyledTextField
          label="Від"
          variant="outlined"
          type="number"
          value={isNaN(value[0]) ? "" : value[0]}
          size="small"
          onBlur={handleBlurFrom}
          onChange={(e) =>
            setValue((prev: number[]) => [
              isNaN(parseInt(e.target.value)) ? min : parseInt(e.target.value),
              prev[1],
            ])
          }
        />
        <p> - </p>
        <StyledTextField
          label="До"
          type="number"
          value={isNaN(value[1]) ? "" : value[1]}
          size="small"
          onBlur={handleBlurTo}
          onChange={(e) =>
            setValue((prev: number[]) => [
              prev[0],
              isNaN(parseInt(e.target.value)) ? min : parseInt(e.target.value),
            ])
          }
        />
      </StyledInputs>

      <StyledSlider
        max={max}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default PriceFilter;
