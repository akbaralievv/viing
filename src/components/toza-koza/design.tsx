type DesignCard = { image: string; title: string; desc: string };

const CARDS: DesignCard[] = [
  {
    image: "/tozaKoza/design.png",
    title: "Разработка дизайна",
    desc: "Уникальный дизайн, вдохновлённый чистотой и природой.",
  },
  {
    image: "/tozaKoza/print.jpg",
    title: "Печать высокого качества",
    desc: "Современные технологии печати обеспечивают яркие цвета и чёткость деталей.",
  },
  {
    image: "/tozaKoza/valve.jpg",
    title: "Премиальные материалы",
    desc: "Прочная упаковка с клапаном сохраняет влагу и свежесть надолго.",
  },
  {
    image: "/tozaKoza/box.jpg",
    title: "Транспортная упаковка",
    desc: "Надёжные коробки для безопасной доставки в любую точку мира.",
  },
];

export function TozaKozaDesign() {
  return (
    <section className="bg-[#FDFBF7] py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-[#052439]">
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
          Дизайн и упаковка
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {CARDS.map((c) => (
            <article key={c.title}>
              <div className="overflow-hidden rounded-2xl border border-[#E6D9C2]/70 bg-gradient-to-br from-[#FFFDF9] to-[#F2EBDD] shadow-[0_10px_30px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.02)]">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#052439]">
                {c.title}
              </h3>
              <p className="mt-2 font-cormorant text-lg italic font-medium leading-snug text-[#4D5563]">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
