import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    // Simple response logic (can be enhanced later)
    const response = getResponse(lastMessage);
    
    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Send response in chunks for realistic typing effect
        const words = response.split(' ');
        for (const word of words) {
          controller.enqueue(encoder.encode(word + ' '));
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
    
    const fallback = "Service temporarily unavailable. Please contact us directly:\n\nDR Congo: +243 972 329 000\nZambia: +260 951 864 994\nEmail: info@dnmultiservices.com";
    
    return new Response(fallback, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

function getResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  // Greetings
  if (/hello|hi|hey/.test(msg)) {
    return "Hello! Welcome to DN Multi Services Supply Ltd. How can I assist you with our industrial services today?";
  }
  
  // Services
  if (/engineering|construction/.test(msg)) {
    return "We provide comprehensive engineering and construction services including civil works, earth moving, mining infrastructure, and industrial building construction. All projects are executed with strict QHSE compliance and safety standards.";
  }
  
  if (/energy|solar|power/.test(msg)) {
    return "Our energy solutions include commercial and industrial solar systems, solar-powered water pumping, electrical installations, and generator systems. We supply and install Tier 1 solar equipment with maintenance services.";
  }
  
  if (/water|borehole|pipe|hdpe/.test(msg)) {
    return "We offer complete water solutions: borehole drilling, HDPE piping systems (PE100 material, SDR 11/17 specifications), water reticulation networks, and pump installations. Our HDPE pipes are UV stabilized with 50+ year lifespan.";
  }
  
  if (/petroleum|fuel|diesel/.test(msg)) {
    return "We supply petroleum products to mining and industrial operations, including bulk diesel transportation, lubricants, and emergency fuel supply. Fully licensed for DRC and Zambia operations with proper safety protocols.";
  }
  
  if (/mining|copper|acid/.test(msg)) {
    return "Our mining support services include consumables supply, copper and mineral transportation, industrial acids (sulphuric, hydrochloric), coal supply, and heavy equipment. All materials are handled with MSDS compliance.";
  }
  
  if (/logistics|transport|shipping/.test(msg)) {
    return "We handle cross-border logistics between DRC and Zambia, bulk material transportation, heavy machinery transport, and customs clearance. Our fleet ranges from 10-ton to 40-ton capacity with full cargo insurance.";
  }
  
  // Contacts
  if (/contact|phone|address|where/.test(msg)) {
    if (msg.includes('zambia')) {
      return "Zambia Office: 1st Street, House No. 3, Nkana West, Kitwe. Phone: +260 770 970 511. WhatsApp: +260 951 864 994. Email: info@dnmultiservices.com";
    }
    if (msg.includes('drc') || msg.includes('congo')) {
      return "DR Congo Office: No. 534, Avenue Kilela Balanda, Lubumbashi. Phone: +243 97 232 9000. WhatsApp: +243 972 329 000. Email: info@dnmultiservices.com";
    }
    return "Contact Information: Zambia: +260 770 970 511, DRC: +243 97 232 9000. WhatsApp: DRC +243 972 329 000, Zambia +260 951 864 994. Email: info@dnmultiservices.com";
  }
  
  // Pricing
  if (/price|cost|quote|how much/.test(msg)) {
    return "For accurate pricing, please provide: service required, project location (DRC/Zambia), quantity/volume, and timeline. Contact us via WhatsApp or email for immediate quotes.";
  }
  
  // Default response
  return "Thank you for contacting DN Multi Services Supply Ltd. For detailed information about our industrial services in DR Congo and Zambia, please specify your requirements or contact us directly:\n\nWhatsApp DRC: +243 972 329 000\nWhatsApp Zambia: +260 951 864 994\nEmail: info@dnmultiservices.com";
}

export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    service: 'DN Multi Services Chat',
    version: '1.0.0',
    mode: 'Local AI - No API Required',
    free: true
  });
}