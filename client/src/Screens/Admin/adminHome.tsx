import "../../misc/adminHome.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logostart from "../../pic/logo-headV2.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiDocumentText } from "react-icons/ti";
import {  RiDashboardFill } from "react-icons/ri";
import { IoIosHelpCircle, IoIosTime } from "react-icons/io";
import { MdManageAccounts, MdCategory, MdOutlinePostAdd } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { fetchAdminProfile } from "../../api/adminProfile";
import { LuView } from "react-icons/lu";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Pro from "../../pic/start1.jpg";
import { RiUserStarFill } from "react-icons/ri";
import Form from "react-bootstrap/Form";
import ManageUser from "./manageUs";
import GrowthChart from "./Chart/GrowthChart";
import ManageQ from "./manageQ";
import { IoNotifications } from "react-icons/io5";
import { FaUserMinus } from "react-icons/fa6";
import ManageCate from "./manageCate";

const AdminHome: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectedCate, setSelectedCate] = useState<string>("dashboard");
  const [selectedBlog, setSelectedBlog] = useState<string>("blog-all");
  const [selectedApprove, setSelectedApprove] =
    useState<string>("blog-success");

  const growthData = [
    { month: "มกราคม", numberOfPosts: 20 },
    { month: "กุมภาพันธ์", numberOfPosts: 30 },
    { month: "มีนาคม", numberOfPosts: 40 },
    { month: "เมษยน", numberOfPosts: 30 },
    { month: "พฤษภาคม", numberOfPosts: 35 },
    { month: "มิถุนายน", numberOfPosts: 40 },
  ];

  useEffect(() => {
    const sideMenu = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close");
    const themToggler = document.querySelector(".theme-toggler");

    if (menuBtn && closeBtn && sideMenu && themToggler) {
      const openMenuHandler = () => {
        sideMenu.style.display = "block";
      };

      const closeMenuHandler = () => {
        sideMenu.style.display = "none";
      };

      const changeTheme = () => {
        document.body.classList.toggle("dark-theme-variables");

        themToggler
          ?.querySelector("svg:nth-child(1)")
          ?.classList.toggle("active");
        themToggler
          ?.querySelector("svg:nth-child(2)")
          ?.classList.toggle("active");
      };

      themToggler.addEventListener("click", changeTheme);
      menuBtn.addEventListener("click", openMenuHandler);
      closeBtn.addEventListener("click", closeMenuHandler);

      // Cleanup function
      return () => {
        themToggler.removeEventListener("click", changeTheme);
        menuBtn.removeEventListener("click", openMenuHandler);
        closeBtn.removeEventListener("click", closeMenuHandler);
      };
    }
  }, [selectedCate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const profileData = await fetchAdminProfile(id);
          setUsername(profileData.username);
          setAdminProfile(profileData);
          setEmail(profileData.email);
          setTel(profileData.tel);
          setFirstname(profileData.firstname);
          setLastname(profileData.lastname);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleCategorySelection = (category: string) => {
    setSelectedCate(category);
  };

  const handleTableSelection = (Table: string) => {
    setSelectedBlog(Table);
  };

  return (
    <div className="adminHome">
      <div className="contain">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={logostart} alt="" />
            </div>
            <div id="close">
              <AiOutlineClose />
            </div>
          </div>

          <div className="sidebar">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategorySelection("dashboard");
              }}
              className={selectedCate === "dashboard" ? "active" : ""}
            >
              <RiDashboardFill />
              <h3>Dashboard</h3>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategorySelection("average");
              }}
              className={selectedCate === "average" ? "active" : ""}
            >
              <TiDocumentText />
              <h3>จัดการบล็อก</h3>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategorySelection("manage-q");
              }}
              className={selectedCate === "manage-q" ? "active" : ""}
            >
              <IoIosHelpCircle />
              <h3>จัดการคำถาม</h3>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategorySelection("manage-user");
              }}
              className={selectedCate === "manage-user" ? "active" : ""}
            >
              <MdManageAccounts />
              <h3>จัดการบัญชีผู้ใช้</h3>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategorySelection("manage-cate");
              }}
              className={selectedCate === "manage-cate" ? "active" : ""}
            >
              <MdCategory />
              <h3>จัดการหมวดหมู่</h3>
            </a>
            <a href="#">
              <FiLogOut />
              <h3>ออกจากระบบ</h3>
            </a>
          </div>
        </aside>

        {selectedCate === "dashboard" && (
          <div className="main1">
            <h1>Dashboard</h1>

            <div className="date">
              <input type="date" />
            </div>

            <div className="insights">
              <div className="user-all">
                <PiUsersThreeFill className="svg1" />
                <div className="middle">
                  <div className="left">
                    <h3>ผู้ใช้ทั้งหมด</h3>
                    <h1>256</h1>
                  </div>
                </div>
                <small className="text-muted1">Last 24 Hour</small>
              </div>

              <div className="view-all">
                <LuView className="svg2" />
                <div className="middle">
                  <div className="left">
                    <h3>การเยี่ยมชม</h3>
                    <h1>256</h1>
                  </div>
                  <div className="progres">
                    <svg className="svg4">
                      <circle cx="38" cy="38" r="36"></circle>
                    </svg>
                    <div className="number">
                      <p>80%</p>
                    </div>
                  </div>
                </div>
                <small className="text-muted1">Last 24 Hour</small>
              </div>

              <div className="blogpost-all">
                <IoDocumentTextOutline className="svg3" />
                <div className="middle">
                  <div className="left">
                    <h3>บล็อกทั้งหมด</h3>
                    <h1>325</h1>
                  </div>
                </div>
                <small className="text-muted1">Last 24 Hour</small>
              </div>
            </div>

            <div className="recent-order">
              <GrowthChart data={growthData} />
            </div>
          </div>
        )}

        {selectedCate === "dashboard" && (
          <div className="right">
            <div className="top">
              <button id="menu-btn">
                <RxHamburgerMenu />
              </button>
              <div className="theme-toggler">
                <MdLightMode className="active" />
                <MdDarkMode />
              </div>

              <div
                className="noti-icon"
                style={{ width: "4.4rem", position: "absolute", right: "18%" }}
              >
                <IoNotifications style={{ fontSize: "1.2rem" }} />
              </div>
              {adminProfile && (
                <div className="profile">
                  <div className="info">
                    <p>
                      Hello, <b>{adminProfile.firstname}</b>
                    </p>
                    <small className="text-muted1">Admin</small>
                  </div>
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                </div>
              )}
            </div>

            <div className="recent-update">
              <h2>รายการล่าสุด</h2>
              <div className="updates">
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1 m-0">2 minutes ago</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-analytics">
              <h2>กิจกรรมใหม่</h2>
              <div className="item new-user">
                <div className="icon">
                  <RiUserStarFill />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>ผู้ใช้ใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+39</h5>
                  <h3>208</h3>
                </div>
              </div>
              <div className="item new-post">
                <div className="icon">
                  <MdOutlinePostAdd />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>บล็อกใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+10</h5>
                  <h3>38</h3>
                </div>
              </div>
              <div className="item new-postwait">
                <div className="icon">
                  <IoIosTime />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>รอตรวจสอบ</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+3</h5>
                  <h3>38</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCate === "average" && (
          <div className="average">
            <main>
              <h1>จัดการบล็อก</h1>
              <div className="insights">
                <div
                  className="blogpost-all"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTableSelection("blog-all");
                  }}
                >
                  <IoDocumentTextOutline className="svg3" />
                  <div className="middle">
                    <div className="left">
                      <h3>บล็อกทั้งหมด</h3>
                      <h1>325</h1>
                    </div>
                  </div>
                </div>
                <div
                  className="view-all"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTableSelection("blog-wait");
                  }}
                >
                  <IoIosTime className="svg2" />
                  <div className="middle">
                    <div className="left">
                      <h3>รอตรวจสอบ</h3>
                      <h1>6</h1>
                    </div>
                  </div>
                </div>

                <div
                  className="user-all"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTableSelection("blog-success");
                  }}
                >
                  <PiUsersThreeFill className="svg1" />
                  <div className="middle">
                    <div className="left">
                      <h3>ตรวจสอบแล้ว</h3>
                      <h1>256</h1>
                    </div>
                  </div>
                </div>
              </div>

              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "800",
                  marginTop: "2rem",
                }}
              >
                รายการ
              </h2>

              {selectedBlog === "blog-all" && (
                <div
                  className="recent-order"
                  style={{
                    overflowY: "scroll",
                    maxHeight: "400px",
                    margin: "0",
                    borderRadius: "2rem",
                  }}
                >
                  <table>
                    <thead className="pt-5">
                      <tr>
                        <th>User Name</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    {adminProfile && (
                      <tbody>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="success">Approve</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="danger">Decline</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="success">Approve</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              )}

              {selectedBlog === "blog-wait" && (
                <div
                  className="recent-order"
                  style={{
                    overflowY: "scroll",
                    maxHeight: "400px",
                    margin: "0",
                    borderRadius: "2rem",
                  }}
                >
                  <table>
                    <thead className="pt-5">
                      <tr>
                        <th>User Name</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    {adminProfile && (
                      <tbody>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                        <tr>
                          <td>{adminProfile.username}</td>
                          <td></td>
                          <td>คาเฟ่น่านั่งขอนแก่น</td>
                          <td className="warning">Pending</td>
                          <td className="primary">Details</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              )}

              {selectedBlog === "blog-success" && (
                <div
                  className="recent-order"
                  style={{
                    overflowY: "scroll",
                    maxHeight: "400px",
                    margin: "0",
                    borderRadius: "2rem",
                  }}
                >
                  <div
                    className="selectBlogCate"
                    style={{
                      marginLeft: "2rem",
                      position: "fixed",
                    }}
                  >
                    <Form>
                      {["radio"].map((type) => (
                        <div key={`inline-${type}`}>
                          <Form.Check
                            inline
                            label="Approve"
                            style={{ color: "#41f1b6" }}
                            name="group1"
                            type="radio"
                            id={`inline-${type}-1`}
                            onChange={() => setSelectedApprove("blog-success")}
                            checked={selectedApprove === "blog-success"}
                          />
                          <Form.Check
                            inline
                            label="Decline"
                            style={{ color: "#ff7782" }}
                            name="group1"
                            type="radio"
                            id={`inline-${type}-2`}
                            onChange={() => setSelectedApprove("blog-decline")}
                            checked={selectedApprove === "blog-decline"}
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                  {selectedApprove === "blog-success" && (
                    <table>
                      <thead className="pt-5">
                        <tr>
                          <th>User Name</th>
                          <th>Date</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      {adminProfile && (
                        <tbody>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="success">Approve</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="success">Approve</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="success">Approve</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="success">Approve</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="success">Approve</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="success">Approve</td>
                            <td className="primary">Details</td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  )}

                  {selectedApprove === "blog-decline" && (
                    <table>
                      <thead className="pt-5">
                        <tr>
                          <th>User Name</th>
                          <th>Date</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      {adminProfile && (
                        <tbody>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="danger">Decline</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="danger">Decline</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="danger">Decline</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="danger">Decline</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="danger">Decline</td>
                            <td className="primary">Details</td>
                          </tr>
                          <tr>
                            <td>{adminProfile.username}</td>
                            <td></td>
                            <td>คาเฟ่น่านั่งขอนแก่น</td>
                            <td className="danger">Decline</td>
                            <td className="primary">Details</td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  )}
                </div>
              )}
            </main>
          </div>
        )}

        {selectedCate === "average" && (
          <div className="right">
            <div className="top">
              <button id="menu-btn">
                <RxHamburgerMenu />
              </button>
              <div className="theme-toggler">
                <MdLightMode className="active" />
                <MdDarkMode />
              </div>

              <div
                className="noti-icon"
                style={{ width: "4.4rem", position: "absolute", right: "18%" }}
              >
                <IoNotifications style={{ fontSize: "1.2rem" }} />
              </div>
              {adminProfile && (
                <div className="profile">
                  <div className="info">
                    <p>
                      Hello, <b>{adminProfile.firstname}</b>
                    </p>
                    <small className="text-muted1">Admin</small>
                  </div>
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                </div>
              )}
            </div>

            <div className="recent-update">
              <h2>รายการล่าสุด</h2>
              <div className="updates">
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1 m-0">2 minutes ago</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-analytics">
              <h2>กิจกรรมใหม่</h2>
              <div className="item new-user">
                <div className="icon">
                  <RiUserStarFill />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>บล็อกทั้งหมด</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+39</h5>
                  <h3>208</h3>
                </div>
              </div>
              <div className="item new-post">
                <div className="icon">
                  <MdOutlinePostAdd />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>บล็อกใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+10</h5>
                  <h3>38</h3>
                </div>
              </div>
              <div className="item new-postwait">
                <div className="icon">
                  <IoIosTime />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>รอตรวจสอบ</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+3</h5>
                  <h3>38</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCate === "manage-user" && <ManageUser />}

        {selectedCate === "manage-user" && (
          <div className="right">
            <div className="top">
              <button id="menu-btn">
                <RxHamburgerMenu />
              </button>
              <div className="theme-toggler">
                <MdLightMode className="active" />
                <MdDarkMode />
              </div>

              <div
                className="noti-icon"
                style={{ width: "4.4rem", position: "absolute", right: "18%" }}
              >
                <IoNotifications style={{ fontSize: "1.2rem" }} />
              </div>
              {adminProfile && (
                <div className="profile">
                  <div className="info">
                    <p>
                      Hello, <b>{adminProfile.firstname}</b>
                    </p>
                    <small className="text-muted1">Admin</small>
                  </div>
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                </div>
              )}
            </div>

            <div className="recent-update">
              <h2>รายการล่าสุด</h2>
              <div className="updates">
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1 m-0">2 minutes ago</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-analytics">
              <h2>กิจกรรมใหม่</h2>
              <div className="item new-user">
                <div className="icon">
                  <RiUserStarFill />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>ผู้ใช้ใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+39</h5>
                  <h3>208</h3>
                </div>
              </div>
              <div className="item new-post">
                <div className="icon">
                  <FaUserMinus />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>ลบแล้ว</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+10</h5>
                  <h3>38</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCate === "manage-q" && <ManageQ />}

        {selectedCate === "manage-q" && (
          <div className="right">
            <div className="top">
              <button id="menu-btn">
                <RxHamburgerMenu />
              </button>
              <div className="theme-toggler">
                <MdLightMode className="active" />
                <MdDarkMode />
              </div>

              <div
                className="noti-icon"
                style={{ width: "4.4rem", position: "absolute", right: "18%" }}
              >
                <IoNotifications style={{ fontSize: "1.2rem" }} />
              </div>
              {adminProfile && (
                <div className="profile">
                  <div className="info">
                    <p>
                      Hello, <b>{adminProfile.firstname}</b>
                    </p>
                    <small className="text-muted1">Admin</small>
                  </div>
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                </div>
              )}
            </div>

            <div className="recent-update">
              <h2>รายการล่าสุด</h2>
              <div className="updates">
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1 m-0">2 minutes ago</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-analytics">
              <h2>กิจกรรมใหม่</h2>
              <div className="item new-user">
                <div className="icon">
                  <RiUserStarFill />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>ผู้ใช้ใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+39</h5>
                  <h3>208</h3>
                </div>
              </div>
              <div className="item new-post">
                <div className="icon">
                  <MdOutlinePostAdd />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>บล็อกใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+10</h5>
                  <h3>38</h3>
                </div>
              </div>
              <div className="item new-postwait">
                <div className="icon">
                  <IoIosTime />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>รอตรวจสอบ</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+3</h5>
                  <h3>38</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCate === "manage-cate" && <ManageCate />}
        {selectedCate === "manage-cate" && (
          <div className="right">
            <div className="top">
              <button id="menu-btn">
                <RxHamburgerMenu />
              </button>
              <div className="theme-toggler">
                <MdLightMode className="active" />
                <MdDarkMode />
              </div>

              <div
                className="noti-icon"
                style={{ width: "4.4rem", position: "absolute", right: "18%" }}
              >
                <IoNotifications style={{ fontSize: "1.2rem" }} />
              </div>
              {adminProfile && (
                <div className="profile">
                  <div className="info">
                    <p>
                      Hello, <b>{adminProfile.firstname}</b>
                    </p>
                    <small className="text-muted1">Admin</small>
                  </div>
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                </div>
              )}
            </div>

            <div className="recent-update">
              <h2>รายการล่าสุด</h2>
              <div className="updates">
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1">2 minutes ago</small>
                  </div>
                </div>
                <div className="update">
                  <div className="profile-photo">
                    <img src={Pro} alt="" />
                  </div>
                  <div className="message">
                    <p className="m-0">
                      <b>PiyaratA</b> ได้โพสต์บล็อกบนเว็บไซต์
                    </p>
                    <small className="text-muted1 m-0">2 minutes ago</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-analytics">
              <h2>กิจกรรมใหม่</h2>
              <div className="item new-user">
                <div className="icon">
                  <RiUserStarFill />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>ผู้ใช้ใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+39</h5>
                  <h3>208</h3>
                </div>
              </div>
              <div className="item new-post">
                <div className="icon">
                  <MdOutlinePostAdd />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>บล็อกใหม่</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+10</h5>
                  <h3>38</h3>
                </div>
              </div>
              <div className="item new-postwait">
                <div className="icon">
                  <IoIosTime />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>รอตรวจสอบ</h3>
                    <small className="text-muted1">Last 24 Hours</small>
                  </div>
                  <h5 className="success">+3</h5>
                  <h3>38</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
