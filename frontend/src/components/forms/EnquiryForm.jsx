import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Button from "../common/Button";
import { submitEnquiry } from "../../services/enquiries";
import { trackEnquirySubmit } from "../../services/analytics";
import { getLeadJourneySnapshot } from "../../services/journey";

const initial = { fullName: "", company: "", email: "", phone: "", message: "" };
const emailPattern = /^[^\s@]{2,}@[^\s@.]+(\.[^\s@.]+)+$/;

function normalizePhoneInput(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

export default function EnquiryForm({
  type = "general",
  relatedBrand = null,
  relatedCategory = null,
  sourcePage = "",
  defaultMessage = "",
  id,
  title,
  description,
  submitLabel = "Send Enquiry",
}) {
  const [form, setForm] = useState({ ...initial, message: defaultMessage });
  const [submitting, setSubmitting] = useState(false);
  const previousDefaultMessage = useRef(defaultMessage);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      message:
        current.message === previousDefaultMessage.current || !current.message
          ? defaultMessage
          : current.message,
    }));
    previousDefaultMessage.current = defaultMessage;
  }, [defaultMessage]);

  function updateField(event) {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? normalizePhoneInput(value) : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
  }

  function validateForm() {
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (!form.fullName.trim() || !form.message.trim()) {
      return "Please fill full name and message / product interest.";
    }
    if (!email && !phone) {
      return "Please provide either a phone number or an email address so we can contact you.";
    }
    if (email && !emailPattern.test(email)) {
      return "Please enter a valid business email address, for example name@company.com.";
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      return "Please enter a valid 10-digit phone number.";
    }
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSubmitting(true);
    try {
      const email = form.email.trim();
      const phone = form.phone.trim();
      await submitEnquiry({
        type,
        relatedBrand,
        relatedCategory,
        sourcePage,
        ...form,
        fullName: form.fullName.trim(),
        email: email || null,
        phone: phone || null,
        message: form.message.trim(),
        ...getLeadJourneySnapshot(),
      });
      trackEnquirySubmit(type);
      toast.success("Thank you. Your enquiry has been sent. We will get back to you shortly.");
      setForm({ ...initial, message: defaultMessage });
    } catch (error) {
      toast.error(error.message || "Unable to send enquiry right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="scroll-mt-24 border border-border bg-white p-6 shadow-sm reveal-on-scroll">
      {(title || description) && (
        <div className="mb-5">
          {title && <h2 className="text-2xl font-black text-navy">{title}</h2>}
          {description && <p className="mt-2 text-sm leading-6 text-mutedText">{description}</p>}
        </div>
      )}
      <div className="grid gap-4">
        <Field label="Full Name *" name="fullName" value={form.fullName} onChange={updateField} required autoComplete="name" />
        <Field label="Company" name="company" value={form.company} onChange={updateField} autoComplete="organization" />
        <Field
          label="Email (phone or email required)"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          autoComplete="email"
          inputMode="email"
          pattern="[^\s@]{2,}@[^\s@.]+(\.[^\s@.]+)+"
          title="Enter a valid email address, for example name@company.com"
        />
        <PhoneField value={form.phone} onChange={updateField} />
        <label className="grid gap-2 text-sm font-bold text-navy">
          Message / Product Interest *
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            rows={5}
            required
            placeholder="Tell us what products / brands you are interested in, quantity, and timeline."
            className="border border-border px-4 py-3 font-normal text-navy outline-none focus:border-brandRed"
          />
        </label>
        <Button type="submit" disabled={submitting} icon={false} className="w-full">
          {submitting ? "Sending..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-navy">
      {label}
      <input className="border border-border px-4 py-3 font-normal text-navy outline-none focus:border-brandRed" {...props} />
    </label>
  );
}

function PhoneField({ value, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-navy">
      Phone (phone or email required)
      <div className="flex overflow-hidden border border-border bg-white focus-within:border-brandRed">
        <span className="flex min-w-20 items-center justify-center border-r border-border bg-offWhite px-4 font-bold text-navy">+91</span>
        <input
          className="min-w-0 flex-1 px-4 py-3 font-normal text-navy outline-none"
          name="phone"
          type="tel"
          value={value}
          onChange={onChange}
          autoComplete="tel-national"
          inputMode="numeric"
          pattern="\d{10}"
          maxLength={16}
          placeholder="9810083392"
          title="Enter a 10-digit phone number without +91"
        />
      </div>
    </label>
  );
}
