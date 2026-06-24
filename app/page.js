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

// May 2026 Hillside Homeowners and Residents Information Handbook.
// These topic-sized records are intentionally easier for Lenox to retrieve than one large document.
const handbookEntries = [
  { category: "Handbook: Governance and Condo Documents", keywords: ["condo docs", "bylaws", "declaration", "governance", "homeowners association", "hoa rules"], answer: "Hillside is a condominium community: owners hold their individual units and share common areas. The Declaration of Condominium and Bylaws (the Condo Docs) are legally binding and take precedence over other community policies. The Handbook provides practical day-to-day guidance but does not override the Condo Docs." },
  { category: "Handbook: Property Management and Vantaca", keywords: ["heritage", "property manager", "amber nash", "vantaca", "work order", "assessment", "payment history"], answer: "Hillside is managed by Heritage Property Management Services. Amber Nash, CMCA, is the Portfolio Manager; email anash@heritageproperty.com or call 770-200-8610. For common-area work orders, documents, payment history, requests, FAQs, and calendar items, residents should first use Vantaca at https://portal.heritageproperty.com. The Heritage main line is 770-451-8171." },
  { category: "Handbook: New Resident Essentials", keywords: ["new resident", "new homeowner", "utilities", "mailbox", "fob", "key fob", "internet", "water", "gas"], answer: "New residents should set up utilities, register in the Hillside website, complete the Homeowner Information Sheet, register vehicles, arrange HOA assessment payments, and provide emergency key/alarm details to the Board. Georgia Power: 888-660-5890; water/sewer billing: Conservice 866-947-7379; internet providers include AT&T, Google Fiber, and Comcast. Contact the Board for additional fobs, remotes, stairwell combinations, or mailbox-key guidance. Do not share building access codes with non-residents." },
  { category: "Handbook: Move In and Move Out", keywords: ["move", "move in", "move out", "moving", "elevator pads", "garage", "move fee"], answer: "Schedule a move with Heritage and copy board@hillsideatlenox.com at least two weeks ahead. Moving hours are 8:00 AM–7:00 PM and the move fee is $500. Moves must use the garage—not the front entrance—and must not block the garage. Elevator pads and floor coverings are required; failure to use them carries a $100 charge plus any damage. Movers may use only the garage and the unit floor, common areas must be cleaned after the move, and moving debris may not go in hallways, trash rooms, or chutes." },
  { category: "Handbook: Emergency Access and Common Areas", keywords: ["emergency key", "alarm code", "common area damage", "camera", "cctv", "common areas"], answer: "Owners must provide the Board with a current door key and, if applicable, alarm code for emergency access; refusal can result in fines. Report damage or disrespect of common areas to the Board. Hillside has CCTV in many common areas for after-the-fact review and rule observance; cameras are not monitored 24/7 and are not a substitute for personal security." },
  { category: "Handbook: Safety and Community Watch", keywords: ["community watch", "doc", "derek cox", "crime", "tailgate", "security", "911", "stolen fob"], answer: "For an active crime, fire, medical emergency, or dangerous situation, call 911 first. Hillside Community Watch can be reached at 404-883-3350 or 811 on Hillside callboxes for non-emergency concerns such as loitering, tailgating, suspicious activity, smoking/vaping in common areas, or mailroom concerns. Report lost or stolen fobs to the Board immediately for deactivation. Do not let unknown people follow you into the building." },
  { category: "Handbook: Parking and Towing", keywords: ["parking", "tow", "a-tow", "front driveway", "red zone", "fire lane", "handicapped", "assigned space"], answer: "Garage spaces are assigned; do not use another resident’s space without written permission. Do not park in front of the building for more than 30 minutes, in the red-zone fire lane, or in a handicapped space. A-Tow: 404-577-8950. Parking violations can lead to towing and fines." },
  { category: "Handbook: Common Area Maintenance", keywords: ["common area maintenance", "burned out light", "fitness equipment", "water leak", "gas leak", "flood", "sewage"], answer: "Report common-area damage or maintenance issues to both Heritage and board@hillsideatlenox.com. For critical issues such as gas or water leaks, alarms, fire, illness, or death, call 911 immediately. Heritage coordinates common-area repairs; owners are responsible for costs associated with issues inside their own units." },
  { category: "Handbook: Unit Maintenance and Fire Safety", keywords: ["water shutoff", "water heater", "ac", "air conditioner", "bleach", "smoke detector", "sprinkler", "fireplace", "pest control"], answer: "Know your unit’s main water shut-off valve in the water-heater closet; turn the blue-handled valve horizontal to stop water flow. Maintain appliances and A/C drains, pour one cup of bleach into the A/C drain monthly, and change air-handler filters at least every three months. Keep smoke detectors working, do not paint sprinkler heads, and never leave fireplaces or candles unattended. Annual fire/sprinkler inspection access is mandatory. Association pest control is quarterly; contact the Board for details." },
  { category: "Handbook: Leasing and Short-Term Rentals", keywords: ["lease", "leasing permit", "rental", "tenant", "airbnb", "vrbo", "sublease", "hardship lease"], answer: "A homeowner in good standing who has lived at Hillside at least two years may be eligible to apply for a lease permit. The Condo Docs cap permits at 14; a unit vacant for more than 90 days between tenants loses its permit and must reapply. Subleasing, Airbnb, VRBO, and similar short-term rentals are prohibited. Renting without a permit may result in a $150-per-day fine. Tenants must receive the Handbook, agree to follow it, and provide required documentation and occupant information." },
  { category: "Handbook: Noise and Neighbor Relations", keywords: ["noise", "quiet hours", "loud music", "party", "10 pm", "neighbor"], answer: "Residents are entitled to quiet enjoyment. Noise ordinances take effect at 10:00 PM. First try a neighborly resolution; for recurring issues, contact Heritage, which can send a complaint letter without disclosing the reporting resident. Call 911 if the issue is severe or continues after other measures. Noise between 10 PM and 7 AM can result in a $100 fine." },
  { category: "Handbook: Pets", keywords: ["pet", "dog", "leash", "pet waste", "lobby", "pool", "dog fee"], answer: "Dogs must be leashed outside the unit; use the designated rear parking pet area and dispose of waste properly. Pets are never allowed at the pool and may enter the lobby only when carried or in a carrier. Do not place pet waste in recycling or the mailroom receptacle. The annual dog fee is $100, with a maximum of two dogs. Pet-rule violations may be fined." },
  { category: "Handbook: Trash and Recycling", keywords: ["trash", "garbage", "recycling", "glass recycling", "cardboard", "furniture", "electronics", "bulk item", "dumpster"], answer: "Place garbage in secured plastic bags; rinse liquid containers before disposal. Put closed bags in the trash bin at the bottom of the chute in the north-garage dumpster room. Recycle paper, flattened cardboard, plastic bottles, and cans; glass is not accepted in recycling. Large items and electronics are not allowed in the dumpster room—store them until the biannual bulk pickup or arrange individual pickup. Large-item disposal may be fined $500 plus removal cost." },
  { category: "Handbook: Balconies, Storage, and Dress", keywords: ["balcony", "patio", "grill", "satellite dish", "laundry", "storage", "hazardous materials", "dress code"], answer: "Electric grills are allowed only if not visible from the street; fire grills are prohibited. Do not hang laundry, towels, rugs, or other items from balconies, and do not leave visible clutter or satellite dishes. No hazardous or flammable materials may be stored in storage units or water-heater closets. Shirts, bottoms, and footwear are required in common areas except poolside." },
  { category: "Handbook: Architectural Requests and Renovations", keywords: ["architectural", "renovation", "remodel", "contractor", "remove wall", "flooring", "construction", "approval"], answer: "Major modifications, wall removal, projects using a general contractor or multiple trades, multi-day vendor work, and major repairs require prior Board approval through an Architectural Submission. Include plans, photos, permits, contractor insurance, and structural-engineer documentation when applicable. No work may begin before approval. Notify neighbors of anticipated noise; noisy work is limited to 8 AM–7 PM. New hardwood flooring needs specified soundproof underlay, and sprinkler heads must never be painted." },
  { category: "Handbook: Common Areas and Pool", keywords: ["pool", "grill", "glass", "pool guests", "private party", "common area", "amenity"], answer: "Clean and restore common areas after use; residents are responsible for guest damage. Private parties are not allowed at the pool. Residents may have up to three guests. Glass and other breakable containers are prohibited in the pool area by Georgia law and may result in a $200 fine. Clean and cover the grill after use; email the Board if propane needs replacement." },
  { category: "Handbook: Club Room", keywords: ["club room", "clubroom", "reservation", "club room fee", "club room deposit", "party room"], answer: "Email board@hillsideatlenox.com first to check date availability. Submit the reservation form with a $150 rental fee and separate $200 refundable damage-deposit check. Events are limited to 25 guests and must end by 10 PM. Guests must stay with an authorized resident. Do not move club-room furniture or the pool table; the pool is not included. No smoking, vaping, glitter, or confetti. The reserving resident must clean up and is responsible for damage." },
  { category: "Handbook: Fitness Room and Sauna", keywords: ["fitness", "gym", "sauna", "infrared sauna", "workout"], answer: "The fitness room is for residents only; children under 18 are not allowed, blinds should be closed in the evening, and use is at the resident’s risk. Sauna users must wear modest appropriate attire, bring a clean towel, shower first, keep electronics/food/drinks out, limit sessions to 30 minutes, and leave if dizzy or unwell. Sauna use is at the resident’s risk; violations may be fined." },
  { category: "Handbook: Contractors and Communications", keywords: ["vendor", "contractor", "whatsapp", "communications", "updates", "contact information"], answer: "Owners are responsible for contractor access and activity. Contractors must follow the Move-In/Move-Out Guidelines and can be expelled for violations, with fines assessed to the involved owner. Keep your phone number and email current with the Board and Heritage, and join the Hillside WhatsApp group for updates. Submit questions to Heritage in Vantaca or email board@hillsideatlenox.com." },
  { category: "Handbook: Board and Management Roles", keywords: ["board role", "management role", "board meeting", "homeowner responsibilities", "hoa meeting"], answer: "Homeowners must maintain their units, follow the Condo Docs and Handbook, report maintenance/security/rule issues, pay assessments, and participate in the HOA. The Board governs in the association’s best interest; day-to-day community issues should generally go first to Heritage. Board meetings are generally the third Thursday monthly at 6:30 PM, along with quarterly and annual homeowner meetings. Contact the Board in writing or at an association meeting rather than at members’ homes or workplaces." },
  { category: "Handbook: Who To Call", keywords: ["elevator", "gate", "front door", "club room access", "break in", "vehicle theft", "fire", "illness", "weather emergency"], answer: "For elevator, gate, elevator-lobby, front-door, or club-room access problems, contact Amber Nash and the Board. For fire, illness, death, personal attack, break-in, or vehicle theft, call 911 first, then Heritage. For weather emergencies, follow local news and mandatory evacuation orders. For rule violations, contact Heritage and inform the Board; provide photos, witnesses, and documentation when possible because hearsay alone is insufficient." },
  { category: "Handbook: Fees and Fines", keywords: ["fine", "fees", "violation fine", "move fine", "smoking fine", "glass fine", "late dues"], answer: "Selected fees: replacement hybrid fob/clicker $50, security-directory change $20, move fee $500, and annual dog fee $100. Repeat violations of the same type escalate: second is doubled, third tripled, and fourth/subsequent violations multiply by the number incurred. Examples include $400 for smoking/vaping indoors in common areas, $200 for glass at the pool, $300 for failing to schedule a move, and $150–$250 per day for illegal rentals. The Board determines fines not specified in the schedule." },
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
  const [importingHandbook, setImportingHandbook] = useState(false);
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
    const item = { category: "New Resident Tutorial", keywords: ["new resident", "welcome", "move in", "first steps", "Hillside at Lenox"], answer: "Document: New Resident Tutorial\n\nWelcome to Hillside at Lenox. Review community rules and move-in procedures, register your contact information with management, learn amenity access procedures, and save the Board email: board@hillsideatlenox.com. Amber Nash, CMCA, can help with management questions at 770-200-8610 or anash@heritageproperty.com." };
    if (supabase) { const { error } = await supabase.from("lenox_approved_knowledge").insert(item); if (error) { setNotice(error.message); return; } }
    setApprovedKnowledge((current) => [item, ...current]); setNotice("New Resident Tutorial added to approved knowledge.");
  }
  async function importHandbook() {
    if (!supabase) { setNotice("Supabase is not connected, so the handbook cannot be saved yet."); return; }
    setImportingHandbook(true); setNotice("");
    const existing = new Set(approvedKnowledge.map((item) => item.category));
    const entriesToAdd = handbookEntries.filter((item) => !existing.has(item.category));
    if (!entriesToAdd.length) { setNotice("The May 2026 handbook has already been added."); setImportingHandbook(false); return; }
    const { error } = await supabase.from("lenox_approved_knowledge").insert(entriesToAdd);
    if (error) setNotice(`Handbook import failed: ${error.message}`);
    else { setApprovedKnowledge((current) => [...entriesToAdd, ...current]); setNotice(`May 2026 handbook added: ${entriesToAdd.length} knowledge topics are now available to Lenox.`); }
    setImportingHandbook(false);
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
    <Card><div className="sectionTop"><div><p className="eyebrow">Board Access</p><h2>Admin Learning Dashboard</h2></div><button className="outlineButton" onClick={toggleAdmin}>{adminOpen ? "Close Admin" : "Open Admin"}</button></div>{adminOpen && (!adminUnlocked ? <form className="formStack" onSubmit={unlockAdmin}><label>Board password<input type="password" autoComplete="current-password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} placeholder="Enter board password" required /></label><button className="primaryButton">Unlock Admin</button>{adminError && <p className="errorText">{adminError}</p>}</form> : <div className="adminGrid"><div className="adminPanel"><div className="sectionTop compact"><h3>Pending questions</h3><Badge>{learningQueue.length} pending</Badge></div><div className="queueList">{learningQueue.length ? learningQueue.map((item) => <button key={item.id} className={`queueItem ${selectedLearning?.id === item.id ? "selected" : ""}`} onClick={() => setSelectedLearningId(item.id)}><strong>{item.question}</strong><span>{item.status}</span></button>) : <p className="muted">No pending resident questions right now.</p>}</div></div><div className="adminPanel">{selectedLearning ? <div className="formStack"><label>Resident question<div className="readonlyBox">{selectedLearning.question}</div></label><label>Approved answer category<input value={selectedLearning.suggestedCategory} onChange={(event) => updateSelected("suggestedCategory", event.target.value)} /></label><label>Keywords Lenox should recognize<input value={selectedLearning.suggestedKeywords} onChange={(event) => updateSelected("suggestedKeywords", event.target.value)} /></label><label>Approved answer<textarea value={selectedLearning.suggestedAnswer} onChange={(event) => updateSelected("suggestedAnswer", event.target.value)} /></label><div className="buttonRow"><button className="primaryButton" onClick={approveSelected}>Approve and add to Lenox</button><button className="outlineButton" onClick={rejectSelected}>Reject</button></div></div> : <p className="muted">Select a pending question to review.</p>}</div></div>)}{adminOpen && adminUnlocked && <form className="formStack teachForm" onSubmit={saveDocument}><div className="sectionTop compact"><h3>Teach Lenox From New Document</h3><button type="button" className="outlineButton" onClick={addResidentTutorial}>New Resident Tutorial</button></div><label>Document Title<input value={newDocument.title} onChange={(event) => setNewDocument({ ...newDocument, title: event.target.value })} required /></label><label>Category<input value={newDocument.category} onChange={(event) => setNewDocument({ ...newDocument, category: event.target.value })} required /></label><label>Keywords <span className="muted">(comma-separated)</span><input value={newDocument.keywords} onChange={(event) => setNewDocument({ ...newDocument, keywords: event.target.value })} required /></label><label>Document Content<textarea value={newDocument.content} onChange={(event) => setNewDocument({ ...newDocument, content: event.target.value })} required /></label><button className="primaryButton">Save to approved knowledge</button>{notice && <p className="muted">{notice}</p>}</form>}</Card>
    {adminOpen && adminUnlocked && <Card className="teachForm"><div className="sectionTop compact"><div><p className="eyebrow">One-time knowledge import</p><h3>Add the May 2026 Handbook</h3></div><button type="button" className="primaryButton" disabled={importingHandbook} onClick={importHandbook}>{importingHandbook ? "Adding handbook…" : "Add entire handbook"}</button></div><p className="muted">This saves the handbook as searchable, Board-approved topics in Lenox’s knowledge base. It will not create duplicate topics.</p>{notice && <p className="muted">{notice}</p>}</Card>}
    <Card><h2>Key contacts Lenox can reference</h2><div className="contactGrid">{Object.values(contacts).map((value) => <div className="contact" key={value}>{value}</div>)}</div><div className="actionsBlock"><h3>Quick resident actions</h3><div className="actionGrid">{actionButtons.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="actionButton"><Icon size={16} />{label}</a>)}</div></div></Card>
  </div><aside className="chatCard"><div className="chatHeader"><div className="avatarWrap"><div className="brandIcon"><Building2 size={24} /></div><div><h2>Ask Lenox</h2><p>Hillside digital concierge</p></div></div><Badge>Online</Badge></div><div className="quickPrompts">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendQuestion(prompt)}>{prompt}</button>)}</div><div className="messages">{messages.map((message, index) => <div key={index} className={`messageRow ${message.role === "user" ? "right" : "left"}`}><div className={`bubble ${message.role}`}>{message.title && message.role === "assistant" && <p className="bubbleTitle">{message.title}</p>}<p>{message.text}</p></div></div>)}</div><div className="composer"><input id="lenox-chat-input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendQuestion(); }} placeholder="Ask Lenox about parking, amenities, or contacts..." /><button onClick={() => sendQuestion()} aria-label="Send message"><Send size={18} /></button></div><div className="chatActions"><a href="tel:7702008558">Call Amber</a><a href="mailto:anash@heritageproperty.com">Email Amber</a><a href={`mailto:${BOARD_EMAIL}`}>Email Board</a></div></aside></section>
    <motion.button className="lenoxFloat" onClick={focusChat} aria-label="Ask Lenox" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} whileHover={{ scale: 1.04 }}><span className="floatGlow" /><span className="helpBubble">Need help?</span><span className="floatInner"><MessageSquare size={20} /><span className="floatText"><strong>Ask Lenox</strong><small>Hillside Concierge</small></span></span></motion.button>
  </main>;
}
