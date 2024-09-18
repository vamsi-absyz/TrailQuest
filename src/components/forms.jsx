import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

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
const FormField = ({ id, placeholder, type, error, helperText, required, ...props }) => (
    <FormControl>
        <TextField
            id={id}
            type={type}
            required={required}
            error={error}
            helperText={helperText}
            fullWidth
            variant="outlined"
            placeholder={placeholder}  // Only placeholder used
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
    </FormControl>
);

// Reusable Form Component
export default function SignInForm({ title = "Sign In", onSubmit, fields }) {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = React.useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const isValid = validateInputs(data);
        console.log(isValid, "isValidisValid")

        if (isValid) {
            console.log("inif")
            onSubmit(data);
            navigate("/home");
        } else {
            console.log("inelse")
            console.error("Validation failed");
        }
    };

    const validateInputs = (data) => {
        let errors = {};
        fields.forEach((field) => {
            if (field.required && !data.get(field.name)) {
                errors[field.name] = `${field.placeholder} is required`;
            }
        });
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
                            placeholder={field.placeholder} // Using placeholder instead of label
                            type={field.type}
                            required={field.required}
                            error={!!formErrors[field.name]}
                            helperText={formErrors[field.name]}
                            name={field.name}
                            className=""
                        />
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="!w-max !mt-[1rem]"
                        sx={{
                            backgroundColor: "#0470EF",
                            color: "#fff",
                            borderRadius: "30px",
                            textTransform: "capitalize",
                            padding: "12px 25px",
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
