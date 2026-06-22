"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  AlertTriangle, Building2, Car, ConciergeBell, ExternalLink, Mail,
  MessageSquare, Phone, Send, ShieldCheck, Waves,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const BOARD_EMAIL = "board@hillsideatlenox.com";
const contacts = {
  propertyManager: "Amber Nash, CAM • Community Association Manager • Heritage Property Management Services, LLC • 500 Sugar Mill Road, Building B, Suite 200, Atlanta, GA 30350 • Main: 770-451-8171 • Direct: 770-200-8558 • anash@heritageproperty.com • www.heritageproperty.com",
  emergencyDay: "Emergency Answering Service (daytime): 770-200-8237",
  emergency24: "Emergency Answering Service (24 hours): 770-451-8171",
  liaison: `Community Liaison: ${BOARD_EMAIL}`,
  communityWatch: "Community Watch: 404-883-3350 or 811 on Hillside callboxes",
  towing: "A-Tow: 404-577-8950",
};

const actionButtons = [
  { label: "Call Amber", href: "tel:7702008558", icon: Phone },
  { label: "Email Amber", href: "mailto:anash@heritageproperty.com", icon: Mail },
  { label: "Call Heritage Main", href: "tel:7704518171", icon: Phone },
  { label: "Email Board", href: `mailto:${BOARD_EMAIL}`, icon: Mail },
  { label: "Open Vantaca", href: "https://portal.heritageproperty.com", icon: ExternalLink },
  { label: "Call Community Watch", href: "tel:4048833350", icon: Phone },
  { label: "Call A-Tow", href: "tel:4045778950", icon: Phone },
];

const knowledgeBase = [
  { category: "Parking Enforcement", keywords: ["parking", "front parking", "tow", "visitor", "fire lane", "handicap"], answer: "Front parking is limited to 30 minutes maximum. Parking beyond 30 minutes is a violation and may result in towing and fines. Do not park in the fire lane/red zone, handicapped spaces, or another resident’s assigned space without permission." },
  { category: "Move In / Move Out Rules", keywords: ["move in", "move out", "moving", "elevator", "fee"], answer: "All moves must be scheduled in advance with at least two weeks notice. Moving hours are 8:00 AM–7:00 PM. A $500 move-in/move-out fee applies. All moves must go through the garage, never the front entrance, and elevator pads must be used." },
  { category: "Pool Rules", keywords: ["pool", "swim", "pool rules", "guests pool", "glass"], answer: "Private parties are not allowed in the pool area. Residents are limited to 3 guests at a time. Glass containers are strictly prohibited. Residents must clean up after use." },
  { category: "Clubroom Rules", keywords: ["clubroom", "reserve room", "event", "party room", "club room"], answer: "The club room requires a reservation. The rental fee is $150 and the refundable deposit is $200. Events are limited to 25 guests and must end by 10:00 PM." },
  { category: "New Resident Tutorial", keywords: ["new resident", "new to hillside", "welcome", "move in", "first steps"], answer: "Welcome to Hillside at Lenox. Start by reviewing community rules and move-in procedures, registering your contact information with management, learning amenity access procedures, and saving the Board contact: board@hillsideatlenox.com. Amber Nash, CAM, can help with management questions at 770-200-8558 or anash@heritageproperty.com." },
  { category: "Maintenance & Repairs", keywords: ["maintenance", "repair", "leak", "work order", "vantaca"], answer: "Submit routine maintenance requests through Vantaca. Common-area issues should also be reported to the Board at board@hillsideatlenox.com. For emergencies such as gas leaks or flooding, call 911 first." },
  { category: "Who To Contact", keywords: ["contact", "who do i call", "manager", "liaison", "amber", "board"], answer: "Property Manager: Amber Nash, CAM, at anash@heritageproperty.com or 770-200-8558. Main Heritage line: 770-451-8171. Board/Community Liaison: board@hillsideatlenox.com. For emergencies, call 911 first." },
];

