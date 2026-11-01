"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, BookOpen, Brain, CalendarDays, CheckCircle2,
  ChevronRight, CircleHelp, Clock3, GraduationCap, LayoutDashboard,
  Library, Search, Settings2, Target, TrendingUp
} from "lucide-react";

const subjects = [
  { name: "Mathematics AA", level: "HL", progress: 17, color: "blue", detail: "Understanding record" },
  { name: "Physics", level: "HL", progress: 17, color: "violet", detail: "Understanding record" },
  { name: "Economics", level: "HL", progress: null, color: "amber", detail: "Not assessed yet" },
  { name: "Chemistry", level: "SL", progress: null, color: "green", detail: "Not assessed yet" },
  { name: "English B", level: "SL", progress: null, color: "rose", detail: "Not assessed yet" },
  { name: "Bahasa Indonesia", level: "SL", progress: null, color: "slate", detail: "Not assessed yet" }
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My subjects", icon: BookOpen },
  { label: "Study planner", icon: CalendarDays },
  { label: "Assessments", icon: Target },
  { label: "Resources", icon: Library },
  { label: "Knowledge", icon: Brain }
];

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [showMethod, setShowMethod] = useState(false);
  const totalRecorded = useMemo(() => subjects.reduce((sum, item) => sum + (item.progress ?? 0), 0), []);

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <div className="brand-mark">A</div>
          <div><strong>angkatlogika</strong><span>LEARNING COMMAND CENTER</span></div>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => setActive(label)}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>
              {label === "Overview" && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="showup-card">
            <span className="eyebrow">YOUR PRINCIPLE</span>
            <strong>SHOW UP GUTSY.</strong>
            <p>Presence that hits the heart, not just words.</p>
          </div>
          <button className="nav-item"><Settings2 size={17} /><span>Settings</span></button>
          <div className="profile-row"><div className="avatar">I</div><div><strong>My learning space</strong><span>Personal workspace</span></div></div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <ChevronRight size={14} /> <strong>{active}</strong></div>
          <div className="top-actions"><span className="live-indicator"><i /> Local preview</span><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button></div>
        </header>

        <div className="page-content">
          <div className="welcome-row">
            <div><div className="eyebrow">SUNDAY, NOVEMBER 1, 2026</div><h1>{active === "Overview" ? "Your learning, in focus." : active}</h1><p className="subtitle">Understand where you are. Know what to do next. Keep showing up.</p></div>
            <div className="streak-chip"><Activity size={16} /><span>SHOW UP GUTSY</span></div>
          </div>

          {active === "Overview" ? (
            <>
              <div className="metric-grid">
                <article className="metric-card primary-metric">
                  <div className="metric-top"><span>RECORDED UNDERSTANDING</span><button onClick={() => setShowMethod(!showMethod)} aria-label="Show calculation method"><CircleHelp size={16} /></button></div>
                  <div className="metric-value">{totalRecorded}<small> pts</small></div>
                  <div className="metric-caption">Mathematics 17 + Physics 17</div>
                  <div className="metric-foot"><span className="metric-bullet" /> Based on your current recorded figures</div>
                </article>
                <article className="metric-card"><div className="metric-top"><span>SUBJECTS</span><BookOpen size={17} /></div><div className="metric-value">6</div><div className="metric-caption">3 Higher Level · 3 Standard Level</div><div className="metric-foot">Your IB Diploma subjects</div></article>
                <article className="metric-card"><div className="metric-top"><span>LEARNING EVIDENCE</span><CheckCircle2 size={17} /></div><div className="metric-value">0</div><div className="metric-caption">Assessments recorded in this workspace</div><div className="metric-foot">Evidence tracking setup pending</div></article>
              </div>

              {showMethod && <div className="info-banner"><strong>How this number works</strong><p>34 is the sum of the two figures you supplied: Mathematics 17 and Physics 17. It is not yet a six-subject average or a verified mastery score. The final understanding indicator will be calculated from recorded learning evidence.</p></div>}

              <div className="section-heading"><div><h2>Subject progress</h2><p>Your current recorded position across six subjects.</p></div><button className="text-button" onClick={() => setActive("My subjects")}>View all <ArrowUpRight size={15} /></button></div>
              <div className="subject-grid">
                {filteredSubjects.map((subject) => (
                  <article className="subject-card" key={subject.name}>
                    <div className="subject-card-top"><div className={"subject-icon " + subject.color}><GraduationCap size={19} /></div><span className="level-pill">{subject.level}</span></div>
                    <h3>{subject.name}</h3>
                    <p>{subject.detail}</p>
                    <div className="progress-line"><div className={"progress-fill " + subject.color} style={{ width: (subject.progress ?? 0) + "%" }} /></div>
                    <div className="progress-label"><strong>{subject.progress === null ? "Not recorded" : subject.progress + "%"}</strong><span>{subject.progress === null ? "Awaiting evidence" : "Existing figure"}</span></div>
                  </article>
                ))}
              </div>

              <div className="bottom-grid">
                <article className="panel next-panel"><div className="panel-heading"><div><span className="eyebrow">NEXT ACTION</span><h2>Build your learning baseline</h2></div><Target size={19} /></div><p>Before the planner can recommend priorities, it needs your syllabus topics and an initial understanding check for each subject.</p><button className="primary-button" onClick={() => setActive("My subjects")}>Set up subject tracking <ChevronRight size={16} /></button></article>
                <article className="panel principle-panel"><span className="eyebrow">A NOTE TO YOURSELF</span><h2>Show up gutsy.</h2><p>Ideas become meaningful when you give them time, effort, and follow-through.</p><span className="quote-mark">“</span></article>
              </div>
            </>
          ) : (
            <div className="empty-state panel">
              <div className="empty-icon"><Library size={24} /></div>
              <h2>{active} is being prepared</h2>
              <p>This section will use the same verified learning records as your overview. No progress is manually adjustable.</p>
              <button className="primary-button" onClick={() => setActive("Overview")}>Back to overview <ChevronRight size={16} /></button>
            </div>
          )}
          <footer className="footer"><span>ANGKATLOGIKA · PERSONAL LEARNING SYSTEM</span><span>Build with purpose. Show up gutsy.</span></footer>
        </div>
      </section>
    </main>
  );
}