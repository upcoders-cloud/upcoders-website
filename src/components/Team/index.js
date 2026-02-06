// components/Team/index.js
import { pixelPattern } from "@/utils/pixelPattern.jsx";
import pawelImg from "assets/teamPhoto/pawelImg.JPEG";
import fabianImg from "assets/teamPhoto/fabianImg.JPEG";
import wojciechImg from "assets/teamPhoto/wojciechImg.JPEG";
import michalImg from "assets/teamPhoto/michalImg.JPEG";

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
    img: pawelImg,
    linkedin: "https://www.linkedin.com/in/pawel-biniak/",
    pattern: buildPattern([
      "........",
      "##......",
      "#####...",
      "######..",
      "########",
    ]),
    role: "Co-Founder",
    about:
      "Turning vision into scalable solutions."
  },
  {
    firstName: "Fabian",
    lastName: "Filipiak",
    img: fabianImg,
    linkedin: "https://www.linkedin.com/in/fabian-filipiak-6036b1258/",
    pattern: buildPattern([
      "........",
      "#####...",
      "######..",
      "#######.",
    ]),
    role: "Co-Founder & Project Manager",
    about:
      "Clear goals, seamless delivery."
  },
  {
    firstName: "Michał",
    lastName: "Patz",
    img: michalImg,
    linkedin: "https://www.linkedin.com/in/michalpatz/",
    pattern: buildPattern([
      ".#.....",
      "##.....",
      "#####...",
      "######..",
      "#######.",
    ]),
    role: "Co-Founder & Integration Architect",
    about:
      "Clean code, strong foundations."
  },
  {
    firstName: "Wojciech",
    lastName: "Witczak",
    img: wojciechImg,
    linkedin: "https://www.linkedin.com/in/wojciech-witczak-416829197/",
    pattern: buildPattern([
      "........",
      "##......",
      "######..",
      "######.",
      "########",
    ]),
    role: "Co-Founder & Full-Stack Architect",
    about:
      "Bridging frontend and backend with clarity."
  },
];
