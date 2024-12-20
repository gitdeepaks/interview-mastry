import "./App.css";
import * as z from "yup";

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
      name: "name",
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
      validate: z.string().email("Invalid Email").required("Email is required"),
      type: "text",
    },
  ];

  const onSubmit = (formData) => {
    console.log(`FormData is ${formData}`);
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
