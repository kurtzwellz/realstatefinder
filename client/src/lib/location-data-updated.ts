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
// Data source: Open Data México - https://public.opendatasoft.com/explore/dataset/georef-mexico-colonia
const coloniasByAlcaldia: Record<string, Array<{ value: string, label: string }>> = {
  "alvaro-obregon": [
    {
      "value": "garcimarrero-norte",
      "label": "Garcimarrero Norte"
    },
    {
      "value": "lomas-de-chamontoya",
      "label": "Lomas De Chamontoya"
    },
    {
      "value": "merced-gomez",
      "label": "Merced Gomez"
    },
    {
      "value": "puente-colorado-ampl",
      "label": "Puente Colorado (Ampl)"
    },
    {
      "value": "estado-de-hidalgo",
      "label": "Estado De Hidalgo_"
    },
    {
      "value": "balcones-de-cehuayo",
      "label": "Balcones De Cehuayo"
    },
    {
      "value": "bonanza",
      "label": "Bonanza"
    },
    {
      "value": "cove",
      "label": "Cove"
    },
    {
      "value": "el-mirador",
      "label": "El Mirador"
    },
    {
      "value": "la-conchita",
      "label": "La Conchita"
    },
    {
      "value": "las-aguilas-ampl",
      "label": "Las Aguilas (Ampl)"
    },
    {
      "value": "molino-de-santo-domingo-u-hab",
      "label": "Molino De Santo Domingo (U Hab)"
    },
    {
      "value": "puente-colorado",
      "label": "Puente Colorado"
    },
    {
      "value": "tlacopac",
      "label": "Tlacopac"
    },
    {
      "value": "villa-solidaridad",
      "label": "Villa Solidaridad"
    },
    {
      "value": "26-de-julio",
      "label": "26 De Julio"
    },
    {
      "value": "lomas-de-plateros-u-hab-i",
      "label": "Lomas De Plateros (U Hab) I"
    },
    {
      "value": "santa-fe-km-85",
      "label": "Santa Fe Km 8.5"
    },
    {
      "value": "arturo-gamiz",
      "label": "Arturo Gamiz"
    },
    {
      "value": "conciencia-proletaria",
      "label": "Conciencia Proletaria"
    },
    {
      "value": "el-piru-fracc",
      "label": "El Piru (Fracc)"
    },
    {
      "value": "la-cebada-ampl",
      "label": "La Cebada (Ampl)"
    },
    {
      "value": "lomas-de-capulin",
      "label": "Lomas De Capulin"
    },
    {
      "value": "polvora",
      "label": "Polvora"
    },
    {
      "value": "tetelpan-pblo",
      "label": "Tetelpan (Pblo)"
    },
    {
      "value": "valentin-gomez-farias",
      "label": "Valentin Gomez Farias"
    },
    {
      "value": "calzada-jalalpa",
      "label": "Calzada Jalalpa"
    },
    {
      "value": "el-bosque-seccion-torres",
      "label": "El Bosque Seccion Torres"
    },
    {
      "value": "emancipacion-del-pueblo-u-hab",
      "label": "Emancipacion Del Pueblo (U Hab)"
    },
    {
      "value": "golondrinas",
      "label": "Golondrinas"
    },
    {
      "value": "palmas",
      "label": "Palmas"
    },
    {
      "value": "prof-jose-arturo-lopez",
      "label": "Prof Jose Arturo Lopez"
    },
    {
      "value": "reacomodo-el-cuernito",
      "label": "Reacomodo El Cuernito"
    },
    {
      "value": "reacomodo-pino-suarez",
      "label": "Reacomodo Pino Suarez"
    },
    {
      "value": "villa-verdun",
      "label": "Villa Verdun"
    },
    {
      "value": "el-pirul",
      "label": "El Pirul"
    },
    {
      "value": "las-aguilas-secc-hornos",
      "label": "Las Aguilas Secc Hornos"
    },
    {
      "value": "ocho-de-agosto",
      "label": "Ocho De Agosto"
    },
    {
      "value": "parque-residencial-san-antonio-u-hab",
      "label": "Parque Residencial San Antonio (U Hab)"
    },
    {
      "value": "unidad-popular-tepeaca",
      "label": "Unidad Popular Tepeaca"
    },
    {
      "value": "zenon-delgado",
      "label": "Zenon Delgado"
    },
    {
      "value": "jalalpa-ampl",
      "label": "Jalalpa (Ampl)"
    },
    {
      "value": "bella-vista",
      "label": "Bella Vista"
    },
    {
      "value": "abraham-gonzalez",
      "label": "Abraham Gonzalez"
    },
    {
      "value": "golondrinas-2da-seccion",
      "label": "Golondrinas 2da Seccion"
    },
    {
      "value": "la-herradura",
      "label": "La Herradura"
    },
    {
      "value": "las-palmas",
      "label": "Las Palmas"
    },
    {
      "value": "lomas-de-santo-domingo",
      "label": "Lomas De Santo Domingo"
    },
    {
      "value": "ponciano-arriaga",
      "label": "Ponciano Arriaga"
    },
    {
      "value": "presidentes-1ra-ampl",
      "label": "Presidentes 1ra (Ampl)"
    },
    {
      "value": "pueblo-nuevo",
      "label": "Pueblo Nuevo"
    },
    {
      "value": "tepeaca",
      "label": "Tepeaca"
    },
    {
      "value": "zotoltitla",
      "label": "Zotoltitla"
    },
    {
      "value": "desarrollo-urbano",
      "label": "Desarrollo Urbano"
    },
    {
      "value": "jalalpa-el-grande",
      "label": "Jalalpa El Grande"
    },
    {
      "value": "las-aguilas",
      "label": "Las Aguilas"
    },
    {
      "value": "san-angel-inn",
      "label": "San Angel Inn"
    },
    {
      "value": "batallon-de-san-patricio-u-hab",
      "label": "Batallon De San Patricio (U Hab)"
    },
    {
      "value": "belen-de-las-flores-seccion-relleno",
      "label": "Belen De Las Flores Seccion Relleno"
    },
    {
      "value": "bosques-de-tarango",
      "label": "Bosques De Tarango"
    },
    {
      "value": "carola-u-hab",
      "label": "Carola (U Hab)"
    },
    {
      "value": "cristo-rey",
      "label": "Cristo Rey"
    },
    {
      "value": "lomas-de-becerra-u-hab",
      "label": "Lomas De Becerra (U Hab)"
    },
    {
      "value": "lomas-de-san-angel-inn",
      "label": "Lomas De San Angel Inn"
    },
    {
      "value": "lomas-de-tarango",
      "label": "Lomas De Tarango"
    },
    {
      "value": "san-bartolo-ameyalco-pblo",
      "label": "San Bartolo Ameyalco (Pblo)"
    },
    {
      "value": "santa-lucia-reacomodo",
      "label": "Santa Lucia Reacomodo"
    },
    {
      "value": "tlacuitlapa",
      "label": "Tlacuitlapa"
    },
    {
      "value": "torres-san-pedro-u-hab",
      "label": "Torres San Pedro (U Hab)"
    },
    {
      "value": "lomas-de-plateros-u-hab-ii",
      "label": "Lomas De Plateros (U Hab) Ii"
    },
    {
      "value": "olivar-del-conde-1ra-seccion-ii",
      "label": "Olivar Del Conde 1ra Seccion Ii"
    },
    {
      "value": "acueducto",
      "label": "Acueducto"
    },
    {
      "value": "alpes",
      "label": "Alpes"
    },
    {
      "value": "campo-de-tiro-los-gamitos",
      "label": "Campo De Tiro Los Gamitos"
    },
    {
      "value": "cooperativa-cehuayo",
      "label": "Cooperativa Cehuayo"
    },
    {
      "value": "el-arbol",
      "label": "El Arbol"
    },
    {
      "value": "flor-de-maria",
      "label": "Flor De Maria"
    },
    {
      "value": "la-angostura",
      "label": "La Angostura"
    },
    {
      "value": "la-pera-xochinahuac-u-hab",
      "label": "La Pera Xochinahuac (U Hab)"
    },
    {
      "value": "lomas-de-axomiatla",
      "label": "Lomas De Axomiatla"
    },
    {
      "value": "lomas-de-los-angeles-tetelpan",
      "label": "Lomas De Los Angeles Tetelpan"
    },
    {
      "value": "los-cedros",
      "label": "Los Cedros"
    },
    {
      "value": "molino-de-santo-domingo",
      "label": "Molino De Santo Domingo"
    },
    {
      "value": "piloto-adolfo-lopez-mateos-ampl",
      "label": "Piloto (Adolfo Lopez Mateos) (Ampl)"
    },
    {
      "value": "tepeaca-ampl",
      "label": "Tepeaca (Ampl)"
    },
    {
      "value": "tetelpan",
      "label": "Tetelpan"
    },
    {
      "value": "belen-de-las-flores",
      "label": "Belen De Las Flores_"
    },
    {
      "value": "belen-de-las-flores",
      "label": "Belen De Las Flores"
    },
    {
      "value": "el-pocito",
      "label": "El Pocito"
    },
    {
      "value": "galeana",
      "label": "Galeana"
    },
    {
      "value": "la-arana",
      "label": "La Araña"
    },
    {
      "value": "la-huerta",
      "label": "La Huerta"
    },
    {
      "value": "tlapechico",
      "label": "Tlapechico"
    },
    {
      "value": "1ra-victoria-seccion-bosques",
      "label": "1ra Victoria Seccion Bosques"
    },
    {
      "value": "hacienda-de-guadalupe-chimalistac",
      "label": "Hacienda De Guadalupe Chimalistac"
    },
    {
      "value": "alpes-ampl",
      "label": "Alpes (Ampl)"
    },
    {
      "value": "bejero",
      "label": "Bejero"
    },
    {
      "value": "el-paraiso",
      "label": "El Paraiso"
    },
    {
      "value": "francisco-villa",
      "label": "Francisco Villa"
    },
    {
      "value": "gral-c-a-madrazo",
      "label": "Gral C  A  Madrazo"
    },
    {
      "value": "la-mexicana",
      "label": "La Mexicana"
    },
    {
      "value": "lomas-de-centenario-u-hab",
      "label": "Lomas De Centenario (U Hab)"
    },
    {
      "value": "lomas-de-la-era",
      "label": "Lomas De La Era"
    },
    {
      "value": "miguel-hidalgo",
      "label": "Miguel Hidalgo"
    },
    {
      "value": "san-angel",
      "label": "San Angel"
    },
    {
      "value": "la-mexicana-ampl",
      "label": "La Mexicana (Ampl)"
    },
    {
      "value": "ave-real",
      "label": "Ave Real"
    },
    {
      "value": "el-capulin-ampl",
      "label": "El Capulin (Ampl)"
    },
    {
      "value": "heron-proal",
      "label": "Heron Proal"
    },
    {
      "value": "tolteca",
      "label": "Tolteca"
    },
    {
      "value": "union-popular-emiliano-zapata-u-hab",
      "label": "Union Popular Emiliano Zapata (U Hab)"
    },
    {
      "value": "villa-progresista",
      "label": "Villa Progresista"
    },
    {
      "value": "olivar-del-conde-1ra-seccion-i",
      "label": "Olivar Del Conde 1ra Seccion I"
    },
    {
      "value": "corpus-christy-ampl-xocomecatla",
      "label": "Corpus Christy Ampl Xocomecatla"
    },
    {
      "value": "el-rodeo",
      "label": "El Rodeo"
    },
    {
      "value": "guadalupe-inn",
      "label": "Guadalupe Inn"
    },
    {
      "value": "la-canada",
      "label": "La Cañada"
    },
    {
      "value": "milpa-del-cedro",
      "label": "Milpa Del Cedro"
    },
    {
      "value": "progreso-tizapan",
      "label": "Progreso Tizapan"
    },
    {
      "value": "san-clemente",
      "label": "San Clemente"
    },
    {
      "value": "1ra-victoria",
      "label": "1ra Victoria"
    }
  ],
  "azcapotzalco": [
    {
      "value": "cosmopolita",
      "label": "Cosmopolita"
    },
    {
      "value": "del-recreo",
      "label": "Del Recreo"
    },
    {
      "value": "ferreria-u-hab",
      "label": "Ferreria (U Hab)"
    },
    {
      "value": "nextengo-barr",
      "label": "Nextengo (Barr)"
    },
    {
      "value": "nueva-santa-maria",
      "label": "Nueva Santa Maria"
    },
    {
      "value": "santa-apolonia-barr",
      "label": "Santa Apolonia (Barr)"
    },
    {
      "value": "santiago-ahuizotla-pblo",
      "label": "Santiago Ahuizotla (Pblo)"
    },
    {
      "value": "ecologica-novedades-impacto-u-hab",
      "label": "Ecologica Novedades Impacto (U Hab)"
    },
    {
      "value": "petrolera",
      "label": "Petrolera"
    },
    {
      "value": "la-preciosa",
      "label": "La Preciosa"
    },
    {
      "value": "providencia",
      "label": "Providencia"
    },
    {
      "value": "san-miguel-amantla-pblo",
      "label": "San  Miguel Amantla (Pblo)"
    },
    {
      "value": "san-andres-de-las-salinas-pblo",
      "label": "San Andres De Las Salinas (Pblo)"
    },
    {
      "value": "libertad",
      "label": "Libertad"
    },
    {
      "value": "miguel-hidalgo-u-hab",
      "label": "Miguel Hidalgo (U Hab)"
    },
    {
      "value": "prados-del-rosario",
      "label": "Prados Del Rosario"
    },
    {
      "value": "pro-hogar-ii",
      "label": "Pro Hogar Ii"
    },
    {
      "value": "petrolera-ampl",
      "label": "Petrolera (Ampl)"
    },
    {
      "value": "claveria",
      "label": "Claveria"
    },
    {
      "value": "el-rosario-b-u-hab",
      "label": "El Rosario B (U Hab)"
    },
    {
      "value": "euzkadi",
      "label": "Euzkadi"
    },
    {
      "value": "san-bernabe-barr",
      "label": "San Bernabe (Barr)"
    },
    {
      "value": "angel-zimbron",
      "label": "Angel Zimbron"
    },
    {
      "value": "nueva-el-rosario",
      "label": "Nueva El Rosario"
    },
    {
      "value": "san-mateo",
      "label": "San Mateo"
    },
    {
      "value": "santo-domingo-pblo",
      "label": "Santo Domingo (Pblo)"
    },
    {
      "value": "del-maestro",
      "label": "Del Maestro"
    },
    {
      "value": "el-rosario-a-u-hab",
      "label": "El Rosario A (U Hab)"
    },
    {
      "value": "manuel-rivera-anaya-croc-i-u-hab",
      "label": "Manuel Rivera Anaya Croc I (U Hab)"
    },
    {
      "value": "san-alvaro",
      "label": "San Alvaro"
    },
    {
      "value": "san-andres-barr",
      "label": "San Andres (Barr)"
    },
    {
      "value": "san-salvador-xochimanca",
      "label": "San Salvador Xochimanca"
    },
    {
      "value": "santa-cruz-de-las-salinas",
      "label": "Santa Cruz De Las Salinas"
    },
    {
      "value": "cosmopolita-ampl",
      "label": "Cosmopolita (Ampl)"
    },
    {
      "value": "porvenir",
      "label": "Porvenir"
    },
    {
      "value": "coltongo",
      "label": "Coltongo"
    },
    {
      "value": "el-rosario-c-u-hab",
      "label": "El Rosario C (U Hab)"
    },
    {
      "value": "pantaco-u-hab",
      "label": "Pantaco (U Hab)"
    },
    {
      "value": "san-pablo-xalpa-u-hab",
      "label": "San Pablo Xalpa (U Hab)"
    },
    {
      "value": "villas-azcapotzalco-u-hab",
      "label": "Villas Azcapotzalco (U Hab)"
    },
    {
      "value": "obrero-popular",
      "label": "Obrero Popular"
    },
    {
      "value": "tierra-nueva",
      "label": "Tierra Nueva"
    }
  ],
  "benito-juarez": [
    {
      "value": "del-valle-i",
      "label": "Del Valle I"
    },
    {
      "value": "insurgentes-mixcoac",
      "label": "Insurgentes Mixcoac"
    },
    {
      "value": "ocho-de-agosto",
      "label": "Ocho De Agosto"
    },
    {
      "value": "san-juan",
      "label": "San Juan"
    },
    {
      "value": "villa-de-cortes",
      "label": "Villa De Cortes"
    },
    {
      "value": "actipan",
      "label": "Actipan"
    },
    {
      "value": "ermita",
      "label": "Ermita"
    },
    {
      "value": "miguel-aleman",
      "label": "Miguel Aleman"
    },
    {
      "value": "piedad-narvarte",
      "label": "Piedad Narvarte"
    },
    {
      "value": "del-valle-iii",
      "label": "Del Valle Iii"
    },
    {
      "value": "narvarte-iv",
      "label": "Narvarte Iv"
    },
    {
      "value": "periodista-francisco-zarco",
      "label": "Periodista Francisco Zarco"
    },
    {
      "value": "alamos-i",
      "label": "Alamos I"
    },
    {
      "value": "nativitas",
      "label": "Nativitas"
    },
    {
      "value": "extremadura-insurgentes",
      "label": "Extremadura Insurgentes"
    },
    {
      "value": "centro-urbano-presidente-aleman-u-hab",
      "label": "Centro Urbano Presidente Aleman (U Hab)"
    },
    {
      "value": "maria-del-carmen",
      "label": "Maria Del Carmen"
    },
    {
      "value": "san-pedro-de-los-pinos",
      "label": "San Pedro De Los  Pinos"
    },
    {
      "value": "merced-gomez",
      "label": "Merced Gomez"
    },
    {
      "value": "san-simon-ticumac",
      "label": "San Simon Ticumac"
    },
    {
      "value": "vertiz-narvarte",
      "label": "Vertiz Narvarte"
    },
    {
      "value": "del-valle-vii",
      "label": "Del Valle Vii"
    },
    {
      "value": "narvarte-iii",
      "label": "Narvarte Iii"
    },
    {
      "value": "napoles",
      "label": "Napoles"
    },
    {
      "value": "josefa-ortiz-de-dominguez",
      "label": "Josefa Ortiz De Dominguez"
    },
    {
      "value": "portales-oriente",
      "label": "Portales Oriente"
    },
    {
      "value": "residencial-emperadores",
      "label": "Residencial Emperadores"
    },
    {
      "value": "del-valle-vi",
      "label": "Del Valle Vi"
    },
    {
      "value": "narvarte-v",
      "label": "Narvarte V"
    },
    {
      "value": "moderna",
      "label": "Moderna"
    },
    {
      "value": "portales-iii",
      "label": "Portales Iii"
    }
  ],
  "coyoacan": [
    {
      "value": "campestre-coyoacan-fracc",
      "label": "Campestre Coyoacan (Fracc)"
    },
    {
      "value": "ctm-ix-culhuacan-zona-29-30-u-hab",
      "label": "Ctm Ix Culhuacan Zona 29-30 (U Hab)"
    },
    {
      "value": "ctm-viii-culhuacan-u-hab",
      "label": "Ctm Viii Culhuacan (U Hab)"
    },
    {
      "value": "haciendas-de-coyoacan-fracc",
      "label": "Haciendas De Coyoacan (Fracc)"
    },
    {
      "value": "los-girasoles-i",
      "label": "Los Girasoles I"
    },
    {
      "value": "olimpica",
      "label": "Olimpica"
    },
    {
      "value": "romero-de-terreros-fracc",
      "label": "Romero De Terreros (Fracc)"
    },
    {
      "value": "cafetales-iii-rdcial",
      "label": "Cafetales Iii (Rdcial)"
    },
    {
      "value": "canal-nacional-260-u-hab",
      "label": "Canal Nacional 260 (U Hab)"
    },
    {
      "value": "carmen-serdan",
      "label": "Carmen Serdan"
    },
    {
      "value": "espartaco",
      "label": "Espartaco"
    },
    {
      "value": "infonavit-culhuacan-zona-1-u-hab",
      "label": "Infonavit Culhuacan Zona 1 (U Hab)"
    },
    {
      "value": "infonavit-culhuacan-zona-3-u-hab",
      "label": "Infonavit Culhuacan Zona 3 (U Hab)"
    },
    {
      "value": "piloto-culhuacan-u-hab",
      "label": "Piloto Culhuacan (U Hab)"
    },
    {
      "value": "villas-del-pedregal-u-hab",
      "label": "Villas Del Pedregal (U Hab)"
    },
    {
      "value": "el-caracol-bajo",
      "label": "El Caracol Bajo"
    },
    {
      "value": "country-club",
      "label": "Country Club"
    },
    {
      "value": "la-concepcion-barr",
      "label": "La Concepcion (Barr)"
    },
    {
      "value": "prados-de-coyoacan-1",
      "label": "Prados De Coyoacan 1"
    },
    {
      "value": "san-francisco-culhuacan-pblo",
      "label": "San Francisco Culhuacan (Pblo)"
    },
    {
      "value": "villa-panamericana-4ta-seccion-u-hab",
      "label": "Villa Panamericana 4ta. Sección (U Hab)"
    },
    {
      "value": "pedregal-de-sto-domingo-i",
      "label": "Pedregal De Sto Domingo I"
    },
    {
      "value": "pedregal-de-sto-domingo-viii",
      "label": "Pedregal De Sto Domingo Viii"
    },
    {
      "value": "acasulco-universidad",
      "label": "Acasulco Universidad"
    },
    {
      "value": "santa-cecilia-ii",
      "label": "Santa Cecilia Ii"
    },
    {
      "value": "petrolera-taxquena",
      "label": "Petrolera Taxqueña"
    },
    {
      "value": "ampliacion-san-francisco-culhuacan-ej",
      "label": "Ampliacion San Francisco Culhuacan (Ej)"
    },
    {
      "value": "los-sauces-fracc",
      "label": "Los Sauces (Fracc)"
    },
    {
      "value": "pedregal-de-san-angel-ampl",
      "label": "Pedregal De San Angel (Ampl)"
    },
    {
      "value": "villa-panamericana-2da-seccion-u-hab",
      "label": "Villa Panamericana 2da. Sección (U Hab)"
    },
    {
      "value": "xotepingo",
      "label": "Xotepingo"
    },
    {
      "value": "pedregal-de-sto-domingo-vii",
      "label": "Pedregal De Sto Domingo Vii"
    },
    {
      "value": "avante",
      "label": "Avante"
    },
    {
      "value": "las-trojes-coapa-u-hab",
      "label": "Las Trojes Coapa (U Hab)"
    },
    {
      "value": "villa-panamericana-1era-seccion-u-hab",
      "label": "Villa Panamericana 1era. Seccion (U Hab)"
    },
    {
      "value": "alianza-popular-revolucionaria-oriente-u-hab",
      "label": "Alianza Popular Revolucionaria Oriente (U Hab)"
    },
    {
      "value": "ctm-viii-b-culhuacan-zona-25-26-u-hab",
      "label": "Ctm Viii B Culhuacan Zona 25-26 (U Hab)"
    },
    {
      "value": "monte-de-piedad-ii",
      "label": "Monte De Piedad Ii"
    },
    {
      "value": "altillo-cond-altillo-universidad",
      "label": "Altillo (Cond Altillo Universidad)"
    },
    {
      "value": "los-olivos-u-hab",
      "label": "Los Olivos (U Hab)"
    },
    {
      "value": "los-robles-fracc",
      "label": "Los Robles (Fracc)"
    },
    {
      "value": "santa-martha-del-sur",
      "label": "Santa Martha Del Sur"
    },
    {
      "value": "villa-quietud-fracc",
      "label": "Villa Quietud (Fracc)"
    },
    {
      "value": "ajusco-ii",
      "label": "Ajusco Ii"
    },
    {
      "value": "de-la-candelaria-pblo",
      "label": "De La Candelaria (Pblo)"
    },
    {
      "value": "san-diego-churubusco",
      "label": "San Diego Churubusco"
    },
    {
      "value": "san-pablo-tepetlapa-pblo",
      "label": "San Pablo Tepetlapa (Pblo)"
    },
    {
      "value": "cuadrante-de-san-francisco",
      "label": "Cuadrante De San Francisco"
    },
    {
      "value": "del-nino-jesus-barr",
      "label": "Del Niño Jesus (Barr)"
    },
    {
      "value": "pueblo-de-los-reyes-hueytlilac",
      "label": "Pueblo De Los Reyes Hueytlilac"
    },
    {
      "value": "el-caracol",
      "label": "El Caracol"
    },
    {
      "value": "iman-580-u-hab",
      "label": "Iman 580 (U Hab)"
    },
    {
      "value": "las-campanas",
      "label": "Las Campanas"
    },
    {
      "value": "vistas-del-maurel-u-hab",
      "label": "Vistas Del Maurel (U Hab)"
    },
    {
      "value": "paseos-de-taxquena-ii",
      "label": "Paseos De Taxqueña Ii"
    },
    {
      "value": "ampliacion-candelaria",
      "label": "Ampliacion Candelaria"
    },
    {
      "value": "croc-culhuacan-secc-6-u-hab",
      "label": "Croc Culhuacan Secc 6 (U Hab)"
    },
    {
      "value": "los-cipreses",
      "label": "Los Cipreses"
    },
    {
      "value": "cafetales-ii-rdcial",
      "label": "Cafetales Ii (Rdcial)"
    },
    {
      "value": "copilco-el-alto",
      "label": "Copilco El Alto"
    },
    {
      "value": "integracion-latinoamericana-u-hab",
      "label": "Integracion Latinoamericana (U Hab)"
    },
    {
      "value": "la-virgen-1170-u-hab",
      "label": "La Virgen 1170 (U Hab)"
    },
    {
      "value": "paseos-de-taxquena-i",
      "label": "Paseos De Taxqueña I"
    },
    {
      "value": "pedregal-de-sto-domingo-ix",
      "label": "Pedregal De Sto Domingo Ix"
    },
    {
      "value": "presidentes-ejidales-primera-seccion",
      "label": "Presidentes Ejidales Primera Seccion"
    },
    {
      "value": "romero-de-terreros",
      "label": "Romero De Terreros"
    },
    {
      "value": "viejo-ejido-santa-ursula-coapa",
      "label": "Viejo Ejido Santa Ursula Coapa"
    },
    {
      "value": "el-rosedal-ii",
      "label": "El Rosedal Ii"
    }
  ],
  "cuajimalpa": [
    {
      "value": "amado-nervo",
      "label": "Amado Nervo"
    },
    {
      "value": "el-contadero",
      "label": "El Contadero"
    },
    {
      "value": "san-pedro-cuajimalpa-pblo",
      "label": "San Pedro Cuajimalpa (Pblo)"
    },
    {
      "value": "la-venta",
      "label": "La Venta"
    },
    {
      "value": "lomas-de-vista-hermosa",
      "label": "Lomas De Vista Hermosa"
    },
    {
      "value": "puerto-las-cruces",
      "label": "Puerto Las Cruces"
    },
    {
      "value": "san-jose-de-los-cedros-ii",
      "label": "San Jose De Los Cedros Ii"
    },
    {
      "value": "las-lajas",
      "label": "Las Lajas"
    },
    {
      "value": "zentlapatl",
      "label": "Zentlapatl"
    },
    {
      "value": "1o-de-mayo",
      "label": "1o De Mayo"
    },
    {
      "value": "las-tinajas",
      "label": "Las Tinajas"
    },
    {
      "value": "ebano-u-hab",
      "label": "Ebano (U Hab)"
    },
    {
      "value": "el-molino",
      "label": "El Molino"
    },
    {
      "value": "el-yaqui",
      "label": "El Yaqui"
    },
    {
      "value": "la-pila",
      "label": "La Pila"
    },
    {
      "value": "memetla",
      "label": "Memetla"
    },
    {
      "value": "adolfo-lopez-mateos",
      "label": "Adolfo Lopez Mateos"
    },
    {
      "value": "bosques-de-las-lomas",
      "label": "Bosques De Las Lomas"
    },
    {
      "value": "san-pablo-chimalpa-pblo",
      "label": "San Pablo Chimalpa (Pblo)"
    },
    {
      "value": "lomas-del-chamizal",
      "label": "Lomas Del Chamizal"
    },
    {
      "value": "el-molinito",
      "label": "El Molinito"
    },
    {
      "value": "texcalco",
      "label": "Texcalco"
    },
    {
      "value": "palo-alto-granjas",
      "label": "Palo Alto (Granjas)"
    }
  ],
  "cuauhtemoc": [
    {
      "value": "centro-vi",
      "label": "Centro Vi"
    },
    {
      "value": "hipodromo-ii",
      "label": "Hipodromo Ii"
    },
    {
      "value": "santa-maria-la-ribera-ii",
      "label": "Santa Maria La Ribera Ii"
    },
    {
      "value": "peralvillo-ii",
      "label": "Peralvillo Ii"
    },
    {
      "value": "obrera-i",
      "label": "Obrera I"
    },
    {
      "value": "obrera-ii",
      "label": "Obrera Ii"
    },
    {
      "value": "obrera-iv",
      "label": "Obrera Iv"
    },
    {
      "value": "condesa",
      "label": "Condesa"
    },
    {
      "value": "asturias",
      "label": "Asturias"
    },
    {
      "value": "morelos-ii",
      "label": "Morelos Ii"
    },
    {
      "value": "nonoalco-tlatelolco-u-hab-iii",
      "label": "Nonoalco-Tlatelolco (U Hab) Iii"
    },
    {
      "value": "tabacalera",
      "label": "Tabacalera"
    },
    {
      "value": "roma-norte-ii",
      "label": "Roma Norte Ii"
    },
    {
      "value": "santa-maria-u-hab",
      "label": "Santa Maria (U Hab)"
    },
    {
      "value": "algarin",
      "label": "Algarin"
    },
    {
      "value": "juarez",
      "label": "Juarez"
    },
    {
      "value": "vista-alegre",
      "label": "Vista Alegre"
    },
    {
      "value": "doctores-ii",
      "label": "Doctores Ii"
    },
    {
      "value": "hipodromo-i",
      "label": "Hipodromo I"
    },
    {
      "value": "centro-v",
      "label": "Centro V"
    },
    {
      "value": "doctores-iii",
      "label": "Doctores Iii"
    },
    {
      "value": "felipe-pescador",
      "label": "Felipe Pescador"
    },
    {
      "value": "maza",
      "label": "Maza"
    },
    {
      "value": "centro-iii",
      "label": "Centro Iii"
    },
    {
      "value": "guerrero-i",
      "label": "Guerrero I"
    },
    {
      "value": "morelos-i",
      "label": "Morelos I"
    },
    {
      "value": "san-rafael-i",
      "label": "San Rafael I"
    },
    {
      "value": "centro-ii",
      "label": "Centro Ii"
    },
    {
      "value": "centro-viii",
      "label": "Centro Viii"
    }
  ],
  "gustavo-madero": [
    {
      "value": "arroyo-guadalupe-u-hab",
      "label": "Arroyo Guadalupe (U Hab)"
    },
    {
      "value": "camino-a-san-juan-de-aragon-pblo",
      "label": "Camino A San Juan De Aragon (Pblo)"
    },
    {
      "value": "cuautepec-de-madero",
      "label": "Cuautepec De Madero"
    },
    {
      "value": "el-arbolillo-3-u-hab",
      "label": "El Arbolillo 3 (U Hab)"
    },
    {
      "value": "faja-de-oro",
      "label": "Faja De Oro"
    },
    {
      "value": "gertrudis-sanchez-1a-seccion",
      "label": "Gertrudis Sanchez 1a Seccion"
    },
    {
      "value": "guadalupe-proletaria",
      "label": "Guadalupe Proletaria"
    },
    {
      "value": "indeco-u-hab",
      "label": "Indeco (U Hab)"
    },
    {
      "value": "san-juan-de-aragon-3a-seccion-u-hab-i",
      "label": "San Juan De Aragon 3a Seccion (U Hab) I"
    },
    {
      "value": "nueva-atzacoalco-ii",
      "label": "Nueva Atzacoalco Ii"
    },
    {
      "value": "la-esmeralda-ii",
      "label": "La Esmeralda Ii"
    },
    {
      "value": "aragon-inguaran",
      "label": "Aragon Inguaran"
    },
    {
      "value": "capultitlan",
      "label": "Capultitlan"
    },
    {
      "value": "guadalupe-insurgentes",
      "label": "Guadalupe Insurgentes"
    },
    {
      "value": "jaime-s-emiliano-g",
      "label": "Jaime S Emiliano G"
    },
    {
      "value": "la-pradera",
      "label": "La Pradera"
    },
    {
      "value": "la-pradera-i-u-hab",
      "label": "La Pradera I (U Hab)"
    },
    {
      "value": "la-pradera-ii-u-hab",
      "label": "La Pradera Ii (U Hab)"
    },
    {
      "value": "martires-de-rio-blanco-ampl",
      "label": "Martires De Rio Blanco (Ampl)"
    },
    {
      "value": "san-juan-y-guadalupe-ticoman-barr",
      "label": "San Juan Y Guadalupe Ticoman (Barr)"
    },
    {
      "value": "santa-isabel-tola-pblo",
      "label": "Santa Isabel Tola (Pblo)"
    },
    {
      "value": "santa-rosa",
      "label": "Santa Rosa"
    },
    {
      "value": "tablas-de-san-agustin",
      "label": "Tablas De San Agustin"
    },
    {
      "value": "san-juan-de-aragon-3a-seccion-u-hab-ii",
      "label": "San Juan De Aragon 3a Seccion (U Hab) Ii"
    },
    {
      "value": "benito-juarez",
      "label": "Benito Juarez"
    },
    {
      "value": "defensores-de-la-republica",
      "label": "Defensores De La Republica"
    },
    {
      "value": "san-juan-de-aragon-6a-seccion-u-hab-i",
      "label": "San Juan De Aragon 6a Seccion (U Hab) I"
    },
    {
      "value": "san-pedro-zacatenco-pblo",
      "label": "San Pedro Zacatenco (Pblo)"
    },
    {
      "value": "santiago-atepetlac",
      "label": "Santiago Atepetlac"
    },
    {
      "value": "cerro-prieto",
      "label": "Cerro Prieto"
    },
    {
      "value": "la-candelaria-ticoman-barr",
      "label": "La Candelaria Ticoman (Barr)"
    },
    {
      "value": "parque-metropolitano",
      "label": "Parque Metropolitano"
    },
    {
      "value": "san-pedro-el-chico",
      "label": "San Pedro El Chico"
    },
    {
      "value": "tlacaelel",
      "label": "Tlacaelel"
    },
    {
      "value": "valle-de-madero",
      "label": "Valle De Madero"
    },
    {
      "value": "san-juan-de-aragon-6a-seccion-u-hab-ii",
      "label": "San Juan De Aragon 6a Seccion (U Hab) Ii"
    },
    {
      "value": "c-t-m-aragon-u",
      "label": "C T M Aragon (U)"
    },
    {
      "value": "el-coyol-u-hab",
      "label": "El Coyol (U Hab)"
    },
    {
      "value": "santiago-atepetlac-la-selvita-u-hab",
      "label": "Santiago Atepetlac (La Selvita) (U Hab)"
    },
    {
      "value": "santiago-atzacoalco-pblo",
      "label": "Santiago Atzacoalco (Pblo)"
    },
    {
      "value": "zona-escolar-oriente",
      "label": "Zona Escolar Oriente"
    },
    {
      "value": "15-de-agosto",
      "label": "15 De Agosto"
    },
    {
      "value": "lindavista-ii",
      "label": "Lindavista Ii"
    },
    {
      "value": "zona-escolar-i",
      "label": "Zona Escolar I"
    },
    {
      "value": "san-juan-de-aragon-1a-seccion-u-hab-i",
      "label": "San Juan De Aragon 1a Seccion (U Hab) I"
    },
    {
      "value": "la-esmeralda-iii",
      "label": "La Esmeralda Iii"
    },
    {
      "value": "heroe-de-nacozari",
      "label": "Heroe De Nacozari"
    },
    {
      "value": "triunfo-de-la-republica",
      "label": "Triunfo De La Republica"
    },
    {
      "value": "ahuehuetes",
      "label": "Ahuehuetes"
    },
    {
      "value": "ctm-atzacoalco-u-hab",
      "label": "Ctm Atzacoalco (U Hab)"
    },
    {
      "value": "el-arbolillo-1-u-hab",
      "label": "El Arbolillo 1 (U Hab)"
    },
    {
      "value": "guadalupe-victoria-ii",
      "label": "Guadalupe Victoria Ii"
    },
    {
      "value": "juan-gonzalez-romero",
      "label": "Juan Gonzalez Romero"
    },
    {
      "value": "la-forestal-2",
      "label": "La Forestal 2"
    },
    {
      "value": "la-purisima-ticoman-barr",
      "label": "La Purisima Ticoman (Barr)"
    },
    {
      "value": "tlacamaca",
      "label": "Tlacamaca"
    },
    {
      "value": "51-legislatura",
      "label": "51 Legislatura"
    },
    {
      "value": "martin-carrera-i",
      "label": "Martin Carrera I"
    },
    {
      "value": "el-arbolillo-2-u-hab",
      "label": "El Arbolillo 2 (U Hab)"
    },
    {
      "value": "la-forestal",
      "label": "La Forestal"
    },
    {
      "value": "la-patera-condomodulos-u-hab",
      "label": "La Patera-Condomodulos (U Hab)"
    },
    {
      "value": "luis-donaldo-colosio",
      "label": "Luis Donaldo Colosio"
    },
    {
      "value": "panamericana-ampl",
      "label": "Panamericana (Ampl)"
    },
    {
      "value": "veronica-castro",
      "label": "Veronica Castro"
    },
    {
      "value": "casas-aleman-ampl-ii",
      "label": "Casas Aleman (Ampl) Ii"
    },
    {
      "value": "dm-nacional",
      "label": "Dm Nacional"
    },
    {
      "value": "fovissste-cuchilla-u-hab",
      "label": "Fovissste Cuchilla (U Hab)"
    },
    {
      "value": "la-casilda",
      "label": "La Casilda"
    },
    {
      "value": "nueva-tenochtitlan",
      "label": "Nueva Tenochtitlan"
    },
    {
      "value": "panamericana",
      "label": "Panamericana"
    },
    {
      "value": "vallejo-poniente",
      "label": "Vallejo Poniente"
    },
    {
      "value": "progreso-nacional-ii",
      "label": "Progreso Nacional Ii"
    },
    {
      "value": "providencia-ii",
      "label": "Providencia Ii"
    },
    {
      "value": "aragon-la-villa-aragon",
      "label": "Aragon La Villa (Aragon)"
    },
    {
      "value": "cuchilla-la-joya",
      "label": "Cuchilla La Joya"
    },
    {
      "value": "gabriel-hernandez",
      "label": "Gabriel Hernandez"
    },
    {
      "value": "guadalupe-tepeyac",
      "label": "Guadalupe Tepeyac"
    },
    {
      "value": "heroes-de-chapultepec",
      "label": "Heroes De Chapultepec"
    },
    {
      "value": "planetario-lindavista",
      "label": "Planetario Lindavista"
    },
    {
      "value": "progreso-nacional-ampl",
      "label": "Progreso Nacional (Ampl)"
    },
    {
      "value": "tepetatal",
      "label": "Tepetatal"
    },
    {
      "value": "villa-hermosa",
      "label": "Villa Hermosa"
    },
    {
      "value": "la-esmeralda-u-hab",
      "label": "La Esmeralda (U Hab)"
    },
    {
      "value": "residencial-zacatenco",
      "label": "Residencial Zacatenco"
    },
    {
      "value": "san-miguel-cuautepec",
      "label": "San Miguel Cuautepec"
    },
    {
      "value": "cooperativa-luis-enrique-rodriguez-orozco-u-hab",
      "label": "Cooperativa Luis Enrique Rodríguez Orozco (U Hab)"
    },
    {
      "value": "infonavit-loreto-fabela-u-hab",
      "label": "Infonavit Loreto Fabela (U Hab)"
    },
    {
      "value": "la-laguna-ticoman-barr",
      "label": "La Laguna Ticoman (Barr)"
    },
    {
      "value": "maximino-avila-camacho",
      "label": "Maximino Avila Camacho"
    },
    {
      "value": "san-jose-de-la-escalera",
      "label": "San Jose De La Escalera"
    },
    {
      "value": "san-rafael-ticoman-barr",
      "label": "San Rafael Ticoman (Barr)"
    },
    {
      "value": "sct-u-hab",
      "label": "Sct (U Hab)"
    },
    {
      "value": "vista-hermosa",
      "label": "Vista Hermosa"
    },
    {
      "value": "progreso-nacional-i",
      "label": "Progreso Nacional I"
    },
    {
      "value": "belisario-dominguez",
      "label": "Belisario Dominguez"
    },
    {
      "value": "c-t-m-aragon-ampliacion-u",
      "label": "C T M Aragon Ampliacion (U)"
    },
    {
      "value": "del-bosque",
      "label": "Del Bosque"
    },
    {
      "value": "el-arbolillo",
      "label": "El Arbolillo"
    },
    {
      "value": "emiliano-zapata",
      "label": "Emiliano Zapata"
    },
    {
      "value": "emiliano-zapata-ampl",
      "label": "Emiliano Zapata (Ampl)"
    },
    {
      "value": "fernando-casas-aleman",
      "label": "Fernando Casas Aleman"
    },
    {
      "value": "juan-de-dios-batiz-u-hab",
      "label": "Juan De Dios Batiz (U Hab)"
    },
    {
      "value": "malacates",
      "label": "Malacates"
    },
    {
      "value": "25-de-julio",
      "label": "25 De Julio"
    }
  ],
  "iztacalco": [
    {
      "value": "nueva-sta-anita",
      "label": "Nueva Sta Anita"
    },
    {
      "value": "agricola-oriental-vii",
      "label": "Agricola Oriental Vii"
    },
    {
      "value": "ramos-millan-bramadero-i",
      "label": "Ramos Millan Bramadero I"
    },
    {
      "value": "el-rodeo",
      "label": "El Rodeo"
    },
    {
      "value": "agricola-oriental-iii",
      "label": "Agricola Oriental Iii"
    },
    {
      "value": "infonavit-iztacalco-u-hab-i",
      "label": "Infonavit Iztacalco (U Hab) I"
    },
    {
      "value": "reforma-iztaccihuatl-norte",
      "label": "Reforma Iztaccihuatl Norte"
    },
    {
      "value": "agricola-oriental-ii",
      "label": "Agricola Oriental Ii"
    },
    {
      "value": "infonavit-iztacalco-u-hab-ii",
      "label": "Infonavit Iztacalco (U Hab) Ii"
    },
    {
      "value": "gabriel-ramos-millan",
      "label": "Gabriel Ramos Millan"
    },
    {
      "value": "san-miguel-barr",
      "label": "San Miguel (Barr)"
    },
    {
      "value": "infonavit-iztacalco-u-hab-zona-del-lago",
      "label": "Infonavit Iztacalco (U Hab) Zona Del Lago"
    },
    {
      "value": "ampliacion-ramos-millan",
      "label": "Ampliacion Ramos Millan"
    },
    {
      "value": "ex-ejidos-de-la-magdalena-mixihuca",
      "label": "Ex Ejidos De La Magdalena Mixihuca"
    },
    {
      "value": "agricola-oriental-v",
      "label": "Agricola Oriental V"
    },
    {
      "value": "agricola-oriental-viii",
      "label": "Agricola Oriental Viii"
    },
    {
      "value": "granjas-mexico-ii",
      "label": "Granjas Mexico Ii"
    },
    {
      "value": "juventino-rosas-ii",
      "label": "Juventino Rosas Ii"
    },
    {
      "value": "viaducto-piedad",
      "label": "Viaducto Piedad"
    },
    {
      "value": "picos-iztacalco-1b",
      "label": "Picos Iztacalco 1b"
    },
    {
      "value": "san-fco-xicaltongo-barr",
      "label": "San Fco Xicaltongo (Barr)"
    },
    {
      "value": "granjas-mexico-i",
      "label": "Granjas Mexico I"
    },
    {
      "value": "san-pedro-iztacalco-barr",
      "label": "San Pedro Iztacalco (Barr)"
    },
    {
      "value": "pantitlan-ii",
      "label": "Pantitlan Ii"
    },
    {
      "value": "pantitlan-iv",
      "label": "Pantitlan Iv"
    },
    {
      "value": "pantitlan-v",
      "label": "Pantitlan V"
    },
    {
      "value": "cuchilla-agricola-oriental",
      "label": "Cuchilla Agricola Oriental"
    },
    {
      "value": "los-reyes-barr",
      "label": "Los Reyes (Barr)"
    }
  ],
  "iztapalapa": [
    {
      "value": "art-4to-constitucional-u-hab",
      "label": "Art 4to Constitucional (U Hab)"
    },
    {
      "value": "cuitlahuac-u-hab",
      "label": "Cuitlahuac (U Hab)"
    },
    {
      "value": "la-nueva-rosita",
      "label": "La Nueva Rosita"
    },
    {
      "value": "leyes-de-reforma-2a-seccion",
      "label": "Leyes De Reforma 2a Seccion"
    },
    {
      "value": "mixcoatl",
      "label": "Mixcoatl"
    },
    {
      "value": "parajes-buenavista-tetecon",
      "label": "Parajes Buenavista (Tetecon)"
    },
    {
      "value": "progresista",
      "label": "Progresista"
    },
    {
      "value": "valle-de-luces-ii",
      "label": "Valle De Luces Ii"
    },
    {
      "value": "vicente-guerrero-super-manzana-2-u-hab",
      "label": "Vicente Guerrero Super Manzana 2 (U Hab)"
    },
    {
      "value": "xopa-u-hab",
      "label": "Xopa (U Hab)"
    },
    {
      "value": "9-12---francisco-villa-ejercito-constitucionalista-conj-hab",
      "label": "9 1/2 - Francisco Villa (Ejercito Constitucionalista) (Conj Hab)"
    },
    {
      "value": "ermita-zaragoza-u-hab-ii",
      "label": "Ermita Zaragoza (U Hab) Ii"
    },
    {
      "value": "cabeza-de-juarez-i-u-hab",
      "label": "Cabeza De Juarez I (U Hab)"
    },
    {
      "value": "norma-issste-u-hab",
      "label": "Norma Issste (U Hab)"
    },
    {
      "value": "penon-viejo-u-hab",
      "label": "Peñon Viejo (U Hab)"
    },
    {
      "value": "progreso-del-sur",
      "label": "Progreso Del Sur"
    },
    {
      "value": "sinatel",
      "label": "Sinatel"
    },
    {
      "value": "chinampas-de-santa-ma-tomatlan",
      "label": "Chinampas De Santa Ma Tomatlan"
    },
    {
      "value": "cuchillas-del-moral-u-hab",
      "label": "Cuchillas Del Moral (U Hab)"
    },
    {
      "value": "san-juan-2a-ampliacion-pje",
      "label": "San Juan 2a Ampliación (Pje)"
    },
    {
      "value": "san-lorenzo-tezonco-pblo",
      "label": "San Lorenzo Tezonco (Pblo)"
    },
    {
      "value": "reforma-politica-ii",
      "label": "Reforma Politica Ii"
    },
    {
      "value": "ejto-constitucionalista-ii-u-hab",
      "label": "Ejto Constitucionalista Ii (U Hab)"
    },
    {
      "value": "guelatao-de-juarez-ii-u-hab",
      "label": "Guelatao De Juarez Ii (U Hab)"
    },
    {
      "value": "jardines-de-san-lorenzo",
      "label": "Jardines De San Lorenzo"
    },
    {
      "value": "la-planta",
      "label": "La Planta"
    },
    {
      "value": "paraiso-ampl",
      "label": "Paraiso (Ampl)"
    },
    {
      "value": "plenitud-u-hab",
      "label": "Plenitud (U Hab)"
    },
    {
      "value": "santa-cruz-vi-u-hab",
      "label": "Santa Cruz Vi (U Hab)"
    },
    {
      "value": "santa-maria-tomatlan-pblo",
      "label": "Santa Maria Tomatlan (Pblo)"
    },
    {
      "value": "vicente-guerrero-super-manzana-4-u-hab",
      "label": "Vicente Guerrero Super Manzana 4 (U Hab)"
    },
    {
      "value": "tenorios-ampl",
      "label": "Tenorios (Ampl)"
    },
    {
      "value": "chinampac-de-juarez-iii",
      "label": "Chinampac De Juarez Iii"
    },
    {
      "value": "benito-juarez",
      "label": "Benito Juarez"
    },
    {
      "value": "carmen-serdan-u-hab",
      "label": "Carmen Serdan (U Hab)"
    },
    {
      "value": "el-vergel-triangulo-de-las-agujas-i-u-hab",
      "label": "El Vergel Triangulo De Las Agujas I (U Hab)"
    },
    {
      "value": "el-vergel-triangulo-de-las-agujas-ii-u-hab",
      "label": "El Vergel Triangulo De Las Agujas Ii (U Hab)"
    },
    {
      "value": "fuerte-de-loreto---la-antena-u-hab",
      "label": "Fuerte De Loreto - La Antena (U Hab)"
    },
    {
      "value": "la-polvorilla",
      "label": "La Polvorilla"
    },
    {
      "value": "miguel-de-la-madrid-hurtado",
      "label": "Miguel De La Madrid Hurtado"
    },
    {
      "value": "paraje-san-juan",
      "label": "Paraje San Juan"
    },
    {
      "value": "san-lorenzo-xicotencatl-pblo",
      "label": "San Lorenzo Xicotencatl (Pblo)"
    },
    {
      "value": "lomas-de-la-estancia-ii",
      "label": "Lomas De La Estancia Ii"
    },
    {
      "value": "carlos-pacheco-u-hab",
      "label": "Carlos Pacheco (U Hab)"
    },
    {
      "value": "ejto-de-ote-ii-u-hab",
      "label": "Ejto De Ote Ii (U Hab)"
    },
    {
      "value": "san-pablo-barr",
      "label": "San Pablo (Barr)"
    },
    {
      "value": "santa-barbara-barr-i",
      "label": "Santa Barbara (Barr) I"
    },
    {
      "value": "solidaridad-el-salado-u-hab",
      "label": "Solidaridad El Salado (U Hab)"
    },
    {
      "value": "valle-de-luces-i",
      "label": "Valle De Luces I"
    },
    {
      "value": "vicente-guerrero-super-manzana-5-u-hab",
      "label": "Vicente Guerrero Super Manzana 5 (U Hab)"
    },
    {
      "value": "12-de-diciembre",
      "label": "12 De Diciembre"
    },
    {
      "value": "valle-de-san-lorenzo-ii",
      "label": "Valle De San Lorenzo Ii"
    },
    {
      "value": "el-prado",
      "label": "El Prado"
    },
    {
      "value": "francisco-villa",
      "label": "Francisco Villa"
    },
    {
      "value": "la-polvorilla-ampl",
      "label": "La Polvorilla (Ampl)"
    },
    {
      "value": "la-regadera",
      "label": "La Regadera"
    },
    {
      "value": "san-francisco-apolocalco",
      "label": "San Francisco Apolocalco"
    },
    {
      "value": "san-lorenzo-tezonco-ii-u-hab",
      "label": "San Lorenzo Tezonco Ii (U Hab)"
    },
    {
      "value": "veracruzana-ampl",
      "label": "Veracruzana (Ampl)"
    },
    {
      "value": "chinampac-de-juarez-ii",
      "label": "Chinampac De Juarez Ii"
    },
    {
      "value": "jose-lopez-portillo-ii",
      "label": "Jose Lopez Portillo Ii"
    },
    {
      "value": "predio-santa-cruz-meyehualco",
      "label": "Predio Santa Cruz Meyehualco"
    },
    {
      "value": "el-triangulo",
      "label": "El Triangulo"
    },
    {
      "value": "huitzico-la-poblanita",
      "label": "Huitzico-La Poblanita"
    },
    {
      "value": "san-juanico-nextipac-pblo",
      "label": "San Juanico Nextipac (Pblo)"
    },
    {
      "value": "santa-maria-tomatlan",
      "label": "Santa Maria Tomatlan"
    },
    {
      "value": "uscovi-u-hab",
      "label": "Uscovi (U Hab)"
    },
    {
      "value": "valle-del-sur",
      "label": "Valle Del Sur"
    },
    {
      "value": "vicente-guerrero-super-manzana-7-u-hab",
      "label": "Vicente Guerrero Super Manzana 7 (U Hab)"
    },
    {
      "value": "cerro-de-la-estrella-ii",
      "label": "Cerro De La Estrella Ii"
    },
    {
      "value": "ermita-zaragoza-u-hab-i",
      "label": "Ermita Zaragoza (U Hab) I"
    },
    {
      "value": "juan-escutia-i",
      "label": "Juan Escutia I"
    },
    {
      "value": "degollado-chico",
      "label": "Degollado Chico"
    },
    {
      "value": "el-santuario",
      "label": "El Santuario"
    },
    {
      "value": "santa-cruz-vii-u-hab",
      "label": "Santa Cruz Vii (U Hab)"
    },
    {
      "value": "santa-maria-del-monte",
      "label": "Santa Maria Del Monte"
    },
    {
      "value": "santa-maria-tomatlan-ampl",
      "label": "Santa Maria Tomatlan (Ampl)"
    },
    {
      "value": "desarrollo-urbano-quetzalcoatl-i",
      "label": "Desarrollo Urbano Quetzalcoatl  I"
    },
    {
      "value": "cabeza-de-juarez-ii-u-hab",
      "label": "Cabeza De Juarez Ii (U Hab)"
    },
    {
      "value": "el-sifon",
      "label": "El Sifon"
    },
    {
      "value": "fuego-nuevo",
      "label": "Fuego Nuevo"
    },
    {
      "value": "gama-gavilan-u-hab",
      "label": "Gama Gavilan (U Hab)"
    },
    {
      "value": "mirasoles-u-hab",
      "label": "Mirasoles (U Hab)"
    },
    {
      "value": "purisima-i",
      "label": "Purisima I"
    },
    {
      "value": "rinconada-el-molino",
      "label": "Rinconada El Molino"
    },
    {
      "value": "san-juan-cerro-pje",
      "label": "San Juan Cerro (Pje)"
    },
    {
      "value": "san-lucas-barr",
      "label": "San Lucas (Barr)"
    },
    {
      "value": "san-nicolas-tolentino-i",
      "label": "San Nicolas Tolentino I"
    },
    {
      "value": "sideral",
      "label": "Sideral"
    },
    {
      "value": "santa-maria-aztahuacan-u-hab",
      "label": "Santa Maria Aztahuacan (U Hab)"
    },
    {
      "value": "ce-cualli-ohtli-u-hab",
      "label": "Ce Cualli Ohtli (U Hab)"
    },
    {
      "value": "citlalli",
      "label": "Citlalli"
    },
    {
      "value": "el-molino",
      "label": "El Molino"
    },
    {
      "value": "escuadron-201",
      "label": "Escuadron 201"
    },
    {
      "value": "estrella-culhuacan",
      "label": "Estrella Culhuacan"
    },
    {
      "value": "granjas-san-antonio",
      "label": "Granjas San Antonio"
    },
    {
      "value": "ixtlahuacan",
      "label": "Ixtlahuacan"
    },
    {
      "value": "los-angeles-apanoaya",
      "label": "Los Angeles Apanoaya"
    },
    {
      "value": "paseos-de-churubusco",
      "label": "Paseos De Churubusco"
    },
    {
      "value": "ricardo-flores-magon-ampl",
      "label": "Ricardo Flores Magon (Ampl)"
    },
    {
      "value": "cerro-de-la-estrella-i",
      "label": "Cerro De La Estrella I"
    },
    {
      "value": "consejo-agrarista-mexicano-i",
      "label": "Consejo Agrarista Mexicano I"
    },
    {
      "value": "santa-maria-aztahuacan-ej-i",
      "label": "Santa Maria Aztahuacan (Ej) I"
    },
    {
      "value": "tepalcates-i",
      "label": "Tepalcates I"
    },
    {
      "value": "ano-de-juarez",
      "label": "Año De Juarez"
    },
    {
      "value": "apatlaco",
      "label": "Apatlaco"
    },
    {
      "value": "estrella-del-sur",
      "label": "Estrella Del Sur"
    },
    {
      "value": "las-penas-i",
      "label": "Las Peñas I"
    },
    {
      "value": "puente-blanco",
      "label": "Puente Blanco"
    },
    {
      "value": "san-jose-aculco",
      "label": "San Jose Aculco"
    },
    {
      "value": "constitucion-de-1917-i",
      "label": "Constitucion De 1917 I"
    },
    {
      "value": "concordia-zaragoza-u-hab",
      "label": "Concordia Zaragoza (U Hab)"
    },
    {
      "value": "el-triunfo",
      "label": "El Triunfo"
    },
    {
      "value": "ignacio-zaragoza-u-hab",
      "label": "Ignacio Zaragoza (U Hab)"
    },
    {
      "value": "justo-sierra",
      "label": "Justo Sierra"
    }
  ],
  "magdalena-contreras": [
    {
      "value": "las-calles-barr",
      "label": "Las Calles (Barr)"
    },
    {
      "value": "las-huertas",
      "label": "Las Huertas"
    },
    {
      "value": "san-bartolo-ameyalco",
      "label": "San Bartolo Ameyalco"
    },
    {
      "value": "ixtlahualtongo",
      "label": "Ixtlahualtongo"
    },
    {
      "value": "puente-sierra",
      "label": "Puente Sierra"
    },
    {
      "value": "san-francisco",
      "label": "San Francisco"
    },
    {
      "value": "la-concepcion",
      "label": "La Concepcion"
    },
    {
      "value": "cuauhtemoc",
      "label": "Cuauhtemoc"
    },
    {
      "value": "barros-sierra",
      "label": "Barros Sierra"
    },
    {
      "value": "el-ermitano",
      "label": "El Ermitaño"
    },
    {
      "value": "batan-viejo-el-maestro",
      "label": "Batan Viejo (El Maestro)"
    },
    {
      "value": "san-nicolas-totolapan-pblo",
      "label": "San Nicolas Totolapan (Pblo)"
    },
    {
      "value": "santa-teresa",
      "label": "Santa Teresa"
    },
    {
      "value": "san-bernabe-ocotepec-pblo",
      "label": "San Bernabe Ocotepec (Pblo)"
    },
    {
      "value": "vista-hermosa",
      "label": "Vista Hermosa"
    },
    {
      "value": "infonavit-u-hab",
      "label": "Infonavit (U Hab)"
    },
    {
      "value": "los-padres",
      "label": "Los Padres"
    },
    {
      "value": "tierra-colorada",
      "label": "Tierra Colorada"
    }
  ],
  "miguel-hidalgo": [
    {
      "value": "del-bosque-polanco",
      "label": "Del Bosque (Polanco)"
    },
    {
      "value": "irrigacion",
      "label": "Irrigacion"
    },
    {
      "value": "periodista",
      "label": "Periodista"
    },
    {
      "value": "pensil-san-juanico",
      "label": "Pensil San Juanico"
    },
    {
      "value": "reforma-social",
      "label": "Reforma Social"
    },
    {
      "value": "lomas-altas",
      "label": "Lomas Altas"
    },
    {
      "value": "lomas-de-reforma",
      "label": "Lomas De Reforma"
    },
    {
      "value": "morales-seccion-alameda-polanco",
      "label": "Morales Seccion Alameda (Polanco)"
    },
    {
      "value": "san-lorenzo-tlaltenango",
      "label": "San Lorenzo Tlaltenango"
    },
    {
      "value": "popotla-ii",
      "label": "Popotla Ii"
    },
    {
      "value": "agricultura",
      "label": "Agricultura"
    },
    {
      "value": "anahuac-peralitos",
      "label": "Anahuac Peralitos"
    },
    {
      "value": "deportiva-pensil",
      "label": "Deportiva Pensil"
    },
    {
      "value": "loma-hermosa-conj-hab",
      "label": "Loma Hermosa (Conj Hab)"
    },
    {
      "value": "lomas-de-chapultepec-iii",
      "label": "Lomas De Chapultepec Iii"
    },
    {
      "value": "escandon-iii",
      "label": "Escandon Iii"
    },
    {
      "value": "torres-toreo",
      "label": "Torres Toreo"
    },
    {
      "value": "granada",
      "label": "Granada"
    },
    {
      "value": "lomas-de-chapultepec-i",
      "label": "Lomas De Chapultepec I"
    },
    {
      "value": "un-hogar-para-nosotros",
      "label": "Un Hogar Para Nosotros"
    },
    {
      "value": "anahuac-mariano-escobedo",
      "label": "Anahuac Mariano Escobedo"
    },
    {
      "value": "marina-nacional-u-hab",
      "label": "Marina Nacional (U Hab)"
    },
    {
      "value": "torre-blanca",
      "label": "Torre Blanca"
    },
    {
      "value": "lomas-de-barrilaco-lomas-de-chapultepec",
      "label": "Lomas De Barrilaco (Lomas De Chapultepec)"
    },
    {
      "value": "modelo-pensil",
      "label": "Modelo Pensil"
    },
    {
      "value": "reforma-pensil",
      "label": "Reforma Pensil"
    },
    {
      "value": "rincon-del-bosque",
      "label": "Rincon Del Bosque"
    },
    {
      "value": "tlaxpana",
      "label": "Tlaxpana"
    },
    {
      "value": "escandon-i",
      "label": "Escandon I"
    },
    {
      "value": "anzures",
      "label": "Anzures"
    },
    {
      "value": "cuauhtemoc-pensil",
      "label": "Cuauhtemoc Pensil"
    },
    {
      "value": "ignacio-manuel-altamirano",
      "label": "Ignacio Manuel Altamirano"
    },
    {
      "value": "polanco-reforma-polanco",
      "label": "Polanco Reforma (Polanco)"
    },
    {
      "value": "popo-ampl",
      "label": "Popo (Ampl)"
    },
    {
      "value": "santo-tomas",
      "label": "Santo Tomas"
    },
    {
      "value": "anahuac-dos-lagos",
      "label": "Anahuac Dos Lagos"
    },
    {
      "value": "argentina-antigua",
      "label": "Argentina Antigua"
    },
    {
      "value": "lomas-de-bezares-i",
      "label": "Lomas De Bezares I"
    },
    {
      "value": "lomas-de-sotelo",
      "label": "Lomas De Sotelo"
    },
    {
      "value": "popo",
      "label": "Popo"
    },
    {
      "value": "anahuac-ii",
      "label": "Anahuac Ii"
    },
    {
      "value": "molino-del-rey",
      "label": "Molino Del Rey"
    },
    {
      "value": "nueva-argentina-argentina-poniente",
      "label": "Nueva Argentina (Argentina Poniente)"
    },
    {
      "value": "angel-zimbron",
      "label": "Angel Zimbron"
    },
    {
      "value": "pensil-norte",
      "label": "Pensil Norte"
    },
    {
      "value": "16-de-septiembre",
      "label": "16 De Septiembre"
    }
  ],
  "milpa-alta": [
    {
      "value": "san-antonio-tecomitl-pblo",
      "label": "San Antonio Tecomitl (Pblo)"
    },
    {
      "value": "san-lorenzo-tlacoyucan-pblo",
      "label": "San Lorenzo Tlacoyucan (Pblo)"
    },
    {
      "value": "san-salvador-cuauhtenco-pblo",
      "label": "San Salvador Cuauhtenco (Pblo)"
    },
    {
      "value": "san-pablo-oztotepec-pblo",
      "label": "San Pablo Oztotepec (Pblo)"
    }
  ],
  "tlahuac": [
    {
      "value": "la-joyita",
      "label": "La Joyita"
    },
    {
      "value": "villa-centroamericana-u-hab",
      "label": "Villa Centroamericana (U Hab)"
    },
    {
      "value": "atotolco",
      "label": "Atotolco"
    },
    {
      "value": "el-rosario",
      "label": "El Rosario"
    },
    {
      "value": "selene-1a-secc",
      "label": "Selene 1a Secc"
    },
    {
      "value": "tepantitlamilco",
      "label": "Tepantitlamilco"
    },
    {
      "value": "unidades-habitacionales-de-santa-ana-poniente-ii",
      "label": "Unidades Habitacionales De Santa Ana Poniente Ii"
    },
    {
      "value": "san-andres-mixquic-pblo",
      "label": "San Andres Mixquic (Pblo)"
    },
    {
      "value": "la-habana",
      "label": "La Habana"
    },
    {
      "value": "paraiso-santa-catarina",
      "label": "Paraiso Santa Catarina"
    },
    {
      "value": "tierra-blanca",
      "label": "Tierra Blanca"
    },
    {
      "value": "francisco-villa",
      "label": "Francisco Villa"
    },
    {
      "value": "jardines-del-llano-uh-villa-tlatempa",
      "label": "Jardines Del Llano-U.H. Villa Tlatempa"
    },
    {
      "value": "santa-catarina-ampl",
      "label": "Santa Catarina (Ampl)"
    },
    {
      "value": "teozoma",
      "label": "Teozoma"
    },
    {
      "value": "la-conchita-i",
      "label": "La Conchita I"
    },
    {
      "value": "jaime-torres-bodet",
      "label": "Jaime Torres Bodet"
    },
    {
      "value": "selene-ampl",
      "label": "Selene (Ampl)"
    },
    {
      "value": "emiliano-zapata-1a",
      "label": "Emiliano Zapata 1a"
    },
    {
      "value": "la-turba",
      "label": "La Turba"
    },
    {
      "value": "pena-alta",
      "label": "Peña Alta"
    },
    {
      "value": "san-miguel-ampl",
      "label": "San Miguel (Ampl)"
    },
    {
      "value": "el-mirador---santa-catarina",
      "label": "El Mirador - Santa Catarina"
    },
    {
      "value": "la-draga",
      "label": "La Draga"
    },
    {
      "value": "cuitlahuac",
      "label": "Cuitlahuac"
    }
  ],
  "tlalpan": [
    {
      "value": "los-pastores",
      "label": "Los Pastores"
    },
    {
      "value": "narciso-mendoza-villa-coapa-super-manzana-2-u-hab",
      "label": "Narciso Mendoza-Villa Coapa Super Manzana 2 (U Hab)"
    },
    {
      "value": "san-lorenzo-huipulco",
      "label": "San Lorenzo Huipulco"
    },
    {
      "value": "santo-tomas-ajusco-pblo",
      "label": "Santo Tomas Ajusco (Pblo)"
    },
    {
      "value": "valle-escondido",
      "label": "Valle Escondido"
    },
    {
      "value": "xaxalco",
      "label": "Xaxalco"
    },
    {
      "value": "fuentes-brotantes-miguel-hidalgo-u-hab",
      "label": "Fuentes Brotantes Miguel Hidalgo (U Hab)"
    },
    {
      "value": "lomas-del-pedregal",
      "label": "Lomas Del Pedregal"
    },
    {
      "value": "mirador-del-valle",
      "label": "Mirador Del Valle"
    },
    {
      "value": "oriente-ampl",
      "label": "Oriente (Ampl)"
    },
    {
      "value": "popular-sta-teresa",
      "label": "Popular Sta Teresa"
    },
    {
      "value": "seccion-xvi",
      "label": "Seccion Xvi"
    },
    {
      "value": "villa-olimpica-liberador-miguel-hidalgo-u-hab",
      "label": "Villa Olimpica Liberador Miguel Hidalgo (U Hab)"
    },
    {
      "value": "ejidos-de-san-pedro-martir-ii-sur",
      "label": "Ejidos De San Pedro Martir Ii (Sur)"
    },
    {
      "value": "la-venta-ampliacion-la-venta",
      "label": "La Venta-Ampliacion La Venta"
    },
    {
      "value": "la-joya",
      "label": "La Joya"
    },
    {
      "value": "nueva-oriental-coapa-ex-hacienda-coapa",
      "label": "Nueva Oriental Coapa-Ex Hacienda Coapa"
    },
    {
      "value": "chichicaspatl",
      "label": "Chichicaspatl"
    },
    {
      "value": "chimalcoyoc",
      "label": "Chimalcoyoc"
    },
    {
      "value": "granjas-coapa-oriente",
      "label": "Granjas Coapa Oriente"
    },
    {
      "value": "juventud-unida",
      "label": "Juventud Unida"
    },
    {
      "value": "san-miguel-toxiac",
      "label": "San Miguel Toxiac"
    },
    {
      "value": "belvedere",
      "label": "Belvedere"
    },
    {
      "value": "unidades-habitacionales-de-tenorios",
      "label": "Unidades Habitacionales De Tenorios"
    },
    {
      "value": "fuentes-del-pedregal",
      "label": "Fuentes Del Pedregal"
    },
    {
      "value": "rancho-los-colorines-fracc",
      "label": "Rancho Los Colorines (Fracc)"
    },
    {
      "value": "rinconada-u-hab",
      "label": "Rinconada (U Hab)"
    },
    {
      "value": "san-miguel-xicalco-pblo",
      "label": "San Miguel  Xicalco (Pblo)"
    },
    {
      "value": "santisima-trinidad",
      "label": "Santisima Trinidad"
    },
    {
      "value": "el-divisadero",
      "label": "El Divisadero"
    },
    {
      "value": "el-zacaton",
      "label": "El Zacaton"
    },
    {
      "value": "heroes-de-1910",
      "label": "Heroes De 1910"
    },
    {
      "value": "coapa-villa-cuemanco",
      "label": "Coapa-Villa Cuemanco"
    },
    {
      "value": "san-miguel-tehuisco-los-angeles-ayometitla",
      "label": "San Miguel Tehuisco-Los Angeles-Ayometitla"
    },
    {
      "value": "san-pedro-apostol-barr",
      "label": "San Pedro Apostol (Barr)"
    },
    {
      "value": "tecorral",
      "label": "Tecorral"
    },
    {
      "value": "villa-lazaro-cardenas",
      "label": "Villa Lazaro Cardenas"
    },
    {
      "value": "pedregal-de-sn-nicolas-4a-secc-ii",
      "label": "Pedregal De Sn Nicolas 4a Secc Ii"
    },
    {
      "value": "narciso-mendoza-villa-coapa-supermanzana-8-u-hab",
      "label": "Narciso Mendoza Villa Coapa Supermanzana 8 (U Hab)"
    },
    {
      "value": "jardines-en-la-montana",
      "label": "Jardines En La Montaña"
    },
    {
      "value": "mirador-i",
      "label": "Mirador I"
    },
    {
      "value": "narciso-mendoza-villa-coapa-super-manzana-7-u-hab",
      "label": "Narciso Mendoza-Villa Coapa Super Manzana 7 (U Hab)"
    },
    {
      "value": "nino-jesus-barr",
      "label": "Niño Jesus (Barr)"
    },
    {
      "value": "san-bartolo-el-chico",
      "label": "San Bartolo El Chico"
    },
    {
      "value": "cantera-puente-de-piedra",
      "label": "Cantera Puente De Piedra"
    },
    {
      "value": "hacienda-san-juan-rincon-de-san-juan",
      "label": "Hacienda San Juan-Rincon De San Juan"
    },
    {
      "value": "san-miguel-topilejo-pblo",
      "label": "San Miguel Topilejo (Pblo)"
    },
    {
      "value": "tezontitla",
      "label": "Tezontitla"
    },
    {
      "value": "lomas-altas-de-padierna-sur",
      "label": "Lomas Altas De Padierna Sur"
    },
    {
      "value": "villa-del-puente-fovissste-u-hab",
      "label": "Villa Del Puente Fovissste  (U Hab)"
    },
    {
      "value": "ahuacatitla",
      "label": "Ahuacatitla"
    },
    {
      "value": "isidro-fabela-ampl",
      "label": "Isidro  Fabela (Ampl)"
    },
    {
      "value": "jardines-coapa-belisario-dominguez",
      "label": "Jardines Coapa-Belisario Dominguez"
    },
    {
      "value": "lomas-de-texcalatlaco",
      "label": "Lomas De Texcalatlaco"
    },
    {
      "value": "mirador-ii",
      "label": "Mirador Ii"
    },
    {
      "value": "parques-del-pedregal",
      "label": "Parques Del Pedregal"
    },
    {
      "value": "pedregal-de-sta-ursula-xitla",
      "label": "Pedregal De Sta Ursula Xitla"
    },
    {
      "value": "piedra-larga",
      "label": "Piedra Larga"
    },
    {
      "value": "progreso-tlalpan",
      "label": "Progreso Tlalpan"
    },
    {
      "value": "torres-de-padierna",
      "label": "Torres De Padierna"
    },
    {
      "value": "zacatienda",
      "label": "Zacatienda"
    },
    {
      "value": "zapote-luis-donaldo-colosio-u-habs",
      "label": "Zapote-Luis Donaldo Colosio (U Habs)"
    },
    {
      "value": "la-magdalena-petlacalco-pblo",
      "label": "La Magdalena Petlacalco (Pblo)"
    },
    {
      "value": "mirador-1a-secc",
      "label": "Mirador 1a Secc"
    },
    {
      "value": "residencial-fuentes-de-cantera-u-hab",
      "label": "Residencial Fuentes De Cantera (U Hab)"
    },
    {
      "value": "arboledas-del-sur",
      "label": "Arboledas Del Sur"
    },
    {
      "value": "ayocatitla",
      "label": "Ayocatitla"
    },
    {
      "value": "lomas-hidalgo",
      "label": "Lomas Hidalgo"
    },
    {
      "value": "el-mirador-2a-y-3a-secc",
      "label": "El Mirador 2a Y 3a Secc"
    },
    {
      "value": "movimiento-organizado-de-tlalpan-el-mirador-rncda",
      "label": "Movimiento Organizado De Tlalpan-El Mirador (Rncda)"
    },
    {
      "value": "narciso-mendoza-villa-coapa-super-manzana-3-u-hab",
      "label": "Narciso Mendoza-Villa Coapa Super Manzana 3 (U Hab)"
    },
    {
      "value": "tres-fuentes-u-hab",
      "label": "Tres Fuentes (U Hab)"
    },
    {
      "value": "valle-verde",
      "label": "Valle Verde"
    },
    {
      "value": "verano",
      "label": "Verano"
    },
    {
      "value": "viveros-de-coactetlan",
      "label": "Viveros De Coactetlan"
    },
    {
      "value": "xaxalipac",
      "label": "Xaxalipac"
    }
  ],
  "venustiano-carranza": [
    {
      "value": "aviacion-civil",
      "label": "Aviacion Civil"
    },
    {
      "value": "magdalena-mixhuca",
      "label": "Magdalena  Mixhuca"
    },
    {
      "value": "penitenciaria-ampl",
      "label": "Penitenciaria (Ampl)"
    },
    {
      "value": "adolfo-lopez-mateos",
      "label": "Adolfo Lopez Mateos"
    },
    {
      "value": "el-arenal-2a-seccion",
      "label": "El Arenal 2a Seccion"
    },
    {
      "value": "el-arenal-3a-seccion",
      "label": "El Arenal 3a Seccion"
    },
    {
      "value": "el-arenal-1a-seccion",
      "label": "El Arenal 1a Seccion"
    },
    {
      "value": "ignacio-zaragoza-i",
      "label": "Ignacio Zaragoza I"
    },
    {
      "value": "pensador-mexicano-i",
      "label": "Pensador Mexicano I"
    },
    {
      "value": "moctezuma-2a-seccion-iv",
      "label": "Moctezuma 2a Seccion Iv"
    },
    {
      "value": "michoacana-ampl",
      "label": "Michoacana (Ampl)"
    },
    {
      "value": "revolucion",
      "label": "Revolucion"
    },
    {
      "value": "ignacio-zaragoza-ii",
      "label": "Ignacio Zaragoza Ii"
    },
    {
      "value": "aaron-saenz",
      "label": "Aaron Saenz"
    },
    {
      "value": "aviacion-civil-ampl",
      "label": "Aviacion Civil (Ampl)"
    },
    {
      "value": "cuchilla-pantitlan",
      "label": "Cuchilla Pantitlan"
    },
    {
      "value": "el-arenal-4a-seccion",
      "label": "El Arenal 4a Seccion"
    },
    {
      "value": "el-arenal-pto-aereo-fracc",
      "label": "El Arenal Pto Aereo (Fracc)"
    },
    {
      "value": "felipe-angeles",
      "label": "Felipe Angeles"
    },
    {
      "value": "moctezuma-2a-seccion-iii",
      "label": "Moctezuma 2a Seccion Iii"
    },
    {
      "value": "20-de-noviembre",
      "label": "20 De Noviembre"
    },
    {
      "value": "7-de-julio-ampl",
      "label": "7 De Julio (Ampl)"
    },
    {
      "value": "caracol",
      "label": "Caracol"
    },
    {
      "value": "el-parque",
      "label": "El Parque"
    },
    {
      "value": "centro-i",
      "label": "Centro I"
    },
    {
      "value": "bahia-u-hab",
      "label": "Bahia (U Hab)"
    },
    {
      "value": "pino-u-hab",
      "label": "Pino (U Hab)"
    },
    {
      "value": "santa-cruz-aviacion",
      "label": "Santa Cruz Aviacion"
    },
    {
      "value": "moctezuma-2a-seccion-i",
      "label": "Moctezuma 2a Seccion I"
    },
    {
      "value": "artes-graficas",
      "label": "Artes Graficas"
    },
    {
      "value": "candelaria-de-los-patos-u-hab",
      "label": "Candelaria De Los Patos (U Hab)"
    },
    {
      "value": "popular-rastro",
      "label": "Popular Rastro"
    },
    {
      "value": "sevilla",
      "label": "Sevilla"
    },
    {
      "value": "jardin-balbuena-ii",
      "label": "Jardin Balbuena Ii"
    },
    {
      "value": "federal",
      "label": "Federal"
    },
    {
      "value": "valle-gomez",
      "label": "Valle Gomez"
    },
    {
      "value": "10-de-mayo",
      "label": "10 De Mayo"
    }
  ],
  "xochimilco": [
    {
      "value": "san-lorenzo",
      "label": "San Lorenzo"
    },
    {
      "value": "san-juan-tepepan",
      "label": "San Juan Tepepan"
    },
    {
      "value": "belem-barr",
      "label": "Belem (Barr)"
    },
    {
      "value": "tierra-nueva",
      "label": "Tierra Nueva"
    },
    {
      "value": "cristo-rey",
      "label": "Cristo Rey"
    },
    {
      "value": "la-cebada",
      "label": "La Cebada"
    },
    {
      "value": "el-carmen",
      "label": "El Carmen"
    },
    {
      "value": "san-bartolo-el-chico",
      "label": "San Bartolo El Chico"
    },
    {
      "value": "san-francisco-tlalnepantla-pblo",
      "label": "San Francisco Tlalnepantla (Pblo)"
    },
    {
      "value": "san-lorenzo-atemoaya-pblo",
      "label": "San Lorenzo Atemoaya (Pblo)"
    },
    {
      "value": "san-diego-barr",
      "label": "San Diego (Barr)"
    },
    {
      "value": "tlaxopan",
      "label": "Tlaxopan"
    },
    {
      "value": "san-lorenzo-la-cebada-ii",
      "label": "San Lorenzo La Cebada Ii"
    },
    {
      "value": "caltongo-barr",
      "label": "Caltongo (Barr)"
    },
    {
      "value": "los-cerrillos-i",
      "label": "Los Cerrillos I"
    },
    {
      "value": "san-lorenzo-barr",
      "label": "San Lorenzo (Barr)"
    },
    {
      "value": "san-pedro-barr",
      "label": "San Pedro (Barr)"
    },
    {
      "value": "el-rosario-barr",
      "label": "El Rosario (Barr)"
    },
    {
      "value": "rinconada-del-sur-u-hab",
      "label": "Rinconada Del Sur (U Hab)"
    },
    {
      "value": "san-andres-ahuayucan-pblo",
      "label": "San Andres Ahuayucan (Pblo)"
    },
    {
      "value": "villa-xochimilco-u-hab",
      "label": "Villa Xochimilco (U Hab)"
    },
    {
      "value": "san-marcos-barr",
      "label": "San Marcos (Barr)"
    },
    {
      "value": "santa-crucita-barr",
      "label": "Santa Crucita (Barr)"
    },
    {
      "value": "la-noria-tepepan",
      "label": "La Noria Tepepan"
    },
    {
      "value": "paseos-del-sur",
      "label": "Paseos Del Sur"
    },
    {
      "value": "santa-cruz-acalpixca-pblo",
      "label": "Santa Cruz Acalpixca (Pblo)"
    },
    {
      "value": "infonavit-prolongacion-division-del-norte-u-hab",
      "label": "Infonavit Prolongacion Division Del Norte (U Hab)"
    },
    {
      "value": "san-gregorio-atlapulco-pblo",
      "label": "San Gregorio Atlapulco (Pblo)"
    },
    {
      "value": "san-juan-barr",
      "label": "San Juan (Barr)"
    },
    {
      "value": "santiago-tepalcatlalpan-pblo",
      "label": "Santiago Tepalcatlalpan (Pblo)"
    },
    {
      "value": "la-concepcion-tlacoapa-barr",
      "label": "La Concepcion Tlacoapa (Barr)"
    },
    {
      "value": "santa-ines",
      "label": "Santa Ines"
    },
    {
      "value": "nativitas",
      "label": "Nativitas"
    }
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