const violationRules = [
  { title: "Front Parking Violation", severity: "High", keywords: ["front parking", "park in front", "overnight parking", "30 minutes"], rule: "Front parking is limited to 30 minutes maximum.", consequence: "May result in towing at the vehicle owner’s expense and/or HOA fines.", action: "Move the vehicle immediately. Capture the vehicle, tag, time, and duration when possible." },
  { title: "Fire Lane / Red Zone Violation", severity: "Critical", keywords: ["fire lane", "red zone", "red curb"], rule: "The red zone/fire lane must remain clear for emergency vehicles at all times.", consequence: "May result in immediate towing and enforcement action.", action: "Move the vehicle immediately. Escalate promptly if emergency access is blocked." },
  { title: "Unauthorized Move Violation", severity: "High", keywords: ["move without scheduling", "moving through front", "front entrance move", "elevator pads"], rule: "Moves must be scheduled, use the garage, and use elevator protection.", consequence: "May result in fines, damage charges, and enforcement action.", action: "Contact management or the Board and document damage or rule breaches." },
  { title: "Pool Rule Violation", severity: "Medium", keywords: ["glass at pool", "pool party", "private party pool", "too many guests pool"], rule: "Private parties are not allowed; residents are limited to 3 guests and glass is prohibited.", consequence: "May result in fines and loss of amenity privileges.", action: "Remove prohibited items and document the issue if enforcement is needed." },
  { title: "Trash / Bulk Item Violation", severity: "Medium", keywords: ["bulk item", "large item", "furniture", "dumpster", "electronics", "left in hallway"], rule: "Large items and electronics are not allowed in the dumpster room or common areas.", consequence: "May result in fines plus removal costs.", action: "Remove the item immediately and take photos if documenting." },
  { title: "Illegal Leasing / Short-Term Rental Violation", severity: "Critical", keywords: ["airbnb", "vrbo", "short term rental", "sublease", "illegal rental"], rule: "Leasing requires an approved permit. Short-term rentals and subleasing are prohibited.", consequence: "May result in daily fines and loss or denial of leasing privileges.", action: "Report listing links, dates, screenshots, and unit information to the Board or manager." },
];

const quickPrompts = [
  "I am a new resident. What should I do first?",
  "What happens if I park in front overnight?",
  "Can I bring glass to the pool?",
  "Can I rent my unit on Airbnb?",
  "What if someone dumps furniture?",
  "Who do I contact for maintenance?",
];

function Card({ children, className = "" }) { return <div className={`card ${className}`}>{children}</div>; }
function Badge({ children, className = "" }) { return <span className={`badge ${className}`}>{children}</span>; }

