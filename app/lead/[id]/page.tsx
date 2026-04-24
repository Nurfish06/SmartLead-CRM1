"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  async function fetchLeads() {
    let query = supabase.from("leads").select("*");

    if (filter !== "ALL") {
      query = query.eq("status", filter);
    }

    const { data } = await query.order("created_at", { ascending: false });
    setLeads(data || []);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">CRM Leads</h1>

      {/* FILTERS */}
      <div className="flex gap-2 my-4">
        {["ALL", "HOT", "WARM", "COLD"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 border rounded"
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead: any) => (
            <tr key={lead.id} className="border-t">
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>
                <span
                  className={
                    lead.status === "HOT"
                      ? "text-red-500"
                      : lead.status === "WARM"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }
                >
                  {lead.status}
                </span>
              </td>
              <td>{lead.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}