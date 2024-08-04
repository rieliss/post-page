import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../api/profile";
import { FaUserFriends } from "react-icons/fa";
import { Form } from "react-bootstrap";
//import Navbar1 from "../Navbar/navbar1";
import "../misc/edit-profile.css";
import "../misc/profile.css";
import Navbar2 from "../Navbar/Navbar1";
import { Button, Nav, Tab } from "react-bootstrap";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const profileData = await fetchUserProfile(id);
          setUsername(profileData.username);
          setUserProfile(profileData);
          setEmail(profileData.email);
          setTel(profileData.tel);
          setFirstname(profileData.firstname);
          setLastname(profileData.lastname);
          setDateOfBirth(profileData.date_of_birth);
          setGender(profileData.gender);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = async () => {
    window.location.href = `/profile/edit-profile/${id}`;
  };

  return (
    <div>
      <Navbar2 />
      <Form className="profile">
        <div className="profile">
          <div className="coverpic">
            <img
              className="d-block w-100"
              src={userProfile && userProfile.cover_pic}
              alt="Cover"
              style={{
                height: "60vh",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            className="ex-Pro1"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="profilepic"
              style={{
                width: "230px",
                height: "230px",
                objectFit: "cover",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                className="d-block w-100"
                src={userProfile && userProfile.profile_picture}
                alt="Profile"
                style={{
                  objectFit: "cover",
                  border: "5px solid white",
                  borderRadius: "200px",
                }}
              />
            </div>
          </div>
        </div>
      </Form>

      <div
        className="detail-profile"
        style={{ marginTop: "8rem", textAlign: "center" }}
      >
        {userProfile && (
          <div>
            <div className="d-flex justify-content-center">
              <h1 style={{ padding: "0 10px 0 10px" }}>
                {userProfile.firstname}
              </h1>
              <h1 style={{ padding: "0 10px 0 10px" }}>
                {userProfile.lastname}
              </h1>
            </div>
            <p className="fw-bold fs-5">@{userProfile.username}</p>
          </div>
        )}
      </div>
      <div className="follow">
        {userProfile && (
          <div className="follow-icon">
            <FaUserFriends />
            <h5 className="m-0">{userProfile.following.length} following</h5>
          </div>
        )}

        <div className="bar-icon"></div>

        {userProfile && (
          <div className="follow-icon">
            <FaUserFriends />
            <h5 className="m-0">{userProfile.followers.length} followers</h5>
          </div>
        )}
      </div>

      <div className="edit d-flex justify-content-center my-4">
        <Button
          variant="dark"
          style={{ marginRight: "10px" }}
          onClick={handleEdit}
        >
          แก้ไขโปรไฟล์
        </Button>
        <Button variant="dark" style={{ marginRight: "10px" }}>
          แชร์โปรไฟล์
        </Button>
      </div>

      <Tab.Container id="myTab" defaultActiveKey="home-tab">
        <Nav variant="underline" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="home-tab">
              <IoDocumentText />
              <p>บล็อกของฉัน</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contact-tab">
              <IoMdHeart />
              <p>บล็อกที่ถูกใจ</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled-tab">
              <CiSaveDown2 />
              <p>บล็อกที่บันทึก</p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="home-tab">Home content</Tab.Pane>
          <Tab.Pane eventKey="profile-tab">Profile content</Tab.Pane>
          <Tab.Pane eventKey="contact-tab">Contact content</Tab.Pane>
          <Tab.Pane eventKey="disabled-tab">Disabled content</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Profile;
