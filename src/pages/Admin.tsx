// // // // // src/pages/BlogPage.tsx
// // // // import React, { useEffect, useMemo, useState } from "react";
// // // // import Header from "@/components/Header";
// // // // import Footer from "@/components/Footer";
// // // // import TokenUsageSection from "@/components/TokenUsageSection";
// // // // import {
// // // //   Pencil,
// // // //   Trash2,
// // // //   CheckCircle2,
// // // //   Plus,
// // // //   X,
// // // //   ChevronDown,
// // // // } from "lucide-react";

// // // // /* =========================== Types & data =========================== */
// // // // type Role = "Admin" | "Team Member";
// // // // type Status = "Active" | "Pending";

// // // // type Member = {
// // // //   name: string;
// // // //   email: string;
// // // //   role: Role;
// // // //   status: Status;
// // // //   tokens: number;     // distributed tokens
// // // //   available: number;  // available tokens
// // // // };

// // // // const ORG_LIMIT = 100_000;

// // // // /* ---------------- Metric card (250x80, one-line text) ---------------- */
// // // // function MetricCard({
// // // //   label,
// // // //   value,
// // // //   icon,
// // // // }: {
// // // //   label: string;
// // // //   value: string | number;
// // // //   icon?: React.ReactNode;
// // // // }) {
// // // //   return (
// // // //     <div
// // // //       className="border border-white/10 bg-[#121316] text-white flex items-center gap-3 px-4"
// // // //       style={{ width: 250, height: 80, borderRadius: 16, opacity: 1 }}
// // // //     >
// // // //       {icon ? (
// // // //         <div className="inline-grid place-items-center w-8 h-8 rounded-full bg-white/5 shrink-0">
// // // //           {icon}
// // // //         </div>
// // // //       ) : null}
// // // //       <div className="min-w-0">
// // // //         <div className="text-sm text-white/70 truncate">{label}</div>
// // // //         <div className="text-xl font-semibold truncate">{value}</div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function NumberInput({
// // // //   value,
// // // //   onChange,
// // // //   placeholder,
// // // // }: {
// // // //   value: string;
// // // //   onChange: (v: string) => void;
// // // //   placeholder?: string;
// // // // }) {
// // // //   return (
// // // //     <input
// // // //       inputMode="numeric"
// // // //       pattern="[0-9]*"
// // // //       value={value}
// // // //       onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
// // // //       className="w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 outline-none"
// // // //       placeholder={placeholder}
// // // //     />
// // // //   );
// // // // }

// // // // /* -------------------------- Add/Edit Member Modal -------------------------- */
// // // // function MemberModal({
// // // //   open,
// // // //   mode, // 'add' | 'edit'
// // // //   initialMember,
// // // //   onClose,
// // // //   onAdd,
// // // //   onUpdate,
// // // //   members = [],
// // // //   onRemove,
// // // //   onChangeRole,
// // // //   remainingTokens,
// // // // }: {
// // // //   open: boolean;
// // // //   mode: "add" | "edit";
// // // //   initialMember?: Member | null;
// // // //   onClose: () => void;
// // // //   onAdd: (m: Member) => void;
// // // //   onUpdate: (email: string, updates: Partial<Member>) => void;
// // // //   members?: Member[];
// // // //   onRemove: (email: string) => void;
// // // //   onChangeRole: (email: string, role: Role) => void;
// // // //   remainingTokens: number;
// // // // }) {
// // // //   const editing = mode === "edit";
// // // //   const [fullName, setFullName] = useState("");
// // // //   const [email, setEmail] = useState("");
// // // //   const [role, setRole] = useState<Role>("Team Member");
// // // //   const [distribution, setDistribution] = useState<string>("");

// // // //   useEffect(() => {
// // // //     if (!open) return;
// // // //     if (editing && initialMember) {
// // // //       setFullName(initialMember.name);
// // // //       setEmail(initialMember.email);
// // // //       setRole(initialMember.role);
// // // //       setDistribution(String(initialMember.tokens));
// // // //     } else {
// // // //       setFullName("");
// // // //       setEmail("");
// // // //       setRole("Team Member");
// // // //       setDistribution("");
// // // //     }
// // // //   }, [open, editing, initialMember]);

// // // //   const ordered = useMemo(
// // // //     () =>
// // // //       [...members].sort((a, b) =>
// // // //         a.status === b.status ? 0 : a.status === "Pending" ? -1 : 1
// // // //       ),
// // // //     [members]
// // // //   );

// // // //   if (!open) return null;

// // // //   const currentTokens = editing && initialMember ? initialMember.tokens : 0;
// // // //   const effectiveRemaining = remainingTokens + currentTokens;

// // // //   const canSubmit =
// // // //     (editing || (fullName.trim() && email.trim())) &&
// // // //     distribution.trim() &&
// // // //     Number(distribution) > 0;

// // // //   const presets = [5000, 10000, 15000, 20000];

// // // //   const handleSubmit = () => {
// // // //     if (!canSubmit) return;
// // // //     const amount = Number(distribution);

// // // //     if (amount > effectiveRemaining) {
// // // //       window.alert(
// // // //         `Only ${effectiveRemaining.toLocaleString()} tokens available for allocation.`
// // // //       );
// // // //       return;
// // // //     }

// // // //     if (editing && initialMember) {
// // // //       onUpdate(initialMember.email, {
// // // //         role,
// // // //         tokens: amount,
// // // //         available: amount,
// // // //       });
// // // //       onClose();
// // // //       return;
// // // //     }

// // // //     onAdd({
// // // //       name: fullName.trim(),
// // // //       email: email.trim(),
// // // //       role,
// // // //       status: "Pending",
// // // //       tokens: amount,
// // // //       available: amount,
// // // //     });

// // // //     setFullName("");
// // // //     setEmail("");
// // // //     setRole("Team Member");
// // // //     setDistribution("");
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 z-[100] grid place-items-center" role="dialog" aria-modal="true">
// // // //       <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
// // // //       <div className="relative w-[96vw] max-w-[900px] rounded-2xl border border-white/10 bg-[#141518] text-white shadow-xl overflow-hidden">
// // // //         {/* header */}
// // // //         <div className="flex items-center justify-between px-6 py-5">
// // // //           <h3 className="text-xl font-semibold">
// // // //             {editing ? "Edit Member" : "Add New Member"}
// // // //           </h3>
// // // //           <button
// // // //             type="button"
// // // //             onClick={onClose}
// // // //             className="grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// // // //             aria-label="Close"
// // // //           >
// // // //             <X className="w-4 h-4" />
// // // //           </button>
// // // //         </div>

// // // //         {/* form */}
// // // //         <div className="px-6 pb-6">
// // // //           <label className="block text-sm mb-2">Full name *</label>
// // // //           <input
// // // //             value={fullName}
// // // //             onChange={(e) => setFullName(e.target.value)}
// // // //             className={`w-full h-11 rounded-lg border px-3 outline-none ${
// // // //               editing
// // // //                 ? "bg-[#1A1B1F]/60 border-white/10 text-white/70 cursor-not-allowed"
// // // //                 : "bg-[#1A1B1F] border-white/10"
// // // //             }`}
// // // //             placeholder="Enter full name"
// // // //             disabled={editing}
// // // //             aria-readonly={editing}
// // // //           />

// // // //           <label className="block text-sm mt-4 mb-2">Email *</label>
// // // //           <input
// // // //             value={email}
// // // //             onChange={(e) => setEmail(e.target.value)}
// // // //             className={`w-full h-11 rounded-lg border px-3 outline-none ${
// // // //               editing
// // // //                 ? "bg-[#1A1B1F]/60 border-white/10 text-white/70 cursor-not-allowed"
// // // //                 : "bg-[#1A1B1F] border-white/10"
// // // //             }`}
// // // //             placeholder="Enter email"
// // // //             disabled={editing}
// // // //             aria-readonly={editing}
// // // //           />

// // // //           <label className="block text-sm mt-4 mb-2">Role *</label>
// // // //           <div className="relative">
// // // //             <select
// // // //               value={role}
// // // //               onChange={(e) =>
// // // //                 setRole(e.target.value === "Admin" ? "Admin" : "Team Member")
// // // //               }
// // // //               className="appearance-none w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 pr-10 outline-none"
// // // //             >
// // // //               <option value="Team Member">Member</option>
// // // //               <option value="Admin">Admin</option>
// // // //             </select>
// // // //             <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
// // // //               <ChevronDown className="w-4 h-4" />
// // // //             </span>
// // // //           </div>

// // // //           <label className="block text-sm mt-4 mb-2">Token Distribution *</label>
// // // //           <NumberInput value={distribution} onChange={setDistribution} placeholder="e.g., 5000" />

// // // //           <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
// // // //             <div className="flex items-center gap-2">
// // // //               {presets.map((p) => (
// // // //                 <button
// // // //                   key={p}
// // // //                   type="button"
// // // //                   onClick={() => setDistribution(String(p))}
// // // //                   className="px-3 h-8 rounded-full bg-black/30 border border-white/10 text-sm hover:bg-black/40"
// // // //                 >
// // // //                   {p.toLocaleString()}
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //             <div className="text-sm text-white/80">
// // // //               Available Tokens : {effectiveRemaining.toLocaleString()}
// // // //             </div>
// // // //           </div>

// // // //           <button
// // // //             type="button"
// // // //             onClick={handleSubmit}
// // // //             disabled={!canSubmit}
// // // //             className="mt-6 w-full h-11 rounded-lg text-sm font-medium disabled:opacity-60"
// // // //             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
// // // //           >
// // // //             {editing ? "Update" : "Send Invite"}
// // // //           </button>
// // // //         </div>

// // // //         {!editing && (
// // // //           <>
// // // //             <div className="h-px bg-white/10" />
// // // //             <div className="px-6 py-4">
// // // //               <h4 className="text-lg font-semibold">Team Members & Invites</h4>
// // // //               <div className="mt-3 space-y-3 max-h-[280px] overflow-y-auto pr-1">
// // // //                 {ordered.map((m) => (
// // // //                   <div
// // // //                     key={m.email}
// // // //                     className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1B1F] border border-white/10"
// // // //                   >
// // // //                     <div className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-sm font-semibold">
// // // //                       {m.name?.[0]?.toUpperCase() || "U"}
// // // //                     </div>
// // // //                     <div className="min-w-0">
// // // //                       <div className="font-medium truncate">{m.name}</div>
// // // //                       <div className="text-white/60 text-sm truncate">{m.email}</div>
// // // //                     </div>
// // // //                     <span
// // // //                       className={`ml-2 text-xs ${
// // // //                         m.status === "Pending" ? "text-yellow-400" : "text-emerald-400"
// // // //                       }`}
// // // //                     >
// // // //                       {m.status}
// // // //                     </span>

// // // //                     <div className="ml-auto">
// // // //                       <div className="relative">
// // // //                         <select
// // // //                           value={m.role}
// // // //                           onChange={(e) =>
// // // //                             onChangeRole(
// // // //                               m.email,
// // // //                               e.target.value === "Admin" ? "Admin" : "Team Member"
// // // //                             )
// // // //                           }
// // // //                           className="appearance-none bg-[#141518] border border-white/10 rounded-lg h-9 pl-3 pr-8 text-sm"
// // // //                         >
// // // //                           <option value="Team Member">Member</option>
// // // //                           <option value="Admin">Admin</option>
// // // //                         </select>
// // // //                         <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60">
// // // //                           <ChevronDown className="w-4 h-4" />
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>

// // // //                     <button
// // // //                       type="button"
// // // //                       onClick={() => onRemove(m.email)}
// // // //                       className="ml-2 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// // // //                       title="Remove"
// // // //                     >
// // // //                       <X className="w-4 h-4" />
// // // //                     </button>
// // // //                   </div>
// // // //                 ))}
// // // //                 {ordered.length === 0 && (
// // // //                   <div className="text-sm text-white/60">No members yet.</div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* -------------------------- Delete Confirm Modal -------------------------- */
// // // // function DeleteConfirmModal({
// // // //   open,
// // // //   member,
// // // //   onCancel,
// // // //   onConfirm,
// // // // }: {
// // // //   open: boolean;
// // // //   member: Member | null;
// // // //   onCancel: () => void;
// // // //   onConfirm: (email: string) => void;
// // // // }) {
// // // //   if (!open || !member) return null;

// // // //   return (
// // // //     <div className="fixed inset-0 z-[110] grid place-items-center" role="dialog" aria-modal="true">
// // // //       <div className="absolute inset-0 bg-black/60" onClick={onCancel} aria-hidden />

// // // //       {/* Card */}
// // // //       <div
// // // //         className="relative w-[92vw] max-w-[460px] rounded-2xl bg-[#17171A] text-white shadow-xl text-center"
// // // //         style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
// // // //       >
// // // //         {/* Title + close */}
// // // //         <div className="px-6 pt-6 pb-2 relative">
// // // //           <h3 className="text-lg font-semibold">
// // // //             Remove {member.name} from this Team?
// // // //           </h3>
// // // //           <button
// // // //             type="button"
// // // //             onClick={onCancel}
// // // //             className="absolute right-3 top-3 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// // // //             aria-label="Close"
// // // //           >
// // // //             <X className="w-4 h-4" />
// // // //           </button>
// // // //         </div>

// // // //         {/* Body */}
// // // //         <div className="px-6 pb-2">
// // // //           <p className="text-sm text-white/85">
// // // //             {member.name} will be removed from this Team and will no longer have access
// // // //             to the Tokens stored within it.
// // // //           </p>
// // // //           <p className="text-sm text-white/85 mt-3">Do you want to remove?</p>
// // // //         </div>

// // // //         {/* Actions (centered) */}
// // // //         <div className="flex items-center justify-center gap-3 px-6 py-5">
// // // //           <button
// // // //             type="button"
// // // //             onClick={onCancel}
// // // //             className="h-10 px-5 rounded-lg bg-white/10 hover:bg-white/15"
// // // //           >
// // // //             Cancel
// // // //           </button>
// // // //           <button
// // // //             type="button"
// // // //             onClick={() => onConfirm(member.email)}
// // // //             className="h-10 px-6 rounded-lg text-white"
// // // //             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
// // // //           >
// // // //             Remove
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* ================================ Page ================================ */
// // // // export default function BlogPage() {
// // // //   const [members, setMembers] = useState<Member[]>([]);

