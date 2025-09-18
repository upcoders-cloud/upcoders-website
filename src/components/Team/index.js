// components/Team/index.js
import { pixelPattern } from "@/utils/pixelPattern.jsx";

// mały helper: z ASCII robi obiekt { ascii, coords, rows, cols }
const buildPattern = (ascii) => ({
  ascii,
  coords: pixelPattern(ascii),
  rows: ascii.length,
  cols: ascii[0].length,
});

export const MEMBERS = [
  {
    firstName: "Paweł",
    lastName: "Biniak",
    img: "https://media.istockphoto.com/id/1341347262/pl/zdj%C4%99cie/portret-u%C5%9Bmiechni%C4%99tego-afroameryka%C5%84skiego-biznesmena-w-niebieskim-garniturze-usi%C4%85d%C5%BA-przy.jpg?s=2048x2048&w=is&k=20&c=yhf9bzw0R3ZIyKN4wWkduhc_XbNyExpimp4Td-Y9hL8=",
    linkedin: "#",
    pattern: buildPattern([
      "........",
      "##......",
      "#####...",
      "######..",
      "########",
    ]),
    role: "CEO & Full-Stack Architect",
    about:
      "Łączy wizję biznesową z technicznym know-how. Prowadzi projekty od koncepcji po wdrożenie, dbając o najwyższe standardy jakości.",
    tags: ["Leadership", "React", "Salesforce", "Strategy", "UI/UX"],
  },
  {
    firstName: "Fabian",
    lastName: "Filipiak",
    img: "https://media.istockphoto.com/id/1382284148/pl/zdj%C4%99cie/uj%C4%99cie-m%C5%82odej-bizneswoman-stoj%C4%85cej-ze-skrzy%C5%BCowanymi-r%C4%99kami-w-pracy.jpg?s=2048x2048&w=is&k=20&c=Nq0KJu9Oq3Y71MPrhjPt4OVC30pSKYK9Kdgfu5CHx_4=",
    linkedin: "#",
    pattern: buildPattern([
      "........",
      "#####...",
      "######..",
      "#######.",
    ]),
    role: "Frontend Developer",
    about:
      "Specjalizuje się w tworzeniu lekkich i szybkich interfejsów. W Upcoders odpowiada za spójność wizualną oraz dostępność produktów.",
    tags: ["React", "Tailwind", "Accessibility", "Animations"],
  },
  {
    firstName: "Michał",
    lastName: "Patz",
    img: "https://media.istockphoto.com/id/1144287292/pl/zdj%C4%99cie/headshot-portret-szcz%C4%99%C5%9Bliwy-mieszany-wy%C5%9Bcig-afryka%C5%84ski-dziewczyna-w-okularach.jpg?s=2048x2048&w=is&k=20&c=qjiobs3Pi619yreqLO80eCKjGWtU3o2Q9F898D_0mYo=",
    linkedin: "#",
    pattern: buildPattern([
      ".#.....",
      "##.....",
      "#####...",
      "######..",
      "########",
    ]),
    role: "Backend & Integrations Engineer",
    about:
      "Buduje skalowalne API i integruje systemy zewnętrzne. Lubi, gdy kod jest czytelny, a procesy automatyczne.",
    tags: ["Node.js", "Apex", "API Design", "CI/CD"],
  },
  {
    firstName: "Wojciech",
    lastName: "Witczak",
    img: "https://media.istockphoto.com/id/1309489745/pl/zdj%C4%99cie/portret-m%C5%82odego-szcz%C4%99%C5%9Bliwego-indyjskiego-biznesmena-kt%C3%B3ry-patrzy-na-kamer%C4%99-wschodni-m%C4%99ski.jpg?s=2048x2048&w=is&k=20&c=bgAQNzgMfLWFqCCIjic5vk6ba2QdLj9ZxX5_gcM0JV0=",
    linkedin: "#",
    pattern: buildPattern([
      "........",
      "##......",
      "#####...",
      "######..",
      "########",
    ]),
    role: "UI/UX Designer",
    about:
      "Łączy estetykę z funkcjonalnością. Tworzy intuicyjne interfejsy, które prowadzą użytkownika przez produkt bez wysiłku.",
    tags: ["Figma", "Design Systems", "Prototyping", "Branding"],
  },
];
