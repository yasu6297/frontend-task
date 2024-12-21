import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState(null);


  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) navigate("/home");
  }, [navigate]);

  const validate = () => {
    let formErrors = {};

    if (formData.username !== "emilys") {
      formErrors.username = "Username must be 'emilys'.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format.";
    }

    if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setFocusedField(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/home");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="illustration-wrapper">
        <img
          src="/Illustration (1).png"
          alt="Login Illustration"
          className="illustration-image"
        />
      </div>
      <div className="form-wrapper">
        <h2 className="welcome-header">
          Welcome to <h4 className="purple">Unstop</h4>
        </h2>
        <div className="social-login">
          <button className="google-login">
            <img src="/search 1.png" alt="Google" />
            <span className="GOOGLE">Login with Google</span>
          </button>
          <button className="facebook-login">
            <img src="/Vector.png" alt="Facebook" />{" "}
            <span className="FACEBOOK">Login with Facebook</span>
          </button>
        </div>
        <div className="separator">
          <p className="or-text">______________________OR________________________</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">User Name</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <img className="image" src="/account.png" />
              </span>
              <input
                type="text"
                className="form-input"
                placeholder={focusedField === "username" ? "" : "username"}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                onFocus={() => handleFocus("username")}
                onBlur={() => handleBlur("username")}
              />
            </div>
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <img className="image" src="/email.png" />
              </span>
              <input
                type="email"
                className="form-input"
                placeholder={focusedField === "email" ? "" : "username@gmail.com"}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
            </div>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper password-wrapper">
              <span className="input-icon">
                <img className="image" src="/key.png" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder={focusedField === "password" ? "" : "***********"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              />
             <button
      type="button"
      className="toggle-password"
      onClick={() => setShowPassword((prev) => !prev)}
    >
      <img
        src={showPassword ? "/visibility (1).png" : "/visibility.png"}
        alt={showPassword ? "Hide Password" : "Show Password"}
        className="toggle-password-icon"
      />
    </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <button className="forgot-password" type="button">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <p className="register-text">
          Don’t have an account?{" "}
          <button className="register-link" type="button">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