// // // //   const totalDistributed = useMemo(
// // // //     () => members.reduce((s, m) => s + m.tokens, 0),
// // // //     [members]
// // // //   );
// // // //   const remaining = Math.max(0, ORG_LIMIT - totalDistributed);

// // // //   // add/edit modal state
// // // //   const [openModal, setOpenModal] = useState(false);
// // // //   const [modalMode, setModalMode] = useState<"add" | "edit">("add");
// // // //   const [editTarget, setEditTarget] = useState<Member | null>(null);

// // // //   // delete modal state
// // // //   const [deleteOpen, setDeleteOpen] = useState(false);
// // // //   const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

// // // //   const addMember = (m: Member) => setMembers((prev) => [m, ...prev]);
// // // //   const removeMember = (email: string) =>
// // // //     setMembers((prev) => prev.filter((x) => x.email !== email));
// // // //   const changeRole = (email: string, role: Role) =>
// // // //     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, role } : x)));
// // // //   const updateMember = (email: string, updates: Partial<Member>) =>
// // // //     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, ...updates } : x)));

// // // //   const openAdd = () => {
// // // //     setModalMode("add");
// // // //     setEditTarget(null);
// // // //     setOpenModal(true);
// // // //   };
// // // //   const openEdit = (m: Member) => {
// // // //     setModalMode("edit");
// // // //     setEditTarget(m);
// // // //     setOpenModal(true);
// // // //   };
// // // //   const openDelete = (m: Member) => {
// // // //     setDeleteTarget(m);
// // // //     setDeleteOpen(true);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen w-full bg-[#07080A] text-white">
// // // //       <Header />

// // // //       <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-14">
// // // //         {/* TokenUsage centered */}
// // // //         <div className="w-full flex justify-center">
// // // //           <div className="mx-auto">
// // // //             <TokenUsageSection />
// // // //           </div>
// // // //         </div>

// // // //         {/* Metrics BELOW the token usage, centered */}
// // // //         <div className="mt-6 sm:mt-8 w-full flex justify-center">
// // // //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // // //             <MetricCard label="Total Members" value={members.length} icon={<span>👥</span>} />
// // // //             <MetricCard label="Total Tokens Distributed" value={totalDistributed.toLocaleString()} icon={<span>🎁</span>} />
// // // //             <MetricCard label="Total Tokens Remaining" value={remaining.toLocaleString()} icon={<span>🪙</span>} />
// // // //           </div>
// // // //         </div>

// // // //         {/* Members section */}
// // // //         <section className="mt-8 rounded-2xl bg-transparent">
// // // //           <div className="flex items-center justify-between p-1 sm:p-1">
// // // //             <h2 className="text-base sm:text-lg font-semibold">Team Members</h2>

// // // //             {/* Add member button: white button, black circular + */}
// // // //             <button
// // // //               type="button"
// // // //               onClick={openAdd}
// // // //               className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white text-black hover:opacity-90"
// // // //               title="Add new member"
// // // //             >
// // // //               <span className="grid place-items-center w-6 h-6 rounded-full bg-black text-white">
// // // //                 <Plus className="w-4 h-4" />
// // // //               </span>
// // // //               Add new member
// // // //             </button>
// // // //           </div>

// // // //           <div className="overflow-x-auto mt-3">
// // // //             <table
// // // //               className="w-full text-left table-fixed border-separate"
// // // //               style={{ borderSpacing: "24px 14px" }}
// // // //             >
// // // //               {/* Equal widths */}
// // // //               <colgroup>
// // // //                 <col style={{ width: "14.2857%" }} />
// // // //                 <col style={{ width: "14.2857%" }} />
// // // //                 <col style={{ width: "14.2857%" }} />
// // // //                 <col style={{ width: "14.2857%" }} />
// // // //                 <col style={{ width: "14.2857%" }} />
// // // //                 <col style={{ width: "14.2857%" }} />
// // // //                 <col style={{ width: "14.2857%" }} />
// // // //               </colgroup>

// // // //               <thead className="text-white/70 text-sm">
// // // //                 <tr>
// // // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Name</th>
// // // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Email</th>
// // // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Role</th>
// // // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Status</th>
// // // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Tokens</th>
// // // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Available</th>
// // // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Actions</th>
// // // //                 </tr>
// // // //               </thead>

// // // //               <tbody>
// // // //                 {members.length === 0 ? (
// // // //                   <tr>
// // // //                     <td className="text-white/60 text-sm py-4" colSpan={7}>
// // // //                       No members yet. Click “Add new member”.
// // // //                     </td>
// // // //                   </tr>
// // // //                 ) : (
// // // //                   members.map((m) => (
// // // //                     <tr key={m.email} className="align-middle">
// // // //                       <td className="py-3 truncate">{m.name}</td>
// // // //                       <td className="py-3 text-white/80 truncate">{m.email}</td>
// // // //                       <td className="py-3 truncate">{m.role}</td>
// // // //                       <td className="py-3">
// // // //                         <span
// // // //                           className={
// // // //                             m.status === "Active"
// // // //                               ? "text-emerald-400 text-sm"
// // // //                               : "text-yellow-400 text-sm"
// // // //                           }
// // // //                         >
// // // //                           {m.status}
// // // //                         </span>
// // // //                       </td>
// // // //                       <td className="py-3 truncate">{m.tokens.toLocaleString()}</td>
// // // //                       <td className="py-3 truncate">{m.available.toLocaleString()}</td>
// // // //                       <td className="py-3">
// // // //                         <div className="flex items-center gap-3">
// // // //                           <button
// // // //                             type="button"
// // // //                             title="Approve / Activate"
// // // //                             className="grid place-items-center w-9 h-9 rounded-full bg-black/50"
// // // //                             onClick={() =>
// // // //                               setMembers((prev) =>
// // // //                                 prev.map((x) =>
// // // //                                   x.email === m.email ? { ...x, status: "Active" } : x
// // // //                                 )
// // // //                               )
// // // //                             }
// // // //                           >
// // // //                             <CheckCircle2 className="w-4 h-4" />
// // // //                           </button>

// // // //                           <button
// // // //                             type="button"
// // // //                             title="Edit"
// // // //                             className="grid place-items-center w-9 h-9 rounded-full bg-emerald-500 text-white"
// // // //                             onClick={() => openEdit(m)}
// // // //                           >
// // // //                             <Pencil className="w-4 h-4" />
// // // //                           </button>

// // // //                           <button
// // // //                             type="button"
// // // //                             title="Delete"
// // // //                             className="grid place-items-center w-9 h-9 rounded-full bg-red-500 text-white"
// // // //                             onClick={() => openDelete(m)}
// // // //                           >
// // // //                             <Trash2 className="w-4 h-4" />
// // // //                           </button>
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         </section>
// // // //       </main>

// // // //       <Footer />

// // // //       {/* add/edit modal */}
// // // //       <MemberModal
// // // //         open={openModal}
// // // //         mode={modalMode}
// // // //         initialMember={editTarget}
// // // //         onClose={() => setOpenModal(false)}
// // // //         onAdd={addMember}
// // // //         onUpdate={updateMember}
// // // //         members={members}
// // // //         onRemove={removeMember}
// // // //         onChangeRole={changeRole}
// // // //         remainingTokens={remaining}
// // // //       />

// // // //       {/* delete confirm modal */}
// // // //       <DeleteConfirmModal
// // // //         open={deleteOpen}
// // // //         member={deleteTarget}
// // // //         onCancel={() => setDeleteOpen(false)}
// // // //         onConfirm={(email) => {
// // // //           removeMember(email);
// // // //           setDeleteOpen(false);
// // // //           setDeleteTarget(null);
         
// // // //         }}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }


// // // //after get 
// // // // src/pages/BlogPage.tsx
// // // import React, { useEffect, useMemo, useState } from "react";
// // // import Header from "@/components/Header";
// // // import Footer from "@/components/Footer";
// // // import TokenUsageSection from "@/components/TokenUsageSection";
// // // import { Pencil, Trash2, CheckCircle2, Plus, X, ChevronDown } from "lucide-react";
// // // import { useAuth } from "@/contexts/AuthContext";

// // // /* =========================== Types & data =========================== */
// // // type Role = "Admin" | "Team Member";
// // // type Status = "Active" | "Pending";

// // // type Member = {
// // //   name: string;
// // //   email: string;
// // //   role: Role;
// // //   status: Status;
// // //   tokens: number;     // distributed tokens
// // //   available: number;  // available tokens
// // // };

// // // type ApiMember = {
// // //   _id: string;
// // //   name?: string;
// // //   email: string;
// // //   userType?: string;
// // //   role?: string;      // "Owner" | "Admin" | "Team Member" | ...
// // //   isVerified?: boolean;
// // // };

// // // type AddMemberResult = {
// // //   email?: string;
// // //   created?: boolean;
// // //   attachedToOrg?: boolean;
// // //   tokens?: number;
// // //   error?: string;
// // // };

// // // const API_BASE =
// // //   (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";
// // // const ORG_LIMIT = 100_000;

// // // /* ---------------- Metric card (250x80, one-line text) ---------------- */
// // // function MetricCard({
// // //   label,
// // //   value,
// // //   icon,
// // // }: {
// // //   label: string;
// // //   value: string | number;
// // //   icon?: React.ReactNode;
// // // }) {
// // //   return (
// // //     <div
// // //       className="border border-white/10 bg-[#121316] text-white flex items-center gap-3 px-4"
// // //       style={{ width: 250, height: 80, borderRadius: 16, opacity: 1 }}
// // //     >
// // //       {icon ? (
// // //         <div className="inline-grid place-items-center w-8 h-8 rounded-full bg-white/5 shrink-0">
// // //           {icon}
// // //         </div>
// // //       ) : null}
// // //       <div className="min-w-0">
// // //         <div className="text-sm text-white/70 truncate">{label}</div>
// // //         <div className="text-xl font-semibold truncate">{value}</div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function NumberInput({
// // //   value,
// // //   onChange,
// // //   placeholder,
// // // }: {
// // //   value: string;
// // //   onChange: (v: string) => void;
// // //   placeholder?: string;
// // // }) {
// // //   return (
// // //     <input
// // //       inputMode="numeric"
// // //       pattern="[0-9]*"
// // //       value={value}
// // //       onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
// // //       className="w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 outline-none"
// // //       placeholder={placeholder}
// // //     />
// // //   );
// // // }

// // // /* -------------------------- Add/Edit Member Modal -------------------------- */
// // // function MemberModal({
// // //   open,
// // //   mode, // 'add' | 'edit'
// // //   initialMember,
// // //   onClose,
// // //   onAdd,
// // //   onUpdate,
// // //   members = [],
// // //   onRemove,
// // //   onChangeRole,
// // //   remainingTokens,
// // // }: {
// // //   open: boolean;
// // //   mode: "add" | "edit";
// // //   initialMember?: Member | null;
// // //   onClose: () => void;
// // //   onAdd: (m: Member) => void;
// // //   onUpdate: (email: string, updates: Partial<Member>) => void;
// // //   members?: Member[];
// // //   onRemove: (email: string) => void;
// // //   onChangeRole: (email: string, role: Role) => void;
// // //   remainingTokens: number;
// // // }) {
// // //   const { token } = useAuth();
// // //   const editing = mode === "edit";
// // //   const [fullName, setFullName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [role, setRole] = useState<Role>("Team Member");
// // //   const [distribution, setDistribution] = useState<string>("");
// // //   const [loading, setLoading] = useState(false);

// // //   useEffect(() => {
// // //     if (!open) return;
// // //     if (editing && initialMember) {
// // //       setFullName(initialMember.name);
// // //       setEmail(initialMember.email);
// // //       setRole(initialMember.role);
// // //       setDistribution(String(initialMember.tokens));
// // //     } else {
// // //       setFullName("");
// // //       setEmail("");
// // //       setRole("Team Member");
// // //       setDistribution("");
// // //     }
// // //   }, [open, editing, initialMember]);

// // //   const ordered = useMemo(
// // //     () =>
// // //       [...members].sort((a, b) =>
// // //         a.status === b.status ? 0 : a.status === "Pending" ? -1 : 1
// // //       ),
// // //     [members]
// // //   );

// // //   if (!open) return null;

// // //   const currentTokens = editing && initialMember ? initialMember.tokens : 0;
// // //   const effectiveRemaining = remainingTokens + currentTokens;

// // //   const canSubmit =
// // //     (editing || (fullName.trim() && email.trim())) &&
// // //     distribution.trim() &&
// // //     Number(distribution) > 0;

// // //   const presets = [5000, 10000, 15000, 20000];

// // //   const handleSubmit = async () => {
// // //     if (!canSubmit) return;
// // //     const amount = Number(distribution);

// // //     if (amount > effectiveRemaining) {
// // //       window.alert(
// // //         `Only ${effectiveRemaining.toLocaleString()} tokens available for allocation.`
// // //       );
// // //       return;
// // //     }

// // //     // EDIT MODE: local-only update (no edit API given)
// // //     if (editing && initialMember) {
// // //       onUpdate(initialMember.email, {
// // //         role,
// // //         tokens: amount,
// // //         available: amount,
// // //       });
// // //       onClose();
// // //       return;
// // //     }

// // //     // ADD MODE -> call /api/auth/org/members/add
// // //     if (!token) {
// // //       console.error("[OrgMembers/Add] No auth token — cannot send invite.");
// // //       window.alert("You must be logged in to invite a member.");
// // //       return;
// // //     }

// // //     const normEmail = email.trim().toLowerCase();
// // //     const displayName = fullName.trim() || normEmail.split("@")[0] || "User";
// // //     // IMPORTANT: your schema expects "Team Member", not "Member"
// // //     const apiRole = role === "Admin" ? "Admin" : "Team Member";

// // //     const payload = {
// // //       members: [
// // //         { name: displayName, email: normEmail, role: apiRole, tokens: amount },
// // //       ],
// // //     };

