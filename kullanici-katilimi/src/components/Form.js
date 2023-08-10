import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Button, Form, Label, Input, FormFeedback } from "reactstrap";
import axios from "axios";

const initialData = {
  name: "",
  surname: "",
  email: "",
  password: "",
  terms: false,
};
const LoginForm = () => {
  const [formState, setFormState] = useState({ initialData });
  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    terms: false,
  });

  const [isFormValid, setFormValid] = useState(false);

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
  });

  const [kullanicilar, setKullanicilar] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(function (response) {
        console.log("Form Submit Edildi! ", response.data);
        setKullanicilar([...kullanicilar, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const inputChange = (e) => {
    const { type, name, value, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormState({
      ...formState,
      [name]: inputValue,
    });

    validateFormField(e);
  };

  const validateFormField = (e) => {
    const { type, name, value, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    Yup.reach(formSchema, name)
      .validate(inputValue)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => setFormValid(valid));
  }, [formState]);

  useEffect(() => {
    console.log("[Form validation error state updated]", formErrors);
  }, [formErrors]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          Name
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            onChange={inputChange}
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
            onChange={inputChange}
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
            onChange={inputChange}
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
            onChange={inputChange}
            invalid={!!formErrors.password}
          />
          <FormFeedback>{formErrors.password}</FormFeedback>
        </Label>
        <br />
        <Label htmlFor="checkbox">
          Terms
          <Input
            onChange={inputChange}
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
      <div>
        {kullanicilar.map((k, i) => {
          return (
            <div key={i}>
              {k.name} - {k.surname} - {k.email}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LoginForm;

/* - [ ] İsim (ismi, soyismi)
- [ ] Email
- [ ] Şifre
- [ ] Kullanım Şartları (Terms of Service) (checkbox)
- [ ] Gönder butonu (formu göndermek için). */
