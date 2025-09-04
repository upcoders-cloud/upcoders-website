import { FaLinkedinIn } from "react-icons/fa";
import { DrawCircleText } from 'components/ui/DrawCircleText/DrawCircleText.jsx'
import TeamPixelOverlay from 'components/Team/TeamPixelOverlay/TeamPixelOverlay.jsx'
import { TEAM_PATTERNS } from 'components/Team/index.js'

export default function Team() {
  const members = [
    { firstName: "Jan", lastName: "Kowalski", img: "https://media.istockphoto.com/id/1341347262/pl/zdj%C4%99cie/portret-u%C5%9Bmiechni%C4%99tego-afroameryka%C5%84skiego-biznesmena-w-niebieskim-garniturze-usi%C4%85d%C5%BA-przy.jpg?s=2048x2048&w=is&k=20&c=yhf9bzw0R3ZIyKN4wWkduhc_XbNyExpimp4Td-Y9hL8=", linkedin: "#" },
    { firstName: "Anna", lastName: "Nowak", img: "https://media.istockphoto.com/id/1382284148/pl/zdj%C4%99cie/uj%C4%99cie-m%C5%82odej-bizneswoman-stoj%C4%85cej-ze-skrzy%C5%BCowanymi-r%C4%99kami-w-pracy.jpg?s=2048x2048&w=is&k=20&c=Nq0KJu9Oq3Y71MPrhjPt4OVC30pSKYK9Kdgfu5CHx_4=", linkedin: "#" },
    { firstName: "Piotr", lastName: "Wiśniewski", img: "https://media.istockphoto.com/id/1144287292/pl/zdj%C4%99cie/headshot-portret-szcz%C4%99%C5%9Bliwy-mieszany-wy%C5%9Bcig-afryka%C5%84ski-dziewczyna-w-okularach.jpg?s=2048x2048&w=is&k=20&c=qjiobs3Pi619yreqLO80eCKjGWtU3o2Q9F898D_0mYo=", linkedin: "#" },
    { firstName: "Ewa", lastName: "Zielińska", img: "https://media.istockphoto.com/id/1309489745/pl/zdj%C4%99cie/portret-m%C5%82odego-szcz%C4%99%C5%9Bliwego-indyjskiego-biznesmena-kt%C3%B3ry-patrzy-na-kamer%C4%99-wschodni-m%C4%99ski.jpg?s=2048x2048&w=is&k=20&c=bgAQNzgMfLWFqCCIjic5vk6ba2QdLj9ZxX5_gcM0JV0=", linkedin: "#" },
  ];

  return (
    <section id="about" className="bg-bg-2 text-white section-wrapper">
      <div className="text-center section-inner">
        <h3 className="text-xl text-gray-400 mb-2">
          <DrawCircleText text={"MEET OUR TEAM"}/>
        </h3>
        <p className="max-w-3xl mx-auto text-gray-300 mb-12">
          Działamy zwinnie, mówimy ludzkim językiem i wierzymy, że partnerska współpraca przynosi najlepsze efekty.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((m, i) => {
            const pat = TEAM_PATTERNS[i % TEAM_PATTERNS.length];
            return (
              <div key={`${m.firstName}-${m.lastName}-${i}`}
                   className="relative bg-[#1C1C1C] overflow-hidden group">

                {/* LinkedIn icon */}
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-2 rounded-full text-white hover:bg-primary transition z-10"
                >
                  <FaLinkedinIn size={16} />
                </a>

                {/* Image */}
                <img src={m.img} alt={`${m.firstName} ${m.lastName}`} className="w-full h-64 object-cover grayscale" />

                <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
                  <TeamPixelOverlay
                    coords={pat.coords}
                    rows={pat.rows}
                    cols={pat.cols}
                    cell="clamp(20px, 4vw, 36px)"  // rozmiar kafla (dostosuj wg upodobań)
                    gap={0}
                    color="#5271FF"
                  />
                </div>

                {/* Blue shape overlay */}
                <div className="absolute bottom-4 left-0 right-0 z-10">
                  <p className="px-4 text-white text-left leading-[0.9] text-2xl sm:text-3xl md:text-4xl">
                    {m.firstName}<br/>{m.lastName}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
