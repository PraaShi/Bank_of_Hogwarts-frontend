import * as Yup from "yup";
import moment from "moment";

export const loginValidation = Yup.object({
  email: Yup.string().email("Email format mismatch").required("Email required"),
  password: Yup.string().required("Please enter the password"),
});

export const CustomerRegistorValidation = Yup.object({
  email: Yup.string().email("Email format mismatch").required("Email required"),
  password: Yup.string().required("Please enter the password"),
  confirmPassword: Yup.string()
    .required("Please confirm the password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  firstName: Yup.string().required("Please enter your first name"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Please enter your last name"),
  gender: Yup.string().required(),
  phoneNumber: Yup.string()
    .required("Please enter the phone number")
    .matches(/^[1-9][0-9]{9}$/, "Phone number Format is incorrect"),

  dob: Yup.date()
    .nullable()
    .required("Date of Birth is required")
    .test("DOB", "You must be at least 18 years old", function (value) {
      if (!value) {
        return false;
      }
      return moment().diff(moment(value), "years") >= 18;
    }),

  aadharNumber: Yup.string()
    .required("Please enter the aadhar number")
    .matches(/^[0-9]{12}$/, "Aadhar number format is incorrect"),

  pan: Yup.string()
    .required("Please enter the pan number")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Pan format is incorrect"),

  address: Yup.string().required(),
});

export const EmployeeRegistorValidation = Yup.object({
  email: Yup.string().email("Email format mismatch").required("Email required"),
  password: Yup.string().required("Please enter the password"),
  confirmPassword: Yup.string()
    .required("Please confirm the password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  phoneNumber: Yup.string()
    .required("Please enter the phone number")
    .matches(/^[1-9][0-9]{9}$/, "Phone number Format is incorrect"),

  position: Yup.string().required("Date of Birth is required"),
});

export const AccountRegistorValidation = Yup.object({
  pin: Yup.string()
    .min(4, "Must be 4 digit")
    .max(4, "Must be 4 digit")
    .required("PIN required"),
  customer: Yup.string().required("Please enter the password"),
  accounType: Yup.string().required("Please enter the phone number"),
  branch: Yup.string().required("Date of Birth is required"),
  balance: Yup.string().required("Date of Birth is required"),
});

export const FilterValidation = Yup.object({
  startDate: Yup.date()
    .required("Start Date is required")
    .max(new Date(), "It's future date"),

  endDate: Yup.date()
    .required("End Date is required")
    .max(new Date(), "It's future date")
    .when("startDate", (startDate, schema) => {
      return startDate ? schema.min(startDate, "Incorrect End Date") : schema;
    }),
  timePeriod: Yup.string(),
  type: Yup.string(),
});

export const ChangePinValidation = Yup.object({

  oldPin: Yup.string().required("Required").matches(/^[0-9]{4}$/,"Incorrect Pin"),

  newPin: Yup.string().required("Required").matches(/^[0-9]{4}$/,"set 4 digit pin") .notOneOf([Yup.ref('oldPin')], "New PIN can't be the same as the old PIN"), 
  confirmPin: Yup.string().required("Required").oneOf([Yup.ref("newPin"), null], "Passwords must match"),
});

export const RequestDeactivationValidation = Yup.object({

  pin: Yup.string().required("Required").matches(/^[0-9]{4}$/,"Incorrect Pin")
});

//Apply Loan

export const ApplyLoanValidation = Yup.object({
  loanType: Yup.string().required("Required"),

  purpose: Yup.string().required("Required")
});

export const DepositValidation = Yup.object({
  accountNumber: Yup.string().required("Required"),

  amount: Yup.string().required("Required"),

  pin: Yup.string().required("Required").matches(/^[0-9]{4}$/,"Incorrect Pin")
});

export const WithdrawValidation = Yup.object({
  accountNumber: Yup.string().required("Required"),

  amount: Yup.string().required("Required"),

  pin: Yup.string().required("Required").matches(/^[0-9]{4}$/,"Incorrect Pin")
});

export const TransferValidation = Yup.object({
  accountNumber: Yup.string().required("Required"),

  beneficiary:Yup.string().required("Required"),

  amount: Yup.string().required("Required"),

  pin: Yup.string().required("Required").matches(/^[0-9]{4}$/,"Incorrect Pin")
});

export const BeneficiaryValidation = Yup.object({
  accountName: Yup.string().required("Required"),

  accountNumber: Yup.string().required("Required"),

  branch: Yup.string().required("Required"),  
});




