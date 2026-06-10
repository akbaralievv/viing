import { useTranslations } from "next-intl";

export function DasturxonSpecs() {
  const t = useTranslations("dasturxon");
  const head = t.raw("specs.head") as string[];
  const rows = t.raw("specs.rows") as { label: string; value: string }[];

  return (
    <section className="bg-dast-cream">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-4xl items-stretch gap-8 md:grid-cols-2">
          {/* Specs card */}
          <div className="rounded-2xl border border-dast-line bg-white/45 p-6 shadow-[0_8px_30px_rgba(34,59,99,0.05)] md:p-8">
            <h2
              className="text-2xl font-medium uppercase tracking-wide text-dast-ink md:text-[2rem]"
              style={{ fontFamily: "Georgia, sans-serif" }}
            >
              {t("specs.heading")}
            </h2>

            <table className="mt-6 w-full border-collapse text-left">
              <thead>
                <tr className="bg-dast-head-bg">
                  <th className="w-2/5 px-4 py-3 text-sm font-semibold text-dast-muted">
                    {head[0]}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-dast-muted">
                    {head[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-dast-row-line last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-left text-sm font-normal text-dast-body"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-sm font-semibold text-dast-ink">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Brand label design */}
          <div className="hidden md:block">
            <img
              src="/dasturxon/design.png"
            loading="lazy"
            decoding="async"
              alt="DASTURXON PLYÖNKASI"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
