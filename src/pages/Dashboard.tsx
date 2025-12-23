import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { fetchMyProfile } from "@/lib/profile";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

interface DashboardProps {
  session: Session | null;
}

export default function Dashboard({ session }: DashboardProps) {
  const nav = useNavigate();
  const loc = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bannedMsg, setBannedMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    if (params.get("banned") === "1") {
      setBannedMsg("Tu cuenta está baneada. Si crees que es un error, contacta con soporte.");
    }
  }, [loc.search]);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setLoading(true);
      try {
        const p = await fetchMyProfile();
        if (!mounted) return;
        setProfile(p);
        // Si baneado -> cerrar sesión y mostrar mensaje
        if (p?.status === "banned") {
          await supabase.auth.signOut();
          setBannedMsg("Tu cuenta está baneada. Si crees que es un error, contacta con soporte.");
          nav("/login", { replace: true });
        }
      } catch (e) {
        console.error(e);
        setProfile(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    run();
    return () => { mounted = false; };
  }, [session?.user?.id]);

  async function logout() {
    await supabase.auth.signOut();
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-primary/5">
          <h1 className="text-3xl font-orbitron font-bold text-center mb-8 text-glow">
            Dashboard
          </h1>

          {bannedMsg && (
            <div className="mb-6 p-4 bg-destructive/20 border border-destructive/50 rounded-lg text-destructive text-center">
              {bannedMsg}
            </div>
          )}

          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Sesión activa: <span className="text-foreground font-medium">{session?.user?.email}</span>
            </p>

            {loading ? (
              <p className="text-muted-foreground">Cargando perfil...</p>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Rol: <span className="text-primary font-medium">{profile?.role ?? "sin perfil"}</span>
                </p>
                <p className="text-muted-foreground">
                  Status: <span className="text-foreground font-medium">{profile?.status ?? "unknown"}</span>
                </p>

                {profile?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="inline-block mt-4 bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-glow"
                  >
                    Ir a Admin
                  </Link>
                )}
              </>
            )}
          </div>

          <button
            onClick={logout}
            className="w-full mt-8 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-300 border border-border hover:border-destructive/50"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
