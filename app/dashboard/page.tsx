import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Flame, Sun, Snowflake, ArrowRight, ExternalLink } from "lucide-react";

export default async function Dashboard() {
  const supabase = await createClient();

  // Fetch stats
  const { data: leadsData, error: statsError } = await supabase.from("leads").select("status");
  
  if (statsError) {
    console.error("Supabase Stats Error:", statsError);
  }

  const stats = { HOT: 0, WARM: 0, COLD: 0, TOTAL: 0 };
  leadsData?.forEach((d: any) => {
    const status = (d.status || 'COLD') as keyof typeof stats;
    stats[status] = (stats[status] || 0) + 1;
    stats.TOTAL++;
  });

  // Fetch recent leads
  const { data: recentLeads, error: leadsError } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (leadsError) {
    console.error("Supabase Leads Error:", leadsError);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      {/* Error Notifications */}
      {(statsError || leadsError) && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <span>⚠️</span> Connection Issue
            </CardTitle>
            <p className="text-sm text-destructive/80 mt-1">
              {statsError?.message || leadsError?.message || "Failed to fetch data from Supabase."}
            </p>
          </CardHeader>
        </Card>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">LeadPulse Analytics</h1>
          <p className="text-muted-foreground text-lg">Real-time overview of your sales pipeline.</p>
        </div>
        <Button asChild variant="default" size="lg">
          <Link href="/leads" className="flex items-center gap-2">
            View All Leads <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Volume", value: stats.TOTAL, icon: <Users className="w-5 h-5" />, color: "text-blue-500" },
          { label: "Hot Pipeline", value: stats.HOT, icon: <Flame className="w-5 h-5" />, color: "text-orange-500" },
          { label: "Warm Interest", value: stats.WARM, icon: <Sun className="w-5 h-5" />, color: "text-yellow-500" },
          { label: "Cold Outreach", value: stats.COLD, icon: <Snowflake className="w-5 h-5" />, color: "text-sky-500" },
        ].map((stat, i) => (
          <Card key={i} className="hover:border-primary/50 transition-all cursor-default">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/leads">View full list</Link>
          </Button>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-muted/30 text-muted-foreground text-xs font-semibold uppercase">
                  <th className="px-6 py-4">Lead Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {!recentLeads || recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                      No recent leads found.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{lead.name || "Unknown"}</td>
                      <td className="px-6 py-4 text-muted-foreground">{lead.email || "N/A"}</td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          lead.status === 'HOT' ? 'destructive' :
                          lead.status === 'WARM' ? 'secondary' :
                          'outline'
                        }>
                          {lead.status || 'COLD'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm" className="gap-1">
                          Details <ExternalLink className="w-3 h-3" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}