//globalni CSS fajl koji se odnosi na citavu aplikaciju, tj. sajt
import "../styles/globals.css";
import Navigacija from "../components/Navigacija";
//LogInContextProvider je React komponenta koja dostavlja sadrzaj drugim komponentama na sajtu
import { LogInContextProvider } from "../store/log-in-context";
//_app.js je fajl u kome se smesta kod koji se odnosi na citavu aplikaciju
//ovaj fajl se kreira nakon kreiranja Next.js projekta u terminalu pomocu komande npx create-next-app
function MyApp({ Component, pageProps }) {
  return (
    <>
      <LogInContextProvider>
        {/*Ovde ucitavamo navigaciju zato sto zelimo da na svakoj stranici postoji navigacija*/}
        <Navigacija />
        <div className="centarDiv">
          <Component {...pageProps} />
        </div>
      </LogInContextProvider>
    </>
  );
}

export default MyApp;
