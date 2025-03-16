import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { clientFormSchema } from "@/lib/form-schemas";
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
  Clock, CreditCard, User, Phone, Mail, Send
} from "lucide-react";

export default function ClientForm() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const form = useForm<any>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      propertyType: "",
      alcaldia: "",
      colonia: "",
      street: "",
      bedrooms: "",
      bathrooms: "",
      minSize: null,
      maxBudget: null,
      features: [],
      hasCredit: false,
      creditType: "",
      creditAmount: null,
      needsFinancing: false,
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      contactTime: "",
      comments: "",
      acceptPrivacyPolicy: false
    },
    mode: "onSubmit"
  });
  
  // Watch values for conditional rendering
  const selectedAlcaldia = form.watch("alcaldia");
  const hasCredit = form.watch("hasCredit");
  
  const clientRequestMutation = useMutation({
    mutationFn: async (data: any) => {
      // Encriptamos datos sensibles usando HTTPS
      const response = await apiRequest("POST", "/api/client-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Formulario enviado con éxito!",
        description: "Nos pondremos en contacto con usted pronto.",
      });
      navigate("/thanks/cliente");
    },
    onError: (error) => {
      toast({
        title: "Error al enviar el formulario",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const onSubmit = async (values: any) => {
    // Enviamos el formulario completo
    clientRequestMutation.mutate(values);
  };
  
  return (
    <Card className="max-w-4xl mx-auto mb-10 shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Formulario para Cliente</h2>
          </div>
          <p className="text-muted-foreground mb-2">
            Cuéntenos sobre la propiedad que está buscando. Complete todos los campos obligatorios.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <LockKeyhole className="h-4 w-4 mr-1 text-primary" />
            Todos los datos se transmiten de forma segura y solo serán accesibles por el administrador.
          </p>
        </div>
          
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Sección 1: Tipo de Propiedad */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Tipo de Propiedad</h3>
              
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <FormItem className="flex flex-col space-y-0">
                          <FormControl>
                            <label htmlFor="casa" className="cursor-pointer block w-full">
                              <div className="flex items-center space-x-2 bg-white hover:bg-gray-100 rounded-lg p-4 border border-gray-200">
                                <RadioGroupItem value="casa" id="casa" />
                                <div className="flex items-center">
                                  <Home className="text-primary mr-3 h-5 w-5" />
                                  <div>
                                    <FormLabel className="font-semibold" htmlFor="casa">Casa</FormLabel>
                                    <p className="text-sm text-muted-foreground">Residencia independiente</p>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-col space-y-0">
                          <FormControl>
                            <label htmlFor="departamento" className="cursor-pointer block w-full">
                              <div className="flex items-center space-x-2 bg-white hover:bg-gray-100 rounded-lg p-4 border border-gray-200">
                                <RadioGroupItem value="departamento" id="departamento" />
                                <div className="flex items-center">
                                  <Building className="text-primary mr-3 h-5 w-5" />
                                  <div>
                                    <FormLabel className="font-semibold" htmlFor="departamento">Departamento</FormLabel>
                                    <p className="text-sm text-muted-foreground">Unidad en edificio</p>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-col space-y-0">
                          <FormControl>
                            <label htmlFor="terreno" className="cursor-pointer block w-full">
                              <div className="flex items-center space-x-2 bg-white hover:bg-gray-100 rounded-lg p-4 border border-gray-200">
                                <RadioGroupItem value="terreno" id="terreno" />
                                <div className="flex items-center">
                                  <Map className="text-primary mr-3 h-5 w-5" />
                                  <div>
                                    <FormLabel className="font-semibold" htmlFor="terreno">Terreno</FormLabel>
                                    <p className="text-sm text-muted-foreground">Lote sin construcción</p>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </FormControl>
                        </FormItem>
                        
                        <FormItem className="flex flex-col space-y-0">
                          <FormControl>
                            <label htmlFor="comercial" className="cursor-pointer block w-full">
                              <div className="flex items-center space-x-2 bg-white hover:bg-gray-100 rounded-lg p-4 border border-gray-200">
                                <RadioGroupItem value="comercial" id="comercial" />
                                <div className="flex items-center">
                                  <Store className="text-primary mr-3 h-5 w-5" />
                                  <div>
                                    <FormLabel className="font-semibold" htmlFor="comercial">Local Comercial</FormLabel>
                                    <p className="text-sm text-muted-foreground">Espacio para negocio</p>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <FormLabel>Calle (opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ingrese la calle de su interés" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 3: Características */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Características (opcional)</h3>
              
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
                
                <FormField
                  control={form.control}
                  name="minSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamaño mínimo (m²)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ej: 80" 
                          {...field}
                          onChange={(e) => {
                            // Si el campo está vacío, no asignar un valor (será undefined)
                            if (e.target.value === '') {
                              field.onChange(null);
                            } else {
                              field.onChange(e.target.valueAsNumber);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="maxBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Presupuesto máximo (MXN)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ej: 3,000,000" 
                          {...field}
                          onChange={(e) => {
                            // Si el campo está vacío, no asignar un valor (será undefined)
                            if (e.target.value === '') {
                              field.onChange(null);
                            } else {
                              field.onChange(e.target.valueAsNumber);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 4: Información de Crédito */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Información de Crédito</h3>
              
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
                          Ya tengo un crédito pre-aprobado
                        </FormLabel>
                        <FormDescription>
                          Indique si ya cuenta con un crédito aprobado para la compra
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
                            <Input
                              type="number"
                              placeholder="Ej: 1,000,000"
                              {...field}
                              onChange={(e) => {
                                if (e.target.value === '') {
                                  field.onChange(null);
                                } else {
                                  field.onChange(e.target.valueAsNumber);
                                }
                              }}
                            />
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
                          Me interesa recibir información sobre opciones de financiamiento
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Sección 5: Información de Contacto */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-primary">Información de Contacto</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
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
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
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
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Ej: correo@ejemplo.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactTime"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Horario preferido para contacto (opcional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Ej: Tardes después de las 6pm" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Comentarios adicionales (opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Especifique cualquier información adicional relevante"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                <FormField
                  control={form.control}
                  name="acceptPrivacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Acepto la política de privacidad y el tratamiento de mis datos
                        </FormLabel>
                        <FormDescription>
                          Sus datos personales serán tratados con confidencialidad y solo serán utilizados para contactarle respecto a su solicitud de propiedad.
                        </FormDescription>
                      </div>
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
                disabled={clientRequestMutation.isPending}
              >
                <Send className="mr-2 h-4 w-4" />
                {clientRequestMutation.isPending ? "Enviando..." : "Enviar solicitud"}
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