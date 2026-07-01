export interface ServiceBenefit {
  title: string
  desc: string
}

export interface ServiceAudience {
  label: string
  desc: string
}

export interface ServiceDetail {
  heroStats:      { value: string; label: string }[]
  benefits:       ServiceBenefit[]
  targetAudience: ServiceAudience[]
  whyItMatters:   string
  risksWithout:   string[]
  recommendedSlug: string
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'contabilidad-general': {
    heroStats: [
      { value: '100%', label: 'Exactitud en registros' },
      { value: '12',   label: 'Reportes anuales' },
      { value: '0',    label: 'Errores contables' },
    ],
    benefits: [
      {
        title: 'Visión clara de tu negocio',
        desc:  'Con estados financieros mensuales sabes exactamente cuánto ganas, cuánto gastas y cuánto vale tu empresa en tiempo real.',
      },
      {
        title: 'Decisiones respaldadas por datos',
        desc:  'Si abrir una sucursal, contratar personal o invertir en equipos: cada decisión apoyada en números reales, no en intuición.',
      },
      {
        title: 'Acceso a créditos bancarios',
        desc:  'Los bancos exigen contabilidad formal para aprobar préstamos. Te preparamos para cualquier evaluación crediticia.',
      },
      {
        title: 'Cumplimiento legal garantizado',
        desc:  'Todos los registros según las Normas Internacionales de Información Financiera (NIIF) y normativa SUNAT vigente.',
      },
    ],
    targetAudience: [
      { label: 'Empresas en régimen MYPE Tributario o General', desc: 'Obligadas a llevar contabilidad completa según el Código Tributario.' },
      { label: 'Negocios en crecimiento',                       desc: 'Que necesitan ordenar sus finanzas para escalar con solidez y sin riesgos.' },
      { label: 'Emprendedores que inician',                     desc: 'Que quieren empezar bien desde el primer día y evitar errores costosos.' },
      { label: 'Empresas que buscan financiamiento',            desc: 'Bancos y fondos de inversión exigen estados financieros auditables.' },
    ],
    whyItMatters: 'La contabilidad es el idioma de los negocios. Sin registros precisos no puedes saber si tu empresa es realmente rentable, cuánto debes a la SUNAT ni cómo proyectar tu crecimiento. Es la base de toda decisión financiera y el primer requisito para cualquier trámite formal.',
    risksWithout: [
      'Multas SUNAT por omisión o retraso en registros contables',
      'Imposibilidad de acceder a créditos bancarios o líneas de financiamiento',
      'Decisiones de negocio basadas en intuición, no en datos reales',
      'Problemas legales y patrimoniales en caso de auditoría o litigio',
    ],
    recommendedSlug: 'tributacion-sunat',
  },

