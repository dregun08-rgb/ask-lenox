"use client";

import { useMemo, useState } from "react";
import {
  Send,
  Building2,
  ShieldCheck,
  Car,
  Waves,
  ConciergeBell,
  AlertTriangle,
  Phone,
  FileWarning,
} from "lucide-react";

const learningEvents = [
  {
    type: "unanswered",
    question: "Can I have a guest use the sauna with me?",
    status: "Pending review",
  },
  {
    type: "needs-review",
    question: "What happens if I park in front overnight?",
    status: "Suggested answer drafted",
  },
];

const handbookContacts = {
  propertyManager: "Delethia Foxx • dfoxx@heritageproperty.com • 770-200-8610",
  emergencyDay: "Emergency Answering Service (daytime): 770-200-8237",
  emergency24: "Emergency Answering Service (24 hours): 770-451-8171",
  liaison: "Community Liaison: hillsideatlenox@outlook.com",
  communityWatch: "Community Watch: 404-883-3350 or 811 on Hillside callboxes",
  towing: "A-Tow: 404-577-8950",
  portal: "Vantaca portal: portal.heritageproperty.com",
};

const knowledgeBase = [
  {
    category: "Violations & Fines Policy",
    keywords: ["fine", "fines", "violation", "penalty"],
    answer:
      "Violations may result in fines according to the Hillside handbook. Repeated violations may result in increased penalties, including doubled fines for repeat offenses. Continued non-compliance may result in further enforcement actions by the HOA.",
  },
  {
    category: "Parking Enforcement",
    keywords: ["parking", "front parking", "rear parking", "tow", "visitor", "car", "fire lane", "handicap"],
    answer:
      "Front parking is limited to 30 minutes maximum. Parking beyond 30 minutes is a violation and may result in towing at the vehicle owner’s expense and additional fines. Do not park in the fire lane, handicapped spaces, or any assigned space that is not yours. Guests must follow the same rules. If your car has been towed, contact A-Tow at 404-577-8950.",
  },
  {
    category: "Dues Enforcement",
    keywords: ["dues", "late fee", "payment", "hoa", "assessment"],
    answer:
      "Monthly dues are considered late after the 10th of each month. Residents should pay before that date to avoid late fees. For account-specific issues, payment history, or assistance, please use the Vantaca portal or contact property management directly.",
  },
  {
    category: "Move In / Move Out Enforcement",
    keywords: ["move in", "move out", "elevator", "fee", "moving", "move"],
    answer:
      "All move-ins and move-outs must be scheduled in advance with management. Moving hours are restricted to 8:00 AM–7:00 PM. A $400 move-in/move-out fee applies. All moves must go through the garage, elevator pads must be used, and violations may result in fines for failure to schedule, improper disposal, unpadded elevators, use of front doors, or damage to common areas.",
  },
  {
    category: "Pool Rules",
    keywords: ["pool", "swim", "pool rules", "guests pool", "glass"],
    answer:
      "Private parties are not allowed in the pool area. Residents are limited to 3 guests at a time. Glass containers are not allowed. Residents must clean up after use, and violations may result in fines.",
  },
  {
    category: "Clubroom Rules",
    keywords: ["clubroom", "reserve room", "event", "party room", "club room"],
    answer:
      "The club room requires a reservation. The rental fee is $1050 and the refundable deposit is $200. Events are limited to 25 guests and must end by 10:00 PM. Guests must be accompanied by an authorized resident, and the reserving resident is responsible for cleanup and damages.",
  },
  {
    category: "Fitness Room Rules",
    keywords: ["gym", "fitness", "workout", "fitness room"],
    answer:
      "The fitness room is for residents only. Children under 18 are not allowed. Please clean equipment after use and follow all posted rules and security requirements.",
  },
  {
    category: "Pets Enforcement",
    keywords: ["pet", "dog", "animal", "pets"],
    answer:
      "Pets must be leashed in common areas. Pets are not allowed at the pool, and they are not allowed in the lobby unless carried or in a pet carrier. Pet waste must be disposed of properly. Violations may result in fines.",
  },
  {
    category: "Trash / Common Area Violations",
    keywords: ["trash", "garbage", "dump", "trash room", "bulk item", "common area"],
    answer:
      "Trash must be bagged and disposed of properly. Large or bulky items must go into the dumpster, not hallways or other common areas. Improper disposal, dumping, or leaving items in common areas may result in fines plus removal costs.",
  },
  {
    category: "Security & Emergency",
    keywords: ["security", "fob", "access", "door", "gate", "suspicious", "emergency", "911"],
    answer:
      "Do not allow unknown individuals into the building or share access devices or codes. Report lost fobs immediately for deactivation. For suspicious activity, contact Community Watch at 404-883-3350 or 811 on a callbox. For an active emergency, fire, crime in progress, medical emergency, gas leak, or flooding, call 911 first.",
  },
  {
    category: "Maintenance & Repairs",
    keywords: ["maintenance", "repair", "work order", "leak", "broken", "vantaca"],
    answer:
      "Routine maintenance requests should be submitted through the Vantaca portal at portal.heritageproperty.com. For emergencies such as fire, gas leaks, flooding, or medical emergencies, call 911 first and then notify property management or the emergency answering service.",
  },
  {
    category: "Sauna",
    keywords: ["sauna", "reserve sauna", "booking", "amenity", "reservation"],
    answer:
      "The sauna must be reserved and used according to community guidelines. Follow all safety instructions, posted time limits, and amenity rules. For access or reservation issues, contact the Community Liaison.",
  },
  {
    category: "Who To Contact",
    keywords: ["contact", "call", "who do i contact", "phone", "manager", "liaison"],
    answer:
      "Property Manager: Delethia Foxx at dfoxx@heritageproperty.com or 770-200-8610. Community Liaison: hillsideatlenox@outlook.com. Emergency Answering Service: 770-200-8237 daytime or 770-451-8171 after hours. Use Vantaca for routine requests.",
  },
];

