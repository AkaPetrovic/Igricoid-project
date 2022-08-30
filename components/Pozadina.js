import classes from "./Pozadina.module.css";
//Pozadina je komponenta koja se prikazuje kada se klikne na "Log in" u navigaciji i ona prekriva sadrzaj stranice
export default function Pozadina(props) {
  return <div onClick={props.klik} className={classes.pozadina}></div>;
}
