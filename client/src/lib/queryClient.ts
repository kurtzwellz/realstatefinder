import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Configuración para modo demo - solo activar si no hay API disponible
const DEMO_MODE = import.meta.env.PROD && !import.meta.env.VITE_API_URL;

// Obtener la URL base de la API (para desarrollo o producción)
const getApiBaseUrl = (): string => {
  // Si hay una URL de API configurada, úsala
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // De lo contrario, usa el proxy local en desarrollo
  return '';
};

// Construir la URL completa de la API
const buildApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  
  // Si estamos usando la URL de Cloud Run, no añadimos /api
  if (baseUrl.includes('a.run.app')) {
    // Eliminamos /api si está presente en el endpoint
    const cleanEndpoint = endpoint.replace(/^\/api/, '');
    // Asegurar que el endpoint empiece con /
    const normalizedEndpoint = cleanEndpoint.startsWith('/') ? cleanEndpoint : '/' + cleanEndpoint;
    return baseUrl + normalizedEndpoint;
  }
  
  // Si el endpoint ya comienza con '/api', no añadir prefijo
  if (endpoint.startsWith('/api/')) {
    return baseUrl + endpoint;
  }
  // De lo contrario, asegurarse de que tenga el prefijo '/api'
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  return baseUrl + '/api' + normalizedEndpoint;
};

// Función para simular respuestas del servidor en modo demo
async function simulateApiResponse(method: string, url: string, data?: any): Promise<any> {
  console.log(`MODO DEMO: Simulando solicitud ${method} a ${url}`);
  console.log('Datos enviados:', data);
  
  // Esperar un tiempo aleatorio para simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
  
  if (url.includes('/client-requests')) {
    return {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
  } else if (url.includes('/property-listings')) {
    return {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
  } else if (url.includes('/agent-client-listings')) {
    return {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
  } else {
    // Respuesta genérica para otras rutas
    return { success: true, message: 'Operación simulada exitosa' };
  }
}

// Función para verificar si la respuesta es correcta
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    try {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
  }
}

export type UnauthorizedBehavior = "throwError" | "returnNull";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.PROD,
      retry: 0,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    // Construir la URL completa
    const fullUrl = buildApiUrl(url);
    
    // Si estamos en modo demo, simular la respuesta
    if (DEMO_MODE && (url.includes('/client-requests') || 
                       url.includes('/property-listings') || 
                       url.includes('/agent-client-listings'))) {
      const demoData = await simulateApiResponse(method, url, data);
      
      // Crear una respuesta simulada
      const demoResponse = new Response(JSON.stringify(demoData), {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('MODO DEMO: Respuesta simulada:', demoData);
      return demoResponse;
    }
    
    // Si no estamos en modo demo, realizar la solicitud normal
    console.log(`Enviando solicitud ${method} a ${fullUrl}`);
    
    // Preparar los headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    // Realizar la solicitud
    const res = await fetch(fullUrl, {
      method,
      headers: data ? headers : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "omit", // Cambiado de "include" a "omit" para evitar problemas de CORS
      mode: "cors",
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      // Este error ocurre cuando hay un problema de conexión con el servidor
      console.error("Error de conexión:", error);
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet o inténtalo más tarde.");
    }
    // Reenviar otros errores
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      // Construir la URL completa
      const fullUrl = buildApiUrl(queryKey[0] as string);
      
      console.log(`Consultando ${fullUrl}`);
      const res = await fetch(fullUrl, {
        credentials: "omit", // Cambiado de "include" a "omit"
        mode: "cors",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      
      try {
        return await res.json();
      } catch (jsonError) {
        console.error("Error al parsear respuesta JSON:", jsonError);
        throw new Error("Error al procesar la respuesta del servidor. Por favor, inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error("Error de conexión:", error);
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet o inténtalo más tarde.");
      }
      // Reenviar otros errores
      console.error("Error en la solicitud:", error);
      throw error;
    }
  };

export const defaultQueryFn = getQueryFn({ on401: "throwError" });
