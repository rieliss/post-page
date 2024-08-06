import { useCallback, useMemo, useState } from "react";
import { fetchFollow, fetchProfile } from "../api/follow";
import { Button, Modal } from "react-bootstrap";

export function FollowingModal({ userProfile }: any) {
  const [smShow, setSmShow] = useState(false);
  const [myUser, setMyUser] = useState<any>(null);
  const [isFollowingModal, setIsFollowingModal] = useState<boolean>(false);
  const [profileDataArray, setProfileDataArray] = useState<any[]>([]);

  const [currentUser, setCurrentUser] = useState<any>([]);

  const handleButtonClick = async () => {
    setSmShow(true);
    const me = localStorage.getItem("userId");
    if (me) {
      try {
        const profileData = await fetchProfile(me);
        const resx = await fetchFollow(userProfile._id);
        setMyUser(profileData);
        setCurrentUser(resx);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
  };

  const CheckFollowing = useMemo(() => {
    const newData: string[] = [];
    userProfile?.following?.forEach((e: any) => {
      const isFollowing = myUser?.following?.some(
        (follower: any) => follower === e
      );
      if (isFollowing) {
        newData.push(e);
      }
    });
    return newData;
  }, [userProfile, myUser, isFollowingModal]);

  const handleFollow = useCallback(async (you: string) => {
    const API_BASE_URL = "http://localhost:3001/follow";
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          me: localStorage.getItem("userId"),
          you: you,
        }),
      });
      if (!response.ok) {
        const statusText = response.statusText || "Unknown Error";
        throw new Error(
          `Server returned ${response.status} ${statusText} for ${API_BASE_URL}`
        );
      }
      const followerData = await response.json();
      setIsFollowingModal(followerData.newFollow.if_followed);
      const updatedProfile = await fetchProfile(localStorage.getItem("userId"));
      setMyUser(updatedProfile);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  }, []);

  const handleUnfollow = useCallback(async (you: string) => {
    const API_BASE_URL_DELETE = "http://localhost:3001/follow/delete";
    try {
      const response = await fetch(API_BASE_URL_DELETE, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          me: localStorage.getItem("userId"),
          you: you,
        }),
      });
      if (!response.ok) {
        const statusText = response.statusText || "Unknown Error";
        throw new Error(
          `Server returned ${response.status} ${statusText} for ${API_BASE_URL_DELETE}`
        );
      }
      const res = await response.json();
      setIsFollowingModal(false);
      // Refetch or update myUser state here if needed
      const updatedProfile = await fetchProfile(localStorage.getItem("userId"));
      setMyUser(updatedProfile);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  }, []);

  //   useEffect(() => {
  //     console.log("userProfile", userProfile);
  //     console.log("currentUser", currentUser);
  //     console.log("CheckFollowing", CheckFollowing);
  //     console.log("myUser", myUser);
  //   }, [currentUser, userProfile, CheckFollowing, myUser]);

  return (
    <>
      <Button onClick={handleButtonClick} className="me-2">
        <h5 className="m-0">{`${userProfile?.following?.length} following`}</h5>
      </Button>
      <Modal
        size="lg"
        centered
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">following</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser?.following?.map((c: any) => (
            <div
              key={c + "s"}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "0.5rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="d-flex justify-content-center">
                <a href={`/profile/${c._id}`}>
                  <p style={{ padding: "0 10px 0 10px" }}>{c.firstname}</p>
                </a>
              </div>
              {localStorage.getItem("userId") === c._id ? (
                <Button disabled>you</Button>
              ) : CheckFollowing?.some(
                  (follower: any) => follower === c._id
                ) ? (
                <Button onClick={() => handleUnfollow(c)}>followed</Button>
              ) : (
                <Button onClick={() => handleFollow(c)}>follow</Button>
              )}
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
