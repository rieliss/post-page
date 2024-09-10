import { useEffect, useState } from "react";
import { getPosts } from "../api/post";
import { Post } from "../types/post";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import "../misc/feeds.css";
import Navbar1 from "../Navbar/Navbar1";

const Popular = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Post[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPosts();
        if (res) {
          // Sort posts by popularity upon fetching
          const sorted = res.sort((a, b) => b.likes.length - a.likes.length);
          setFeeds(sorted);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  const handleClickCard = (id: string) => {
    navigate(`/content/${id}`);
  };

  return (
    <div className="blogs">
      <Navbar1 />

      <section className="trending-post" id="trending">
        <div className="center-text">
          <h2>Most Popular</h2>
        </div>

        <div className="blog">
          {feeds &&
            feeds.map((feed, idx) => (
              <div
                className="row"
                key={idx}
                onClick={() => handleClickCard(feed._id)}
              >
                <img src={feed.image} alt="" />
                <div className="heart-icon">
                  <IoIosHeartEmpty
                    className="icon-heart"
                    style={{ marginRight: "10px" }}
                  />
                  <p>{feed.likes.length} likes</p>
                  <IoBookmarkOutline className="save-icon" />
                </div>
                <div className="detail-blog">
                  <h4>{feed.topic}</h4>
                  <div style={{ marginBottom: "10px" }}>
                    {feed.category === "คาเฟ่" && (
                      <Badge bg="info">{feed.category}</Badge>
                    )}
                    {feed.category === "ร้านอาหาร" && (
                      <Badge bg="primary">{feed.category}</Badge>
                    )}
                    {feed.category === "ท่องเที่ยว" && (
                      <Badge bg="warning">{feed.category}</Badge>
                    )}
                    {feed.category === "บิวตี้" && (
                      <Badge bg="danger">{feed.category}</Badge>
                    )}
                    {feed.category === "แฟชั่น" && (
                      <Badge bg="success">{feed.category}</Badge>
                    )}
                    {feed.category === "ข่าวสาร" && (
                      <Badge bg="danger">{feed.category}</Badge>
                    )}
                    {feed.category === "อื่นๆ" && (
                      <Badge bg="secondary">{feed.category}</Badge>
                    )}
                  </div>
                  <p>{feed.content}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Popular;
