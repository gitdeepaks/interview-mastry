function validateEmail(email) {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegEx.test(email);
}
