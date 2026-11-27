"use client";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function validate(v: { name: string; email: string; subject: string; message: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  if (v.message.length > 3000) e.message = "Please keep it under 3000 characters.";
  return e;
}

export default function ContactSection() {
  const [v, setV] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<{ kind: "idle" | "sending" | "ok" | "bad"; msg?: string }>({ kind: "idle" });
  const [started] = useState(() => Date.now());

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setState({ kind: "bad", msg: "Please fix the highlighted fields." });
      return;
    }
    setState({ kind: "sending" });
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, elapsed: Date.now() - started }) });
      const data = (await r.json().catch(() => ({}))) as { message?: string };
      if (r.ok) {
        setState({ kind: "ok", msg: data.message ?? "Thanks, your message has been sent. I will reply soon." });
        setV({ name: "", email: "", subject: "", message: "", website: "" });
      } else {
        setState({ kind: "bad", msg: data.message ?? `Sorry, the message could not be sent. Please email ${profile.email}.` });
      }
    } catch {
      setState({ kind: "bad", msg: `Sorry, the message could not be sent. Please email ${profile.email}.` });
    }
  }

  const field = (k: "name" | "email" | "subject", label: string, type = "text", auto?: string) => (
    <div className="field">
      <label htmlFor={`cf-${k}`}>{label}</label>
      <input id={`cf-${k}`} type={type} autoComplete={auto} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `cf-${k}-err` : undefined} />
      {errors[k] && <span className="err" id={`cf-${k}-err`}>{errors[k]}</span>}
    </div>
  );

  return (
    <section id="contact" className="section gut" aria-labelledby="contact-h">
      <div className="contact">
        <div>
          <h2 id="contact-h" className="big-title" style={{ margin: 0 }}>Contact</h2>
          <p style={{ color: "#d8d8dc" }}>Hiring for a graduate or junior analyst role in Perth? I would like to hear about it.</p>
          <ul className="contact-list">
            {profile.email && (
              <li><Mail size={18} /> <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            )}
            {profile.linkedin && (
              <li><LinkedinIcon /> <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn profile</a></li>
            )}
            {profile.github && (
              <li><GithubIcon /> <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            )}
            <li><MapPin size={18} /> {profile.location}</li>
          </ul>
        </div>
        <form className="cf" onSubmit={submit} noValidate aria-describedby="cf-status">
          <div className="two">
            {field("name", "Name", "text", "name")}
            {field("email", "Email", "email", "email")}
          </div>
          {field("subject", "Subject")}
          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" rows={6} value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined} />
            {errors.message && <span className="err" id="cf-message-err">{errors.message}</span>}
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="cf-website">Leave this empty</label>
            <input id="cf-website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
          </div>
          <div>
            <button className="btn btn-red" type="submit" disabled={state.kind === "sending"}>
              <Send size={18} /> {state.kind === "sending" ? "Sending" : "Send message"}
            </button>
          </div>
          <div id="cf-status" aria-live="polite">
            {state.msg && <p className={`form-msg ${state.kind === "ok" ? "ok" : "bad"}`}>{state.msg}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
