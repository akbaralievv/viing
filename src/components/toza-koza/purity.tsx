import Image from "next/image";

type Feature = { icon: string; title: string; desc: string };

const LEFT: Feature[] = [
  {
    icon: "full-water.svg",
    title: "99% воды",
    desc: "Мягкая формула на основе очищенной воды",
  },
  {
    icon: "no_alcohol.svg",
    title: "Без спирта",
    desc: "Не содержит спирта, безопасна для чувствительной кожи",
  },
  {
    icon: "textile.svg",
    title: "Мягкие",
    desc: "Нежные и приятные на ощупь, подходят для всей семьи",
  },
];

const RIGHT: Feature[] = [
  {
    icon: "washable.svg",
    title: "Смываемые",
    desc: "Можно смывать в унитаз, растворяется в воде",
  },
  {
    icon: "no-pvc.svg",
    title: "Без ПВХ",
    desc: "Не содержат ПВХ, безопасны для вас и окружающей среды",
  },
  {
    icon: "halal-certified_ellipse.svg",
    title: "Halal Certified",
    desc: "Сертифицировано по стандартам Halal",
  },
];

function FeatureItem({ icon, title, desc }: Feature) {
  return (
    <li className="flex items-start gap-3.5">
      <img
        src={`/tozaKoza/icons/${icon}`}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0 lg:h-14 lg:w-14"
      />
      <div className="max-w-[220px]">
        <h3 className="font-cormorant text-xl font-bold leading-tight text-[#052439] lg:text-2xl">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#4D5563]">{desc}</p>
      </div>
    </li>
  );
}

/** Custom decorative orbit (dotted ellipse + accent dots) around the jug. Desktop only. */
function OrbitDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 460 480"
      fill="none"
      className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[480px] w-[460px] -translate-x-1/2 -translate-y-1/2 lg:block"
    >
      <ellipse
        cx="230"
        cy="240"
        rx="200"
        ry="228"
        stroke="#B89A56"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="1.5 8"
      />
      <circle cx="30" cy="240" r="4" fill="#B89A56" />
      <circle cx="430" cy="240" r="4" fill="#B89A56" />
    </svg>
  );
}

export function TozaKozaPurity() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F1]">
      <Image
        src="/tozaKoza/section2-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* light wash so the stacked text stays readable over the scene on mobile */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#FAF7F1]/45 min-[600px]:bg-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-14 md:py-20">
        {/* Heading */}
        <h2 className="flex items-center justify-center gap-3 text-center font-cormorant text-2xl md:gap-4 md:text-[2.5rem] font-bold uppercase tracking-wide text-[#052439]">
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
          <span>
            Чистота, которую вы <br className="lg:hidden" />чувствуете
          </span>
          <span aria-hidden="true" className="text-lg text-[#B89A56] md:text-2xl">
            ✦
          </span>
        </h2>

        {/* Divider — two dots on a line */}
        <div
          aria-hidden="true"
          className="mt-4 flex items-center justify-center gap-2.5 md:mt-5"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89A56]/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#B89A56]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#B89A56]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89A56]/60" />
        </div>

        {/* Features: one column on mobile, two columns flanking the jug on desktop */}
        <div className="relative mx-auto mt-10 max-w-5xl md:mt-14">
          <OrbitDecoration />
          <div className="relative flex flex-col gap-8 min-[600px]:flex-row min-[600px]:justify-between min-[600px]:gap-0">
            <ul className="flex flex-col gap-8 min-[600px]:min-h-[440px] min-[600px]:max-w-[42%] min-[600px]:justify-between lg:min-h-[480px] lg:max-w-[280px]">
              {LEFT.map((f) => (
                <FeatureItem key={f.title} {...f} />
              ))}
            </ul>
            <ul className="flex flex-col gap-8 min-[600px]:min-h-[440px] min-[600px]:max-w-[42%] min-[600px]:justify-between lg:min-h-[480px] lg:max-w-[280px]">
              {RIGHT.map((f) => (
                <FeatureItem key={f.title} {...f} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
