import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { db } from "../../firebaseConfig"; // Adjust the path if necessary
import { collection, addDoc } from "firebase/firestore";
// Reusable FloatingFormContainer Component
const FloatingFormContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
}));

const FloatingCard = styled(Box)(({ theme }) => ({
  // width: "100%",
  // maxWidth: "500px",
  // backgroundColor: "#fff",
  // padding: theme.spacing(4),
  // borderRadius: "15px",
  // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1)",
  // zIndex: 1,
  // transform: "translateY(-30px)",
}));

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
  value,
  onChange,
  onBlur,
  ...props
}) => {
  function handleKeyDown(event) {
    const invalidKeys = ["-", "+", "."];

    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  return (
    <FormControl>
      {label && (
        <label
          htmlFor={id}
          className="text-[0.9rem] sm:!text-[1rem] mb-[2px] text-[#17233A] font-normal"
        >
          {(name === "name" || name === "company" || name === "confirm") && (
            <span style={{ color: "red" }}>*</span>
          )}{" "}
          {label}
        </label>
      )}

      {type === "radio" ? (
        <>
          <div className="flex gap-4">
            {/* Radio buttons logic */}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="confirm"
                value="yes"
                checked={value === "yes"}
                onChange={onChange}
              />
              <span className="ml-2 text-gray-800">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="confirm"
                value="no"
                checked={value === "no"}
                onChange={onChange}
                onBlur={onBlur}
              />
              <span className="ml-2 text-gray-800">No</span>
            </label>
          </div>
          {error && (
            <div className="mt-1 text-custom-red  text-[12px] ml-1">
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
          value={value}
          onChange={onChange}
          onKeyDown={name === "number" ? handleKeyDown : undefined}
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          onBlur={onBlur}
          sx={{
            margin: "4px 0",
            borderRadius: "10px",
            backgroundColor: "#fff",
            height: "40px",
            "& .MuiOutlinedInput-root": {
              height: "40px",
              padding: "0 10px",
            },
          }}
          {...props}
        />
      )}
    </FormControl>
  );
};

// Reusable Form Component
export default function SignInForm({ title = "Sign In", onSubmit, fields }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState({});
  const [radioValue, setRadioValue] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    confirm: "",
    email: "",
    number: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "number") {
      const regex = /^[0-9]*$/;

      if ((value === "" || regex.test(value)) && value.length <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (name === "name") {
      const regex = /^[A-Za-z._+ ]*$/;
      if (regex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    let errors = { ...formErrors };
    if (name === "email") {
      if (!value) {
        errors[name] = "";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        errors[name] = "Invalid email format";
      } else {
        delete errors[name];
      }
    } else if (name === "name") {
      if (!value) {
        errors[name] = "Name is required";
      } else if (!/^[A-Za-z ]*$/.test(value)) {
        errors[name] = "Invalid name format";
      } else {
        delete errors[name];
      }
    } else if (name === "company") {
      if (!value) {
        errors[name] = "Company is required";
      } else {
        delete errors[name];
      }
    } else if (name === "confirm") {
      if (!value) {
        errors[name] = "Confirmation is required";
      } else {
        delete errors[name];
      }
    } else if (name === "number") {
      if (!value) {
        errors[name] = "";
      } else if (value.length < 10) {
        errors[name] = "Phone number must have exactly 10 digits";
      } else {
        delete errors[name];
      }
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Validate the inputs
    const isValid = validateInputs(data);

    // Proceed only if validation is successful
    if (isValid) {
      onSubmit(data); // Trigger the form submission logic (assuming it's defined)
      navigate("/home"); // Redirect to /home after successful submission
    } else {
      console.error("Validation failed");
    }

    try {
      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, "users"), {
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("number"),
        company: data.get("company"),
        isSalesforce: data.get("confirm"),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const validateInputs = (data) => {
    let errors = {};

    const fieldsToValidate = ["name", "company", "confirm"];

    fieldsToValidate.forEach((field) => {
      if (!data.get(field)) {
        errors[field] = `${fields.find((f) => f.name === field)?.placeholder
          } is required`;
      }
    });

    const emailValue = data.get("email");
    if (emailValue && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue)) {
      errors["email"] = "Invalid email format";
    }

    const confirmValue = data.get("confirm");
    if (!confirmValue) {
      errors["confirm"] = "Confirmation is required";
    }
    const phoneNumber = data.get("number");
    if (phoneNumber && (phoneNumber.length < 10 || phoneNumber.length > 10)) {
      errors["number"] = "Phone number must have exactly 10 digits";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <FloatingFormContainer>
      <FloatingCard className="w-full">
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
              placeholder={field.placeholder}
              type={field.type}
              label={field.label}
              required={field.required}
              error={!!formErrors[field.name]}
              helperText={formErrors[field.name]}
              name={field.name}
              options={field.options || []}
              selectedValue={field.type === "radio" ? radioValue : undefined}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className=""
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="!w-max !mt-[0.5rem] !text-[0.9rem] sm:!text-[1rem]"
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
      </FloatingCard>
    </FloatingFormContainer>
  );
}
