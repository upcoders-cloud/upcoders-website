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
    id: "pawel",
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
    roleKey: "team.members.pawel.role",
    aboutKey: "team.members.pawel.about",
  },
  {
    id: "fabian",
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
    roleKey: "team.members.fabian.role",
    aboutKey: "team.members.fabian.about",
  },
  {
    id: "michal",
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
    roleKey: "team.members.michal.role",
    aboutKey: "team.members.michal.about",
  },
  {
    id: "wojciech",
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
    roleKey: "team.members.wojciech.role",
    aboutKey: "team.members.wojciech.about",
  },
];
