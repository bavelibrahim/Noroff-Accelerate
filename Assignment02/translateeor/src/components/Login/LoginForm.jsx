import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";
import { storageSave } from "../../utils/storage";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const unConfig = {
  required: true,
  minLength: 2,
};

const LoginForm = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  //! These are the local states
  const [ loading, setLoading ] = useState(false)
  const [ apiError, setApiError ] = useState(false)

  //! These are side effects
  useEffect(() => {
    if (user !== null){
      navigate('profile')
    }
  }, [ user, navigate])

  //! These are Event Handlers
  const onSubmit = async ({ username }) => {
    setLoading(true)
    const [error, userResponse] = await loginUser(username)
    if (error !== null){
      setApiError(error)
    }
    if (userResponse !== null) {
      storageSave('user-transl', userResponse)
      setUser(userResponse)
    }
    setLoading(false)

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
        { apiError && <p>{ apiError }</p>}
      </form>
    </>
  );
};

export default LoginForm;
