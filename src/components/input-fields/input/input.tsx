import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { Controller, UseControllerProps } from "react-hook-form";
import S from "./input.styled";

interface InputProps extends UseControllerProps {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: {
    [key: string]: any;
  };
}

function Input({ type, name, rules = {}, control, shouldUnregister = false, onChange, options = {} }: InputProps) {
  const [selected, setSelected] = useState<string | null>(null);
  switch (type) {
    case "text":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
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
          defaultValue=""
          rules={rules}
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
          defaultValue=""
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

    case "select":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
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
              </S.SelectInput>
            );
          }}
        />
      );

    case "file":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={rules}
          shouldUnregister={shouldUnregister}
          render={({ field, formState: { errors } }) => {
            return (
              <S.FileInput
                helperText={errors[name]?.message as string}
                type="file"
                {...options}
                name={field.name}
                // cannot modify file input value due to security reasons.
                // so handle the change in memory
                // value={field.value}
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
                value={field.value ? field.value : selected}
                ref={field.ref}
                onChange={(event: any, newValue: any) => {
                  setSelected(newValue);
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
