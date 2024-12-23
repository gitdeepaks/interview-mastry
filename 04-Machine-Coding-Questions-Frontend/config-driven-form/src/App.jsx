import "./App.css";
import * as z from "yup";
import Form from "./components/Form";
// import Form from "./components/Form";

function App() {
  const schema = [
    {
      component: "TEXT_FIELD",
      name: "name",
      label: "Your Name",
      isRequired: true,
      validate: z.string().required("Name is required"),
      type: "text",
    },
    {
      component: "TEXT_FIELD",
      name: "email",
      label: "Your Email",
      isRequired: true,
      validate: z.string().email("Invalid Email").required("Email is required"),
      type: "text",
    },
    {
      component: "TEXT_FIELD",
      name: "password",
      label: "Password",
      isRequired: true,
      validate: z
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      type: "password",
    },
    {
      component: "TEXT_FIELD",
      name: "confirmPassword",
      label: "Confirm Password",
      isRequired: true,
      validate: z
        .string()
        .oneOf([z.ref("password")], "Password must match")
        .required("Confirm Password is required"),
      type: "password",
    },
    {
      component: "RADIO_BUTTON",
      name: "gender",
      label: "Gender",
      isRequired: true,
      options: ["Male", "Female", "Other"],
      validate: z.string().required("Selecting a gender is required"),
    },
    {
      component: "DATE_PICKER",
      name: "birthdate",
      label: "Date of Birth",
      validate: z.date(),
    },
    {
      component: "SLIDER",
      name: "rating",
      label: "Rating",
      minValue: 1,
      maxValue: 5,
      validate: z
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be not more than 5"),
    },
    {
      component: "CHECKBOX",
      name: "accept-terms",
      isRequired: true,
      label: "I Accept the terms and condition",
      validate: z
        .boolean()
        .oneOf([true], "You must accept terms and conditions")
        .required("Please accept terms and condition"),
    },
  ];

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className="App">
      <h1>Config Driven Form</h1>

      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  );
}
4;
export default App;
