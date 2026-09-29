import { Career, Pillar, PartnerBenefit, FAQItem } from "./types";

export * from "./careers-uide";

export const CAREERS_DATA: Career[] = [
  {
    id: "medicina",
    name: "Medicina Humana",
    faculty: "Facultad de Ciencias Médicas y de la Salud",
    campus: "Quito",
    semesters: 12,
    credits: 240,
    matriculaSem: 511.00,
    colegiaturaSem: 5126.21,
    costoTotalSem: 5637.21,
    totalTuitionRef: 67646.52,
    totalConBeca: 54728.04,
    ahorroBeca: 12918.48,
    asuDualDegree: true,
    asuPathway: "Thunderbird / Health Sciences Track",
    iconName: "Stethoscope",
    description: "Formación clínica de vanguardia con simulación médica de alta fidelidad y vinculación a centros hospitalarios de referencia.",
    highlight: "Top 1 en acreditación médica internacional en Ecuador"
  },
  {
    id: "negocios",
    name: "Negocios Internacionales 3+1",
    faculty: "Business & Management School",
    campus: "Quito",
    semesters: 8,
    credits: 160,
    matriculaSem: 335.00,
    colegiaturaSem: 3359.82,
    costoTotalSem: 3694.82,
    totalTuitionRef: 29558.56,
    totalConBeca: 23914.47,
    ahorroBeca: 5644.09,
    asuDualDegree: true,
    asuPathway: "W. P. Carey School of Business #1 en Innovación USA",
    iconName: "TrendingUp",
    description: "Preparación para liderar empresas globales con inmersión bilingüe y doble titulación con Arizona State University.",
    highlight: "Doble titulación ASU W. P. Carey School"
  },
  {
    id: "software-ai",
    name: "Ingeniería en Inteligencia Artificial & Software",
    faculty: "Escuela de Tecnologías Exponenciales & Software",
    campus: "Quito",
    semesters: 8,
    credits: 160,
    matriculaSem: 326.34,
    colegiaturaSem: 3278.66,
    costoTotalSem: 3605.00,
    totalTuitionRef: 28840.00,
    totalConBeca: 23332.90,
    ahorroBeca: 5507.10,
    asuDualDegree: true,
    asuPathway: "Ira A. Fulton Schools of Engineering",
    iconName: "Cpu",
    description: "Arquitectura de software de misión crítica, aprendizaje profundo, computación en la nube y visión computacional.",
    highlight: "Curriculum articulado con Fulton Schools ASU"
  },
  {
    id: "mecatronica",
    name: "Ciencias Exactas Y Tecnológicas Mecatrónica",
    faculty: "Facultad de Ciencias Técnicas e Ingenierías",
    campus: "Quito",
    semesters: 8,
    credits: 160,
    matriculaSem: 335.00,
    colegiaturaSem: 3355.32,
    costoTotalSem: 3690.32,
    totalTuitionRef: 29522.56,
    totalConBeca: 23885.62,
    ahorroBeca: 5636.94,
    asuDualDegree: true,
    asuPathway: "Ira A. Fulton Schools of Engineering",
    iconName: "Bot",
    description: "Sistemas autónomos, automatización industrial, sensórica IoT y robótica colaborativa para industria 4.0.",
    highlight: "Laboratorios de manufactura aditiva y mecatrónica avanzada"
  },
  {
    id: "arquitectura",
    name: "Arquitectura Bioclimática & Urbana",
    faculty: "Facultad de Arquitectura, Diseño y Arte",
    campus: "Quito",
    semesters: 10,
    credits: 200,
    matriculaSem: 335.00,
    colegiaturaSem: 3357.15,
    costoTotalSem: 3692.15,
    totalTuitionRef: 36921.50,
    totalConBeca: 29871.48,
    ahorroBeca: 7050.02,
    asuDualDegree: true,
    asuPathway: "Herberger Institute for Design and the Arts",
    iconName: "Building2",
    description: "Diseño paramétrico, urbanismo regenerativo y modelado BIM con certificación de sostenibilidad ambiental.",
    highlight: "Alianza Herberger Institute for Design ASU"
  },
  {
    id: "derecho",
    name: "Derecho",
    faculty: "Facultad de Jurisprudencia y Ciencias Sociales",
    campus: "Quito",
    semesters: 8,
    credits: 160,
    matriculaSem: 310.00,
    colegiaturaSem: 3110.31,
    costoTotalSem: 3420.31,
    totalTuitionRef: 27362.48,
    totalConBeca: 22137.60,
    ahorroBeca: 5224.88,
    asuDualDegree: true,
    asuPathway: "Sandra Day O'Connor College of Law",
    iconName: "Scale",
    description: "Litigio estratégico, derecho transfronterizo, propiedad intelectual y regulación de finanzas tecnológicas (Fintech).",
    highlight: "Clínica jurídica con Sandra Day O'Connor College"
  },
  {
    id: "odontologia",
    name: "Odontología Digital",
    faculty: "Facultad de Ciencias Médicas y de la Salud",
    campus: "Quito",
    semesters: 10,
    credits: 200,
    matriculaSem: 376.00,
    colegiaturaSem: 3773.23,
    costoTotalSem: 4149.23,
    totalTuitionRef: 41492.30,
    totalConBeca: 33568.52,
    ahorroBeca: 7923.78,
    asuDualDegree: false,
    asuPathway: "Especialidades Clínicas Postgrado",
    iconName: "Activity",
    description: "Clínicas odontológicas universitarias propias con tecnología CAD/CAM, tomografía 3D y escaneo intraoral.",
    highlight: "Clínicas docentes de alta especialidad en Quito"
  },
  {
    id: "marketing",
    name: "Marketing & Growth Digital",
    faculty: "Business & Management School",
    campus: "Quito",
    semesters: 8,
    credits: 160,
    matriculaSem: 335.00,
    colegiaturaSem: 3359.82,
    costoTotalSem: 3694.82,
    totalTuitionRef: 29558.56,
    totalConBeca: 23914.47,
    ahorroBeca: 5644.09,
    asuDualDegree: true,
    asuPathway: "Thunderbird School of Global Management",
    iconName: "Target",
    description: "Analítica de audiencias, marketing predictivo, estrategias de performance y economía del comportamiento.",
    highlight: "Certificación global Thunderbird School"
  }
];

