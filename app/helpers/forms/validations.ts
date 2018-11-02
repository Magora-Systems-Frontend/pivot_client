export const required = value => (value ? undefined : "Field is required");

export const email = value =>
  value &&
  !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
    value
  )
    ? "Enter Correct Email"
    : undefined;
