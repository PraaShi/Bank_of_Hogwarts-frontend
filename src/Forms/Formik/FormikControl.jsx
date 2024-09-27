import React from "react";

import Input from "./field/Input";
import Textarea from "./field/Textarea";
import CheckBox from "./field/CheckBox";
import CustomSelect from "./field/Select";
import DatePicker from "./field/DatePicker";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <CustomSelect {...rest} />;
    // case 'radio':
    //     return <Radio {...rest} />
    case "checkbox":
      return <CheckBox {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
