//Pocetna stranica i odmah ispod su importi
import ReviewList from "../components/ReviewList"; //importujemo ReviewList komponentu
import { useState, useEffect } from "react";//importujemo useState i useEffect React hook-ove
import Head from "next/head";//importujemo Head komponentu iz next/head

export default function HomePage() {
  const [podaciZaReviews, setPodaciZaReviews] = useState("");//kreiramo pocetni state za potrebe podataka o review-ovima

  useEffect(() => {//koristimo useEffect da bismo uradili nesto u drugom ucitavanju stranice, pomocu [] kao drugog parametra
    setPodaciZaReviews(localStorage.getItem("reviews"));//preko localStorage-a cuvamo podatke koje koristimo u aplikaciji, a ovde update-ujemo state za podatke o review-ovim
  }, []);

  return (
    <div>
       <>
        <Head>{/*Head komponenta nam pomaze da uvrstimo podatke u <head> element na stranici, kako bismo browser-u dostavili dodatne podatke o nasim stranicama*/}
          <title>Igricoid</title>{/*Naslov u kartici u browser-u*/}
          <meta
            name="description"
            content="Pregledajte recenzije na najnovije i najpopularnije igrice"
          />{/*opis podataka stranice preko <meta> taga*/}
        </Head>
        <h1>Svi review-ovi</h1>
        {/*U okviru {} zagrada ide JavaScript kod koji treba da se izvrsi*/}
        {/*moramo da vrsimo proveru s obzirom da je podaciZaReviews jednak 0 u prvom ucitavanju dok se useEffect ne izvrsi*/}
        {podaciZaReviews != "" && <ReviewList podaci={podaciZaReviews} />}
      </>
    </div>
  );
}