// // //     console.groupCollapsed("[OrgMembers/Add] Sending invite");
// // //     console.log("[OrgMembers/Add] POST url:", `${API_BASE}/api/auth/org/members/add`);
// // //     console.log("[OrgMembers/Add] Payload:", payload);

// // //     try {
// // //       setLoading(true);
// // //       const res = await fetch(`${API_BASE}/api/auth/org/members/add`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       console.log("[OrgMembers/Add] HTTP status:", res.status);
// // //       const data: {
// // //         success?: boolean;
// // //         orgId?: string;
// // //         results?: AddMemberResult[];
// // //         orgTokensRemaining?: number;
// // //         error?: string;
// // //       } = await res.json().catch(() => ({} as any));

// // //       console.log("[OrgMembers/Add] Raw JSON:", data);

// // //       if (!res.ok || !data?.success) {
// // //         const errKey =
// // //           data?.error ||
// // //           data?.results?.[0]?.error ||
// // //           "unknown_error";
// // //         console.error("[OrgMembers/Add] Request failed:", errKey);
// // //         window.alert(`Invite failed: ${errKey}`);
// // //         return;
// // //       }

// // //       const result = (data.results || [])[0] as AddMemberResult | undefined;
// // //       console.log("[OrgMembers/Add] Result[0]:", result);

// // //       if (result?.created && result?.attachedToOrg) {
// // //         onAdd({
// // //           name: displayName,
// // //           email: normEmail,
// // //           role, // "Admin" | "Team Member" (UI role)
// // //           status: "Pending",
// // //           tokens: amount,
// // //           available: amount,
// // //         });
// // //         console.info(
// // //           `[OrgMembers/Add] ✅ Invite created for ${normEmail}. Org tokens remaining (server):`,
// // //           data.orgTokensRemaining
// // //         );
// // //         onClose();
// // //         setFullName("");
// // //         setEmail("");
// // //         setRole("Team Member");
// // //         setDistribution("");
// // //       } else {
// // //         const errKey = result?.error || "unknown_error";
// // //         console.warn("[OrgMembers/Add] Not created:", errKey, " for ", normEmail);
// // //         window.alert(`Invite not created: ${errKey}`);
// // //       }
// // //     } catch (e) {
// // //       console.error("[OrgMembers/Add] Exception:", e);
// // //       window.alert("Invite failed due to a network/server error.");
// // //     } finally {
// // //       setLoading(false);
// // //       console.groupEnd();
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-[100] grid place-items-center" role="dialog" aria-modal="true">
// // //       <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
// // //       <div className="relative w-[96vw] max-w-[900px] rounded-2xl border border-white/10 bg-[#141518] text-white shadow-xl overflow-hidden">
// // //         {/* header */}
// // //         <div className="flex items-center justify-between px-6 py-5">
// // //           <h3 className="text-xl font-semibold">
// // //             {editing ? "Edit Member" : "Add New Member"}
// // //           </h3>
// // //           <button
// // //             type="button"
// // //             onClick={onClose}
// // //             className="grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// // //             aria-label="Close"
// // //           >
// // //             <X className="w-4 h-4" />
// // //           </button>
// // //         </div>

// // //         {/* form */}
// // //         <div className="px-6 pb-6">
// // //           <label className="block text-sm mb-2">Full name *</label>
// // //           <input
// // //             value={fullName}
// // //             onChange={(e) => setFullName(e.target.value)}
// // //             className={`w-full h-11 rounded-lg border px-3 outline-none ${
// // //               editing
// // //                 ? "bg-[#1A1B1F]/60 border-white/10 text-white/70 cursor-not-allowed"
// // //                 : "bg-[#1A1B1F] border-white/10"
// // //             }`}
// // //             placeholder="Enter full name"
// // //             disabled={editing}
// // //             aria-readonly={editing}
// // //           />

// // //           <label className="block text-sm mt-4 mb-2">Email *</label>
// // //           <input
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             className={`w-full h-11 rounded-lg border px-3 outline-none ${
// // //               editing
// // //                 ? "bg-[#1A1B1F]/60 border-white/10 text-white/70 cursor-not-allowed"
// // //                 : "bg-[#1A1B1F] border-white/10"
// // //             }`}
// // //             placeholder="Enter email"
// // //             disabled={editing}
// // //             aria-readonly={editing}
// // //           />

// // //           <label className="block text-sm mt-4 mb-2">Role *</label>
// // //           <div className="relative">
// // //             <select
// // //               value={role}
// // //               onChange={(e) =>
// // //                 setRole(e.target.value === "Admin" ? "Admin" : "Team Member")
// // //               }
// // //               className="appearance-none w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 pr-10 outline-none"
// // //             >
// // //               <option value="Team Member">Member</option>
// // //               <option value="Admin">Admin</option>
// // //             </select>
// // //             <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
// // //               <ChevronDown className="w-4 h-4" />
// // //             </span>
// // //           </div>

// // //           <label className="block text-sm mt-4 mb-2">Token Distribution *</label>
// // //           <NumberInput value={distribution} onChange={setDistribution} placeholder="e.g., 5000" />

// // //           <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
// // //             <div className="flex items-center gap-2">
// // //               {presets.map((p) => (
// // //                 <button
// // //                   key={p}
// // //                   type="button"
// // //                   onClick={() => setDistribution(String(p))}
// // //                   className="px-3 h-8 rounded-full bg-black/30 border border-white/10 text-sm hover:bg-black/40"
// // //                 >
// // //                   {p.toLocaleString()}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //             <div className="text-sm text-white/80">
// // //               Available Tokens : {effectiveRemaining.toLocaleString()}
// // //             </div>
// // //           </div>

// // //           <button
// // //             type="button"
// // //             onClick={handleSubmit}
// // //             disabled={!canSubmit || loading}
// // //             className="mt-6 w-full h-11 rounded-lg text-sm font-medium disabled:opacity-60"
// // //             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
// // //           >
// // //             {loading ? "Sending..." : editing ? "Update" : "Send Invite"}
// // //           </button>
// // //         </div>

// // //         {!editing && (
// // //           <>
// // //             <div className="h-px bg-white/10" />
// // //             <div className="px-6 py-4">
// // //               <h4 className="text-lg font-semibold">Team Members & Invites</h4>
// // //               <div className="mt-3 space-y-3 max-h-[280px] overflow-y-auto pr-1">
// // //                 {ordered.map((m) => (
// // //                   <div
// // //                     key={m.email}
// // //                     className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1B1F] border border-white/10"
// // //                   >
// // //                     <div className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-sm font-semibold">
// // //                       {m.name?.[0]?.toUpperCase() || "U"}
// // //                     </div>
// // //                     <div className="min-w-0">
// // //                       <div className="font-medium truncate">{m.name}</div>
// // //                       <div className="text-white/60 text-sm truncate">{m.email}</div>
// // //                     </div>
// // //                     <span
// // //                       className={`ml-2 text-xs ${
// // //                         m.status === "Pending" ? "text-yellow-400" : "text-emerald-400"
// // //                       }`}
// // //                     >
// // //                       {m.status}
// // //                     </span>

// // //                     <div className="ml-auto">
// // //                       <div className="relative">
// // //                         <select
// // //                           value={m.role}
// // //                           onChange={(e) =>
// // //                             onChangeRole(
// // //                               m.email,
// // //                               e.target.value === "Admin" ? "Admin" : "Team Member"
// // //                             )
// // //                           }
// // //                           className="appearance-none bg-[#141518] border border-white/10 rounded-lg h-9 pl-3 pr-8 text-sm"
// // //                         >
// // //                           <option value="Team Member">Member</option>
// // //                           <option value="Admin">Admin</option>
// // //                         </select>
// // //                         <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60">
// // //                           <ChevronDown className="w-4 h-4" />
// // //                         </span>
// // //                       </div>
// // //                     </div>

// // //                     <button
// // //                       type="button"
// // //                       onClick={() => onRemove(m.email)}
// // //                       className="ml-2 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// // //                       title="Remove"
// // //                     >
// // //                       <X className="w-4 h-4" />
// // //                     </button>
// // //                   </div>
// // //                 ))}
// // //                 {ordered.length === 0 && (
// // //                   <div className="text-sm text-white/60">No members yet.</div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* -------------------------- Delete Confirm Modal -------------------------- */
// // // function DeleteConfirmModal({
// // //   open,
// // //   member,
// // //   onCancel,
// // //   onConfirm,
// // // }: {
// // //   open: boolean;
// // //   member: Member | null;
// // //   onCancel: () => void;
// // //   onConfirm: (email: string) => void;
// // // }) {
// // //   if (!open || !member) return null;

// // //   return (
// // //     <div className="fixed inset-0 z-[110] grid place-items-center" role="dialog" aria-modal="true">
// // //       <div className="absolute inset-0 bg-black/60" onClick={onCancel} aria-hidden />

// // //       {/* Card */}
// // //       <div
// // //         className="relative w-[92vw] max-w-[460px] rounded-2xl bg-[#17171A] text-white shadow-xl text-center"
// // //         style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
// // //       >
// // //         {/* Title + close */}
// // //         <div className="px-6 pt-6 pb-2 relative">
// // //           <h3 className="text-lg font-semibold">
// // //             Remove {member.name} from this Team?
// // //           </h3>
// // //           <button
// // //             type="button"
// // //             onClick={onCancel}
// // //             className="absolute right-3 top-3 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// // //             aria-label="Close"
// // //           >
// // //             <X className="w-4 h-4" />
// // //           </button>
// // //         </div>

// // //         {/* Body */}
// // //         <div className="px-6 pb-2">
// // //           <p className="text-sm text-white/85">
// // //             {member.name} will be removed from this Team and will no longer have access
// // //             to the Tokens stored within it.
// // //           </p>
// // //           <p className="text-sm text-white/85 mt-3">Do you want to remove?</p>
// // //         </div>

// // //         {/* Actions (centered) */}
// // //         <div className="flex items-center justify-center gap-3 px-6 py-5">
// // //           <button
// // //             type="button"
// // //             onClick={onCancel}
// // //             className="h-10 px-5 rounded-lg bg-white/10 hover:bg-white/15"
// // //           >
// // //             Cancel
// // //           </button>
// // //           <button
// // //             type="button"
// // //             onClick={() => onConfirm(member.email)}
// // //             className="h-10 px-6 rounded-lg text-white"
// // //             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
// // //           >
// // //             Remove
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ================================ Page ================================ */
// // // export default function BlogPage() {
// // //   const [members, setMembers] = useState<Member[]>([]);
// // //   const { token } = useAuth();

// // //   // ----------------------- FETCH ORG MEMBERS (GET) -----------------------
// // //   useEffect(() => {
// // //     async function fetchMembers() {
// // //       console.groupCollapsed("[OrgMembers] Fetch start");
// // //       try {
// // //         if (!token) {
// // //           console.warn("[OrgMembers] No auth token found. Skipping fetch.");
// // //           console.groupEnd();
// // //           return;
// // //         }

// // //         const url = `${API_BASE}/api/auth/org/members`;
// // //         console.log("[OrgMembers] GET url:", url);
// // //         console.log("[OrgMembers] Bearer present:", !!token);

// // //         const res = await fetch(url, {
// // //           method: "GET",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         });

// // //         console.log("[OrgMembers] HTTP status:", res.status);

// // //         const data = await res.json().catch(() => ({}));
// // //         console.log("[OrgMembers] Raw JSON:", data);

// // //         if (!res.ok) {
// // //           if (data?.error === "no_org") {
// // //             console.error("[OrgMembers] User has no orgId (error: no_org).");
// // //           } else {
// // //             console.error("[OrgMembers] Request failed:", data?.error || "unknown_error");
// // //           }
// // //           console.groupEnd();
// // //           return;
// // //         }

// // //         const apiMembers: ApiMember[] = Array.isArray(data?.members) ? data.members : [];
// // //         console.table(apiMembers);

// // //         const mapped: Member[] = apiMembers.map((m) => ({
// // //           name: m.name || "(No name)",
// // //           email: m.email,
// // //           role: m.role === "Admin" ? "Admin" : "Team Member",
// // //           status: m.isVerified ? "Active" : "Pending",
// // //           tokens: 0,
// // //           available: 0,
// // //         }));

// // //         console.log("[OrgMembers] Mapped -> Member[]:", mapped);
// // //         setMembers(mapped);
// // //         console.info("[OrgMembers] ✅ Integration success: members set in state.");
// // //       } catch (err) {
// // //         console.error("[OrgMembers] Exception:", err);
// // //       } finally {
// // //         console.groupEnd();
// // //       }
// // //     }

// // //     fetchMembers();
// // //   }, [token]);

// // //   const totalDistributed = useMemo(
// // //     () => members.reduce((s, m) => s + m.tokens, 0),
// // //     [members]
// // //   );
// // //   const remaining = Math.max(0, ORG_LIMIT - totalDistributed);

// // //   // add/edit modal state
// // //   const [openModal, setOpenModal] = useState(false);
// // //   const [modalMode, setModalMode] = useState<"add" | "edit">("add");
// // //   const [editTarget, setEditTarget] = useState<Member | null>(null);

// // //   // delete modal state
// // //   const [deleteOpen, setDeleteOpen] = useState(false);
// // //   const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

// // //   const addMember = (m: Member) => setMembers((prev) => [m, ...prev]);
// // //   const removeMember = (email: string) =>
// // //     setMembers((prev) => prev.filter((x) => x.email !== email));
// // //   const changeRole = (email: string, role: Role) =>
// // //     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, role } : x)));
// // //   const updateMember = (email: string, updates: Partial<Member>) =>
// // //     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, ...updates } : x)));

// // //   const openAdd = () => {
// // //     setModalMode("add");
// // //     setEditTarget(null);
// // //     setOpenModal(true);
// // //   };
// // //   const openEdit = (m: Member) => {
// // //     setModalMode("edit");
// // //     setEditTarget(m);
// // //     setOpenModal(true);
// // //   };
// // //   const openDelete = (m: Member) => {
// // //     setDeleteTarget(m);
// // //     setDeleteOpen(true);
// // //   };

// // //   return (
// // //     <div className="min-h-screen w-full bg-[#07080A] text-white">
// // //       <Header />

