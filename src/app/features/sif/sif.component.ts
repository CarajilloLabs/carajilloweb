import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface AppTab {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  bullets: string[];
}

@Component({
  selector: 'app-sif',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sif.component.html',
  styleUrl: './sif.component.scss'
})
export class SifComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  mobileMenuOpen = signal<boolean>(false);
  activeAppTab = signal<string>('hoy');
  activeClinicalTab = signal<string>('segmental');
  activeBedcaTab = signal<'menu' | 'recetario'>('menu');
  formSubmitted = signal<boolean>(false);
  formSuccess = signal<boolean>(false);

  leadForm: FormGroup;

  private canonicalLinkElement?: HTMLLinkElement;
  private schemaScriptElement?: HTMLScriptElement;

  appTabs: AppTab[] = [
    {
      id: 'hoy',
      title: 'El Día a Día',
      subtitle: 'Hábitos, agua y tomas estructuradas',
      image: 'assets/sif/app/01_hoy.png',
      description: 'El paciente visualiza las tomas de la jornada ordenadas cronológicamente, marca comidas completadas y registra su consumo de agua diario con un contador visual de vasos y litros.',
      bullets: [
        'Registro de hidratación interactivo con meta diaria en vasos y litros',
        'Visualización clara de cada comida con sus ingredientes y gramajes',
        'Alertas y recordatorios automáticos por notificación push'
      ]
    },
    {
      id: 'dieta',
      title: 'Menú y Recetas',
      subtitle: 'Planes claros con raciones dinámicas',
      image: 'assets/sif/app/02_dieta.png',
      description: 'El plan pautado por el nutricionista accesible desde el bolsillo en cualquier momento. Incluye catálogo de recetas con cálculo automático de ingredientes según los comensales o raciones seleccionadas.',
      bullets: [
        'Desglose por días de la semana, tomas e ingredientes exactos',
        'Recetario estructurado con ajuste dinámico de raciones',
        'Descarga e impresión directa del menú en PDF con la marca de tu centro'
      ]
    },
    {
      id: 'compra',
      title: 'Lista de la Compra IA',
      subtitle: 'Por supermercado y pasillo',
      image: 'assets/sif/app/03_compra.png',
      description: 'La app agrupa automáticamente los ingredientes necesarios para el menú semanal organizados por categorías del supermercado, permitiendo seleccionar cadenas habituales con estimación de precios.',
      bullets: [
        'Organización por frescos, lácteos, despensa y refrigerados',
        'Selector de cadenas de supermercados habituales con precios estimados',
        'Checklist interactivo para tachar artículos mientras se compra'
      ]
    },
    {
      id: 'evolucion',
      title: 'Progreso y Evolución',
      subtitle: 'Resultados visuales y segmental',
      image: 'assets/sif/app/04_evolucion.png',
      description: 'Gráficas claras que muestran el avance real del paciente entre consultas: curvas de peso corporal, masa magra, grasa, agua e historial de composición corporal segmental validada en consulta.',
      bullets: [
        'Evolución temporal con curvas de tendencia comprensibles',
        'Composición segmental con índice de Grant y rangos semáforo',
        'Máxima adherencia al ver reflejado su esfuerzo real en cada visita'
      ]
    }
  ];

  faqs = signal<FaqItem[]>([
    {
      question: '¿En qué plataformas está disponible la app móvil de Sif?',
      answer: 'La app móvil está disponible en Google Play Store (Android) y versión web responsive para cualquier dispositivo, con la versión para iOS (iPhone) en proceso de publicación en la Apple App Store. Cuenta con modo dual: los pacientes consultan su dieta, hidratación, recetas dinámicas, compra y citas; y los nutricionistas gestionan su agenda, revisan solicitudes y contactan por llamada o WhatsApp en un toque.',
      isOpen: false
    },
    {
      question: '¿Qué es Nuti y cómo garantiza la privacidad de los datos?',
      answer: 'Nuti es el asistente de inteligencia artificial integrado en Sif. Actúa como copiloto en pantalla: te ayuda a navegar, abrir fichas, registrar mediciones y proponer citas. Opera bajo estricta supervisión humana (nada se guarda en base de datos sin tu aprobación) y nunca emite diagnósticos médicos. Además, la clave de IA se configura por centro (Bring Your Own Key), garantizando que tus datos sanitarios permanecen aislados bajo el RGPD.',
      isOpen: false
    },
    {
      question: '¿Cómo migro mis menús si actualmente uso Word, Excel o PDF?',
      answer: 'Sif te permite importar menús directamente desde documentos o fotografías para convertirlos en pautas editables sin tener que transcribirlos a mano. Además, si prefieres seguir redactando de forma libre, el modo texto convive al 100% con el catálogo nutricional estructurado BEDCA de 48 nutrientes.',
      isOpen: false
    },
    {
      question: '¿Es obligatorio que todos mis pacientes utilicen la app móvil?',
      answer: 'No, la app es un canal de valor añadido y fidelización para tus pacientes, pero completamente opcional. Todos los menús, pautas y los informes de composición corporal segmental se generan en elegantes PDFs listos para imprimir o enviar por email con el logotipo y colores de tu centro.',
      isOpen: false
    },
    {
      question: '¿Cómo funciona el recetario y el ajuste dinámico de raciones?',
      answer: 'Sif incluye un módulo de recetas clínicas donde cada plato escala automáticamente las cantidades y gramajes de sus ingredientes según las raciones o comensales indicados, facilitando pautas para personas que cocinan para su familia o en grupo.',
      isOpen: false
    },
    {
      question: '¿Dónde se almacenan los datos de mis pacientes y qué pasa con el RGPD?',
      answer: 'Todos los datos se alojan en servidores de alta seguridad ubicados en territorio de la Unión Europea. La arquitectura multi-tenant garantiza el aislamiento estricto de la información de tu centro y el cumplimiento riguroso del RGPD en materia de datos sanitarios protegidos.',
      isOpen: false
    },
    {
      question: '¿Cómo funciona la marca blanca de Sif?',
      answer: 'Tu centro es el protagonista absoluto. Puedes configurar tu logotipo oficial, color corporativo primario, datos de contacto y sedes. Tanto la interfaz web, como los informes PDF y la aplicación móvil reflejan la identidad de tu clínica, sin publicidad ni marcas ajenas.',
      isOpen: false
    },
    {
      question: '¿Sirve si en la clínica somos varios nutricionistas o varias sedes?',
      answer: 'Por supuesto. Sif incluye gestión multi-profesional y multi-sede nativa. Puedes asignar carteras de pacientes por nutricionista titular, gestionar suplencias, delimitar roles y permisos (Administrador, Nutricionista, Paciente) y consultar métricas tanto a nivel individual como global del centro.',
      isOpen: false
    },
    {
      question: '¿Cómo se gestiona el coste de la IA para las listas de la compra?',
      answer: 'En Sif creemos en la transparencia total: la clave de IA se configura por centro, de forma que tú mantienes el control directo de los costes y la total propiedad de los datos procesados, sin sobrecostes ocultos en tu suscripción.',
      isOpen: false
    },
    {
      question: '¿Puedo exportar mis datos si algún día decido no continuar?',
      answer: 'Sí. No aplicamos permanencias ni bloqueamos tus datos en formatos propietarios. Dispones de exportación directa en CSV de tu fichero de pacientes y una API REST abierta y documentada con más de 115 operaciones.',
      isOpen: false
    }
  ]);

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.leadForm = this.fb.group({
      leadType: ['demo', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s\-()]{9,15}$/)]],
      clinicName: ['', Validators.required],
      centerType: ['individual', Validators.required],
      message: [''],
      acceptPrivacy: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.applySeoTags();
    this.injectStructuredData();
  }

  ngOnDestroy(): void {
    if (this.canonicalLinkElement && this.canonicalLinkElement.parentNode) {
      this.canonicalLinkElement.parentNode.removeChild(this.canonicalLinkElement);
    }
    if (this.schemaScriptElement && this.schemaScriptElement.parentNode) {
      this.schemaScriptElement.parentNode.removeChild(this.schemaScriptElement);
    }
  }

  private applySeoTags(): void {
    const pageTitle = 'Software para Nutricionistas | Gestión Clínica y App Móvil - Sif';
    const pageDescription = 'Software clínico para nutricionistas: composición corporal segmental, planes BEDCA, agenda inteligente, asistente IA Nuti y app móvil propia.';
    const pageKeywords = 'software para nutricionistas, software nutricion clinica, programa dietistas, asistente ia nutricionistas, nuti asistente clinico, composicion corporal segmental, planes bedca, app pacientes nutricion, software nutricion marca blanca';
    const pageUrl = 'https://carajillolabs.com/sif';
    const imageUrl = 'https://carajillolabs.com/assets/sif/admin/dashboard.png';

    this.titleService.setTitle(pageTitle);

    this.metaService.updateTag({ name: 'description', content: pageDescription });
    this.metaService.updateTag({ name: 'keywords', content: pageKeywords });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: pageDescription });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: pageUrl });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'Carajillolabs' });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: pageTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: pageDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });

    // Canonical link
    this.canonicalLinkElement = this.document.createElement('link');
    this.canonicalLinkElement.setAttribute('rel', 'canonical');
    this.canonicalLinkElement.setAttribute('href', pageUrl);
    this.document.head.appendChild(this.canonicalLinkElement);
  }

  private injectStructuredData(): void {
    const schemaJson = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://carajillolabs.com/sif/#software',
          name: 'Sif',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Android, Web (iOS próximamente)',
          description: 'Software de nutrición clínica y gestión integral para dietistas y centros de nutrición con composición corporal segmental, base oficial BEDCA y app móvil propia.',
          url: 'https://carajillolabs.com/sif',
          featureList: [
            'Nuti: Asistente clínico conversacional con IA y supervisión humana',
            'Composición corporal segmental bilateral con 10 métricas e informe PDF',
            'Planificador de dietas sobre base BEDCA oficial de 48 nutrientes',
            'Importación inteligente de menús desde fotos o documentos PDF con OCR/IA',
            'App móvil propia para pacientes (dieta, agua, compra) y nutricionistas',
            'Agenda con detección de solapes y recordatorios push automáticos',
            'Marca blanca integral con logotipo y colores de la clínica'
          ],
          screenshot: [
            'https://carajillolabs.com/assets/sif/admin/dashboard.png',
            'https://carajillolabs.com/assets/sif/admin/nuti-asistente.png',
            'https://carajillolabs.com/assets/sif/admin/menu.png',
            'https://carajillolabs.com/assets/sif/admin/detalle-paciente-mediciones.png',
            'https://carajillolabs.com/assets/sif/admin/receta-detalle.png'
          ],
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            description: 'Demostración guiada y asesoramiento de migración gratuito'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Carajillolabs',
            url: 'https://carajillolabs.com'
          }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://carajillolabs.com/sif/#faq',
          mainEntity: this.faqs().map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      ]
    };

    this.schemaScriptElement = this.document.createElement('script');
    this.schemaScriptElement.type = 'application/ld+json';
    this.schemaScriptElement.text = JSON.stringify(schemaJson);
    this.document.head.appendChild(this.schemaScriptElement);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  selectAppTab(id: string): void {
    this.activeAppTab.set(id);
  }

  selectClinicalTab(tab: string): void {
    this.activeClinicalTab.set(tab);
  }

  selectBedcaTab(tab: 'menu' | 'recetario'): void {
    this.activeBedcaTab.set(tab);
  }

  toggleFaq(index: number): void {
    this.faqs.update(list =>
      list.map((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : item))
    );
  }

  scrollTo(elementId: string): void {
    this.closeMobileMenu();
    const target = document.getElementById(elementId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onSubmitLead(): void {
    this.formSubmitted.set(true);
    if (this.leadForm.valid) {
      this.formSuccess.set(true);
      this.leadForm.reset({
        leadType: 'demo',
        centerType: 'individual',
        acceptPrivacy: false
      });
      this.formSubmitted.set(false);
    } else {
      this.leadForm.markAllAsTouched();
    }
  }
}
