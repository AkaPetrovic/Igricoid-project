//Ovo je stranica za dodavanje novog review-a
import Form from "../../components/Form";
import Head from "next/head";

export default function DodajNoviPage() {
  //dodajNoviHandler prihvata JS objekat koji predstavlja novi review koji treba dodati na listu
  function dodajNoviHandler(reviewPodaci) {
    //preuzima se lista postojecih review-ova
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    //provera u slucaju da ne postoji nijedan review
    if (reviews === null) {
      reviews = [];
    }
    //dodaje se novi review na postojecu listu
    reviews.push({
      id: reviewPodaci.id,
      naslov: reviewPodaci.naslov,
      slika: reviewPodaci.slika,
      kratakOpis: reviewPodaci.kratakOpis,
      opis: reviewPodaci.opis,
    });
    //update-uje se list postojecih review-ova u localStorage-u
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  return (
    <>
      <Head>
        <title>Dodajte novi review</title>
        <meta
          name="description"
          content="Stranica za dodavanjeg nove recenzije na sajt"
        />
      </Head>
      <div>
        <h1>Unesite novi review</h1>
        {/*Ucitava se Form komponenta koja predstavlja glavni element ove stranice i predaje joj se pokazivac na funkciju dodajNoviHandler*/}
        <Form dodajNovi={dodajNoviHandler} />
      </div>
    </>
  );
}
