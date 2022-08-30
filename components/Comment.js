import classes from "./Comment.module.css";
//ova komponenta predstavlja pojedinacni komentar na nekom review-u
export default function Comment(props) {
  return (
    <div className={classes.div}>
      <h2>{props.autor}</h2>
      <p>{props.tekst}</p>
    </div>
  );
}
