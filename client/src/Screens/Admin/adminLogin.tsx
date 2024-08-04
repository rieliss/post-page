import { useState } from "react";
import "../../misc/login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import Influe from "../../pic/Influencer.png";
import NavbarV2 from "../../Navbar/NavbarV2";
import { loginAdmin } from "../../api/adminlogin-Regist";

const LoginAdmin: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  const displayAlert = (message: string) => {
    setAlertMessage(message);
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const loginResponse = await loginAdmin(email, password);

      if (loginResponse.success) {
        displayAlert("เข้าสู่ระบบสำเร็จ!");

        window.location.href = `/admin/${loginResponse.id}`;
        localStorage.setItem("adminId", loginResponse.id);
      } else {
        displayAlert("Invalid email or password.");
      }
    } catch (error) {
      console.error("มีปัญหาในการเข้าสู่ระบบ:", error);
      displayAlert("โปรดลองอีกครั้ง");
    }
  };

  return (
    <div className="login-container">
      <NavbarV2 />
      <div className="login-content">
        <div className="user-details">
          <Image
            src={Influe}
            alt="Apartment"
            fluid
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="login-form">
          <Form>
            <div className="form-fields">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  style={{
                    width: "240px",
                    padding: "0.8em 1.2em",
                    borderRadius: "15px",
                    border: "2px solid #433E49",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{
                    maxWidth: "280px",
                    padding: "0.8em 1.2em",
                    borderRadius: "15px",
                    border: "2px solid #433E49",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Button
                  className="submit-button"
                  type="submit"
                  style={{
                    backgroundColor: "#433E49",
                    borderRadius: "15px",
                    padding: "0.8em 1.2em",
                  }}
                  onClick={handleLogin}
                >
                  Submit
                </Button>
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
      {alertMessage && (
        <div className="alert-overlay">
          <div className="alertbox">
            {alertMessage.includes("สำเร็จ") ? (
              <FaCheckCircle style={{ color: "#28a745", fontSize: "32px" }} />
            ) : (
              <IoCloseCircle style={{ color: "#dc3545", fontSize: "32px" }} />
            )}
            <p>{alertMessage}</p>
            <button className="btnClose" onClick={handleAlertClose}>
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAdmin;
