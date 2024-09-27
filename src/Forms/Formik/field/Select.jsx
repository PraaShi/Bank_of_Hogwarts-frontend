import React from "react";
import { Field } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import Select from "react-select";
import { components } from "react-select";


const CustomSelect = (props) => {
  const { name, label, dropDownOptions, fieldStyle, addCategory, ...rest } = props;
  // console.log(dropDownOptions);
  // console.log(props)
  return (
    <Field name={name}>
      {({
        field,
        form,
      }) => {
        const handleChange = (option) => {
          form.setFieldValue(name, option ? option.value : "");
          // console.log("selected", option);
          if(option.label === "Add Category" && addCategory)
            addCategory();
        };

        const customStyles = {
          control: (provided, state) => ({
            ...provided,
            outline: "pink",
            width: "100%",
            height: "40px",
            backgroundColor: "#EFEFEF",
            borderColor:
              form.errors[name] && form.touched[name] ? "red" : "#718096",
            boxShadow: "none",
            "&:hover": {
              borderColor: state.isFocused
                ? "#013513"
                : form.errors[name] && form.touched[name]
                ? "red"
                : "transparent",
            },
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 100,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#fff"
              : state.isFocused
              ? "#EDF2F7"
              : "#F6F8FD",
            color: state.isSelected ? "#000" : "#000",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#000",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#718096",
          }),
        };

        return (
          <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}  className="formik-control" >
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Select
              id={name}
              className={fieldStyle}
              placeholder={props.placeholder}
              options={dropDownOptions}
              value={dropDownOptions?.find(
                (option) => option.value === field.value
              )}
              onChange={handleChange}
              styles={customStyles}
              {...rest}
            />
            {typeof form.errors[name] === "string" && (
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CustomSelect;