const quickPrompts = [
  "What are the front parking rules?",
  "When are dues considered late?",
  "How do I submit a maintenance request?",
  "What are the pool rules?",
  "How do I reserve the clubroom?",
  "Who do I contact for an emergency?",
];

function getBotResponse(message) {
  const normalized = message.toLowerCase();
  const matched = knowledgeBase.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (matched) {
    return { title: matched.category, text: matched.answer };
  }

  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
    return {
      title: "Welcome",
      text:
        "Good day. I’m Lenox, the Hillside at Lenox resident assistant. I can help with parking rules, dues, amenities, maintenance requests, violations guidance, and who to contact for support.",
    };
  }

  return {
    title: "Need a human follow-up",
    text:
      "I do not have a confident answer for that yet. For account-specific questions, formal violations, or emergencies, please contact property management or the Community Liaison. Unanswered questions can be reviewed and added to Lenox after approval.",
  };
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      title: "Welcome",
      text:
        "Good day. I’m Lenox — the Hillside at Lenox resident assistant. Ask me about parking rules, dues, pool and club room policies, maintenance requests, move-in requirements, or who to contact for help.",
    },
  ]);

  const stats = useMemo(
    () => [
      { label: "Topics Covered", value: "12+" },
      { label: "Resident Support", value: "24/7" },
      { label: "Learning Mode", value: "Approved" },
    ],
    []
  );

  const handleSend = (preset) => {
    const outgoing = (preset ?? input).trim();
    if (!outgoing) return;
    const response = getBotResponse(outgoing);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: outgoing },
      { role: "assistant", title: response.title, text: response.text },
    ]);
    setInput("");
  };

  return (
    <main className="page">
      <section className="layout">
        <div className="leftColumn">
          <Card>
            <div className="heroHeader">
              <div className="brandIcon"><Building2 size={26} /></div>
              <div>
                <p className="eyebrow">Hillside at Lenox Digital Concierge</p>
                <h1>Ask Lenox</h1>
              </div>
            </div>
            <p className="lead">
              Lenox is Hillside’s resident-facing digital concierge. It answers common questions,
              reinforces handbook rules, routes residents to the right contacts, and helps reduce
              repetitive emails to the Board and property management.
            </p>
            <div className="stats">
              {stats.map((item) => (
                <div className="stat" key={item.label}>
                  <p className="statValue">{item.value}</p>
                  <p className="statLabel">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="sectionTop">
              <div>
                <p className="eyebrow">Website Ready</p>
                <h2>Designed to feel native on hillsideatlenox.com</h2>
              </div>
              <Badge>Handbook grounded</Badge>
            </div>
            <div className="featureGrid three">
              <div className="feature"><AlertTriangle size={20} /><h3>Native page experience</h3><p>Residents can access Lenox from a menu item such as “Ask Lenox” or “Hillside Concierge.”</p></div>
              <div className="feature"><FileWarning size={20} /><h3>Floating chat-ready</h3><p>The same chatbot can later be converted into a floating website chat button if HOA Express allows embeds.</p></div>
              <div className="feature"><Phone size={20} /><h3>Compliance guardrails</h3><p>Lenox gives policy guidance while routing formal enforcement, emergencies, and account-specific issues to the proper channel.</p></div>
            </div>
            <div className="learning">
              <div className="learningTitle"><h3>Recent learning queue</h3><Badge>{learningEvents.length} items</Badge></div>
              {learningEvents.map((item, idx) => (
                <div className="learningItem" key={idx}>
                  <p className="question">{item.question}</p>
                  <p className="type">{item.type}</p>
                  <p>{item.status}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="featureGrid four">
            {[
              { icon: Car, title: "Parking Enforcement", text: "Reinforces the 30-minute front parking rule and towing risk." },
              { icon: Waves, title: "Amenity Rules", text: "Answers pool, sauna, club room, and fitness room questions." },
              { icon: ShieldCheck, title: "Rules & Violations", text: "Explains dues, pets, trash, and common-area expectations." },
              { icon: ConciergeBell, title: "Management Routing", text: "Directs residents to the correct Hillside contact channel." },
            ].map((item) => {
              const Icon = item.icon;
              return <div className="feature mini" key={item.title}><Icon size={20} /><h3>{item.title}</h3><p>{item.text}</p></div>;
            })}
          </div>

          <Card>
            <h3>Key contacts Lenox can reference</h3>
            <div className="contactGrid">
              {Object.values(handbookContacts).map((value) => <div className="contact" key={value}>{value}</div>)}
            </div>
          </Card>
        </div>

        <aside className="chatCard">
          <div className="chatHeader">
            <div className="avatarWrap">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Lenox avatar" className="avatar" />
              <div><h2>Ask Lenox</h2><p>Hillside digital concierge</p></div>
            </div>
            <Badge>Online</Badge>
          </div>

          <div className="quickPrompts">
            {quickPrompts.map((prompt) => <button key={prompt} onClick={() => handleSend(prompt)}>{prompt}</button>)}
          </div>

          <div className="messages">
            {messages.map((message, idx) => (
              <div key={idx} className={`messageRow ${message.role === "user" ? "right" : "left"}`}>
                <div className={`bubble ${message.role}`}>
                  {message.title && message.role === "assistant" && <p className="bubbleTitle">{message.title}</p>}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="composer">
            <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") handleSend(); }} placeholder="Ask Lenox about parking, dues, amenities, or contacts..." />
            <button onClick={() => handleSend()} aria-label="Send message"><Send size={18} /></button>
          </div>
          <p className="disclaimer">Deployment-ready MVP: grounded in the Hillside handbook, designed for resident guidance, management routing, and human-approved updates.</p>
        </aside>
      </section>
    </main>
  );
}
