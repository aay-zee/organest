// Hero.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import laptopImage from "../assets/react.svg";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setDemoError("");
    try {
      const { data } = await authApi.login({
        email: "demo@example.com",
        password: "demo123",
      });
      if (data?.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/dashboard", { replace: true });
      }
    } catch {
      setDemoError("Demo login failed. Please try again.");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
  <section className="container py-5 my-5">
    <div className="row align-items-center">
      <div className="col-md-6 p-4">
        {/* Headline - Dark Text */}
        <h1 className="display-4 fw-bold mb-3" style={{ color: "#2D3748" }}>
          Master Your Studies. Organize Your Mind.
        </h1>
        {/* Subtitle - Muted Text */}
        <p className="lead mb-5 text-secondary">
          All-in-one task management, note-taking, and planning for students.
          Focus on what matters, stress less.
        </p>

        {/* CTAs */}
        <div className="d-flex gap-3 flex-wrap">
          {/* Demo Sign In CTA */}
          <button
            onClick={handleDemoLogin}
            disabled={demoLoading}
            className="btn rounded fw-bold py-3 px-5"
            style={{ color: "#319795", borderColor: "#319795", border: "2px solid #319795" }}
          >
            {demoLoading ? "Signing in..." : "Try Demo"}
          </button>

          {/* Primary CTA - Solid Teal */}
          <a
            href="#start"
            className="btn rounded fw-bold py-3 px-5 text-white"
            style={{ backgroundColor: "#319795", borderColor: "#319795" }}
          >
            Start Organizing For Free
          </a>

          {/* Secondary CTA - Outline Teal */}
          <a
            href="#learn"
            className="btn btn-outline rounded fw-bold py-3 px-5"
            style={{ color: "#319795", borderColor: "#319795" }}
          >
            Learn More
          </a>
        </div>
        {demoError && <p className="text-danger mt-2 small">{demoError}</p>}
      </div>

      <div className="col-md-6 text-center" id="laptop">
        <img
          src={laptopImage}
          alt="Minimalist Laptop"
          className="img-fluid rounded"
        />
      </div>
    </div>
  </section>
  );
};

export default Hero;
