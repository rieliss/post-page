import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/navbar1.css";
import logoKKU from "../pic/logo-head.jpg";
import { PiUserCircleFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import {
  IoMdSettings,
  IoIosStats,
  IoIosHelpCircleOutline,
  IoIosHeartEmpty,
  IoIosSearch,
} from "react-icons/io";
import {
  IoBookmarkOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { getPosts, likePost } from "../api/post";
import { Post } from "../types/post";

const cates = ["Piyarat U", "ท่องเที่ยว", "Pearr"].map((name, index) => ({
  name,
  id: index,
}));

const Navbar1 = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResult, setSearchResult] = useState<
    {
      _id: string;
      topic: string;
      title?: string;
      image: string;
      category: string;
      likes: string[];
      content: string;
    }[]
  >([]);
  const [feeds, setFeeds] = useState<Post[] | null>(null);
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [loading, setLoading] = useState(false); // สำหรับแสดงสถานะการค้นหา
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPosts();
        setFeeds(res);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const header = document.querySelector(".headerr");
    const menu = document.querySelector("#menu-icon");
    const navmenu = document.querySelector(".navmenu");

    const handleScroll = () => {
      header?.classList.toggle("sticky", window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    menu?.addEventListener("click", () => {
      menu?.classList.toggle("bx-x");
      navmenu?.classList.toggle("open");
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (!showDropdown) {
      inputRef.current?.focus();
    }
    setShowDropdown(!showDropdown);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCate = cates.filter(
    (cate) =>
      search.length && cate.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const query = (event.target as HTMLInputElement).value.trim();

      // ตรวจสอบว่า query เป็น string
      if (typeof query !== "string" || !query) {
        console.error("Invalid query:", query);
        return;
      }

      setLoading(true);

      try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
          `http://localhost:3001/posts/search?query=${encodedQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status} ${response.statusText}`
          );
        }

        const posts = await response.json();
        console.log("Search results:", posts);
        setSearchResult(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotiMenu = () => {
    setIsNotiOpen(!isNotiOpen);
  };

  const handleClickCard = (id: string) => {
    console.log(id);
    navigate(`/content/${id}`);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("userId");
    setUserId("");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbarreal">
      <div className="headerr d-flex">
        <a href="/" className="logo1">
          <img src={logoKKU} alt="logo" />
        </a>

        <ul className="navmenu">
          <li>
            <a href="/">หน้าแรก</a>
          </li>
          <li>
            <a href="/Popular">ยอดนิยม</a>
          </li>
          <li>
            <a href="/category">หมวดหมู่</a>
          </li>
          <li>
            <a href="#">เกี่ยวกับเรา</a>
          </li>
        </ul>

        <div className="nav-icon">
          <div className={`search ${showDropdown ? "open" : ""}`}>
            <input
              ref={inputRef}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Search..."
              type="text"
            />
            <IoIosSearch
              onClick={handleClick}
              className={`uil uil-${showDropdown ? "multiply" : "search"}`}
            />
          </div>
          <div className="">
            <IoNotificationsOutline onClick={toggleNotiMenu} />
            {isNotiOpen && (
              <div className="dropdown-itemnoti">
                <p>noti</p>
                <ul>
                  <li>
                    <FaUserAlt />
                    <Link to={`/profile/${userId}`}>โปรไฟล์</Link>
                  </li>
                  <li>
                    <IoMdSettings />
                    <a href={`/profile/edit-profile/${userId}`}>ตั้งค่า</a>
                  </li>
                  <li>
                    <IoIosStats />
                    <a href="#">สถิติ</a>
                  </li>
                  <li>
                    <IoIosHelpCircleOutline />
                    <a href="#">ช่วยเหลือ</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className={`items ${showDropdown ? "open" : ""}`}>
            {filteredCate.length > 0 &&
              filteredCate.map((cate) => (
                <button key={cate.id} style={{ color: "#222222" }}>
                  {cate.name}
                </button>
              ))}
          </div>
          <div className="user-profile-dropdown">
            <PiUserCircleFill onClick={toggleMenu} />
            {isOpen && (
              <div className="dropdown-item1">
                <ul>
                  <li>
                    <FaUserAlt />
                    <Link to={`/profile/${userId}`}>โปรไฟล์</Link>
                  </li>
                  <li>
                    <IoMdSettings />
                    <a href={`/profile/edit-profile/${userId}`}>ตั้งค่า</a>
                  </li>
                  <li>
                    <IoIosStats />
                    <a href="#">สถิติ</a>
                  </li>
                  <li>
                    <IoIosHelpCircleOutline />
                    <a href="#">ช่วยเหลือ</a>
                  </li>
                  <li>
                    <IoLogOutOutline />
                    <a href="#" onClick={handleLogout}>
                      ออกจากระบบ
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="bx bx-menu" id="menu-icon">
            <RxHamburgerMenu />
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : searchResult.length > 0 ? (
          <div
            style={{
              height: "100%",
              backgroundColor: "white",
              position: "absolute",
              width: "100%",
            }}
          >
            <div
              style={{
                marginTop: "100px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, auto))",
                gap: "2rem",
              }}
            >
              {feeds &&
                searchResult.map((item, idx) => (
                  <div
                    className="row"
                    key={idx}
                    onClick={() => handleClickCard(item._id)}
                  >
                    <img src={item.image} alt="" />
                    <div className="heart-icon">
                      <IoIosHeartEmpty
                        className="icon-heart"
                        style={{ marginRight: "10px" }}
                      />
                      <p>{item.likes.length} likes</p>
                      <IoBookmarkOutline className="save-icon" />
                    </div>
                    <div className="detail-blog">
                      <h4>{item.topic}</h4>
                      <div style={{ marginBottom: "10px" }}>
                        {item.category === "คาเฟ่" && (
                          <Badge bg="info">{item.category}</Badge>
                        )}
                        {item.category === "ร้านอาหาร" && (
                          <Badge bg="primary">{item.category}</Badge>
                        )}
                        {item.category === "ท่องเที่ยว" && (
                          <Badge bg="warning">{item.category}</Badge>
                        )}
                        {item.category === "บิวตี้" && (
                          <Badge bg="danger">{item.category}</Badge>
                        )}
                        {item.category === "แฟชั่น" && (
                          <Badge bg="success">{item.category}</Badge>
                        )}
                        {item.category === "ข่าวสาร" && (
                          <Badge bg="danger">{item.category}</Badge>
                        )}
                        {item.category === "อื่นๆ" && (
                          <Badge bg="secondary">{item.category}</Badge>
                        )}
                      </div>
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Navbar1;
