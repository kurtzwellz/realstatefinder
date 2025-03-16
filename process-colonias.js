import fs from 'fs';
import path from 'path';

// Mapeo de nombres de municipios a valores de alcaldías
const municipioToAlcaldia = {
  'Álvaro Obregón': 'alvaro-obregon',
  'Azcapotzalco': 'azcapotzalco',
  'Benito Juárez': 'benito-juarez',
  'Coyoacán': 'coyoacan',
  'Cuajimalpa de Morelos': 'cuajimalpa',
  'Cuauhtémoc': 'cuauhtemoc',
  'Gustavo A. Madero': 'gustavo-madero',
  'Iztacalco': 'iztacalco',
  'Iztapalapa': 'iztapalapa',
  'La Magdalena Contreras': 'magdalena-contreras',
  'Miguel Hidalgo': 'miguel-hidalgo',
  'Milpa Alta': 'milpa-alta',
  'Tláhuac': 'tlahuac',
  'Tlalpan': 'tlalpan',
  'Venustiano Carranza': 'venustiano-carranza',
  'Xochimilco': 'xochimilco'
};

// Función auxiliar para normalizar el texto (quitar acentos, convertir a minúsculas y reemplazar espacios)
function normalizeText(text) {
  if (typeof text !== 'string') {
    console.warn('Texto no válido:', text);
    return 'valor-no-disponible';
  }
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

async function processColonias() {
  console.log('Procesando datos de colonias...');
  
  // Conjunto para almacenar colonias únicas por alcaldía
  const coloniasByAlcaldia = {};
  
  // Inicializar el objeto con arrays vacíos para cada alcaldía
  Object.values(municipioToAlcaldia).forEach(alcaldia => {
    coloniasByAlcaldia[alcaldia] = new Set();
  });
  
  // Procesar cada archivo JSON
  const files = fs.readdirSync('./tmp/colonias').filter(file => file.endsWith('.json'));
  let totalColonias = 0;
  
  console.log(`Encontrados ${files.length} archivos JSON para procesar`);
  
  // Validar la estructura de los archivos
  const firstFilePath = path.join('./tmp/colonias', files[0]);
  const firstFileContent = fs.readFileSync(firstFilePath, 'utf8');
  console.log(`Analizando estructura del primer archivo: ${firstFilePath}`);
  
  try {
    const firstJsonData = JSON.parse(firstFileContent);
    console.log('Estructura del primer archivo JSON:');
    console.log('- Tiene propiedad results:', !!firstJsonData.results);
    console.log('- Total resultados:', firstJsonData.results ? firstJsonData.results.length : 0);
    
    if (firstJsonData.results && firstJsonData.results.length > 0) {
      const firstRecord = firstJsonData.results[0];
      console.log('- Ejemplo de registro:');
      console.log(JSON.stringify(firstRecord, null, 2));
    }
  } catch (error) {
    console.error('Error al analizar el primer archivo JSON:', error);
  }
  
  for (const file of files) {
    const filePath = path.join('./tmp/colonias', file);
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      
      console.log(`Procesando archivo ${file}...`);
      
      if (jsonData.results && Array.isArray(jsonData.results)) {
        for (const record of jsonData.results) {
          if (record.mun_name && Array.isArray(record.mun_name) && 
              record.col_name && Array.isArray(record.col_name)) {
            
            // Extraer el primer valor de los arrays mun_name y col_name
            const municipio = record.mun_name[0];
            const colonia = record.col_name[0];
            
            // Si el municipio existe en nuestro mapeo
            if (municipioToAlcaldia[municipio]) {
              const alcaldiaValue = municipioToAlcaldia[municipio];
              coloniasByAlcaldia[alcaldiaValue].add(colonia);
              totalColonias++;
            }
          }
        }
      } else {
        console.warn(`Archivo ${file} no tiene la estructura esperada`);
      }
    } catch (error) {
      console.error(`Error al procesar el archivo ${file}:`, error);
    }
  }
  
  console.log(`Se procesaron ${totalColonias} colonias en total.`);
  
  // Convertir los Sets a arrays con objetos {value, label}
  const result = {};
  for (const [alcaldia, colonias] of Object.entries(coloniasByAlcaldia)) {
    result[alcaldia] = Array.from(colonias).map(colonia => ({
      value: normalizeText(colonia),
      label: colonia
    }));
    console.log(`${alcaldia}: ${result[alcaldia].length} colonias únicas`);
  }
  
  // Generar el archivo TypeScript
  const tsContent = `// Location data for Mexico City (Ciudad de México)

// Define alcaldía options
export const alcaldias = [
  { value: "alvaro-obregon", label: "Álvaro Obregón" },
  { value: "azcapotzalco", label: "Azcapotzalco" },
  { value: "benito-juarez", label: "Benito Juárez" },
  { value: "coyoacan", label: "Coyoacán" },
  { value: "cuajimalpa", label: "Cuajimalpa" },
  { value: "cuauhtemoc", label: "Cuauhtémoc" },
  { value: "gustavo-madero", label: "Gustavo A. Madero" },
  { value: "iztacalco", label: "Iztacalco" },
  { value: "iztapalapa", label: "Iztapalapa" },
  { value: "magdalena-contreras", label: "Magdalena Contreras" },
  { value: "miguel-hidalgo", label: "Miguel Hidalgo" },
  { value: "milpa-alta", label: "Milpa Alta" },
  { value: "tlahuac", label: "Tláhuac" },
  { value: "tlalpan", label: "Tlalpan" },
  { value: "venustiano-carranza", label: "Venustiano Carranza" },
  { value: "xochimilco", label: "Xochimilco" }
];

// Define colonias for each alcaldía
// Data source: Open Data México - https://public.opendatasoft.com/explore/dataset/georef-mexico-colonia
const coloniasByAlcaldia: Record<string, Array<{ value: string, label: string }>> = ${JSON.stringify(result, null, 2)};

/**
 * Get colonias for a specific alcaldía
 * @param alcaldiaValue The value of the selected alcaldía
 * @returns Array of colonia options for the given alcaldía
 */
export function getColonias(alcaldiaValue: string) {
  return coloniasByAlcaldia[alcaldiaValue] || [];
}
`;

  // Guardar el archivo actualizado
  fs.writeFileSync('./client/src/lib/location-data-updated.ts', tsContent);
  console.log('Archivo location-data-updated.ts generado correctamente.');
}

processColonias();