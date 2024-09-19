import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
// import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

// Reusable FloatingFormContainer Component
// const FloatingFormContainer = styled(Box)(({ theme }) => ({
//   position: "relative",
//   width: "100%",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   overflow: "hidden",
// }));

// const FloatingCard = styled(Box)(({ theme }) => ({
//   // width: "100%",
//   // maxWidth: "500px",
//   // backgroundColor: "#fff",
//   // padding: theme.spacing(4),
//   // borderRadius: "15px",
//   // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1)",
//   // zIndex: 1,
//   // transform: "translateY(-30px)",
// }));

// Reusable FormField Component
const FormField = ({
  id,
  label,
  placeholder,
  options,
  type,
  error,
  helperText,
  required,
  selectedValue,
  name,
  onChange,
  ...props
}) =>

(
  <FormControl>
    {label && (
      <label
        htmlFor={id}
        className="text-[0.9rem] mb-[2px] text-[#17233A] font-normal"
      >
        {(name === "name" || name === "company" || name === "confirm") && <span style={{ color: "red" }}>*</span>}  {label}
      </label>
    )}

    {type === "radio" ? (
      <>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="confirm"
              value="yes"
              checked={selectedValue === 'yes'}
              onChange={onChange}
            //   className="hidden"
            />
            {/* <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center  bg-[#FFFFFF] ${selectedValue === 'yes' ? 'bg-blue-600 border-blue-600' : 'border-custom-gray-400'}`}>
        {selectedValue === 'yes' && (
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                }}
              ></div>
            )}
        </div> */}
            <span className="ml-2 text-gray-800">Yes</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="confirm"
              value="no"
              checked={selectedValue === 'no'}
              onChange={onChange}
            //   className="hidden"
            />
            {/* <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center  bg-[#FFFFFF] ${selectedValue === 'no' ? 'bg-blue-600 border-blue-600' : 'border-custom-gray-400'}`}>
          {selectedValue === 'no' && <div className="w-3 h-3 bg-white rounded-full"></div>}
        </div> */}
            <span className="ml-2 text-gray-800">No</span>
          </label>

        </div>
        {error && (
          <div className="mt-1 text-red-600 text-sm">
            {helperText}
          </div>
        )}
      </>
    ) : (
      <TextField
        id={id}
        type={type}
        required={required}
        error={error}
        helperText={helperText}
        name={name}
        fullWidth
        variant="outlined"
        placeholder={placeholder} // Only placeholder used
        sx={{
          margin: "4px 0",
          borderRadius: "10px",
          backgroundColor: "#fff",
          height: "40px", // Reduced height
          "& .MuiOutlinedInput-root": {
            height: "40px", // Adjust height of input
            padding: "0 10px", // Adjust padding for smaller height
          },
        }}
        {...props}
      />
    )}
  </FormControl>
);

// Reusable Form Component
export default function SignInForm({ title = "Sign In", onSubmit, fields }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState({});
  const [radioValue, setRadioValue] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value, "val")
    setRadioValue(event.target.value);
  };

  console.log(formErrors, "errors")

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Validate the inputs
    const isValid = validateInputs(data);

    console.log(isValid, "isValid");

    // Proceed only if validation is successful
    if (isValid) {
      onSubmit(data);  // Trigger the form submission logic (assuming it's defined)
      navigate("/home");  // Redirect to /home after successful submission
    } else {
      console.error("Validation failed");
    }
  };


  const validateInputs = (data) => {
    let errors = {};

    const fieldsToValidate = ["name", "company", "confirm"];

    fieldsToValidate.forEach((field) => {
      if (!data.get(field)) {
        errors[field] = `${fields.find(f => f.name === field)?.placeholder} is required`;
      }
    });

    // Handle radio button validation for 'confirm'
    const confirmValue = data.get("confirm");
    if (!confirmValue) {
      errors["confirm"] = "Confirmation is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  return (
    <Box sx={{
      position: "relative",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      padding: (theme) => theme.spacing(2), // Using theme.spacing
    }}>
      <Box sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: (theme) => theme.shape.borderRadius,
        padding: (theme) => theme.spacing(3),
        boxShadow: (theme) => theme.shadows[3],
      }} className="w-full">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          {fields.map((field) => (
            <FormField
              key={field.name}
              id={field.name}
              placeholder={field.placeholder} // Using placeholder instead of label
              type={field.type}
              label={field.label}
              required={field.required}
              error={!!formErrors[field.name]}
              helperText={formErrors[field.name]}
              name={field.name}
              options={field.options || []}
              selectedValue={field.type === 'radio' ? radioValue : undefined}
              onChange={field.type === 'radio' ? handleChange : undefined}
              className=""
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="!w-max !mt-[0.5rem]"
            sx={{
              backgroundColor: "#0470EF",
              color: "#fff",
              borderRadius: "30px",
              textTransform: "capitalize",
              padding: "10px 25px",
              lineHeight: "1rem !important",
              "&:hover": {
                backgroundColor: "#0470EF",
              },
            }}
          >
            Let's start
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
