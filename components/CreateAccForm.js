import classes from "./CreateAccForm.module.css";
import { useRef } from "react";

export default function CreateAccForm(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const unetoUsername = usernameInputRef.current.value;
    const unetoPassword = passwordInputRef.current.value;
    let id;
    let users = JSON.parse(localStorage.getItem("users"));
    if(users === null){
      id = 1;
    }else{
      id = users[users.length - 1].id + 1;
    }
    const userPodaci = {
      id: id,
      username: unetoUsername,
      password: unetoPassword,
      isLoggedIn: false
    }
    props.dodavanjeUsera(userPodaci);
    usernameInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }
  return (
    <div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.fieldContainer}>
          <label>Username</label>
          <input
            required
            className={classes.polje}
            type="text"
            ref={usernameInputRef}
          />
        </div>
        <div className={classes.fieldContainer}>
          <label>Password</label>
          <input
            required
            className={classes.polje}
            type="text"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.submitDiv}>
          <button className={classes.submitDugme}>Finish</button>
        </div>
      </form>
    </div>
  );
}
