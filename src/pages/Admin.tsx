import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Ban, CheckCircle, LogOut, RefreshCw } from "lucide-react";

interface AdminProps {
  profile: any;
}

interface UserProfile {
  id: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "banned";
  created_at: string;
  updated_at: string;
}

export default function Admin({ profile }: AdminProps) {
  const nav = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar usuarios: " + error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    nav("/login");
  }

  async function updateRole(userId: string, newRole: "user" | "admin") {
    setUpdating(userId);
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) {
      toast.error("Error al actualizar rol: " + error.message);
    } else {
      toast.success("Rol actualizado correctamente");
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
    setUpdating(null);
  }

  async function toggleStatus(userId: string, currentStatus: "active" | "banned") {
    const newStatus = currentStatus === "active" ? "banned" : "active";
    setUpdating(userId);
    
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) {
      toast.error("Error al actualizar estado: " + error.message);
    } else {
      toast.success(
        newStatus === "banned" ? "Usuario baneado" : "Usuario activado"
      );
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
    }
    setUpdating(null);
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl shadow-primary/5">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-orbitron font-bold text-glow flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Admin Panel
              </h1>
              <p className="text-muted-foreground mt-1">
                Bienvenida, <span className="text-primary font-medium">{profile?.email}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUsers}
                disabled={loading}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refrescar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/30 border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Total usuarios</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary/30 border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Activos</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary/30 border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Ban className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.status === "banned").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Baneados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Registrado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No hay usuarios registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value: "user" | "admin") =>
                            updateRole(user.id, value)
                          }
                          disabled={updating === user.id || user.id === profile?.id}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Usuario</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "active" ? "default" : "destructive"}
                          className={
                            user.status === "active"
                              ? "bg-green-500/20 text-green-500 border-green-500/30"
                              : ""
                          }
                        >
                          {user.status === "active" ? "Activo" : "Baneado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={user.status === "active" ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => toggleStatus(user.id, user.status)}
                          disabled={updating === user.id || user.id === profile?.id}
                          className="gap-2"
                        >
                          {user.status === "active" ? (
                            <>
                              <Ban className="h-4 w-4" />
                              Banear
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Activar
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
