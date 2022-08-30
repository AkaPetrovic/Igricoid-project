//Pocetna stranica i odmah ispod su importi
import CreateAccForm from "../components/CreateAccForm";
import Head from "next/head";

export default function CreateAccPage() {
  function dodajNoviHandler(userPodaci) {//funkcija dodajNoviHandler dobija novi JavaScript objekat kao parametar od funkcije koja se nalazi u komponenti Form
    let users = JSON.parse(localStorage.getItem("users"));//ovde belezimo trenutno stanje iz localStorage-a u promenljivu users
    if (users === null) {//provera u slucaju da ne postoji nijedan user
      users = [];
    }
    users.push(userPodaci);//funkcija push() dodaje novi element na kraj niza
    localStorage.setItem("users", JSON.stringify(users));//update-ujemo stanje na localStorage-u pomocu funkcije setItem()
  }
  return (
    <>
      <Head>
        <title>Kreiranje naloga</title>
        <meta
          name="description"
          content="Kreirajte nalog na nasem sajtu"
        />
      </Head>
      <div>
        <h1>Kreiranje naloga</h1>
        <CreateAccForm dodavanjeUsera={dodajNoviHandler} />{/*Ucitavamo komponentu CreateAccForm i predaje joj se pokazivac na funkciju koja se zove dodajNoviHandler*/}
      </div>
    </>
  );
}
