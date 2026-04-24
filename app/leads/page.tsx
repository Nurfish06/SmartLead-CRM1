"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Edit2, Trash2, UserPlus, Filter } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Supabase Fetch Error:", error);
      }
      
      setLeads(data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredLeads = leads.filter(lead => 
    (lead.name?.toLowerCase().includes(search.toLowerCase())) ||
    (lead.email?.toLowerCase().includes(search.toLowerCase())) ||
    (lead.status?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2 text-muted-foreground">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">People Directory</h1>
          <p className="text-muted-foreground">Manage your customer relationships and lead status.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Search & Actions Area */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Leads Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground text-xs font-semibold uppercase">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Added On</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Fetching directory data...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground italic">
                    {search ? `No results found for "${search}"` : "Your directory is empty."}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{lead.name || "Unknown"}</td>
                    <td className="px-6 py-4 text-muted-foreground">{lead.email || "—"}</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        lead.status === 'HOT' ? 'destructive' :
                        lead.status === 'WARM' ? 'secondary' :
                        'outline'
                      }>
                        {lead.status || 'COLD'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString(undefined, { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
