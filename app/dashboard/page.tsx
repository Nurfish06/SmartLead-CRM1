"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({
    HOT: 0,
    WARM: 0,
    COLD: 0,
    TOTAL: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      // Fetch stats
      const { data: leadsData } = await supabase.from("leads").select("status");
      
      const counts = { HOT: 0, WARM: 0, COLD: 0, TOTAL: 0 };
      leadsData?.forEach((d: any) => {
        counts[d.status] = (counts[d.status] || 0) + 1;
        counts.TOTAL++;
      });
      setStats(counts);

      // Fetch recent leads
      const { data: recent } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      setRecentLeads(recent || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold gradient-text">CRM Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your leads.</p>
        </div>
        <Link 
          href="/leads" 
          className="px-6 py-2 bg-accent-primary hover:bg-accent-secondary transition-colors rounded-full font-medium"
        >
          View All Leads
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {[
          { label: "Total Leads", value: stats.TOTAL, color: "var(--accent-tertiary)", icon: "👥" },
          { label: "Hot Leads", value: stats.HOT, color: "#f87171", icon: "🔥" },
          { label: "Warm Leads", value: stats.WARM, color: "#fbbf24", icon: "🟡" },
          { label: "Cold Leads", value: stats.COLD, color: "#94a3b8", icon: "❄️" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="glass-panel overflow-hidden animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Leads</h2>
          <span className="text-sm text-gray-400">Showing last 5</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Loading leads...</td>
                </tr>
              ) : recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No leads found yet.</td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium">{lead.name || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{lead.email || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lead.status === 'HOT' ? 'bg-red-500/20 text-red-400' :
                        lead.status === 'WARM' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-accent-tertiary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}