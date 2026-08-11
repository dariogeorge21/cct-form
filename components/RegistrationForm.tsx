"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

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
  paymentOption: string;
  txId: string;
  confirmed: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type FormTouched = Partial<Record<keyof FormData, boolean>>;

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
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
    paymentOption: "pay-now",
    txId: "",
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

  const validateField = (name: keyof FormData, value: string | boolean): string => {
    if (typeof value === "string" && value.trim() === "" && name !== "txId") {
      if (name === "confirmed") return ""; // handled separately
      return "This field is required.";
    }

    switch (name) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string) ? "" : "Enter a valid email address.";
      case "phone":
      case "parentPhone":
        return /^\+?[\d\s-]{10,}$/.test(value as string) ? "" : "Enter a valid phone number.";
      case "txId":
        if (formData.paymentOption === "pay-at-event" && (value as string).trim() === "") {
          return "Transaction ID is required for Pay at Event.";
        }
        return "";
      case "confirmed":
        return value === true ? "" : "You must confirm to proceed.";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const val = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    
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
    const step2Fields: (keyof FormData)[] = ["parish", "diocese", "parentName", "parentPhone", "txId", "confirmed"];
    const newErrors: FormErrors = {};
    let isValid = true;

    step2Fields.forEach((field) => {
      if (field === "txId" && formData.paymentOption === "pay-now") return;
      
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1() && validateStep2()) {
      setSubmitted(true);
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
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto overflow-hidden">
      
      {/* Header section (shared) */}
      <div className="mb-10 text-center md:text-left">
        <p className="eyebrow mb-2">Join Us</p>
        <h3 className="heading-display text-4xl md:text-5xl mb-2">Register Now</h3>
        <p className="text-[var(--text-muted)] text-sm">Secure your spot for VERITAS</p>
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

        <form onSubmit={handleSubmit} noValidate className="relative min-h-[500px]">
          
          <div className="flex w-[200%] md:w-full transition-transform duration-500 ease-in-out h-full"
               style={isMobile ? { transform: `translateX(-${(step - 1) * 50}%)` } : {}}>
            
            {/* --- COLUMN / STEP 1: Personal Info --- */}
            <div className="w-1/2 md:w-[45%] p-6 md:p-10 shrink-0 h-full flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-[var(--gold)] mb-6 md:mb-8 font-display tracking-wide uppercase">01 / Personal Details</h4>
                
                <div className="space-y-5">
                  <FormField 
                    label="Full Name" name="name" type="text" placeholder="John Doe" 
                    value={formData.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name} 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField 
                      label="Date of Birth" name="dob" type="date" placeholder="DD/MM/YYYY" 
                      value={formData.dob} onChange={handleChange} onBlur={handleBlur} error={errors.dob} touched={touched.dob} 
                    />
                    <FormSelect 
                      label="Gender" name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur} error={errors.gender} touched={touched.gender}
                      options={[{value: "male", label: "Male"}, {value: "female", label: "Female"}, {value: "other", label: "Other"}]}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField 
                      label="Phone Number" name="phone" type="tel" placeholder="+91 90000 00000" 
                      value={formData.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} touched={touched.phone} 
                    />
                    <FormField 
                      label="Email Address" name="email" type="email" placeholder="john@example.com" 
                      value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} 
                    />
                  </div>

                  <FormField 
                    label="Year of Study" name="yearOfStudy" type="text" placeholder="e.g. 1st Year B.Tech" 
                    value={formData.yearOfStudy} onChange={handleChange} onBlur={handleBlur} error={errors.yearOfStudy} touched={touched.yearOfStudy} 
                  />
                </div>
              </div>

              {/* Mobile Next Button */}
              <div className="md:hidden mt-10">
                <button type="button" onClick={handleNext} className="btn-fill-gold flex items-center justify-center gap-2 group w-full py-4 text-[0.8rem]">
                  Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* --- DESKTOP SEPARATOR --- */}
            <div className="hidden md:flex w-[10%] shrink-0 justify-center py-10 relative">
              <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--gold-muted)] to-transparent opacity-30"></div>
              <div className="w-[1px] bg-[var(--border-subtle)] h-full"></div>
            </div>

            {/* --- COLUMN / STEP 2: Church, Parent, Payment --- */}
            <div className="w-1/2 md:w-[45%] p-6 md:p-10 shrink-0 h-full flex flex-col justify-between bg-[var(--bg-secondary)] md:bg-transparent">
              <div>
                <h4 className="text-lg font-semibold text-[var(--gold)] mb-6 md:mb-8 font-display tracking-wide uppercase">02 / Additional Info</h4>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField 
                      label="Parish Name" name="parish" type="text" placeholder="St. Mary's Church" 
                      value={formData.parish} onChange={handleChange} onBlur={handleBlur} error={errors.parish} touched={touched.parish} 
                    />
                    <FormField 
                      label="Diocese Name" name="diocese" type="text" placeholder="Pala" 
                      value={formData.diocese} onChange={handleChange} onBlur={handleBlur} error={errors.diocese} touched={touched.diocese} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField 
                      label="Parent Name" name="parentName" type="text" placeholder="Parent's Full Name" 
                      value={formData.parentName} onChange={handleChange} onBlur={handleBlur} error={errors.parentName} touched={touched.parentName} 
                    />
                    <FormField 
                      label="Parent Phone" name="parentPhone" type="tel" placeholder="+91 90000 00000" 
                      value={formData.parentPhone} onChange={handleChange} onBlur={handleBlur} error={errors.parentPhone} touched={touched.parentPhone} 
                    />
                  </div>

                  {/* Payment Section */}
                  <div className="mt-8 p-5 border border-[var(--border-subtle)] rounded-md bg-[var(--bg)]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold tracking-wider text-[var(--text)] uppercase">Registration Fee</span>
                      <span className="text-lg font-display text-[var(--gold)] font-bold tracking-widest">₹800</span>
                    </div>

                    <FormSelect 
                      label="Payment Method" name="paymentOption" value={formData.paymentOption} onChange={handleChange} onBlur={handleBlur} 
                      options={[{value: "pay-now", label: "Pay Now"}, {value: "pay-at-event", label: "Pay At Event"}]}
                    />

                    {formData.paymentOption === "pay-at-event" && (
                      <div className="mt-4 animate-fade-up">
                        <FormField 
                          label="Transaction ID / Receipt No." name="txId" type="text" placeholder="Enter details if any" 
                          value={formData.txId} onChange={handleChange} onBlur={handleBlur} error={errors.txId} touched={touched.txId} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                    <input 
                      type="checkbox" name="confirmed" 
                      checked={formData.confirmed} onChange={handleChange} onBlur={handleBlur}
                      className="peer appearance-none w-5 h-5 border border-[var(--input-border)] rounded-sm bg-[var(--input-bg)] checked:bg-[var(--gold-muted)] checked:border-[var(--gold-muted)] transition-colors cursor-pointer"
                    />
                    <Check className="absolute w-3 h-3 text-[var(--bg-card)] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">I confirm that all the details provided above are correct.</span>
                    {touched.confirmed && errors.confirmed && (
                      <p className="text-[var(--destructive)] text-[0.65rem] mt-1">{errors.confirmed}</p>
                    )}
                  </div>
                </label>

                <div className="flex gap-4">
                  {/* Mobile Back Button */}
                  <button type="button" onClick={handleBack} className="md:hidden btn-outline-gold flex-1 flex items-center justify-center gap-2 group py-4 text-[0.8rem]">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                  </button>

                  <button 
                    type="submit" 
                    disabled={!formData.confirmed || Object.values(errors).some(e => e !== "")}
                    className="btn-fill-gold flex-1 flex items-center justify-center gap-2 group py-4 text-[0.8rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--gold-muted)] disabled:hover:text-[#0d0a05] disabled:hover:border-[var(--gold-muted)]"
                  >
                    Submit Registration <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </form>
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
};

function FormField({ label, name, type = "text", placeholder, value, onChange, onBlur, error, touched }: FieldProps) {
  const hasError = touched && error;
  
  return (
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-[0.65rem] uppercase tracking-wider text-[var(--text-dim)] mb-1.5 font-semibold">
        {label}
      </label>
      <input
        id={name} name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} onBlur={onBlur}
        className={`w-full px-3 py-2.5 bg-[var(--input-bg)] border ${hasError ? 'border-[var(--destructive)]' : 'border-[var(--input-border)]'} rounded-[3px] text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none transition-colors focus:border-[var(--gold-muted)]`}
      />
      <div className={`overflow-hidden transition-all duration-300 ${hasError ? 'max-h-6 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
        <p className="text-[var(--destructive)] text-[0.65rem]">{error}</p>
      </div>
    </div>
  );
}

function FormSelect({ label, name, value, onChange, onBlur, error, touched, options }: FieldProps & { options: {value: string, label: string}[] }) {
  const hasError = touched && error;

  return (
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-[0.65rem] uppercase tracking-wider text-[var(--text-dim)] mb-1.5 font-semibold">
        {label}
      </label>
      <div className="relative">
        <select
          id={name} name={name} value={value} onChange={onChange} onBlur={onBlur}
          className={`appearance-none w-full px-3 py-2.5 bg-[var(--input-bg)] border ${hasError ? 'border-[var(--destructive)]' : 'border-[var(--input-border)]'} rounded-[3px] text-sm ${value ? 'text-[var(--text)]' : 'text-[var(--text-dim)]'} outline-none transition-colors focus:border-[var(--gold-muted)] cursor-pointer`}
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--gold-muted)]">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${hasError ? 'max-h-6 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
        <p className="text-[var(--destructive)] text-[0.65rem]">{error}</p>
      </div>
    </div>
  );
}
