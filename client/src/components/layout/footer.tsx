import { Link } from "wouter";
import { Building, Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-neutral-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Building className="text-primary mr-2 h-6 w-6" />
              <h3 className="text-xl font-bold">PropConnect México</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Conectando propiedades y personas en la Ciudad de México desde 2023.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="text-gray-400 space-y-2">
              <li><Link href="/" className="hover:text-white transition duration-200">Inicio</Link></li>
              <li><a href="#" className="hover:text-white transition duration-200">Acerca de Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Servicios</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white transition duration-200">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Aviso de Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> 
                Ciudad de México, México
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" /> 
                info@propconnect.mx
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" /> 
                (55) 1234-5678
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PropConnect México. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