  'tributacion-sunat': {
    heroStats: [
      { value: '0',    label: 'Multas en nuestra gestión' },
      { value: '100%', label: 'Declaraciones a tiempo' },
      { value: '+7',   label: 'Años declarando' },
    ],
    benefits: [
      {
        title: 'Nunca más fechas vencidas',
        desc:  'Gestionamos todos tus PDT mensuales y anuales con anticipación. Tú recibes la confirmación, nosotros hacemos el trabajo.',
      },
      {
        title: 'Ahorro fiscal dentro de la ley',
        desc:  'Identificamos detracciones, créditos fiscales y beneficios tributarios que reducen legalmente tu carga impositiva.',
      },
      {
        title: 'Defensa ante la SUNAT',
        desc:  'Si la SUNAT te audita o fiscaliza, te representamos y respondemos cada requerimiento con la documentación adecuada.',
      },
      {
        title: 'Régimen tributario optimizado',
        desc:  'Analizamos si RUS, RER, MYPE Tributario o Régimen General es más conveniente para tu actividad y volumen de ventas.',
      },
    ],
    targetAudience: [
      { label: 'Personas naturales con negocio',          desc: 'Que emiten facturas o boletas y deben declarar mensualmente a la SUNAT.' },
      { label: 'MYPE en cualquier régimen tributario',    desc: 'Que necesitan cumplir puntualmente con sus obligaciones sin complicaciones.' },
      { label: 'Empresas con deuda tributaria pendiente', desc: 'Que requieren gestionar fraccionamientos y regularizarse ante la SUNAT.' },
      { label: 'Negocios próximos a ser fiscalizados',    desc: 'Que quieren estar 100% preparados para enfrentar una auditoría tributaria.' },
    ],
    whyItMatters: 'La SUNAT cuenta con herramientas tecnológicas avanzadas —cruce de información electrónica, libros digitales, comprobantes en línea— que detectan inconsistencias con rapidez. Un error en la declaración puede generar multas del 50% al 100% del tributo omitido, más intereses moratorios que crecen mes a mes.',
    risksWithout: [
      'Multas por declaraciones tardías o incorrectas (hasta 100% del tributo)',
      'Fiscalizaciones que pueden paralizar la operación del negocio',
      'Pago de impuestos en exceso por no aprovechar beneficios disponibles',
      'Deudas tributarias con intereses moratorios que se acumulan mensualmente',
    ],
    recommendedSlug: 'asesoria-tributaria',
  },

  'planillas-rrhh': {
    heroStats: [
      { value: '100%', label: 'Puntualidad en pagos' },
      { value: '0',    label: 'Multas laborales' },
      { value: '4',    label: 'Beneficios gestionados' },
    ],
    benefits: [
      {
        title: 'Trabajadores pagados con exactitud',
        desc:  'Sueldo, horas extras, descuentos de ley y aportes calculados al centavo, sin errores que generen reclamos.',
      },
      {
        title: 'Beneficios sociales sin contingencias',
        desc:  'CTS, gratificaciones y vacaciones calculadas según ley vigente. Evita demandas laborales por errores en liquidaciones.',
      },
      {
        title: 'Cumplimiento con ESSALUD y pensiones',
        desc:  'Registro en PLAME, aportes de AFP/ONP y ESSALUD presentados puntualmente para proteger a tus trabajadores.',
      },
      {
        title: 'Boletas electrónicas del MTPE',
        desc:  'Generamos y enviamos boletas de pago electrónicas que cumplen con la normativa del Ministerio de Trabajo.',
      },
    ],
    targetAudience: [
      { label: 'Empresas con personal en planilla',       desc: 'Cualquier negocio con uno o más trabajadores en relación de dependencia.' },
      { label: 'Negocios que van a contratar personal',   desc: 'Que quieren hacerlo correctamente desde el inicio para evitar contingencias.' },
      { label: 'Empresas con deudas laborales pasadas',   desc: 'Que necesitan regularizar su situación ante ESSALUD, AFP o MTPE.' },
      { label: 'Pymes en proceso de crecimiento',         desc: 'Que incorporan personal y necesitan una gestión profesional de RR.HH.' },
    ],
    whyItMatters: 'Las infracciones laborales en Perú tienen multas que van desde S/ 1,800 hasta S/ 180,000 según el tamaño de la empresa y la gravedad. El Ministerio de Trabajo realiza inspecciones regulares y un error en el cálculo de beneficios sociales puede derivar en demandas que afectan la liquidez de la empresa.',
    risksWithout: [
      'Multas del Ministerio de Trabajo por infracciones laborales',
      'Demandas de trabajadores por beneficios sociales mal calculados',
      'Problemas con ESSALUD y AFP por falta de afiliación o aporte incorrecto',
      'Conflictos laborales que afectan el clima y la productividad del equipo',
    ],
    recommendedSlug: 'constitucion-empresas',
  },

