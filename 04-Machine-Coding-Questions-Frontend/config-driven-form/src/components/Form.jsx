/* eslint-disable react/prop-types */
import React from "react";
import FormField from "./FormField";
import * as z from "yup";

const Form = ({ schema = [], onSubmit = () => {} }) => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validationSchema = z.object().shape(
    schema.reduce((acc, field) => {
      if (field.validate) {
        acc[field.name] = field.validate;
      }

      return acc;
    }, {})
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(formData);
    } catch (error) {
      const validationError = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});

      setErrors(validationError);
    }
  }
  function handleChange(name, value) {
    setFormData({ ...formData, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field, index) => {
        return (
          <FormField
            key={index}
            field={{
              ...field,
              error: errors[field.name],
            }}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
