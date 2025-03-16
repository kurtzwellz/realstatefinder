import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, HomeIcon } from "lucide-react";

export default function Thanks() {
  const { role } = useParams();
  
  // Map role to a display name
  const getRoleDisplay = () => {
    switch (role) {
      case "cliente":
        return "Cliente";
      case "asesor":
        return "Asesor";
      case "asesorConCliente":
        return "Asesor con Cliente";
      default:
        return "Usuario";
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-20">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="pt-6 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 text-green-600 p-4 rounded-full">
              <CheckCircle className="h-12 w-12" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¡Gracias por enviar su información!
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Hemos recibido sus datos correctamente como {getRoleDisplay()}.
            Un representante se pondrá en contacto con usted a la brevedad en el 
            horario que indicó.
          </p>
          
          <Link href="/">
            <Button 
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
