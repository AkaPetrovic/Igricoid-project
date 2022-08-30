import classes from "./CommentList.module.css";
import { useRouter } from "next/router";
import Comment from "./Comment";
import { useRef, useState, useContext } from "react";
//ovde uvodimo "context" koji sadrzi podatke i funkcije za update-ovanje podataka koje ce koristiti vise komponenti
import LogInContext from "../store/log-in-context";

export default function CommentList(props) {
  //koristimo useContext React hook da bismo povezali kontekst iz log-in-context.js fajla sa promenljivom LogInCtx
  const LogInCtx = useContext(LogInContext);

  const router = useRouter();

  //useRef je React hook koji nam omogucava da napravimo referencu na neki JSX element na nasoj stranici i ta referenca se cuva u promenljivoj koja ima odredjeni naziv
  const komentarTextareaRef = useRef();

  //pratimo state prikaziErrorMsg promenljive, odnosno da li je potrebno da prikazujemo error poruku korisniku
  const [prikaziErrorMsg, setPrikaziErrorMsg] = useState(false);

  //cuvamo podatke o komentarima u podaciKom nizu objekata
  let podaciKom = JSON.parse(props.podaci);
  //sledeca if naredba nam sluzi da proverimo da li postoje komentari uopste na nasem sajtu
  if (podaciKom === null) {
    podaciKom = [];
  }
  //praviKomentari je niz u kome cemo skladistiti komentare koji su vezani za review na kome se nalazimo
  const praviKomentari = [];

  //preko sledeceg dela koda smestamo pojedine komentare iz niza svih komentara u niz praviKomentari
  if (podaciKom !== null) {
    podaciKom.map((komentar) => {
      if (komentar.id.startsWith(router.query.gameId)) { //provera da li komentar pocinje na pravi nacin
        praviKomentari[praviKomentari.length] = komentar; //dodajemo novi komentar u niz pravih komentara
      }
    });
  }

  //postojiNekiKomentar proverava da li postoje komentari koje treba prikazati na trenutnom review-u
  //to se radi preko provere duzine niza praviKomentari
  function postojiNekiKomentar() {
    let postoji = false;
    if (praviKomentari.length != 0) {
      postoji = true;
    }
    return postoji;
  }

  //vratiBrojSaKraja je funkcija koja nam vraca onaj broj koji stoji iza naslova u id-u
  //ovaj podatak nam je potreban kada odredjujemo id novog komentara
  function vratiBrojSaKraja(indeks) {
    //ova funkcija prihvata indeks na kome se nalazi komentar u nizu praviKomentari
    let stringBroj = "";
    //u sledecoj for petlji se prolazi kroz odgovarajuci string koji je id komentara i proverava se za svaki karakter da li je broj preko parseInt() funkcije
    for (let i = 0; i < praviKomentari[indeks].id.length; i++) {
      if (parseInt(praviKomentari[indeks].id[i]) > 0) {
        stringBroj = stringBroj + praviKomentari[indeks].id[i];
      }
    }
    //vraca se odgovarajuci celobrojni podatak
    return parseInt(stringBroj);
  }

  function submitovanje(event) {
    //event.preventDefault() nam omogucava da se stranica ne ucitava ponovo nakon klika na submit dugme
    event.preventDefault();

    //kreiramo referencu na <textarea> JSX element na nasoj stranici
    const unetoTekstKomentara = komentarTextareaRef.current.value;

    let max, id, idBroj;
    //da bi mogao da postavlja komentre korisnik mora biti ulogovan
    if (LogInCtx.loggedIn) {
      if (prikaziErrorMsg) {
        setPrikaziErrorMsg(false);
      }
      //proverava se da li postoje komentari koje treba ucitati za konkretan review
      if (postojiNekiKomentar()) {
        //odredjivanje maksimalnog broja u id-jevima komentara
        for (let i = 0; i < praviKomentari.length; i++) {
          let broj = vratiBrojSaKraja(i);
          if (max === undefined) {
            max = broj;
          } else if (broj > max) {
            max = broj;
          }
        }
        //kreiranje novog id-a
        idBroj = max + 1;
        id = router.query.gameId + idBroj.toString();
      } else {
        //kreiranje novog id-a u slucaju da nema prethodnih komentara
        id = router.query.gameId + "1";
      }

      //struktura novog komentara
      const noviKomentar = {
        id: id,
        autor: LogInCtx.usernameKorisnika,
        tekst: unetoTekstKomentara,
      };

      komentarTextareaRef.current.value = "";
      //dodaje se novi komentar na vec postojecu listu komentara
      podaciKom.push(noviKomentar);
      //update-uje se vrednost u localStorage-u
      localStorage.setItem("comments", JSON.stringify(podaciKom));
    } else {
      //error poruka u slucaju da korisnik nije ulogovan
      setPrikaziErrorMsg(true);
    }
  }

  return (
    <div className={classes.div}>
      <h1>Postavite komentar</h1>
      {/*forma za unos novog komentara*/}
      <form onSubmit={submitovanje}>
        {/*Prostor za unos komentara*/}
        <textarea
          className={classes.poljeZaKomentar}
          rows="5"
          ref={komentarTextareaRef}
        ></textarea>
        {/*Error poruka je prvo sakrivena, ali se prikazuje ukoliko korisnik nije ulogovan pri postavljanju komentara*/}
        {prikaziErrorMsg && (
          <p className={classes.errorMsg}>
            Morate biti ulogovani da biste postavljali komentare!
          </p>
        )}
        {/*Submit dugme*/}
        <button className={classes.submitDugme}>Postavi komentar</button>
      </form>
      {/*Kod za ucitavanje komentara na stranicu ukoliko je to potrebno*/}
      {postojiNekiKomentar() && <h1 className={classes.naslov}>Komentari</h1>}
      {podaciKom != null && praviKomentari != []
        ? praviKomentari.map((komentar) => {
            {/*Ucitavaju se pojedinacni komentari i predaju im se odgovarajuci podaci*/}
            return (
              <Comment
                key={komentar.id}
                id={komentar.id}
                autor={komentar.autor}
                tekst={komentar.tekst}
              />
            );
          })
        : null}
    </div>
  );
}
