import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface AdminProps {
  profile: any;
}

export default function Admin({ profile }: AdminProps) {
  const nav = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-primary/5">
          <h1 className="text-3xl font-orbitron font-bold text-center mb-2 text-glow">
            Admin Panel
          </h1>

          <p className="text-center text-muted-foreground mb-8">
            Bienvenida, admin: <span className="text-primary font-medium">{profile?.email}</span>
          </p>

          <div className="bg-secondary/30 border border-border rounded-lg p-6 text-center text-muted-foreground mb-8">
            (Aquí luego metemos Orders / Users / etc.)
          </div>

          <button
            onClick={logout}
            className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-300 border border-border hover:border-destructive/50"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
