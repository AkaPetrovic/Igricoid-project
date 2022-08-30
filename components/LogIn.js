import classes from "./LogIn.module.css";
import { useRef, useState, useContext } from "react";
import Link from "next/link";
import LogInContext from "../store/log-in-context";
import Image from "next/image";

export default function LogIn(props) {
  //Belezimo trenutnu vrednosti podataka u kontekstu vezanom za logovanje korisnika
  const LogInCtx = useContext(LogInContext);

  //pratimo state promenljive postojiUser
  const [postojiUser, setPostojiUser] = useState(false); //na pocetku ova vrednost je false
  //pratimo state promenljive sifraJeDobra
  const [sifraJeDobra, setSifraJeDobra] = useState(false); //na pocetku ova vrednost je false
  //pratimo state promenljive pokusanLogin
  const [pokusanLogin, setPokusanLogin] = useState(false); //na pocetku ova vrednost je false

  //pravimo reference na input polja za username i password
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  //funkcija koja se poziva klikom na "Log in" dugme pri dnu modala
  function logInHandler() {
    //u promenljivima se beleze odgovarajuce vrednosti koje je korisnik uneo u input polja, uz pomoc referenci
    const unetoUsername = usernameInputRef.current.value;
    const unetoPassword = passwordInputRef.current.value;
    //promenljiva postoji nam sluzi za proveru da li postoji username koji je korisnik uneo
    let postoji = false;
    //promenljiva sifraDobra nam sluzi za proveru da li je sifra koju je korisnik uneo dobra
    let sifraDobra = false;
    //promenljiva uspesanLogin nam sluzi za proveru da li se korisnik uspesno ulogovao na sajt
    let uspesanLogin = false;
    //uzimaju se postojeci podaci o korisnicima iz localStorage-a
    const users = JSON.parse(localStorage.getItem("users"));
    //ukoliko postoje neki korisnici cije podatke imamo zabelezene izvrsice se kod obuhvacen if naredbom
    if (users !== undefined && users !== null) {
      users.map((user) => {
        //za svakog korisnika se proverava da li je njegov username jednak username-u koji je unesen u odgovarajuce input polje
        if (user.username === unetoUsername) {
          //postoji se stavlja na true ukoliko taj username postoji u localStorage-u
          postoji = true;
          if (user.password === unetoPassword) {
            //sifraDobra se stavlja na true ukoliko je dobar i password koji je korisnik uneo nakon dobro unetog username-a
            sifraDobra = true;
          }
        }
      });
    }
    //ukoliko na kraju i postoji ima vrednost true, kao i sifraDobra, onda se postavlja uspesanLogin na true
    if (postoji && sifraDobra) {
      setPostojiUser(true);
      setSifraJeDobra(true);
      uspesanLogin = true;
    } else if (postoji && sifraDobra == false) {
      setPostojiUser(true);
      setSifraJeDobra(false);
    } else if (postoji == false && sifraDobra == false) {
      setPostojiUser(false);
      setSifraJeDobra(false);
    }
    setPokusanLogin(true);
    //ukoliko je uspesanLogin true, onda se izvrsava sledeci kod
    if (uspesanLogin) {
      //poziva se funkcija userUlogovanHandler
      userUlogovanHandler();
      //pristupa se funkciji logsIn iz konteksta
      //predaje joj se odgovarajuca vrednost, a onda dalje u log-in-context.js fajlu poziva potrebne funkcije na koje se odnosi
      LogInCtx.logsIn(unetoUsername);
      //poziva se funkcija za zatvaranje log in modala i pozadine
      zatvoriHandler();
    }
  }

  //funkcija userUlogovanHandler se poziva ukoliko se korisnik uspesno ulogovao
  function userUlogovanHandler() {
    //preuzima se lista korisnika iz localStorage-a
    const users = JSON.parse(localStorage.getItem("users"));
    //pamti se vrednost koju je korisnik uneo u odgovarajuce input polje
    const unetoUsername = usernameInputRef.current.value;

    //pronalazi se korisnik koji se ulogovao preko username-a i postavlja mu se vrednost user.isLoggedIn na true
    users.map((user) => {
      if (user.username === unetoUsername) {
        user.isLoggedIn = true;
      }
    });

    //update-uje se vrednost liste korisnika u localStorage-u
    localStorage.setItem("users", JSON.stringify(users));
  }

  //funkcija za sprecavanje ponovnog ucitvanja stranice prilikom klika na "Log in" dugme
  function preventHandler(event) {
    event.preventDefault();
  }

  //funkcija za zatvaranje log in modala i sklanjanje pozadine
  function zatvoriHandler() {
    setTimeout(props.zatvori, 1000);//poziva se funkcija koja zatvara log in modal i sklanja pozadinu, nakon 1 sekunde
  }

  return (
    <>
      <div className={classes.logInDiv}>
        {/*Ikonica koja sluzi za zatvaranje modala i sklanjanje pozadine*/}
        <div className={classes.imageWrapper}>
          <Image
            onClick={props.klikIkonica}
            className={classes.ikonica}
            src="/../public/ikonica_x.png"
            width="27"
            height="27"
          />
        </div>

        {/*Forma za unos kredencijala prilikom procesa logovanja korisnika*/}
        <form className={classes.form} onSubmit={preventHandler}>
          {/*Label-i uz odgovarajuca polja za unos username-a u password-a*/}
          <div className={classes.logInFieldContainer}>
            <label>Username</label>
            <input
              className={classes.polje}
              type="text"
              ref={usernameInputRef}
            />
          </div>
          <div className={classes.logInFieldContainer}>
            <label>Password</label>
            <input
              className={classes.polje}
              type="text"
              ref={passwordInputRef}
            />
          </div>

          {/*Provera da li su username i password koje je korisnik uneo dobri, kao i toga da li je korisnik pokusao da se uloguje od kako se pojavio log in modal*/}
          {/*Ispisuje se odgovarajuca poruka u zavisnosti od scenarija*/}
          {pokusanLogin && postojiUser && sifraJeDobra ? (
            <p className={classes.successMsg}>Uspešan login!</p>
          ) : pokusanLogin && postojiUser && sifraJeDobra == false ? (
            <p className={classes.errorMsg}>Pogrešna šifra</p>
          ) : pokusanLogin && postojiUser == false ? (
            <p className={classes.errorMsg}>Pogrešan username</p>
          ) : null}

          <div className={classes.submitDiv}>
            {/*"Log in" dugme*/}
            <button onClick={logInHandler} className={classes.submitDugme}>
              Log in
            </button>
            {/*Dugme koje korisnika vodi na stranicu za kreiranje naloga na sajtu*/}
            <div onClick={props.klikCreateAcc} className={classes.createAccDiv}>
              <Link href={"/create-acc"}>Create account</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
