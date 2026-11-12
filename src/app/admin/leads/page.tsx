"use client";

import { useState, type FormEvent } from "react";
import { Download, LoaderCircle, Lock } from "lucide-react";
import type { Lead } from "@/lib/leads";

/**
 * Private enquiries viewer (file storage). Not linked anywhere, excluded from
 * search engines, and the data is only returned with the ADMIN_TOKEN.
 */
export default function LeadsAdminPage() {
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Could not load enquiries");
      setLeads(json.leads);
    } catch (err) {
      setError((err as Error).message);
      setLeads(null);
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    if (!leads) return;
    const cols = ["createdAt", "fullName", "countryCode", "phone", "email", "travelDate", "adults", "children", "destination", "packageCategory", "hotelPreference", "packageName", "message", "source", "pageUrl"] as const;
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...leads.map((l) => cols.map((c) => esc(l[c])).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `enquiries-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="min-h-[100svh] bg-ivory pb-20 pt-12">
      <div className="fixed inset-x-0 top-0 -z-0 h-[88px] bg-navy-deep" aria-hidden="true" />
      <div className="h-[88px]" aria-hidden="true" />
      <div className="container-luxe">
        <h1 className="display-md text-navy">Enquiries</h1>
        {!leads && (
          <form onSubmit={load} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="token">
              Admin token
            </label>
            <input id="token" type="password" className="field" placeholder="Admin token" value={token} onChange={(e) => setToken(e.target.value)} />
            <button className="btn btn-navy" disabled={loading || !token}>
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />} View
            </button>
          </form>
        )}
        {error && <p className="mt-4 text-coral-deep">{error}</p>}
        {leads && (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="text-muted">{leads.length} enquiries (newest first)</p>
              <button onClick={() => load()} className="btn btn-ghost-dark !min-h-0 !py-2">
                Refresh
              </button>
              <button onClick={exportCsv} className="btn btn-navy !min-h-0 !py-2">
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>
            <div className="mt-6 overflow-x-auto bg-white shadow-sm">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-navy text-white">
                  <tr>
                    {["Received", "Name", "WhatsApp", "Travel date", "Guests", "Destination", "Style / Hotel / Package", "Message"].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-b border-sand align-top">
                      <td className="whitespace-nowrap px-4 py-3 text-muted">{new Date(l.createdAt).toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 font-semibold text-navy">
                        {l.fullName}
                        {l.email && <span className="block font-normal text-muted">{l.email}</span>}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <a className="text-navy underline" href={`https://wa.me/${l.countryCode || "91"}${l.phone}`} target="_blank" rel="noopener noreferrer">
                          +{l.countryCode || "91"} {l.phone}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{l.travelDate}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {l.adults ?? l.travellers} adults{l.children ? `, ${l.children} children` : ""}
                      </td>
                      <td className="px-4 py-3">{l.destination}</td>
                      <td className="px-4 py-3">
                        {l.packageCategory ?? l.packageType}
                        {l.hotelPreference && <span className="block text-muted">{l.hotelPreference}</span>}
                        {l.packageName && <span className="block text-muted">{l.packageName}</span>}
                      </td>
                      <td className="max-w-xs px-4 py-3 text-muted">{l.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
