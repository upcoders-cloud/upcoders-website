import { FaLinkedinIn } from "react-icons/fa";

export default function Team() {
  const members = [
    { name: "Jan Kowalski", img: "https://s.wsj.net/public/resources/images/BN-FE385_airbnb_P_20141023171857.jpg", linkedin: "#" },
    { name: "Anna Nowak", img: "https://s.wsj.net/public/resources/images/BN-FE385_airbnb_P_20141023171857.jpg", linkedin: "#" },
    { name: "Piotr Wiśniewski", img: "https://s.wsj.net/public/resources/images/BN-FE385_airbnb_P_20141023171857.jpg", linkedin: "#" },
    { name: "Ewa Zielińska", img: "https://s.wsj.net/public/resources/images/BN-FE385_airbnb_P_20141023171857.jpg", linkedin: "#" },
  ];

  // Warianty clip-path dla każdego członka
  const shapes = [
    "polygon(4% 65%, 20% 65%, 20% 80%, 45% 80%, 45% 100%, 100% 100%, 100% 0, 0 0)",
    "polygon(4% 75%, 25% 75%, 25% 90%, 50% 90%, 50% 100%, 100% 100%, 100% 0, 0 0)",
    "polygon(4% 60%, 15% 60%, 15% 85%, 40% 85%, 40% 100%, 100% 100%, 100% 0, 0 0)",
    "polygon(4% 70%, 30% 70%, 30% 85%, 55% 85%, 55% 100%, 100% 100%, 100% 0, 0 0)",
  ];

  return (
    <section id="about" className="bg-bg-2 text-white py-16 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-sm text-gray-400 mb-2">ABOUT US</h3>
        <p className="max-w-3xl mx-auto text-gray-300 mb-12">
          Działamy zwinnie, mówimy ludzkim językiem i wierzymy, że partnerska współpraca przynosi najlepsze efekty.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <div key={i} className="relative bg-[#1C1C1C] overflow-hidden group">

              {/* LinkedIn icon */}
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-white hover:bg-primary transition z-10"
              >
                <FaLinkedinIn size={16} />
              </a>

              {/* Image */}
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-64 object-cover grayscale"
              />

              {/* Blue shape overlay */}
              <div
                className="absolute bottom-0 left-0 w-full bg-primary text-white p-4"
                style={{ clipPath: shapes[i % shapes.length] }}
              >
                <p className="font-medium">{m.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