export const PILLARS_DATA: Pillar[] = [
  {
    id: "seguridad",
    title: "Seguridad Financiera y Respaldo Absoluto",
    subtitle: "Protección patrimonial garantizada por Diners Club y Raúl Coka Barriga",
    partner: "Diners Club × Raúl Coka Barriga",
    badge: "Fondo Garantizado 100%",
    accentColor: "blue",
    description: "Tu plan de ahorro educativo está blindado bajo un fideicomiso mercantil administrado con los más altos estándares fiduciarios. En caso de imprevistos, la póliza de protección estudiantil de Raúl Coka Barriga asume la totalidad de la colegiatura restante.",
    stats: [
      { label: "Tasa de Cobertura de Contingencia", value: "100%" },
      { label: "Respaldo Fiduciario Calificado", value: "AAA" },
      { label: "Millas acumuladas en aportes", value: "1:1 ClubMiles" }
    ]
  },
  {
    id: "desarrollo",
    title: "Desarrollo Integral & Acompañamiento Vocacional",
    subtitle: "Potenciamos las aptitudes de tus hijos desde la etapa escolar",
    partner: "UIDE Experience Hub",
    badge: "Ecosistema de Talento",
    accentColor: "gold",
    description: "No es solo un fondo bancario: es una comunidad de aprendizaje activo. Tus hijos acceden desde los 10 años a bootcamps tecnológicos, orientación vocacional neurocientífica, mentorías con líderes de industria y talleres de innovación.",
    stats: [
      { label: "Talleres Tempranos / Año", value: "+12 Exclusivos" },
      { label: "Test Vocacional Predictivo", value: "Gratuito" },
      { label: "Mentorías con Graduados ASU", value: "1 a 1" }
    ]
  },
  {
    id: "vinculacion",
    title: "Vinculación Universitaria Temprana & Red ASU",
    subtitle: "Pase directo a la universidad #1 en innovación de Ecuador y EE.UU.",
    partner: "UIDE × Arizona State University",
    badge: "Alianza Internacional ASU",
    accentColor: "red",
    description: "Matrícula preferencial, pase directo sin examen de admisión regular y la posibilidad única de obtener una doble titulación norteamericana con Arizona State University, clasificada por 9 años consecutivos como la #1 en Innovación en Estados Unidos (U.S. News & World Report).",
    stats: [
      { label: "Innovación en EE.UU.", value: "#1 ASU por 9 años" },
      { label: "Doble Titulación Válida en USA", value: "100% Homologada" },
      { label: "Beca de Fidelidad PAD", value: "Hasta 25%" }
    ]
  }
];

