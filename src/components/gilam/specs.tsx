import { useTranslations } from "next-intl";

export function GilamSpecs() {
  const t = useTranslations("stretchFilm");
  const rows = t.raw("specs.rows") as { label: string; value: string }[];

  return (
    <section id="specs" className="bg-[#f4f0ee] pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Product roll — horizontal in 1 column (below lg), vertical in 2 columns */}
          <div>
            <img
              src="/gilam/roll.png"
              alt="GILAM PALLET QADOQLASH PLYONKASI"
              loading="lazy"
              decoding="async"
              className="mx-auto w-full max-w-[480px] select-none object-contain lg:hidden"
            />
            <img
              src="/gilam/roll2.png"
              alt="GILAM PALLET QADOQLASH PLYONKASI"
              loading="lazy"
              decoding="async"
              className="mx-auto hidden max-h-[480px] w-auto select-none object-contain lg:block"
            />
          </div>

          {/* Specifications */}
          <div>
            <h2 className="font-cormorant text-2xl font-bold uppercase tracking-tight text-gilam-ink md:text-[2rem]">
              {t("specs.heading")}
            </h2>

            <table className="mt-6 w-full text-left text-sm md:text-base">
              <tbody className="divide-y divide-gilam-line">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="w-2/5 py-3.5 pr-4 font-normal text-gilam-muted"
                    >
                      {row.label}
                    </th>
                    <td className="py-3.5 font-medium text-gilam-ink">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
