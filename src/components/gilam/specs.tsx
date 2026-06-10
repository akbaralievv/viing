import { Droplet, Eye, RotateCw, ShieldCheck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const FEATURE_ICONS: LucideIcon[] = [Eye, ShieldCheck, RotateCw, Droplet];

export function GilamSpecs() {
  const t = useTranslations("stretchFilm");
  const dims = t.raw("specs.dims") as { value: string; label: string }[];
  const features = t.raw("specs.features") as { title: string; desc: string }[];

  return (
    <section id="specs" className="bg-gilam-cream pt-14 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Dimensions card */}
          <div className="rounded-[20px] border border-gilam-line bg-gilam-card p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:p-8">
            <div className="flex items-center gap-6 md:gap-8">
              {/* vertical roll (size bracket on desktop) */}
              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden h-[380px] items-center gap-2 sm:flex">
                  <span className="-rotate-90 text-[11px] tracking-wide text-gilam-muted">
                    {dims[0]?.value}
                  </span>
                  <span className="h-full w-px bg-gilam-line" />
                </div>
                <img
                  src="/gilam/stretch-vertical.png"
                  alt="GILAM PLYÖNKASI"
                  loading="lazy"
                  decoding="async"
                  className="h-[320px] w-auto object-contain sm:h-[380px]"
                />
              </div>

              {/* dimensions */}
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gilam-brown">
                  {t("specs.sizeTitle")}
                </p>
                <div className="mt-5 divide-y divide-gilam-line">
                  {dims.map((s) => (
                    <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                      <div className="text-3xl min-[360px]:text-4xl font-semibold leading-none text-gilam-brown md:text-5xl">
                        {s.value}
                      </div>
                      <div className="mt-1.5 text-sm text-gilam-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-4">
            {features.map(({ title, desc }, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-[20px] border border-gilam-line bg-gilam-card p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gilam-icon-bg text-gilam-brown">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-gilam-ink">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gilam-muted">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