export const PARTNERS_BENEFITS: PartnerBenefit[] = [
  {
    partnerId: "rcb",
    partnerName: "Raúl Coka Barriga",
    partnerRole: "Agencia Asesora Productora de Seguros & Respaldo Contingente",
    accentColor: "#D4AF37",
    tagline: "El escudo definitivo que garantiza que la carrera de tus hijos nunca se interrumpa.",
    benefits: [
      {
        id: "rcb-1",
        title: "Póliza de Continuidad de Estudios",
        description: "En caso de fallecimiento o incapacidad total y permanente del titular aportante, la aseguradora asume la totalidad de las cuotas pendientes hasta la graduación universitaria del beneficiario.",
        badge: "Cobertura Vitalicia",
        highlight: "100% de colegiatura asegurada",
        icon: "ShieldCheck"
      },
      {
        id: "rcb-2",
        title: "Seguro de Desempleo Involuntario",
        description: "Cubre hasta 6 meses de aportes mensuales del fondo PAD si el tutor enfrenta un cese laboral involuntario, permitiendo que el plan no caiga en mora ni penalidades.",
        badge: "Tranquilidad Laboral",
        highlight: "Amortiguación de 180 días",
        icon: "Umbrella"
      },
      {
        id: "rcb-3",
        title: "Asistencia Médica y Accidentes Estudiantiles",
        description: "Cobertura de gastos médicos por accidentes las 24 horas del día, los 365 días del año para el hijo beneficiario durante toda la vigencia del plan de ahorro.",
        badge: "Salud Integral",
        highlight: "Red hospitalaria nacional",
        icon: "HeartHandshake"
      },
      {
        id: "rcb-4",
        title: "Cláusula de Reasignación Familiar",
        description: "Flexibilidad jurídica para transferir el fondo acumulado a otro hijo o beneficiario de primer grado sin recargos fiduciarios ni pérdidas de capital.",
        badge: "Flexibilidad Total",
        highlight: "Endoso sin penalidad",
        icon: "UserCheck"
      }
    ]
  },
  {
    partnerId: "diners",
    partnerName: "Diners Club Ecuador",
    partnerRole: "Entidad Financiera Emisora, Medio de Pago & Fidelización",
    accentColor: "#004A97",
    tagline: "Facilidades de débito automático inteligente y privilegios exclusivos para socios.",
    benefits: [
      {
        id: "diners-1",
        title: "Multiplicador de ClubMiles",
        description: "Cada dólar ahorrado en el programa Reinventors PAD acumula 1 ClubMile directamente en tu cuenta de socio Diners Club, canjeable por pasajes aéreos o experiencias de viaje.",
        badge: "ClubMiles 1:1",
        highlight: "+30,000 millas potenciales",
        icon: "Plane"
      },
      {
        id: "diners-2",
        title: "Débito Automático con Tasa de Retorno Preferencial",
        description: "Automatización bancaria sin fricción con rendimiento compuesto anual protegido contra inflación, optimizado bajo el vehículo fiduciario de inversión colectiva.",
        badge: "Ahorro Inteligente",
        highlight: "Rendimiento capitalizable mensual",
        icon: "Coins"
      },
      {
        id: "diners-3",
        title: "Acceso a Salas VIP de Aeropuertos",
        description: "Membresía prioritaria a salas VIP nacionales e internacionales para el estudiante y sus padres cuando viajen a intercambios o congresos académicos ASU.",
        badge: "Lifestyle Diners",
        highlight: "Salas VIP globales",
        icon: "Crown"
      },
      {
        id: "diners-4",
        title: "Línea de Crédito Educativa Complementaria",
        description: "Preaprobación automática de crédito preferencial en caso de requerir fondos adicionales para programas de maestría, posgrados o semestres en el extranjero.",
        badge: "Crédito Diners",
        highlight: "Tasa preferencial para socios",
        icon: "CreditCard"
      }
    ]
  },
  {
    partnerId: "uide",
    partnerName: "UIDE Powered by ASU",
    partnerRole: "Universidad Internacional del Ecuador & Arizona State University",
    accentColor: "#E31837",
    tagline: "Formación de escala global con la universidad líder en innovación de Estados Unidos.",
    benefits: [
      {
        id: "uide-1",
        title: "Doble Titulación Internacional ASU",
        description: "Posibilidad de graduarse con dos títulos universitarios oficiales: el título otorgado por la UIDE en Ecuador y el título norteamericano emitido por Arizona State University.",
        badge: "Título USA",
        highlight: "Válido en EE.UU. y el mundo",
        icon: "GraduationCap"
      },
      {
        id: "uide-2",
        title: "Beca de Fidelidad de hasta 25%",
        description: "Los estudiantes cuyos padres mantuvieron el plan PAD por un periodo mínimo de 5 años acceden a una beca de honor sobre el remanente de su matrícula semestral.",
        badge: "Beca Académica",
        highlight: "Descuento asegurado",
        icon: "Award"
      },
      {
        id: "uide-3",
        title: "Acceso Anticipado al Campus & Bootcamps",
        description: "Pase libre a bibliotecas digitales internacionales, laboratorios de simulación y campamentos de verano tecnológicos desde que tu hijo cumple 12 años.",
        badge: "Campus Pass",
        highlight: "Inmersión preuniversitaria",
        icon: "Compass"
      },
      {
        id: "uide-4",
        title: "Admisión Directa Preferencial",
        description: "Exoneración del examen regular de ingreso y reserva prioritaria de cupo en facultades de alta demanda como Medicina Humana, Mecatrónica y Negocios.",
        badge: "Cupo Garantizado",
        highlight: "Sin listas de espera",
        icon: "CheckCircle2"
      }
    ]
  }
];

