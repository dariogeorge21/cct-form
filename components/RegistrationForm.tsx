"use client";

// ─── RegistrationForm ─────────────────────────────────────────────────────────
// Dark bordered registration panel matching the reference image.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    parish: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      id="register"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "2.25rem 2rem",
      }}
    >
      {submitted ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem 0",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.75rem",
            }}
          >
            Registration Received
          </p>
          <p
            style={{
              color: "var(--text)",
              fontSize: "0.85rem",
              lineHeight: 1.6,
            }}
          >
            Thank you! We&apos;ll be in touch with confirmation details soon.
          </p>
        </div>
      ) : (
        <>
          <p
            className="eyebrow"
            style={{ marginBottom: "0.5rem", color: "var(--gold-muted)" }}
          >
            Join Us
          </p>

          <h3
            className="heading-display"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              marginBottom: "0.35rem",
              color: "var(--text)",
              fontFamily:
                "var(--font-barlow-condensed), 'Barlow Condensed', Impact, 'Arial Narrow', sans-serif",
            }}
          >
            REGISTER NOW
          </h3>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginBottom: "1.75rem",
            }}
          >
            Secure your spot for VERITAS
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="reg-name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <FormField
              id="reg-email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <FormField
              id="reg-phone"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            {/* Parish Select */}
            <div style={{ marginBottom: "1rem", position: "relative" }}>
              <select
                id="reg-parish"
                name="parish"
                value={form.parish}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.7rem 2.25rem 0.7rem 0.9rem",
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  borderRadius: "3px",
                  color: form.parish ? "var(--text)" : "var(--text-dim)",
                  fontSize: "0.78rem",
                  appearance: "none",
                  WebkitAppearance: "none",
                  outline: "none",
                  cursor: "pointer",
                  transition: "border-color 0.25s ease",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold-muted)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--input-border)";
                }}
              >
                <option value="" disabled>
                  Select Your Parish / Church
                </option>
                <option value="st-thomas">St Thomas Church, Pala</option>
                <option value="st-george">St George Church</option>
                <option value="st-mary">St Mary&apos;s Cathedral</option>
                <option value="st-joseph">St Joseph&apos;s Church</option>
                <option value="other">Other</option>
              </select>
              {/* Dropdown arrow */}
              <span
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "var(--gold-muted)",
                  fontSize: "0.7rem",
                }}
              >
                ▾
              </span>
            </div>

            <button
              type="submit"
              className="btn-fill-gold"
              style={{ marginTop: "0.25rem" }}
            >
              Register Now
            </button>
          </form>

          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--text-dim)",
              textAlign: "center",
              marginTop: "1rem",
              letterSpacing: "0.04em",
            }}
          >
            Spots are limited. Register soon!
          </p>
        </>
      )}
    </div>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────
type FormFieldProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

function FormField({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: FormFieldProps) {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "0.7rem 0.9rem",
          backgroundColor: "var(--input-bg)",
          border: "1px solid var(--input-border)",
          borderRadius: "3px",
          color: "var(--text)",
          fontSize: "0.78rem",
          outline: "none",
          transition: "border-color 0.25s ease",
          fontFamily: "inherit",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--gold-muted)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--input-border)";
        }}
      />
    </div>
  );
}
