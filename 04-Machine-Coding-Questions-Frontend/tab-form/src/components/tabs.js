import { Profile } from "./Profile";
import { Interests } from "./Interests";
import { Settings } from "./Settings";

export const tabs = [
  {
    name: "Profile",
    component: Profile,
    validate: (data, setError) => {
      const err = {};
      if (!data.name || data.name.length < 2) {
        err.name = "Name is not valid";
      }
      if (!data.age || data.age < 18) {
        err.age = "Age is not valid";
      }
      if (!data.email || data.email.length < 2) {
        err.email = "Email is not valid";
      }

      setError(err); // Set the errors in the parent component's state
      return Object.keys(err).length === 0; // Return true if no errors
    },
  },
  {
    name: "Interests",
    component: Interests,
    validate: (data, setError) => {
      const err = {};
      if (data.interest.length < 1) {
        err.interest = "Select at least 1 interest";
      }
      setError(err);
      return Object.keys(err).length === 0;
    },
  },
  {
    name: "Settings",
    component: Settings,
    validate: (data, setError) => {
      // No validation for Settings
      return true;
    },
  },
];
