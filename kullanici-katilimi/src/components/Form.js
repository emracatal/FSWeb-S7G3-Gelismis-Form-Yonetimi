import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Button, Form, Label, Input, FormFeedback } from "reactstrap";

const LoginForm = () => {
  // State for the form values
  const [formState, setFormState] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    terms: false,
  });

  // State for the error messages
  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    terms: false,
  });

  const [isFormValid, setFormValid] = useState(false);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => setFormValid(valid));
  }, [formState]);

  useEffect(() => {
    console.log("[Form validation error state updated]", formErrors);
  }, [formErrors]);

  const inputChange = (e) => {
    const { name, value, type, checked } = e.target;
    Yup.reach(formSchema, name)
      .validate(type === "checkbox" ? checked : value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    surname: Yup.string().required("Please enter your surname."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Must include email address."),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Passwords must be at least 6 characters long."),
    terms: Yup.boolean().oneOf([true], "Please accept Terms and Conditions"),
    // required isn't required for checkboxes.
  });

  return (
    <Form onSubmit={() => {}}>
      <Label htmlFor="name">
        Name
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          invalid={!!formErrors.name}
        />
        <FormFeedback>{formErrors.name}</FormFeedback>
      </Label>
      <br />
      <Label htmlFor="surname">
        Surname
        <Input
          id="surname"
          type="text"
          name="surname"
          placeholder="Surname"
          invalid={!!formErrors.surname}
        />
        <FormFeedback>{formErrors.surname}</FormFeedback>
      </Label>
      <br />
      <Label htmlFor="user-mail">
        Email
        <Input
          id="user-mail"
          type="email"
          name="email"
          placeholder="Email adress"
          invalid={!!formErrors.email}
        />
        <FormFeedback>{formErrors.email}</FormFeedback>
      </Label>
      <br />
      <Label htmlFor="user-pass">
        Password
        <Input
          id="user-pass"
          type="password"
          name="password"
          placeholder="Password"
          invalid={!!formErrors.password}
        />
        <FormFeedback>{formErrors.password}</FormFeedback>
      </Label>
      <br />
      <Label htmlFor="checkbox">
        Terms
        <Input
          type="checkbox"
          id="checkbox"
          name="terms"
          invalid={!!formErrors.terms}
        />
        <FormFeedback>{formErrors.terms}</FormFeedback>
      </Label>
      <br />
      <Button type="submit" disabled={!isFormValid}>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;

/* - [ ] İsim (ismi, soyismi)
- [ ] Email
- [ ] Şifre
- [ ] Kullanım Şartları (Terms of Service) (checkbox)
- [ ] Gönder butonu (formu göndermek için). */
