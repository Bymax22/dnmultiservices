'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Clock, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  HardHat,
  Truck,
  Wrench,
  Droplets,
  Zap,
  Factory,
  X,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  AlertCircle,
  FileText,
  Building,
  Shield,
  CheckCircle,
  Globe,
  Target,
  Sparkles,
  Languages,
  Globe2
} from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ServiceCategory {
  id: number;
  name: string;
  icon: React.ReactNode;
  questions: string[];
}

interface Language {
  code: 'en' | 'fr' | 'sw';
  name: string;
  flag: string;
  icon: React.ReactNode;
}

export default function DNChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fr' | 'sw'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "🏭 **Welcome to DN Multi Services Supply Ltd!**\n\nI'm your AI assistant here to help with industrial services across **DR Congo** and **Zambia**.\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [robotAnimation, setRobotAnimation] = useState<'idle' | 'wave' | 'bounce'>('idle');

  // Available languages
  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧', icon: <Globe2 className="w-3 h-3" /> },
    { code: 'fr', name: 'Français', flag: '🇫🇷', icon: <Globe2 className="w-3 h-3" /> },
    { code: 'sw', name: 'Swahili', flag: '🇹🇿', icon: <Globe2 className="w-3 h-3" /> }
  ];

  // Service Categories - Translated
  const serviceCategories: { [key: string]: ServiceCategory[] } = {
    en: [
      {
        id: 1,
        name: 'Engineering',
        icon: <HardHat className="w-4 h-4" />,
        questions: [
          "Construction services?",
          "Earth works available?",
          "Safety standards?",
          "Mining site construction?"
        ]
      },
      {
        id: 2,
        name: 'Energy',
        icon: <Zap className="w-4 h-4" />,
        questions: [
          "Solar installations?",
          "Solar equipment supply?",
          "Industrial electrical?",
          "Water pumping systems?"
        ]
      },
      {
        id: 3,
        name: 'Water',
        icon: <Droplets className="w-4 h-4" />,
        questions: [
          "Borehole drilling?",
          "HDPE pipes supply?",
          "Water system design?",
          "Pipe specifications?"
        ]
      },
      {
        id: 4,
        name: 'Petroleum',
        icon: <Factory className="w-4 h-4" />,
        questions: [
          "Fuel supply to mines?",
          "Bulk transportation?",
          "Regulatory compliance?",
          "Emergency fuel supply?"
        ]
      },
      {
        id: 5,
        name: 'Mining',
        icon: <Wrench className="w-4 h-4" />,
        questions: [
          "Mining consumables?",
          "Copper transportation?",
          "Industrial acids?",
          "Heavy equipment?"
        ]
      },
      {
        id: 6,
        name: 'Logistics',
        icon: <Truck className="w-4 h-4" />,
        questions: [
          "Cross-border logistics?",
          "Bulk transportation?",
          "Customs clearance?",
          "Equipment transport?"
        ]
      }
    ],
    fr: [
      {
        id: 1,
        name: 'Ingénierie',
        icon: <HardHat className="w-4 h-4" />,
        questions: [
          "Services de construction?",
          "Travaux de terrassement?",
          "Normes de sécurité?",
          "Construction de site minier?"
        ]
      },
      {
        id: 2,
        name: 'Énergie',
        icon: <Zap className="w-4 h-4" />,
        questions: [
          "Installations solaires?",
          "Fourniture d'équipement solaire?",
          "Électrique industriel?",
          "Systèmes de pompage d'eau?"
        ]
      },
      {
        id: 3,
        name: 'Eau',
        icon: <Droplets className="w-4 h-4" />,
        questions: [
          "Forage de puits?",
          "Fourniture de tuyaux HDPE?",
          "Conception de système d'eau?",
          "Spécifications des tuyaux?"
        ]
      },
      {
        id: 4,
        name: 'Pétrole',
        icon: <Factory className="w-4 h-4" />,
        questions: [
          "Approvisionnement en carburant aux mines?",
          "Transport en vrac?",
          "Conformité réglementaire?",
          "Approvisionnement d'urgence?"
        ]
      },
      {
        id: 5,
        name: 'Mines',
        icon: <Wrench className="w-4 h-4" />,
        questions: [
          "Fournitures minières?",
          "Transport de cuivre?",
          "Acides industriels?",
          "Équipement lourd?"
        ]
      },
      {
        id: 6,
        name: 'Logistique',
        icon: <Truck className="w-4 h-4" />,
        questions: [
          "Logistique transfrontalière?",
          "Transport en vrac?",
          "Dédouanement?",
          "Transport d'équipement?"
        ]
      }
    ],
    sw: [
      {
        id: 1,
        name: 'Uhandisi',
        icon: <HardHat className="w-4 h-4" />,
        questions: [
          "Huduma za ujenzi?",
          "Kazi za udongo zipo?",
          "Viwanja vya usalama?",
          "Ujenzi wa tovuti ya madini?"
        ]
      },
      {
        id: 2,
        name: 'Nishati',
        icon: <Zap className="w-4 h-4" />,
        questions: [
          "Usakinishaji wa solar?",
          "Ugavi wa vifaa vya solar?",
          "Umeme wa viwandani?",
          "Mifumo ya kusukuma maji?"
        ]
      },
      {
        id: 3,
        name: 'Maji',
        icon: <Droplets className="w-4 h-4" />,
        questions: [
          "Uchimbaji wa kisima?",
          "Ugavi wa mabomba HDPE?",
          "Ubunifu wa mfumo wa maji?",
          "Vipimo vya bomba?"
        ]
      },
      {
        id: 4,
        name: 'Mafuta',
        icon: <Factory className="w-4 h-4" />,
        questions: [
          "Ugavi wa mafuta kwa migodi?",
          "Usafirishaji wingi?",
          "Uzingatiaji wa sheria?",
          "Ugavi wa dharura?"
        ]
      },
      {
        id: 5,
        name: 'Madini',
        icon: <Wrench className="w-4 h-4" />,
        questions: [
          "Vifaa vya madini?",
          "Usafirishaji wa shaba?",
          "Asidi za viwandani?",
          "Vifaa vizito?"
        ]
      },
      {
        id: 6,
        name: 'Usafirishaji',
        icon: <Truck className="w-4 h-4" />,
        questions: [
          "Usafirishaji kupita mipaka?",
          "Usafirishaji wingi?",
          "Uvunjaji wa forodha?",
          "Usafirishaji wa vifaa?"
        ]
      }
    ]
  };

  // WhatsApp contacts
  const whatsappContacts = [
    {
      country: { en: 'DR Congo', fr: 'RD Congo', sw: 'Kongo' },
      phone: '243972329000',
      icon: <Globe className="w-3 h-3" />,
      color: 'from-[#1185AE] to-[#0d6b8a]'
    },
    {
      country: { en: 'Zambia', fr: 'Zambie', sw: 'Zambia' },
      phone: '260951864994',
      icon: <Target className="w-3 h-3" />,
      color: 'from-[#BD2227] to-[#9a1b1f]'
    }
  ];

  // Placeholder text translations
  const placeholders = {
    en: "Type your message here...",
    fr: "Tapez votre message ici...",
    sw: "Andika ujumbe wako hapa..."
  };

  // Enhanced local knowledge responses with translations
  const getLocalResponse = (userMessage: string, lang: 'en' | 'fr' | 'sw'): string => {
    const msg = userMessage.toLowerCase().trim();
    
    // Language-specific responses
    const responses = {
      en: {
        greetings: "Hello! 👋 I'm DN Assistant from **DN Multi Services Supply Ltd**. We provide comprehensive industrial services across **DR Congo** and **Zambia**. How can I assist you today?",
        company: "🏭 **DN Multi Services Supply Ltd** is a cross-border industrial services company operating in DR Congo and Zambia since 2014. We specialize in:\n\n🔹 Mining Support & Supplies\n🔹 Engineering & Construction\n🔹 Energy & Solar Solutions\n🔹 Water Systems & Infrastructure\n🔹 Petroleum Supply\n🔹 Logistics & Transportation\n\n✅ **QHSE Certified** | ✅ **Cross-border Operations** | ✅ **24/7 Support**",
        engineering: "🏗️ **Engineering & Construction Services:**\n\n• Civil Engineering & Building Construction\n• Earth Works (Excavation, Trenching, Grading)\n• Mining Infrastructure Development\n• Industrial Plant Construction\n• Project Management & Execution\n\n📍 **Locations:** DRC & Zambia\n🛡️ **Standards:** ISO 9001, QHSE Certified\n⚡ **Capacity:** Projects up to $5M value",
        energy: "⚡ **Energy & Electrical Solutions:**\n\n• Commercial/Industrial Solar Systems\n• Solar-powered Water Pumping\n• Electrical Installations & Maintenance\n• Generator Systems & UPS\n• Energy Storage Solutions\n\n🔧 **Equipment:** Tier 1 solar panels\n📏 **Capacity:** 1kW to 1MW systems\n🔋 **Warranty:** 25-year panel warranty",
        water: "💧 **Water Systems & HDPE Solutions:**\n\n• Borehole Drilling (100m-300m depth)\n• HDPE Piping Systems (PE100 Material)\n• Water Reticulation Networks\n• Pump Installation & Maintenance\n• Storage Tank Systems\n\n📊 **HDPE Specifications:**\n- PE100 Material Grade\n- SDR 11 & 17 Available\n- PN 10 & 16 Pressure Ratings\n- UV Stabilized & Corrosion Resistant\n- 50+ Year Lifespan",
        petroleum: "⛽ **Petroleum Supply Services:**\n\n• Diesel & Petrol Supply for Mining/Industrial\n• Bulk Fuel Transportation\n• Lubricants & Industrial Oils\n• Emergency Fuel Supply\n• Compliance & Risk Management\n\n🚛 **Capacity:** 10,000 to 100,000 liters\n📜 **Compliance:** Full DRC & Zambia Regulations\n⚡ **Delivery:** 24-72 hours depending on location",
        mining: "⛏️ **Mining Support Services:**\n\n• Mining Consumables Supply\n• Copper & Mineral Transportation\n• Industrial Acids (Sulphuric, Hydrochloric)\n• Coal Supply for Processing\n• Heavy Equipment Rental/Sale\n• Spare Parts Supply\n\n🧪 **Acids Available:** Sulphuric, Hydrochloric, Nitric\n🚚 **Transport:** Bulk Tankers, Secure Logistics\n🛡️ **Safety:** MSDS Compliant Handling",
        logistics: "🚚 **Logistics & Transportation:**\n\n• DRC-Zambia Cross-border Logistics\n• Bulk Material Transportation\n• Heavy Machinery Transport\n• Hazardous Materials Handling\n• Customs Clearance Support\n\n📦 **Fleet:** 10-ton to 40-ton Capacity\n🌍 **Routes:** Lubumbashi-Kasumbalesa Corridor\n🛡️ **Insurance:** Full Cargo Coverage",
        contactZambia: "🇿🇲 **Zambia Office:**\n\n📍 **Address:** 1st Street, House No. 3, Nkana West, Kitwe\n📞 **Phone:** +260 770 970 511 / +260 979 130 958\n📱 **WhatsApp:** +260 951 864 994\n📧 **Email:** info@dnmultiservices.com\n🕒 **Hours:** Mon-Fri 8:00-17:00 | Sat 8:00-13:00",
        contactDRC: "🇨🇩 **DR Congo Office:**\n\n📍 **Address:** No. 534, Avenue Kilela Balanda, Quartier Makutano, Lubumbashi\n📞 **Phone:** +243 97 232 9000 / +243 85 466 7976\n📱 **WhatsApp:** +243 972 329 000\n📧 **Email:** info@dnmultiservices.com\n🕒 **Hours:** Mon-Fri 8:00-17:00 | Sat 8:00-13:00",
        contactGeneral: "📞 **Contact Information:**\n\n**Zambia:** +260 770 970 511\n**DR Congo:** +243 97 232 9000\n\n📱 **WhatsApp:**\nDRC: +243 972 329 000\nZambia: +260 951 864 994\n\n📧 **Email:** info@dnmultiservices.com\n\n📍 **Cross-border operations** between DRC & Zambia",
        pricing: "💰 **For Accurate Quotations:**\n\nPlease provide:\n1. **Service Required** (Engineering, Energy, etc.)\n2. **Project Location** (DRC or Zambia)\n3. **Quantity/Volume** needed\n4. **Timeline** requirements\n5. **Specific Requirements**\n\n📝 **Contact for Quotes:**\n• Website Form: www.dnmultiservices.com/contact\n• Email: info@dnmultiservices.com\n• WhatsApp: +243 972 329 000 / +260 951 864 994\n\n⏱️ **Response Time:** 24-48 hours for detailed quotes",
        whatsapp: "📱 **WhatsApp Contacts:**\n\n🇨🇩 **DR Congo:** +243 972 329 000\n🇿🇲 **Zambia:** +260 951 864 994\n\n💬 **Response Time:** Within 15 minutes during business hours (8:00-17:00)\n\n📍 **Services via WhatsApp:**\n• Instant quotes\n• Service inquiries\n• Emergency support\n• Project consultations",
        default: "Thank you for your inquiry! 🤖\n\nFor specific information, please:\n1. Select a service category above\n2. Ask about a specific service\n3. Contact us directly for immediate assistance\n\n📞 **Direct Contacts:**\nWhatsApp DRC: +243 972 329 000\nWhatsApp Zambia: +260 951 864 994\nEmail: info@dnmultiservices.com\n\nWe're here to help with your industrial needs!"
      },
      fr: {
        greetings: "Bonjour ! 👋 Je suis l'Assistant DN de **DN Multi Services Supply Ltd**. Nous fournissons des services industriels complets à travers la **RD Congo** et la **Zambie**. Comment puis-je vous aider aujourd'hui ?",
        company: "🏭 **DN Multi Services Supply Ltd** est une société de services industriels transfrontalière opérant en RD Congo et en Zambie depuis 2014. Nous sommes spécialisés dans :\n\n🔹 Soutien minier & Fournitures\n🔹 Ingénierie & Construction\n🔹 Solutions énergétiques & solaires\n🔹 Systèmes d'eau & Infrastructure\n🔹 Approvisionnement en pétrole\n🔹 Logistique & Transport\n\n✅ **Certifié QHSE** | ✅ **Opérations transfrontalières** | ✅ **Support 24/7**",
        engineering: "🏗️ **Services d'Ingénierie & Construction :**\n\n• Ingénierie civile & Construction de bâtiments\n• Travaux de terrassement (Excavation, Tran chée, Nivellement)\n• Développement d'infrastructures minières\n• Construction d'usines industrielles\n• Gestion & Exécution de projets\n\n📍 **Localisations :** RDC & Zambie\n🛡️ **Normes :** ISO 9001, Certifié QHSE\n⚡ **Capacité :** Projets jusqu'à 5M$",
        energy: "⚡ **Solutions Énergétiques & Électriques :**\n\n• Systèmes solaires commerciaux/industriels\n• Pompage d'eau solaire\n• Installations & Maintenance électriques\n• Groupes électrogènes & UPS\n• Solutions de stockage d'énergie\n\n🔧 **Équipement :** Panneaux solaires de niveau 1\n📏 **Capacité :** Systèmes de 1kW à 1MW\n🔋 **Garantie :** 25 ans sur les panneaux",
        water: "💧 **Systèmes d'Eau & Solutions HDPE :**\n\n• Forage de puits (profondeur 100m-300m)\n• Systèmes de tuyauterie HDPE (Matériau PE100)\n• Réseaux de distribution d'eau\n• Installation & Maintenance de pompes\n• Systèmes de réservoirs de stockage\n\n📊 **Spécifications HDPE :**\n- Matériau PE100\n- SDR 11 & 17 Disponibles\n- Classes de pression PN 10 & 16\n- Stabilisé UV & Résistant à la corrosion\n- Durée de vie 50+ ans",
        petroleum: "⛽ **Services d'Approvisionnement en Pétrole :**\n\n• Approvisionnement en diesel & essence pour mines/industrie\n• Transport de carburant en vrac\n• Lubrifiants & Huiles industrielles\n• Approvisionnement d'urgence\n• Conformité & Gestion des risques\n\n🚛 **Capacité :** 10 000 à 100 000 litres\n📜 **Conformité :** Règlements RDC & Zambie complets\n⚡ **Livraison :** 24-72 heures selon l'emplacement",
        mining: "⛏️ **Services de Soutien Minier :**\n\n• Fournitures de consommables miniers\n• Transport de cuivre & minéraux\n• Acides industriels (Sulfurique, Chlorhydrique)\n• Approvisionnement en charbon pour traitement\n• Location/Vente d'équipement lourd\n• Fourniture de pièces détachées\n\n🧪 **Acides Disponibles :** Sulfurique, Chlorhydrique, Nitrique\n🚚 **Transport :** Citernes en vrac, Logistique sécurisée\n🛡️ **Sécurité :** Manipulation conforme MSDS",
        logistics: "🚚 **Logistique & Transport :**\n\n• Logistique transfrontalière RDC-Zambie\n• Transport de matériaux en vrac\n• Transport de machinerie lourde\n• Manipulation de matières dangereuses\n• Soutien au dédouanement\n\n📦 **Flotte :** Capacité 10 à 40 tonnes\n🌍 **Itinéraires :** Corridor Lubumbashi-Kasumbalesa\n🛡️ **Assurance :** Couverture complète de la cargaison",
        contactZambia: "🇿🇲 **Bureau Zambie :**\n\n📍 **Adresse :** 1ère Rue, Maison No. 3, Nkana Ouest, Kitwe\n📞 **Téléphone :** +260 770 970 511 / +260 979 130 958\n📱 **WhatsApp :** +260 951 864 994\n📧 **Email :** info@dnmultiservices.com\n🕒 **Heures :** Lun-Ven 8:00-17:00 | Sam 8:00-13:00",
        contactDRC: "🇨🇩 **Bureau RD Congo :**\n\n📍 **Adresse :** No. 534, Avenue Kilela Balanda, Quartier Makutano, Lubumbashi\n📞 **Téléphone :** +243 97 232 9000 / +243 85 466 7976\n📱 **WhatsApp :** +243 972 329 000\n📧 **Email :** info@dnmultiservices.com\n🕒 **Heures :** Lun-Ven 8:00-17:00 | Sam 8:00-13:00",
        contactGeneral: "📞 **Informations de Contact :**\n\n**Zambie :** +260 770 970 511\n**RD Congo :** +243 97 232 9000\n\n📱 **WhatsApp :**\nRDC : +243 972 329 000\nZambie : +260 951 864 994\n\n📧 **Email :** info@dnmultiservices.com\n\n📍 **Opérations transfrontalières** entre RDC & Zambie",
        pricing: "💰 **Pour des Devis Précis :**\n\nVeuillez fournir :\n1. **Service Requis** (Ingénierie, Énergie, etc.)\n2. **Localisation du Projet** (RDC ou Zambie)\n3. **Quantité/Volume** nécessaire\n4. **Délais** requis\n5. **Exigences Spécifiques**\n\n📝 **Contact pour Devis :**\n• Formulaire Web : www.dnmultiservices.com/contact\n• Email : info@dnmultiservices.com\n• WhatsApp : +243 972 329 000 / +260 951 864 994\n\n⏱️ **Temps de Réponse :** 24-48 heures pour devis détaillés",
        whatsapp: "📱 **Contacts WhatsApp :**\n\n🇨🇩 **RD Congo :** +243 972 329 000\n🇿🇲 **Zambie :** +260 951 864 994\n\n💬 **Temps de Réponse :** Sous 15 minutes pendant les heures de bureau (8:00-17:00)\n\n📍 **Services via WhatsApp :**\n• Devis instantanés\n• Demandes de service\n• Support d'urgence\n• Consultations de projet",
        default: "Merci pour votre demande ! 🤖\n\nPour des informations spécifiques, veuillez :\n1. Sélectionner une catégorie de service ci-dessus\n2. Demander un service spécifique\n3. Nous contacter directement pour une assistance immédiate\n\n📞 **Contacts Directs :**\nWhatsApp RDC : +243 972 329 000\nWhatsApp Zambie : +260 951 864 994\nEmail : info@dnmultiservices.com\n\nNous sommes là pour vous aider avec vos besoins industriels !"
      },
      sw: {
        greetings: "Hujambo! 👋 Mimi ni Msaidizi wa DN kutoka **DN Multi Services Supply Ltd**. Tunatoa huduma za viwandani kamili kote **Kongo** na **Zambia**. Ninaweza kukusaidia vipi leo?",
        company: "🏭 **DN Multi Services Supply Ltd** ni kampuni ya huduma za viwandani inayofanya kazi nchini Kongo na Zambia tangu 2014. Tunajihusisha na:\n\n🔹 Usaidizi wa Madini & Ugavi\n🔹 Uhandisi & Ujenzi\n🔹 Uchumi wa Nishati & Solar\n🔹 Mifumo ya Maji & Miundombinu\n🔹 Ugavi wa Mafuta\n🔹 Usafirishaji & Usafiri\n\n✅ **Imesajiliwa QHSE** | ✅ **Operesheni za Kupita Mipaka** | ✅ **Usaidizi 24/7**",
        engineering: "🏗️ **Huduma za Uhandisi & Ujenzi:**\n\n• Uhandisi wa Majengo & Ujenzi wa Majengo\n• Kazi za Udongo (Uchimbaji, Mfereji, Usawa)\n• Ujenzi wa Miundombinu ya Madini\n• Ujenzi wa Kiwanda cha Viwanda\n• Usimamizi & Utekelezaji wa Miradi\n\n📍 **Maeneo:** Kongo & Zambia\n🛡️ **Viwanja:** ISO 9001, Imesajiliwa QHSE\n⚡ **Uwezo:** Miradi hadi $5M",
        energy: "⚡ **Uchumi wa Nishati & Umeme:**\n\n• Mifumo ya Solar ya Kibiashara/Viwandani\n• Kusukuma Maji kwa Nishati ya Solar\n• Usakinishaji & Matengenezo ya Umeme\n• Mifumo ya Jenereta & UPS\n• Uchumi wa Uhifadhi wa Nishati\n\n🔧 **Vifaa:** Paneli za solar za kiwango cha 1\n📏 **Uwezo:** Mifumo ya 1kW hadi 1MW\n🔋 **Dhamana:** Miaka 25 kwa paneli",
        water: "💧 **Mifumo ya Maji & Uchumi wa HDPE:**\n\n• Uchimbaji wa Visima (Kina 100m-300m)\n• Mifumo ya Mabomba HDPE (Nyenzo PE100)\n• Mitandao ya Kusambaza Maji\n• Usakinishaji & Matengenezo ya Pampu\n• Mifumo ya Matangi ya Kuhifadhi\n\n📊 **Vipimo vya HDPE:**\n- Nyenzo PE100\n- SDR 11 & 17 Inapatikana\n- Viwango vya Shinikizo PN 10 & 16\n- Imesimamishwa UV & Inakabili na Kutu\n- Maisha ya Miaka 50+",
        petroleum: "⛽ **Huduma za Ugavi wa Mafuta:**\n\n• Ugavi wa Dizeli & Petroli kwa Migodi/Viwanda\n• Usafirishaji wa Mafuta Wingi\n• Mafuta ya Kuchochea & Mafuta ya Viwanda\n• Ugavi wa Haraka wa Mafuta\n• Uzingatiaji wa Sheria & Usimamizi wa Hatari\n\n🚛 **Uwezo:** Lita 10,000 hadi 100,000\n📜 **Uzingatiaji:** Sheria Kamili za Kongo & Zambia\n⚡ **Uwasilishaji:** Saa 24-72 kulingana na eneo",
        mining: "⛏️ **Huduma za Usaidizi wa Madini:**\n\n• Ugavi wa Vifaa vya Madini\n• Usafirishaji wa Shaba na Madini\n• Asidi za Viwanda (Sulfuri, Hydrokloridi)\n• Ugavi wa Makaa kwa Usindikaji\n• Kukodisha/Kuuza Vifaa Vizito\n• Ugavi wa Sehemu za Ziada\n\n🧪 **Asidi Zilizopo:** Sulfuri, Hydrokloridi, Nitriki\n🚚 **Usafirishaji:** Matanki ya Wingi, Usafirishaji Salama\n🛡️ **Usalama:** Ushughulikaji unaofuata MSDS",
        logistics: "🚚 **Usafirishaji & Usafiri:**\n\n• Usafirishaji wa Kupita Mipaka Kongo-Zambia\n• Usafirishaji wa Nyenzo Wingi\n• Usafirishaji wa Mashine Nzito\n• Ushughulikaji wa Nyenzo Hatari\n• Usaidizi wa Kuvunja Forodha\n\n📦 **Meli:** Uwezo wa Tani 10 hadi 40\n🌍 **Njia:** Mkorogo wa Lubumbashi-Kasumbalesa\n🛡️ **Bima:** Ulinzi Kamili wa Shehena",
        contactZambia: "🇿🇲 **Ofisi ya Zambia:**\n\n📍 **Anwani:** Mtaa wa 1, Nyumba No. 3, Nkana Magharibi, Kitwe\n📞 **Simu:** +260 770 970 511 / +260 979 130 958\n📱 **WhatsApp:** +260 951 864 994\n📧 **Barua pepe:** info@dnmultiservices.com\n🕒 **Saa:** Jumatatu-Ijumaa 8:00-17:00 | Jumamosi 8:00-13:00",
        contactDRC: "🇨🇩 **Ofisi ya Kongo:**\n\n📍 **Anwani:** No. 534, Barabara ya Kilela Balanda, Kata ya Makutano, Lubumbashi\n📞 **Simu:** +243 97 232 9000 / +243 85 466 7976\n📱 **WhatsApp:** +243 972 329 000\n📧 **Barua pepe:** info@dnmultiservices.com\n🕒 **Saa:** Jumatatu-Ijumaa 8:00-17:00 | Jumamosi 8:00-13:00",
        contactGeneral: "📞 **Maelezo ya Mawasiliano:**\n\n**Zambia:** +260 770 970 511\n**Kongo:** +243 97 232 9000\n\n📱 **WhatsApp:**\nKongo: +243 972 329 000\nZambia: +260 951 864 994\n\n📧 **Barua pepe:** info@dnmultiservices.com\n\n📍 **Operesheni za kupita mipaka** kati ya Kongo & Zambia",
        pricing: "💰 **Kwa Bei Kamili:**\n\nTafadhali toa:\n1. **Huduma Inayotakiwa** (Uhandisi, Nishati, nk)\n2. **Eneo la Mradi** (Kongo au Zambia)\n3. **Kiasi/Ukubwa** unahitajika\n4. **Muda** unahitajika\n5. **Mahitaji Maalum**\n\n📝 **Mawasiliano kwa Bei:**\n• Fomu ya Wavuti: www.dnmultiservices.com/contact\n• Barua pepe: info@dnmultiservices.com\n• WhatsApp: +243 972 329 000 / +260 951 864 994\n\n⏱️ **Muda wa Majibu:** Saa 24-48 kwa bei kamili",
        whatsapp: "📱 **Mawasiliano ya WhatsApp:**\n\n🇨🇩 **Kongo:** +243 972 329 000\n🇿🇲 **Zambia:** +260 951 864 994\n\n💬 **Muda wa Majibu:** Ndani ya dakika 15 wakati wa masaa ya kazi (8:00-17:00)\n\n📍 **Huduma kupitia WhatsApp:**\n• Bei haraka\n• Utafiti wa huduma\n• Usaidizi wa dharura\n• Mashauriano ya miradi",
        default: "Asante kwa ombi lako! 🤖\n\nKwa maelezo maalum, tafadhali:\n1. Chagua kategoria ya huduma hapo juu\n2. Uliza kuhusu huduma maalum\n3. Wasiliana nasi moja kwa moja kwa usaidizi wa haraka\n\n📞 **Mawasiliano ya Moja kwa Moja:**\nWhatsApp Kongo: +243 972 329 000\nWhatsApp Zambia: +260 951 864 994\nBarua pepe: info@dnmultiservices.com\n\nTuko hapa kukusaidia na mahitaji yako ya viwandani!"
      }
    };

    const langResponses = responses[lang];

    // Greetings
    if (/hello|hi|hey|good morning|good afternoon|bonjour|salut|hujambo|habari/.test(msg)) {
      return langResponses.greetings;
    }

    // Company info
    if (/company|about|who are you|société|qui êtes-vous|kampuni|wewe ni nani/.test(msg)) {
      return langResponses.company;
    }

    // Services
    if (/engineering|construction|ingénierie|construction|uhandisi|ujenzi/.test(msg)) {
      return langResponses.engineering;
    }
    
    if (/energy|solar|power|énergie|solaire|nishati|jua/.test(msg)) {
      return langResponses.energy;
    }
    
    if (/water|borehole|pipe|hdpe|eau|forage|tuyau|maji|kisima|bomba/.test(msg)) {
      return langResponses.water;
    }
    
    if (/petroleum|fuel|diesel|pétrole|carburant|mafuta|dizeli/.test(msg)) {
      return langResponses.petroleum;
    }
    
    if (/mining|copper|acid|mines|cuivre|acide|madini|shaba|asidi/.test(msg)) {
      return langResponses.mining;
    }
    
    if (/logistics|transport|shipping|logistique|transport|usafirishaji|usafiri/.test(msg)) {
      return langResponses.logistics;
    }

    // Contacts
    if (/contact|phone|address|where|contact|téléphone|adresse|où|mawasiliano|simu|anwani|wapi/.test(msg)) {
      if (msg.includes('zambia') || msg.includes('zambie')) {
        return langResponses.contactZambia;
      }
      if (msg.includes('drc') || msg.includes('congo') || msg.includes('rdc')) {
        return langResponses.contactDRC;
      }
      return langResponses.contactGeneral;
    }

    // Pricing
    if (/price|cost|quote|how much|prix|coût|devis|combien|bei|gharama|ni kiasi gani/.test(msg)) {
      return langResponses.pricing;
    }

    // WhatsApp
    if (/whatsapp|chat|message|whatsapp|discuter|message|whatsapp|mazungumzo|ujumbe/.test(msg)) {
      return langResponses.whatsapp;
    }

    // Default
    return langResponses.default;
  };

  // Welcome message based on selected language
  const welcomeMessages = {
    en: "🏭 **Welcome to DN Multi Services Supply Ltd!**\n\nI'm your AI assistant here to help with industrial services across **DR Congo** and **Zambia**.\n\nHow can I assist you today?",
    fr: "🏭 **Bienvenue à DN Multi Services Supply Ltd !**\n\nJe suis votre assistant IA ici pour aider avec les services industriels à travers la **RD Congo** et la **Zambie**.\n\nComment puis-je vous aider aujourd'hui ?",
    sw: "🏭 **Karibu kwa DN Multi Services Supply Ltd!**\n\nMimi ni msaidizi wako wa AI hapa kusaidia na huduma za viwandani kote **Kongo** na **Zambia**.\n\nNinaweza kukusaidia vipi leo?"
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Robot animation on hover
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setRobotAnimation(Math.random() > 0.7 ? 'wave' : 'bounce');
        setTimeout(() => setRobotAnimation('idle'), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const clearChat = () => {
    if (confirm(selectedLanguage === 'en' ? 'Clear conversation history?' : 
                selectedLanguage === 'fr' ? 'Effacer l\'historique de la conversation ?' : 
                'Futa historia ya mazungumzo?')) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: welcomeMessages[selectedLanguage],
          timestamp: new Date()
        }
      ]);
    }
  };

  const openWhatsApp = (phone: string, countryName: string) => {
    const messages = {
      en: `Hello DN Multi Services, I need assistance with your industrial services in ${countryName}`,
      fr: `Bonjour DN Multi Services, j'ai besoin d'assistance avec vos services industriels en ${countryName}`,
      sw: `Hujambo DN Multi Services, Nahitaji usaidizi na huduma zako za viwandani nchini ${countryName}`
    };
    const message = messages[selectedLanguage];
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get response from local knowledge
    const response = getLocalResponse(userMessage, selectedLanguage);
    
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && input.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const changeLanguage = (lang: 'en' | 'fr' | 'sw') => {
    setSelectedLanguage(lang);
    setShowLanguageMenu(false);
    
    // Update welcome message
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: welcomeMessages[lang],
        timestamp: new Date()
      }
    ]);
  };

  // Animated Robot Floating Button (closed state)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setRobotAnimation('wave')}
        onMouseLeave={() => setRobotAnimation('idle')}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open chat with DN Multi Services"
      >
        {/* Glowing effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1185AE]/20 to-[#BD2227]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse-slow"></div>
        
        {/* Main button with glass morphism */}
        <div className="relative glass-morphism border border-white/20 backdrop-blur-xl rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110">
          {/* Animated robot icon */}
          <div className="relative">
            <div className={`transform transition-all duration-500 ${
              robotAnimation === 'wave' ? 'animate-robot-wave' : 
              robotAnimation === 'bounce' ? 'animate-robot-bounce' : ''
            }`}>
              <Bot 
                size={28} 
                className="text-white drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
            </div>
            
            {/* Animated eyes */}
            <div className="absolute -top-1 -right-1 flex space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
            <div className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Hover text */}
          <div className="absolute -top-12 right-0 bg-black/80 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {selectedLanguage === 'en' ? 'Ask DN Assistant' : 
             selectedLanguage === 'fr' ? 'Demander à l\'Assistant DN' : 
             'Uliza Msaidizi DN'}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
          </div>
        </div>
      </button>
    );
  }

  // Open state - Glass Morphism Chat Window
  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-96 md:h-[600px] z-50 flex flex-col glass-morphism border border-white/20 backdrop-blur-xl md:rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#1185AE] text-white p-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">DN Assistant</h3>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="flex items-center gap-1">
                  <Building size={12} />
                  <span>Industrial Solutions</span>
                </div>
                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Shield size={12} />
                  <span>QHSE Certified</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 hover:bg-white/10 rounded-lg transition backdrop-blur-sm flex items-center gap-1"
                title={selectedLanguage === 'en' ? 'Change language' : 
                       selectedLanguage === 'fr' ? 'Changer de langue' : 
                       'Badilisha lugha'}
              >
                <Languages size={16} />
                <span className="text-xs">{languages.find(l => l.code === selectedLanguage)?.flag}</span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm w-full hover:bg-[#1185AE]/20 transition ${
                        selectedLanguage === lang.code ? 'bg-[#1185AE]/30' : 'text-gray-800'
                      }`}
                    >
                      {lang.icon}
                      <span>{lang.flag} {lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/10 rounded-lg transition backdrop-blur-sm"
              title={selectedLanguage === 'en' ? 'Clear chat' : 
                     selectedLanguage === 'fr' ? 'Effacer la discussion' : 
                     'Futa mazungumzo'}
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition backdrop-blur-sm"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container - Glass background */}
      <div className="flex-1 overflow-y-auto p-4 bg-white/5 backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 animate-fade-in ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className={`flex items-start gap-3 max-w-full ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'assistant' && (
                <div className="bg-[#1185AE] p-2 rounded-lg flex-shrink-0 shadow-lg">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg ${
                    message.role === 'user'
                      ? 'bg-[#1185AE] text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </div>
                <div className={`text-xs mt-1 px-1 ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {format(message.timestamp, 'h:mm a')}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="bg-gray-700 p-2 rounded-lg flex-shrink-0 shadow-lg">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 text-gray-400 animate-fade-in">
            <div className="bg-[#1185AE] p-2 rounded-lg shadow-lg">
              <Bot size={16} className="text-white animate-pulse" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-400">
                {selectedLanguage === 'en' ? 'DN Assistant is thinking...' : 
                 selectedLanguage === 'fr' ? "L'Assistant DN réfléchit..." : 
                 'Msaidizi DN anafikira...'}
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Service Quick Links - Glass effect */}
      <div className="border-t border-white/20 bg-white/10 backdrop-blur-sm p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-white flex items-center gap-1">
            <HelpCircle size={14} />
            {selectedLanguage === 'en' ? 'Quick Service Access' : 
             selectedLanguage === 'fr' ? 'Accès Rapide aux Services' : 
             'Ufikiaji wa Huduma Haraka'}
          </p>
          <Sparkles size={12} className="text-yellow-300" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {serviceCategories[selectedLanguage].map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveService(activeService === category.name ? null : category.name)}
              className={`text-xs px-2 py-2 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 backdrop-blur-sm ${
                activeService === category.name
                  ? 'bg-[#1185AE] text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30 hover:shadow-md'
              }`}
            >
              <div className={activeService === category.name ? 'scale-110' : ''}>
                {category.icon}
              </div>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Service-specific Questions */}
        {activeService && (
          <div className="border-t border-white/20 pt-3 mt-3 animate-slide-down">
            <p className="text-xs font-medium text-white/90 mb-2">
              {selectedLanguage === 'en' ? `Quick questions about ${activeService}:` : 
               selectedLanguage === 'fr' ? `Questions rapides sur ${activeService}:` : 
               `Maswali haraka kuhusu ${activeService}:`}
            </p>
            <div className="flex flex-wrap gap-1">
              {serviceCategories[selectedLanguage]
                .find(s => s.name === activeService)
                ?.questions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1.5 rounded-lg flex items-center gap-1 transition backdrop-blur-sm"
                    disabled={isLoading}
                  >
                    <span className="truncate max-w-[100px]">{question}</span>
                    <ChevronRight size={10} />
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Contacts */}
      <div className="border-t border-white/20 bg-white/5 backdrop-blur-sm p-3">
        <p className="text-sm font-medium text-white mb-2">
          {selectedLanguage === 'en' ? 'Direct WhatsApp Contact:' : 
           selectedLanguage === 'fr' ? 'Contact WhatsApp Direct:' : 
           'Mawasiliano ya WhatsApp Moja kwa Moja:'}
        </p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {whatsappContacts.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => openWhatsApp(contact.phone, contact.country[selectedLanguage])}
              className={`${idx === 0 ? 'bg-[#1185AE]' : 'bg-[#BD2227]'} text-white text-sm py-2 px-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm`}
            >
              <MessageCircle size={14} />
              <span className="font-medium">{contact.country[selectedLanguage]}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <a
            href="mailto:info@dnmultiservices.com"
            className="text-xs text-white hover:text-yellow-200 flex items-center gap-1 transition"
          >
            <Mail size={12} />
            info@dnmultiservices.com
          </a>
        </div>
      </div>

      {/* Input Area - Glass effect */}
      <form onSubmit={handleSubmit} className="border-t border-white/20 bg-white/10 backdrop-blur-sm p-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholders[selectedLanguage]}
            className="flex-1 border border-white/30 bg-white/20 text-white placeholder-white/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1185AE] focus:border-transparent text-sm backdrop-blur-sm"
            disabled={isLoading}
            aria-label={selectedLanguage === 'en' ? 'Type your message' : 
                       selectedLanguage === 'fr' ? 'Tapez votre message' : 
                       'Andika ujumbe wako'}
          />
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#1185AE] text-white p-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            aria-label={selectedLanguage === 'en' ? 'Send message' : 
                       selectedLanguage === 'fr' ? 'Envoyer le message' : 
                       'Tuma ujumbe'}
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-white/70 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1">
              <Phone size={10} />
              <span>
                {selectedLanguage === 'en' ? '24/7 Support Available' : 
                 selectedLanguage === 'fr' ? 'Support 24/7 Disponible' : 
                 'Usaidizi 24/7 Unapatikana'}
              </span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle size={10} />
              <span>QHSE Certified</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Globe size={10} />
              <span>DRC & Zambia</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}