// // //       <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-14">
// // //         {/* TokenUsage centered */}
// // //         <div className="w-full flex justify-center">
// // //           <div className="mx-auto">
// // //             <TokenUsageSection />
// // //           </div>
// // //         </div>

// // //         {/* Metrics BELOW the token usage, centered */}
// // //         <div className="mt-6 sm:mt-8 w-full flex justify-center">
// // //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // //             <MetricCard label="Total Members" value={members.length} icon={<span>👥</span>} />
// // //             <MetricCard label="Total Tokens Distributed" value={totalDistributed.toLocaleString()} icon={<span>🎁</span>} />
// // //             <MetricCard label="Total Tokens Remaining" value={remaining.toLocaleString()} icon={<span>🪙</span>} />
// // //           </div>
// // //         </div>

// // //         {/* Members section */}
// // //         <section className="mt-8 rounded-2xl bg-transparent">
// // //           <div className="flex items-center justify-between p-1 sm:p-1">
// // //             <h2 className="text-base sm:text-lg font-semibold">Team Members</h2>

// // //             {/* Add member button: white button, black circular + */}
// // //             <button
// // //               type="button"
// // //               onClick={openAdd}
// // //               className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white text-black hover:opacity-90"
// // //               title="Add new member"
// // //             >
// // //               <span className="grid place-items-center w-6 h-6 rounded-full bg-black text-white">
// // //                 <Plus className="w-4 h-4" />
// // //               </span>
// // //               Add new member
// // //             </button>
// // //           </div>

// // //           <div className="overflow-x-auto mt-3">
// // //             <table
// // //               className="w-full text-left table-fixed border-separate"
// // //               style={{ borderSpacing: "24px 14px" }}
// // //             >
// // //               {/* Equal widths */}
// // //               <colgroup>
// // //                 <col style={{ width: "14.2857%" }} />
// // //                 <col style={{ width: "14.2857%" }} />
// // //                 <col style={{ width: "14.2857%" }} />
// // //                 <col style={{ width: "14.2857%" }} />
// // //                 <col style={{ width: "14.2857%" }} />
// // //                 <col style={{ width: "14.2857%" }} />
// // //                 <col style={{ width: "14.2857%" }} />
// // //               </colgroup>

// // //               <thead className="text-white/70 text-sm">
// // //                 <tr>
// // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Name</th>
// // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Email</th>
// // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Role</th>
// // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Status</th>
// // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Tokens</th>
// // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Available</th>
// // //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Actions</th>
// // //                 </tr>
// // //               </thead>

// // //               <tbody>
// // //                 {members.length === 0 ? (
// // //                   <tr>
// // //                     <td className="text-white/60 text-sm py-4" colSpan={7}>
// // //                       No members yet. Click “Add new member”.
// // //                     </td>
// // //                   </tr>
// // //                 ) : (
// // //                   members.map((m) => (
// // //                     <tr key={m.email} className="align-middle">
// // //                       <td className="py-3 truncate">{m.name}</td>
// // //                       <td className="py-3 text-white/80 truncate">{m.email}</td>
// // //                       <td className="py-3 truncate">{m.role}</td>
// // //                       <td className="py-3">
// // //                         <span
// // //                           className={
// // //                             m.status === "Active"
// // //                               ? "text-emerald-400 text-sm"
// // //                               : "text-yellow-400 text-sm"
// // //                           }
// // //                         >
// // //                           {m.status}
// // //                         </span>
// // //                       </td>
// // //                       <td className="py-3 truncate">{m.tokens.toLocaleString()}</td>
// // //                       <td className="py-3 truncate">{m.available.toLocaleString()}</td>
// // //                       <td className="py-3">
// // //                         <div className="flex items-center gap-3">
// // //                           <button
// // //                             type="button"
// // //                             title="Approve / Activate"
// // //                             className="grid place-items-center w-9 h-9 rounded-full bg-black/50"
// // //                             onClick={() =>
// // //                               setMembers((prev) =>
// // //                                 prev.map((x) =>
// // //                                   x.email === m.email ? { ...x, status: "Active" } : x
// // //                                 )
// // //                               )
// // //                             }
// // //                           >
// // //                             <CheckCircle2 className="w-4 h-4" />
// // //                           </button>

// // //                           <button
// // //                             type="button"
// // //                             title="Edit"
// // //                             className="grid place-items-center w-9 h-9 rounded-full bg-emerald-500 text-white"
// // //                             onClick={() => openEdit(m)}
// // //                           >
// // //                             <Pencil className="w-4 h-4" />
// // //                           </button>

// // //                           <button
// // //                             type="button"
// // //                             title="Delete"
// // //                             className="grid place-items-center w-9 h-9 rounded-full bg-red-500 text-white"
// // //                             onClick={() => openDelete(m)}
// // //                           >
// // //                             <Trash2 className="w-4 h-4" />
// // //                           </button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </section>
// // //       </main>

// // //       <Footer />

// // //       {/* add/edit modal */}
// // //       <MemberModal
// // //         open={openModal}
// // //         mode={modalMode}
// // //         initialMember={editTarget}
// // //         onClose={() => setOpenModal(false)}
// // //         onAdd={addMember}
// // //         onUpdate={updateMember}
// // //         members={members}
// // //         onRemove={removeMember}
// // //         onChangeRole={changeRole}
// // //         remainingTokens={remaining}
// // //       />

// // //       {/* delete confirm modal */}
// // //       <DeleteConfirmModal
// // //         open={deleteOpen}
// // //         member={deleteTarget}
// // //         onCancel={() => setDeleteOpen(false)}
// // //         onConfirm={(email) => {
// // //           removeMember(email);
// // //           setDeleteOpen(false);
// // //           setDeleteTarget(null);
// // //         }}
// // //       />
// // //     </div>
// // //   );
// // // }

// // // src/pages/BlogPage.tsx
// // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // import Header from "@/components/Header";
// // import Footer from "@/components/Footer";
// // import TokenUsageSection from "@/components/TokenUsageSection";
// // import { Pencil, Trash2, CheckCircle2, Plus, X, ChevronDown } from "lucide-react";
// // import { useAuth } from "@/contexts/AuthContext";

// // /* =========================== Types & data =========================== */
// // // type Role = "Admin" | "Team Member";
// // type Role = "Admin" | "Member";
// // type Status = "Active" | "Pending";

// // type Member = {
// //   id: string;        // <-- needed for PATCH/DELETE
// //   name: string;
// //   email: string;
// //   role: Role;
// //   status: Status;
// //   tokens: number;     // distributed tokens (UI-side)
// //   available: number;  // available tokens (UI-side)
// // };

// // type ApiMember = {
// //   _id: string;
// //   name?: string;
// //   email: string;
// //   userType?: string;
// //   role?: string;      // "Owner" | "Admin" | "Team Member" | ...
// //   isVerified?: boolean;
// //   dailyTokensRemaining?: number; // if you want to use it later
// // };

// // type AddMemberResult = {
// //   email?: string;
// //   created?: boolean;
// //   attachedToOrg?: boolean;
// //   tokens?: number;
// //   error?: string;
// // };

// // const API_BASE =
// //   (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";
// // const ORG_LIMIT = 100_000;

// // /* ---------------- Metric card (250x80, one-line text) ---------------- */
// // function MetricCard({
// //   label,
// //   value,
// //   icon,
// // }: {
// //   label: string;
// //   value: string | number;
// //   icon?: React.ReactNode;
// // }) {
// //   return (
// //     <div
// //       className="border border-white/10 bg-[#121316] text-white flex items-center gap-3 px-4"
// //       style={{ width: 250, height: 80, borderRadius: 16, opacity: 1 }}
// //     >
// //       {icon ? (
// //         <div className="inline-grid place-items-center w-8 h-8 rounded-full bg-white/5 shrink-0">
// //           {icon}
// //         </div>
// //       ) : null}
// //       <div className="min-w-0">
// //         <div className="text-sm text-white/70 truncate">{label}</div>
// //         <div className="text-xl font-semibold truncate">{value}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // function NumberInput({
// //   value,
// //   onChange,
// //   placeholder,
// // }: {
// //   value: string;
// //   onChange: (v: string) => void;
// //   placeholder?: string;
// // }) {
// //   return (
// //     <input
// //       inputMode="numeric"
// //       pattern="[0-9]*"
// //       value={value}
// //       onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
// //       className="w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 outline-none"
// //       placeholder={placeholder}
// //     />
// //   );
// // }

// // /* -------------------------- Add/Edit Member Modal -------------------------- */
// // function MemberModal({
// //   open,
// //   mode, // 'add' | 'edit'
// //   initialMember,
// //   onClose,
// //   onAdd,
// //   onUpdate,
// //   members = [],
// //   onRemove,
// //   onChangeRole,
// //   remainingTokens,
// //   onRefresh, // <-- fetch fresh list (to get _id after add)
// // }: {
// //   open: boolean;
// //   mode: "add" | "edit";
// //   initialMember?: Member | null;
// //   onClose: () => void;
// //   onAdd: (m: Member) => void;
// //   onUpdate: (email: string, updates: Partial<Member>) => void;
// //   members?: Member[];
// //   onRemove: (email: string) => void;
// //   onChangeRole: (email: string, role: Role) => void;
// //   remainingTokens: number;
// //   onRefresh: () => Promise<void>;
// // }) {
// //   const { token } = useAuth();
// //   const editing = mode === "edit";
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [role, setRole] = useState<Role>("Team Member");
// //   const [distribution, setDistribution] = useState<string>("");
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (!open) return;
// //     if (editing && initialMember) {
// //       setFullName(initialMember.name);
// //       setEmail(initialMember.email);
// //       setRole(initialMember.role);
// //       setDistribution(String(initialMember.tokens));
// //     } else {
// //       setFullName("");
// //       setEmail("");
// //       setRole("Team Member");
// //       setDistribution("");
// //     }
// //   }, [open, editing, initialMember]);

// //   const ordered = useMemo(
// //     () =>
// //       [...members].sort((a, b) =>
// //         a.status === b.status ? 0 : a.status === "Pending" ? -1 : 1
// //       ),
// //     [members]
// //   );

// //   if (!open) return null;

// //   const currentTokens = editing && initialMember ? initialMember.tokens : 0;
// //   const effectiveRemaining = remainingTokens + currentTokens;

// //   const canSubmit =
// //     (editing || (fullName.trim() && email.trim())) &&
// //     distribution.trim() &&
// //     Number(distribution) > 0;

// //   const presets = [5000, 10000, 15000, 20000];

// //   const handleSubmit = async () => {
// //     if (!canSubmit) return;
// //     const amount = Number(distribution);

// //     if (amount > effectiveRemaining) {
// //       window.alert(
// //         `Only ${effectiveRemaining.toLocaleString()} tokens available for allocation.`
// //       );
// //       return;
// //     }

// //     if (!token) {
// //       console.error("[OrgMembers] No auth token.");
// //       window.alert("You must be logged in.");
// //       return;
// //     }

// //     const normEmail = email.trim().toLowerCase();
// //     const displayName = fullName.trim() || normEmail.split("@")[0] || "User";
// //     // API expects: "Admin" | "Team Member"
// //     const apiRole = role === "Admin" ? "Admin" : "Team Member";

// //     // // -------- EDIT (PATCH) ----------
// //     // if (editing && initialMember) {
// //     //   console.groupCollapsed("[OrgMembers/Edit] PATCH start");
// //     //   try {
// //     //     const url = `${API_BASE}/api/auth/org/members/${initialMember.id}`;
// //     //     console.log("[OrgMembers/Edit] url:", url);
// //     //     const body = { role: apiRole, tokens: amount };
// //     //     console.log("[OrgMembers/Edit] payload:", body);

// //     //     const res = await fetch(url, {
// //     //       method: "PATCH",
// //     //       headers: {
// //     //         "Content-Type": "application/json",
// //     //         Authorization: `Bearer ${token}`,
// //     //       },
// //     //       body: JSON.stringify(body),
// //     //     });

// //     //     console.log("[OrgMembers/Edit] HTTP status:", res.status);
// //     //     const data = await res.json().catch(() => ({}));
// //     //     console.log("[OrgMembers/Edit] Raw JSON:", data);

// //     //     if (!res.ok || !data?.success) {
// //     //       const errKey = data?.error || "unknown_error";
// //     //       console.error("[OrgMembers/Edit] Failed:", errKey);
// //     //       window.alert(`Update failed: ${errKey}`);
// //     //       return;
// //     //     }

// //     //     // reflect in UI
// //     //     onUpdate(initialMember.email, {
// //     //       role,
// //     //       tokens: amount,
// //     //       available: amount,
// //     //     });
// //     //     console.info("[OrgMembers/Edit] ✅ Updated:", initialMember.email);
// //     //     onClose();
// //     //   } catch (e) {
// //     //     console.error("[OrgMembers/Edit] Exception:", e);
// //     //     window.alert("Update failed due to a network/server error.");
// //     //   } finally {
// //     //     console.groupEnd();
// //     //   }
// //     //   return;
// //     // }

// //      // -------- EDIT (PATCH) ----------
// // if (editing && initialMember) {
// //   console.groupCollapsed("[OrgMembers/Edit] PATCH start");
// //   try {
// //     const url = `${API_BASE}/api/org/members/${initialMember.id}`;
// //     console.log("[OrgMembers/Edit] url:", url);

// //     // API expects role as "Admin" | "Member"
// //     const apiRole = role === "Admin" ? "Admin" : "Member";

// //     // Only send fields that changed / provided
// //     const body: any = {};
// //     if (apiRole) body.role = apiRole;
// //     if (!Number.isNaN(Number(distribution)) && distribution.trim()) {
// //       body.tokens = Number(distribution);
// //     }

// //     console.log("[OrgMembers/Edit] payload:", body);

// //     const res = await fetch(url, {
// //       method: "PATCH",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(body),
// //     });

// //     console.log("[OrgMembers/Edit] HTTP status:", res.status);
// //     const data: {
// //       success?: boolean;
// //       member?: any;                    // updated member
// //       orgTokensRemaining?: number;     // org owner's remaining tokens
// //       error?: string;
// //     } = await res.json().catch(() => ({} as any));

// //     console.log("[OrgMembers/Edit] Raw JSON:", data);