export const COMPARISON_POINTS = {
  early: {
    title: "Si empiezas temprano (Edad 2 - 8 años)",
    subtitle: "El poder del interés compuesto y la tranquilidad financiera a largo plazo",
    themeColor: "emerald",
    accentClass: "border-emerald-500/30 bg-emerald-950/20 text-emerald-400",
    glowClass: "rgba(16, 185, 129, 0.15)",
    items: [
      {
        title: "Aporte mensual sumamente accesible",
        detail: "Desde $90 a $150 al mes gracias a un horizonte de 10 a 15 años de capitalización.",
        metric: "$120 / mes promedio"
      },
      {
        title: "Efecto multiplicador del fondo fiduciario",
        detail: "El rendimiento acumulado cubre entre el 35% y el 48% del costo total de la colegiatura.",
        metric: "+42% por rentabilidad"
      },
      {
        title: "Póliza integral de seguro de vida y desempleo activa por más de una década",
        detail: "Tu familia queda protegida ante cualquier adversidad desde el primer aporte.",
        metric: "Protección por 15 años"
      },
      {
        title: "Acceso pleno al ecosistema UIDE desde la adolescencia",
        detail: "Talleres vocacionales, orientación temprana y campamentos de innovación con docentes ASU.",
        metric: "+20 experiencias vocacionales"
      },
      {
        title: "Cero endeudamiento familiar de última hora",
        detail: "Al llegar a los 18 años, el fondo se desembolsa directamente a la universidad sin estrés crediticio.",
        metric: "0% deuda bancaria"
      }
    ]
  },
  late: {
    title: "Si esperas (Edad 15 - 17 años)",
    subtitle: "La presión del gasto concentrado e imprevistos de último minuto",
    themeColor: "rose",
    accentClass: "border-rose-500/30 bg-rose-950/20 text-rose-400",
    glowClass: "rgba(227, 24, 55, 0.2)",
    items: [
      {
        title: "Aportes mensuales intensivos y asfixiantes",
        detail: "Para acumular un fondo similar se requieren aportes superiores a $650 - $900 mensuales.",
        metric: "$780 / mes necesario"
      },
      {
        title: "Cero margen para el rendimiento compuesto",
        detail: "El horizonte de 2 o 3 años no permite generar una curva de capitalización representativa.",
        metric: "< 6% rentabilidad neta"
      },
      {
        title: "Vulnerabilidad ante emergencias familiares",
        detail: "Cualquier eventualidad económica o de salud obliga a postergar el ingreso a la universidad.",
        metric: "Alto riesgo de deserción"
      },
      {
        title: "Elección de carrera condicionada por el presupuesto inmediato",
        detail: "Muchas veces el estudiante debe sacrificar su vocación por limitaciones financieras de liquidez.",
        metric: "Vocación comprometida"
      },
      {
        title: "Necesidad de créditos educativos con altas tasas de interés",
        detail: "La familia asume deudas a 5 o 7 años con sobrecostos financieros significativos.",
        metric: "Endeudamiento diferido"
      }
    ]
  }
};

