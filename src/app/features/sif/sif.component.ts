import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
export class SifComponent {
  currentYear = new Date().getFullYear();
  mobileMenuOpen = signal<boolean>(false);
  activeAppTab = signal<string>('hoy');
  activeClinicalTab = signal<string>('segmental');
  formSubmitted = signal<boolean>(false);
  formSuccess = signal<boolean>(false);

  leadForm: FormGroup;

  appTabs: AppTab[] = [
    {
      id: 'hoy',
      title: 'El Día a Día',
      subtitle: 'Hábitos, agua y tomas estructuradas',
      image: 'assets/sif/app/01_hoy.png',
      description: 'El paciente visualiza las tomas de la jornada ordenadas por horas, marca comidas completadas y registra su consumo de agua diario con un simple toque.',
      bullets: [
        'Registro de hidratación interactivo con objetivo diario',
        'Visualización clara de cada comida con sus ingredientes',
        'Alertas y recordatorios automáticos de tomas y citas'
      ]
    },
    {
      id: 'dieta',
      title: 'Menú Detallado',
      subtitle: 'Planes claros sin confusiones',
      image: 'assets/sif/app/02_dieta.png',
      description: 'El plan pautado por el nutricionista accesible desde el bolsillo en cualquier momento. Nada de perder hojas de papel ni PDFs desactualizados.',
      bullets: [
        'Desglose por días de la semana y momentos del día',
        'Alternativas e instrucciones específicas del profesional',
        'Actualización instantánea cuando cambias el menú en clínica'
      ]
    },
    {
      id: 'compra',
      title: 'Lista de la Compra',
      subtitle: 'Generada por IA según el menú',
      image: 'assets/sif/app/03_compra.png',
      description: 'La app agrupa automáticamente los ingredientes necesarios para el menú semanal organizados por categorías del supermercado.',
      bullets: [
        'Organización por frescos, lácteos, despensa y congelados',
        'Checklist interactivo para tachar mientras se compra',
        'Estimación de precios de mercado para mayor comodidad'
      ]
    },
    {
      id: 'evolucion',
      title: 'Progreso y Evolución',
      subtitle: 'Resultados visuales que motivan',
      image: 'assets/sif/app/04_evolucion.png',
      description: 'Gráficas claras que muestran el avance real del paciente entre consultas: peso corporal, masa magra, grasa y adherencia al plan.',
      bullets: [
        'Evolución temporal con curvas de tendencia comprensibles',
        'Historial de mediciones corporales validadas en consulta',
        'Máxima adherencia al ver reflejado su esfuerzo real'
      ]
    }
  ];

  faqs = signal<FaqItem[]>([
    {
      question: '¿Cómo migro mis menús si actualmente uso Word, Excel o PDF?',
      answer: 'Sif te permite importar menús directamente desde documentos o fotografías para convertirlos en pautas editables sin tener que transcribirlos a mano. Además, si prefieres seguir redactando de forma libre, el modo texto convive al 100% con el catálogo nutricional estructurado.',
      isOpen: false
    },
    {
      question: '¿Es obligatorio que todos mis pacientes utilicen la app móvil?',
      answer: 'No, la app es un canal de valor añadido y fidelización para tus pacientes, pero completamente opcional. Todos los menús, pautas y los informes de composición corporal segmental se generan en elegantes PDFs listos para imprimir o enviar por email con el logotipo y colores de tu centro.',
      isOpen: false
    },
    {
      question: '¿Dónde se almacenan los datos de mis pacientes y qué pasa con el RGPD?',
      answer: 'Todos los datos se alojan en servidores de alta seguridad ubicados en territorio de la Unión Europea. La arquitectura multi-tenant garantiza el aislamiento estricto de la información de tu centro y el cumplimiento normativo en materia de protección de datos de salud.',
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

  constructor(private fb: FormBuilder) {
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
      // Simulación de entrega exitosa
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
