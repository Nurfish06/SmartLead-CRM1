import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 max-w-4xl mx-auto space-y-12">
      <div className="animate-fade-in space-y-4">
        <div className="text-accent font-bold uppercase tracking-[0.2em] text-xs">Automation Suite</div>
        <h1 className="text-7xl font-bold tracking-tight">LeadPulse AI</h1>
        <p className="text-xl text-muted leading-relaxed max-w-xl mx-auto">
          A minimalist interface for managing your automated lead pipeline. 
          Built with precision, powered by n8n.
        </p>
        <div className="pt-6">
          <Link 
            href="/dashboard" 
            className="btn-primary text-lg px-10 py-4 shadow-xl shadow-foreground/5 hover:shadow-foreground/10 transition-shadow"
          >
            Enter Dashboard
          </Link>
        </div>
      </div>
      
      {/* Subtle backdrop */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
    </div>
  );
}
