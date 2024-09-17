import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const FloatingFormContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "10%",
    left: "-30%",
    width: "500px",
    height: "500px",
    backgroundColor: "#f1c40f",
    borderRadius: "50%",
    zIndex: -1,
    opacity: 0.3,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-20%",
    right: "-40%",
    width: "600px",
    height: "600px",
    backgroundColor: "#3498db",
    borderRadius: "50%",
    zIndex: -1,
    opacity: 0.2,
  },
}));

const FloatingCard = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1)", // Smooth shadow
  zIndex: 1, // Make it float over background elements
  transform: "translateY(-30px)",
}));

export default function SignIn(props) {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [companyError, setCompanyError] = React.useState(false);
  const [companyErrorMessage, setCompanyErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  // const [name, setName] = React.useState("");
  // 
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      // setName(data.get("name"))
      await storeCookies(data);
      navigate("/home");
    } else {
      console.error("Validation failed");
    }
  };

  const storeCookies = (data) => {
    console.log(data.get("email"), "chekcing")
    Cookies.set("email", data.get("email") !== "" ? data.get("email") : "test");
    Cookies.set("company", data.get("company") !== "" ? data.get("company") : "test");
    Cookies.set("name", data.get("name"));
  };

  const validateInputs = () => {
    // const email = document.getElementById("email");
    // const company = document.getElementById("company");
    const name = document.getElementById("name");

    let isValid = true;

    // if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    //   setEmailError(true);
    //   setEmailErrorMessage("Please enter a valid email address.");
    //   isValid = false;
    // } else {
    //   setEmailError(false);
    //   setEmailErrorMessage("");
    // }

    // if (!company.value || company.value.length < 6) {
    //   setCompanyError(true);
    //   setCompanyErrorMessage("Company must be at least 6 characters long.");
    //   isValid = false;
    // } else {
    //   setCompanyError(false);
    //   setCompanyErrorMessage("");
    // }

    if (!name.value) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  // console.log(name, "singiin")
  // React.useEffect(() => {
  //   // const email = Cookies.get("email");
  //   // const company = Cookies.get("company");

  //   if (name !== undefined) {
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <FloatingFormContainer>
      <FloatingCard>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            margin: "0 0 10px 0",
            color: "#333",
            textAlign: "center",
          }}
        >
          Absyz
        </Typography>
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
          <FormControl>
            <FormLabel
              htmlFor="email"
              sx={{ fontSize: "1.2rem", color: "#666" }}
            >
              Email
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="name"
              sx={{ fontSize: "1.2rem", color: "#666" }}
            >
              Name
            </FormLabel>
            <TextField
              error={nameError}
              helperText={nameErrorMessage}
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="company"
              sx={{ fontSize: "1.2rem", color: "#666" }}
            >
              Company
            </FormLabel>
            <TextField
              error={companyError}
              helperText={companyErrorMessage}
              name="company"
              placeholder="Company"
              type="text"
              id="company"
              required
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3498db",
              color: "#fff",
              borderRadius: "30px",
              padding: "12px",
              "&:hover": {
                backgroundColor: "#2980b9",
              },
            }}
          >
            Let&apos;s Get Started
          </Button>
        </Box>
      </FloatingCard>
    </FloatingFormContainer>
  );
}
