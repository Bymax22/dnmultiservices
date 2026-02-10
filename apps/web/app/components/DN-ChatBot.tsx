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
  Download,
  FileText
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

export default function DNChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "**Welcome to DN Multi Services Supply Ltd!**\n\nI'm your DN Assistant. I can help you with:\n\n- Engineering & Construction\n- Energy & Solar Solutions\n- Water Systems & Boreholes\n- Petroleum Supply\n- Mining Support Services\n- Cross-border Logistics\n\n*Operating in DR Congo and Zambia with QHSE certification.*\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced Service Categories with more questions
  const serviceCategories: ServiceCategory[] = [
    {
      id: 1,
      name: 'Engineering & Construction',
      icon: <HardHat className="w-4 h-4" />,
      questions: [
        "What construction services do you offer?",
        "Do you do earth works and excavation?",
        "Are you QHSE certified?",
        "Can you work on mining site construction?"
      ]
    },
    {
      id: 2,
      name: 'Energy Solutions',
      icon: <Zap className="w-4 h-4" />,
      questions: [
        "Do you install solar systems for industrial use?",
        "What solar equipment brands do you supply?",
        "Solar-powered water pumping systems?",
        "Industrial electrical installations?"
      ]
    },
    {
      id: 3,
      name: 'Water Systems',
      icon: <Droplets className="w-4 h-4" />,
      questions: [
        "What's your borehole drilling process?",
        "Do you supply and install HDPE pipes?",
        "Water reticulation system design?",
        "What HDPE pipe specifications do you have?"
      ]
    },
    {
      id: 4,
      name: 'Petroleum Supply',
      icon: <Factory className="w-4 h-4" />,
      questions: [
        "Do you supply fuel to remote mining sites?",
        "What petroleum products do you supply?",
        "Bulk fuel transportation capacity?",
        "Are you licensed for hazardous materials?"
      ]
    },
    {
      id: 5,
      name: 'Mining Support',
      icon: <Wrench className="w-4 h-4" />,
      questions: [
        "What mining consumables do you supply?",
        "Do you transport copper and minerals?",
        "Industrial acid and sulphur supply?",
        "Heavy machinery for mining operations?"
      ]
    },
    {
      id: 6,
      name: 'Logistics & Transport',
      icon: <Truck className="w-4 h-4" />,
      questions: [
        "DRC-Zambia cross-border logistics?",
        "Bulk material transportation?",
        "Hazardous materials handling?",
        "Equipment transportation services?"
      ]
    }
  ];

  // WhatsApp contacts with proper formatting
  const whatsappContacts = [
    {
      country: 'DR Congo',
      phone: '243972329000',
      flag: '',
      message: 'Hello DN Multi Services, I need assistance with:'
    },
    {
      country: 'Zambia',
      phone: '260951864994',
      flag: '',
      message: 'Hello DN Multi Services, I need assistance with:'
    }
  ];

  // Enhanced local knowledge base
  const localKnowledge = {
    // Company Information
    company: {
      overview: "**DN Multi Services Supply Ltd** is a cross-border industrial services company operating in **DR Congo** and **Zambia**. We specialize in mining support, engineering, energy solutions, logistics, and industrial supplies with a strong focus on safety, quality, and operational efficiency.",
      history: "Established in 2014, we have grown to become a trusted partner for major industrial projects across the Central African region, with headquarters strategically located to serve both DRC and Zambia markets.",
      certifications: "✅ QHSE Certified\n✅ ISO Standards Compliance\n✅ Licensed for Hazardous Materials\n✅ Registered in both DRC & Zambia\n✅ Insured Operations"
    },
    
    // Services Details
    services: {
      engineering: `**Engineering & Construction Services:**
• Civil Engineering & Building Construction
• Earth Works (Excavation, Trenching, Grading)
• Mining Infrastructure Development
• Industrial Plant Construction
• Safety-compliant Project Execution

*Standards:* ISO 9001, Local Building Codes
*Capacity:* Projects up to $5M value
*Location:* DRC & Zambia operations`,

      energy: `**Energy & Electrical Solutions:**
• Commercial/Industrial Solar Systems
• Solar-powered Water Pumping
• Electrical Installations & Maintenance
• Generator Systems
• Energy Storage Solutions

*Equipment:* Tier 1 solar panels, quality inverters
*Capacity:* 1kW to 1MW systems
*Warranty:* 25-year panel warranty`,

      water: `**Water Systems & Infrastructure:**
• Borehole Drilling (100m-300m depth)
• HDPE Piping Systems (PE100 Material)
• Water Reticulation Networks
• Pump Installation & Maintenance
• Storage Tank Systems

*HDPE Specifications:*
- PE100 Material Grade
- SDR 11 & 17 Available
- PN 10 & 16 Pressure Ratings
- UV Stabilized, Corrosion Resistant
- 50+ Year Lifespan`,

      petroleum: `**Petroleum Supply Services:**
• Diesel & Petrol Supply for Mining
• Bulk Fuel Transportation
• Lubricants & Industrial Oils
• Aviation Fuel (Where Licensed)
• Emergency Fuel Supply

*Capacity:* 10,000 to 100,000 liters
*Transport:* ISO Tankers & Bowser Trucks
*Compliance:* Full DRC & Zambia Regulations`,

      mining: `**Mining Support Services:**
• Mining Consumables Supply
• Copper & Mineral Transportation
• Industrial Acids (Sulphuric, Hydrochloric)
• Coal Supply for Processing
• Heavy Equipment Rental/Sale

*Acids:* Sulphuric, Hydrochloric, Nitric
*Transport:* Bulk Tankers, Secure Logistics
*Safety:* MSDS Compliant Handling`,

      logistics: `**Logistics & Transportation:**
• DRC-Zambia Cross-border Logistics
• Bulk Material Transportation
• Heavy Machinery Transport
• Hazardous Materials Handling
• Customs Clearance Support

*Fleet:* 10-ton to 40-ton Capacity
*Border:* Lubumbashi-Kasumbalesa Route
*Insurance:* Full Cargo Coverage`,

      machinery: `**Heavy Machinery Supply:**
• Excavators & Bulldozers
• Mining Support Equipment
• Agricultural Machinery
• Generator Sets
• Spare Parts Supply

*Brands:* Caterpillar, Komatsu, Hitachi
*Condition:* New & Certified Used
*Support:* Maintenance & Training`,

      hdpe: `**HDPE Pipe Specifications:**
• **Material:** PE100 High-Density Polyethylene
• **Standards:** ISO 4427, SANS 10262
• **Sizes:** 20mm to 630mm Diameter
• **Pressure Classes:** PN10, PN12.5, PN16
• **SDR Ratings:** SDR11, SDR13.6, SDR17

**Applications:**
- Mining Slurry Transportation
- Potable Water Systems
- Industrial Chemical Transport
- Irrigation Systems
- Municipal Water Networks

**Key Features:**
✓ Corrosion Resistant
✓ Chemical Resistant
✓ UV Stabilized
✓ Low Maintenance
✓ 50+ Year Lifespan
✓ Leak-free Joints (Butt Welding)`
    },
    
    // Contact Information
        contacts: {
      zambia: `**ZAMBIA OFFICE:**
    **Address:** 1st Street, House No. 3, Nkana West, Kitwe
    **Phone:** +260 770 970 511 / +260 979 130 958
    **WhatsApp:** +260 951 864 994
    **Email:** info@dnmultiservices.com
    **Hours:** Mon-Fri 8:00-17:00, Sat 8:00-13:00

    **Services in Zambia:**
    • Copperbelt Mining Support
    • Industrial Supply Chain
    • Construction Projects
    • Energy Solutions`,

      drc: `**DR CONGO OFFICE:**
    **Address:** No. 534, Avenue Kilela Balanda, Quartier Makutano, Lubumbashi
    **Phone:** +243 97 232 9000 / +243 85 466 7976
    **WhatsApp:** +243 972 329 000
    **Email:** info@dnmultiservices.com
    **Hours:** Mon-Fri 8:00-17:00, Sat 8:00-13:00

    **Services in DRC:**
    • Katanga Mining Operations
    • Cross-border Logistics
    • Industrial Equipment Supply
    • Infrastructure Projects`,

      emergency: `**EMERGENCY CONTACTS:**
    For urgent service requirements:

    **24/7 Emergency Line:** +243 972 329 000
    **After Hours Support:** +260 951 864 994

    **Emergency Services:**
    • Fuel Supply Interruptions
    • Critical Equipment Breakdown
    • Safety Incidents
    • Urgent Logistics Requirements`
        },
    
    // Pricing & Quotation
    pricing: `**QUOTATION PROCESS:**
To provide an accurate quote, we need:

1. **Project Location:** DRC or Zambia
2. **Service Required:** Specific service category
3. **Project Scale:** Quantity/Volume/Size
4. **Timeline:** Start date & duration
5. **Site Conditions:** Accessibility, power, etc.

**Request Methods:**
1. **Website Form:** www.dnmultiservices.com/contact
2. **Email:** info@dnmultiservices.com
3. **WhatsApp:** +243 972 329 000 / +260 951 864 994

**Response Time:** 24-48 hours for detailed quotes`,

    // Common Questions
    faqs: {
      delivery: "**Delivery Timeline:**\n• DRC: 3-7 days depending on location\n• Zambia: 2-5 days within Copperbelt\n• Cross-border: 5-10 days with customs\n• Urgent: 24-48 hours (surcharge applicable)",
      payment: "**Payment Terms:**\n• 50% advance, 50% on delivery for new clients\n• Net 30 days for approved accounts\n• Bank transfer, SWIFT, or local bank\n• USD, ZMW, or CDF accepted",
      warranty: "**Warranty & Support:**\n• Equipment: 1-year warranty\n• Installation: 6-month workmanship warranty\n• HDPE Pipes: 10-year material warranty\n• 24/7 technical support available",
      compliance: "**Regulatory Compliance:**\n• Fully licensed in DRC & Zambia\n• QHSE certified operations\n• Environmental impact assessments\n• Tax compliant in both jurisdictions"
    }
  };

  // Function to get intelligent response
  const getLocalResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim();
    
    // Greetings
    if (/hello|hi|hey|good morning|good afternoon/.test(msg)) {
      const greetings = [
        "Hello! Welcome to DN Multi Services Supply Ltd. How can I assist with your industrial service needs today?",
        "Hi there! I'm DN Assistant. Are you looking for engineering, energy, or mining support services in DRC or Zambia?",
        "Greetings! DN Multi Services here. We provide cross-border industrial solutions. What can I help you with?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Company information
    if (/company|about|who are you|background/.test(msg)) {
      return `${localKnowledge.company.overview}\n\n${localKnowledge.company.history}\n\n${localKnowledge.company.certifications}`;
    }

    // Service-specific queries
    if (/engineering|construction|building|civil/.test(msg)) {
      return localKnowledge.services.engineering;
    }
    if (/energy|solar|electrical|power/.test(msg)) {
      return localKnowledge.services.energy;
    }
    if (/water|borehole|piping|pipe|hdpe/.test(msg)) {
      if (msg.includes('hdpe') || msg.includes('pipe') || msg.includes('spec')) {
        return localKnowledge.services.hdpe;
      }
      return localKnowledge.services.water;
    }
    if (/petroleum|fuel|diesel|gasoline/.test(msg)) {
      return localKnowledge.services.petroleum;
    }
    if (/mining|copper|acid|sulphur|coal/.test(msg)) {
      return localKnowledge.services.mining;
    }
    if (/logistics|transport|shipping|delivery/.test(msg)) {
      return localKnowledge.services.logistics;
    }
    if (/machinery|equipment|excavator|truck/.test(msg)) {
      return localKnowledge.services.machinery;
    }

    // Location queries
    if (/zambia|kitwe|copperbelt/.test(msg) && !/drc|congo|lubumbashi/.test(msg)) {
      return localKnowledge.contacts.zambia;
    }
    if (/drc|congo|lubumbashi|katanga/.test(msg)) {
      return localKnowledge.contacts.drc;
    }
    if (/contact|phone|address|email|where/.test(msg)) {
      return `${localKnowledge.contacts.zambia}\n\n${localKnowledge.contacts.drc}\n\n${localKnowledge.contacts.emergency}`;
    }
    if (/emergency|urgent|immediate|asap/.test(msg)) {
      return localKnowledge.contacts.emergency;
    }

    // Pricing & Quotation
    if (/price|cost|quote|quotation|how much/.test(msg)) {
      return localKnowledge.pricing;
    }

    // FAQs
    if (/delivery|time|when|schedule/.test(msg)) {
      return localKnowledge.faqs.delivery;
    }
    if (/payment|terms|bank|transfer/.test(msg)) {
      return localKnowledge.faqs.payment;
    }
    if (/warranty|guarantee|support/.test(msg)) {
      return localKnowledge.faqs.warranty;
    }
    if (/compliance|license|certified|regulation/.test(msg)) {
      return localKnowledge.faqs.compliance;
    }

    // WhatsApp
    if (/whatsapp|chat|message|text/.test(msg)) {
      return `**WhatsApp Contacts:**\n\nDR Congo: +243 972 329 000\nZambia: +260 951 864 994\n\n*We respond within 15 minutes during business hours (8:00-17:00).*\n\nSimply click the WhatsApp buttons below to start a conversation!`;
    }

    // Website
    if (/website|site|online|www/.test(msg)) {
      return `**Our Website:** www.dnmultiservices.com\n\n**Features:**\n• Service Details & Specifications\n• Company Profile Download\n• Contact Forms\n• Project Portfolio\n• Certificates & Licenses\n\nVisit our site for comprehensive information and downloadable resources.`;
    }

    // Services list
    if (/service|offer|provide|do you/.test(msg)) {
      return `**Our Core Services:**\n\n1. **Engineering & Construction**\n2. **Energy & Electrical Solutions**\n3. **Water Systems & HDPE Piping**\n4. **Petroleum Supply**\n5. **Mining Support Services**\n6. **Logistics & Transportation**\n7. **Heavy Machinery Supply**\n\n*Which specific service are you interested in? You can click the service buttons above for more details.*`;
    }

    // Fallback response
    const fallbacks = [
      "I understand you're asking about our services. For detailed information, could you specify which service area you're interested in? Or contact us directly for immediate assistance.",
      "That's a great question! For accurate information, please specify if you need details about engineering, energy, water systems, petroleum, mining support, or logistics services.",
      "To best assist you, I recommend:\n1. Selecting a service category above\n2. Asking a specific question about our operations\n3. Contacting our team directly for personalized support"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const clearChat = () => {
    if (confirm('Clear conversation history?')) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "**Welcome back to DN Multi Services!**\n\nHow can I assist you with our cross-border industrial services today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const openWhatsApp = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(`${message}\n\nSent via DN Multi Services website chatbot`);
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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get response from local knowledge base
    const response = getLocalResponse(userMessage);
    
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

  // Closed state - Floating button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* WhatsApp buttons */}
        <div className="flex flex-col gap-2 animate-fade-in">
          {whatsappContacts.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => openWhatsApp(contact.phone, contact.message)}
              className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-in-right"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <MessageCircle size={20} />
              <div className="text-left">
                <div className="font-bold text-sm">{contact.country}</div>
                  <div className="text-xs opacity-90 flex items-center gap-1">
                  <Phone size={12} />
                  <span>WhatsApp</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main chatbot button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 group animate-bounce-subtle"
        >
          <div className="relative">
            <Bot size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-left hidden sm:block">
            <div className="font-bold text-sm">DN Assistant</div>
            <div className="text-xs opacity-80">Ask about our services</div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md h-[85vh] max-h-[700px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1185AE] to-[#BD2227] p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold">DN Multi Services Assistant</h3>
              <div className="flex items-center gap-2 text-xs opacity-90">
                <div className="flex items-center gap-1">
                  <MapPin size={10} />
                  <span>DR Congo & Zambia</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span>QHSE Certified</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/10 rounded-lg transition"
              title="Clear chat"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className={`flex items-start gap-3 max-w-[90%] ${message.role === 'user' ? 'ml-auto' : ''}`}>
              {message.role === 'assistant' && (
                <div className="bg-gradient-to-br from-[#1185AE] to-[#BD2227] p-2 rounded-lg flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
              )}
              <div className={`flex-1 ${message.role === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-xl ${message.role === 'user'
                      ? 'bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white rounded-br-none'
                      : 'bg-gray-100 border border-gray-200 shadow-sm rounded-bl-none text-gray-800'
                    }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1 px-2 flex items-center gap-2">
                  <span>{format(message.timestamp, 'h:mm a')}</span>
                  {message.role === 'assistant' && (
                    <span className="flex items-center gap-1 text-[#1185AE]">
                      <FileText size={10} />
                      <span className="text-xs">Local AI</span>
                    </span>
                  )}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="bg-gray-600 p-2 rounded-lg flex-shrink-0">
                  <User size={14} className="text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="bg-gradient-to-r from-[#1185AE] to-[#BD2227] p-2 rounded-lg">
              <Bot size={16} className="text-white animate-pulse" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-500">Processing your inquiry...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Service Quick Links */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Quick Service Help:</p>
          <HelpCircle size={14} className="text-gray-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveService(activeService === category.name ? null : category.name)}
              className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 transition ${activeService === category.name
                  ? 'bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-[#1185AE] hover:shadow-sm'
                }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Service-specific Questions */}
        {activeService && (
          <div className="mt-3 pt-3 border-t border-gray-300">
            <p className="text-xs font-medium text-gray-600 mb-2">
              Common questions about {activeService}:
            </p>
            <div className="flex flex-wrap gap-2">
              {serviceCategories
                .find(s => s.name === activeService)
                ?.questions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-[#1185AE] px-3 py-1.5 rounded-lg transition flex items-center gap-1 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <span>{question}</span>
                    <ChevronRight size={10} />
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Quick Contacts */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <p className="text-sm font-medium text-gray-700 mb-2">Direct WhatsApp Contact:</p>
        <div className="grid grid-cols-2 gap-2">
          {whatsappContacts.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => openWhatsApp(contact.phone, contact.message)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white text-sm py-2 px-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition hover:scale-[1.02]"
            >
              <MessageCircle size={14} />
              {contact.country}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-300 p-4 bg-white">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about industrial services in DRC/Zambia..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1185AE] focus:border-transparent text-sm placeholder-gray-500"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white p-3 rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <Phone size={10} />
              <a href="tel:+260770970511" className="hover:text-[#1185AE] hover:underline">Zambia: +260 770 970 511</a>
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:inline"></span>
            <span className="flex items-center gap-1 hidden sm:flex">
              <Mail size={10} />
              <a href="mailto:dnmultiservicesupply@outlook.com" className="hover:text-[#1185AE] hover:underline">Email Us</a>
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:inline"></span>
            <span className="flex items-center gap-1">
              <AlertCircle size={10} />
              <span>100% Free Service</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}