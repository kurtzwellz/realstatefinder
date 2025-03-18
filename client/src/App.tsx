import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Thanks from "@/pages/thanks";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Función para determinar el prefijo de ruta para GitHub Pages
const getBasePath = () => {
  // En desarrollo usamos la ruta relativa, en producción (GitHub Pages) necesitamos
  // considerar el nombre del repositorio en la URL
  return import.meta.env.DEV ? '' : '';
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
      </div>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
