import React from "react";
const Form = () => {
  return (
    <form onSubmit={() => {}}>
      <label htmlFor="name">
        Name
        <input id="name" type="text" placeholder="Name&Surname" />
      </label>
      <br />
      <label htmlFor="user-mail">
        Email
        <input id="user-mail" type="email" placeholder="Email adress" />
      </label>
      <br />
      <label htmlFor="user-pass">
        Password
        <input id="user-pass" type="password" placeholder="Password" />
      </label>
      <br />
      <label htmlFor="checkbox">
        Terms
        <input type="checkbox" id="checkbox" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Form;

/* - [ ] İsim (ismi, soyismi)
- [ ] Email
- [ ] Şifre
- [ ] Kullanım Şartları (Terms of Service) (checkbox)
- [ ] Gönder butonu (formu göndermek için). */
