import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useFormProgress } from "@/hooks/use-form-progress";
import { clientFormSchema } from "@/lib/form-schemas";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Send, Home, Building, Map, Store } from "lucide-react";
import ProgressBar from "@/components/progress-bar";

export default function ClientForm() {
  const [step, setStep] = useState(1);
  const { progress } = useFormProgress(5, step); // 5 steps total
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
      minSize: 0,
      maxBudget: 0,
      features: [],
      hasCredit: false,
      creditType: "",
      creditAmount: 0,
      needsFinancing: false,
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      contactTime: "",
      comments: "",
      acceptPrivacyPolicy: false
    }
  });
  
  // Watch values for conditional rendering
  const selectedAlcaldia = form.watch("alcaldia");
  const hasCredit = form.watch("hasCredit");
  
  const clientRequestMutation = useMutation({
    mutationFn: async (data: any) => {
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
  
  const onSubmit = (values: any) => {
    // If not on the last step, move to the next step
    if (step < 5) {
      setStep(prev => prev + 1);
      return;
    }
    
    // On the final step, submit the form
    clientRequestMutation.mutate(values);
  };
  
  const goToPreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <Card className="max-w-3xl mx-auto mb-10">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Formulario para Cliente</h2>
          <p className="text-muted-foreground mb-4">Cuéntenos sobre la propiedad que está buscando</p>
          
          <ProgressBar progress={progress} className="mb-6" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Property Type */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">¿Qué tipo de propiedad está buscando?</h3>
                  
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
                                <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 cursor-pointer">
                                  <RadioGroupItem value="casa" id="casa" />
                                  <div className="flex items-center">
                                    <Home className="text-primary mr-3 h-5 w-5" />
                                    <div>
                                      <FormLabel className="font-semibold" htmlFor="casa">Casa</FormLabel>
                                      <p className="text-sm text-muted-foreground">Residencia independiente</p>
                                    </div>
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                            
                            <FormItem className="flex flex-col space-y-0">
                              <FormControl>
                                <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 cursor-pointer">
                                  <RadioGroupItem value="departamento" id="departamento" />
                                  <div className="flex items-center">
                                    <Building className="text-primary mr-3 h-5 w-5" />
                                    <div>
                                      <FormLabel className="font-semibold" htmlFor="departamento">Departamento</FormLabel>
                                      <p className="text-sm text-muted-foreground">Unidad en edificio</p>
                                    </div>
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                            
                            <FormItem className="flex flex-col space-y-0">
                              <FormControl>
                                <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 cursor-pointer">
                                  <RadioGroupItem value="terreno" id="terreno" />
                                  <div className="flex items-center">
                                    <Map className="text-primary mr-3 h-5 w-5" />
                                    <div>
                                      <FormLabel className="font-semibold" htmlFor="terreno">Terreno</FormLabel>
                                      <p className="text-sm text-muted-foreground">Lote sin construcción</p>
                                    </div>
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                            
                            <FormItem className="flex flex-col space-y-0">
                              <FormControl>
                                <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 cursor-pointer">
                                  <RadioGroupItem value="comercial" id="comercial" />
                                  <div className="flex items-center">
                                    <Store className="text-primary mr-3 h-5 w-5" />
                                    <div>
                                      <FormLabel className="font-semibold" htmlFor="comercial">Local Comercial</FormLabel>
                                      <p className="text-sm text-muted-foreground">Espacio para negocio</p>
                                    </div>
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {/* Step 2: Location */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">¿Dónde busca su propiedad?</h3>
                  
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
              )}
              
              {/* Step 3: Property Features */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Características de la propiedad</h3>
                  
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
                              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
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
                              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
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
                              { id: "amueblado", label: "Amueblado" }
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
              
              {/* Step 4: Credit Information */}
              {step === 4 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Información de Crédito</h3>
                  
                  <div className="mb-6">
                    <p className="mb-4">¿Ya cuenta con un crédito pre-aprobado?</p>
                    
                    <FormField
                      control={form.control}
                      name="hasCredit"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => field.onChange(value === "true")}
                              defaultValue={field.value ? "true" : "false"}
                              className="grid grid-cols-1 gap-4"
                            >
                              <FormItem className="flex flex-col space-y-0">
                                <FormControl>
                                  <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 cursor-pointer">
                                    <RadioGroupItem value="true" id="credit-yes" />
                                    <div className="flex items-center">
                                      <div className="text-green-500 mr-3">✓</div>
                                      <FormLabel className="font-semibold" htmlFor="credit-yes">
                                        Sí, ya tengo un crédito
                                      </FormLabel>
                                    </div>
                                  </div>
                                </FormControl>
                              </FormItem>
                              
                              <FormItem className="flex flex-col space-y-0">
                                <FormControl>
                                  <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 cursor-pointer">
                                    <RadioGroupItem value="false" id="credit-no" />
                                    <div className="flex items-center">
                                      <div className="text-red-500 mr-3">✕</div>
                                      <FormLabel className="font-semibold" htmlFor="credit-no">
                                        No, necesito financiamiento
                                      </FormLabel>
                                    </div>
                                  </div>
                                </FormControl>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Conditional Credit Details */}
                  {hasCredit && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <SelectValue placeholder="Seleccione una opción" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="infonavit">INFONAVIT</SelectItem>
                                <SelectItem value="fovissste">FOVISSSTE</SelectItem>
                                <SelectItem value="bancario">Bancario</SelectItem>
                                <SelectItem value="cofinavit">COFINAVIT</SelectItem>
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
                                placeholder="Ej: 2,000,000" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Financing Interest */}
                  {!hasCredit && (
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mt-4">
                      <h4 className="font-bold text-primary mb-2">¿Le interesa que lo contactemos para financiamiento?</h4>
                      <p className="text-sm mb-4">Trabajamos con varias instituciones financieras para encontrar la mejor opción para usted.</p>
                      
                      <FormField
                        control={form.control}
                        name="needsFinancing"
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
                                Sí, deseo que me contacten para opciones de financiamiento
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 5: Contact Information */}
              {step === 5 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                  <p className="text-muted-foreground mb-4">
                    Sus datos se manejarán con total confidencialidad conforme a nuestra política de privacidad.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactName"
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
                      name="contactPhone"
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
                      name="contactEmail"
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
                      name="contactTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horario de Contacto</FormLabel>
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
                              <SelectItem value="manana">Mañana (8:00 - 12:00)</SelectItem>
                              <SelectItem value="tarde">Tarde (12:00 - 17:00)</SelectItem>
                              <SelectItem value="noche">Noche (17:00 - 20:00)</SelectItem>
                              <SelectItem value="cualquier">Cualquier horario</SelectItem>
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
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comentarios Adicionales (opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Cualquier detalle adicional que nos quiera compartir" 
                              {...field} 
                              rows={3}
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
                              He leído y acepto la <a href="#" className="text-primary hover:underline">Política de Privacidad</a> *
                            </FormLabel>
                          </div>
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
                
                {step < 5 ? (
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
                    disabled={clientRequestMutation.isPending}
                  >
                    {clientRequestMutation.isPending ? (
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