// //     if (!res.ok || !data?.success) {
// //       const errKey = data?.error || "unknown_error";
// //       console.error("[OrgMembers/Edit] Failed:", errKey);
// //       window.alert(`Update failed: ${errKey}`);
// //       return;
// //     }

// //     // reflect in UI (use the amount you set or server echo)
// //     const newTokens =
// //       (typeof body.tokens === "number" ? body.tokens : initialMember.tokens) ?? 0;

// //     onUpdate(initialMember.email, {
// //       role,                 // "Admin" | "Member" (UI role)
// //       tokens: newTokens,    // distributed tokens (UI-side)
// //       available: newTokens, // available = distributed for this UI
// //     });

// //     console.info("[OrgMembers/Edit] ✅ Updated:", initialMember.email);
// //     // optional: await onRefresh(); // if you want to sync any server-calculated values

// //     onClose();
// //   } catch (e) {
// //     console.error("[OrgMembers/Edit] Exception:", e);
// //     window.alert("Update failed due to a network/server error.");
// //   } finally {
// //     console.groupEnd();
// //   }
// //   return;
// // }


// // // -------- ADD (POST) ----------
// // console.groupCollapsed("[OrgMembers/Add] Sending invite");

// // // API expects role as "Admin" | "Member" (not "Team Member")
// // // const apiRole = role === "Admin" ? "Admin" : "Member";

// // const payload = {
// //   members: [
// //     { name: displayName, email: normEmail, role: apiRole, tokens: amount },
// //   ],
// // };

// // const addUrl = `${API_BASE}/api/org/members/add`;
// // console.log("[OrgMembers/Add] POST url:", addUrl);
// // console.log("[OrgMembers/Add] Payload:", payload);

// // try {
// //   setLoading(true);

// //   const res = await fetch(addUrl, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${token}`,
// //     },
// //     body: JSON.stringify(payload),
// //   });

// //   console.log("[OrgMembers/Add] HTTP status:", res.status);
// //   const data: {
// //     success?: boolean;
// //     orgId?: string;
// //     results?: Array<{
// //       email?: string;
// //       success?: boolean;
// //       created?: boolean;
// //       tokens?: number;
// //       error?: string;
// //     }>;
// //     orgAssignableRemaining?: number;
// //     teamMembersLimitRemaining?: number;
// //     error?: string;
// //   } = await res.json().catch(() => ({} as any));

// //   console.log("[OrgMembers/Add] Raw JSON:", data);

// //   if (!res.ok || !data?.success) {
// //     const errKey = data?.error || data?.results?.[0]?.error || "unknown_error";
// //     console.error("[OrgMembers/Add] Failed:", errKey);
// //     window.alert(`Invite failed: ${errKey}`);
// //     return;
// //   }

// //   const result = (data.results || [])[0];

// //   if (result?.success) {
// //     // Optimistically add while we refresh to get real _id
// //     onAdd({
// //       id: `temp-${normEmail}`,
// //       name: displayName,
// //       email: normEmail,
// //       role,                // UI role stays as selected ("Admin" | "Team Member")
// //       status: "Pending",
// //       tokens: amount,
// //       available: amount,
// //     });

// //     console.info("[OrgMembers/Add] ✅ Invite created for", normEmail);

// //     // Pull fresh list so we have member._id for PATCH/DELETE
// //     await onRefresh();

// //     // Reset and close modal
// //     onClose();
// //     setFullName("");
// //     setEmail("");
// //     setRole("Team Member"); // keep your current UI default
// //     setDistribution("");
// //   } else {
// //     const errKey = result?.error || "unknown_error";
// //     console.warn("[OrgMembers/Add] Not created:", errKey);
// //     window.alert(`Invite not created: ${errKey}`);
// //   }
// // } catch (e) {
// //   console.error("[OrgMembers/Add] Exception:", e);
// //   window.alert("Invite failed due to a network/server error.");
// // } finally {
// //   setLoading(false);
// //   console.groupEnd();
// // }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-[100] grid place-items-center" role="dialog" aria-modal="true">
// //       <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
// //       <div className="relative w-[96vw] max-w-[900px] rounded-2xl border border-white/10 bg-[#141518] text-white shadow-xl overflow-hidden">
// //         {/* header */}
// //         <div className="flex items-center justify-between px-6 py-5">
// //           <h3 className="text-xl font-semibold">
// //             {editing ? "Edit Member" : "Add New Member"}
// //           </h3>
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             className="grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// //             aria-label="Close"
// //           >
// //             <X className="w-4 h-4" />
// //           </button>
// //         </div>

// //         {/* form */}
// //         <div className="px-6 pb-6">
// //           <label className="block text-sm mb-2">Full name *</label>
// //           <input
// //             value={fullName}
// //             onChange={(e) => setFullName(e.target.value)}
// //             className={`w-full h-11 rounded-lg border px-3 outline-none ${
// //               editing
// //                 ? "bg-[#1A1B1F]/60 border-white/10 text-white/70 cursor-not-allowed"
// //                 : "bg-[#1A1B1F] border-white/10"
// //             }`}
// //             placeholder="Enter full name"
// //             disabled={editing}
// //             aria-readonly={editing}
// //           />

// //           <label className="block text-sm mt-4 mb-2">Email *</label>
// //           <input
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className={`w-full h-11 rounded-lg border px-3 outline-none ${
// //               editing
// //                 ? "bg-[#1A1B1F]/60 border-white/10 text-white/70 cursor-not-allowed"
// //                 : "bg-[#1A1B1F] border-white/10"
// //             }`}
// //             placeholder="Enter email"
// //             disabled={editing}
// //             aria-readonly={editing}
// //           />

// //           <label className="block text-sm mt-4 mb-2">Role *</label>
// //           <div className="relative">
// //             <select
// //               value={role}
// //               onChange={(e) =>
// //                 setRole(e.target.value === "Admin" ? "Admin" : "Team Member")
// //               }
// //               className="appearance-none w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 pr-10 outline-none"
// //             >
// //               <option value="Team Member">Member</option>
// //               <option value="Admin">Admin</option>
// //             </select>
// //             <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
// //               <ChevronDown className="w-4 h-4" />
// //             </span>
// //           </div>

// //           <label className="block text-sm mt-4 mb-2">Token Distribution *</label>
// //           <NumberInput value={distribution} onChange={setDistribution} placeholder="e.g., 5000" />

// //           <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
// //             <div className="flex items-center gap-2">
// //               {presets.map((p) => (
// //                 <button
// //                   key={p}
// //                   type="button"
// //                   onClick={() => setDistribution(String(p))}
// //                   className="px-3 h-8 rounded-full bg-black/30 border border-white/10 text-sm hover:bg-black/40"
// //                 >
// //                   {p.toLocaleString()}
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="text-sm text-white/80">
// //               Available Tokens : {effectiveRemaining.toLocaleString()}
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             onClick={handleSubmit}
// //             disabled={!canSubmit || loading}
// //             className="mt-6 w-full h-11 rounded-lg text-sm font-medium disabled:opacity-60"
// //             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
// //           >
// //             {loading ? "Sending..." : editing ? "Update" : "Send Invite"}
// //           </button>
// //         </div>

// //         {!editing && (
// //           <>
// //             <div className="h-px bg-white/10" />
// //             <div className="px-6 py-4">
// //               <h4 className="text-lg font-semibold">Team Members & Invites</h4>
// //               <div className="mt-3 space-y-3 max-h-[280px] overflow-y-auto pr-1">
// //                 {ordered.map((m) => (
// //                   <div
// //                     key={m.email}
// //                     className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1B1F] border border-white/10"
// //                   >
// //                     <div className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-sm font-semibold">
// //                       {m.name?.[0]?.toUpperCase() || "U"}
// //                     </div>
// //                     <div className="min-w-0">
// //                       <div className="font-medium truncate">{m.name}</div>
// //                       <div className="text-white/60 text-sm truncate">{m.email}</div>
// //                     </div>
// //                     <span
// //                       className={`ml-2 text-xs ${
// //                         m.status === "Pending" ? "text-yellow-400" : "text-emerald-400"
// //                       }`}
// //                     >
// //                       {m.status}
// //                     </span>

// //                     <div className="ml-auto">
// //                       <div className="relative">
// //                         <select
// //                           value={m.role}
// //                           onChange={(e) =>
// //                             onChangeRole(
// //                               m.email,
// //                               e.target.value === "Admin" ? "Admin" : "Team Member"
// //                             )
// //                           }
// //                           className="appearance-none bg-[#141518] border border-white/10 rounded-lg h-9 pl-3 pr-8 text-sm"
// //                         >
// //                           <option value="Team Member">Member</option>
// //                           <option value="Admin">Admin</option>
// //                         </select>
// //                         <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60">
// //                           <ChevronDown className="w-4 h-4" />
// //                         </span>
// //                       </div>
// //                     </div>

// //                     <button
// //                       type="button"
// //                       onClick={() => onRemove(m.email)}
// //                       className="ml-2 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// //                       title="Remove"
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 ))}
// //                 {ordered.length === 0 && (
// //                   <div className="text-sm text-white/60">No members yet.</div>
// //                 )}
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* -------------------------- Delete Confirm Modal -------------------------- */
// // function DeleteConfirmModal({
// //   open,
// //   member,
// //   onCancel,
// //   onConfirm,
// // }: {
// //   open: boolean;
// //   member: Member | null;
// //   onCancel: () => void;
// //   onConfirm: (memberId: string) => void; // <-- pass id
// // }) {
// //   if (!open || !member) return null;

// //   return (
// //     <div className="fixed inset-0 z-[110] grid place-items-center" role="dialog" aria-modal="true">
// //       <div className="absolute inset-0 bg-black/60" onClick={onCancel} aria-hidden />

// //       {/* Card */}
// //       <div
// //         className="relative w-[92vw] max-w-[460px] rounded-2xl bg-[#17171A] text-white shadow-xl text-center"
// //         style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
// //       >
// //         {/* Title + close */}
// //         <div className="px-6 pt-6 pb-2 relative">
// //           <h3 className="text-lg font-semibold">
// //             Remove {member.name} from this Team?
// //           </h3>
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="absolute right-3 top-3 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
// //             aria-label="Close"
// //           >
// //             <X className="w-4 h-4" />
// //           </button>
// //         </div>

// //         {/* Body */}
// //         <div className="px-6 pb-2">
// //           <p className="text-sm text-white/85">
// //             {member.name} will be removed from this Team and will no longer have access
// //             to the Tokens stored within it.
// //           </p>
// //           <p className="text-sm text-white/85 mt-3">Do you want to remove?</p>
// //         </div>

// //         {/* Actions (centered) */}
// //         <div className="flex items-center justify-center gap-3 px-6 py-5">
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="h-10 px-5 rounded-lg bg-white/10 hover:bg-white/15"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="button"
// //             onClick={() => onConfirm(member.id)} // <-- use id here
// //             className="h-10 px-6 rounded-lg text-white"
// //             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
// //           >
// //             Remove
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================================ Page ================================ */
// // export default function BlogPage() {
// //   const [members, setMembers] = useState<Member[]>([]);
// //   const { token } = useAuth(); // assumes your AuthContext provides { token }

// //   // ----------------------- helpers to update local state -----------------------
// //   const addMember = (m: Member) => setMembers((prev) => [m, ...prev]);
// //   const removeMember = (email: string) =>
// //     setMembers((prev) => prev.filter((x) => x.email !== email));
// //   const changeRole = (email: string, role: Role) =>
// //     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, role } : x)));
// //   const updateMember = (email: string, updates: Partial<Member>) =>
// //     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, ...updates } : x)));

// //   // ----------------------- FETCH ORG MEMBERS (GET) -----------------------
// //   // const reloadMembers = useCallback(async () => {
// //   //   console.groupCollapsed("[OrgMembers] Fetch start");
// //   //   try {
// //   //     if (!token) {
// //   //       console.warn("[OrgMembers] No auth token found. Skipping fetch.");
// //   //       console.groupEnd();
// //   //       return;
// //   //     }

// //   //     const url = `${API_BASE}/api/auth/org/members`;
// //   //     console.log("[OrgMembers] GET url:", url);
// //   //     console.log("[OrgMembers] Bearer present:", !!token);

// //   //     const res = await fetch(url, {
// //   //       method: "GET",
// //   //       headers: {
// //   //         "Content-Type": "application/json",
// //   //         Authorization: `Bearer ${token}`,
// //   //       },
// //   //     });

// //   //     console.log("[OrgMembers] HTTP status:", res.status);

// //   //     const data = await res.json().catch(() => ({}));
// //   //     console.log("[OrgMembers] Raw JSON:", data);

// //   //     if (!res.ok) {
// //   //       if (data?.error === "no_org") {
// //   //         console.error("[OrgMembers] User has no orgId (error: no_org).");
// //   //       } else {
// //   //         console.error("[OrgMembers] Request failed:", data?.error || "unknown_error");
// //   //       }
// //   //       console.groupEnd();
// //   //       return;
// //   //     }

// //   //     const apiMembers: ApiMember[] = Array.isArray(data?.members) ? data.members : [];
// //   //     console.table(apiMembers);

// //   //     const mapped: Member[] = apiMembers.map((m) => ({
// //   //       id: m._id, // <-- keep _id for PATCH/DELETE
// //   //       name: m.name || "(No name)",
// //   //       email: m.email,
// //   //       role: m.role === "Admin" ? "Admin" : "Team Member",
// //   //       status: m.isVerified ? "Active" : "Pending",
// //   //       tokens: 0,     // not provided by GET; UI-only metric
// //   //       available: 0,  // not provided by GET; UI-only metric
// //   //     }));

// //   //     console.log("[OrgMembers] Mapped -> Member[]:", mapped);
// //   //     setMembers(mapped);
// //   //     console.info("[OrgMembers] ✅ Integration success: members set in state.");
// //   //   } catch (err) {
// //   //     console.error("[OrgMembers] Exception:", err);
// //   //   } finally {
// //   //     console.groupEnd();
// //   //   }
// //   // }, [token]);


// //   const reloadMembers = useCallback(async () => {
// //   console.groupCollapsed("[OrgMembers] Fetch start");
// //   try {
// //     if (!token) {
// //       console.warn("[OrgMembers] No auth token found. Skipping fetch.");
// //       console.groupEnd();
// //       return;
// //     }

