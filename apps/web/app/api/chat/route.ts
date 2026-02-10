import { NextRequest, NextResponse } from 'next/server';

// Enhanced local knowledge base
const localKnowledge = {
  greetings: [
    "**Welcome to DN Multi Services Supply Ltd!**\n\nI'm your DN Assistant. We provide cross-border industrial services in **DR Congo** and **Zambia**.\n\nHow can I assist you today?",
    "Hello! Welcome to DN Multi Services. We specialize in mining support, engineering, energy solutions, and industrial supplies across DRC and Zambia.",
    "Greetings! I'm here to help you with DN Multi Services' industrial solutions. What service are you interested in?"
  ],
  
    services: {
    engineering: `**ENGINEERING & CONSTRUCTION SERVICES:**\n\n• Civil Engineering & Building Construction\n• Earth Works (Excavation, Trenching, Grading)\n• Mining Infrastructure Development\n• Industrial Plant Construction\n• Safety-compliant Project Execution\n\n*Standards:* ISO 9001, Local Building Codes\n*Location:* DRC & Zambia\n*Capacity:* Projects up to $5M value`,
    
    energy: `**ENERGY & ELECTRICAL SOLUTIONS:**\n\n• Commercial/Industrial Solar Systems\n• Solar-powered Water Pumping\n• Electrical Installations & Maintenance\n• Generator Systems\n• Energy Storage Solutions\n\n*Equipment:* Tier 1 solar panels\n*Capacity:* 1kW to 1MW systems\n*Warranty:* 25-year panel warranty`,
    
    water: `**WATER SYSTEMS & HDPE PIPING:**\n\n• Borehole Drilling (100m-300m depth)\n• HDPE Piping Systems (PE100 Material)\n• Water Reticulation Networks\n• Pump Installation & Maintenance\n\n**HDPE Specifications:**\n- PE100 Material Grade\n- SDR 11 & 17 Available\n- PN 10 & 16 Pressure Ratings\n- UV Stabilized\n- 50+ Year Lifespan`,
    
    petroleum: `**PETROLEUM SUPPLY SERVICES:**\n\n• Diesel & Petrol Supply for Mining\n• Bulk Fuel Transportation\n• Lubricants & Industrial Oils\n• Emergency Fuel Supply\n\n*Capacity:* 10,000 to 100,000 liters\n*Transport:* ISO Tankers & Bowser Trucks\n*Compliance:* Full DRC & Zambia Regulations`,
    
    mining: `**MINING SUPPORT SERVICES:**\n\n• Mining Consumables Supply\n• Copper & Mineral Transportation\n• Industrial Acids (Sulphuric, Hydrochloric)\n• Coal Supply for Processing\n• Heavy Equipment Rental/Sale\n\n*Acids:* Sulphuric, Hydrochloric, Nitric\n*Transport:* Bulk Tankers, Secure Logistics\n*Safety:* MSDS Compliant Handling`,
    
    logistics: `**LOGISTICS & TRANSPORTATION:**\n\n• DRC-Zambia Cross-border Logistics\n• Bulk Material Transportation\n• Heavy Machinery Transport\n• Hazardous Materials Handling\n• Customs Clearance Support\n\n*Fleet:* 10-ton to 40-ton Capacity\n*Border:* Lubumbashi-Kasumbalesa Route\n*Insurance:* Full Cargo Coverage`
  },
  
    contacts: {
    zambia: `**ZAMBIA OFFICE:**\n**Address:** 1st Street, House No. 3, Nkana West, Kitwe\n**Phone:** +260 770 970 511 / +260 979 130 958\n**WhatsApp:** +260 951 864 994\n**Email:** info@dnmultiservices.com\n**Hours:** Mon-Fri 8:00-17:00, Sat 8:00-13:00`,
    
    drc: `**DR CONGO OFFICE:**\n**Address:** No. 534, Avenue Kilela Balanda, Quartier Makutano, Lubumbashi\n**Phone:** +243 97 232 9000 / +243 85 466 7976\n**WhatsApp:** +243 972 329 000\n**Email:** info@dnmultiservices.com\n**Hours:** Mon-Fri 8:00-17:00, Sat 8:00-13:00`,
    
    emergency: `**EMERGENCY CONTACTS:**\n\n**24/7 Emergency Line:** +243 972 329 000\n**After Hours Support:** +260 951 864 994\n\n*For urgent fuel supply, equipment breakdown, or safety incidents*`
  },
  
  faqs: {
    delivery: "**Delivery Timeline:**\n• DRC: 3-7 days depending on location\n• Zambia: 2-5 days within Copperbelt\n• Cross-border: 5-10 days with customs\n• Urgent: 24-48 hours (surcharge applicable)",
    payment: "**Payment Terms:**\n• 50% advance, 50% on delivery for new clients\n• Net 30 days for approved accounts\n• Bank transfer, SWIFT, or local bank\n• USD, ZMW, or CDF accepted",
    pricing: "**For Quotations:** Please provide:\n1. Project location (DRC/Zambia)\n2. Service required\n3. Quantity/Volume needed\n4. Timeline\n\nContact via WhatsApp or email for immediate quote."
  }
};

function getResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  // Greetings
  if (/hello|hi|hey|good morning|good afternoon/.test(msg)) {
    return localKnowledge.greetings[Math.floor(Math.random() * localKnowledge.greetings.length)];
  }
  
  // Services
  if (/engineering|construction|building|civil/.test(msg)) {
    return localKnowledge.services.engineering;
  }
  if (/energy|solar|electrical|power/.test(msg)) {
    return localKnowledge.services.energy;
  }
  if (/water|borehole|piping|pipe|hdpe/.test(msg)) {
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
  
  // Contacts
  if (/contact|phone|address|email|where/.test(msg)) {
    if (msg.includes('zambia') && !msg.includes('drc')) {
      return localKnowledge.contacts.zambia;
    }
    if (msg.includes('drc') || msg.includes('congo')) {
      return localKnowledge.contacts.drc;
    }
    if (/emergency|urgent|immediate/.test(msg)) {
      return localKnowledge.contacts.emergency;
    }
    return `${localKnowledge.contacts.zambia}\n\n${localKnowledge.contacts.drc}`;
  }
  
  // FAQs
  if (/delivery|time|when|schedule/.test(msg)) {
    return localKnowledge.faqs.delivery;
  }
  if (/payment|terms|bank|transfer/.test(msg)) {
    return localKnowledge.faqs.payment;
  }
  if (/price|cost|quote|quotation|how much/.test(msg)) {
    return localKnowledge.faqs.pricing;
  }
  
  // WhatsApp
    if (/whatsapp|chat|message/.test(msg)) {
    return `**WhatsApp Contacts:**\n\nDR Congo: +243 972 329 000\nZambia: +260 951 864 994\n\n*We respond within minutes during business hours!*`;
  }
  
  // Default response
  return `**Thank you for your inquiry!**\n\nFor detailed information about our services, please specify:\n\n1. Which service you need (Engineering, Energy, Water, etc.)\n2. Location (DRC or Zambia)\n3. Project requirements\n\nOr contact us directly:\nWhatsApp DRC: +243 972 329 000\nWhatsApp Zambia: +260 951 864 994\nEmail: dnmultiservicesupply@outlook.com`;
}

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    // Get response from local knowledge
    const response = getResponse(lastMessage);
    
    // Simulate streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Send response in chunks for realistic streaming
        const chunks = response.match(/.{1,50}/g) || [response];
        
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    const fallback = "**Service Temporarily Unavailable**\n\nPlease contact us directly:\n\nWhatsApp (DRC): +243 972 329 000\nWhatsApp (Zambia): +260 951 864 994\nEmail: dnmultiservicesupply@outlook.com\n\nWe apologize for the inconvenience and will respond promptly.";
    
    return new Response(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// Also support GET for health check
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    service: 'DN Multi Services Chat API',
    version: '1.0.0',
    features: ['Local AI', 'No API Key Required', 'Completely Free']
  });
}