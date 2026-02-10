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
  Sparkles
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
      content: "🏭 **Welcome to DN Multi Services Supply Ltd!**\n\nI'm your AI assistant here to help with industrial services across **DR Congo** and **Zambia**.\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [robotAnimation, setRobotAnimation] = useState<'idle' | 'wave' | 'bounce'>('idle');

  // Service Categories
  const serviceCategories: ServiceCategory[] = [
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
  ];

  // WhatsApp contacts
  const whatsappContacts = [
    {
      country: 'DR Congo',
      phone: '243972329000',
      icon: <Globe className="w-3 h-3" />,
      color: 'from-[#1185AE] to-[#0d6b8a]'
    },
    {
      country: 'Zambia',
      phone: '260951864994',
      icon: <Target className="w-3 h-3" />,
      color: 'from-[#BD2227] to-[#9a1b1f]'
    }
  ];

  // Enhanced local knowledge responses
  const getLocalResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim();
    
    // Greetings
    if (/hello|hi|hey|good morning|good afternoon/.test(msg)) {
      return "Hello! 👋 I'm DN Assistant from **DN Multi Services Supply Ltd**. We provide comprehensive industrial services across **DR Congo** and **Zambia**. How can I assist you today?";
    }

    // Company info
    if (/company|about|who are you/.test(msg)) {
      return "🏭 **DN Multi Services Supply Ltd** is a cross-border industrial services company operating in DR Congo and Zambia since 2014. We specialize in:\n\n🔹 Mining Support & Supplies\n🔹 Engineering & Construction\n🔹 Energy & Solar Solutions\n🔹 Water Systems & Infrastructure\n🔹 Petroleum Supply\n🔹 Logistics & Transportation\n\n✅ **QHSE Certified** | ✅ **Cross-border Operations** | ✅ **24/7 Support**";
    }

    // Services
    if (/engineering|construction/.test(msg)) {
      return "🏗️ **Engineering & Construction Services:**\n\n• Civil Engineering & Building Construction\n• Earth Works (Excavation, Trenching, Grading)\n• Mining Infrastructure Development\n• Industrial Plant Construction\n• Project Management & Execution\n\n📍 **Locations:** DRC & Zambia\n🛡️ **Standards:** ISO 9001, QHSE Certified\n⚡ **Capacity:** Projects up to $5M value";
    }
    
    if (/energy|solar|power/.test(msg)) {
      return "⚡ **Energy & Electrical Solutions:**\n\n• Commercial/Industrial Solar Systems\n• Solar-powered Water Pumping\n• Electrical Installations & Maintenance\n• Generator Systems & UPS\n• Energy Storage Solutions\n\n🔧 **Equipment:** Tier 1 solar panels\n📏 **Capacity:** 1kW to 1MW systems\n🔋 **Warranty:** 25-year panel warranty";
    }
    
    if (/water|borehole|pipe|hdpe/.test(msg)) {
      return "💧 **Water Systems & HDPE Solutions:**\n\n• Borehole Drilling (100m-300m depth)\n• HDPE Piping Systems (PE100 Material)\n• Water Reticulation Networks\n• Pump Installation & Maintenance\n• Storage Tank Systems\n\n📊 **HDPE Specifications:**\n- PE100 Material Grade\n- SDR 11 & 17 Available\n- PN 10 & 16 Pressure Ratings\n- UV Stabilized & Corrosion Resistant\n- 50+ Year Lifespan";
    }
    
    if (/petroleum|fuel|diesel/.test(msg)) {
      return "⛽ **Petroleum Supply Services:**\n\n• Diesel & Petrol Supply for Mining/Industrial\n• Bulk Fuel Transportation\n• Lubricants & Industrial Oils\n• Emergency Fuel Supply\n• Compliance & Risk Management\n\n🚛 **Capacity:** 10,000 to 100,000 liters\n📜 **Compliance:** Full DRC & Zambia Regulations\n⚡ **Delivery:** 24-72 hours depending on location";
    }
    
    if (/mining|copper|acid/.test(msg)) {
      return "⛏️ **Mining Support Services:**\n\n• Mining Consumables Supply\n• Copper & Mineral Transportation\n• Industrial Acids (Sulphuric, Hydrochloric)\n• Coal Supply for Processing\n• Heavy Equipment Rental/Sale\n• Spare Parts Supply\n\n🧪 **Acids Available:** Sulphuric, Hydrochloric, Nitric\n🚚 **Transport:** Bulk Tankers, Secure Logistics\n🛡️ **Safety:** MSDS Compliant Handling";
    }
    
    if (/logistics|transport|shipping/.test(msg)) {
      return "🚚 **Logistics & Transportation:**\n\n• DRC-Zambia Cross-border Logistics\n• Bulk Material Transportation\n• Heavy Machinery Transport\n• Hazardous Materials Handling\n• Customs Clearance Support\n\n📦 **Fleet:** 10-ton to 40-ton Capacity\n🌍 **Routes:** Lubumbashi-Kasumbalesa Corridor\n🛡️ **Insurance:** Full Cargo Coverage";
    }

    // Contacts
    if (/contact|phone|address|where/.test(msg)) {
      if (msg.includes('zambia')) {
        return "🇿🇲 **Zambia Office:**\n\n📍 **Address:** 1st Street, House No. 3, Nkana West, Kitwe\n📞 **Phone:** +260 770 970 511 / +260 979 130 958\n📱 **WhatsApp:** +260 951 864 994\n📧 **Email:** info@dnmultiservices.com\n🕒 **Hours:** Mon-Fri 8:00-17:00 | Sat 8:00-13:00";
      }
      if (msg.includes('drc') || msg.includes('congo')) {
        return "🇨🇩 **DR Congo Office:**\n\n📍 **Address:** No. 534, Avenue Kilela Balanda, Quartier Makutano, Lubumbashi\n📞 **Phone:** +243 97 232 9000 / +243 85 466 7976\n📱 **WhatsApp:** +243 972 329 000\n📧 **Email:** info@dnmultiservices.com\n🕒 **Hours:** Mon-Fri 8:00-17:00 | Sat 8:00-13:00";
      }
      return "📞 **Contact Information:**\n\n**Zambia:** +260 770 970 511\n**DR Congo:** +243 97 232 9000\n\n📱 **WhatsApp:**\nDRC: +243 972 329 000\nZambia: +260 951 864 994\n\n📧 **Email:** info@dnmultiservices.com\n\n📍 **Cross-border operations** between DRC & Zambia";
    }

    // Pricing
    if (/price|cost|quote|how much/.test(msg)) {
      return "💰 **For Accurate Quotations:**\n\nPlease provide:\n1. **Service Required** (Engineering, Energy, etc.)\n2. **Project Location** (DRC or Zambia)\n3. **Quantity/Volume** needed\n4. **Timeline** requirements\n5. **Specific Requirements**\n\n📝 **Contact for Quotes:**\n• Website Form: www.dnmultiservices.com/contact\n• Email: info@dnmultiservices.com\n• WhatsApp: +243 972 329 000 / +260 951 864 994\n\n⏱️ **Response Time:** 24-48 hours for detailed quotes";
    }

    // WhatsApp
    if (/whatsapp|chat|message/.test(msg)) {
      return "📱 **WhatsApp Contacts:**\n\n🇨🇩 **DR Congo:** +243 972 329 000\n🇿🇲 **Zambia:** +260 951 864 994\n\n💬 **Response Time:** Within 15 minutes during business hours (8:00-17:00)\n\n📍 **Services via WhatsApp:**\n• Instant quotes\n• Service inquiries\n• Emergency support\n• Project consultations";
    }

    // Default
    return "Thank you for your inquiry! 🤖\n\nFor specific information, please:\n1. Select a service category above\n2. Ask about a specific service\n3. Contact us directly for immediate assistance\n\n📞 **Direct Contacts:**\nWhatsApp DRC: +243 972 329 000\nWhatsApp Zambia: +260 951 864 994\nEmail: info@dnmultiservices.com\n\nWe're here to help with your industrial needs!";
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
    if (confirm('Clear conversation history?')) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Hello! 👋 How can I help you with DN Multi Services today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const openWhatsApp = (phone: string) => {
    const message = "Hello DN Multi Services, I need assistance with your industrial services";
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
            Ask DN Assistant
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
      <div className="bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white p-4 flex-shrink-0">
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
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/10 rounded-lg transition backdrop-blur-sm"
              title="Clear chat"
              aria-label="Clear conversation"
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
                <div className="bg-gradient-to-br from-[#1185AE] to-[#BD2227] p-2 rounded-lg flex-shrink-0 shadow-lg">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white rounded-br-none'
                      : 'bg-white/90 backdrop-blur-sm border border-white/30 text-gray-800 rounded-bl-none'
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
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-2 rounded-lg flex-shrink-0 shadow-lg">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 text-gray-300 animate-fade-in">
            <div className="bg-gradient-to-r from-[#1185AE] to-[#BD2227] p-2 rounded-lg shadow-lg">
              <Bot size={16} className="text-white animate-pulse" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#1185AE] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-400">DN Assistant is thinking...</span>
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
            Quick Service Access
          </p>
          <Sparkles size={12} className="text-yellow-300" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {serviceCategories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveService(activeService === category.name ? null : category.name)}
              className={`text-xs px-2 py-2 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 backdrop-blur-sm ${
                activeService === category.name
                  ? 'bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white shadow-lg scale-105'
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
              Quick questions about {activeService}:
            </p>
            <div className="flex flex-wrap gap-1">
              {serviceCategories
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

      {/* WhatsApp Contacts - Gradient background */}
      <div className="border-t border-white/20 bg-gradient-to-r from-[#1185AE]/20 to-[#BD2227]/20 backdrop-blur-sm p-3">
        <p className="text-sm font-medium text-white mb-2">Direct WhatsApp Contact:</p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {whatsappContacts.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => openWhatsApp(contact.phone)}
              className={`bg-gradient-to-r ${contact.color} text-white text-sm py-2 px-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm`}
            >
              <MessageCircle size={14} />
              <span className="font-medium">{contact.country}</span>
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
            placeholder="Type your message here..."
            className="flex-1 border border-white/30 bg-white/20 text-white placeholder-white/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1185AE] focus:border-transparent text-sm backdrop-blur-sm"
            disabled={isLoading}
            aria-label="Type your message"
          />
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-[#1185AE] to-[#BD2227] text-white p-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-white/70 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1">
              <Phone size={10} />
              <span>24/7 Support Available</span>
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