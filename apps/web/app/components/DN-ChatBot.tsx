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
  Cpu,
  Shield,
  CheckCircle,
  ExternalLink
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
      content: "Welcome to DN Multi Services Supply Ltd. I'm your assistant here to help with industrial services in DR Congo and Zambia. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      icon: <MapPin className="w-4 h-4" />,
      color: 'bg-blue-600'
    },
    {
      country: 'Zambia',
      phone: '260951864994',
      icon: <MapPin className="w-4 h-4" />,
      color: 'bg-blue-700'
    }
  ];

  // Local knowledge responses
  const getLocalResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim();
    
    // Greetings
    if (/hello|hi|hey/.test(msg)) {
      return "Hello! I'm DN Assistant from DN Multi Services Supply Ltd. We provide industrial services across DR Congo and Zambia. How can I help you today?";
    }

    // Company info
    if (/company|about|who are you/.test(msg)) {
      return "DN Multi Services Supply Ltd is a cross-border industrial services company operating in DR Congo and Zambia since 2014. We specialize in mining support, engineering, energy solutions, and industrial supplies with QHSE certification.";
    }

    // Services
    if (/engineering|construction/.test(msg)) {
      return "We provide engineering and construction services including civil works, earth moving, mining infrastructure, and industrial building construction. All projects follow strict safety standards with QHSE compliance.";
    }
    
    if (/energy|solar|power/.test(msg)) {
      return "We offer energy solutions including commercial/industrial solar systems, solar-powered water pumping, electrical installations, and generator systems. We supply Tier 1 solar equipment with full installation services.";
    }
    
    if (/water|borehole|pipe|hdpe/.test(msg)) {
      return "Our water services include borehole drilling, HDPE piping systems (PE100 material), water reticulation networks, and pump installations. We supply HDPE pipes in SDR 11/17, PN 10/16 specifications.";
    }
    
    if (/petroleum|fuel|diesel/.test(msg)) {
      return "We supply petroleum products to mining and industrial sites, including bulk diesel transportation, lubricants, and emergency fuel supply. Fully compliant with DRC and Zambia regulations.";
    }
    
    if (/mining|copper|acid/.test(msg)) {
      return "We provide mining support including consumables supply, copper transportation, industrial acids (sulphuric, hydrochloric), coal supply, and heavy equipment. All materials handled with proper safety protocols.";
    }
    
    if (/logistics|transport|shipping/.test(msg)) {
      return "We handle cross-border logistics between DRC and Zambia, bulk material transportation, heavy machinery transport, and customs clearance. Our fleet includes 10-ton to 40-ton capacity vehicles.";
    }

    // Contacts
    if (/contact|phone|address|where/.test(msg)) {
      if (msg.includes('zambia')) {
        return "Zambia Office:\nAddress: 1st Street, House No. 3, Nkana West, Kitwe\nPhone: +260 770 970 511\nWhatsApp: +260 951 864 994\nEmail: info@dnmultiservices.com";
      }
      if (msg.includes('drc') || msg.includes('congo')) {
        return "DR Congo Office:\nAddress: No. 534, Avenue Kilela Balanda, Lubumbashi\nPhone: +243 97 232 9000\nWhatsApp: +243 972 329 000\nEmail: info@dnmultiservices.com";
      }
      return "Contact Information:\n\nZambia: +260 770 970 511\nDR Congo: +243 97 232 9000\nWhatsApp DRC: +243 972 329 000\nWhatsApp Zambia: +260 951 864 994\nEmail: info@dnmultiservices.com";
    }

    // Pricing
    if (/price|cost|quote|how much/.test(msg)) {
      return "For pricing and quotations, please provide:\n1. Service required\n2. Project location\n3. Quantity/volume needed\n4. Timeline\n\nYou can also contact us directly for immediate quotes via WhatsApp or email.";
    }

    // WhatsApp
    if (/whatsapp|chat|message/.test(msg)) {
      return "You can reach us on WhatsApp:\nDR Congo: +243 972 329 000\nZambia: +260 951 864 994\n\nWe respond quickly during business hours (8:00-17:00).";
    }

    // Default
    return "Thank you for your inquiry. For more specific information, please select a service category above or contact us directly:\n\nWhatsApp DRC: +243 972 329 000\nWhatsApp Zambia: +260 951 864 994\nEmail: info@dnmultiservices.com";
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
          content: "Hello! How can I help you with DN Multi Services today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const openWhatsApp = (phone: string) => {
    const message = "Hello DN Multi Services, I need assistance with your services";
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

  // Single floating button (closed state)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        aria-label="Open chat with DN Multi Services"
      >
        <div className="relative">
          <MessageCircle size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </button>
    );
  }

  // Open state - Chat window
  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-96 md:h-[600px] z-50 flex flex-col bg-white md:rounded-lg md:shadow-xl md:border md:border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">DN Assistant</h3>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <div className="flex items-center gap-1">
                  <Building size={12} />
                  <span>Industrial Services</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
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
              className="p-2 hover:bg-white/10 rounded transition"
              title="Clear chat"
              aria-label="Clear conversation"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded transition"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className={`flex items-start gap-3 max-w-full ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'assistant' && (
                <div className="bg-blue-100 p-2 rounded flex-shrink-0">
                  <Bot size={16} className="text-blue-600" />
                </div>
              )}
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1 px-1">
                  {format(message.timestamp, 'h:mm a')}
                </div>
              </div>
              {message.role === 'user' && (
                <div className="bg-gray-600 p-2 rounded flex-shrink-0">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="bg-blue-600 p-2 rounded">
              <Bot size={16} className="text-white animate-pulse" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-500">DN Assistant is typing...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Service Quick Links */}
      <div className="border-t border-gray-200 bg-white p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <HelpCircle size={14} />
            Quick Help
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {serviceCategories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveService(activeService === category.name ? null : category.name)}
              className={`text-xs px-2 py-2 rounded flex flex-col items-center gap-1 transition ${
                activeService === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Service-specific Questions */}
        {activeService && (
          <div className="border-t border-gray-300 pt-3">
            <p className="text-xs font-medium text-gray-600 mb-2">
              About {activeService}:
            </p>
            <div className="flex flex-wrap gap-1">
              {serviceCategories
                .find(s => s.name === activeService)
                ?.questions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
                    disabled={isLoading}
                  >
                    <span className="truncate max-w-[120px]">{question}</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Contacts */}
      <div className="border-t border-gray-200 bg-gray-50 p-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Direct Contact:</p>
        <div className="grid grid-cols-2 gap-2">
          {whatsappContacts.map((contact, idx) => (
            <button
              key={idx}
              onClick={() => openWhatsApp(contact.phone)}
              className={`${contact.color} text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 hover:opacity-90 transition`}
            >
              <MessageCircle size={14} />
              <span>{contact.country}</span>
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-center">
          <a
            href="mailto:info@dnmultiservices.com"
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Mail size={12} />
            info@dnmultiservices.com
          </a>
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-300 p-3 bg-white">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={isLoading}
            aria-label="Type your message"
          />
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
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
          </div>
        </div>
      </form>
    </div>
  );
}