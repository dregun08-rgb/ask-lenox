"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  Send, Building2, ShieldCheck, Car, Waves, ConciergeBell,
  AlertTriangle, Phone, Mail, ExternalLink, MessageSquare
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const contacts = {
  propertyManager: "Amber Nash, CAM • Community Association Manager • Heritage Property Management Services, LLC • 500 Sugar Mill Road, Building B, Suite 200, Atlanta, GA 30350 • Main: 770-451-8171 • Direct: 770-200-8558 • anash@heritageproperty.com • www.heritageproperty.com",
  emergencyDay: "Emergency Answering Service (daytime): 770-200-8237",
  emergency24: "Emergency Answering Service (24 hours): 770-451-8171",
  liaison: "Community Liaison: board@hillsideatlenox.com",
  communityWatch: "Community Watch: 404-883-3350 or 811 on Hillside callboxes",
  towing: "A-Tow: 404-577-8950",
};

const actionButtons = [
  { label: "Call Amber", href: "tel:7702008558", icon: Phone },
  { label: "Email Amber", href: "mailto:anash@heritageproperty.com", icon: Mail },
  { label: "Call Heritage Main", href: "tel:7704518171", icon: Phone },
  { label: "Email Board", href: "mailto:board@hillsideatlenox.com", icon: Mail },
  { label: "Open Vantaca", href: "https://portal.heritageproperty.com", icon: ExternalLink },
  { label: "Call Community Watch", href: "tel:4048833350", icon: Phone },
  { label: "Call A-Tow", href: "tel:4045778950", icon: Phone },
];

const knowledgeBase = [
  { category: "Parking Enforcement", keywords: ["parking","front parking","tow","visitor","car","fire lane","handicap"], answer: "Front parking is limited to 30 minutes maximum. Parking beyond 30 minutes is a violation and may result in towing and fines. Do not park in the fire lane/red zone, handicapped spaces, or in another resident’s assigned space without permission." },
  { category: "Move In / Move Out Rules", keywords: ["move in","move out","moving","elevator","fee"], answer: "All moves must be scheduled in advance with at least two weeks notice. Moving hours are 8:00 AM–7:00 PM. A $500 move-in/move-out fee applies. All moves must go through the garage, never the front entrance, and elevator pads must be used. Violations may result in fines." },
  { category: "Pool Rules", keywords: ["pool","swim","pool rules","guests pool","glass"], answer: "Private parties are not allowed in the pool area. Residents are limited to 3 guests at a time. Glass containers are strictly prohibited. Residents must clean up after use and violations may result in fines." },
  { category: "Clubroom Rules", keywords: ["clubroom","reserve room","event","party room","club room"], answer: "The club room requires a reservation. The rental fee is $150 and the refundable deposit is $200. Events are limited to 25 guests and must end by 10:00 PM. Residents are responsible for cleanup and any damages." },
  { category: "Fitness Room Rules", keywords: ["gym","fitness","workout","fitness room"], answer: "The fitness room is for residents only. Children under 18 are not allowed. Use is at your own risk and Hillside is not liable for injuries." },
  { category: "Sauna Rules", keywords: ["sauna","sauna rules","infrared sauna"], answer: "Residents must wear appropriate attire, bring a towel, and shower before use. Sessions should be limited to 30 minutes. No food, drinks, or electronics are allowed. Use is at your own risk." },
  { category: "Pets Policy", keywords: ["pet","dog","animal","pets"], answer: "Pets must be leashed in common areas. Pets are not allowed at the pool and must be carried or in a carrier in the lobby. Waste must be properly disposed of and not placed in recycling bins. Violations may result in fines." },
  { category: "Trash & Recycling", keywords: ["trash","garbage","dump","bulk item","recycling"], answer: "Trash must be placed in sealed plastic bags. Large items and electronics are not allowed in the dumpster room or common areas. Recycling includes paper, flattened cardboard, plastic bottles, and cans. Glass is not accepted in recycling." },
  { category: "Leasing Restrictions", keywords: ["lease","rent","airbnb","vrbo","tenant"], answer: "Leasing is restricted and requires a permit. Homeowners must live in the unit for at least 2 years before qualifying. Airbnb, VRBO, short-term rentals, and subleasing are prohibited and subject to daily fines." },
  { category: "Security & Emergency", keywords: ["security","fob","access","emergency","911"], answer: "For emergencies such as fire, crime, or medical issues, call 911 immediately. Do not allow unknown individuals into the building. Report lost fobs immediately. Community Watch can be contacted for non-emergency concerns." },
  { category: "Maintenance & Repairs", keywords: ["maintenance","repair","leak","work order","vantaca"], answer: "Submit routine maintenance requests through Vantaca. Common area issues should also be reported to the Board at board@hillsideatlenox.com. For emergencies such as gas leaks or flooding, call 911 first." },
  { category: "Who To Contact", keywords: ["contact","who do i call","manager","liaison","amber","board"], answer: "Property Manager: Amber Nash, CAM at anash@heritageproperty.com or 770-200-8558. Main Heritage line: 770-451-8171. Board/Community Liaison: board@hillsideatlenox.com. For emergencies, call 911 first." },
];

