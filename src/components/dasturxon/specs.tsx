import { Box, ShieldCheck, Truck, CircleCheck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const PACKAGING_ICONS: LucideIcon[] = [Box, ShieldCheck, Truck, CircleCheck];

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="text-center">
      <h2
        className="text-2xl font-medium uppercase tracking-wide text-dast-ink md:text-[2rem]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {children}
      </h2>
    </div>
  );
}

export function DasturxonSpecs() {
  const t = useTranslations("dasturxon");
  const items = t.raw("specs.packaging.items") as { title: string; desc?: string }[];
  const rows = t.raw("specs.tech.rows") as { label: string; value: string }[];

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto grid gap-14 px-4 lg:grid-cols-12 lg:gap-12">
        {/* Packaging & delivery */}
        <div className="lg:col-span-7">
          <SectionTitle>{t("specs.packaging.heading")}</SectionTitle>

          <div className="mt-8 grid items-center gap-8 sm:grid-cols-2 sm:gap-6">
            <img
              src="/dasturxon/box.png"
              alt="DASTURXON PLYÖNKASI"
              loading="lazy"
              decoding="async"
              className="mx-auto w-full max-w-[380px] select-none object-contain"
            />

            <ul className="flex flex-col gap-6">
              {items.map(({ title, desc }, i) => {
                const Icon = PACKAGING_ICONS[i];
                return (
                  <li key={title} className="flex items-start gap-3.5">
                    <Icon
                      className="mt-0.5 h-6 w-6 shrink-0 text-dast-navy"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-dast-ink">
                        {title}
                      </h3>
                      {desc && (
                        <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-dast-muted">
                          {desc}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Technical specifications */}
        <div className="lg:col-span-5">
          <SectionTitle>{t("specs.tech.heading")}</SectionTitle>

          <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-xl border border-dast-line">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-dast-row-line">
                {rows.map((row) => (
                  <tr key={row.label} className="even:bg-dast-sky/50">
                    <th
                      scope="row"
                      className="w-2/5 px-5 py-3.5 font-normal text-dast-body"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 py-3.5 font-semibold text-dast-ink">
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
