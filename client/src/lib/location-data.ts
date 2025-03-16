// Location data for Mexico City (Ciudad de México)

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
// This is a simplified dataset with a few colonias per alcaldía
const coloniasByAlcaldia: Record<string, Array<{ value: string, label: string }>> = {
  "alvaro-obregon": [
    { value: "florida", label: "Florida" },
    { value: "olivar-del-conde", label: "Olivar del Conde" },
    { value: "san-angel", label: "San Ángel" },
    { value: "san-angel-inn", label: "San Ángel Inn" },
    { value: "tizapan", label: "Tizapán" }
  ],
  "azcapotzalco": [
    { value: "claveria", label: "Clavería" },
    { value: "el-rosario", label: "El Rosario" },
    { value: "nueva-santa-maria", label: "Nueva Santa María" },
    { value: "san-pedro-xalpa", label: "San Pedro Xalpa" },
    { value: "santo-domingo", label: "Santo Domingo" }
  ],
  "benito-juarez": [
    { value: "del-valle", label: "Del Valle" },
    { value: "napoles", label: "Nápoles" },
    { value: "narvarte", label: "Narvarte" },
    { value: "portales", label: "Portales" },
    { value: "san-jose-insurgentes", label: "San José Insurgentes" }
  ],
  "coyoacan": [
    { value: "centro-de-coyoacan", label: "Centro de Coyoacán" },
    { value: "ciudad-universitaria", label: "Ciudad Universitaria" },
    { value: "pedregal-de-santo-domingo", label: "Pedregal de Santo Domingo" },
    { value: "romero-de-terreros", label: "Romero de Terreros" },
    { value: "villa-coyoacan", label: "Villa Coyoacán" }
  ],
  "cuajimalpa": [
    { value: "bosques-de-las-lomas", label: "Bosques de las Lomas" },
    { value: "contadero", label: "Contadero" },
    { value: "cuajimalpa", label: "Cuajimalpa" },
    { value: "lomas-de-vista-hermosa", label: "Lomas de Vista Hermosa" },
    { value: "santa-fe", label: "Santa Fe" }
  ],
  "cuauhtemoc": [
    { value: "centro", label: "Centro" },
    { value: "condesa", label: "Condesa" },
    { value: "juarez", label: "Juárez" },
    { value: "roma-norte", label: "Roma Norte" },
    { value: "roma-sur", label: "Roma Sur" }
  ],
  "gustavo-madero": [
    { value: "aragon", label: "Aragón" },
    { value: "lindavista", label: "Lindavista" },
    { value: "nueva-industrial-vallejo", label: "Nueva Industrial Vallejo" },
    { value: "residencial-zacatenco", label: "Residencial Zacatenco" },
    { value: "san-bartolo-atepehuacan", label: "San Bartolo Atepehuacan" }
  ],
  "iztacalco": [
    { value: "agricola-oriental", label: "Agrícola Oriental" },
    { value: "granjas-mexico", label: "Granjas México" },
    { value: "santa-anita", label: "Santa Anita" },
    { value: "tlazintla", label: "Tlazintla" },
    { value: "viaducto-piedad", label: "Viaducto Piedad" }
  ],
  "iztapalapa": [
    { value: "cerro-de-la-estrella", label: "Cerro de la Estrella" },
    { value: "constitucion-de-1917", label: "Constitución de 1917" },
    { value: "leyes-de-reforma", label: "Leyes de Reforma" },
    { value: "santa-martha-acatitla", label: "Santa Martha Acatitla" },
    { value: "valle-de-luces", label: "Valle de Luces" }
  ],
  "magdalena-contreras": [
    { value: "barranca-seca", label: "Barranca Seca" },
    { value: "el-tanque", label: "El Tanque" },
    { value: "las-aguilas", label: "Las Águilas" },
    { value: "san-jeronimo-lidice", label: "San Jerónimo Lídice" },
    { value: "san-nicolas-totolapan", label: "San Nicolás Totolapan" }
  ],
  "miguel-hidalgo": [
    { value: "anzures", label: "Anzures" },
    { value: "irrigacion", label: "Irrigación" },
    { value: "lomas-de-chapultepec", label: "Lomas de Chapultepec" },
    { value: "polanco", label: "Polanco" },
    { value: "tacuba", label: "Tacuba" }
  ],
  "milpa-alta": [
    { value: "san-antonio-tecomitl", label: "San Antonio Tecómitl" },
    { value: "san-bartolome-xicomulco", label: "San Bartolomé Xicomulco" },
    { value: "san-pedro-atocpan", label: "San Pedro Atocpan" },
    { value: "santa-ana-tlacotenco", label: "Santa Ana Tlacotenco" },
    { value: "villa-milpa-alta", label: "Villa Milpa Alta" }
  ],
  "tlahuac": [
    { value: "la-nopalera", label: "La Nopalera" },
    { value: "san-francisco-tlaltenco", label: "San Francisco Tlaltenco" },
    { value: "san-juan-ixtayopan", label: "San Juan Ixtayopan" },
    { value: "san-pedro-tlahuac", label: "San Pedro Tláhuac" },
    { value: "zapotitla", label: "Zapotitla" }
  ],
  "tlalpan": [
    { value: "ajusco", label: "Ajusco" },
    { value: "coapa", label: "Coapa" },
    { value: "jardines-del-pedregal", label: "Jardines del Pedregal" },
    { value: "tlalpan-centro", label: "Tlalpan Centro" },
    { value: "villa-coapa", label: "Villa Coapa" }
  ],
  "venustiano-carranza": [
    { value: "aeropuerto", label: "Aeropuerto" },
    { value: "jamaica", label: "Jamaica" },
    { value: "jardin-balbuena", label: "Jardín Balbuena" },
    { value: "moctezuma", label: "Moctezuma" },
    { value: "morelos", label: "Morelos" }
  ],
  "xochimilco": [
    { value: "bosque-residencial-del-sur", label: "Bosque Residencial del Sur" },
    { value: "san-gregorio-atlapulco", label: "San Gregorio Atlapulco" },
    { value: "san-luis-tlaxialtemalco", label: "San Luis Tlaxialtemalco" },
    { value: "santa-cruz-acalpixca", label: "Santa Cruz Acalpixca" },
    { value: "tepepan", label: "Tepepan" }
  ]
};

/**
 * Get colonias for a specific alcaldía
 * @param alcaldiaValue The value of the selected alcaldía
 * @returns Array of colonia options for the given alcaldía
 */
export function getColonias(alcaldiaValue: string) {
  return coloniasByAlcaldia[alcaldiaValue] || [];
}
