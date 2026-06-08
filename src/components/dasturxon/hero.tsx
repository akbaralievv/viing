export function DasturxonHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#F8F6F2]">
      {/* Ornament — left edge, behind content */}
      <img
        src="/dasturxon/pattern.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-16 z-0 select-none md:top-[72px]"
        style={{ width: "clamp(180px, 24vw, 340px)", opacity: 0.45 }}
      />

      {/* Vegetables — bottom-left, behind content */}
      <img
        src="/dasturxon/vegetables.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 select-none"
        style={{ width: "clamp(320px, 55vw, 580px)" }}
      />

      {/* Content + product */}
      <div className="relative z-10 container mx-auto grid min-h-[100svh] grid-cols-1 content-center items-center gap-8 px-4 pb-16 pt-32 text-center min-[900px]:grid-cols-2 min-[900px]:gap-6 min-[900px]:pb-20 min-[900px]:pt-28 min-[900px]:text-left">
        {/* Text */}
        <div className="relative mx-auto max-w-xl min-[900px]:mx-0">
          {/* light scrim so the text stays readable over the vegetables behind it */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6"
            style={{
              background:
                "rgba(248,246,242,0.9)",
              filter: "blur(26px)",
            }}
          />
          <div className="relative">
            <h1 className="font-cormorant text-[clamp(3.2rem,8vw,82px)] font-bold leading-[0.92] tracking-[-0.02em] text-[#223B63]">
              DASTURXON
            </h1>
            <p className="font-cormorant text-[clamp(2.5rem,4vw,50px)] font-medium leading-[0.92] tracking-[-0.02em] text-[#223B63]">PLYÖNKASI</p>
            <p className="mx-auto mt-5 max-w-sm text-lg leading-[1.7] text-[#344B68] min-[900px]:mx-0">
              Пищевая плёнка для хранения продуктов и сохранения свежести
            </p>
            <span className="mt-7 inline-flex leading-none border-2 border-white items-center rounded-full bg-[#1F426E] px-2.5 py-1 text-lg font-semibold tracking-wide text-white">
              100 МЕТРОВ
            </span>
          </div>
        </div>

        {/* Product */}
        <div className="min-[900px]:translate-y-10">
          <img
            src="/dasturxon/stretch.png"
            alt="DASTURXON PLYÖNKASI"
            className="mx-auto w-full max-w-[600px]"
          />
        </div>
      </div>
    </section>
  );
}
