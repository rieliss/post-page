import React from "react";
import { PiUsersThreeFill } from "react-icons/pi";
import { LuView } from "react-icons/lu";
import { fetchAdminProfile } from "../../api/adminProfile";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GenderChart from "./Chart/GenderChart";

const ManageUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const genderData = {
    male: 30,
    female: 20,
  };

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

  return (
    <div className="manageUser">
      <main>
        <h1>จัดการบัญชีผู้ใช้</h1>

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
                <h3>ผู้ใช้ใหม่</h3>
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
            <div className="middle">
              <GenderChart data={genderData} />
            </div>
          </div>
        </div>

        <div className="recent-order" style={{ marginTop: "1.5rem" }}>
          <h2>รายการ</h2>
          <div className="right">
            <div
              className="activity-analytics"
              style={{
                marginTop: "0.5rem",
                overflowY: "scroll",
                maxHeight: "300px",
              }}
            >
              <div className="item ">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/21/16/94/2116949d8173512c55db395903781fd7.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Pattarasaya Srisanga</h3>
                    <small className="text-muted1">@jjpatts_</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item ">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/cf/84/b9/cf84b94a757bbb9124cd4646d8069433.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Manipha Techo</h3>
                    <small className="text-muted1">@protqr</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/ab/d9/3d/abd93dc5a998f8f6ecd7148df7fa6a36.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Sue Mayangpante</h3>
                    <small className="text-muted1">@sueMayang</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/48/33/76/483376371b3e03301a5d9a6c15013342.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Pah MayangPante</h3>
                    <small className="text-muted1">@pahmayangg_</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="profile-photo">
                  <img
                    src="https://i.pinimg.com/564x/9f/68/55/9f685516e86bd4fe54a30d181bcdc6e1.jpg"
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Kong Mayangpante</h3>
                    <small className="text-muted1">@kongMayapann</small>
                  </div>
                  <div className="manage d-flex ">
                    <div
                      className="edit warning"
                      style={{ paddingRight: "10px" }}
                    >
                      <h3>Edit</h3>
                    </div>
                    <div className="delete danger">
                      <h3>Delete</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageUser;
