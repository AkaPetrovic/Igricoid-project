//[gameId] je dinamican folder, cija stranica index.js ce se ucitati za razlicite linkove koji slede localhost:3000/
//Next.js useRouter hook nam omogucava da se krecemo izmedju stranica koje se nalaze u pages folderu
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CommentList from "../../components/CommentList";
import ReviewDetail from "../../components/ReviewDetail";
import Head from "next/head";

export default function DetaljnijePage() {
  //pratimo state za podatke o review-ovima, kao i o kometarima, jer su nam oba potrebna
  const [podaciZaReviews, setPodaciZaReviews] = useState("");
  const [podaciZaKomentare, setPodaciZaKomentare] = useState("");

  //kreiramo ruter, koji nam moze obezbediti neophodne podatke u daljem delu koda
  const router = useRouter();
  //praviPodatak nam sluzi da skladistimo podatke za tacno onaj review koji nam je od znacaja
  //podaci nam sluze da skladistimo sve moguce podatke o review-ovima
  let podaci, praviPodatak;

  useEffect(() => {
    setPodaciZaReviews(localStorage.getItem("reviews"));
    setPodaciZaKomentare(localStorage.getItem("comments"));
  }, []);

  //u sledecoj proveri preko router.query.gameId mi uzimamo link iz address bar-a koji sledi nakon localhost:3000/ i koristimo ga za proveru
  //pravi podatak ce biti onaj ciji je id jednak gameId-u koji se koristi kao link
  if (router.query.gameId !== undefined && podaciZaReviews != "") {
    podaci = JSON.parse(podaciZaReviews);
    podaci.map((podatak) => {
      if (podatak.id == router.query.gameId) {
        praviPodatak = podatak;
      }
    });
  }

  return (
    <>
      <Head>
        <title>{praviPodatak !== undefined ? praviPodatak.naslov : ""}</title>
        <meta
          name="description"
          content="Detaljniji opis o igricama na koje postoje recenzije na nasem sajtu"
        />
      </Head>
      <div>
        {praviPodatak !== undefined && <ReviewDetail podaci={praviPodatak} />}
        {podaciZaKomentare != "" && <CommentList podaci={podaciZaKomentare} />}
      </div>
    </>
  );
}