  'constitucion-empresas': {
    heroStats: [
      { value: '7',    label: 'Días promedio' },
      { value: '4',    label: 'Trámites gestionados' },
      { value: '100%', label: 'Registros exitosos' },
    ],
    benefits: [
      {
        title: 'Empresa formal en tiempo récord',
        desc:  'Gestionamos minuta, escritura pública, inscripción SUNARP, obtención de RUC y licencia municipal desde el inicio.',
      },
      {
        title: 'Tipo societario ideal para tu negocio',
        desc:  'Te asesoramos sobre las diferencias entre SAC, SAA, EIRL y persona natural para proteger mejor tu patrimonio.',
      },
      {
        title: 'Sin errores costosos',
        desc:  'Conocemos el proceso a la perfección. Evitamos observaciones, rechazos y trámites duplicados que generan gastos innecesarios.',
      },
      {
        title: 'Licencias y permisos incluidos',
        desc:  'También gestionamos licencia municipal de funcionamiento, certificados y registros sanitarios según tu actividad.',
      },
    ],
    targetAudience: [
      { label: 'Emprendedores con idea de negocio',       desc: 'Que quieren iniciar formalmente y proteger su patrimonio personal desde el inicio.' },
      { label: 'Negocios informales que se formalizan',   desc: 'Que necesitan emitir facturas, acceder a créditos o contratar con el Estado.' },
      { label: 'Socios que crean una empresa juntos',     desc: 'Que necesitan un contrato societario bien redactado que proteja a todos.' },
      { label: 'Comercios que requieren licencia',        desc: 'Para operar legalmente en Jaén y evitar cierres o multas municipales.' },
    ],
    whyItMatters: 'Operar de forma informal impide emitir facturas a empresas (que necesitan sustentar sus gastos), acceder a créditos bancarios, participar en licitaciones del Estado y —lo más importante— proteger tu patrimonio personal ante deudas del negocio.',
    risksWithout: [
      'No poder emitir facturas electrónicas a clientes empresariales',
      'Exclusión de licitaciones y contratos con el Estado',
      'Responsabilidad personal ilimitada ante deudas del negocio',
      'Imposibilidad de acceder a líneas de crédito empresariales',
    ],
    recommendedSlug: 'tramites-sunat-sunarp',
  },

  'asesoria-tributaria': {
    heroStats: [
      { value: '≤30%', label: 'Reducción de carga fiscal' },
      { value: '+7',   label: 'Años de experiencia' },
      { value: '100%', label: 'Dentro del marco legal' },
    ],
    benefits: [
      {
        title: 'Reducción legal de impuestos',
        desc:  'Identificamos gastos deducibles, créditos fiscales y estructuras que reducen tu pago de impuestos sin evadir.',
      },
      {
        title: 'Planificación fiscal anual',
        desc:  'Diseñamos una estrategia tributaria para que no haya sorpresas al momento de declarar el impuesto a la renta.',
      },
      {
        title: 'Detección de contingencias',
        desc:  'Revisamos tu historial tributario para identificar riesgos antes de que la SUNAT los detecte en una fiscalización.',
      },
      {
        title: 'Asesor disponible todo el año',
        desc:  'Tienes un contador de confianza para resolver cualquier duda tributaria antes de tomar una decisión de negocio.',
      },
    ],
    targetAudience: [
      { label: 'Empresas con alta carga impositiva',         desc: 'Que sienten que pagan demasiado y quieren optimizar legalmente.' },
      { label: 'Negocios con ventas en crecimiento',         desc: 'Cuyas utilidades crecen y necesitan planificar para no perder rentabilidad.' },
      { label: 'Empresas con ingresos diversificados',       desc: 'Que tienen estructuras complejas y necesitan orientación especializada.' },
      { label: 'Emprendedores antes de una venta o fusión',  desc: 'Una operación de compraventa tiene implicancias tributarias que deben planificarse.' },
    ],
    whyItMatters: 'La planificación fiscal proactiva puede reducir legalmente entre un 15% y un 30% la carga impositiva de una empresa mediana. La diferencia entre "pagar lo justo" y "pagar de más" está en conocer la normativa tributaria vigente y aplicarla estratégicamente antes de cada cierre fiscal.',
    risksWithout: [
      'Pago excesivo de impuestos por desconocimiento de beneficios disponibles',
      'Contingencias tributarias no detectadas que generan ajustes con intereses',
      'Sorpresas al cerrar el año fiscal con impuesto a la renta elevado',
      'Decisiones de negocio con consecuencias tributarias no previstas',
    ],
    recommendedSlug: 'tributacion-sunat',
  },

