import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UserSearch, Building, Handshake, LogOut, 
  RefreshCcw, Download, Filter, ShieldAlert 
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("client-requests");
  
  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest("GET", "/api/admin/check-auth");
        if (!response.ok) {
          navigate("/admin/login");
        }
      } catch (error) {
        navigate("/admin/login");
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  // Consulta de solicitudes de clientes
  const clientRequestsQuery = useQuery({
    queryKey: ['/api/admin/client-requests'],
    enabled: activeTab === "client-requests",
  });
  
  // Consulta de propiedades de agentes
  const propertyListingsQuery = useQuery({
    queryKey: ['/api/admin/property-listings'],
    enabled: activeTab === "property-listings",
  });
  
  // Consulta de propiedades de agentes con clientes
  const agentClientListingsQuery = useQuery({
    queryKey: ['/api/admin/agent-client-listings'],
    enabled: activeTab === "agent-client-listings",
  });
  
  // Manejador para cerrar sesión
  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/admin/logout");
      toast({
        title: "Sesión finalizada",
        description: "Has cerrado sesión correctamente",
      });
      navigate("/admin/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };
  
  // Función para exportar datos a CSV
  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      toast({
        title: "Error",
        description: "No hay datos para exportar",
        variant: "destructive",
      });
      return;
    }
    
    // Crear encabezados
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // Encabezados
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Manejar valores que puedan contener comas
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : `${value ?? ''}`;
        }).join(',')
      )
    ];
    
    // Crear blob y descargar
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Renderizar datos según la pestaña activa
  const renderTabContent = () => {
    switch (activeTab) {
      case "client-requests":
        if (clientRequestsQuery.isPending) return <div className="text-center py-8">Cargando solicitudes...</div>;
        if (clientRequestsQuery.isError) return <div className="text-center py-8 text-red-500">Error al cargar solicitudes</div>;
        
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Total: {clientRequestsQuery.data?.length || 0} solicitudes</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => clientRequestsQuery.refetch()}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Actualizar
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportToCSV(clientRequestsQuery.data || [], 'solicitudes-clientes.csv')}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar CSV
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientRequestsQuery.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">No hay solicitudes de clientes</TableCell>
                    </TableRow>
                  ) : (
                    clientRequestsQuery.data?.map((request: any) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.propertyType}</TableCell>
                        <TableCell>{request.colonia}, {request.alcaldia}</TableCell>
                        <TableCell>{request.contactName}</TableCell>
                        <TableCell>{request.contactEmail}</TableCell>
                        <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      
      case "property-listings":
        if (propertyListingsQuery.isPending) return <div className="text-center py-8">Cargando propiedades...</div>;
        if (propertyListingsQuery.isError) return <div className="text-center py-8 text-red-500">Error al cargar propiedades</div>;
        
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Total: {propertyListingsQuery.data?.length || 0} propiedades</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => propertyListingsQuery.refetch()}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Actualizar
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportToCSV(propertyListingsQuery.data || [], 'propiedades.csv')}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar CSV
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Operación</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Agente</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyListingsQuery.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">No hay propiedades registradas</TableCell>
                    </TableRow>
                  ) : (
                    propertyListingsQuery.data?.map((listing: any) => (
                      <TableRow key={listing.id}>
                        <TableCell>{listing.id}</TableCell>
                        <TableCell>{listing.propertyType}</TableCell>
                        <TableCell>{listing.transactionType}</TableCell>
                        <TableCell>${listing.price.toLocaleString()}</TableCell>
                        <TableCell>{listing.colonia}, {listing.alcaldia}</TableCell>
                        <TableCell>{listing.agentName}</TableCell>
                        <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      
      case "agent-client-listings":
        if (agentClientListingsQuery.isPending) return <div className="text-center py-8">Cargando registros...</div>;
        if (agentClientListingsQuery.isError) return <div className="text-center py-8 text-red-500">Error al cargar registros</div>;
        
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Total: {agentClientListingsQuery.data?.length || 0} registros</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => agentClientListingsQuery.refetch()}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Actualizar
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportToCSV(agentClientListingsQuery.data || [], 'agentes-clientes.csv')}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar CSV
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Propiedad</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Agente</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Crédito</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentClientListingsQuery.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">No hay registros de agentes con clientes</TableCell>
                    </TableRow>
                  ) : (
                    agentClientListingsQuery.data?.map((listing: any) => (
                      <TableRow key={listing.id}>
                        <TableCell>{listing.id}</TableCell>
                        <TableCell>{listing.propertyType} ({listing.transactionType})</TableCell>
                        <TableCell>${listing.price.toLocaleString()}</TableCell>
                        <TableCell>{listing.agentName}</TableCell>
                        <TableCell>{listing.clientName}</TableCell>
                        <TableCell>{listing.hasCredit ? "Sí" : "No"}</TableCell>
                        <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <ShieldAlert className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="client-requests" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="client-requests" className="flex items-center">
            <UserSearch className="mr-2 h-4 w-4" />
            Solicitudes de Clientes
          </TabsTrigger>
          <TabsTrigger value="property-listings" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Propiedades de Agentes
          </TabsTrigger>
          <TabsTrigger value="agent-client-listings" className="flex items-center">
            <Handshake className="mr-2 h-4 w-4" />
            Agentes con Clientes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="client-requests">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Búsqueda de Propiedades</CardTitle>
              <CardDescription>
                Listado de todas las solicitudes enviadas por clientes buscando propiedades
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="property-listings">
          <Card>
            <CardHeader>
              <CardTitle>Propiedades Registradas por Agentes</CardTitle>
              <CardDescription>
                Listado de todas las propiedades registradas por agentes inmobiliarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agent-client-listings">
          <Card>
            <CardHeader>
              <CardTitle>Registros de Agentes con Clientes</CardTitle>
              <CardDescription>
                Listado de registros donde agentes ya tienen un cliente para una propiedad
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}