// //     const url = `${API_BASE}/api/org/members`;
// //     console.log("[OrgMembers] GET url:", url);

// //     const res = await fetch(url, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });

// //     console.log("[OrgMembers] HTTP status:", res.status);

// //     const data = await res.json().catch(() => ({}));
// //     console.log("[OrgMembers] Raw JSON:", data);

// //     if (!res.ok || !data?.success) {
// //       console.error("[OrgMembers] Request failed:", data?.error || "unknown_error");
// //       console.groupEnd();
// //       return;
// //     }

// //     const apiMembers: ApiMember[] = Array.isArray(data?.members) ? data.members : [];
// //     console.table(apiMembers);

// //     const mapped: Member[] = apiMembers.map((m) => ({
// //       id: m._id, // needed for PATCH/DELETE
// //       name: m.name || "(No name)",
// //       email: m.email,
// //       role: m.role === "Admin" ? "Admin" : "Member",
// //       status: m.isVerified ? "Active" : "Pending",
// //       tokens: 0,     // not returned by GET; UI metric only
// //       available: 0,  // not returned by GET; UI metric only
// //     }));

// //     console.log("[OrgMembers] Mapped -> Member[]:", mapped);
// //     setMembers(mapped);
// //     console.info("[OrgMembers] ✅ members set.");
// //   } catch (err) {
// //     console.error("[OrgMembers] Exception:", err);
// //   } finally {
// //     console.groupEnd();
// //   }
// // }, [token]);


// //   useEffect(() => {
// //     reloadMembers();
// //   }, [reloadMembers]);

// //   const totalDistributed = useMemo(
// //     () => members.reduce((s, m) => s + m.tokens, 0),
// //     [members]
// //   );
// //   const remaining = Math.max(0, ORG_LIMIT - totalDistributed);

// //   // add/edit modal state
// //   const [openModal, setOpenModal] = useState(false);
// //   const [modalMode, setModalMode] = useState<"add" | "edit">("add");
// //   const [editTarget, setEditTarget] = useState<Member | null>(null);

// //   // delete modal state
// //   const [deleteOpen, setDeleteOpen] = useState(false);
// //   const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

// //   const openAdd = () => {
// //     setModalMode("add");
// //     setEditTarget(null);
// //     setOpenModal(true);
// //   };
// //   const openEdit = (m: Member) => {
// //     setModalMode("edit");
// //     setEditTarget(m);
// //     setOpenModal(true);
// //   };
// //   const openDelete = (m: Member) => {
// //     setDeleteTarget(m);
// //     setDeleteOpen(true);
// //   };

// //   // ----------------------- DELETE (server) -----------------------
// //   // const handleDeleteConfirm = async (memberId: string) => {
// //   //   if (!deleteTarget) return;
// //   //   if (!token) {
// //   //     window.alert("You must be logged in.");
// //   //     return;
// //   //   }
// //   //   console.groupCollapsed("[OrgMembers/Delete] DELETE start");
// //   //   try {
// //   //     const url = `${API_BASE}/api/auth/org/members/${memberId}`;
// //   //     console.log("[OrgMembers/Delete] url:", url);

// //   //     const res = await fetch(url, {
// //   //       method: "DELETE",
// //   //       headers: {
// //   //         Authorization: `Bearer ${token}`,
// //   //       },
// //   //     });

// //   //     console.log("[OrgMembers/Delete] HTTP status:", res.status);
// //   //     const data = await res.json().catch(() => ({}));
// //   //     console.log("[OrgMembers/Delete] Raw JSON:", data);

// //   //     if (!res.ok || !data?.success) {
// //   //       const errKey = data?.error || "unknown_error";
// //   //       console.error("[OrgMembers/Delete] Failed:", errKey);
// //   //       window.alert(`Delete failed: ${errKey}`);
// //   //       return;
// //   //     }

// //   //     // NOTE: server zeros member tokens before returning releasedTokens; may be 0.
// //   //     console.info("[OrgMembers/Delete] ✅ Deleted:", deleteTarget.email);
// //   //     // Remove from UI by email (unique)
// //   //     removeMember(deleteTarget.email);
// //   //     setDeleteOpen(false);
// //   //     setDeleteTarget(null);
// //   //   } catch (e) {
// //   //     console.error("[OrgMembers/Delete] Exception:", e);
// //   //     window.alert("Delete failed due to a network/server error.");
// //   //   } finally {
// //   //     console.groupEnd();
// //   //   }
// //   // };
// // const handleDeleteConfirm = async (memberId: string) => {
// //   if (!deleteTarget) return;
// //   if (!token) {
// //     window.alert("You must be logged in.");
// //     return;
// //   }
// //   console.groupCollapsed("[OrgMembers/Delete] DELETE start");
// //   try {
// //     const url = `${API_BASE}/api/org/members/${memberId}`;
// //     console.log("[OrgMembers/Delete] url:", url);

// //     const res = await fetch(url, {
// //       method: "DELETE",
// //       headers: { Authorization: `Bearer ${token}` },
// //     });

// //     console.log("[OrgMembers/Delete] HTTP status:", res.status);
// //     const data: {
// //       success?: boolean;
// //       releasedTokens?: number;        // NOTE: server may return 0 (see tip below)
// //       orgTokensRemaining?: number;
// //       error?: string;
// //     } = await res.json().catch(() => ({} as any));
// //     console.log("[OrgMembers/Delete] Raw JSON:", data);

// //     if (!res.ok || !data?.success) {
// //       const errKey = data?.error || "unknown_error";
// //       console.error("[OrgMembers/Delete] Failed:", errKey);
// //       window.alert(`Delete failed: ${errKey}`);
// //       return;
// //     }

// //     console.info("[OrgMembers/Delete] ✅ Deleted:", deleteTarget.email);
// //     // Remove locally by unique key (email)
// //     removeMember(deleteTarget.email);
// //     setDeleteOpen(false);
// //     setDeleteTarget(null);

// //     // optional: show how many tokens were released back to org
// //     if (typeof data.releasedTokens === "number") {
// //       console.info("[OrgMembers/Delete] Released tokens back to org:", data.releasedTokens);
// //     }

// //     // optional: await reloadMembers(); // if you want to reflect org remaining from server
// //   } catch (e) {
// //     console.error("[OrgMembers/Delete] Exception:", e);
// //     window.alert("Delete failed due to a network/server error.");
// //   } finally {
// //     console.groupEnd();
// //   }
// // };

// //   return (
// //     <div className="min-h-screen w-full bg-[#07080A] text-white">
// //       <Header />

// //       <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-14">
// //         {/* TokenUsage centered */}
// //         <div className="w-full flex justify-center">
// //           <div className="mx-auto">
// //             <TokenUsageSection />
// //           </div>
// //         </div>

// //         {/* Metrics BELOW the token usage, centered */}
// //         <div className="mt-6 sm:mt-8 w-full flex justify-center">
// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //             <MetricCard label="Total Members" value={members.length} icon={<span>👥</span>} />
// //             <MetricCard label="Total Tokens Distributed" value={totalDistributed.toLocaleString()} icon={<span>🎁</span>} />
// //             <MetricCard label="Total Tokens Remaining" value={remaining.toLocaleString()} icon={<span>🪙</span>} />
// //           </div>
// //         </div>

// //         {/* Members section */}
// //         <section className="mt-8 rounded-2xl bg-transparent">
// //           <div className="flex items-center justify-between p-1 sm:p-1">
// //             <h2 className="text-base sm:text-lg font-semibold">Team Members</h2>

// //             {/* Add member button: white button, black circular + */}
// //             <button
// //               type="button"
// //               onClick={openAdd}
// //               className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white text-black hover:opacity-90"
// //               title="Add new member"
// //             >
// //               <span className="grid place-items-center w-6 h-6 rounded-full bg-black text-white">
// //                 <Plus className="w-4 h-4" />
// //               </span>
// //               Add new member
// //             </button>
// //           </div>

// //           <div className="overflow-x-auto mt-3">
// //             <table
// //               className="w-full text-left table-fixed border-separate"
// //               style={{ borderSpacing: "24px 14px" }}
// //             >
// //               {/* Equal widths */}
// //               <colgroup>
// //                 <col style={{ width: "14.2857%" }} />
// //                 <col style={{ width: "14.2857%" }} />
// //                 <col style={{ width: "14.2857%" }} />
// //                 <col style={{ width: "14.2857%" }} />
// //                 <col style={{ width: "14.2857%" }} />
// //                 <col style={{ width: "14.2857%" }} />
// //                 <col style={{ width: "14.2857%" }} />
// //               </colgroup>

// //               <thead className="text-white/70 text-sm">
// //                 <tr>
// //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Name</th>
// //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Email</th>
// //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Role</th>
// //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Status</th>
// //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Tokens</th>
// //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Available</th>
// //                   <th className="px-1 py-1 font-medium whitespace-nowrap">Actions</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {members.length === 0 ? (
// //                   <tr>
// //                     <td className="text-white/60 text-sm py-4" colSpan={7}>
// //                       No members yet. Click “Add new member”.
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   members.map((m) => (
// //                     <tr key={m.email} className="align-middle">
// //                       <td className="py-3 truncate">{m.name}</td>
// //                       <td className="py-3 text-white/80 truncate">{m.email}</td>
// //                       <td className="py-3 truncate">{m.role}</td>
// //                       <td className="py-3">
// //                         <span
// //                           className={
// //                             m.status === "Active"
// //                               ? "text-emerald-400 text-sm"
// //                               : "text-yellow-400 text-sm"
// //                           }
// //                         >
// //                           {m.status}
// //                         </span>
// //                       </td>
// //                       <td className="py-3 truncate">{m.tokens.toLocaleString()}</td>
// //                       <td className="py-3 truncate">{m.available.toLocaleString()}</td>
// //                       <td className="py-3">
// //                         <div className="flex items-center gap-3">
// //                           <button
// //                             type="button"
// //                             title="Approve / Activate"
// //                             className="grid place-items-center w-9 h-9 rounded-full bg-black/50"
// //                             onClick={() =>
// //                               setMembers((prev) =>
// //                                 prev.map((x) =>
// //                                   x.email === m.email ? { ...x, status: "Active" } : x
// //                                 )
// //                               )
// //                             }
// //                           >
// //                             <CheckCircle2 className="w-4 h-4" />
// //                           </button>

// //                           <button
// //                             type="button"
// //                             title="Edit"
// //                             className="grid place-items-center w-9 h-9 rounded-full bg-emerald-500 text-white"
// //                             onClick={() => openEdit(m)}
// //                           >
// //                             <Pencil className="w-4 h-4" />
// //                           </button>

// //                           <button
// //                             type="button"
// //                             title="Delete"
// //                             className="grid place-items-center w-9 h-9 rounded-full bg-red-500 text-white"
// //                             onClick={() => openDelete(m)}
// //                           >
// //                             <Trash2 className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </section>
// //       </main>

// //       <Footer />

// //       {/* add/edit modal */}
// //       <MemberModal
// //         open={openModal}
// //         mode={modalMode}
// //         initialMember={editTarget}
// //         onClose={() => setOpenModal(false)}
// //         onAdd={addMember}
// //         onUpdate={updateMember}
// //         members={members}
// //         onRemove={removeMember}
// //         onChangeRole={changeRole}
// //         remainingTokens={remaining}
// //         onRefresh={reloadMembers}   // <-- ensure _id is available after add
// //       />

// //       {/* delete confirm modal */}
// //       <DeleteConfirmModal
// //         open={deleteOpen}
// //         member={deleteTarget}
// //         onCancel={() => setDeleteOpen(false)}
// //         onConfirm={handleDeleteConfirm} // <-- calls DELETE route
// //       />
// //     </div>
// //   );
// // }


// // src/pages/BlogPage.tsx
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import TokenUsageSection from "@/components/TokenUsageSection";
// import { Pencil, Trash2, CheckCircle2, Plus, X, ChevronDown } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";

// type Role = "Admin" | "Member";
// type Status = "Active" | "Pending";

// type Member = {
//   id: string;
//   name: string;
//   email: string;
//   role: Role;
//   status: Status;
//   tokens: number;
//   available: number;
// };

// type ApiMember = {
//   _id: string;
//   name?: string;
//   email: string;
//   role?: string;
//   isVerified?: boolean;
// };

// const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";
// const ORG_LIMIT = 100_000;

// /* ---------------- Metric Card ---------------- */
// function MetricCard({
//   label,
//   value,
//   icon,
// }: {
//   label: string;
//   value: string | number;
//   icon?: React.ReactNode;
// }) {
//   return (
//     <div
//       className="border border-white/10 bg-[#121316] text-white flex items-center gap-3 px-4"
//       style={{ width: 250, height: 80, borderRadius: 16 }}
//     >
//       {icon && (
//         <div className="inline-grid place-items-center w-8 h-8 rounded-full bg-white/5 shrink-0">
//           {icon}
//         </div>
//       )}
//       <div className="min-w-0">
//         <div className="text-sm text-white/70 truncate">{label}</div>
//         <div className="text-xl font-semibold truncate">{value}</div>
//       </div>
//     </div>
//   );
// }

// function NumberInput({
//   value,
//   onChange,
//   placeholder,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
// }) {
//   return (
//     <input
//       inputMode="numeric"
//       pattern="[0-9]*"
//       value={value}
//       onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
//       className="w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 outline-none"
//       placeholder={placeholder}
//     />
//   );
// }

// /* ---------------- Add/Edit Member Modal ---------------- */
// function MemberModal({
//   open,
//   mode,
//   initialMember,
//   onClose,
//   onAdd,
//   onUpdate,
//   members = [],
//   onRemove,
//   onChangeRole,
//   remainingTokens,
//   onRefresh,
// }: {
//   open: boolean;
//   mode: "add" | "edit";
//   initialMember?: Member | null;
//   onClose: () => void;
//   onAdd: (m: Member) => void;
//   onUpdate: (email: string, updates: Partial<Member>) => void;
//   members?: Member[];
//   onRemove: (email: string) => void;
//   onChangeRole: (email: string, role: Role) => void;
//   remainingTokens: number;
//   onRefresh: () => Promise<void>;
// }) {
//   const { token } = useAuth();
//   const editing = mode === "edit";
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState<Role>("Member");
//   const [distribution, setDistribution] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!open) return;
//     if (editing && initialMember) {
//       setFullName(initialMember.name);
//       setEmail(initialMember.email);
//       setRole(initialMember.role);
//       setDistribution(String(initialMember.tokens));
//     } else {
//       setFullName("");
//       setEmail("");
//       setRole("Member");
//       setDistribution("");
//     }
//   }, [open, editing, initialMember]);

//   const ordered = useMemo(
//     () =>
//       [...members].sort((a, b) =>
//         a.status === b.status ? 0 : a.status === "Pending" ? -1 : 1
//       ),
//     [members]
//   );

//   if (!open) return null;

//   const currentTokens = editing && initialMember ? initialMember.tokens : 0;
//   const effectiveRemaining = remainingTokens + currentTokens;
//   const canSubmit =
//     (editing || (fullName.trim() && email.trim())) &&
//     distribution.trim() &&
//     Number(distribution) > 0;

//   const presets = [5000, 10000, 15000, 20000];

//   const handleSubmit = async () => {
//     if (!canSubmit) return;
//     const amount = Number(distribution);
//     if (amount > effectiveRemaining) {
//       window.alert(
//         `Only ${effectiveRemaining.toLocaleString()} tokens available for allocation.`
//       );
//       return;
//     }
//     if (!token) {
//       window.alert("You must be logged in.");
//       return;
//     }

//     const normEmail = email.trim().toLowerCase();
//     const displayName = fullName.trim() || normEmail.split("@")[0] || "User";
//     const apiRole = role === "Admin" ? "Admin" : "Member";

//     // -------- EDIT --------
//     if (editing && initialMember) {
//       try {
//         const url = `${API_BASE}/api/org/members/${initialMember.id}`;
//         const body: any = {};
//         if (apiRole) body.role = apiRole;
//         if (!Number.isNaN(Number(distribution)) && distribution.trim()) {
//           body.tokens = Number(distribution);
//         }

//         const res = await fetch(url, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(body),
//         });

//         const data = await res.json().catch(() => ({} as any));

//         if (!res.ok || !data?.success) {
//           window.alert(`Update failed: ${data?.error || "unknown_error"}`);
//           return;
//         }

//         const newTokens =
//           typeof body.tokens === "number" ? body.tokens : initialMember.tokens;

//         onUpdate(initialMember.email, {
//           role,
//           tokens: newTokens,
//           available: newTokens,
//         });

//         onClose();
//       } catch (e) {
//         window.alert("Update failed due to a network/server error.");
//       }
//       return;
//     }

//     // -------- ADD --------
//     try {
//       setLoading(true);
//       const payload = {
//         members: [
//           { name: displayName, email: normEmail, role: apiRole, tokens: amount },
//         ],
//       };
//       const res = await fetch(`${API_BASE}/api/org/members/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json().catch(() => ({} as any));

//       if (!res.ok || !data?.success) {
//         window.alert(
//           `Invite failed: ${data?.error || data?.results?.[0]?.error || "unknown_error"}`
//         );
//         return;
//       }

//       const result = (data.results || [])[0];
//       if (result?.success) {
//         onAdd({
//           id: `temp-${normEmail}`,
//           name: displayName,
//           email: normEmail,
//           role,
//           status: "Pending",
//           tokens: amount,
//           available: amount,
//         });
//         await onRefresh();
//         onClose();
//       } else {
//         window.alert(`Invite not created: ${result?.error || "unknown_error"}`);
//       }
//     } catch (e) {
//       window.alert("Invite failed due to a network/server error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] grid place-items-center" role="dialog" aria-modal="true">
//       <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
//       <div className="relative w-[96vw] max-w-[900px] rounded-2xl border border-white/10 bg-[#141518] text-white shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-5">
//           <h3 className="text-xl font-semibold">{editing ? "Edit Member" : "Add New Member"}</h3>
//           <button onClick={onClose} className="grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15">
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="px-6 pb-6">
//           <label className="block text-sm mb-2">Full name *</label>
//           <input
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className={`w-full h-11 rounded-lg border px-3 outline-none ${
//               editing ? "bg-[#1A1B1F]/60 text-white/70 cursor-not-allowed" : "bg-[#1A1B1F]"
//             }`}
//             placeholder="Enter full name"
//             disabled={editing}
//           />

//           <label className="block text-sm mt-4 mb-2">Email *</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={`w-full h-11 rounded-lg border px-3 outline-none ${
//               editing ? "bg-[#1A1B1F]/60 text-white/70 cursor-not-allowed" : "bg-[#1A1B1F]"
//             }`}
//             placeholder="Enter email"
//             disabled={editing}
//           />

//           <label className="block text-sm mt-4 mb-2">Role *</label>
//           <div className="relative">
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value as Role)}
//               className="appearance-none w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 pr-10 outline-none"
//             >
//               <option value="Member">Member</option>
//               <option value="Admin">Admin</option>
//             </select>
//             <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
//               <ChevronDown className="w-4 h-4" />
//             </span>
//           </div>