  'tramites-sunat-sunarp': {
    heroStats: [
      { value: '100%', label: 'Trámites completados' },
      { value: '48h',  label: 'Tiempo de respuesta' },
      { value: '0',    label: 'Requerimientos pendientes' },
    ],
    benefits: [
      {
        title: 'Sin colas ni pérdida de tiempo',
        desc:  'Nos encargamos de todos los trámites presenciales y virtuales ante la SUNAT y SUNARP para que tú no pierdas tiempo.',
      },
      {
        title: 'Documentación perfectamente preparada',
        desc:  'Evitamos rechazos por documentación incompleta o errores en formatos. Todo va bien desde la primera presentación.',
      },
      {
        title: 'Seguimiento hasta la resolución',
        desc:  'No te dejamos solo: hacemos seguimiento hasta que el trámite esté 100% concluido y tengas tus constancias.',
      },
      {
        title: 'Representación formal ante entidades',
        desc:  'Como tu representante, respondemos requerimientos y gestionamos notificaciones en tu nombre ante cualquier entidad.',
      },
    ],
    targetAudience: [
      { label: 'Empresas que actualizan su RUC',                desc: 'Cambios de domicilio, razón social, régimen tributario o actividad económica.' },
      { label: 'Negocios con deuda tributaria que fraccionar',  desc: 'Que quieren solicitar fraccionamientos o aplazamientos ante SUNAT.' },
      { label: 'Empresas con requerimientos de SUNAT',          desc: 'Que tienen notificaciones o resoluciones que requieren respuesta urgente.' },
      { label: 'Empresas con cambios societarios',              desc: 'Modificaciones de estatutos, cambio de socios o aumento de capital en SUNARP.' },
    ],
    whyItMatters: 'Los trámites ante entidades del Estado tienen plazos estrictos. Un requerimiento de la SUNAT no respondido a tiempo puede generar multas adicionales, embargos preventivos o el cierre del RUC. La SUNARP también tiene plazos que afectan la validez legal de los actos societarios.',
    risksWithout: [
      'Plazos vencidos que convierten requerimientos en multas adicionales',
      'Trámites observados por documentación incompleta o formatos incorrectos',
      'Pérdida de beneficios tributarios por no gestionarlos dentro del plazo',
      'Invalidez de actos societarios no inscritos oportunamente en SUNARP',
    ],
    recommendedSlug: 'contabilidad-general',
  },

