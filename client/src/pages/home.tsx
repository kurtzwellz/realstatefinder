import { useState } from "react";
import RoleCard from "@/components/role-card";
import ClientForm from "@/components/forms/client-form";
import AgentForm from "@/components/forms/agent-form";
import AgentClientForm from "@/components/forms/agent-client-form";
import { Building, User, Handshake } from "lucide-react";

type UserRole = "cliente" | "asesor" | "asesorConCliente" | null;

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Scroll to form with smooth behavior
    setTimeout(() => {
      const formElement = document.getElementById("form-section");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Welcome Section - only show if no role selected or at top of page */}
      <section className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
          Bienvenido a PropConnect <span className="text-red-600">México</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conectamos propiedades y personas en la Ciudad de México. Sin registro,
          comience seleccionando su rol a continuación.
        </p>
      </section>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        <RoleCard
          title="Cliente"
          description="Busco una propiedad que se adapte a mis necesidades en la Ciudad de México."
          icon={<Building className="h-8 w-8 text-primary" />}
          isSelected={selectedRole === "cliente"}
          onClick={() => handleRoleSelect("cliente")}
        />
        
        <RoleCard
          title="Asesor"
          description="Tengo propiedades en mi cartera que quiero publicar."
          icon={<User className="h-8 w-8 text-primary" />}
          isSelected={selectedRole === "asesor"}
          onClick={() => handleRoleSelect("asesor")}
        />
        
        <RoleCard
          title="Asesor con Cliente"
          description="Soy asesor y ya tengo un cliente interesado en propiedades específicas."
          icon={<Handshake className="h-8 w-8 text-primary" />}
          isSelected={selectedRole === "asesorConCliente"}
          onClick={() => handleRoleSelect("asesorConCliente")}
        />
      </div>

      {/* Form Sections - Only show if a role is selected */}
      <div id="form-section">
        {selectedRole === "cliente" && <ClientForm />}
        {selectedRole === "asesor" && <AgentForm />}
        {selectedRole === "asesorConCliente" && <AgentClientForm />}
      </div>
    </div>
  );
}