const violationRules = [
  { title: "Front Parking Violation", severity: "High", keywords: ["front parking","park in front","overnight parking","parking overnight","30 minutes","parked out front"], rule: "Front parking is limited to 30 minutes maximum.", consequence: "May result in towing at the vehicle owner’s expense and/or HOA fines.", action: "Move the vehicle immediately. If documenting a violation, capture the vehicle, tag, time, and duration when possible." },
  { title: "Fire Lane / Red Zone Violation", severity: "Critical", keywords: ["fire lane","red zone","red curb"], rule: "The red zone/fire lane must remain clear for emergency vehicles at all times.", consequence: "May result in immediate towing and enforcement action.", action: "Move the vehicle immediately. If emergency access is blocked, escalate promptly." },
  { title: "Unauthorized Move Violation", severity: "High", keywords: ["move without scheduling","moving through front","front entrance move","elevator pads","moving without pads"], rule: "Moves must be scheduled, occur between 8:00 AM and 7:00 PM, go through the garage, and use elevator protection.", consequence: "May result in fines, damage charges, and enforcement action.", action: "Stop improper move activity, contact management/Board, and document damage or rule breaches." },
  { title: "Pool Rule Violation", severity: "Medium", keywords: ["glass at pool","pool party","private party pool","too many guests pool"], rule: "Private parties are not allowed at the pool. Residents are limited to 3 guests and glass is prohibited.", consequence: "May result in fines and loss of amenity privileges depending on severity.", action: "Remove prohibited items immediately and document the issue if enforcement is needed." },
  { title: "Trash / Bulk Item Violation", severity: "Medium", keywords: ["bulk item","large item","furniture","dumpster","trash chute","electronics","left in hallway"], rule: "Large items and electronics are not allowed in the dumpster room or common areas.", consequence: "May result in fines plus removal costs.", action: "Remove the item immediately. If documenting, take photos and note the unit if known." },
  { title: "Pet Rule Violation", severity: "Medium", keywords: ["dog off leash","pet waste","dog in pool","dog in lobby","pet in lobby"], rule: "Pets must be leashed in common areas. Pets are not allowed at the pool and must be carried or in a carrier in the lobby.", consequence: "May result in fines for the unit owner/resident.", action: "Correct the issue immediately and document repeat violations if needed." },
  { title: "Illegal Leasing / Short-Term Rental Violation", severity: "Critical", keywords: ["airbnb","vrbo","short term rental","sublease","lease without permit","illegal rental"], rule: "Leasing requires an approved permit. Airbnb, VRBO, short-term rentals, and subleasing are prohibited.", consequence: "May result in daily fines and loss or denial of leasing privileges.", action: "Report to the Board/property manager with listing links, dates, screenshots, and unit information." },
  { title: "Noise Violation", severity: "Medium", keywords: ["noise","loud music","party noise","after 10","quiet hours"], rule: "Residents are entitled to quiet enjoyment. Noise ordinances take effect each evening at 10:00 PM.", consequence: "May result in warnings, complaint letters, or fines depending on pattern and severity.", action: "Try neighborly resolution when appropriate. If repeated or severe, document times and contact management; call 911 if necessary." },
];

const quickPrompts = [
  "What happens if I park in front overnight?",
  "Can I bring glass to the pool?",
  "Can I rent my unit on Airbnb?",
  "What if someone dumps furniture?",
  "Who do I contact for maintenance?",
  "How do I reserve the clubroom?",
];

