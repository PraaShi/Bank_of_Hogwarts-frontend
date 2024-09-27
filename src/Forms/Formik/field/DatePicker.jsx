import { ErrorMessage, Field } from "formik";
import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextError from "../TextError";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const ChakraInput = React.forwardRef(({ onClick, ...props }, ref) => (
  <Input ref={ref} onClick={onClick} {...props} />
));

function DatePicker(props) {
  const { name, label, fieldStyle, placeholder, icon, iconSize, ...rest } = props;

  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;

        return (
          <FormControl
            isInvalid={!!form.errors[name] && !!form.touched[name]}
            className={fieldStyle}
          >
            {icon && (
              <img src={icon} alt={name} width={iconSize} height={iconSize} />
            )}

            <p>{placeholder}</p>
            <DateView
              id={name}
              {...field}
              {...rest}
              closeOnScroll={true}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              // showTimeSelect
              // timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy"
              wrapperClassName=".datePickerCustom"
              customInput={<ChakraInput />}
            />
            {typeof form.errors[name] === "string" && (
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
}

export default DatePicker;
