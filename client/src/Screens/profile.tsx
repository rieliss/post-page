import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../api/profile";
import { FaUserFriends } from "react-icons/fa";
import { Form } from "react-bootstrap";
import "../misc/edit-profile.css";
import "../misc/profile.css";
import Navbar2 from "../Navbar/Navbar1";
import { Button, Nav, Tab, Modal } from "react-bootstrap";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import ProfileFeeds from "./profile-feed";
import { fetchFollow, fetchProfile } from "../api/follow";
import { FollowingModal } from "./following-modal";
import { FollowerModal } from "./follower-modal";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [checkUser, setCheckUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const me = localStorage.getItem("userId");
          const profileData = await fetchUserProfile(id);
          setUserProfile(profileData);
          setCheckUser(localStorage.getItem("userId") === id);
          setIsFollowing(
            profileData.followers.includes(localStorage.getItem("userId"))
          );
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleFollow = useCallback(async () => {
    const API_BASE_URL = "http://localhost:3001/follow";
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ me: localStorage.getItem("userId"), you: id }),
      });
      if (!response.ok) {
        const statusText = response.statusText || "Unknown Error";
        throw new Error(
          `Server returned ${response.status} ${statusText} for ${API_BASE_URL}`
        );
      }
      const followerData = await response.json();
      setUserProfile(followerData.newFollow);
      setIsFollowing(followerData.newFollow.if_followed);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  }, [id, isFollowing]);

  const handleUnfollow = useCallback(async () => {
    const API_BASE_URL_DELETE = "http://localhost:3001/follow/delete";
    try {
      const response = await fetch(API_BASE_URL_DELETE, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ me: localStorage.getItem("userId"), you: id }),
      });
      if (!response.ok) {
        const statusText = response.statusText || "Unknown Error";
        throw new Error(
          `Server returned ${response.status} ${statusText} for ${API_BASE_URL_DELETE}`
        );
      }
      const res = await response.json();
      setUserProfile(res.unFollow);
      setIsFollowing(false);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  }, [id, isFollowing]);

  const handleEdit = () => {
    navigate(`/profile/edit-profile/${id}`);
  };

  return (
    <div>
      <Navbar2 />
      <Form className="profile">
        <div className="profile">
          <div className="coverpic">
            <img
              className="d-block w-100"
              src={userProfile?.cover_pic || ""}
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
                src={userProfile?.profile_picture || ""}
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
            <FollowerModal userProfile={userProfile} />
          </div>
        )}

        <div className="bar-icon"></div>

        {userProfile && (
          <div className="follow-icon">
            <FaUserFriends />
            <FollowingModal userProfile={userProfile} />
          </div>
        )}
      </div>
      {checkUser ? (
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
      ) : (
        <div className="edit d-flex justify-content-center my-4">
          <Button
            variant="dark"
            style={{ marginRight: "10px" }}
            onClick={isFollowing ? handleUnfollow : handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Button variant="dark" style={{ marginRight: "10px" }}>
            ข้อความ
          </Button>
        </div>
      )}
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
        <div>
          <ProfileFeeds />
        </div>
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

// function FollowerModal({ userProfile }: any) {
//   const [smShow, setSmShow] = useState(false);
//   const [myUser, setMyUser] = useState<any>(null);
//   const [isFollowerModal, setIsFollowerModal] = useState<boolean>(false);

//   const [currentUser, setCurrentUser] = useState<any>([]);

//   const handleButtonClick = async () => {
//     setSmShow(true);
//     const me = localStorage.getItem("userId");
//     if (me) {
//       try {
//         const profileData = await fetchProfile(me);
//         const resx = await fetchFollow(userProfile._id);
//         setMyUser(profileData);
//         setCurrentUser(resx);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       }
//     }
//   };

//   const CheckFollower = useMemo(() => {
//     const newData: string[] = [];
//     userProfile?.followers?.forEach((e: any) => {
//       const isFollowing = myUser?.following?.some(
//         (follower: any) => follower === e
//       );
//       if (isFollowing) {
//         newData.push(e);
//       }
//     });
//     return newData;
//   }, [userProfile, myUser, isFollowerModal]);

//   const handleFollow = useCallback(async (you: string) => {
//     const API_BASE_URL = "http://localhost:3001/follow";
//     try {
//       const response = await fetch(API_BASE_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           me: localStorage.getItem("userId"),
//           you: you,
//         }),
//       });
//       if (!response.ok) {
//         const statusText = response.statusText || "Unknown Error";
//         throw new Error(
//           `Server returned ${response.status} ${statusText} for ${API_BASE_URL}`
//         );
//       }
//       const followerData = await response.json();
//       setIsFollowerModal(followerData.newFollow.if_followed);
//       const updatedProfile = await fetchProfile(localStorage.getItem("userId"));
//       setMyUser(updatedProfile);
//     } catch (error) {
//       console.error("Error:", (error as Error).message);
//     }
//   }, []);

//   const handleUnfollow = useCallback(async (you: string) => {
//     const API_BASE_URL_DELETE = "http://localhost:3001/follow/delete";
//     try {
//       const response = await fetch(API_BASE_URL_DELETE, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           me: localStorage.getItem("userId"),
//           you: you,
//         }),
//       });
//       if (!response.ok) {
//         const statusText = response.statusText || "Unknown Error";
//         throw new Error(
//           `Server returned ${response.status} ${statusText} for ${API_BASE_URL_DELETE}`
//         );
//       }
//       const res = await response.json();
//       setIsFollowerModal(false);
//       const updatedProfile = await fetchProfile(localStorage.getItem("userId"));
//       setMyUser(updatedProfile);
//     } catch (error) {
//       console.error("Error:", (error as Error).message);
//     }
//   }, []);

//   useEffect(() => {
//     console.log("userProfile", userProfile);
//     console.log("currentUser", currentUser);
//     console.log("CheckFollower", CheckFollower);
//     console.log("myUser", myUser);
//   }, [currentUser, userProfile, CheckFollower, myUser]);

//   return (
//     <>
//       <Button onClick={handleButtonClick} className="me-2">
//         <h5 className="m-0">{`${userProfile?.followers?.length} followers`}</h5>
//       </Button>
//       <Modal
//         size="lg"
//         centered
//         show={smShow}
//         onHide={() => setSmShow(false)}
//         aria-labelledby="example-modal-sizes-title-sm"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-sm">following</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentUser?.followers?.map((c: any) => (
//             <div
//               key={c + "s"}
//               style={{
//                 display: "flex",
//                 gap: "1rem",
//                 padding: "0.5rem",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <div className="d-flex justify-content-center">
//                 <a href={`/profile/${c._id}`}>
//                   <p style={{ padding: "0 10px 0 10px" }}>{c.firstname}</p>
//                 </a>
//               </div>
//               {localStorage.getItem("userId") === c._id ? (
//                 <Button disabled>you</Button>
//               ) : CheckFollower?.some((follower: any) => follower === c._id) ? (
//                 <Button onClick={() => handleUnfollow(c)}>followed</Button>
//               ) : (
//                 <Button onClick={() => handleFollow(c)}>follow</Button>
//               )}
//             </div>
//           ))}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// function FollowingModal({ userProfile }: any) {
//   const [smShow, setSmShow] = useState(false);
//   const [myUser, setMyUser] = useState<any>(null);
//   const [isFollowingModal, setIsFollowingModal] = useState<boolean>(false);
//   const [profileDataArray, setProfileDataArray] = useState<any[]>([]);

//   const [currentUser, setCurrentUser] = useState<any>([]);

//   const handleButtonClick = async () => {
//     setSmShow(true);
//     const me = localStorage.getItem("userId");
//     if (me) {
//       try {
//         const profileData = await fetchProfile(me);
//         const resx = await fetchFollow(userProfile._id);
//         setMyUser(profileData);
//         setCurrentUser(resx);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       }
//     }
//   };

//   const CheckFollowing = useMemo(() => {
//     const newData: string[] = [];
//     userProfile?.following?.forEach((e: any) => {
//       const isFollowing = myUser?.following?.some(
//         (follower: any) => follower === e
//       );
//       if (isFollowing) {
//         newData.push(e);
//       }
//     });
//     return newData;
//   }, [userProfile, myUser, isFollowingModal]);

//   const handleFollow = useCallback(async (you: string) => {
//     const API_BASE_URL = "http://localhost:3001/follow";
//     try {
//       const response = await fetch(API_BASE_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           me: localStorage.getItem("userId"),
//           you: you,
//         }),
//       });
//       if (!response.ok) {
//         const statusText = response.statusText || "Unknown Error";
//         throw new Error(
//           `Server returned ${response.status} ${statusText} for ${API_BASE_URL}`
//         );
//       }
//       const followerData = await response.json();
//       setIsFollowingModal(followerData.newFollow.if_followed);
//       const updatedProfile = await fetchProfile(localStorage.getItem("userId"));
//       setMyUser(updatedProfile);
//     } catch (error) {
//       console.error("Error:", (error as Error).message);
//     }
//   }, []);

//   const handleUnfollow = useCallback(async (you: string) => {
//     const API_BASE_URL_DELETE = "http://localhost:3001/follow/delete";
//     try {
//       const response = await fetch(API_BASE_URL_DELETE, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           me: localStorage.getItem("userId"),
//           you: you,
//         }),
//       });
//       if (!response.ok) {
//         const statusText = response.statusText || "Unknown Error";
//         throw new Error(
//           `Server returned ${response.status} ${statusText} for ${API_BASE_URL_DELETE}`
//         );
//       }
//       const res = await response.json();
//       setIsFollowingModal(false);
//       // Refetch or update myUser state here if needed
//       const updatedProfile = await fetchProfile(localStorage.getItem("userId"));
//       setMyUser(updatedProfile);
//     } catch (error) {
//       console.error("Error:", (error as Error).message);
//     }
//   }, []);

//   useEffect(() => {
//     console.log("userProfile", userProfile);
//     console.log("currentUser", currentUser);
//     console.log("CheckFollowing", CheckFollowing);
//     console.log("myUser", myUser);
//   }, [currentUser, userProfile, CheckFollowing, myUser]);

//   return (
//     <>
//       <Button onClick={handleButtonClick} className="me-2">
//         <h5 className="m-0">{`${userProfile?.following?.length} following`}</h5>
//       </Button>
//       <Modal
//         size="lg"
//         centered
//         show={smShow}
//         onHide={() => setSmShow(false)}
//         aria-labelledby="example-modal-sizes-title-sm"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-sm">following</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentUser?.following?.map((c: any) => (
//             <div
//               key={c + "s"}
//               style={{
//                 display: "flex",
//                 gap: "1rem",
//                 padding: "0.5rem",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <div className="d-flex justify-content-center">
//                 <a href={`/profile/${c._id}`}>
//                   <p style={{ padding: "0 10px 0 10px" }}>{c.firstname}</p>
//                 </a>
//               </div>
//               {localStorage.getItem("userId") === c._id ? (
//                 <Button disabled>you</Button>
//               ) : CheckFollowing?.some(
//                   (follower: any) => follower === c._id
//                 ) ? (
//                 <Button onClick={() => handleUnfollow(c)}>followed</Button>
//               ) : (
//                 <Button onClick={() => handleFollow(c)}>follow</Button>
//               )}
//             </div>
//           ))}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }
