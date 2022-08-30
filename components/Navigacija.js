import Link from "next/link";
import classes from "./Navigacija.module.css";
import { useState, useContext, useEffect } from "react";
import Pozadina from "./Pozadina";
import LogIn from "./LogIn";
import LogInContext from "../store/log-in-context";
import Image from "next/image";

export default function Navigacija() {
  //koristi se kontekst za izmenu sadrzaja u navigaciji
  const LogInCtx = useContext(LogInContext);
  //u promenljivoj ulogovan se cuva podatak o tome da li postoji korisnik koji je ulogovan
  const ulogovan = LogInCtx.loggedIn;

  //pratimo state za korisnike
  const [users, setUsers] = useState();
  //pratimo state za promenljivu otvorenDropdown
  const [otvorenDropdown, setOtvorenDropdown] = useState(false);//na pocetku nije otvoren dropdown meni
  //pratimo state za promenljivu postavljenaPozadina
  const [postavljenaPozadina, setPostavljenaPozadina] = useState(false);//na pocetku nije postavljena pozadina

  //useEffect() ucitava podatke za korisnike pri drugom ucitavanju stranice
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);

  //funkcija za izlogovanje korisnika sa sajta
  function logOutHandler() {
    //poziva se funkcija u log-in-context.js fajlu koja sluzi da izloguje korisnika
    LogInCtx.logsOut();
    //proverava se koji korisnik je bio ulogovan i onda se vrednost user.isLoggedIn postavlja na false
    users.map((user) => {
      if (user.isLoggedIn) {
        user.isLoggedIn = false;
      }
    });
    //update-uje se lista korisnika u localStorage-u
    localStorage.setItem("users", JSON.stringify(users));
  }

  //funkcije za otvaranje i zatvaranje dropdown menija
  function zatvoriDropdown() {
    setOtvorenDropdown(false);
  }
  function otvoriDropdown() {
    setOtvorenDropdown(true);
  }

  //funkcije koje postavljaju ili sklanjaju pozadinu
  function logInClickHandler() {
    setPostavljenaPozadina(true);
  }
  function pozadinaClickHandler() {
    setPostavljenaPozadina(false);
  }
  function createAccClickHandler() {
    setPostavljenaPozadina(false);
  }
  function ikonicaClickHandler() {
    setPostavljenaPozadina(false);
  }
  function uspesanLoginHandler() {
    setPostavljenaPozadina(false);
  }
  return (
    <>
      <nav className={classes.nav}>
        {/*Logo sajta*/}
        <div>
          <b>Igricoid</b>
        </div>
        {/*Linkovi ka drugim stranicama na sajtu*/}
        <div>
          <li className={classes.item}>
            <Link href={"/"}>Početna</Link>
          </li>
          <li className={classes.item}>
            <Link href={"/dodaj-novi"}>Dodaj Novi</Link>
          </li>
        {/*U zavisnosti od toga da li je ulogovan neki korisnik sledeci element u navigaciji ce se ili prikazati ili sakriti*/}
          {ulogovan ? (
            <div className={classes.dropdownOption}>
              <div onClick={otvoriDropdown}>
                <Image src="/../public/user.png" width="24" height="24" />
                <div className={classes.desniItem}>
                  {LogInCtx.usernameKorisnika}
                </div>
              </div>
              {/*Proverava se da li treba da bude otvoren ili zatvoren dropdown meni i u zavisnosti od toga se on ili prikazuje ili sakriva*/}
              {otvorenDropdown && (
                <div
                  onClick={() => {
                    logOutHandler();
                    setOtvorenDropdown(false);
                  }}
                  onMouseLeave={zatvoriDropdown}
                  className={classes.dropdownMenu}
                >
                  <div>Logout</div>
                </div>
              )}
            </div>
          ) : (
            <li onClick={logInClickHandler} className={classes.desniItem}>
              Log in
            </li>
          )}


          
        </div>
      </nav>
      {/*U zavisnosti od vrednosti postavljenaPozadina se pozadina i Log in modal prikazuju ili ne*/}
      {postavljenaPozadina && <Pozadina klik={pozadinaClickHandler} />}
      {postavljenaPozadina && (
        <LogIn
          klikCreateAcc={createAccClickHandler}
          klikIkonica={ikonicaClickHandler}
          zatvori={uspesanLoginHandler}
        />
      )}
    </>
  );
}