function getViolationIntelligence(message) {
  const normalized = message.toLowerCase();
  const matched = violationRules.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
  if (!matched) return null;
  return {
    title: `Violation Intelligence: ${matched.title}`,
    text: `Risk Level: ${matched.severity}\n\nRule: ${matched.rule}\n\nPotential Consequence: ${matched.consequence}\n\nRecommended Action: ${matched.action}\n\nFormal enforcement should be handled by the Property Manager and/or Board with supporting documentation.`
  };
}

function getStaticResponse(message) {
  const normalized = message.toLowerCase();
  const violation = getViolationIntelligence(message);
  if (violation && ["can i","what happens","allowed","violation","fine","tow","report"].some((x) => normalized.includes(x))) return violation;
  const matched = knowledgeBase.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
  if (matched) return { title: matched.category, text: matched.answer };
  if (["hello","hi","hey"].some((x) => normalized.includes(x))) return { title: "Welcome", text: "Good day. I’m Lenox, the Hillside at Lenox resident assistant. I can help with parking rules, dues, amenities, maintenance, violations, and who to contact." };
  return { title: "Need a human follow-up", text: "I do not have a confident answer for that yet. I’ve added this question to the learning queue for Board review. For urgent matters, contact Amber Nash or the Board at board@hillsideatlenox.com. For emergencies, call 911 first." };
}

function Card({ children, className = "" }) { return <div className={`card ${className}`}>{children}</div>; }
function Badge({ children, className = "" }) { return <span className={`badge ${className}`}>{children}</span>; }

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", title: "Welcome", text: "Good day. I’m Lenox — the Hillside at Lenox resident assistant. Ask me about parking, dues, amenities, maintenance, violations, or who to contact." }]);
  const [adminMode, setAdminMode] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