function staticResponse(message) {
  const normalized = message.toLowerCase();
  const violation = violationRules.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
  if (violation && ["can i", "what happens", "allowed", "violation", "fine", "tow", "report"].some((word) => normalized.includes(word))) {
    return { title: `Violation Intelligence: ${violation.title}`, text: `Risk Level: ${violation.severity}\n\nRule: ${violation.rule}\n\nPotential Consequence: ${violation.consequence}\n\nRecommended Action: ${violation.action}\n\nFormal enforcement should be handled by the Property Manager and/or Board with supporting documentation.` };
  }
  const match = knowledgeBase.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
  if (match) return { title: match.category, text: match.answer };
  return { title: "Need a human follow-up", text: `I do not have a confident approved answer yet. I’ve added this question to the learning queue for Board review. For urgent matters, contact Amber Nash or the Board at ${BOARD_EMAIL}. For emergencies, call 911 first.` };
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", title: "Welcome", text: "Good day. I’m Lenox — the Hillside at Lenox resident assistant. Ask about parking, amenities, maintenance, violations, new-resident steps, or who to contact." }]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [learningQueue, setLearningQueue] = useState([]);
  const [approvedKnowledge, setApprovedKnowledge] = useState([]);
  const [selectedLearningId, setSelectedLearningId] = useState(null);
  const [newDocument, setNewDocument] = useState({ title: "", category: "", keywords: "", content: "" });
  const [notice, setNotice] = useState("");
  const selectedLearning = learningQueue.find((item) => item.id === selectedLearningId) || learningQueue[0];
  const stats = useMemo(() => [{ label: "Topics Covered", value: "12+" }, { label: "Resident Support", value: "24/7" }, { label: "Violation Intelligence", value: "Active" }], []);

  async function loadKnowledge() {
    if (!supabase) return;
    const { data, error } = await supabase.from("lenox_approved_knowledge").select("*").order("approved_at", { ascending: false });
    if (!error) setApprovedKnowledge((data || []).map((item) => ({ category: item.category, keywords: Array.isArray(item.keywords) ? item.keywords : [], answer: item.answer })));
  }

  async function loadQueue() {
    if (!supabase) return;
    const { data, error } = await supabase.from("lenox_learning_queue").select("*").order("created_at", { ascending: false });
    if (!error) {
      const rows = (data || []).map((item) => ({ id: item.id, question: item.question, suggestedCategory: item.suggested_category || "New Resident Question", suggestedKeywords: item.suggested_keywords || "", suggestedAnswer: item.suggested_answer || "", status: item.status || "pending" }));
      setLearningQueue(rows);
      setSelectedLearningId(rows[0]?.id || null);
    }
  }

  useEffect(() => { loadKnowledge(); }, []);
  useEffect(() => { if (adminUnlocked) loadQueue(); }, [adminUnlocked]);

  async function sendQuestion(preset) {
    const outgoing = (preset || input).trim();
    if (!outgoing) return;
    const normalized = outgoing.toLowerCase();
    const learned = approvedKnowledge.find((item) => item.keywords.some((word) => normalized.includes(String(word).toLowerCase())));
    const response = learned ? { title: learned.category, text: learned.answer } : staticResponse(outgoing);
    setMessages((current) => [...current, { role: "user", text: outgoing }, { role: "assistant", ...response }]);
    setInput("");
    if (response.title !== "Need a human follow-up") return;

    const local = { id: `local-${Date.now()}`, question: outgoing, suggestedCategory: "New Resident Question", suggestedKeywords: outgoing.toLowerCase().split(/\s+/).slice(0, 6).join(", "), suggestedAnswer: "Draft an approved Hillside response here before publishing this answer to Lenox.", status: "pending" };
    if (adminUnlocked) { setLearningQueue((current) => [local, ...current]); setSelectedLearningId(local.id); }
    if (supabase) await supabase.from("lenox_learning_queue").insert({ question: local.question, suggested_category: local.suggestedCategory, suggested_keywords: local.suggestedKeywords, suggested_answer: local.suggestedAnswer, status: local.status });
  }

  async function unlockAdmin(event) {
    event.preventDefault(); setAdminError("");
    try {
      const response = await fetch("/api/board-session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ password: adminPassword }) });
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "Incorrect password");
      setAdminPassword(""); setAdminUnlocked(true);
    } catch (error) { setAdminError(error.message || "Could not verify Board access."); }
  }

  function updateSelected(field, value) { setLearningQueue((current) => current.map((item) => item.id === selectedLearning?.id ? { ...item, [field]: value } : item)); }
  async function approveSelected() {
    if (!selectedLearning || !selectedLearning.suggestedAnswer.trim()) return;
    const item = { category: selectedLearning.suggestedCategory.trim(), keywords: selectedLearning.suggestedKeywords.split(",").map((word) => word.trim()).filter(Boolean), answer: selectedLearning.suggestedAnswer.trim() };
    if (supabase) {
      const { error } = await supabase.from("lenox_approved_knowledge").insert(item);
      if (error) { setNotice(error.message); return; }
      if (!String(selectedLearning.id).startsWith("local-")) await supabase.from("lenox_learning_queue").delete().eq("id", selectedLearning.id);
    }
    setApprovedKnowledge((current) => [item, ...current]);
    setLearningQueue((current) => current.filter((row) => row.id !== selectedLearning.id));
    setNotice("Answer approved and added to Lenox.");
  }
  async function rejectSelected() { if (!selectedLearning) return; if (supabase && !String(selectedLearning.id).startsWith("local-")) await supabase.from("lenox_learning_queue").delete().eq("id", selectedLearning.id); setLearningQueue((current) => current.filter((row) => row.id !== selectedLearning.id)); }
  async function saveDocument(event) {
    event.preventDefault();
    if (!newDocument.title.trim() || !newDocument.category.trim() || !newDocument.keywords.trim() || !newDocument.content.trim()) { setNotice("Complete all four document fields."); return; }
    // Existing schema has category, keywords, and answer. Preserve the title in the approved answer itself.
    const item = { category: newDocument.category.trim(), keywords: newDocument.keywords.split(",").map((word) => word.trim()).filter(Boolean), answer: `Document: ${newDocument.title.trim()}\n\n${newDocument.content.trim()}` };
    if (supabase) { const { error } = await supabase.from("lenox_approved_knowledge").insert(item); if (error) { setNotice(error.message); return; } }
    setApprovedKnowledge((current) => [item, ...current]); setNewDocument({ title: "", category: "", keywords: "", content: "" }); setNotice("Document saved to approved knowledge.");
  }
  async function addResidentTutorial() {
    const item = { category: "New Resident Tutorial", keywords: ["new resident", "welcome", "move in", "first steps", "Hillside at Lenox"], answer: "Document: New Resident Tutorial\n\nWelcome to Hillside at Lenox. Review community rules and move-in procedures, register your contact information with management, learn amenity access procedures, and save the Board email: board@hillsideatlenox.com. Amber Nash, CAM, can help with management questions at 770-200-8558 or anash@heritageproperty.com." };
    if (supabase) { const { error } = await supabase.from("lenox_approved_knowledge").insert(item); if (error) { setNotice(error.message); return; } }
    setApprovedKnowledge((current) => [item, ...current]); setNotice("New Resident Tutorial added to approved knowledge.");
  }
  async function toggleAdmin() {
    const opening = !adminOpen;
    setAdminOpen(opening);
    if (!opening || adminUnlocked) return;
    const response = await fetch("/api/board-session", { credentials: "same-origin" }).catch(() => null);
    const body = response ? await response.json().catch(() => ({})) : {};
    if (response?.ok && body.authenticated) setAdminUnlocked(true);
  }
  function focusChat() { document.querySelector("#lenox-chat-input")?.scrollIntoView({ behavior: "smooth", block: "center" }); document.querySelector("#lenox-chat-input")?.focus(); }

  return <main className="page"><section className="layout"><div className="leftColumn">
    <Card><div className="heroHeader"><div className="brandIcon"><Building2 size={26} /></div><div><p className="eyebrow">Hillside at Lenox Digital Concierge</p><h1>Ask Lenox</h1></div></div><p className="lead">Lenox answers resident questions, reinforces handbook rules, routes residents to the right contacts, and learns from Board-approved answers.</p><div className="stats">{stats.map((item) => <div className="stat" key={item.label}><p className="statValue">{item.value}</p><p className="statLabel">{item.label}</p></div>)}</div></Card>
    <Card className="redCard"><div className="sectionTop"><div><p className="eyebrow redText">Violation Intelligence Mode</p><h2>Detect risk, explain the rule, and guide next steps</h2></div><Badge className="redBadge">Active</Badge></div><div className="featureGrid four">{violationRules.slice(0, 4).map((rule) => <div className="feature" key={rule.title}><AlertTriangle size={20} /><h3>{rule.title}</h3><p className="severity">{rule.severity} Risk</p><p>{rule.consequence}</p></div>)}</div></Card>
    <div className="featureGrid four">{[{ icon: Car, title: "Parking Enforcement", text: "Reinforces the 30-minute front parking rule and towing risk." }, { icon: Waves, title: "Amenity Rules", text: "Answers pool, sauna, club room, and fitness room questions." }, { icon: ShieldCheck, title: "Rules & Violations", text: "Explains community expectations and next steps." }, { icon: ConciergeBell, title: "Management Routing", text: "Directs residents to the correct Hillside contact channel." }].map(({ icon: Icon, title, text }) => <div className="feature mini" key={title}><Icon size={20} /><h3>{title}</h3><p>{text}</p></div>)}</div>
    <Card><div className="sectionTop"><div><p className="eyebrow">Board Access</p><h2>Admin Learning Dashboard</h2></div><button className="outlineButton" onClick={toggleAdmin}>{adminOpen ? "Close Admin" : "Open Admin"}</button></div>{adminOpen && (!adminUnlocked ? <form className="formStack" onSubmit={unlockAdmin}><label>Board password<input type="password" autoComplete="current-password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} placeholder="Enter board password" required /></label><button className="primaryButton">Unlock Admin</button>{adminError && <p className="errorText">{adminError}</p>}</form> : <div className="adminGrid"><div className="adminPanel"><div className="sectionTop compact"><h3>Pending questions</h3><Badge>{learningQueue.length} pending</Badge></div><div className="queueList">{learningQueue.length ? learningQueue.map((item) => <button key={item.id} className={`queueItem ${selectedLearning?.id === item.id ? "selected" : ""}`} onClick={() => setSelectedLearningId(item.id)}><strong>{item.question}</strong><span>{item.status}</span></button>) : <p className="muted">No pending resident questions right now.</p>}</div></div><div className="adminPanel">{selectedLearning ? <div className="formStack"><label>Resident question<div className="readonlyBox">{selectedLearning.question}</div></label><label>Approved answer category<input value={selectedLearning.suggestedCategory} onChange={(event) => updateSelected("suggestedCategory", event.target.value)} /></label><label>Keywords Lenox should recognize<input value={selectedLearning.suggestedKeywords} onChange={(event) => updateSelected("suggestedKeywords", event.target.value)} /></label><label>Approved answer<textarea value={selectedLearning.suggestedAnswer} onChange={(event) => updateSelected("suggestedAnswer", event.target.value)} /></label><div className="buttonRow"><button className="primaryButton" onClick={approveSelected}>Approve and add to Lenox</button><button className="outlineButton" onClick={rejectSelected}>Reject</button></div></div> : <p className="muted">Select a pending question to review.</p>}</div></div>)}{adminOpen && adminUnlocked && <form className="formStack teachForm" onSubmit={saveDocument}><div className="sectionTop compact"><h3>Teach Lenox From New Document</h3><button type="button" className="outlineButton" onClick={addResidentTutorial}>New Resident Tutorial</button></div><label>Document Title<input value={newDocument.title} onChange={(event) => setNewDocument({ ...newDocument, title: event.target.value })} required /></label><label>Category<input value={newDocument.category} onChange={(event) => setNewDocument({ ...newDocument, category: event.target.value })} required /></label><label>Keywords <span className="muted">(comma-separated)</span><input value={newDocument.keywords} onChange={(event) => setNewDocument({ ...newDocument, keywords: event.target.value })} required /></label><label>Document Content<textarea value={newDocument.content} onChange={(event) => setNewDocument({ ...newDocument, content: event.target.value })} required /></label><button className="primaryButton">Save to approved knowledge</button>{notice && <p className="muted">{notice}</p>}</form>)}</Card>
    <Card><h2>Key contacts Lenox can reference</h2><div className="contactGrid">{Object.values(contacts).map((value) => <div className="contact" key={value}>{value}</div>)}</div><div className="actionsBlock"><h3>Quick resident actions</h3><div className="actionGrid">{actionButtons.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="actionButton"><Icon size={16} />{label}</a>)}</div></div></Card>
  </div><aside className="chatCard"><div className="chatHeader"><div className="avatarWrap"><div className="brandIcon"><Building2 size={24} /></div><div><h2>Ask Lenox</h2><p>Hillside digital concierge</p></div></div><Badge>Online</Badge></div><div className="quickPrompts">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendQuestion(prompt)}>{prompt}</button>)}</div><div className="messages">{messages.map((message, index) => <div key={index} className={`messageRow ${message.role === "user" ? "right" : "left"}`}><div className={`bubble ${message.role}`}>{message.title && message.role === "assistant" && <p className="bubbleTitle">{message.title}</p>}<p>{message.text}</p></div></div>)}</div><div className="composer"><input id="lenox-chat-input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendQuestion(); }} placeholder="Ask Lenox about parking, amenities, or contacts..." /><button onClick={() => sendQuestion()} aria-label="Send message"><Send size={18} /></button></div><div className="chatActions"><a href="tel:7702008558">Call Amber</a><a href="mailto:anash@heritageproperty.com">Email Amber</a><a href={`mailto:${BOARD_EMAIL}`}>Email Board</a></div></aside></section>
    <motion.button className="lenoxFloat" onClick={focusChat} aria-label="Ask Lenox" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} whileHover={{ scale: 1.04 }}><span className="floatGlow" /><span className="helpBubble">Need help?</span><span className="floatInner"><MessageSquare size={20} /><span className="floatText"><strong>Ask Lenox</strong><small>Hillside Concierge</small></span></span></motion.button>
  </main>;
}
