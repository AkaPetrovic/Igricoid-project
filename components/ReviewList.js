import Review from "./Review";

//props je ustaljeni naziv koji se koristi u React-u da oznaci podatke koji se predaju komponentama pri njihovom ucitavanju
export default function ReviewList(props) {
  //Preko JSON.parse() uzimamo JSON string koji smo prosledili u props i konvertujemo ga u odgovarajuci JS element
  //S obzirom da je props jedan JS objekat, njegovim svojstvima pristupamo preko "."
  const podaci = JSON.parse(props.podaci);
  return (
    <div> {/*Sledeca provera sluzi da uzmemo u obzir slucaj kada nemamo nijedan review na stranici*/}
      {podaci != null
        ? podaci.map((podatak) => {{/*map() funkcija nam sluzi da prodjemo kroz sve elemente niza i za svaki izvrsimo odredjene naredbe*/}
            return (
              <Review
                key={podatak.id}
                id={podatak.id}
                naslov={podatak.naslov}
                kratakOpis={podatak.kratakOpis}
                opis={podatak.opis}
                slika={podatak.slika}
              />
            );{/*U ovom slucaju pomocu map metode mi prolazimo kroz niz JS objekata koji smo nazvali podaci*/}
              {/*uzimamo pojedinacne objekte i ucitavamo Review komponentu za svaki*/}
          })  
        : null}{/*U slucaju da nema nijednog podatka ne radi se nista, za taj slucaj pisemo null u else grani ternarnog operatora*/}
    </div>
  );
}
