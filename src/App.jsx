    import { useEffect, useState } from "react";

    const LEFT_ITEMS = [
  "IN 1/",
  "TOP SCHNITZEL 1/",
  "TOP S SKINNED 1/",
  "TOP MINCE 1/",
  "TOP M SKINNED 1/",
  "BOTTOMS 1/",
  "LEGS SKINNED 1/",
  "DRUMSTICK",
  "THIGHS",
  "SCHNITZEL",
  "THIN SCHNITZEL",
  "GOULASH",
  "GOUJONS",
  "CAPONS",
  "CAPONS SKINNED",
  "CARCASSES",
  "WINGS",
  "STOMACHS",
  "NECKS",
  "FEET",
  "TURKEY",
  "DRUMSTICK",
  "SCHNITZEL",
  "GOULASH",
  "WINGS",
  "NECKS",
  "BONES",
  "LEG ROLL",
  "TOP ROLL",
  "MIXED ROLL",
  "LIVER",
  "CHICKEN",
  "TURKEY",
  "LAMB",
  "CUTLETS",
  "CHOPS",
  "NECK",
  "RIBLETS",
  "ROSH KEVES",
  "ROLL",
  "GOULASH"
];
    const RIGHT_ITEMS = [
  "KNIDEL SHIN",
  "FRENCH BOLA",
  "SHIN SLICED",
  "SHIN GOULASH",
  "BEEF RIBLETS",
  "BEEF GOULASH",
  "TOP RIB WHOLE",
  "TOP RIB GOULASH",
  "TOP RIB SLICED",
  "GRADE A FLANKEN",
  "FLANK ON bone",
  "FLANK OFF bone",
  "RIB STEAK",
  "PEPPER STEAK",
  "FAIRY STEAK",
  "CHEEK MEAT",
  "PRIME BOLA ROLL",
  "TONGUE",
  "SIDE BOLA",
  "ROUND BOLA",
  "TOP RIB ROLL",
  "POT ROAST",
  "BRISKET ROLL",
  "GALA BONES",
  "MEAT BONES",
  "MARROW BONES",
  "MINCE",
  "CHICKEN",
  "TURKEY",
  "MEAT",
  "STEAK",
  "PICKLED ROLLS",
  "BRISKET",
  "TONGUE",
  "SIDE BOLA",
  "ROUND BOLA",
  "PRIME BOLA",
  "TOP RIB",
  "TURKEY LEG",
  "TURKEY TOP",
  "BEEF ROLL"
];

    function makeRows() {
      const n = Math.max(LEFT_ITEMS.length, RIGHT_ITEMS.length);
      return Array.from({ length: n }, (_, i) => ({
        leftItem: LEFT_ITEMS[i] ?? "",
        rightItem: RIGHT_ITEMS[i] ?? "",
        lQty: "",
        lPacked: "",
        rQty: "",
        rPacked: "",
      }));
    }

    const STORAGE_KEY = "meatville_final_approved_v1";

    export default function App() {
      const [name, setName] = useState("");
      const [telephone, setTelephone] = useState("");
      const [address, setAddress] = useState("");
      const [rows, setRows] = useState(() => makeRows());

      useEffect(() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) return;
          const parsed = JSON.parse(raw);
          setName(parsed.name ?? "");
          setTelephone(parsed.telephone ?? "");
          setAddress(parsed.address ?? "");
          if (Array.isArray(parsed.rows)) setRows(parsed.rows);
        } catch {}
      }, []);

      useEffect(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, telephone, address, rows }));
        } catch {}
      }, [name, telephone, address, rows]);

      const updateRow = (idx, key, val) => {
        setRows((prev) => {
          const next = [...prev];
          next[idx] = { ...next[idx], [key]: val };
          return next;
        });
      };

      const clearAll = () => {
        setName("");
        setTelephone("");
        setAddress("");
        setRows(makeRows());
      };

      return (
        <div className="app">
          <div className="controls no-print">
            <div className="controls-left">
              <strong>Meatville Order Form</strong>
              <span className="hint">Fill in → Print (A4)</span>
            </div>
            <div className="controls-right">
              <button onClick={() => window.print()}>Print</button>
              <button onClick={clearAll} className="secondary">Clear</button>
            </div>
          </div>

          <div className="page-wrap">
            <div className="page">
              <div className="logo-wrap">
                <img className="logo" src="/logo.png" alt="Meatville" />
              </div>

              <div className="info-box">
                <div className="info-row">
                  <label className="info-field">
                    <span className="info-label">Name:</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                  </label>

                  <label className="info-field">
                    <span className="info-label">Telephone:</span>
                    <input value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                  </label>
                </div>

                <label className="info-field address">
                  <span className="info-label">Address:</span>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
              </div>

              <table className="form-table">
                <thead>
                  <tr>
                    <th className="col-item">ITEM</th>
                    <th className="col-qty">QTY</th>
                    <th className="col-packed">PACKED</th>
                    <th className="col-item">ITEM</th>
                    <th className="col-qty">QTY</th>
                    <th className="col-packed">PACKED</th>
                  </tr>
                  <tr>
                    <td className="section">ROASTERS</td>
                    <td></td><td></td>
                    <td className="section">BEEF</td>
                    <td></td><td></td>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                     <td
  className={
    "col-item " +
    (
      r.leftItem === "LIVER" ||
      r.leftItem === "LAMB" ||
      r.leftItem === "MINCE" ||
      r.leftItem === "PICKLED ROLLS" ||
      (r.leftItem === "TURKEY" && LEFT_ITEMS[i - 1] === "FEET")
    ? "section"
    : ""
    )
  }
>
  {r.leftItem}
</td>


                      <td className="col-qty">
                        <input
                          value={r.lQty}
                          onChange={(e) => updateRow(i, "lQty", e.target.value)}
                          inputMode="numeric"
                        />
                      </td>

                      <td className="col-packed">
                        <input
                          value={r.lPacked}
                          onChange={(e) => updateRow(i, "lPacked", e.target.value)}
                        />
                      </td>

                    <td
  className={
    "col-item " +
    (
      r.rightItem === "LIVER" ||
      r.rightItem === "LAMB" ||
      r.rightItem === "MINCE" ||
      r.rightItem === "PICKLED ROLLS"
    ? "section"
    : ""
    )
  }
>
  {r.rightItem}
</td>

                      <td className="col-qty">
                        <input
                          value={r.rQty}
                          onChange={(e) => updateRow(i, "rQty", e.target.value)}
                          inputMode="numeric"
                        />
                      </td>

                      <td className="col-packed">
                        <input
                          value={r.rPacked}
                          onChange={(e) => updateRow(i, "rPacked", e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="footer">
                99 Upper Clapton E5 9BU | Phone: 0208 806 5360 | Email: meatville99@gmail.com
              </div>
            </div>
          </div>
        </div>
      );
    }
