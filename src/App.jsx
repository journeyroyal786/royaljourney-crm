import React, { useState } from 'react';
import { 
  Shield, Users, Briefcase, DollarSign, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, FileText, Upload, Send, Plus, 
  Search, Calendar, MessageSquare, Check, X, Building2, 
  Phone, ArrowRight, UserCheck, Sparkles, LayoutDashboard,
  ExternalLink, CheckSquare
} from 'lucide-react';

// Exact Royal Journey Logo Component based on your uploaded branding
const RoyalLogo = ({ className = "h-12 w-auto" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative flex items-center justify-center bg-gradient-to-b from-[#251515] to-[#0f0707] border border-[#d4af37]/40 px-3 py-2 rounded-lg shadow-2xl shadow-black/80">
      <div className="absolute inset-0 bg-[#d4af37]/5 rounded-lg pointer-events-none"></div>
      <svg viewBox="0 0 200 85" className="h-10 w-auto drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
        {/* Golden Phoenix Emblem */}
        <g transform="translate(100, 2) scale(0.65)">
          <path d="M0 10 C 20 -15, 50 -10, 60 5 C 45 15, 30 25, 25 35 C 35 25, 55 10, 75 25 C 60 40, 30 50, 0 65 C -30 50, -60 40, -75 25 C -55 10, -35 25, -25 35 C -30 25, -45 15, -60 5 C -50 -10, -20 -15, 0 10 Z" fill="#d4af37" />
          <path d="M0 8 C 5 20, 15 35, 0 55 C -15 35, -5 20, 0 8 Z" fill="#f3e5ab" />
          <circle cx="0" cy="5" r="3" fill="#ffffff" />
        </g>
        {/* ROYAL text */}
        <text x="12" y="58" fontFamily="Cinzel, serif" fontWeight="800" fontSize="24" fill="#ffffff" letterSpacing="3">RO   AL</text>
        {/* JOURNEY text */}
        <text x="12" y="78" fontFamily="Cinzel, serif" fontWeight="700" fontSize="13" fill="#d4af37" letterSpacing="4.5">JOURNEY</text>
      </svg>
    </div>
  </div>
);

// Initial Mock Data
const INITIAL_LEADS = [
  {
    id: 'LEAD-101',
    clientName: 'Alexander Wright',
    company: 'Apex Global Ltd',
    phone: '+971 50 123 4567',
    email: 'alex@apexglobal.ae',
    activityType: 'Corporate Setup & Licensing',
    status: 'Following',
    stage: 'Sales',
    followUps: [
      { date: '2026-11-01', comment: 'Initial consultation completed. Interested in mainland license.', nextDate: '2026-11-05' }
    ],
    documents: [],
    invoice: null,
    paymentStatus: 'Pending'
  },
  {
    id: 'LEAD-102',
    clientName: 'Fatima Al-Maktoum',
    company: 'Desert Rose Ventures',
    phone: '+971 55 987 6543',
    email: 'fatima@desertrose.ae',
    activityType: 'Golden Visa Processing',
    status: 'Closed',
    stage: 'Operations',
    followUps: [
      { date: '2026-11-03', comment: 'Documents gathered for investor visa.', nextDate: '2026-11-06' }
    ],
    documents: [
      { name: 'Passport Copy.pdf', verified: true, uploadedAt: '2026-11-04' },
      { name: 'Emirates ID.pdf', verified: false, uploadedAt: '2026-11-04' }
    ],
    invoice: null,
    paymentStatus: 'Pending'
  },
  {
    id: 'LEAD-103',
    clientName: 'Marcus Sterling',
    company: 'Sterling Capital',
    phone: '+971 52 444 8899',
    email: 'marcus@sterlingcap.com',
    activityType: 'Corporate Bank Account Opening',
    status: 'Closed',
    stage: 'Finance',
    followUps: [
      { date: '2026-10-28', comment: 'Bank compliance review passed.', nextDate: '2026-11-02' }
    ],
    documents: [
      { name: 'Trade License.pdf', verified: true, uploadedAt: '2026-10-30' },
      { name: 'Board Resolution.pdf', verified: true, uploadedAt: '2026-10-30' }
    ],
    invoice: {
      number: 'INV-2026-089',
      amount: '15,000 AED',
      item: 'Bank Account Assistance & Advisory',
      status: 'Sent'
    },
    paymentStatus: 'Confirmed'
  }
];

const ACTIVITY_TYPES = [
  'Corporate Setup & Licensing',
  'Golden Visa Processing',
  'Corporate Bank Account Opening',
  'VAT & Tax Consultation',
  'Office Space Leasing'
];

export default function App() {
  const [currentRole, setCurrentRole] = useState('Admin'); // Admin, Sales, Operations, Finance
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [activityTypes, setActivityTypes] = useState(ACTIVITY_TYPES);
  const [newActivityName, setNewActivityName] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0].id);
  
  // Modal / Interaction states
  const [followUpComment, setFollowUpComment] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('');
  const [leadStatusUpdate, setLeadStatusUpdate] = useState('Following');
  
  // WhatsApp simulation modal
  const [whatsappModal, setWhatsappModal] = useState({ open: false, recipient: '', message: '' });

  // Selected Lead object
  const activeLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  // Handlers for Sales
  const handleSaveFollowUp = (e) => {
    e.preventDefault();
    if (!followUpComment) return;

    setLeads(leads.map(lead => {
      if (lead.id === activeLead.id) {
        const newFollowUps = [
          ...lead.followUps,
          {
            date: new Date().toISOString().split('T')[0],
            comment: followUpComment,
            nextDate: nextFollowUpDate || 'TBD'
          }
        ];
        
        let newStage = lead.stage;
        if (leadStatusUpdate === 'Closed' && lead.stage === 'Sales') {
          newStage = 'Operations'; // Automatically moves to Operations as requested in workflow!
        }

        return {
          ...lead,
          status: leadStatusUpdate,
          stage: newStage,
          followUps: newFollowUps
        };
      }
      return lead;
    }));

    setFollowUpComment('');
    setNextFollowUpDate('');
    alert('Follow-up recorded successfully!');
  };

  // Handlers for Operations
  const handleFileUpload = (e) => {
    const fileName = e.target.files[0]?.name || 'Document.pdf';
    setLeads(leads.map(lead => {
      if (lead.id === activeLead.id) {
        return {
          ...lead,
          documents: [...lead.documents, { name: fileName, verified: false, uploadedAt: new Date().toISOString().split('T')[0] }]
        };
      }
      return lead;
    }));
  };

  const toggleDocumentVerification = (docName) => {
    setLeads(leads.map(lead => {
      if (lead.id === activeLead.id) {
        return {
          ...lead,
          documents: lead.documents.map(d => d.name === docName ? { ...d, verified: !d.verified } : d)
        };
      }
      return lead;
    }));
  };

  const sendWhatsAppNotification = (message) => {
    setWhatsappModal({
      open: true,
      recipient: activeLead.phone + ' (' + activeLead.clientName + ')',
      message: message
    });
  };

  const transferToFinance = () => {
    const allVerified = activeLead.documents.length > 0 && activeLead.documents.every(d => d.verified);
    if (!allVerified) {
      if (!confirm('Not all documents are verified yet. Transfer to Finance anyway?')) return;
    }

    setLeads(leads.map(lead => {
      if (lead.id === activeLead.id) {
        return { ...lead, stage: 'Finance' };
      }
      return lead;
    }));
    alert('Case successfully transferred to Finance!');
  };

  // Handlers for Finance
  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const item = e.target.item.value;

    setLeads(leads.map(lead => {
      if (lead.id === activeLead.id) {
        return {
          ...lead,
          invoice: {
            number: 'INV-2026-' + Math.floor(100 + Math.random() * 900),
            amount: amount + ' AED',
            item: item,
            status: 'Sent'
          }
        };
      }
      return lead;
    }));
    e.target.reset();
    alert('Invoice created and sent to customer!');
  };

  const confirmPaymentAndComplete = () => {
    setLeads(leads.map(lead => {
      if (lead.id === activeLead.id) {
        return {
          ...lead,
          paymentStatus: 'Confirmed',
          stage: 'Completed'
        };
      }
      return lead;
    }));
    alert('Payment confirmed! Workflow marked as Completed.');
  };

  // Admin handlers
  const handleAddActivityType = (e) => {
    e.preventDefault();
    if (!newActivityName.trim()) return;
    setActivityTypes([...activityTypes, newActivityName.trim()]);
    setNewActivityName('');
  };

  const handleManualAssign = (leadId, newActivity) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, activityType: newActivity } : l));
  };

  return (
    <div className="min-h-screen bg-[#120808] text-gray-100 flex flex-col font-sans">
      
      {/* Top Header & Role Switcher */}
      <header className="bg-[#180a0a] border-b border-[#321515] px-6 py-4 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <RoyalLogo />
            <div className="hidden sm:block border-l border-[#321515] pl-4">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Enterprise CRM</span>
              <h1 className="text-lg font-cinzel font-bold text-white">Operations & Workflow Hub</h1>
            </div>
          </div>

          {/* Role Navigation Switcher */}
          <div className="flex items-center bg-[#0f0707] p-1.5 rounded-xl border border-[#321515] shadow-inner">
            {[
              { id: 'Admin', icon: Shield, label: 'Admin' },
              { id: 'Sales', icon: Briefcase, label: 'Sales' },
              { id: 'Operations', icon: FileText, label: 'Operations' },
              { id: 'Finance', icon: DollarSign, label: 'Finance' },
            ].map((role) => {
              const Icon = role.icon;
              const isActive = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setCurrentRole(role.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black shadow-lg shadow-[#d4af37]/20 font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1f0d0d]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#d4af37]'}`} />
                  {role.label}
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* Main CRM Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Lead List & Stage Tracker */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Stage Progress Overview */}
          <div className="bg-[#190c0c] border border-[#321515] rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-3 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Workflow Pipeline Stages
            </h3>
            <div className="space-y-2">
              {['Sales', 'Operations', 'Finance', 'Completed'].map((stg, idx) => {
                const count = leads.filter(l => l.stage === stg).length;
                const isCurrent = activeLead.stage === stg;
                return (
                  <div key={stg} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isCurrent 
                      ? 'bg-[#2a1313] border-[#d4af37]/60 shadow-md' 
                      : 'bg-[#120707] border-[#251010] text-gray-400'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCurrent ? 'bg-[#d4af37] text-black' : 'bg-[#251010] text-gray-400'
                      }`}>{idx + 1}</span>
                      <span className="font-medium text-sm text-white">{stg}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#140808] text-[#d4af37] border border-[#321515]">
                      {count} leads
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Leads Directory */}
          <div className="bg-[#190c0c] border border-[#321515] rounded-2xl p-5 shadow-xl flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#d4af37]" /> Active Client Leads ({leads.length})
              </h3>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
              {leads.map((lead) => {
                const isSelected = lead.id === selectedLeadId;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-r from-[#2c1313] to-[#1c0c0c] border-[#d4af37] shadow-lg shadow-black/60' 
                        : 'bg-[#120707] border-[#251010] hover:border-[#4d2121]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#d4af37]">{lead.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        lead.stage === 'Completed' ? 'bg-green-950 text-green-400 border border-green-800' :
                        lead.stage === 'Finance' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        lead.stage === 'Operations' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-purple-950 text-purple-400 border border-purple-800'
                      }`}>
                        {lead.stage}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white mb-0.5">{lead.clientName}</h4>
                    <p className="text-xs text-gray-400 mb-2">{lead.company} • <span className="text-[#f3e5ab]">{lead.activityType}</span></p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-[#251010] pt-2 mt-2">
                      <span>Status: <strong className="text-white">{lead.status}</strong></span>
                      <span className="flex items-center gap-1 text-[#d4af37]">View <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column: Role-Specific Action Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Lead Header Banner */}
          <div className="bg-[#190c0c] border border-[#321515] rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#d4af37] text-black">{activeLead.id}</span>
                  <span className="text-xs text-gray-400 font-medium">Stage: <strong className="text-[#d4af37]">{activeLead.stage}</strong></span>
                </div>
                <h2 className="text-2xl font-cinzel font-bold text-white">{activeLead.clientName}</h2>
                <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4 text-[#d4af37]" /> {activeLead.company} | 
                  <Phone className="w-4 h-4 text-[#d4af37] ml-2" /> {activeLead.phone}
                </p>
              </div>

              <div className="bg-[#120707] border border-[#321515] p-3 rounded-xl flex flex-col gap-1 min-w-[220px]">
                <span className="text-[11px] uppercase tracking-wider text-gray-400">Selected Activity Type</span>
                <span className="text-xs font-bold text-[#f3e5ab]">{activeLead.activityType}</span>
              </div>
            </div>

            {/* Role Notice Banner */}
            <div className="bg-[#140808] border border-[#321515] rounded-xl p-3 flex items-center justify-between text-xs">
              <span className="text-gray-300">
                You are currently viewing as <strong className="text-[#d4af37] uppercase">{currentRole}</strong>. 
                {currentRole === 'Sales' && ' Record follow-up notes and mark status as Closed to transition to Operations.'}
                {currentRole === 'Operations' && ' Verify documentation, send WhatsApp confirmation, and transfer to Finance.'}
                {currentRole === 'Finance' && ' Create invoice, issue payment link via WhatsApp, and confirm payment.'}
                {currentRole === 'Admin' && ' Manage team workflow permissions and activity types.'}
              </span>
              <span className="text-[#d4af37] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Active Workflow
              </span>
            </div>
          </div>

          {/* ========================================================== */}
          {/* ADMIN WORKSPACE VIEW */}
          {/* ========================================================== */}
          {currentRole === 'Admin' && (
            <div className="bg-[#190c0c] border border-[#321515] rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#321515] pb-4">
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#d4af37]" /> Admin Control Center
                  </h3>
                  <p className="text-xs text-gray-400">Manage activity types and manual lead assignments</p>
                </div>
              </div>

              {/* Activity Types Manager */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-3">Manage Activity Types</h4>
                  <form onSubmit={handleAddActivityType} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="New activity type name..."
                      value={newActivityName}
                      onChange={(e) => setNewActivityName(e.target.value)}
                      className="flex-1 bg-[#190c0c] border border-[#321515] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                    <button type="submit" className="bg-[#d4af37] text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#f3e5ab] transition">
                      Add
                    </button>
                  </form>
                  <div className="space-y-2 max-h-[180px] overflow-y-auto">
                    {activityTypes.map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-[#190c0c] border border-[#321515] rounded-lg text-xs">
                        <span className="text-white">{act}</span>
                        <span className="text-[10px] text-[#d4af37] bg-[#251010] px-2 py-0.5 rounded">Active</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manual Lead Reassignment */}
                <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3">Quick Lead Assignment</h4>
                    <p className="text-xs text-gray-400 mb-4">Override or reassign activity type for the selected client.</p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Selected Client:</label>
                        <span className="text-xs font-bold text-white">{activeLead.clientName} ({activeLead.company})</span>
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Assign Activity Type:</label>
                        <select
                          value={activeLead.activityType}
                          onChange={(e) => handleManualAssign(activeLead.id, e.target.value)}
                          className="w-full bg-[#190c0c] border border-[#321515] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        >
                          {activityTypes.map((act, idx) => (
                            <option key={idx} value={act}>{act}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#321515] text-[11px] text-gray-400">
                    Admin has full system overrides and pipeline visibility.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* SALES WORKSPACE VIEW */}
          {/* ========================================================== */}
          {currentRole === 'Sales' && (
            <div className="bg-[#190c0c] border border-[#321515] rounded-2xl p-6 shadow-xl space-y-6">
              <div className="border-b border-[#321515] pb-4">
                <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#d4af37]" /> Sales Follow-Up & Workflow
                </h3>
                <p className="text-xs text-gray-400">Select activity type from dropdown, record follow-ups, and move lead to Closed.</p>
              </div>

              {/* Activity Type Dropdown Selection */}
              <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white">1. Select Activity Type</h4>
                <select
                  value={activeLead.activityType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLeads(leads.map(l => l.id === activeLead.id ? { ...l, activityType: val } : l));
                  }}
                  className="w-full bg-[#190c0c] border border-[#321515] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {activityTypes.map((act, idx) => (
                    <option key={idx} value={act}>{act}</option>
                  ))}
                </select>
              </div>

              {/* Follow-up Recording Form */}
              <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white">2. Record Follow-Up & Status</h4>
                
                <form onSubmit={handleSaveFollowUp} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Lead Status Dropdown</label>
                      <select
                        value={leadStatusUpdate}
                        onChange={(e) => setLeadStatusUpdate(e.target.value)}
                        className="w-full bg-[#190c0c] border border-[#321515] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Following">Following</option>
                        <option value="Closed">Closed (Triggers Operations Stage)</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Next Follow-up Date (Calendar)</label>
                      <input
                        type="date"
                        value={nextFollowUpDate}
                        onChange={(e) => setNextFollowUpDate(e.target.value)}
                        className="w-full bg-[#190c0c] border border-[#321515] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Follow-Up Comment / Dialogue Note</label>
                    <textarea
                      rows="3"
                      placeholder="Enter discussion notes, client feedback, or required next steps..."
                      value={followUpComment}
                      onChange={(e) => setFollowUpComment(e.target.value)}
                      className="w-full bg-[#190c0c] border border-[#321515] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg hover:opacity-90 transition flex items-center gap-2">
                      <Check className="w-4 h-4" /> Save Follow-Up & Update Status
                    </button>
                  </div>
                </form>
              </div>

              {/* Follow-up History */}
              <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-3">Follow-Up History Log</h4>
                <div className="space-y-2">
                  {activeLead.followUps.map((f, idx) => (
                    <div key={idx} className="p-3 bg-[#190c0c] border border-[#321515] rounded-xl text-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between text-gray-400 text-[11px]">
                        <span>Date: <strong className="text-white">{f.date}</strong></span>
                        <span>Next Follow-up: <strong className="text-[#d4af37]">{f.nextDate}</strong></span>
                      </div>
                      <p className="text-gray-200">{f.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* OPERATIONS WORKSPACE VIEW */}
          {/* ========================================================== */}
          {currentRole === 'Operations' && (
            <div className="bg-[#190c0c] border border-[#321515] rounded-2xl p-6 shadow-xl space-y-6">
              <div className="border-b border-[#321515] pb-4">
                <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#d4af37]" /> Operations & Document Verification
                </h3>
                <p className="text-xs text-gray-400">Review required documents, upload files, verify status, and transfer to Finance.</p>
              </div>

              {/* Document Checklist & Upload */}
              <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Required Documentation for: <span className="text-[#d4af37]">{activeLead.activityType}</span></h4>
                  <label className="bg-[#251010] border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-2 shadow-md">
                    <Upload className="w-4 h-4" /> Upload Document
                    <input type="file" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <div className="space-y-3">
                  {activeLead.documents.length === 0 ? (
                    <p className="text-xs text-gray-400 italic py-4 text-center border border-dashed border-[#321515] rounded-xl">No documents uploaded yet. Click Upload Document above.</p>
                  ) : (
                    activeLead.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 bg-[#190c0c] border border-[#321515] rounded-xl">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#d4af37]" />
                          <div>
                            <span className="text-xs font-bold text-white">{doc.name}</span>
                            <span className="text-[10px] text-gray-400 block">Uploaded: {doc.uploadedAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleDocumentVerification(doc.name)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                              doc.verified 
                                ? 'bg-green-950 text-green-400 border border-green-800' 
                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}
                          >
                            {doc.verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            {doc.verified ? 'Verified' : 'Pending Verification'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Actions: WhatsApp & Transfer to Finance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => sendWhatsAppNotification(`Hello ${activeLead.clientName}, your documents for ${activeLead.activityType} have been successfully verified by Royal Journey Operations. We are now transferring your case to Finance.`)}
                  className="bg-[#120707] hover:bg-[#1f0d0d] border border-green-800/60 text-green-400 p-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Send className="w-4 h-4 text-green-400" /> Send WhatsApp Confirmation
                </button>

                <button
                  onClick={transferToFinance}
                  className="bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black p-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg hover:opacity-95"
                >
                  <ArrowRight className="w-4 h-4" /> Transfer Case to Finance
                </button>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* FINANCE WORKSPACE VIEW */}
          {/* ========================================================== */}
          {currentRole === 'Finance' && (
            <div className="bg-[#190c0c] border border-[#321515] rounded-2xl p-6 shadow-xl space-y-6">
              <div className="border-b border-[#321515] pb-4">
                <h3 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#d4af37]" /> Finance, Invoicing & Payment
                </h3>
                <p className="text-xs text-gray-400">Generate invoice, dispatch via WhatsApp, issue payment links, and confirm payment.</p>
              </div>

              {/* Invoice Generation Form */}
              <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white">Create & Send Invoice</h4>

                {activeLead.invoice ? (
                  <div className="p-4 bg-[#190c0c] border border-[#321515] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#d4af37]">{activeLead.invoice.number}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">{activeLead.invoice.status}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">{activeLead.invoice.item}</h5>
                      <p className="text-xs text-[#f3e5ab] mt-1 font-bold">Amount: {activeLead.invoice.amount}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => sendWhatsAppNotification(`Dear ${activeLead.clientName}, your invoice (${activeLead.invoice.number}) of ${activeLead.invoice.amount} for ${activeLead.invoice.item} is ready. Secure Payment Link: https://pay.royaljourney.ae/secure/pay-${activeLead.id}`)}
                        className="bg-[#120707] hover:bg-[#1f0d0d] border border-green-800 text-green-400 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition"
                      >
                        <Send className="w-3.5 h-3.5" /> Send WhatsApp Link
                      </button>

                      <button
                        onClick={confirmPaymentAndComplete}
                        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Payment & Complete
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCreateInvoice} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-300 block mb-1">Invoice Item / Description</label>
                        <input
                          type="text"
                          name="item"
                          required
                          placeholder="e.g. Corporate Licensing & Setup Fees"
                          className="w-full bg-[#190c0c] border border-[#321515] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-300 block mb-1">Amount (AED)</label>
                        <input
                          type="text"
                          name="amount"
                          required
                          placeholder="12,500"
                          className="w-full bg-[#190c0c] border border-[#321515] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg hover:opacity-90 transition">
                        Generate & Send Invoice
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Payment & Completion Status */}
              <div className="bg-[#120707] border border-[#321515] p-5 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Payment Status</h4>
                  <p className="text-xs text-gray-400">Current workflow completion status for {activeLead.clientName}</p>
                </div>
                <span className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  activeLead.paymentStatus === 'Confirmed' 
                    ? 'bg-green-950 text-green-400 border border-green-800' 
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {activeLead.paymentStatus === 'Confirmed' ? '✓ Payment Confirmed & Completed' : 'Pending Payment'}
                </span>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* WhatsApp Simulation Modal */}
      {whatsappModal.open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#190c0c] border border-[#321515] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#321515] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-900/40 border border-green-600 flex items-center justify-center text-green-400">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">WhatsApp Simulation Sent</h4>
                  <span className="text-[10px] text-green-400">Successfully dispatched to client</span>
                </div>
              </div>
              <button onClick={() => setWhatsappModal({ open: false, recipient: '', message: '' })} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-gray-400 block mb-1">Recipient:</span>
                <span className="text-xs font-bold text-white bg-[#120707] border border-[#321515] px-3 py-2 rounded-xl block">{whatsappModal.recipient}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block mb-1">Message Content:</span>
                <p className="text-xs text-gray-200 bg-[#120707] border border-[#321515] p-3 rounded-xl italic">"{whatsappModal.message}"</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setWhatsappModal({ open: false, recipient: '', message: '' })}
                className="bg-[#d4af37] text-black font-bold px-5 py-2 rounded-xl text-xs hover:bg-[#f3e5ab] transition"
              >
                Close Simulation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#140808] border-t border-[#321515] py-4 text-center text-xs text-gray-400">
        Royal Journey CRM • Powered by React, GitHub & Vercel
      </footer>

    </div>
  );
}
