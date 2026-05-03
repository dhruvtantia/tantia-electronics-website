import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const variants = {
  primary: "bg-brandRed text-white hover:bg-redDark border-brandRed",
  secondary: "bg-white text-navy border-border hover:border-brandRed",
  dark: "bg-navy text-white border-navy hover:bg-navyDark",
  yellow: "bg-transparent text-yellow border-yellow hover:bg-yellow hover:text-navy",
};

export default function Button({ children, to, href, variant = "primary", icon = true, className = "", ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-bold uppercase tracking-wide transition ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon && <ArrowRight size={16} aria-hidden="true" />}
    </>
  );

  if (to) return <Link className={classes} to={to} {...props}>{content}</Link>;
  if (href) return <a className={classes} href={href} {...props}>{content}</a>;
  return <button className={classes} {...props}>{content}</button>;
}
