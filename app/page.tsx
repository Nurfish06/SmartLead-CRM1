import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="animate-fade-in space-y-6">
        <h1 className="text-6xl font-bold gradient-text">n8n CRM Dashboard</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A premium interface for your automated lead management system. 
          Connected to Supabase and powered by n8n.
        </p>
        <div className="pt-8">
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-accent-primary hover:bg-accent-secondary transition-all rounded-full font-bold text-lg shadow-lg shadow-accent-primary/20 hover:shadow-accent-secondary/40"
          >
            Enter Dashboard
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-primary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
    </div>
  );
}