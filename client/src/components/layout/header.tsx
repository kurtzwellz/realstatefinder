import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Header() {
  const scrollToContact = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Building className="text-primary mr-2 h-8 w-8" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                PropConnect <span className="text-red-600">México</span>
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Conexión Inmobiliaria
              </p>
            </div>
          </div>
        </Link>
        
        <div>
          <Button 
            className="hidden md:inline-flex bg-primary hover:bg-primary/90"
            onClick={scrollToContact}
          >
            Contacto
          </Button>
        </div>
      </div>
    </header>
  );
}
