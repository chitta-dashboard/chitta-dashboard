import { useState } from "react";
import { Box, Chip, FormHelperText, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from "@mui/material";
import Cancel from "@mui/icons-material/Cancel";
import { Controller, UseControllerProps } from "react-hook-form";
import S from "./input.styled";

interface InputProps extends UseControllerProps {
  type: "text" | "number" | "date" | "datetime" | "select" | "multiselect" | "file" | "radio" | "autocomplete";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: {
    [key: string]: any;
  };
}

function Input({ type, name, rules = {}, control, defaultValue, shouldUnregister = false, onChange, options = {} }: InputProps) {
  const [autocomplete, setAutocomplete] = useState<string | null>(null);
  const [multiSelect, setMultiselect] = useState<string[]>(type === "multiselect" ? defaultValue : []);

  switch (type) {
    case "text":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.TextInput
              helperText={errors[name]?.message as string}
              type="text"
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "number":
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue || ""}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.NumberInput
              helperText={errors[name]?.message as string}
              type="number"
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "date":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.DateInput
              helperText={errors[name]?.message as string}
              type="date"
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "datetime":
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue || ""}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => (
            <S.DateInput
              helperText={errors[name]?.message as string}
              type="datetime-local"
              {...options}
              name={field.name}
              value={field.value}
              ref={field.ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                onChange && onChange(e);
              }}
              onBlur={field.onBlur}
            />
          )}
        />
      );

    case "select":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.SelectInput
                select
                helperText={errors[name]?.message as string}
                {...options}
                name={field.name}
                value={field.value}
                ref={field.ref}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e.target.value);
                  onChange && onChange(e);
                }}
                onBlur={field.onBlur}
              >
                <MenuItem value="" style={{ display: "none" }}></MenuItem>
                {options?.selectOptions?.map(([actualValue, displayValue]: [string, string]) => (
                  <MenuItem key={actualValue} value={actualValue}>
                    {displayValue}
                  </MenuItem>
                ))}
                {/* special options are something that user cannot select, but you can set explicitly (programatically) ex: ~All Groups~ */}
                {/* inorder to set a select field value, it must be in the menu items, we here we're adding it without showing to user */}
                {options?.specialOptions?.map((value: string) => (
                  <MenuItem key={value} value={value} style={{ display: "none" }}></MenuItem>
                ))}
              </S.SelectInput>
            );
          }}
        />
      );

    case "multiselect":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.MultiSelectInput {...(options?.gridArea ? { gridArea: options.gridArea } : {})}>
                <InputLabel shrink id="demo-multiple-chip-label">
                  {options?.label}
                </InputLabel>
                <Select
                  multiple
                  maxRows={4}
                  input={<OutlinedInput />}
                  value={multiSelect || []}
                  ref={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={({ target: { value } }) => {
                    field.onChange(value);
                    setMultiselect(value as string[]);
                  }}
                  renderValue={(selected) => (
                    <S.MultiSelectChipContainer>
                      {selected.map((value: string) => (
                        <S.MultiSelectChip
                          clickable
                          deleteIcon={<Cancel onMouseDown={(event: React.MouseEvent<SVGSVGElement>) => event.stopPropagation()} />}
                          key={value}
                          label={value}
                          onDelete={() => {
                            field.onChange(selected.filter((val) => val !== value));
                            setMultiselect((selected) => selected.filter((val) => val !== value));
                          }}
                        />
                      ))}
                    </S.MultiSelectChipContainer>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 50,
                      },
                    },
                  }}
                >
                  {options.selectOptions
                    ?.filter((val: string) => !multiSelect.includes(val))
                    ?.map((val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors[name]?.message as string}</FormHelperText>
              </S.MultiSelectInput>
            );
          }}
        />
      );

    // Note: we cannot change the 'value' of file input programmatically due to security reasons.
    case "file":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.FileInput
                helperText={errors[name]?.message as string}
                type="file"
                {...options}
                name={field.name}
                value={field.value}
                ref={field.ref}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange && onChange(e);
                  field.onChange(e.target.value);
                }}
                onBlur={field.onBlur}
              />
            );
          }}
        />
      );

    case "radio":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.RadioInput {...(options?.gridArea ? { gridArea: options.gridArea } : {})}>
                <S.RadioInputLabel>{options.label}</S.RadioInputLabel>
                <RadioGroup row defaultValue={options.defaultValue || ""} {...field}>
                  {options.radioOptions?.map(([value, label]: string[]) => (
                    <S.RadipInputControlLabel key={value} value={value} label={label} control={<Radio />} />
                  ))}
                </RadioGroup>
                <FormHelperText>{errors[name]?.message as string}</FormHelperText>
              </S.RadioInput>
            );
          }}
        />
      );

    case "autocomplete":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.StyledAutocomplete
                options={options.selectoptions}
                renderInput={(params) => (
                  <TextField
                    {...options}
                    {...params}
                    helperText={errors[name]?.message as string}
                    label={options.label}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                value={field.value ? field.value : autocomplete}
                ref={field.ref}
                onChange={(event: any, newValue: any) => {
                  setAutocomplete(newValue);
                  onChange && onChange(event);
                  field.onChange(newValue);
                }}
              />
            );
          }}
        />
      );

    default:
      throw new Error("Wrong Input Type");
  }
}

export default Input;