//           <label className="block text-sm mt-4 mb-2">Token Distribution *</label>
//           <NumberInput value={distribution} onChange={setDistribution} placeholder="e.g., 5000" />

//           <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
//             <div className="flex items-center gap-2">
//               {presets.map((p) => (
//                 <button
//                   key={p}
//                   type="button"
//                   onClick={() => setDistribution(String(p))}
//                   className="px-3 h-8 rounded-full bg-black/30 border border-white/10 text-sm hover:bg-black/40"
//                 >
//                   {p.toLocaleString()}
//                 </button>
//               ))}
//             </div>
//             <div className="text-sm text-white/80">
//               Available Tokens: {effectiveRemaining.toLocaleString()}
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={!canSubmit || loading}
//             className="mt-6 w-full h-11 rounded-lg text-sm font-medium disabled:opacity-60"
//             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
//           >
//             {loading ? "Sending..." : editing ? "Update" : "Send Invite"}
//           </button>
//         </div>

//         {!editing && (
//           <>
//             <div className="h-px bg-white/10" />
//             <div className="px-6 py-4">
//               <h4 className="text-lg font-semibold">Team Members & Invites</h4>
//               <div className="mt-3 space-y-3 max-h-[280px] overflow-y-auto pr-1">
//                 {ordered.map((m) => (
//                   <div key={m.email} className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1B1F] border border-white/10">
//                     <div className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-sm font-semibold">
//                       {m.name?.[0]?.toUpperCase() || "U"}
//                     </div>
//                     <div className="min-w-0">
//                       <div className="font-medium truncate">{m.name}</div>
//                       <div className="text-white/60 text-sm truncate">{m.email}</div>
//                     </div>
//                     <span className={`ml-2 text-xs ${m.status === "Pending" ? "text-yellow-400" : "text-emerald-400"}`}>
//                       {m.status}
//                     </span>

//                     <div className="ml-auto">
//                       <div className="relative">
//                         <select
//                           value={m.role}
//                           onChange={(e) => onChangeRole(m.email, e.target.value as Role)}
//                           className="appearance-none bg-[#141518] border border-white/10 rounded-lg h-9 pl-3 pr-8 text-sm"
//                         >
//                           <option value="Member">Member</option>
//                           <option value="Admin">Admin</option>
//                         </select>
//                         <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60">
//                           <ChevronDown className="w-4 h-4" />
//                         </span>
//                       </div>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => onRemove(m.email)}
//                       className="ml-2 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
//                       title="Remove"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//                 {ordered.length === 0 && <div className="text-sm text-white/60">No members yet.</div>}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ---------------- Delete Modal ---------------- */
// function DeleteConfirmModal({
//   open,
//   member,
//   onCancel,
//   onConfirm,
// }: {
//   open: boolean;
//   member: Member | null;
//   onCancel: () => void;
//   onConfirm: (memberId: string) => void;
// }) {
//   if (!open || !member) return null;
//   return (
//     <div className="fixed inset-0 z-[110] grid place-items-center" role="dialog" aria-modal="true">
//       <div className="absolute inset-0 bg-black/60" onClick={onCancel} aria-hidden />
//       <div className="relative w-[92vw] max-w-[460px] rounded-2xl bg-[#17171A] text-white shadow-xl text-center">
//         <div className="px-6 pt-6 pb-2 relative">
//           <h3 className="text-lg font-semibold">Remove {member.name} from this Team?</h3>
//           <button
//             onClick={onCancel}
//             className="absolute right-3 top-3 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//         <div className="px-6 pb-2">
//           <p className="text-sm text-white/85">
//             {member.name} will be removed from this Team and will no longer have access to tokens.
//           </p>
//           <p className="text-sm text-white/85 mt-3">Do you want to remove?</p>
//         </div>
//         <div className="flex items-center justify-center gap-3 px-6 py-5">
//           <button onClick={onCancel} className="h-10 px-5 rounded-lg bg-white/10 hover:bg-white/15">
//             Cancel
//           </button>
//           <button
//             onClick={() => onConfirm(member.id)}
//             className="h-10 px-6 rounded-lg text-white"
//             style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- Main Page ---------------- */
// export default function BlogPage() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const { token } = useAuth();

//   const addMember = (m: Member) => setMembers((prev) => [m, ...prev]);
//   const removeMember = (email: string) =>
//     setMembers((prev) => prev.filter((x) => x.email !== email));
//   const changeRole = (email: string, role: Role) =>
//     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, role } : x)));
//   const updateMember = (email: string, updates: Partial<Member>) =>
//     setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, ...updates } : x)));

//   const reloadMembers = useCallback(async () => {
//     try {
//       if (!token) return;
//       const res = await fetch(`${API_BASE}/api/org/members`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok || !data?.success) return;

//       const mapped: Member[] = (data.members || []).map((m: ApiMember) => ({
//         id: m._id,
//         name: m.name || "(No name)",
//         email: m.email,
//         role: m.role === "Admin" ? "Admin" : "Member",
//         status: m.isVerified ? "Active" : "Pending",
//         tokens: 0,
//         available: 0,
//       }));
//       setMembers(mapped);
//     } catch (err) {
//       console.error(err);
//     }
//   }, [token]);

//   useEffect(() => {
//     reloadMembers();
//   }, [reloadMembers]);

//   const totalDistributed = useMemo(
//     () => members.reduce((s, m) => s + m.tokens, 0),
//     [members]
//   );
//   const remaining = Math.max(0, ORG_LIMIT - totalDistributed);

//   const [openModal, setOpenModal] = useState(false);
//   const [modalMode, setModalMode] = useState<"add" | "edit">("add");
//   const [editTarget, setEditTarget] = useState<Member | null>(null);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

//   const handleDeleteConfirm = async (memberId: string) => {
//     if (!deleteTarget || !token) return;
//     try {
//       const res = await fetch(`${API_BASE}/api/org/members/${memberId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok || !data?.success) {
//         window.alert(`Delete failed: ${data?.error || "unknown_error"}`);
//         return;
//       }
//       removeMember(deleteTarget.email);
//       setDeleteOpen(false);
//       setDeleteTarget(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#07080A] text-white">
//       <Header />
//       <main className="max-w-6xl mx-auto px-4 pt-6 pb-14">
//         <div className="w-full flex justify-center">
//           <TokenUsageSection />
//         </div>

//         <div className="mt-6 w-full flex justify-center">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <MetricCard label="Total Members" value={members.length} icon={<span>👥</span>} />
//             <MetricCard label="Total Tokens Distributed" value={totalDistributed.toLocaleString()} icon={<span>🎁</span>} />
//             <MetricCard label="Total Tokens Remaining" value={remaining.toLocaleString()} icon={<span>🪙</span>} />
//           </div>
//         </div>

//         <section className="mt-8">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">Team Members</h2>
//             <button
//               onClick={() => {
//                 setModalMode("add");
//                 setEditTarget(null);
//                 setOpenModal(true);
//               }}
//               className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white text-black"
//             >
//               <span className="grid place-items-center w-6 h-6 rounded-full bg-black text-white">
//                 <Plus className="w-4 h-4" />
//               </span>
//               Add new member
//             </button>
//           </div>

//           <div className="overflow-x-auto mt-3">
//             <table className="w-full text-left table-fixed border-separate" style={{ borderSpacing: "24px 14px" }}>
//               <thead className="text-white/70 text-sm">
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Tokens</th>
//                   <th>Available</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {members.length === 0 ? (
//                   <tr>
//                     <td className="text-white/60 text-sm py-4" colSpan={7}>
//                       No members yet. Click “Add new member”.
//                     </td>
//                   </tr>
//                 ) : (
//                   members.map((m) => (
//                     <tr key={m.email} className="align-middle">
//                       <td>{m.name}</td>
//                       <td className="text-white/80">{m.email}</td>
//                       <td>{m.role}</td>
//                       <td>
//                         <span className={m.status === "Active" ? "text-emerald-400" : "text-yellow-400"}>
//                           {m.status}
//                         </span>
//                       </td>
//                       <td>{m.tokens.toLocaleString()}</td>
//                       <td>{m.available.toLocaleString()}</td>
//                       <td>
//                         <div className="flex items-center gap-3">
//                           <button
//                             className="grid place-items-center w-9 h-9 rounded-full bg-black/50"
//                             onClick={() =>
//                               setMembers((prev) =>
//                                 prev.map((x) =>
//                                   x.email === m.email ? { ...x, status: "Active" } : x
//                                 )
//                               )
//                             }
//                           >
//                             <CheckCircle2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             className="grid place-items-center w-9 h-9 rounded-full bg-emerald-500 text-white"
//                             onClick={() => {
//                               setModalMode("edit");
//                               setEditTarget(m);
//                               setOpenModal(true);
//                             }}
//                           >
//                             <Pencil className="w-4 h-4" />
//                           </button>
//                           <button
//                             className="grid place-items-center w-9 h-9 rounded-full bg-red-500 text-white"
//                             onClick={() => {
//                               setDeleteTarget(m);
//                               setDeleteOpen(true);
//                             }}
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>

//       <Footer />

