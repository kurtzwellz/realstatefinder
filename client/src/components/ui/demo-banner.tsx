import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Configuración para modo demo - solo activar si no hay API disponible
const DEMO_MODE = import.meta.env.PROD && !import.meta.env.VITE_API_URL;

export function DemoBanner() {
  const [visible, setVisible] = useState(false);
  
  // Mostrar el banner después de un pequeño retraso para no interrumpir la carga inicial
  useEffect(() => {
    if (DEMO_MODE) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (!DEMO_MODE || !visible) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Alert className="bg-amber-50 border-amber-200 shadow-lg">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <div className="flex-1">
          <AlertTitle className="text-amber-800">Modo Demostración</AlertTitle>
          <AlertDescription className="text-amber-700">
            Esta aplicación está funcionando en modo demo. Los formularios son funcionales pero los datos no son enviados a un servidor real.
          </AlertDescription>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          onClick={() => setVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  );
} 