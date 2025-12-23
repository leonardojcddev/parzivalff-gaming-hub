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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Shield,
  Ban,
  CheckCircle,
  LogOut,
  RefreshCw,
  ShoppingCart,
  Clock,
  XCircle,
} from "lucide-react";

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

interface Order {
  id: string;
  user_id: string;
  email: string;
  status: "pending" | "completed" | "cancelled";
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export default function Admin({ profile }: AdminProps) {
  const nav = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function fetchUsers() {
    setLoadingUsers(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar usuarios: " + error.message);
    } else {
      setUsers(data || []);
    }
    setLoadingUsers(false);
  }

  async function fetchOrders() {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar pedidos: " + error.message);
    } else {
      setOrders(data || []);
    }
    setLoadingOrders(false);
  }

  useEffect(() => {
    fetchUsers();
    fetchOrders();
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

  async function updateOrderStatus(
    orderId: string,
    newStatus: "completed" | "cancelled"
  ) {
    setUpdating(orderId);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      toast.error("Error al actualizar pedido: " + error.message);
    } else {
      toast.success(
        newStatus === "completed" ? "Pedido completado" : "Pedido cancelado"
      );
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
    setUpdating(null);
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completado
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive" className="bg-destructive/20">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelado
          </Badge>
        );
    }
  };

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
                Bienvenida,{" "}
                <span className="text-primary font-medium">{profile?.email}</span>
              </p>
            </div>
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

          {/* Tabs */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Usuarios ({users.length})
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Pedidos ({orders.length})
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchUsers}
                  disabled={loadingUsers}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loadingUsers ? "animate-spin" : ""}`} />
                  Refrescar
                </Button>
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
                    {loadingUsers ? (
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
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/30 border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {orders.filter((o) => o.status === "pending").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Pendientes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/30 border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {orders.filter((o) => o.status === "completed").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Completados</p>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/30 border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-8 w-8 text-destructive" />
                    <div>
                      <p className="text-2xl font-bold">
                        {orders.filter((o) => o.status === "cancelled").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Cancelados</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchOrders}
                  disabled={loadingOrders}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loadingOrders ? "animate-spin" : ""}`} />
                  Refrescar
                </Button>
              </div>

              {/* Orders Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead>Email</TableHead>
                      <TableHead>Oferta</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingOrders ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ) : orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No hay pedidos registrados
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.email}</TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell className="text-primary font-semibold">
                            ${order.price}
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(order.created_at).toLocaleString("es-ES", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {order.status === "pending" ? (
                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, "completed")}
                                  disabled={updating === order.id}
                                  className="gap-1 border-green-500/30 text-green-500 hover:bg-green-500/10"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  Completar
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, "cancelled")}
                                  disabled={updating === order.id}
                                  className="gap-1"
                                >
                                  <XCircle className="h-4 w-4" />
                                  Cancelar
                                </Button>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                Sin acciones
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
