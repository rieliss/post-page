import "../misc/home.css";
import Feeds from "./Feeds";
import "../misc/home.css";
import { IoIosArrowRoundForward, IoIosArrowRoundDown } from "react-icons/io";
import Footer from "../Navbar/footer";
import Navbar1 from "../Navbar/Navbar1";

function HomePage() {
  return (
    <div className="home">
      <Navbar1 />
      <section className="main-home">
        <div className="main-text">
          <h5>แพลตฟอร์มแลกเปลี่ยนความคิดเห็น</h5>
          <h1>
            KKU Blogging <br /> Platform
          </h1>
          <p>Created to share opinions</p>

          <a href="#" className="main-btn">
            Start Now
            <IoIosArrowRoundForward />
          </a>
        </div>
        <div className="down-arrow">
          <a href="#trending" className="down">
            <IoIosArrowRoundDown />
          </a>
        </div>
      </section>
      <Feeds />
      <Footer />
    </div>
  );
}

export default HomePage;
