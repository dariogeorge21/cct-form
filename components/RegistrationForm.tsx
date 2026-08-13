"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react";

type FormData = {
  name: string;
  dob: string;
  phone: string;
  email: string;
  gender: string;
  yearOfStudy: string;
  parish: string;
  diocese: string;
  parentName: string;
  parentPhone: string;
  confirmed: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type FormTouched = Partial<Record<keyof FormData, boolean>>;

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    phone: "",
    email: "",
    gender: "",
    yearOfStudy: "",
    parish: "",
    diocese: "",
    parentName: "",
    parentPhone: "",
    confirmed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Sanitizer ─────────────────────────────────────────────────────────────
  // Strips HTML tags and trims whitespace to prevent XSS payloads from being
  // stored in state or sent to the server.
  const sanitize = (value: string): string =>
    value.replace(/<[^>]*>/g, "").trim();

  // ─── Field Validators ───────────────────────────────────────────────────────
  const validateField = (name: keyof FormData, value: string | boolean): string => {
    // Non-checkbox empty check
    if (typeof value === "string" && value.trim() === "") {
      if (name === "confirmed") return "";
      return "This field is required.";
    }

    switch (name) {
      // ── Name fields: letters, spaces, hyphens, apostrophes only; 2-120 chars ──
      case "name":
      case "parentName": {
        const v = value as string;
        if (v.trim().length < 2) return "Name must be at least 2 characters.";
        if (v.length > 120) return "Name must not exceed 120 characters.";
        if (!/^[A-Za-z\s\-'.]+$/.test(v))
          return "Name must contain only letters, spaces, hyphens, or apostrophes.";
        return "";
      }

      // ── Email: RFC-style check + max length ────────────────────────────────
      case "email": {
        const v = (value as string).trim();
        if (v.length > 255) return "Email must not exceed 255 characters.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
          return "Enter a valid email address.";
        return "";
      }

      // ── Phone numbers: must contain exactly 10 digits (after stripping formatting) ──
      case "phone":
      case "parentPhone": {
        const v = value as string;
        const digits = v.replace(/\D/g, "");
        if (digits.length < 10) return "Phone number must have at least 10 digits.";
        if (digits.length > 15) return "Phone number must not exceed 15 digits.";
        // Allow: +, digits, spaces, hyphens only
        if (!/^\+?[\d\s\-]+$/.test(v)) return "Enter a valid phone number.";
        return "";
      }

      // ── Date of birth: strict parse, year range 1995-2015 ─────────────────
      case "dob": {
        const v = value as string;
        // Must match YYYY-MM-DD format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return "Enter a valid date (YYYY-MM-DD).";
        const parsed = new Date(v);
        if (isNaN(parsed.getTime())) return "Enter a valid date.";
        const year = parsed.getUTCFullYear();
        const month = parsed.getUTCMonth() + 1;
        const day = parsed.getUTCDate();
        // Guard against JS date overflow (e.g. Feb 30 silently becomes Mar 2)
        const [, mm, dd] = v.split("-").map(Number);
        if (month !== mm || day !== dd) return "Enter a valid calendar date.";
        if (year < 1995 || year > 2015)
          return "Date of birth must be between 1995 and 2015.";
        return "";
      }

      // ── Year of Study: min 2 chars, alphanumeric + basic punctuation ────────
      case "yearOfStudy": {
        const v = value as string;
        if (v.trim().length < 2) return "Please enter your year of study (e.g. 1st Year B.Tech).";
        if (v.length > 100) return "Year of study must not exceed 100 characters.";
        if (!/^[A-Za-z0-9\s\-.()/]+$/.test(v))
          return "Year of study contains invalid characters.";
        return "";
      }

      // ── Parish: min 2 chars, letters + common punctuation ──────────────────
      case "parish": {
        const v = value as string;
        if (v.trim().length < 2) return "Parish name must be at least 2 characters.";
        if (v.length > 200) return "Parish name must not exceed 200 characters.";
        if (!/^[A-Za-z0-9\s\-'.,()]+$/.test(v))
          return "Parish name contains invalid characters.";
        return "";
      }

      // ── Diocese: same rules as parish ──────────────────────────────────────
      case "diocese": {
        const v = value as string;
        if (v.trim().length < 2) return "Diocese name must be at least 2 characters.";
        if (v.length > 200) return "Diocese name must not exceed 200 characters.";
        if (!/^[A-Za-z0-9\s\-'.,()]+$/.test(v))
          return "Diocese name contains invalid characters.";
        return "";
      }

      // ── Confirmation checkbox ───────────────────────────────────────────────
      case "confirmed":
        return value === true ? "" : "You must confirm to proceed.";

      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    // Sanitize text inputs to strip HTML injection attempts
    const val = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : sanitize(value);

    setFormData((prev) => ({ ...prev, [name]: val }));
    // Clear server-side error whenever user edits the form
    if (submitError) setSubmitError(null);

    if (touched[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name as keyof FormData, val),
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const val = isCheckbox ? (e.target as HTMLInputElement).checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof FormData, val),
    }));
  };

  const validateStep1 = () => {
    const step1Fields: (keyof FormData)[] = ["name", "dob", "phone", "email", "gender", "yearOfStudy"];
    const newErrors: FormErrors = {};
    let isValid = true;

    step1Fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      const newTouched = step1Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
      setTouched((prev) => ({ ...prev, ...newTouched }));
    }

    return isValid;
  };

  const validateStep2 = () => {
    const step2Fields: (keyof FormData)[] = ["parish", "diocese", "parentName", "parentPhone", "confirmed"];
    const newErrors: FormErrors = {};
    let isValid = true;

    step2Fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      const newTouched = step2Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
      setTouched((prev) => ({ ...prev, ...newTouched }));
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: document.getElementById("register")?.offsetTop! - 80, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateStep1() || !validateStep2()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        return;
      }

      // Map known error codes to user-friendly messages
      if (result.code === "DUPLICATE_EMAIL") {
        setSubmitError("This email address is already registered for this event.");
      } else if (result.code === "EVENT_CLOSED") {
        setSubmitError("Registrations are currently closed. Please check back later.");
      } else if (result.code === "EVENT_FULL") {
        setSubmitError("Registrations are full. No more spots are available.");
      } else if (response.status === 400 && result.fieldErrors) {
        setSubmitError("Some fields are invalid. Please review your details and try again.");
      } else {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-4xl mx-auto rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-12 text-center animate-fade-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[var(--gold-muted)] mb-6">
          <Check className="text-[var(--gold)] w-8 h-8" />
        </div>
        <p className="eyebrow mb-3">Registration Received</p>
        <h3 className="heading-display text-4xl mb-4">See You There</h3>
        <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
          Thank you for registering. We have received your details and will be in touch with further information soon.
        </p>

        {/* Support Contact */}
        <div className="mt-8 flex flex-col items-center p-4 px-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg)] max-w-lg mx-auto">
          <p className="text-xs text-[var(--text-muted)] text-center mb-2">
            For any event related details or errors in submission, please contact:
          </p>
          <div className="text-sm font-medium text-[var(--text)] text-center">
            Sebin Jo Saji <span className="mx-2 text-[var(--border-subtle)]">|</span> <a href="tel:+919400389831" className="text-[var(--gold-muted)] hover:text-[var(--gold)] transition-colors">+91 94003 89831</a>
          </div>
        </div>

      </div>
    );
  }

  const isSubmitDisabled = isLoading || !formData.confirmed || Object.values(errors).some((e) => e !== "");

  return (
    <div className="w-full max-w-[1800px] mx-auto overflow-hidden">

      {/* Header section (shared) */}
      <div className="mb-10 text-center md:text-left">
        <p className="eyebrow mb-2">Join Us</p>
        <h3 className="heading-display text-4xl md:text-5xl mb-2">Register Now</h3>
        <p className="text-[var(--text-muted)] text-sm">Secure your spot for ORAH 2026</p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-gold)] overflow-hidden">

        {/* Mobile Progress Indicator */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
          <span className="eyebrow">Step {step} of 2</span>
          <div className="flex gap-1">
            <div className={`h-1 w-8 rounded-full transition-colors ${step >= 1 ? 'bg-[var(--gold)]' : 'bg-[var(--border)]'}`} />
            <div className={`h-1 w-8 rounded-full transition-colors ${step >= 2 ? 'bg-[var(--gold)]' : 'bg-[var(--border)]'}`} />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="relative flex flex-col min-h-[500px]">

          <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] w-[200%] md:w-full transition-transform duration-500 ease-in-out flex-grow"
            style={isMobile ? { transform: `translateX(-${(step - 1) * 50}%)` } : {}}>

            {/* --- COLUMN / STEP 1: Personal Info --- */}
            <div className="w-1/2 md:w-full p-6 lg:p-12 shrink-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--gold-muted)] text-[#0d0a05] text-xs font-bold">1</span>
                  <h4 className="text-lg font-semibold text-[var(--gold)] font-display tracking-wide uppercase">Personal Details</h4>
                </div>

                <div className="space-y-6">
                  <FormField
                    label="Full Name" name="name" type="text" placeholder="John Doe"
                    value={formData.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name}
                    disabled={isLoading}
                  />

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <FormField
                      label="Date of Birth" name="dob" type="date" placeholder="DD/MM/YYYY"
                      value={formData.dob} onChange={handleChange} onBlur={handleBlur} error={errors.dob} touched={touched.dob}
                      disabled={isLoading}
                    />
                    <FormSelect
                      label="Gender" name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur} error={errors.gender} touched={touched.gender}
                      options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <FormField
                      label="Phone Number" name="phone" type="tel" placeholder="+91 90000 00000"
                      value={formData.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} touched={touched.phone}
                      disabled={isLoading}
                    />
                    <FormField
                      label="Email Address" name="email" type="email" placeholder="john@example.com"
                      value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email}
                      disabled={isLoading}
                    />
                  </div>

                  <FormField
                    label="Year of Study" name="yearOfStudy" type="text" placeholder="e.g. 1st Year B.Tech"
                    value={formData.yearOfStudy} onChange={handleChange} onBlur={handleBlur} error={errors.yearOfStudy} touched={touched.yearOfStudy}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Mobile Next Button */}
              <div className="md:hidden mt-10">
                <button type="button" onClick={handleNext} disabled={isLoading} className="btn-fill-gold flex items-center justify-center gap-2 group w-full py-4 text-[0.9rem] font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* --- DESKTOP SEPARATOR --- */}
            <div className="hidden md:flex justify-center py-12 relative">
              <div className="w-px bg-gradient-to-b from-transparent via-[var(--border-subtle)] to-transparent h-full"></div>
            </div>

            {/* --- COLUMN / STEP 2: Church, Parent Info --- */}
            <div className="w-1/2 md:w-full p-6 lg:p-12 shrink-0 flex flex-col justify-between bg-[var(--bg-secondary)] md:bg-transparent">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--gold-muted)] text-[#0d0a05] text-xs font-bold">2</span>
                  <h4 className="text-lg font-semibold text-[var(--gold)] font-display tracking-wide uppercase">Additional Info</h4>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <FormField
                      label="Parish Name" name="parish" type="text" placeholder="St. Mary's Church"
                      value={formData.parish} onChange={handleChange} onBlur={handleBlur} error={errors.parish} touched={touched.parish}
                      disabled={isLoading}
                    />
                    <FormField
                      label="Diocese Name" name="diocese" type="text" placeholder="Pala"
                      value={formData.diocese} onChange={handleChange} onBlur={handleBlur} error={errors.diocese} touched={touched.diocese}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <FormField
                      label="Parent Name" name="parentName" type="text" placeholder="Parent's Full Name"
                      value={formData.parentName} onChange={handleChange} onBlur={handleBlur} error={errors.parentName} touched={touched.parentName}
                      disabled={isLoading}
                    />
                    <FormField
                      label="Parent Phone" name="parentPhone" type="tel" placeholder="+91 90000 00000"
                      value={formData.parentPhone} onChange={handleChange} onBlur={handleBlur} error={errors.parentPhone} touched={touched.parentPhone}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <label className={`flex items-start gap-4 cursor-pointer group p-4 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg)] hover:border-[var(--gold-muted)] transition-colors ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}>
                  <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                    <input
                      type="checkbox" name="confirmed"
                      checked={formData.confirmed} onChange={handleChange} onBlur={handleBlur}
                      disabled={isLoading}
                      className="peer appearance-none w-5 h-5 border border-[var(--input-border)] rounded bg-[var(--input-bg)] checked:bg-[var(--gold-muted)] checked:border-[var(--gold-muted)] transition-colors cursor-pointer"
                    />
                    <Check className="absolute w-3 h-3 text-[var(--bg-card)] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-sm text-[var(--text)] font-medium">Information Confirmation</span>
                    <p className="text-xs text-[var(--text-muted)] mt-1">I confirm that all the details provided above are accurate and true to my knowledge.</p>
                    {touched.confirmed && errors.confirmed && (
                      <p className="text-[var(--destructive)] text-xs mt-2">{errors.confirmed}</p>
                    )}
                  </div>
                </label>

                {/* Inline Server Error Banner */}
                {submitError && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-[var(--destructive)] bg-[var(--destructive)]/10 animate-fade-up">
                    <AlertCircle className="w-4 h-4 text-[var(--destructive)] shrink-0 mt-0.5" />
                    <p className="text-[var(--destructive)] text-xs leading-relaxed">{submitError}</p>
                  </div>
                )}

                {/* Mobile buttons */}
                <div className="flex gap-4 md:hidden">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="btn-outline-gold flex-1 flex items-center justify-center gap-2 group py-4 text-[0.9rem] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="btn-fill-gold flex-1 flex items-center justify-center gap-2 group py-4 text-[0.9rem] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                    ) : (
                      <>Submit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Footer Submit Button */}
          <div className="hidden md:flex items-center justify-between p-8 lg:px-12 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
            <div>
              <h5 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider mb-1">Ready to Register?</h5>
              <p className="text-xs text-[var(--text-muted)]">
                {submitError
                  ? <span className="text-[var(--destructive)] flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" />{submitError}</span>
                  : "Please review your information before final submission."
                }
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="btn-fill-gold flex items-center justify-center gap-2 group px-8 py-4 text-[0.9rem] font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none min-w-[200px]"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              ) : (
                <>Submit Registration <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Support Contact */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between p-4 px-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-3xl mx-auto">
        <p className="text-xs text-[var(--text-muted)] text-center md:text-left mb-2 md:mb-0">
          For any event related details or errors in submission, please contact:
        </p>
        <div className="text-sm font-medium text-[var(--text)] text-center md:text-right">
          Sebin Jo Saji <span className="mx-2 text-[var(--border-subtle)]">|</span> <a href="tel:+919400389831" className="text-[var(--gold-muted)] hover:text-[var(--gold)] transition-colors">+91 94003 89831</a>
        </div>
      </div>
    </div>
  );
}

// ─── Shared Form Components ──────────────────────────────────────────────────

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
};

function FormField({ label, name, type = "text", placeholder, value, onChange, onBlur, error, touched, disabled }: FieldProps) {
  const hasError = touched && error;

  return (
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-[0.65rem] uppercase tracking-wider text-[var(--text-dim)] mb-1.5 font-semibold">
        {label}
      </label>
      <input
        id={name} name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}
        className={`w-full px-3 py-2.5 bg-[var(--input-bg)] border ${hasError ? 'border-[var(--destructive)]' : 'border-[var(--input-border)]'} rounded-[3px] text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none transition-colors focus:border-[var(--gold-muted)] disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      <div className={`overflow-hidden transition-all duration-300 ${hasError ? 'max-h-6 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
        <p className="text-[var(--destructive)] text-[0.65rem]">{error}</p>
      </div>
    </div>
  );
}

function FormSelect({ label, name, value, onChange, onBlur, error, touched, options, disabled }: FieldProps & { options: { value: string, label: string }[], disabled?: boolean }) {
  const hasError = touched && error;

  return (
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-[0.65rem] uppercase tracking-wider text-[var(--text-dim)] mb-1.5 font-semibold">
        {label}
      </label>
      <div className="relative">
        <select
          id={name} name={name} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}
          className={`appearance-none w-full px-3 py-2.5 bg-[var(--input-bg)] border ${hasError ? 'border-[var(--destructive)]' : 'border-[var(--input-border)]'} rounded-[3px] text-sm ${value ? 'text-[var(--text)]' : 'text-[var(--text-dim)]'} outline-none transition-colors focus:border-[var(--gold-muted)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--gold-muted)]">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${hasError ? 'max-h-6 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
        <p className="text-[var(--destructive)] text-[0.65rem]">{error}</p>
      </div>
    </div>
  );
}
