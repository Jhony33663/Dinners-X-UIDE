import { Career, Pillar, PartnerBenefit, FAQItem } from "./types";

export const CAREERS_DATA: Career[] = [
  {
    id: "medicina",
    name: "Medicina Humana",
    faculty: "Facultad de Ciencias Médicas y de la Salud",
    semesters: 12,
    credits: 240,
    totalTuitionRef: 48000,
    asuDualDegree: true,
    asuPathway: "Thunderbird / Health Sciences Track",
    iconName: "Stethoscope",
    description: "Formación clínica de vanguardia con simulación médica de alta fidelidad y vinculación a centros hospitalarios de referencia.",
    highlight: "Top 1 en acreditación médica internacional en Ecuador"
  },
  {
    id: "negocios",
    name: "Negocios Internacionales",
    faculty: "Business & Management School",
    semesters: 8,
    credits: 160,
    totalTuitionRef: 28800,
    asuDualDegree: true,
    asuPathway: "W. P. Carey School of Business #1 en Innovación USA",
    iconName: "TrendingUp",
    description: "Preparación para liderar empresas globales con inmersión bilingüe y doble titulación con Arizona State University.",
    highlight: "Doble titulación ASU W. P. Carey School"
  },
  {
    id: "software-ai",
    name: "Ingeniería en Software & IA",
    faculty: "Escuela de Tecnologías Exponenciales",
    semesters: 8,
    credits: 160,
    totalTuitionRef: 31200,
    asuDualDegree: true,
    asuPathway: "Ira A. Fulton Schools of Engineering",
    iconName: "Cpu",
    description: "Arquitectura de software de misión crítica, aprendizaje profundo, computación en la nube y visión computacional.",
    highlight: "Curriculum articulado con Fulton Schools ASU"
  },
  {
    id: "mecatronica",
    name: "Ingeniería Mecatrónica y Robótica",
    faculty: "Facultad de Ciencias Técnicas",
    semesters: 8,
    credits: 160,
    totalTuitionRef: 32000,
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
    semesters: 10,
    credits: 200,
    totalTuitionRef: 35000,
    asuDualDegree: true,
    asuPathway: "Herberger Institute for Design and the Arts",
    iconName: "Building2",
    description: "Diseño paramétrico, urbanismo regenerativo y modelado BIM con certificación de sostenibilidad ambiental.",
    highlight: "Alianza Herberger Institute for Design ASU"
  },
  {
    id: "derecho",
    name: "Derecho Corporativo & Tech Law",
    faculty: "Facultad de Jurisprudencia y Ciencias Sociales",
    semesters: 8,
    credits: 160,
    totalTuitionRef: 27500,
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
    semesters: 10,
    credits: 200,
    totalTuitionRef: 39500,
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
    semesters: 8,
    credits: 160,
    totalTuitionRef: 26000,
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
    answer: "REINVENTORS PAD (Plan de Ahorro y Desarrollo) es una alianza estratégica sin precedentes en Ecuador entre la Universidad Internacional del Ecuador (UIDE), Diners Club del Ecuador y Raúl Coka Barriga. Permite a los padres de familia estructurar un fondo programado de ahorro para los estudios universitarios de sus hijos, beneficiándose de rendimientos fiduciarios, acumulación de ClubMiles, seguros de protección total y vinculación anticipada a la red de Arizona State University."
  },
  {
    category: "seguridad",
    question: "¿Cómo protege Raúl Coka Barriga los fondos ante cualquier contingencia del titular?",
    answer: "Cada contrato PAD incluye una póliza fiduciaria de seguros suscrita por Raúl Coka Barriga. Si el tutor aportante fallece o sufre una incapacidad total y permanente, la aseguradora liquida de forma inmediata la totalidad del fondo proyectado hasta que el hijo culmine sus estudios. Además, incluye cobertura temporal de desempleo involuntario para salvaguardar la continuidad del aporte."
  },
  {
    category: "finanzas",
    question: "¿Cómo se realizan los aportes y qué beneficios tiene ser socio Diners Club?",
    answer: "Los aportes se configuran mediante débito automático mensual con tu tarjeta Diners Club o cuenta bancaria afiliada. Si eres socio Diners Club, cada dólar aportado genera 1 ClubMile para tus programas de viaje y estilo de vida, además de acceder a tasas preferenciales de inversión y preaprobación de líneas de financiamiento complementarias."
  },
  {
    category: "uide_asu",
    question: "¿Qué beneficios académicos otorga el convenio UIDE con Arizona State University (ASU)?",
    answer: "La UIDE es la única universidad en Ecuador potenciada por Arizona State University (clasificada por 9 años consecutivos como la #1 en innovación de EE.UU.). Los beneficiarios del programa PAD tienen acceso a asignaturas bilingües homologadas, bootcamps de inmersión en Phoenix, Arizona, y la oportunidad de graduarse con doble titulación internacional válida tanto en Ecuador como en Estados Unidos."
  },
  {
    category: "programa",
    question: "¿Qué sucede si mi hijo decide estudiar otra carrera o decide no estudiar en la UIDE?",
    answer: "El fondo acumulado y sus rendimientos son propiedad fiduciaria del beneficiario. Si tu hijo elige otra carrera dentro de la UIDE, el fondo se aplica automáticamente a la nueva malla. Si decide estudiar en otra institución del país o el exterior, o si deseas transferir el plan a otro de tus hijos, el fondo fiduciario puede ser reasignado o liquidado según las cláusulas de flexibilidad patrimonial establecidas en el contrato sin penalizaciones abusivas."
  },
  {
    category: "finanzas",
    question: "¿Puedo realizar aportes extraordinarios para acelerar mi meta de ahorro?",
    answer: "Sí, el sistema fiduciario permite aportes extraordinarios en cualquier momento (por ejemplo, con décimos, bonos de productividad o utilidades). Estos aportes reducen el valor de las cuotas futuras o incrementan el fondo total proyectado, amplificando el porcentaje de cobertura de la colegiatura."
  }
];