export const FAQ_DATA: FAQItem[] = [
  {
    category: "programa",
    question: "¿Qué es exactamente el programa REINVENTORS PAD?",
    answer: "REINVENTORS PAD (Programa de Acumulación Diners) es una alianza estratégica oficial entre la Universidad Internacional del Ecuador (UIDE), Banco Diners Club del Ecuador S.A. y Raúl Coka Barriga. Permite a los padres de familia estructurar un fondo programado de ahorro para los estudios universitarios de sus hijos mediante cargo recurrente a su tarjeta Diners Club, generando rendimientos financieros con capitalización mensual, acumulación de ClubMiles (1:1), blindaje del 100% con póliza de protección estudiantil y vinculación preferencial a la red de Arizona State University (ASU)."
  },
  {
    category: "finanzas",
    question: "¿Cuál es la tasa de interés y las condiciones financieras del depósito PAD?",
    answer: "El depósito a plazo PAD reconoce una tasa de interés nominal anual del 3.40% al 3.41% con capitalización mensual de intereses. El plazo mínimo forzoso para acceder a esta tasa es de 12 meses a partir de la constitución del primer depósito. Conforme a la legislación tributaria ecuatoriana, sobre los intereses brutos generados se aplica una retención en la fuente del 2.0% (SRI)."
  },
  {
    category: "seguridad",
    question: "¿Cómo funciona la póliza de protección estudiantil de Raúl Coka Barriga ($25 USD/mes)?",
    answer: "Por una prima fija mensual de $25.00 USD, tu hijo/a queda protegido con una suma asegurada equivalente al 100% de la meta universitaria proyectada. En caso de fallecimiento o incapacidad total y permanente del titular aportante, la aseguradora indemniza y cubre la totalidad de los valores faltantes para garantizar que culmine su carrera en la UIDE. Además, incluye amparo por desempleo involuntario de hasta 6 meses."
  },
  {
    category: "finanzas",
    question: "¿Qué ocurre si aún no soy socio Diners Club?",
    answer: "El programa está diseñado tanto para socios activos como para nuevos miembros. Si aún no tienes tarjeta Diners Club, puedes ingresar tu solicitud en esta misma página: iniciarás un proceso de evaluación crediticia ágil para emisión y tarjetización Diners Club, vinculándote de inmediato al débito automático del programa PAD."
  },
  {
    category: "finanzas",
    question: "¿Cuáles son los límites de ahorro mensual establecidos por Banco Diners Club?",
    answer: "El monto mensual seleccionado es descontado automáticamente del cupo de tu tarjeta Diners Club. Conforme a las políticas comerciales y operativas vigentes, los cargos recurrentes mensuales del PAD tienen un tope máximo de hasta $4,999.00 USD mensuales. Cualquier ajuste futuro en los montos se tramita directamente en oficinas de Diners Club o vía call center."
  },
  {
    category: "seguridad",
    question: "¿Qué garantía tengo sobre la disponibilidad de los fondos frente a la universidad?",
    answer: "De acuerdo con el Contrato de Depósito a Plazo y la normativa bancaria, los fondos depositados en el PAD constituyen un pasivo exigible por el cliente en todo momento. Diners Club no retiene unilateralmente los valores ni los transfiere sin instrucción; el titular o fiduciario dispone de los recursos para abonar la colegiatura en la UIDE con todos los beneficios y descuentos acordados."
  },
  {
    category: "uide_asu",
    question: "¿Qué ventajas académicas exclusivas ofrece la alianza UIDE con Arizona State University (ASU)?",
    answer: "La UIDE es la única universidad en Ecuador potenciada por Arizona State University (#1 en innovación en EE.UU. por 9 años consecutivos). Los estudiantes inscritos en el programa PAD obtienen reserva de cupo preferencial, acceso a programas bilingües, bootcamps de inmersión internacional y la opción de doble titulación oficial válida tanto en Ecuador como en Estados Unidos."
  },
  {
    category: "programa",
    question: "¿Qué tratamiento se da a mis datos personales conforme a la ley?",
    answer: "La UIDE y Diners Club del Ecuador cuentan con un Acuerdo de Tratamiento de Datos (DPA) suscrito formalmente. Toda la información registrada en el simulador y formulario es tratada bajo los más estrictos estándares de la Ley Orgánica de Protección de Datos Personales (LOPDP) de Ecuador y transmitida mediante canales cifrados SFTP."
  }
];

