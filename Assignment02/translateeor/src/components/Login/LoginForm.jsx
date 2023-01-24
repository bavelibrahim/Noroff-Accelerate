import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";


const unConfig = {
  required: true,
  minLength: 2,
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [ loading, setLoading ] = useState(false)

  const onSubmit = async ({ username }) => {
    const [error, user] = await loginUser(username)
    console.log('Error: ', error)
    console.log('User: ', user);
  };

  return (
    <>
      <h2>Please type in your name:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="username">Username: </label>
          <input type="text" {...register("username", unConfig)}></input>
        </fieldset>
        <button type="submit" disabled={ loading } >Continue</button>

        { loading && <p>Logging in...</p>}
      </form>
    </>
  );
};

export default LoginForm;
