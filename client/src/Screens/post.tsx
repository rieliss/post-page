import React, { useState } from "react";

import Navbar2 from "../Navbar/Navbar1";
import "../misc/wp.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { createPost } from "../api/post"; // นำเข้าฟังก์ชัน Post จากไฟล์ api/test
import "../misc/register.css"; // แนบ CSS สำหรับสไตล์

// นำเข้ารูปภาพ
import cafe from "../pic/sign.png";
import lifestyle from "../pic/lifestyle.png";
import travel from "../pic/location.png";
import beauty from "../pic/makeup-2.png";
import fashion from "../pic/clothes-hanger.png";
import news from "../pic/newspaper.png";
import other from "../pic/menu.png";
import food from "../pic/restaurant.png";

function Writepost() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handlePost = async () => {
    if (!topic || !selectedCategory || !selectedImage || !content) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("ไม่พบข้อมูลผู้ใช้ใน localStorage");
      }

      const post = {
        topic,
        category: selectedCategory,
        image: selectedImage,
        content,
        user: userId, // ส่ง userId โดยตรงเป็นสตริง
      };

      await createPost(post);

      alert("โพสต์บล็อกสำเร็จ!");
      setSelectedImage(null);
      setTopic("");
      setContent("");
      setSelectedCategory("");
      window.location.href = "/";
    } catch (error) {
      console.error("Post failed:", error);
      alert("เกิดข้อผิดพลาดในการโพสต์บล็อก");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      if (file) {
        reader.readAsDataURL(file);
        setSelectedFileName(file.name);
      } else {
        setSelectedImage(null);
        setSelectedFileName("");
      }
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="write-post-container">
      <div className="nav-post">
        <Navbar2 />
      </div>
      <div className="wp">
        <Row>
          <Col>
            <Form.Label htmlFor="inputTopic">หัวข้อ</Form.Label>
            <Form.Control
              type="text"
              id="inputTopic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={50} // จำกัดจำนวนตัวอักษรที่ป้อน
            />
          </Col>
        </Row>

        <div className="alltype">
          <p>หมวดหมู่ทั้งหมด</p>

          <div className="option-type">
            <img
              src={cafe}
              alt="cafeType"
              onClick={() => handleCategorySelection("คาเฟ่")}
              className={selectedCategory === "คาเฟ่" ? "selected" : ""}
            />
            <img
              src={food}
              alt="foodType"
              onClick={() => handleCategorySelection("ร้านอาหาร")}
              className={selectedCategory === "ร้านอาหาร" ? "selected" : ""}
            />
            <img
              src={fashion}
              alt="fashionType"
              onClick={() => handleCategorySelection("แฟชั่น")}
              className={selectedCategory === "แฟชั่น" ? "selected" : ""}
            />
            <img
              src={travel}
              alt="travelType"
              onClick={() => handleCategorySelection("ท่องเที่ยว")}
              className={selectedCategory === "ท่องเที่ยว" ? "selected" : ""}
            />
            <img
              src={beauty}
              alt="beautyType"
              onClick={() => handleCategorySelection("บิวตี้")}
              className={selectedCategory === "บิวตี้" ? "selected" : ""}
            />
            <img
              src={lifestyle}
              alt="lifestyleType"
              onClick={() => handleCategorySelection("ไลฟ์สไตล์")}
              className={selectedCategory === "ไลฟ์สไตล์" ? "selected" : ""}
            />
            <img
              src={news}
              alt="newsType"
              onClick={() => handleCategorySelection("ข่าวสาร")}
              className={selectedCategory === "ข่าวสาร" ? "selected" : ""}
            />
            <img
              src={other}
              alt="otherType"
              onClick={() => handleCategorySelection("อื่นๆ")}
              className={selectedCategory === "อื่นๆ" ? "selected" : ""}
            />
          </div>
          <p>หมวดหมู่ที่เลือก: {selectedCategory}</p>

          <div className="selectfile">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                <i className="fas fa-image"></i> เพิ่มรูปภาพ
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>
            {selectedImage && (
              <div>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            )}
          </div>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>เนื้อหา</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <div
          className="btnallwp"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button className="post" onClick={handlePost}>
            โพสต์บล็อก
          </button>
          <a href="/" style={{ textDecoration: "none" }}>
            <button className="cancel">Cancel</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Writepost;
