import { SITE } from "./site";

const suffix = `| ${SITE.businessName}`;

export const SEO = {
  home: {
    title: `Electronic Components Dealer in Delhi ${suffix}`,
    description:
      "Tantia Electronics Co. is a 55+ year B2B electrical goods supplier in Delhi for wires, switches, fuses, circuit breakers and electronic components.",
  },
  brands: {
    title: `Trusted Electrical Brands ${suffix}`,
    description:
      "Browse Indian electrical and electronic component brands distributed by Tantia Electronics Co. in Delhi and across India.",
  },
  products: {
    title: `Electrical Goods Supplier in Delhi ${suffix}`,
    description:
      "Browse wires, switches, fuses, circuit breakers, connectors, precision components and industrial electrical goods.",
  },
  about: {
    title: `About Tantia Electronics Co. ${suffix}`,
    description:
      "Learn about Tantia Electronics Co., a 55+ year electronic components supplier in Chandni Chowk and Bhagirath Place, Delhi.",
  },
  contact: {
    title: `Contact Tantia Electronics Co. ${suffix}`,
    description:
      "Send B2B enquiries for electronic components, electrical goods, catalogues and quotations in Delhi and across India.",
  },
  notFound: {
    title: `Page Not Found ${suffix}`,
    description: "The requested page could not be found.",
  },
};
