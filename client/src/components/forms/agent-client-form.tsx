import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { agentClientFormSchema } from "@/lib/form-schemas";
import { alcaldias, getColonias } from "@/lib/location-data";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Home, Building, Map, Store, Shield, LockKeyhole, 
  Clock, CreditCard, User, Phone, Mail, Send,
  BadgeDollarSign, Briefcase, Square, MapPin, DollarSign,
  Users, UserCircle, Handshake
} from "lucide-react";

export default function AgentClientForm() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const form = useForm<any>({
    resolver: zodResolver(agentClientFormSchema),
    defaultValues: {
      propertyType: "",
      transactionType: "",
      price: "",
      size: "",
      alcaldia: "",
      colonia: "",
      street: "",
      bedrooms: "",
      bathrooms: "",
      features: [],
      agentName: "",
      agentPhone: "",
      agentEmail: "",
      agentCompany: "",
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      hasCredit: false,
      creditType: "",
      creditAmount: "",
      needsFinancing: false,
      comments: ""
    },
    mode: "onSubmit"
  });
  
  // Watch values for conditional rendering
  const selectedAlcaldia = form.watch("alcaldia");
  const hasCredit = form.watch("hasCredit");
  
  const agentClientListingMutation = useMutation({
    mutationFn: async (data: any) => {
      // Encriptamos datos sensibles usando HTTPS
      const response = await apiRequest("POST", "/api/agent-client-listings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Información registrada con éxito!",
        description: "Los datos de propiedad y cliente han sido guardados.",
      });
      navigate("/thanks/asesor-cliente");
    },
    onError: (error) => {
      toast({
        title: "Error al registrar la información",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const onSubmit = async (values: any) => {
    // Aseguramos que los valores numéricos sean números
    if (values.price) {
      values.price = parseInt(values.price);
    }
    if (values.size) {
      values.size = parseInt(values.size);
    }
    if (values.creditAmount) {
      values.creditAmount = parseInt(values.creditAmount);
    }
    
    // Enviamos el formulario completo
    agentClientListingMutation.mutate(values);
  };
  
  return (
    <Card className="max-w-4xl mx-auto mb-10 shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Handshake className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Formulario para Asesor con Cliente</h2>
          </div>
          <p className="text-muted-foreground mb-2">
            Registre una propiedad y los datos del cliente interesado. Complete todos los campos obligatorios.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <LockKeyhole className="h-4 w-4 mr-1 text-primary" />
            Todos los datos se transmiten de forma segura y solo serán accesibles por el administrador.
          </p>
        </div>
          
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Sección 1: Información Básica de la Propiedad */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Información Básica de la Propiedad</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Propiedad</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo de propiedad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="casa">Casa</SelectItem>
                          <SelectItem value="departamento">Departamento</SelectItem>
                          <SelectItem value="terreno">Terreno</SelectItem>
                          <SelectItem value="comercial">Local Comercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="transactionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Operación</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo de operación" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="venta">Venta</SelectItem>
                          <SelectItem value="renta">Renta</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio (MXN)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-9"
                            type="number" 
                            placeholder="Ej: 3,500,000" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Superficie (m²)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Square className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-9"
                            type="number" 
                            placeholder="Ej: 120" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 2: Ubicación */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Ubicación</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="alcaldia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcaldía</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una alcaldía" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {alcaldias.map((alcaldia) => (
                            <SelectItem key={alcaldia.value} value={alcaldia.value}>
                              {alcaldia.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="colonia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colonia</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedAlcaldia}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={selectedAlcaldia ? "Seleccione una colonia" : "Primero seleccione una alcaldía"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedAlcaldia && getColonias(selectedAlcaldia).map((colonia) => (
                            <SelectItem key={colonia.value} value={colonia.value}>
                              {colonia.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-9"
                            placeholder="Calle, número exterior e interior (opcional)" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 3: Características */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Características de la Propiedad</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Habitaciones</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 habitación</SelectItem>
                          <SelectItem value="2">2 habitaciones</SelectItem>
                          <SelectItem value="3">3 habitaciones</SelectItem>
                          <SelectItem value="4">4 habitaciones</SelectItem>
                          <SelectItem value="5+">5+ habitaciones</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baños</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 baño</SelectItem>
                          <SelectItem value="1.5">1.5 baños</SelectItem>
                          <SelectItem value="2">2 baños</SelectItem>
                          <SelectItem value="2.5">2.5 baños</SelectItem>
                          <SelectItem value="3+">3+ baños</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 4: Información del Asesor */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Información del Asesor</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Asesor</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Ingrese su nombre" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agentPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono del Asesor</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Ej: 55 1234 5678" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agentEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo del Asesor</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="correo@ejemplo.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agentCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa (opcional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Nombre de la inmobiliaria" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 5: Información del Cliente */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Información del Cliente</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Cliente</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Nombre completo del cliente" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono del Cliente</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Ej: 55 1234 5678" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Correo del Cliente</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="correo@ejemplo.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 6: Información de Crédito */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Información de Crédito del Cliente</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasCredit"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-white">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          El cliente cuenta con un crédito pre-aprobado
                        </FormLabel>
                        <FormDescription>
                          Indique si el cliente ya tiene un crédito aprobado para la compra
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                {hasCredit && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="creditType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Crédito</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo de crédito" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="infonavit">Infonavit</SelectItem>
                              <SelectItem value="fovissste">Fovissste</SelectItem>
                              <SelectItem value="bancario">Bancario</SelectItem>
                              <SelectItem value="cofinanciamiento">Cofinanciamiento</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="creditAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monto del Crédito (MXN)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-9"
                                type="number"
                                placeholder="Ej: 1,000,000"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="needsFinancing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-white">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          El cliente necesita opciones de financiamiento
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentarios adicionales</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describa cualquier detalle adicional relevante sobre la propiedad o el cliente"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección de botón de envío */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-auto"
                disabled={agentClientListingMutation.isPending}
              >
                <Send className="mr-2 h-4 w-4" />
                {agentClientListingMutation.isPending ? "Enviando..." : "Registrar información"}
              </Button>
            </div>
            
            {/* Mensaje de seguridad */}
            <div className="text-center text-sm text-muted-foreground flex items-center justify-center">
              <Shield className="h-4 w-4 mr-1 text-primary" />
              La información se envía de forma segura y encriptada
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}