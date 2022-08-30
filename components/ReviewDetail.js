import classes from "./ReviewDetail.module.css";
//Image komponenta u Next.js-u sluzi za optimizaciju slika i ovde je importujemo
import Image from "next/image";

export default function ReviewDetail(props) {
  return (
    <div className={classes.div}>
      {/*Image komponenta mora da ima src, height i width atribute*/}
      {<Image className={classes.slika} layout="responsive" src={`/../public/${props.podaci.slika}`} width="1280" height="720"/> }
      {<h1 className={classes.naslov}>{props.podaci.naslov}</h1>}
      {<p className={classes.opis}>{props.podaci.opis}</p>}
    </div>
  );
}
