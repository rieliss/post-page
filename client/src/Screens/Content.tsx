import { useEffect, useState } from "react";
import { Post } from "../types/post";
import { addComment, getPostById, likePost } from "../api/post";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Badge, Button, Image } from "react-bootstrap";
import "../misc/content.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Navbar2 from "../Navbar/Navbar1";
import { LuHeart } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";

const Content = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState<string>("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPostById(id as string);
        setPost(res);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    try {
      await addComment(id as string, comment);
      setComment("");
      navigate(0);
    } catch (error) {}
  };

  const handleLike = async () => {
    try {
      await likePost(id as string);
      navigate(0);
    } catch (error) {}
  };

  return (
    <>
      <div>
        <Navbar2 />
      </div>
      <div className="container-con">
        {post && !loading && (
          <div className="post-container">
            <div className="head-user">
              <div className="user-info" style={{ fontWeight: "bold" }}>
                <a href={`/profile/${post.user._id}`}>
                  {post.user.firstname} {post.user.lastname}
                </a>
              </div>
              <div className="datePost">
                {dayjs(post.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </div>

            <Row>
              <Col>
                <div className="image-container">
                  <Image src={post.image} rounded />
                </div>
              </Col>
              <Col>
                <div className="topic-con">
                  <h2>{post.topic}</h2>
                </div>
                <div className="category-con">
                  {post.category === "คาเฟ่" && (
                    <Badge bg="info">{post.category}</Badge>
                  )}
                  {post.category === "ร้านอาหาร" && (
                    <Badge bg="primary">{post.category}</Badge>
                  )}
                  {post.category === "ท่องเที่ยว" && (
                    <Badge bg="warning">{post.category}</Badge>
                  )}
                  {post.category === "บิวตี้" && (
                    <Badge bg="light">{post.category}</Badge>
                  )}
                  {post.category === "แฟชั่น" && (
                    <Badge bg="success">{post.category}</Badge>
                  )}
                  {post.category === "ข่าวสาร" && (
                    <Badge bg="danger">{post.category}</Badge>
                  )}
                  {post.category === "อื่นๆ" && (
                    <Badge bg="secondary">{post.category}</Badge>
                  )}
                </div>

                <div className="post-con">{post.content}</div>

                {/* Like */}
                <div className="d-flex align-items-center float-right mt-0">
                  <div className="icon-like" onClick={handleLike}>
                    <LuHeart
                      color={
                        post.likes.find((l) => l.user === userId)
                          ? "red"
                          : "black"
                      }
                    />
                  </div>
                  <p className="likecount">{post.likes.length}</p>
                  <div className="icon-cm">
                    <FaRegComment />
                  </div>
                  <p className="commentcount">{post.comments.length}</p>

                  <div className="icon-save">
                    <MdOutlineBookmarkBorder />
                  </div>
                </div>

                {/* Comment */}
                <div className="comment-con">
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="แสดงความคิดเห็น"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FloatingLabel>
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={handleAddComment}
                  >
                    เพิ่มคอมเม้น
                  </Button>
                </div>
                <div>
                  {post.comments.map((comment) => (
                    <div key={comment._id} className="comment mt-2 border p-2">
                      <div className="mt-2">
                        <span>
                          <a href={`/profile/${comment.author._id}`}>
                            {comment.author.firstname} {comment.author.lastname}
                          </a>
                        </span>
                        <span className="ms-3">
                          {dayjs(comment.created_at).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </span>
                      </div>
                      <div>{comment.content}</div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default Content;
