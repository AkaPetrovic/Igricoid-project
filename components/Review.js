//Link komponenta iz Next.js nam omogucava da povezujemo stranice
//funkcionise slicno kao <a> tag u HTML-u samo sto ne izaziva slanje zahteva za novom stranicom
import Link from "next/link";
//koristimo Next.js-ovu ugradjenu podrsku za CSS module koji se ogranicavaju na pojedinacne komponente
import classes from "./Review.module.css";

export default function Review(props) {
  //ovde definisemo poseban stil (izgled) koji se dodeljuje div-u koji obuhvata naslov
  //ovo se radi iz razloga sto je potrebno obezbediti posebnu pozadinsku sliku koja je razlicita za pojedinacne komponente
  const style = {
    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.slika})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  //u return delu pristupamo podacimo koje prihvatamo kao props
  return (
    <div className={classes.div}>
      <div className={classes.naslov} style={style}>
        <h1>{props.naslov}</h1>
      </div>

      <p>{props.kratakOpis}</p>

      <div className={classes.linkDiv}>
        <Link href={`/${props.id}`}>{/*Link komponenta prihvata ima href atrubut kao i <a> tag*/}
          <span className={classes.link}>Detaljnije</span>
        </Link>
      </div>
    </div>
  );
}
