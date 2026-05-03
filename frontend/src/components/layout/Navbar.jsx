import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SITE } from "../../config/site";
import Button from "../common/Button";

const links = [
  { label: "Home", to: "/" },
  { label: "Brands", to: "/brands" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `border-b-2 py-6 text-sm font-black uppercase tracking-wide transition ${isActive ? "border-brandRed text-brandRed" : "border-transparent text-navy hover:text-brandRed"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
        <NavLink to="/" className="flex items-center gap-3 py-4">
          <span className="flex h-10 w-10 items-center justify-center bg-brandRed text-white"><Zap size={22} /></span>
          <span className="text-base font-black text-navy md:text-lg">{SITE.businessName}</span>
        </NavLink>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={linkClass}>{link.label}</NavLink>)}
        </nav>
        <div className="hidden lg:block">
          <Button to="/contact" icon={false}>Send Enquiry</Button>
        </div>
        <button className="p-2 text-navy lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="font-bold uppercase tracking-wide text-navy">
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" icon={false}>Send Enquiry</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
