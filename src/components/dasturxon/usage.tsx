export function DasturxonUsage() {
  return (
    <section className="bg-[#F8F6F2] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid overflow-hidden rounded-2xl border border-[#DCE2EA] md:grid-cols-2">
          {/* Usage photo */}
          <img
            src="/dasturxon/use.png"
            alt="DASTURXON PLYÖNKASI — использование плёнки"
            className="h-60 w-full object-cover sm:h-80"
          />

          {/* Text panel */}
          <div className="flex flex-col justify-center px-6 py-12 md:px-8 md:py-14">
            <h2
              className="text-2xl font-medium uppercase tracking-wide text-[#223B63] lg:text-[2rem]"
              style={{ fontFamily: "Georgia, sans-serif" }}
            >
              Использование
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-[1.7] text-[#344B68]">
              Идеально подходит для овощей, фруктов, мяса, выпечки и готовых блюд
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
