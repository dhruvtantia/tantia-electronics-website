import { ASSETS } from "../config/assets";

export const categories = [
  {
    name: "Wires & Cables",
    slug: "wires-cables",
    imageUrl: ASSETS.productImages["wires-cables"],
    shortDescription: "Industrial and commercial wires and cable supply.",
    longDescription:
      "Source wires and cables for electrical contractors, panel builders, maintenance teams and dealer counters with catalogue-backed product discovery.",
    productLines: ["Single core wires", "Multi-core cables", "Flexible cables", "Industrial wiring", "Panel wiring"],
    relatedBrands: ["sgi-wires", "novoflex", "woer", "brisk", "venus-switches"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Switches",
    slug: "switches",
    imageUrl: ASSETS.productImages.switches,
    shortDescription: "Switches and switchgear-adjacent product lines.",
    longDescription:
      "Browse switch product ranges for trade counters, projects, repairs and industrial electrical supply requirements.",
    productLines: ["Control switches", "Panel switches", "Selector switches", "Toggle switches", "Industrial switches"],
    relatedBrands: ["bke", "namolectric-controls", "china-lema", "brisk", "venus-switches", "calonix", "elcon-india"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 2,
  },
  {
    name: "Fuses",
    slug: "fuses",
    imageUrl: ASSETS.productImages.fuses,
    shortDescription: "Fuse and protection product options for B2B buyers.",
    longDescription:
      "Find fuse product lines for panels, maintenance, industrial procurement and replacement requirements.",
    productLines: ["Cartridge fuses", "HRC fuses", "Fuse holders", "Panel fuses", "Protection accessories"],
    relatedBrands: ["bke", "namolectric-controls", "calonix", "brisk"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 3,
  },
  {
    name: "Circuit Breakers",
    slug: "circuit-breakers",
    imageUrl: ASSETS.productImages["circuit-breakers"],
    shortDescription: "Circuit protection product ranges for electrical systems.",
    longDescription:
      "Source circuit breakers and protection products for panels, electrical contractors, dealers and industrial buyers.",
    productLines: ["MCBs", "MCCBs", "RCCBs", "Distribution protection", "Breaker accessories"],
    relatedBrands: ["bke", "brisk", "venus-switches"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 4,
  },
  {
    name: "Connectors",
    slug: "connectors",
    imageUrl: ASSETS.productImages.connectors,
    shortDescription: "Connectors for electrical and electronics applications.",
    longDescription:
      "Browse connector product ranges for electronic components, panels, repairs and industrial electrical supply.",
    productLines: ["Terminal connectors", "Cable connectors", "PCB connectors", "Industrial connectors", "Connector accessories"],
    relatedBrands: ["novoflex", "vky", "elcon-india", "gilard-electronics", "union-connectors", "venus-switches", "calonix", "brisk"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 5,
  },
  {
    name: "Precision Components",
    slug: "precision-components",
    imageUrl: ASSETS.productImages["precision-components"],
    shortDescription: "Precision components and tools for technical buyers.",
    longDescription:
      "Find precision components and associated product lines for OEM, maintenance, workshop and industrial procurement teams.",
    productLines: ["Precision accessories", "Tooling products", "Soldering accessories", "Electrical spares", "Technical components"],
    relatedBrands: ["multitec-tools", "vky", "pankaj-potentiometers", "gilard-electronics", "elcon-india"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 6,
  },
  {
    name: "Industrial Electrical Goods",
    slug: "industrial-electrical-goods",
    imageUrl: ASSETS.productImages["industrial-electrical-goods"],
    shortDescription: "Industrial electrical products for B2B supply.",
    longDescription:
      "Source industrial electrical goods across categories for contractors, dealers, panel builders and maintenance buyers.",
    productLines: ["Panel accessories", "Electrical spares", "Industrial wiring products", "Distribution goods", "Maintenance supplies"],
    relatedBrands: ["sgi-wires", "multitec-tools", "novoflex", "elcon-india", "namolectric-controls", "calonix", "china-lema", "woer", "brisk", "venus-switches", "union-connectors"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 7,
  },
  {
    name: "Electronic Components",
    slug: "electronic-components",
    imageUrl: ASSETS.productImages["electronic-components"],
    shortDescription: "Electronic components and workshop supply products.",
    longDescription:
      "Browse electronic component product ranges for OEMs, repair teams, dealers, procurement teams and industrial buyers.",
    productLines: ["Electronic spares", "Soldering products", "PCB accessories", "Connectors", "Component accessories"],
    relatedBrands: ["vky", "elcon-india", "gilard-electronics", "calonix", "pankaj-potentiometers", "woer", "union-connectors", "china-lema"],
    catalogueUrl: "/placeholder-catalogue.pdf",
    featured: true,
    sortOrder: 8,
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}
