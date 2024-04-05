import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledButton,
  StyledInput,
  StyledInputRoot,
} from "./QuantityInput.module";

interface QuantityInputProps extends Omit<NumberInputProps, "onChange"> {
  value: number;
  onChange: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.PointerEvent<Element>
      | React.KeyboardEvent<Element>,
    value: number | null
  ) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleInputChange = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.PointerEvent<Element>
      | React.KeyboardEvent<Element>,
    value: number | null
  ) => {
    if (!isNaN(value as number) && value !== null && value >= 1) {
      onChange(event, value);
    } else if (value !== null && value < 1) {
      onChange(event, 1);
    }
  };

  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      value={typeof value === "number" ? value : 1}
      onChange={handleInputChange}
      {...props}
    />
  );
};

export default QuantityInput;
