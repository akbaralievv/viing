const HEAD = ["Параметр", "Значение"];

const ROWS: [string, string][] = [
  ["Длина", "100 м"],
  ["Ширина", "30 см"],
  ["Материал", "PE"],
  ["Цвет", "Прозрачный"],
  ["Контакт с пищей", "Да"],
  ["Тип упаковки", "Коробка с ножом"],
];

export function DasturxonSpecs() {
  return (
    <section className="bg-[#F8F6F2]">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-4xl items-stretch gap-8 md:grid-cols-2">
          {/* Specs card */}
          <div className="rounded-2xl border border-[#DCE2EA] bg-white/45 p-6 shadow-[0_8px_30px_rgba(34,59,99,0.05)] md:p-8">
            <h2 className="text-2xl font-medium uppercase tracking-wide text-[#223B63] md:text-[2rem]" style={{ fontFamily: "Georgia, sans-serif" }}>
              Характеристики
            </h2>

            <table className="mt-6 w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#E9EEF4]">
                  <th className="w-2/5 px-4 py-3 text-sm font-semibold text-[#6B7A92]">
                    {HEAD[0]}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-[#6B7A92]">
                    {HEAD[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, value]) => (
                  <tr
                    key={label}
                    className="border-b border-[#E1E5EC] last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-left text-sm font-normal text-[#344B68]"
                    >
                      {label}
                    </th>
                    <td className="px-4 py-3 text-sm font-semibold text-[#223B63]">
                      {value}
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
              alt="DASTURXON PLYÖNKASI"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
