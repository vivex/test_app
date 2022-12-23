import MUISelect, {
  SelectChangeEvent,
  SelectProps,
} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export type TSelectOption = {
  label: string;
  value: string;
};
type TSelectProps = {
  options: TSelectOption[];
} & SelectProps;

export const Select = (props: TSelectProps) => {
  console.log("props.options", props.options);
  return (
    <FormControl fullWidth>
      <InputLabel id={`id_select${props.label}`}>{props.label}</InputLabel>
      <MUISelect
        defaultValue="choose"
        {...props}
        labelId={`id_select${props.label}`}
      >
        <MenuItem value="choose">Choose Option</MenuItem>
        {props.options.map((opt) => (
          <MenuItem value={opt.value} key={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};
