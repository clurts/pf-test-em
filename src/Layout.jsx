import { Outlet } from "react-router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

export default function Layout() {
  return (
    <>
      <header>
        <Header
          img="/logo.png"
        />
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <Footer
          img="portrait.jpg"
          adress="Nørrebro, Copenhagen"
          number={<a href="callto:004512345678">+45 60 61 52 18</a>}
          mail={<a href="mailto:emilie.m.thon@gmail.dk">emilie.m.thon@gmail.dk</a>}
        />
      </footer>
    </>
  )
}