//       <MemberModal
//         open={openModal}
//         mode={modalMode}
//         initialMember={editTarget}
//         onClose={() => setOpenModal(false)}
//         onAdd={addMember}
//         onUpdate={updateMember}
//         members={members}
//         onRemove={removeMember}
//         onChangeRole={changeRole}
//         remainingTokens={remaining}
//         onRefresh={reloadMembers}
//       />

//       <DeleteConfirmModal
//         open={deleteOpen}
//         member={deleteTarget}
//         onCancel={() => setDeleteOpen(false)}
//         onConfirm={handleDeleteConfirm}
//       />
//     </div>
//   );
// }



import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TokenUsageSection from "@/components/TokenUsageSection";
import { Pencil, Trash2, CheckCircle2, Plus, X, ChevronDown, RefreshCcw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Role = "Admin" | "Member";
type Status = "Active" | "Pending";

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  tokens: number;
  available: number;
  isDeletedFromOrg?: boolean;
};

type ApiMember = {
  _id: string;
  name?: string;
  email: string;
  role?: string;
  isVerified?: boolean;
  isDeletedFromOrg?: boolean;
  orgTokensRemaining?: number;
  orgAssignedCap?: number;
};

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";
const ORG_LIMIT = 100_000;

/* ---------------- Metric Card ---------------- */
function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="border border-white/10 bg-[#121316] text-white flex items-center gap-3 px-4"
      style={{ width: 250, height: 80, borderRadius: 16 }}
    >
      {icon && (
        <div className="inline-grid place-items-center w-8 h-8 rounded-full bg-white/5 shrink-0">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-sm text-white/70 truncate">{label}</div>
        <div className="text-xl font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
      className="w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 outline-none"
      placeholder={placeholder}
    />
  );
}

/* ---------------- Add/Edit Member Modal ---------------- */
function MemberModal({
  open,
  mode,
  initialMember,
  onClose,
  onAdd,
  onUpdate,
  members = [],
  onRemove,
  onChangeRole,
  remainingTokens,
  onRefresh,
}: {
  open: boolean;
  mode: "add" | "edit";
  initialMember?: Member | null;
  onClose: () => void;
  onAdd: (m: Member) => void;
  onUpdate: (email: string, updates: Partial<Member>) => void;
  members?: Member[];
  onRemove: (email: string) => void;
  onChangeRole: (email: string, role: Role) => void;
  remainingTokens: number;
  onRefresh: () => Promise<void>;
}) {
  const { token } = useAuth();
  const editing = mode === "edit";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Member");
  const [distribution, setDistribution] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editing && initialMember) {
      setFullName(initialMember.name);
      setEmail(initialMember.email);
      setRole(initialMember.role);
      setDistribution(String(initialMember.tokens));
    } else {
      setFullName("");
      setEmail("");
      setRole("Member");
      setDistribution("");
    }
  }, [open, editing, initialMember]);

  const ordered = useMemo(
    () =>
      [...members].sort((a, b) =>
        a.status === b.status ? 0 : a.status === "Pending" ? -1 : 1
      ),
    [members]
  );

  if (!open) return null;

  const currentTokens = editing && initialMember ? initialMember.tokens : 0;
  const effectiveRemaining = remainingTokens + currentTokens;
  const canSubmit =
    (editing || (fullName.trim() && email.trim())) &&
    distribution.trim() &&
    Number(distribution) > 0;

  const presets = [5000, 10000, 15000, 20000];

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const amount = Number(distribution);
    if (amount > effectiveRemaining) {
      window.alert(
        `Only ${effectiveRemaining.toLocaleString()} tokens available for allocation.`
      );
      return;
    }
    if (!token) {
      window.alert("You must be logged in.");
      return;
    }

    const normEmail = email.trim().toLowerCase();
    const displayName = fullName.trim() || normEmail.split("@")[0] || "User";
    const apiRole = role === "Admin" ? "Admin" : "Member";

    // -------- EDIT (✅ updated API) --------
    if (editing && initialMember) {
      try {
        const url = `${API_BASE}/api/org/members/edit/${initialMember.id}`;
        const body: any = {};
        if (apiRole) body.role = apiRole;
        if (!Number.isNaN(Number(distribution)) && distribution.trim()) {
          body.tokens = Number(distribution);
        }

        const res = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        const data = await res.json().catch(() => ({} as any));

        if (!res.ok || !data?.success) {
          window.alert(`Update failed: ${data?.error || "unknown_error"}`);
          return;
        }

        onUpdate(initialMember.email, {
          role,
          tokens: body.tokens,
          available: body.tokens,
        });

        await onRefresh();
        onClose();
      } catch (e) {
        window.alert("Update failed due to a network/server error.");
      }
      return;
    }

    // -------- ADD --------
    try {
      setLoading(true);
      const payload = {
        members: [
          { name: displayName, email: normEmail, role: apiRole, tokens: amount },
        ],
      };
      const res = await fetch(`${API_BASE}/api/org/members/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || !data?.success) {
        window.alert(
          `Invite failed: ${data?.error || data?.results?.[0]?.error || "unknown_error"}`
        );
        return;
      }

      const result = (data.results || [])[0];
      if (result?.success) {
        onAdd({
          id: `temp-${normEmail}`,
          name: displayName,
          email: normEmail,
          role,
          status: "Pending",
          tokens: amount,
          available: amount,
        });
        await onRefresh();
        onClose();
      } else {
        window.alert(`Invite not created: ${result?.error || "unknown_error"}`);
      }
    } catch (e) {
      window.alert("Invite failed due to a network/server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <div className="relative w-[96vw] max-w-[900px] rounded-2xl border border-white/10 bg-[#141518] text-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="text-xl font-semibold">{editing ? "Edit Member" : "Add New Member"}</h3>
          <button onClick={onClose} className="grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          <label className="block text-sm mb-2">Full name *</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full h-11 rounded-lg border px-3 outline-none ${
              editing ? "bg-[#1A1B1F]/60 text-white/70 cursor-not-allowed" : "bg-[#1A1B1F]"
            }`}
            placeholder="Enter full name"
            disabled={editing}
          />

          <label className="block text-sm mt-4 mb-2">Email *</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-11 rounded-lg border px-3 outline-none ${
              editing ? "bg-[#1A1B1F]/60 text-white/70 cursor-not-allowed" : "bg-[#1A1B1F]"
            }`}
            placeholder="Enter email"
            disabled={editing}
          />

          <label className="block text-sm mt-4 mb-2">Role *</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="appearance-none w-full h-11 rounded-lg bg-[#1A1B1F] border border-white/10 px-3 pr-10 outline-none"
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
              <ChevronDown className="w-4 h-4" />
            </span>
          </div>

          <label className="block text-sm mt-4 mb-2">Token Distribution *</label>
          <NumberInput value={distribution} onChange={setDistribution} placeholder="e.g., 5000" />

          <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setDistribution(String(p))}
                  className="px-3 h-8 rounded-full bg-black/30 border border-white/10 text-sm hover:bg-black/40"
                >
                  {p.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="text-sm text-white/80">
              Available Tokens: {effectiveRemaining.toLocaleString()}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="mt-6 w-full h-11 rounded-lg text-sm font-medium disabled:opacity-60"
            style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
          >
            {loading ? "Sending..." : editing ? "Update" : "Send Invite"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Delete Modal ---------------- */
function DeleteConfirmModal({
  open,
  member,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  member: Member | null;
  onCancel: () => void;
  onConfirm: (memberId: string) => void;
}) {
  if (!open || !member) return null;
  return (
    <div className="fixed inset-0 z-[110] grid place-items-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} aria-hidden />
      <div className="relative w-[92vw] max-w-[460px] rounded-2xl bg-[#17171A] text-white shadow-xl text-center">
        <div className="px-6 pt-6 pb-2 relative">
          <h3 className="text-lg font-semibold">Remove {member.name} from this Team?</h3>
          <button
            onClick={onCancel}
            className="absolute right-3 top-3 grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/15"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 pb-2">
          <p className="text-sm text-white/85">
            {member.name} will be removed from this Team and will no longer have access to tokens.
          </p>
          <p className="text-sm text-white/85 mt-3">Do you want to remove?</p>
        </div>
        <div className="flex items-center justify-center gap-3 px-6 py-5">
          <button onClick={onCancel} className="h-10 px-5 rounded-lg bg-white/10 hover:bg-white/15">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(member.id)}
            className="h-10 px-6 rounded-lg text-white"
            style={{ background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)" }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main Page ---------------- */
export default function BlogPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const { token } = useAuth();

  const addMember = (m: Member) => setMembers((prev) => [m, ...prev]);
  const removeMember = (email: string) =>
    setMembers((prev) => prev.filter((x) => x.email !== email));
  const changeRole = (email: string, role: Role) =>
    setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, role } : x)));
  const updateMember = (email: string, updates: Partial<Member>) =>
    setMembers((prev) => prev.map((x) => (x.email === email ? { ...x, ...updates } : x)));
const reloadMembers = useCallback(async () => {
  try {
    if (!token) return;
    const res = await fetch(`${API_BASE}/api/org/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok || !data?.success) return;

    const mapped: Member[] = (data.members || [])
      // ✅ Filter out deleted members
      .filter((m: ApiMember) => !m.isDeletedFromOrg)
      .map((m: ApiMember) => ({
        id: m._id,
        name: m.name || "(No name)",
        email: m.email,
        role: m.role === "Admin" ? "Admin" : "Member",
        status: m.isVerified ? "Active" : "Pending",
        tokens: m.orgAssignedCap || 0,
        available: m.orgTokensRemaining || 0,
        isDeletedFromOrg: m.isDeletedFromOrg || false,
      }));

    setMembers(mapped);
  } catch (err) {
    console.error(err);
  }
}, [token]);

  useEffect(() => {
    reloadMembers();
  }, [reloadMembers]);
 
  const totalDistributed = useMemo(
    () => members.reduce((s, m) => s + m.tokens, 0),
    [members]
  );
  const remaining = Math.max(0, ORG_LIMIT - totalDistributed);

  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editTarget, setEditTarget] = useState<Member | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  // 🗑️ Soft delete
const handleDeleteConfirm = async (memberId: string) => {
  if (!deleteTarget || !token) return;
  try {
    const res = await fetch(`${API_BASE}/api/org/members/${memberId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      window.alert(`Delete failed: ${data?.error || "unknown_error"}`);
      return;
    }

    // ✅ Immediately remove deleted member from state
    setMembers((prev) => prev.filter((m) => m.id !== memberId && m._id !== memberId));

    // ✅ Optional: refresh to ensure clean data
    reloadMembers();

    setDeleteOpen(false);
    setDeleteTarget(null);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};



  // 🔄 Rejoin deleted member
  const handleRejoinMember = async (memberId: string, role = "Member", tokens = 5000) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/org/members/${memberId}/rejoin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role, tokens }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        window.alert(`Rejoin failed: ${data?.error || "unknown_error"}`);
        return;
      }
      await reloadMembers();
    } catch (err) {
      console.error("Rejoin failed:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07080A] text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-14">
        <div className="w-full flex justify-center">
          <TokenUsageSection />
        </div>

        <div className="mt-6 w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Total Members" value={members.length} icon={<span>👥</span>} />
            <MetricCard label="Total Tokens Distributed" value={totalDistributed.toLocaleString()} icon={<span>🎁</span>} />
            <MetricCard label="Total Tokens Remaining" value={remaining.toLocaleString()} icon={<span>🪙</span>} />
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Team Members</h2>
         <button
  onClick={() => {
    setModalMode("add");
    setEditTarget(null);
    setOpenModal(true);
  }}
  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition-all hover:opacity-90"
  style={{
    background: "linear-gradient(90deg, #FF14EF 0%, #1A73E8 100%)",
  }}
>
  <span className="grid place-items-center w-6 h-6 rounded-full bg-white/20 text-white">
    <Plus className="w-4 h-4" />
  </span>
  Add new member
</button>

          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left table-fixed border-separate" style={{ borderSpacing: "24px 14px" }}>
              <thead className="text-white/70 text-sm">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Tokens</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
               {members.filter(m => !m.isDeletedFromOrg).length === 0 ? (

                  <tr>
                    <td className="text-white/60 text-sm py-4" colSpan={7}>
                      No members yet. Click “Add new member”.
                    </td>
                  </tr>
                ) : (
                members.filter(m => !m.isDeletedFromOrg).map((m) => (

                    <tr key={m.email} className="align-middle">
                      <td>{m.name}</td>
                      <td className="text-white/80">{m.email}</td>
                      <td>{m.role}</td>
                      <td>
                        <span className={m.status === "Active" ? "text-emerald-400" : "text-yellow-400"}>
                          {m.status}
                        </span>
                      </td>
                      <td>{m.tokens.toLocaleString()}</td>
                      <td>{m.available.toLocaleString()}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          {!m.isDeletedFromOrg && (
                            <>
                              <button
                                className="grid place-items-center w-9 h-9 rounded-full bg-black/50"
                                onClick={() =>
                                  setMembers((prev) =>
                                    prev.map((x) =>
                                      x.email === m.email ? { ...x, status: "Active" } : x
                                    )
                                  )
                                }
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                className="grid place-items-center w-9 h-9 rounded-full bg-emerald-500 text-white"
                                onClick={() => {
                                  setModalMode("edit");
                                  setEditTarget(m);
                                  setOpenModal(true);
                                }}
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                className="grid place-items-center w-9 h-9 rounded-full bg-red-500 text-white"
                                onClick={() => {
                                  setDeleteTarget(m);
                                  setDeleteOpen(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          {m.isDeletedFromOrg && (
                            <button
                              className="grid place-items-center w-9 h-9 rounded-full bg-blue-500 text-white"
                              title="Rejoin member"
                              onClick={() => handleRejoinMember(m.id)}
                            >
                              <RefreshCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />

      <MemberModal
        open={openModal}
        mode={modalMode}
        initialMember={editTarget}
        onClose={() => setOpenModal(false)}
        onAdd={addMember}
        onUpdate={updateMember}
        members={members}
        onRemove={removeMember}
        onChangeRole={changeRole}
        remainingTokens={remaining}
        onRefresh={reloadMembers}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        member={deleteTarget}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