const [adminPassword, setAdminPassword] = useState("");
const BOARD_PASSWORD = "Hillside2026!";
  const [learningQueue, setLearningQueue] = useState([]);
  const [approvedKnowledge, setApprovedKnowledge] = useState([]);
  const [selectedLearningId, setSelectedLearningId] = useState(null);

  const selectedLearning = learningQueue.find((item) => item.id === selectedLearningId) ?? learningQueue[0];
  const stats = useMemo(() => [{ label: "Topics Covered", value: "12+" }, { label: "Resident Support", value: "24/7" }, { label: "Violation Intelligence", value: "Active" }], []);

  useEffect(() => {
    loadSupabaseKnowledge();
    loadSupabaseLearningQueue();
  }, []);

  async function loadSupabaseKnowledge() {
    if (!supabase) return;
    const { data, error } = await supabase.from("lenox_approved_knowledge").select("*").order("approved_at", { ascending: false });
    if (!error && data) setApprovedKnowledge(data.map((item) => ({ category: item.category, keywords: item.keywords || [], answer: item.answer })));
  }

  async function loadSupabaseLearningQueue() {
    if (!supabase) return;
    const { data, error } = await supabase.from("lenox_learning_queue").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      const mapped = data.map((item) => ({ id: item.id, question: item.question, suggestedCategory: item.suggested_category || "New Resident Question", suggestedKeywords: item.suggested_keywords || "", suggestedAnswer: item.suggested_answer || "", status: item.status || "pending" }));
      setLearningQueue(mapped);
      setSelectedLearningId(mapped[0]?.id ?? null);
    }
  }

  async function handleSend(preset) {
    const outgoing = (preset ?? input).trim();
    if (!outgoing) return;
    const normalized = outgoing.toLowerCase();
    const learnedMatch = approvedKnowledge.find((item) => item.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())));
    const response = learnedMatch ? { title: learnedMatch.category, text: learnedMatch.answer } : getStaticResponse(outgoing);

    setMessages((prev) => [...prev, { role: "user", text: outgoing }, { role: "assistant", title: response.title, text: response.text }]);

    if (response.title === "Need a human follow-up") {
      const localItem = { id: `local-${Date.now()}`, question: outgoing, suggestedCategory: "New Resident Question", suggestedKeywords: outgoing.toLowerCase().split(" ").slice(0, 6).join(", "), suggestedAnswer: "Draft an approved Hillside response here before publishing this answer to Lenox.", status: "pending" };
      setLearningQueue((prev) => [localItem, ...prev]);
      setSelectedLearningId(localItem.id);

      if (supabase) {
        const { data } = await supabase.from("lenox_learning_queue").insert({ question: outgoing, suggested_category: localItem.suggestedCategory, suggested_keywords: localItem.suggestedKeywords, suggested_answer: localItem.suggestedAnswer, status: localItem.status }).select().single();
        if (data) {
          setLearningQueue((prev) => prev.map((item) => item.id === localItem.id ? { id: data.id, question: data.question, suggestedCategory: data.suggested_category, suggestedKeywords: data.suggested_keywords, suggestedAnswer: data.suggested_answer, status: data.status } : item));
          setSelectedLearningId(data.id);
        }
      }
    }
    setInput("");
  }

  function updateLearningItem(field, value) {
    setLearningQueue((prev) => prev.map((item) => item.id === selectedLearning?.id ? { ...item, [field]: value } : item));
  }

  async function approveLearningItem() {
    if (!selectedLearning) return;
    const approvedItem = { category: selectedLearning.suggestedCategory, keywords: selectedLearning.suggestedKeywords.split(",").map((k) => k.trim()).filter(Boolean), answer: selectedLearning.suggestedAnswer };
    setApprovedKnowledge((prev) => [approvedItem, ...prev]);
    if (supabase) {
      await supabase.from("lenox_approved_knowledge").insert({ category: approvedItem.category, keywords: approvedItem.keywords, answer: approvedItem.answer });
      if (!String(selectedLearning.id).startsWith("local-")) await supabase.from("lenox_learning_queue").delete().eq("id", selectedLearning.id);
    }
    setLearningQueue((prev) => prev.filter((item) => item.id !== selectedLearning.id));
    const remaining = learningQueue.filter((item) => item.id !== selectedLearning.id);
    setSelectedLearningId(remaining[0]?.id ?? null);
  }

  async function rejectLearningItem() {
    if (!selectedLearning) return;
    if (supabase && !String(selectedLearning.id).startsWith("local-")) await supabase.from("lenox_learning_queue").delete().eq("id", selectedLearning.id);
    setLearningQueue((prev) => prev.filter((item) => item.id !== selectedLearning.id));
    const remaining = learningQueue.filter((item) => item.id !== selectedLearning.id);
    setSelectedLearningId(remaining[0]?.id ?? null);
  }

  function focusChat() {
    const inputEl = document.querySelector("#lenox-chat-input");
    inputEl?.focus();
    inputEl?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main className="page">
      <section className="layout">
        <div className="leftColumn">
          <Card>
            <div className="heroHeader"><div className="brandIcon"><Building2 size={26} /></div><div><p className="eyebrow">Hillside at Lenox Digital Concierge</p><h1>Ask Lenox</h1></div></div>
            <p className="lead">Lenox answers resident questions, reinforces handbook rules, routes residents to the right contacts, and learns from Board-approved answers.</p>
            <div className="stats">{stats.map((item) => <div className="stat" key={item.label}><p className="statValue">{item.value}</p><p className="statLabel">{item.label}</p></div>)}</div>
          </Card>

          <Card className="redCard">
            <div className="sectionTop"><div><p className="eyebrow redText">Violation Intelligence Mode</p><h2>Detect risk, explain the rule, and guide next steps</h2></div><Badge className="redBadge">Active</Badge></div>
            <div className="featureGrid four">{violationRules.slice(0, 4).map((rule) => <div className="feature" key={rule.title}><AlertTriangle size={20} /><h3>{rule.title}</h3><p className="severity">{rule.severity} Risk</p><p>{rule.consequence}</p></div>)}</div>
          </Card>

          <div className="featureGrid four">{[
            { icon: Car, title: "Parking Enforcement", text: "Reinforces the 30-minute front parking rule and towing risk." },
            { icon: Waves, title: "Amenity Rules", text: "Answers pool, sauna, club room, and fitness room questions." },
            { icon: ShieldCheck, title: "Rules & Violations", text: "Explains dues, pets, trash, and common-area expectations." },
            { icon: ConciergeBell, title: "Management Routing", text: "Directs residents to the correct Hillside contact channel." },
          ].map((item) => { const Icon = item.icon; return <div className="feature mini" key={item.title}><Icon size={20} /><h3>{item.title}</h3><p>{item.text}</p></div>; })}</div>

          <Card>
  <div className="sectionTop">
    <div>
      <p className="eyebrow">Board Access</p>
      <h2>Admin Learning Dashboard</h2>
    </div>
  </div>

  {!adminUnlocked ? (
    <div className="formStack">
      <label>
        Board password
        <input
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Enter board password"
        />
      </label>

      <button
        className="primaryButton"
        onClick={() => {
          if (adminPassword === BOARD_PASSWORD) {
            setAdminUnlocked(true);
            setAdminMode(true);
          } else {
            alert("Incorrect password");
          }
        }}
      >
        Unlock Admin
      </button>
    </div>
  ) : (
    <>
      <button
        className="outlineButton"
        onClick={() => setAdminMode((p) => !p)}
      >
        {adminMode ? "Hide Admin" : "Open Admin"}
      </button>

      {adminMode && (
        <div className="adminGrid">
          {/* keep your existing adminGrid code here */}
        </div>
      )}
    </>
  )}
</Card><h2>Review and approve Lenox answers</h2></div><button className="outlineButton" onClick={() => setAdminMode((p) => !p)}>{adminMode ? "Hide Admin" : "Open Admin"}</button></div>
            {adminMode && <div className="adminGrid">
              <div className="adminPanel"><div className="sectionTop compact"><h3>Pending questions</h3><Badge>{learningQueue.length} pending</Badge></div><div className="queueList">{learningQueue.length === 0 && <p className="muted">No pending resident questions right now.</p>}{learningQueue.map((item) => <button key={item.id} className={`queueItem ${selectedLearning?.id === item.id ? "selected" : ""}`} onClick={() => setSelectedLearningId(item.id)}><strong>{item.question}</strong><span>{item.status}</span></button>)}</div></div>
              <div className="adminPanel">{selectedLearning ? <div className="formStack"><label>Resident question<div className="readonlyBox">{selectedLearning.question}</div></label><label>Approved answer category<input value={selectedLearning.suggestedCategory} onChange={(e) => updateLearningItem("suggestedCategory", e.target.value)} /></label><label>Keywords Lenox should recognize<input value={selectedLearning.suggestedKeywords} onChange={(e) => updateLearningItem("suggestedKeywords", e.target.value)} /></label><label>Approved answer<textarea value={selectedLearning.suggestedAnswer} onChange={(e) => updateLearningItem("suggestedAnswer", e.target.value)} /></label><div className="buttonRow"><button className="primaryButton" onClick={approveLearningItem}>Approve and add to Lenox</button><button className="outlineButton" onClick={rejectLearningItem}>Reject</button></div></div> : <p className="muted">Select a pending question to review.</p>}</div>
            </div>}
          </Card>

          <Card>
            <h2>Key contacts Lenox can reference</h2>
            <div className="contactGrid">{Object.values(contacts).map((value) => <div className="contact" key={value}>{value}</div>)}</div>
            <div className="actionsBlock"><h3>Quick resident actions</h3><div className="actionGrid">{actionButtons.map((action) => { const Icon = action.icon; return <a key={action.label} href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel={action.href.startsWith("http") ? "noreferrer" : undefined} className="actionButton"><Icon size={16} />{action.label}</a>; })}</div></div>
          </Card>
        </div>

        <aside className="chatCard">
          <div className="chatHeader"><div className="avatarWrap"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Lenox avatar" className="avatar" /><div><h2>Ask Lenox</h2><p>Hillside digital concierge</p></div></div><Badge>Online</Badge></div>
          <div className="quickPrompts">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => handleSend(prompt)}>{prompt}</button>)}</div>
          <div className="messages">{messages.map((message, idx) => <div key={idx} className={`messageRow ${message.role === "user" ? "right" : "left"}`}><div className={`bubble ${message.role}`}>{message.title && message.role === "assistant" && <p className="bubbleTitle">{message.title}</p>}<p>{message.text}</p></div></div>)}</div>
          <div className="composer"><input id="lenox-chat-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }} placeholder="Ask Lenox about parking, dues, amenities, or contacts..." /><button onClick={() => handleSend()} aria-label="Send message"><Send size={18} /></button></div>
          <div className="chatActions"><a href="tel:7702008558">Call Amber</a><a href="mailto:anash@heritageproperty.com">Email Amber</a><a href="mailto:board@hillsideatlenox.com">Email Board</a></div>
        </aside>
      </section>

      <motion.button className="lenoxFloat" onClick={focusChat} aria-label="Ask Lenox" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} whileHover={{ scale: 1.04 }}>
        <span className="floatGlow" /><span className="helpBubble">Need help?</span><span className="floatInner"><span className="avatarDot"><span className="onlinePing" /><span className="onlineDot" /><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Lenox" /></span><span className="floatText"><strong>Ask Lenox</strong><small>Hillside Concierge</small></span><MessageSquare size={20} /></span>
      </motion.button>
    </main>
  );
}
