import { useEffect } from "react";
import { SITE } from "../../config/site";

export default function SEO({ title, description, keywords = [] }) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    if (keywords.length > 0) setMeta("keywords", keywords.join(", "));
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", SITE.businessName, "property");
  }, [title, description, keywords]);

  return null;
}

function setMeta(name, content, attr = "name") {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
