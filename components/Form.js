import classes from "./Form.module.css";
import { useRef } from "react";

function FormaNovi(props) {
  //kreiraju se reference na input polja u formi
  const naslovInputRef = useRef();
  const slikaInputRef = useRef();
  const kratakOpisInputRef = useRef();
  const opisInputRef = useRef();
  //funkcija koja se poziva u slucaju submitovanja forme
  function submitovanje(event) {
    //sprecava se ponovno ucitavanje stranice u slucaju submitovanja, sto je podrazumevana aktivnosti
    event.preventDefault();
    //beleze se podaci uneti u input poljima u odgovarajuce promenljive
    const unetoNaslov = naslovInputRef.current.value;
    const unetoSlika = slikaInputRef.current.value;
    const unetoKratakOpis = kratakOpisInputRef.current.value;
    const unetoOpis = opisInputRef.current.value;
    //kreira se id za review
    const id = String(unetoNaslov).toLowerCase();
    //kreira se novi JS objekat koji predstavlja novi review koji se dodaje
    const reviewPodaci = {
      id: id,
      naslov: unetoNaslov,
      slika: unetoSlika,
      kratakOpis: unetoKratakOpis,
      opis: unetoOpis,
    };
    //brisu se upisane vrednosti u input poljima, sto ukazuje na ispravan unos podatka
    naslovInputRef.current.value = "";
    slikaInputRef.current.value = "";
    kratakOpisInputRef.current.value = "";
    opisInputRef.current.value = "";
    //poziva se funkcija dodajNoviHandler iz index.js fajla koji je predao pokazivac na ovu funkciju prilikom ucitavanja Form komponente
    props.dodajNovi(reviewPodaci);
  }
  return (
    <div>
      {/*Forma za upisivanje potrebnih podataka o novom Review-u*/}
      <form className={classes.forma} onSubmit={submitovanje}>
        {/*Label-i za pojedinacna polja*/}
        <div className={classes.formContainer}>
          <label className={classes.label}>Naslov*</label>
          <label className={classes.label}>Slika*</label>
          <label className={classes.label}>Kratak opis*</label>
          <label className={classes.label}>Opis*</label>
        </div>
        {/*Input polja se nalaze u sledecem <div> tagu*/}
        <div className={classes.formContainer}>
          {/*Kako bi se kreirala referenca svaki element za koji se ona kreira ima ref atribut*/}
          <input
            required
            type="text"
            className={classes.polje}
            ref={naslovInputRef}
          />
          <input
            required
            type="text"
            className={classes.polje}
            ref={slikaInputRef}
          />
          <input
            required
            type="text"
            className={classes.polje}
            ref={kratakOpisInputRef}
          />
          <textarea
            required
            rows="5"
            className={classes.polje}
            ref={opisInputRef}
          ></textarea>
        </div>
        <div className={classes.submitContainer}>
          {/*Submit dugme*/}
          <button className={classes.submitDugme}>Submit</button>
        </div>
      </form>
    </div>
  );
}
export default FormaNovi;
