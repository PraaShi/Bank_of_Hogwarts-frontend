import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../TextError";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Input as ChakraInput } from "@chakra-ui/react";


function Input(props) {
  const { name, label, fieldStyle,disabled, icon, iconSize,...rest } = props;
  console.log('disbaled',disabled)

  return (
    <>
      <Field name={name} disabled={disabled} >
        {({
          field,
          form,
        }) => {
          return (
            <FormControl
              isInvalid={!!form.errors[name] && !!form.touched[name]}
              className={fieldStyle}
            >
              {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
              {icon &&   <img
              src={icon}
              alt={name}
              width={iconSize}
              height={iconSize}
            />}
              <ChakraInput
                id={name}
                {...rest}
                {...field}
              />
              {typeof form.errors[name] === "string" && (
                <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
              )}
            </FormControl>
          );
        }}
      </Field>
    </>
  );
}

export default Input;
