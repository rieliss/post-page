import { useEffect, useState } from "react";
import { getPosts, likePost } from "../api/post";
import { Post } from "../types/post";
import { Row, Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import dayjs from "dayjs";
import { LuHeart } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import "../misc/feeds.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { ToggleButton, ButtonGroup } from "react-bootstrap";

const radios = [
  { name: "Newest", value: "1" },
  { name: "Oldest", value: "2" },
  { name: "Most Popular", value: "3" },
];

const Feeds = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Post[] | null>(null);
  const [radioValue, setRadioValue] = useState("1");
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleClickCard = (id: string) => {
    console.log(id);
    navigate(`/content/${id}`);
  };

  useEffect(() => {
    if (feeds) {
      if (radioValue === "1") {
        const sorted = [...feeds].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setFeeds(sorted);
      } else if (radioValue === "2") {
        const sorted = [...feeds].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        setFeeds(sorted);
      } else if (radioValue === "3") {
        const sorted = [...feeds].sort(
          (a, b) => b.likes.length - a.likes.length
        );
        setFeeds(sorted);
      }
    }
  }, [feeds, radioValue]);

  return (
    <div className="blogs">
      <section className="trending-post" id="trending">
        <div className="center-text">
          <h2>
            Our Trending <span>Post</span>
          </h2>
        </div>

        <div>
          <ButtonGroup className="mb-2">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
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

export default Feeds;
