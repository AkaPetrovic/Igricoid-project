//React "context" je posebna vrsta React komponente koja pruza podatke drugim komponentama i menja te podatke, sto izaziva promene i na drugim mestima na sajtu
import { createContext, useState, useEffect } from "react";

//kreiramo context preko createContext React hook-a
//unutar njega definisemo vrednosti koje cemo pratiti i funkcije za menjanje sadrzaja
const LogInContext = createContext({
  usernameKorisnika: "",
  loggedIn: false,
  logsIn: () => {},
  logsOut: () => {},
});

export function LogInContextProvider(props) {
  //preko useEffect hook-a ucitavamo podatke o korisnicima tek u drugom ucitavanju stranice
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);

  //pratimo state promenljive users, u kojoj se nalaze korisnici
  const [users, setUsers] = useState();
  //state koji prati da li je korisnik ulogovan
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //state koji prati username ulogovanog korisnika
  const [usernameUlogovanog, setUsernameUlogovanog] = useState("");

  //u narednoj proveri samo u trenutku kada nam se ucitaju korisnici izvrsavamo naredni kod
  if (users !== undefined && users !== null && usernameUlogovanog === "") {
    users.map((user) => {
      //proverava se da li postoji korisnik koji je ostao ulogovan od ranije
      if (user.isLoggedIn) {
        //postavlja se da je korisnik ulogovan
        setIsLoggedIn(true);
        //belezi se username ulogovanog korisnika
        setUsernameUlogovanog(user.username);
      }
    });
  }

  //funkcija za izmenu state-ova koji prate da li je korisnik ulogovan i username ulogovanog korisnika
  function userLogsInHandler(username) {
    setIsLoggedIn(true);
    setUsernameUlogovanog(username);
  }

  //funkcija koja se pokrece kada se korisnik izloguje sa sajta
  function userLogsOutHandler() {
    setIsLoggedIn(false);
  }

  //context objekat sluzi za izmenu sadrzaja konteksta
  const context = {
    usernameKorisnika: usernameUlogovanog,
    loggedIn: isLoggedIn,
    logsIn: userLogsInHandler,
    logsOut: userLogsOutHandler,
  };

  return (
    <LogInContext.Provider value={context}>{/*izmenjen kontekst se predaje preko value atributa*/}
      {props.children}{/*ovo obuhvata sve elemente koji su obavijeni LogInContextProvider-om*/}
    </LogInContext.Provider>
  );
}
export default LogInContext;
