import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useFormProgress } from "@/hooks/use-form-progress";
import { agentFormSchema } from "@/lib/form-schemas";
import { alcaldias, getColonias } from "@/lib/location-data";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import ProgressBar from "@/components/progress-bar";

export default function AgentForm() {
  const [step, setStep] = useState(1);
  const { progress } = useFormProgress(4, step); // 4 steps total
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const form = useForm<any>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      propertyType: "",
      transactionType: "",
      price: 0,
      size: 0,
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
      comments: ""
    }
  });
  
  // Watch value for conditional rendering
  const selectedAlcaldia = form.watch("alcaldia");
  
  const propertyListingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/property-listings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Propiedad registrada con éxito!",
        description: "La propiedad ha sido agregada a nuestra base de datos.",
      });
      navigate("/thanks/asesor");
    },
    onError: (error) => {
      toast({
        title: "Error al registrar la propiedad",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (values: any) => {
    // If not on the last step, move to the next step
    if (step < 4) {
      setStep(prev => prev + 1);
      return;
    }
    
    // On the final step, submit the form
    propertyListingMutation.mutate(values);
  };
  
  const goToPreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <Card className="max-w-3xl mx-auto mb-10">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Formulario para Asesor</h2>
          <p className="text-muted-foreground mb-4">Registre las propiedades disponibles en su cartera</p>
          
          <ProgressBar progress={progress} className="mb-6" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Property Details */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Detalles de la Propiedad</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Propiedad *</FormLabel>
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
                              <SelectItem value="casa">Casa</SelectItem>
                              <SelectItem value="departamento">Departamento</SelectItem>
                              <SelectItem value="terreno">Terreno</SelectItem>
                              <SelectItem value="comercial">Local Comercial</SelectItem>
                              <SelectItem value="oficina">Oficina</SelectItem>
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
                          <FormLabel>Tipo de Operación *</FormLabel>
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
                          <FormLabel>Precio (MXN) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Ej: 3,500,000" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                            />
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
                          <FormLabel>Tamaño (m²) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Ej: 120" 
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 2: Location */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Ubicación de la Propiedad</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="alcaldia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alcaldía *</FormLabel>
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
                          <FormLabel>Colonia *</FormLabel>
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
                              placeholder="Ingrese la calle de la propiedad" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 3: Property Features */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Características de la Propiedad</h3>
                  
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
                  
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="features"
                      render={() => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel>Características adicionales</FormLabel>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              { id: "estacionamiento", label: "Estacionamiento" },
                              { id: "jardin", label: "Jardín" },
                              { id: "alberca", label: "Alberca" },
                              { id: "seguridad", label: "Seguridad" },
                              { id: "elevador", label: "Elevador" },
                              { id: "amueblado", label: "Amueblado" },
                              { id: "terraza", label: "Terraza" },
                              { id: "bodega", label: "Bodega" },
                              { id: "gimnasio", label: "Gimnasio" }
                            ].map((feature) => (
                              <FormField
                                key={feature.id}
                                control={form.control}
                                name="features"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={feature.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(feature.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, feature.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: string) => value !== feature.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {feature.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              {/* Step 4: Agent Information */}
              {step === 4 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Información del Asesor</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="agentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ingrese su nombre completo" 
                              {...field} 
                            />
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
                          <FormLabel>Teléfono *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ej: 55 1234 5678" 
                              {...field} 
                            />
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
                          <FormLabel>Correo Electrónico *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="ejemplo@correo.com" 
                              {...field} 
                            />
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
                          <FormLabel>Empresa/Agencia (opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nombre de su empresa o agencia" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Información adicional de la propiedad (opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Cualquier detalle adicional sobre la propiedad" 
                              {...field} 
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousStep}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
                  </Button>
                )}
                
                {step < 4 ? (
                  <Button 
                    type="submit"
                    className="ml-auto bg-primary hover:bg-primary/90"
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="ml-auto bg-red-600 hover:bg-red-700"
                    disabled={propertyListingMutation.isPending}
                  >
                    {propertyListingMutation.isPending ? (
                      "Enviando..."
                    ) : (
                      <>Enviar Formulario <Send className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