  'auditoria': {
    heroStats: [
      { value: '100%', label: 'Independencia e imparcialidad' },
      { value: '+7',   label: 'Años en auditoría' },
      { value: '360°', label: 'Revisión integral' },
    ],
    benefits: [
      {
        title: 'Certeza total sobre tus finanzas',
        desc:  'Verificamos que tus estados financieros reflejen fielmente la situación económica real de tu empresa sin distorsiones.',
      },
      {
        title: 'Detección temprana de irregularidades',
        desc:  'Identificamos inconsistencias, omisiones o fraudes internos antes de que escalen a problemas mayores y costosos.',
      },
      {
        title: 'Credibilidad ante socios e inversionistas',
        desc:  'Un informe de auditoría independiente aumenta la confianza de bancos, inversionistas y socios estratégicos.',
      },
      {
        title: 'Recomendaciones de mejora',
        desc:  'No solo detectamos problemas: también proponemos mejoras concretas en los controles internos de tu organización.',
      },
    ],
    targetAudience: [
      { label: 'Empresas con socios o inversionistas',      desc: 'Que necesitan reportes financieros verificados por un tercero independiente.' },
      { label: 'Negocios que solicitan créditos grandes',   desc: 'Bancos y fondos de inversión pueden exigir estados financieros auditados.' },
      { label: 'Empresas con sospecha de irregularidades',  desc: 'Que quieren una revisión independiente para detectar errores o malversaciones.' },
      { label: 'Organizaciones que rinden cuentas',         desc: 'Asociaciones, ONG o empresas con obligación legal de transparencia financiera.' },
    ],
    whyItMatters: 'La auditoría no es solo para grandes empresas. En un entorno donde los fraudes internos y errores contables son más comunes de lo esperado, una revisión independiente anual puede salvar tu empresa de pérdidas significativas, protegerte legalmente y darte una base sólida para tomar decisiones de inversión.',
    risksWithout: [
      'Errores contables que distorsionan la imagen real de la empresa',
      'Fraudes internos que pueden pasar desapercibidos por años',
      'Pérdida de confianza de socios, inversionistas y entidades financieras',
      'Rechazo de financiamiento por falta de estados financieros verificados',
    ],
    recommendedSlug: 'contabilidad-general',
  },

  'libros-electronicos': {
    heroStats: [
      { value: '0',    label: 'Constancias rechazadas' },
      { value: '100%', label: 'Plazos cumplidos' },
      { value: '8',    label: 'Libros gestionados' },
    ],
    benefits: [
      {
        title: 'Archivos TXT correctos desde el inicio',
        desc:  'Generamos los archivos en el formato exacto que exige el SLE-PLE o SLE-PORTAL de la SUNAT, sin rechazos ni reenvíos.',
      },
      {
        title: 'Envío siempre dentro del plazo',
        desc:  'Nunca perdemos la fecha de cierre. Cada libro se valida y envía con días de anticipación para tu tranquilidad.',
      },
      {
        title: 'Constancias archivadas como respaldo',
        desc:  'Guardamos todas las constancias de aceptación de la SUNAT como respaldo ante cualquier fiscalización futura.',
      },
      {
        title: 'Conciliación perfecta con declaraciones',
        desc:  'Verificamos que los libros cuadren con los PDT mensuales para evitar inconsistencias que generen requerimientos.',
      },
    ],
    targetAudience: [
      { label: 'Empresas en Régimen General (>75 UIT)',    desc: 'Obligadas por ley a llevar libros contables en el Sistema de Libros Electrónicos.' },
      { label: 'MYPE Tributario con ventas >300 UIT',      desc: 'Que deben incorporarse al SLE-PLE o SLE-PORTAL según su nivel de ingresos.' },
      { label: 'Empresas que recibieron carta inductiva',  desc: 'Notificadas por la SUNAT para incorporarse al sistema de libros electrónicos.' },
      { label: 'Negocios con contabilidad tercerizada',    desc: 'Que necesitan que su contador externo gestione también los libros electrónicos.' },
    ],
    whyItMatters: 'La SUNAT ha migrado prácticamente todos los libros contables al formato electrónico. Los libros físicos ya no tienen validez tributaria para la mayoría de empresas. Un libro electrónico incorrecto o presentado fuera de plazo genera automáticamente una infracción del artículo 175° del Código Tributario.',
    risksWithout: [
      'Infracción artículo 175° del Código Tributario por libros incorrectos o tardíos',
      'Multas desde 0.3% hasta 3% de los Ingresos Netos anuales',
      'Inconsistencias con declaraciones mensuales que generan requerimientos SUNAT',
      'Sin respaldo documental ante una fiscalización tributaria',
    ],
    recommendedSlug: 'tributacion-sunat',
  },
}
