import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { DemoBanner } from "@/components/ui/demo-banner";
import Home from "@/pages/home";
import Thanks from "@/pages/thanks";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Función para determinar el prefijo de ruta para GitHub Pages
const getBasePath = () => {
  // En desarrollo usamos la ruta relativa, en producción (GitHub Pages) necesitamos
  // considerar el nombre del repositorio en la URL
  if (import.meta.env.DEV) {
    return ''; // En desarrollo, no hay prefijo
  }
  
  // En producción, intentamos detectar el nombre del repositorio desde la URL
  const { pathname } = window.location;
  // Si estamos en la raíz del dominio, no hay prefijo
  if (pathname === '/' || pathname.match(/^\/?index\.html$/)) {
    return '';
  }
  
  // Extraer el primer segmento de la ruta como nombre del repositorio
  const repoName = pathname.split('/')[1];
  return repoName ? `/${repoName}` : '';
};

function Router() {
  // Usamos el hook personalizado para determinar la base
  const basePath = getBasePath();
  
  return (
    <WouterRouter base={basePath}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/thanks/:role" component={Thanks} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        {/* Banner de modo demostración */}
        <DemoBanner />
      </div>
    </WouterRouter>
  );
}

export default function App() {
  // Mostrar información sobre la API configurada en la consola
  console.log('Aplicación RealEstateFinder iniciada');
  if (process.env.VITE_API_URL) {
    console.log(`API URL configurada: ${process.env.VITE_API_URL}`);
  } else {
    console.log('API URL no configurada, usando modo demo o proxy local');
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}
