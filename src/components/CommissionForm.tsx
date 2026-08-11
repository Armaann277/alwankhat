"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

type FieldName = "name" | "email" | "kind" | "brief";

const kinds = ["A painting", "A calligraphy piece"];

const errors: Record<FieldName, string> = {
  name: "Please tell us your name.",
  email: "Please add an email so we can reach you.",
  kind: "Choose the kind of piece you have in mind.",
  brief: "A line or two about what you imagine helps us start.",
};

function validate(form: FormData) {
  const out: Partial<Record<FieldName, string>> = {};
  if (!String(form.get("name") ?? "").trim()) out.name = errors.name;
  const email = String(form.get("email") ?? "").trim();
  if (!email) out.email = errors.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) out.email = "That email doesn’t look right — mind checking it?";
  if (!String(form.get("kind") ?? "").trim()) out.kind = errors.kind;
  if (String(form.get("brief") ?? "").trim().length < 10) out.brief = errors.brief;
  return out;
}

export function CommissionForm() {
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(new FormData(form));
    setFieldErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="rounded-[24px] border border-white/60 bg-white/70 p-8 shadow-rose backdrop-blur-sm md:p-10"
        role="status"
      >
        <p className="font-script text-3xl leading-[1.15] text-rose">yours, received</p>
        <h3 className="mt-4 font-display text-2xl italic text-ink">
          It has reached us.
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-inksoft">
          Thank you for trusting a single line to us. Expect a reply within two
          or three days — we read every brief slowly, the way we draw.
        </p>
      </motion.div>
    );
  }

  const inputClass = (invalid?: string) =>
    `w-full rounded-xl border bg-bg px-4 py-3.5 text-[15px] text-ink placeholder:text-inkfaint transition-colors duration-200 ease-out focus:outline-none ${
      invalid
        ? "border-dust/70 focus:border-dust"
        : "border-hairline focus:border-rose"
    }`;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-[24px] border border-white/60 bg-white/70 p-8 shadow-rose backdrop-blur-sm md:p-10"
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-[13.5px] text-ink">
            Name
          </label>
          <input id="name" name="name" type="text" className={inputClass(fieldErrors.name)} placeholder="Your name" />
          {fieldErrors.name ? (
            <p className="text-[13px] text-dust">{fieldErrors.name}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-[13.5px] text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" className={inputClass(fieldErrors.email)} placeholder="name@example.com" />
          {fieldErrors.email ? (
            <p className="text-[13px] text-dust">{fieldErrors.email}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <span className="text-[13.5px] text-ink">What would you like made?</span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="kind-label">
            {kinds.map((kind, index) => (
              <label
                key={kind}
                className="cursor-pointer rounded-full border border-hairline px-4 py-2 text-[13.5px] text-inksoft transition-colors duration-200 ease-out has-[:checked]:border-rose has-[:checked]:bg-blush/50 has-[:checked]:text-ink hover:text-ink"
              >
                <input
                  type="radio"
                  name="kind"
                  value={kind}
                  defaultChecked={index === 0}
                  className="sr-only"
                />
                {kind}
              </label>
            ))}
          </div>
          {fieldErrors.kind ? (
            <p className="text-[13px] text-dust">{fieldErrors.kind}</p>
          ) : null}
          <span id="kind-label" className="sr-only">
            Kind of commission
          </span>
        </div>

        <div className="grid gap-2">
          <label htmlFor="brief" className="text-[13.5px] text-ink">
            The idea
          </label>
          <textarea
            id="brief"
            name="brief"
            rows={5}
            className={`${inputClass(fieldErrors.brief)} resize-y`}
            placeholder="A verse, a name, a feeling — or nothing at all. We begin with a conversation."
          />
          {fieldErrors.brief ? (
            <p className="text-[13px] text-dust">{fieldErrors.brief}</p>
          ) : null}
          <p className="text-[12.5px] text-inkfaint">
            No budgets or deadlines needed yet — we’ll shape those together.
          </p>
        </div>

        <button type="submit" className="btn-pill btn-pill-primary w-full">
          Send the brief
        </button>
      </div>
    </form>
  );
}