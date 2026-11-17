'use client';

import React, { useState, useMemo } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Key,
  KeyRound,
  Users,
  UserCheck,
  UserX,
  Terminal,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Eye,
  EyeOff,
  Database,
  Server,
  HardDrive,
  Layers,
  Search,
  HelpCircle,
  Activity,
  Fingerprint,
  Smartphone,
  Sparkles,
  BookOpen,
  Cpu,
  Network,
  ChevronDown,
  ChevronUp,
  Zap,
  Scale,
  Copy,
  Clock,
  Archive,
  RefreshCw,
  Play,
  FileCode2,
  Sliders
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson14TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// 10 MCQ Questions for Lesson 14 (Incorporates all 7 user questions + 3 university exam questions)
interface MCQQuestion {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

const MCQ_DATA: MCQQuestion[] = [
  {
    id: 1,
    question: 'What does authentication verify?',
    options: [
      { key: 'A', text: 'User permissions' },
      { key: 'B', text: 'User identity ("Who are you?")' },
      { key: 'C', text: 'Database performance' },
      { key: 'D', text: 'Data accuracy' }
    ],
    correct: 'B',
    explanation: 'Authentication is the process of verifying who a user is by validating credentials such as a username, password, biometrics, or 2FA token.'
  },
  {
    id: 2,
    question: 'Which SQL command gives permission to a user?',
    options: [
      { key: 'A', text: 'REVOKE' },
      { key: 'B', text: 'DELETE' },
      { key: 'C', text: 'GRANT' },
      { key: 'D', text: 'DROP' }
    ],
    correct: 'C',
    explanation: 'The SQL GRANT command confers specified database privileges (SELECT, INSERT, UPDATE, DELETE) on database objects to users or roles.'
  },
  {
    id: 3,
    question: 'What does RBAC stand for?',
    options: [
      { key: 'A', text: 'Role-Based Access Control' },
      { key: 'B', text: 'Record-Based Access Control' },
      { key: 'C', text: 'Random-Based Access Control' },
      { key: 'D', text: 'Read-Based Access Control' }
    ],
    correct: 'A',
    explanation: 'RBAC stands for Role-Based Access Control, where permissions are assigned to roles, and users are assigned to those roles.'
  },
  {
    id: 4,
    question: 'Which CIA principle protects data from unauthorized modification or tampering?',
    options: [
      { key: 'A', text: 'Confidentiality' },
      { key: 'B', text: 'Integrity' },
      { key: 'C', text: 'Availability' },
      { key: 'D', text: 'Authentication' }
    ],
    correct: 'B',
    explanation: 'Integrity ensures that database information remains accurate, consistent, and protected against unauthorized modification or deletion.'
  },
  {
    id: 5,
    question: 'Which SQL command removes previously granted UPDATE permission from a user?',
    options: [
      { key: 'A', text: 'GRANT UPDATE' },
      { key: 'B', text: 'DELETE UPDATE' },
      { key: 'C', text: 'REVOKE UPDATE' },
      { key: 'D', text: 'DROP UPDATE' }
    ],
    correct: 'C',
    explanation: 'The REVOKE statement withdraws privileges previously granted to a user using the syntax: REVOKE UPDATE ON Table FROM User;'
  },
  {
    id: 6,
    question: 'What is the most effective defense against SQL Injection attacks?',
    options: [
      { key: 'A', text: 'Use longer table names' },
      { key: 'B', text: 'Use Prepared Statements and Parameterized Queries' },
      { key: 'C', text: 'Give everyone admin access' },
      { key: 'D', text: 'Disable database backups' }
    ],
    correct: 'B',
    explanation: 'Prepared statements separate SQL code from user-supplied values, ensuring that untrusted user input is treated strictly as data literals rather than executable commands.'
  },
  {
    id: 7,
    question: 'What is the Principle of Least Privilege (PoLP)?',
    options: [
      { key: 'A', text: 'Give everyone full administrative access' },
      { key: 'B', text: 'Give users only the minimum necessary permissions required to perform their jobs' },
      { key: 'C', text: 'Remove all database users' },
      { key: 'D', text: 'Allow access without authentication' }
    ],
    correct: 'B',
    explanation: 'The Principle of Least Privilege mandates granting users and applications only the minimal privileges strictly necessary to complete their assigned responsibilities.'
  },
  {
    id: 8,
    question: 'What is the key difference between Discretionary (DAC) and Mandatory (MAC) Access Control?',
    options: [
      { key: 'A', text: 'DAC is faster; MAC is slower' },
      { key: 'B', text: 'In DAC the object owner sets permissions; in MAC central security clearance policies govern access' },
      { key: 'C', text: 'DAC does not require authentication' },
      { key: 'D', text: 'MAC is only used in NoSQL databases' }
    ],
    correct: 'B',
    explanation: 'In DAC, the creator/owner of an object controls access discretionarily. In MAC, access is enforced strictly by central security labels (Top Secret, Confidential, Public).'
  },
  {
    id: 9,
    question: 'What type of backup copies only data that changed since the last full backup?',
    options: [
      { key: 'A', text: 'Full Backup' },
      { key: 'B', text: 'Incremental Backup' },
      { key: 'C', text: 'Differential Backup' },
      { key: 'D', text: 'Mirror Backup' }
    ],
    correct: 'C',
    explanation: 'A Differential Backup captures all changes made since the last FULL backup, whereas an Incremental Backup copies only changes since the PREVIOUS backup of any type.'
  },
  {
    id: 10,
    question: 'Why should passwords never be stored using reversible encryption?',
    options: [
      { key: 'A', text: 'Encryption is too slow' },
      { key: 'B', text: 'If the secret key is leaked or stolen, all user passwords can be reversed into plaintext; salted hashing is non-reversible' },
      { key: 'C', text: 'Encryption increases SQL injection risks' },
      { key: 'D', text: 'Relational databases cannot store encrypted strings' }
    ],
    correct: 'B',
    explanation: 'Reversible encryption allows whoever holds the decryption key to read plaintext passwords. Secure systems use one-way salted password hashes (e.g. bcrypt, Argon2) which cannot be decrypted.'
  }
];

// Virtual Privilege Table Structure for SQL Authorization Simulator
interface UserPrivilegeRow {
  user: string;
  table: string;
  select: boolean;
  insert: boolean;
  update: boolean;
  delete: boolean;
}

export default function DatabaseLesson14Topic({ onNavigate }: DatabaseLesson14TopicProps) {
  // 1. University Access Explorer State
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'accountant' | 'admin'>('student');
  const [tamperAttempted, setTamperAttempted] = useState<boolean>(false);
  const [tamperResult, setTamperResult] = useState<string | null>(null);

  // 2. CIA Triad Active Tab
  const [activeCia, setActiveCia] = useState<'confidentiality' | 'integrity' | 'availability'>('confidentiality');

  // 3. Authentication & 2FA Gatekeeper Simulator State
  const [authStage, setAuthStage] = useState<'login' | 'otp' | 'authorized'>('login');
  const [authUsername, setAuthUsername] = useState<string>('rahim_student');
  const [authPassword, setAuthPassword] = useState<string>('secret123');
  const [auth2faEnabled, setAuth2faEnabled] = useState<boolean>(true);
  const [authOtpInput, setAuthOtpInput] = useState<string>('849201');
  const [authLog, setAuthLog] = useState<string>('System idle. Ready for authentication.');

  // 4. Access Control Models (DAC / MAC / RBAC)
  const [accessModel, setAccessModel] = useState<'DAC' | 'MAC' | 'RBAC'>('RBAC');
  const [macClearance, setMacClearance] = useState<'Public' | 'Confidential' | 'Secret' | 'Top Secret'>('Secret');

  // 5. SQL Authorization Console (GRANT / REVOKE)
  const [privileges, setPrivileges] = useState<UserPrivilegeRow[]>([
    { user: 'Rahim', table: 'Students', select: true, insert: false, update: false, delete: false },
    { user: 'Karim', table: 'Students', select: false, insert: false, update: false, delete: false },
    { user: 'Teacher_Kamal', table: 'Students', select: true, insert: true, update: true, delete: false },
    { user: 'Admin_Super', table: 'Students', select: true, insert: true, update: true, delete: true }
  ]);
  const [sqlConsoleCommand, setSqlConsoleCommand] = useState<string>('GRANT SELECT, INSERT ON Students TO Karim;');
  const [sqlConsoleFeedback, setSqlConsoleFeedback] = useState<string>('Console initialized. Execute SQL GRANT/REVOKE commands below.');

  // 6. Principle of Least Privilege Blast Radius Simulator
  const [polpStrategy, setPolpStrategy] = useState<'least_privilege' | 'over_privileged'>('least_privilege');
  const [blastAttemptResult, setBlastAttemptResult] = useState<string | null>(null);

  // 7. SQL Injection & Prepared Statement Defense Lab
  const [sqliMode, setSqliMode] = useState<'vulnerable' | 'prepared'>('vulnerable');
  const [sqliUsername, setSqliUsername] = useState<string>('admin');
  const [sqliPassword, setSqliPassword] = useState<string>("' OR '1'='1' --");
  const [sqliExecutionResult, setSqliExecutionResult] = useState<{
    success: boolean;
    executedSql: string;
    explanation: string;
  } | null>(null);

  // 8. Database Encryption & Hashing Lab
  const [encryptionView, setEncryptionView] = useState<'rest' | 'transit' | 'hashing'>('rest');
  const [plaintextSample, setPlaintextSample] = useState<string>('GPA: 3.95 | Tuitions: $1,200 | Grade: A+');

  // 9. Database Auditing Filter
  const [auditFilter, setAuditFilter] = useState<'all' | 'suspicious' | 'updates'>('all');

  // 10. Backup & Recovery Timeline Simulator
  const [backupStrategy, setBackupStrategy] = useState<'incremental' | 'differential'>('incremental');
  const [recoveryStep, setRecoveryStep] = useState<number>(0);

  // 11. MCQ Assessment State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 12. University Exam Accordions
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // 13. Revision Checklist State (16 items)
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQ(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleChecklist = (idx: number) => {
    setCheckedChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectAnswer = (qId: number, key: 'A' | 'B' | 'C' | 'D') => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const quizScore = useMemo(() => {
    let score = 0;
    MCQ_DATA.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [selectedAnswers]);

  const checklistTotal = 16;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  // SQL Authorization Execution Engine
  const executeSqlCommand = (cmd: string) => {
    const cleanCmd = cmd.trim();
    setSqlConsoleCommand(cleanCmd);

    // GRANT SELECT, INSERT ON Students TO Karim;
    const grantMatch = cleanCmd.match(/GRANT\s+([\w\s,]+)\s+ON\s+(\w+)\s+TO\s+(\w+)/i);
    const revokeMatch = cleanCmd.match(/REVOKE\s+([\w\s,]+)\s+ON\s+(\w+)\s+FROM\s+(\w+)/i);

    if (grantMatch) {
      const privs = grantMatch[1].toUpperCase().split(',').map(p => p.trim());
      const table = grantMatch[2];
      const targetUser = grantMatch[3];

      setPrivileges(prev => {
        const existing = prev.find(p => p.user.toLowerCase() === targetUser.toLowerCase() && p.table.toLowerCase() === table.toLowerCase());
        if (existing) {
          return prev.map(p => {
            if (p.user.toLowerCase() === targetUser.toLowerCase() && p.table.toLowerCase() === table.toLowerCase()) {
              return {
                ...p,
                select: privs.includes('ALL') || privs.includes('SELECT') ? true : p.select,
                insert: privs.includes('ALL') || privs.includes('INSERT') ? true : p.insert,
                update: privs.includes('ALL') || privs.includes('UPDATE') ? true : p.update,
                delete: privs.includes('ALL') || privs.includes('DELETE') ? true : p.delete
              };
            }
            return p;
          });
        } else {
          return [
            ...prev,
            {
              user: targetUser,
              table,
              select: privs.includes('ALL') || privs.includes('SELECT'),
              insert: privs.includes('ALL') || privs.includes('INSERT'),
              update: privs.includes('ALL') || privs.includes('UPDATE'),
              delete: privs.includes('ALL') || privs.includes('DELETE')
            }
          ];
        }
      });
      setSqlConsoleFeedback(`✓ Query OK, 0 rows affected. Granted [${grantMatch[1]}] on ${table} to ${targetUser}.`);
    } else if (revokeMatch) {
      const privs = revokeMatch[1].toUpperCase().split(',').map(p => p.trim());
      const table = revokeMatch[2];
      const targetUser = revokeMatch[3];

      setPrivileges(prev => {
        return prev.map(p => {
          if (p.user.toLowerCase() === targetUser.toLowerCase() && p.table.toLowerCase() === table.toLowerCase()) {
            return {
              ...p,
              select: privs.includes('ALL') || privs.includes('SELECT') ? false : p.select,
              insert: privs.includes('ALL') || privs.includes('INSERT') ? false : p.insert,
              update: privs.includes('ALL') || privs.includes('UPDATE') ? false : p.update,
              delete: privs.includes('ALL') || privs.includes('DELETE') ? false : p.delete
            };
          }
          return p;
        });
      });
      setSqlConsoleFeedback(`✓ Query OK, 0 rows affected. Revoked [${revokeMatch[1]}] on ${table} from ${targetUser}.`);
    } else {
      setSqlConsoleFeedback(`⚠ Error 1064 (42000): Syntax error. Expected syntax: GRANT <privileges> ON <table> TO <user>; or REVOKE <privileges> ON <table> FROM <user>;`);
    }
  };

  // SQL Injection Execution Simulation
  const runSqliSimulation = () => {
    if (sqliMode === 'vulnerable') {
      const executed = `SELECT * FROM Users WHERE username = '${sqliUsername}' AND password = '${sqliPassword}';`;
      const isExploited = sqliPassword.includes("' OR '") || sqliPassword.includes("' OR 1=1") || sqliPassword.includes("'--");
      
      setSqliExecutionResult({
        success: isExploited,
        executedSql: executed,
        explanation: isExploited
          ? 'CRITICAL SECURITY BREACH! The malicious input broke out of the string quotes. The condition `\'1\'=\'1\'` evaluates to TRUE for all rows, and `--` comments out the password validation. Attacker logged in as ADMINISTRATOR without a valid password!'
          : 'Authentication evaluated normally. In vulnerable mode, input is directly concatenated into the SQL statement, leaving the database vulnerable to malicious token injection.'
      });
    } else {
      const executed = `PREPARE stmt FROM 'SELECT * FROM Users WHERE username = ? AND password = ?';\nEXECUTE stmt USING '${sqliUsername}', '${sqliPassword}';`;
      setSqliExecutionResult({
        success: false,
        executedSql: executed,
        explanation: 'DEFENSE SUCCESSFUL! With Prepared Statements, the SQL engine compiles the query tree before binding parameters. The payload is treated strictly as an escaped literal string value, not executable SQL syntax. Access safely DENIED.'
      });
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07132a] via-[#091b3d] to-[#040915] border border-cyan-800/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Lesson 14 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Security &amp; Authorization
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight">
            Database Security, Access Control &amp; Authorization
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Master the defense mechanisms protecting mission-critical databases: the CIA Triad (Confidentiality, Integrity, Availability), Authentication vs. Authorization, Access Control Models (DAC, MAC, RBAC), SQL <code>GRANT</code> &amp; <code>REVOKE</code>, Principle of Least Privilege, SQL Injection defense via Prepared Statements, Database Encryption, Auditing trails, and Backup &amp; Recovery strategies.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-cyan-300/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>CIA Triad Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>RBAC &amp; DAC Models</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>SQL GRANT &amp; REVOKE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>SQLi &amp; Prepared Statements</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1 & 2: WHAT IS DATABASE SECURITY & UNIVERSITY SCENARIO
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 &amp; 2 of 17 • Fundamentals
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What Is Database Security &amp; Why It Matters</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Formal Definition</h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Database Security</strong> refers to the collective suite of technical controls, architectural policies, cryptographic measures, and administrative procedures designed to protect a database against <strong>unauthorized access, malicious alteration, accidental deletion, data theft, and structural corruption</strong>.
            </p>
            <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 text-xs text-cyan-200 font-mono space-y-1">
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">Core Objective:</div>
              <div>Ensure that <strong>only authenticated &amp; authorized entities</strong> can perform strictly permitted operations on approved data sets.</div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-white font-mono uppercase">6 Core Pillars of Database Security</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { title: '1. Prevent Intrusion', desc: 'Block unauthorized or external users from private records.' },
                  { title: '2. Protect Sensitive Data', desc: 'Secure passwords, medical records, and credit card numbers.' },
                  { title: '3. Prevent Tampering', desc: 'Stop malicious modifications to grades or payroll records.' },
                  { title: '4. Maintain Integrity', desc: 'Ensure data remains accurate, complete, and consistent.' },
                  { title: '5. Prevent Data Theft', desc: 'Mitigate data exfiltration and insider credential leaks.' },
                  { title: '6. Guarantee Privacy', desc: 'Enforce compliance laws like GDPR, HIPAA, and FERPA.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 space-y-0.5">
                    <div className="font-bold text-cyan-300 font-mono text-[11px]">{item.title}</div>
                    <div className="text-[10px] text-zinc-400 font-sans">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive University Role Access Inspector */}
          <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Interactive Lab
                </span>
                <h3 className="text-sm font-bold text-white">University Portal Role-Based Access Matrix</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                Live Simulator
              </span>
            </div>

            {/* Role Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'student', label: 'Student (Rahim)', icon: UserCheck },
                { id: 'teacher', label: 'Teacher (Prof. Karim)', icon: BookOpen },
                { id: 'accountant', label: 'Accountant (Selim)', icon: Scale },
                { id: 'admin', label: 'Database Admin', icon: ShieldCheck }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRole(r.id as typeof selectedRole);
                    setTamperResult(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedRole === r.id
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                      : 'bg-slate-900 text-zinc-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <r.icon className="w-3.5 h-3.5" />
                  <span>{r.label}</span>
                </button>
              ))}
            </div>

            {/* Permission Matrix Card for Selected Role */}
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Inspecting Role:</span>
                <span className="text-cyan-400 font-bold uppercase">{selectedRole}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-zinc-400">Exam Results Table:</div>
                  <div className="font-bold mt-0.5">
                    {selectedRole === 'student' && <span className="text-emerald-400">SELECT (Own Record Only)</span>}
                    {selectedRole === 'teacher' && <span className="text-emerald-400">SELECT, UPDATE (All Students)</span>}
                    {selectedRole === 'accountant' && <span className="text-rose-400">NO ACCESS (403)</span>}
                    {selectedRole === 'admin' && <span className="text-purple-400">FULL ACCESS (ALL)</span>}
                  </div>
                </div>

                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-zinc-400">Tuition Fees &amp; Payments:</div>
                  <div className="font-bold mt-0.5">
                    {selectedRole === 'student' && <span className="text-emerald-400">SELECT (Own Invoices)</span>}
                    {selectedRole === 'teacher' && <span className="text-rose-400">NO ACCESS (403)</span>}
                    {selectedRole === 'accountant' && <span className="text-emerald-400">SELECT, INSERT, UPDATE</span>}
                    {selectedRole === 'admin' && <span className="text-purple-400">FULL ACCESS (ALL)</span>}
                  </div>
                </div>
              </div>

              {/* Real-World Tampering Simulation */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-zinc-400 text-[11px] font-sans">
                  Scenario: Student Rahim attempts to alter his DBMS exam grade from <strong>45</strong> to <strong>95</strong>:
                </div>
                <button
                  onClick={() => {
                    if (selectedRole === 'student') {
                      setTamperResult('SECURITY ALERT! Operation Denied (403 Forbidden). Student role does NOT possess UPDATE privileges on table Results. Attempt logged to security audit trail.');
                    } else if (selectedRole === 'teacher') {
                      setTamperResult('AUTHORIZED: Teacher role holds UPDATE privileges. Grade updated from 45 to 95. Change logged with Teacher ID and timestamp.');
                    } else if (selectedRole === 'accountant') {
                      setTamperResult('DENIED: Accountant has payment privileges only. Unauthorized attempt on Results table blocked by Least Privilege rule.');
                    } else {
                      setTamperResult('AUTHORIZED (SUPERUSER): Administrator overridden marks. Audit record created.');
                    }
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>Execute: UPDATE Results SET marks = 95 WHERE student_id = 101;</span>
                </button>

                {tamperResult && (
                  <div className={`p-3 rounded-lg border text-[11px] font-sans leading-relaxed ${
                    tamperResult.includes('DENIED') || tamperResult.includes('ALERT')
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                      : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  }`}>
                    {tamperResult}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: THE CIA TRIAD (CONFIDENTIALITY, INTEGRITY, AVAILABILITY)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 3 of 17 • Core Philosophy
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The CIA Triad in Database Systems</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          The <strong>CIA Triad</strong> is the foundational security model across all computer systems and databases. It balances three pillars: <strong>Confidentiality</strong> (no unauthorized viewing), <strong>Integrity</strong> (no unauthorized modification), and <strong>Availability</strong> (guaranteed access when required).
        </p>

        {/* Interactive CIA Triad Inspector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'confidentiality',
              letter: 'C',
              title: 'Confidentiality',
              subtitle: 'Prevent Unauthorized Viewing',
              color: 'text-cyan-400',
              border: 'border-cyan-500/40',
              bg: 'bg-cyan-950/20',
              badgeBg: 'bg-cyan-500/20',
              principle: 'Data must be accessible ONLY to authorized entities.',
              mechanism: 'Encryption at rest/in-transit, Column Masking, SQL Views, RBAC privileges.',
              example: 'A student can view their own GPA, but cannot inspect other students’ grades or teacher salary details.'
            },
            {
              id: 'integrity',
              letter: 'I',
              title: 'Integrity',
              subtitle: 'Prevent Unauthorized Modification',
              color: 'text-emerald-400',
              border: 'border-emerald-500/40',
              bg: 'bg-emerald-950/20',
              badgeBg: 'bg-emerald-500/20',
              principle: 'Data must remain accurate, complete, and trustworthy throughout its lifecycle.',
              mechanism: 'Check constraints, Foreign Keys, Audit Triggers, Transaction ACID properties, Cryptographic hashes.',
              example: 'Preventing students from altering marks from 45 to 95; ensuring bank transfers deduct and credit simultaneously.'
            },
            {
              id: 'availability',
              letter: 'A',
              title: 'Availability',
              subtitle: 'Ensure Guaranteed Access',
              color: 'text-purple-400',
              border: 'border-purple-500/40',
              bg: 'bg-purple-950/20',
              badgeBg: 'bg-purple-500/20',
              principle: 'Authorized users must have timely and reliable access to database services.',
              mechanism: 'Redundant server clusters, Load Balancers, automated backups, DDoS mitigation, failover replicas.',
              example: 'University portal must remain operational when 50,000 students log in simultaneously on exam publication day.'
            }
          ].map(cia => (
            <div
              key={cia.id}
              onClick={() => setActiveCia(cia.id as typeof activeCia)}
              className={`p-5 rounded-xl border transition-all cursor-pointer space-y-3 ${
                activeCia === cia.id ? `${cia.border} ${cia.bg} ring-1 ring-cyan-500/30 shadow-xl` : 'border-slate-800 bg-[#14182d] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black font-mono text-sm ${cia.badgeBg} ${cia.color}`}>
                  {cia.letter}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-300">
                  CIA Pillar
                </span>
              </div>

              <div>
                <h3 className={`text-base font-bold font-mono ${cia.color}`}>{cia.title}</h3>
                <div className="text-xs text-zinc-400 font-sans">{cia.subtitle}</div>
              </div>

              <div className="space-y-1.5 text-xs font-sans">
                <div className="text-zinc-300 font-semibold">{cia.principle}</div>
                <div className="text-[11px] text-zinc-400">
                  <span className="text-zinc-300 font-bold font-mono">Enforced by: </span>{cia.mechanism}
                </div>
              </div>

              <div className="p-2.5 rounded bg-black/40 border border-slate-800 text-[11px] text-zinc-300 font-sans">
                <span className="font-bold text-amber-300 font-mono">Exam Scenario: </span>
                {cia.example}
              </div>
            </div>
          ))}
        </div>

        {/* University Exam Summary Table */}
        <div className="pt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                <tr>
                  <th className="p-3">CIA Pillar</th>
                  <th className="p-3">Core Meaning</th>
                  <th className="p-3">Real-World University Example</th>
                  <th className="p-3">Primary Threat Mitigated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-cyan-400">Confidentiality</td>
                  <td className="p-3 text-zinc-300 font-sans">Protecting data from unauthorized viewing</td>
                  <td className="p-3 text-zinc-400 font-sans">Protecting personal student records &amp; login hashes</td>
                  <td className="p-3 text-rose-400 font-mono">Data snooping / SQL injection leaks</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-400">Integrity</td>
                  <td className="p-3 text-zinc-300 font-sans">Protecting data from unauthorized modification</td>
                  <td className="p-3 text-zinc-400 font-sans">Preventing mark manipulation from 45 to 95</td>
                  <td className="p-3 text-rose-400 font-mono">Data tampering / corruption / replay</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-400">Availability</td>
                  <td className="p-3 text-zinc-300 font-sans">Ensuring access when legitimately required</td>
                  <td className="p-3 text-zinc-400 font-sans">Keeping university servers up during result release day</td>
                  <td className="p-3 text-rose-400 font-mono">DDoS attacks / hardware crashes / outage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4 & 5: AUTHENTICATION VS AUTHORIZATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 4 &amp; 5 of 17 • Crucial Exam Topic
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Authentication vs. Authorization</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Comparison Table */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">The Key Difference: Identity vs. Permissions</h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              A student and a professor may both authenticate successfully with valid credentials. However, their <strong>authorization profiles</strong> dictate drastically different privileges on database tables.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Attribute</th>
                    <th className="p-3 text-cyan-400">Authentication (AuthN)</th>
                    <th className="p-3 text-purple-400">Authorization (AuthZ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Core Question</td>
                    <td className="p-3 text-cyan-300 font-sans">&quot;Who are you?&quot;</td>
                    <td className="p-3 text-purple-300 font-sans">&quot;What are you permitted to do?&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Execution Order</td>
                    <td className="p-3 text-zinc-300 font-sans">Step 1 (First gate)</td>
                    <td className="p-3 text-zinc-300 font-sans">Step 2 (Always follows AuthN)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Mechanisms</td>
                    <td className="p-3 text-zinc-300 font-sans">Passwords, OTP, Biometrics, 2FA</td>
                    <td className="p-3 text-zinc-300 font-sans">Roles, ACLs, SQL GRANT/REVOKE, RBAC</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Example</td>
                    <td className="p-3 text-zinc-300 font-sans">Logging in with student ID &amp; password</td>
                    <td className="p-3 text-zinc-300 font-sans">Granting permission to view or update marks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs font-sans text-indigo-200">
              <span className="font-bold font-mono">Exam Mnemonic: </span>
              <strong>Authentication</strong> = Identity Verification. <strong>Authorization</strong> = Permission Verification.
            </div>
          </div>

          {/* Interactive 2-Step Gatekeeper Simulator */}
          <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Interactive Simulator
                </span>
                <h3 className="text-sm font-bold text-white">2-Factor Authentication &amp; Authorization Gate</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Live Auth Flow
              </span>
            </div>

            {/* Stage Progress Tracker */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className={`p-2 rounded-lg border ${
                authStage === 'login' ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-zinc-400'
              }`}>
                1. Password
              </div>
              <div className={`p-2 rounded-lg border ${
                authStage === 'otp' ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-zinc-400'
              }`}>
                2. 2FA (OTP)
              </div>
              <div className={`p-2 rounded-lg border ${
                authStage === 'authorized' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-zinc-400'
              }`}>
                3. Authorized
              </div>
            </div>

            {/* Stage 1: Password Auth */}
            {authStage === 'login' && (
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <label className="text-zinc-400 block mb-1">Username:</label>
                  <input
                    type="text"
                    value={authUsername}
                    onChange={e => setAuthUsername(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Password:</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="enable2fa"
                    checked={auth2faEnabled}
                    onChange={e => setAuth2faEnabled(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-800"
                  />
                  <label htmlFor="enable2fa" className="text-zinc-300 text-[11px] font-sans">
                    Enable Two-Factor Authentication (2FA SMS / App Token)
                  </label>
                </div>
                <button
                  onClick={() => {
                    if (auth2faEnabled) {
                      setAuthStage('otp');
                      setAuthLog('Password valid. 2FA triggered: One-Time Password sent to registered mobile device.');
                    } else {
                      setAuthStage('authorized');
                      setAuthLog('Authenticated directly without 2FA. Authorization profile loaded.');
                    }
                  }}
                  className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer transition-colors"
                >
                  Verify Credentials (Authenticate)
                </button>
              </div>
            )}

            {/* Stage 2: 2FA OTP */}
            {authStage === 'otp' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 text-blue-200 text-[11px] font-sans">
                  <Smartphone className="w-4 h-4 inline mr-1 text-cyan-400" />
                  A 6-digit verification code has been dispatched to your phone (Demo Code: <strong>849201</strong>).
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Enter 6-Digit OTP:</label>
                  <input
                    type="text"
                    value={authOtpInput}
                    onChange={e => setAuthOtpInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white tracking-widest text-center font-bold"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAuthStage('login')}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (authOtpInput.trim() === '849201') {
                        setAuthStage('authorized');
                        setAuthLog('2FA verified successfully! Identity authenticated as Rahim. Loading Role Permissions...');
                      } else {
                        setAuthLog('Invalid OTP code. Authentication rejected.');
                      }
                    }}
                    className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer transition-colors"
                  >
                    Confirm OTP
                  </button>
                </div>
              </div>
            )}

            {/* Stage 3: Authorized Dashboard */}
            {authStage === 'authorized' && (
              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[11px] font-sans">
                  <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-400" />
                  <strong>User Authenticated:</strong> Rahim (Role: Student). Token Issued.
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="text-zinc-400">Current Authorization Scope:</div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800 space-y-1 text-zinc-300">
                    <div>&bull; <code>SELECT ON Results WHERE student_id = 101</code> &rarr; <span className="text-emerald-400 font-bold">GRANTED</span></div>
                    <div>&bull; <code>UPDATE ON Results</code> &rarr; <span className="text-rose-400 font-bold">DENIED (Requires Teacher Role)</span></div>
                    <div>&bull; <code>DELETE ON Students</code> &rarr; <span className="text-rose-400 font-bold">DENIED (Requires DBA Role)</span></div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAuthStage('login');
                    setAuthLog('Session logged out.');
                  }}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 font-mono text-xs cursor-pointer"
                >
                  Log Out &amp; Reset Gate
                </button>
              </div>
            )}

            {/* Live Log */}
            <div className="p-2.5 rounded bg-black/60 border border-slate-800 text-[10px] font-mono text-zinc-400">
              <span className="text-cyan-400 font-bold">Auth Engine Log: </span>{authLog}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6 & 7: ACCESS CONTROL MODELS (DAC, MAC, RBAC)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
                Part 6 &amp; 7 of 17 • Security Architecture
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Access Control Models: DAC vs. MAC vs. RBAC</h2>
            </div>
          </div>

          {/* Model Switcher */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {(['DAC', 'MAC', 'RBAC'] as const).map(model => (
              <button
                key={model}
                onClick={() => setAccessModel(model)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  accessModel === model
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Model Breakdown */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {accessModel === 'DAC' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-cyan-400 font-mono">Discretionary Access Control (DAC)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Owner-Centric</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                In <strong>Discretionary Access Control</strong>, the <strong>creator/owner of an object</strong> (table, view, or file) possesses complete discretion over who can access it. The owner can grant or revoke privileges to other users at will using standard SQL <code>GRANT</code> / <code>REVOKE</code>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">How Access is Granted:</div>
                  <div className="text-zinc-300 font-sans">Object owner directly grants privileges to individual users.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Key Advantage:</div>
                  <div className="text-zinc-300 font-sans">Extreme flexibility; simple for small teams and peer databases.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-rose-400 font-bold mb-1">Key Weakness:</div>
                  <div className="text-zinc-300 font-sans">Vulnerable to Trojan horses; owners can carelessly re-grant access.</div>
                </div>
              </div>
            </div>
          )}

          {accessModel === 'MAC' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-amber-400 font-mono">Mandatory Access Control (MAC)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Policy-Centric</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                In <strong>Mandatory Access Control</strong>, access decisions are strictly governed by a <strong>central authority and security labels</strong> (e.g., military or defense databases). Users cannot override or re-share permissions. A user can read data only if their security clearance meets or exceeds the object&apos;s classification level.
              </p>

              {/* Interactive MAC Clearance Selector */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3 text-xs font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-zinc-400">Select User Security Clearance:</span>
                  <div className="flex gap-1.5">
                    {(['Public', 'Confidential', 'Secret', 'Top Secret'] as const).map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setMacClearance(lvl)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                          macClearance === lvl ? 'bg-amber-600 text-white' : 'bg-slate-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[11px]">
                  {[
                    { label: 'Public Records', req: 'Public' },
                    { label: 'Student Transcripts', req: 'Confidential' },
                    { label: 'Professor Salaries', req: 'Secret' },
                    { label: 'Board Defense Research', req: 'Top Secret' }
                  ].map((doc, idx) => {
                    const hierarchy = ['Public', 'Confidential', 'Secret', 'Top Secret'];
                    const canAccess = hierarchy.indexOf(macClearance) >= hierarchy.indexOf(doc.req);
                    return (
                      <div key={idx} className={`p-2.5 rounded-lg border ${
                        canAccess ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300 opacity-60'
                      }`}>
                        <div className="font-bold">{doc.label}</div>
                        <div className="text-[10px] text-zinc-400 mt-1">Req: {doc.req}</div>
                        <div className="text-[10px] font-bold mt-1">
                          {canAccess ? '✓ GRANTED' : '✕ DENIED'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {accessModel === 'RBAC' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-emerald-400 font-mono">Role-Based Access Control (RBAC)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Enterprise Standard</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                In <strong>Role-Based Access Control</strong>, permissions are not assigned directly to individual users. Instead, permissions are assigned to <strong>Roles</strong> (e.g., <code>Student</code>, <code>Teacher</code>, <code>DBA</code>), and users are assigned to roles. This scales seamlessly to thousands of users without administrative chaos.
              </p>

              {/* RBAC Structural Pipeline Visualizer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> 1. Individual Users
                  </div>
                  <div className="space-y-1 text-[11px] text-zinc-300">
                    <div className="p-1 rounded bg-black/40">&bull; User Rahim</div>
                    <div className="p-1 rounded bg-black/40">&bull; User Karim</div>
                    <div className="p-1 rounded bg-black/40">&bull; User Dr. Kamal</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> 2. Abstract Roles
                  </div>
                  <div className="space-y-1 text-[11px] text-zinc-300">
                    <div className="p-1 rounded bg-black/40">&rarr; Role: <code>student_role</code></div>
                    <div className="p-1 rounded bg-black/40">&rarr; Role: <code>teacher_role</code></div>
                    <div className="p-1 rounded bg-black/40">&rarr; Role: <code>admin_role</code></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-purple-400 font-bold flex items-center gap-1.5">
                    <Key className="w-4 h-4" /> 3. Table Permissions
                  </div>
                  <div className="space-y-1 text-[11px] text-zinc-300">
                    <div className="p-1 rounded bg-black/40">&bull; <code>SELECT ON Results</code></div>
                    <div className="p-1 rounded bg-black/40">&bull; <code>UPDATE ON Marks</code></div>
                    <div className="p-1 rounded bg-black/40">&bull; <code>ALL PRIVILEGES</code></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Model Comparison Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">Model Comparison Summary</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Model</th>
                    <th className="p-3">Decision Maker</th>
                    <th className="p-3">Best Use Case</th>
                    <th className="p-3">Exam Tip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">DAC</td>
                    <td className="p-3 text-zinc-300 font-sans">Object Owner</td>
                    <td className="p-3 text-zinc-400 font-sans">File sharing, individual developer databases</td>
                    <td className="p-3 text-zinc-400 font-sans">Controlled discretionarily by creator</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">MAC</td>
                    <td className="p-3 text-zinc-300 font-sans">Central Security Policy</td>
                    <td className="p-3 text-zinc-400 font-sans">Military, government, intelligence defense systems</td>
                    <td className="p-3 text-zinc-400 font-sans">Strict security classifications (Top Secret, etc.)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-400">RBAC</td>
                    <td className="p-3 text-zinc-300 font-sans">Assigned Roles</td>
                    <td className="p-3 text-zinc-400 font-sans">Universities, banking, enterprises, SaaS applications</td>
                    <td className="p-3 text-zinc-400 font-sans">Most widely used in enterprise DBMS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8: SQL AUTHORIZATION: GRANT AND REVOKE PLAYGROUND
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 8 of 17 • Hands-On SQL
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Authorization: GRANT and REVOKE</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          In SQL, database privileges are assigned and withdrawn using two core Data Control Language (DCL) commands: <strong><code>GRANT</code></strong> (gives privileges to a user or role) and <strong><code>REVOKE</code></strong> (removes previously granted privileges).
        </p>

        {/* Interactive SQL Terminal & Live Privilege Table */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Interactive Console
              </span>
              <h3 className="text-sm font-bold text-white">Live Privilege Inspector &amp; DCL Terminal</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Virtual Catalog Updated
            </span>
          </div>

          {/* Quick Command Pills */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-zinc-400">Click to run sample university SQL DCL queries:</div>
            <div className="flex flex-wrap gap-2">
              {[
                'GRANT SELECT ON Students TO Rahim;',
                'GRANT UPDATE ON Students TO Rahim;',
                'GRANT SELECT, INSERT ON Students TO Rahim;',
                'REVOKE UPDATE ON Students FROM Rahim;',
                'GRANT SELECT, INSERT ON Students TO Karim;',
                'REVOKE INSERT ON Students FROM Karim;',
                'GRANT ALL ON Students TO Admin_Super;'
              ].map((sql, idx) => (
                <button
                  key={idx}
                  onClick={() => executeSqlCommand(sql)}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[11px] font-mono transition-all cursor-pointer"
                >
                  {sql}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Input Bar */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-black/60 rounded-xl border border-slate-800 px-3 py-2 font-mono text-xs">
              <span className="text-emerald-400 mr-2 font-bold">SQL&gt;</span>
              <input
                type="text"
                value={sqlConsoleCommand}
                onChange={e => setSqlConsoleCommand(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') executeSqlCommand(sqlConsoleCommand);
                }}
                className="flex-1 bg-transparent border-none text-white focus:outline-none"
                placeholder="GRANT SELECT ON Students TO Rahim;"
              />
            </div>
            <button
              onClick={() => executeSqlCommand(sqlConsoleCommand)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold cursor-pointer transition-colors"
            >
              Execute
            </button>
          </div>

          {/* Feedback Output */}
          <div className="p-2.5 rounded bg-black/40 border border-slate-800 font-mono text-xs text-zinc-300">
            {sqlConsoleFeedback}
          </div>

          {/* Live Virtual Privilege Grid */}
          <div className="pt-2">
            <div className="text-xs font-bold text-white font-mono uppercase mb-2 flex items-center justify-between">
              <span>Database System Privilege Table (information_schema.table_privileges)</span>
              <span className="text-[10px] text-zinc-400 font-sans font-normal">Updates dynamically upon execution</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">User Grantee</th>
                    <th className="p-3">Target Table</th>
                    <th className="p-3 text-center">SELECT</th>
                    <th className="p-3 text-center">INSERT</th>
                    <th className="p-3 text-center">UPDATE</th>
                    <th className="p-3 text-center">DELETE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                  {privileges.map((p, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-bold text-cyan-300">{p.user}</td>
                      <td className="p-3 text-zinc-400">{p.table}</td>
                      <td className="p-3 text-center">
                        {p.select ? <span className="text-emerald-400 font-bold">&check;</span> : <span className="text-rose-500">&cross;</span>}
                      </td>
                      <td className="p-3 text-center">
                        {p.insert ? <span className="text-emerald-400 font-bold">&check;</span> : <span className="text-rose-500">&cross;</span>}
                      </td>
                      <td className="p-3 text-center">
                        {p.update ? <span className="text-emerald-400 font-bold">&check;</span> : <span className="text-rose-500">&cross;</span>}
                      </td>
                      <td className="p-3 text-center">
                        {p.delete ? <span className="text-emerald-400 font-bold">&check;</span> : <span className="text-rose-500">&cross;</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9: PRINCIPLE OF LEAST PRIVILEGE (POLP)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 9 of 17 • Best Practice
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The Principle of Least Privilege (PoLP)</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          The <strong>Principle of Least Privilege (PoLP)</strong> dictates that any user, program, or process must be granted <strong>only the minimum privileges strictly necessary</strong> to perform its authorized function. Unnecessary privileges exponentially expand the <strong>attack blast radius</strong> if credentials are breached.
        </p>

        {/* Blast Radius Interactive Simulator */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Attack Blast Radius Simulator
              </span>
              <h3 className="text-sm font-bold text-white">Accountant Account Credential Compromise Scenario</h3>
            </div>

            <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
              <button
                onClick={() => {
                  setPolpStrategy('least_privilege');
                  setBlastAttemptResult(null);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  polpStrategy === 'least_privilege' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ✓ Least Privilege (Secure)
              </button>
              <button
                onClick={() => {
                  setPolpStrategy('over_privileged');
                  setBlastAttemptResult(null);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  polpStrategy === 'over_privileged' ? 'bg-rose-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ✕ Over-Privileged (Insecure)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <div className="text-zinc-400 font-bold">Assigned Privileges:</div>
              {polpStrategy === 'least_privilege' ? (
                <div className="text-emerald-300 font-mono space-y-1">
                  <div>&bull; <code>GRANT SELECT, UPDATE ON TuitionFees TO Accountant;</code></div>
                  <div className="text-zinc-500 text-[11px]">(No permissions granted on Students or Marks tables)</div>
                </div>
              ) : (
                <div className="text-rose-300 font-mono space-y-1">
                  <div>&bull; <code>GRANT ALL PRIVILEGES ON *.* TO Accountant;</code></div>
                  <div className="text-rose-400/80 text-[11px]">(Over-privileged DBA wildcard grant)</div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <div className="text-zinc-400 font-bold">Simulate Hacker Action:</div>
              <button
                onClick={() => {
                  if (polpStrategy === 'least_privilege') {
                    setBlastAttemptResult(
                      'ATTACK CONTAINED! Hacker attempted: DROP TABLE Students; -> Database returned: ERROR 1142 (42000): DROP command denied to user \'Accountant\'@\'localhost\'. Blast radius strictly isolated to tuition records!'
                    );
                  } else {
                    setBlastAttemptResult(
                      'CATASTROPHIC BREACH! Hacker executed: DROP TABLE Students; -> Query OK, 50,000 student records wiped out permanently because the accountant held unnecessary administrative wildcard privileges!'
                    );
                  }
                }}
                className="w-full py-2 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 text-xs font-bold cursor-pointer transition-colors"
              >
                Attacker attempts: DROP TABLE Students;
              </button>
            </div>
          </div>

          {blastAttemptResult && (
            <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${
              polpStrategy === 'least_privilege'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              {blastAttemptResult}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 10: SQL INJECTION (SQLi) & PREPARED STATEMENTS LAB
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 10 of 17 • Threat &amp; Defense Lab
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Injection (SQLi) &amp; Prepared Statements</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          <strong>SQL Injection (SQLi)</strong> is one of the most devastating web vulnerabilities. It occurs when untrusted user input is directly concatenated into a dynamic SQL query string, allowing an attacker to manipulate the query&apos;s Abstract Syntax Tree (AST) and execute arbitrary database commands.
        </p>

        {/* Interactive Exploit vs Defense Simulator */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Interactive Security Lab
              </span>
              <h3 className="text-sm font-bold text-white">Vulnerable Query vs. Prepared Statement Simulator</h3>
            </div>

            <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
              <button
                onClick={() => {
                  setSqliMode('vulnerable');
                  setSqliExecutionResult(null);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  sqliMode === 'vulnerable' ? 'bg-rose-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ⚡ Vulnerable Dynamic SQL
              </button>
              <button
                onClick={() => {
                  setSqliMode('prepared');
                  setSqliExecutionResult(null);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  sqliMode === 'prepared' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ✓ Secure Prepared Statement
              </button>
            </div>
          </div>

          {/* Preset Exploit Pills */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-zinc-400">Click a common injection payload:</span>
            <div className="flex flex-wrap gap-2">
              {[
                "' OR '1'='1' --",
                "admin' --",
                "' OR 1=1 #",
                "' UNION SELECT id, username, password FROM Admins --"
              ].map((payload, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSqliPassword(payload);
                    setSqliExecutionResult(null);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800 text-xs font-mono cursor-pointer"
                >
                  {payload}
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="text-zinc-400 block mb-1">Username Input:</label>
              <input
                type="text"
                value={sqliUsername}
                onChange={e => setSqliUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Password Input:</label>
              <input
                type="text"
                value={sqliPassword}
                onChange={e => setSqliPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-rose-300 font-bold"
              />
            </div>
          </div>

          {/* Run Action */}
          <button
            onClick={runSqliSimulation}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow-lg shadow-rose-600/20"
          >
            Execute Query on Database Engine
          </button>

          {/* Execution Result Log */}
          {sqliExecutionResult && (
            <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed space-y-2 ${
              sqliExecutionResult.success
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
            }`}>
              <div className="text-[10px] uppercase font-bold text-zinc-400">Database Engine Query Executed:</div>
              <pre className="p-2.5 rounded bg-black/60 border border-slate-800 text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                {sqliExecutionResult.executedSql}
              </pre>
              <p className="font-sans text-[11px]">{sqliExecutionResult.explanation}</p>
            </div>
          )}

          {/* 6 Core Defense Mechanisms */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">How Prepared Statements Protect Databases</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                { title: '1. Query Pre-Compilation', desc: 'The database parses and compiles the SQL syntax template BEFORE receiving user values.' },
                { title: '2. Strict Data-Only Binding', desc: 'Parameters passed via placeholders (?) are treated purely as string literals, never executable SQL tokens.' },
                { title: '3. Strong Type Validation', desc: 'Database drivers enforce data type constraints (integers cannot pass arbitrary string syntax).' },
                { title: '4. Input Sanitization', desc: 'Whitelist validation ensures only alphanumeric characters enter non-parameterized fields.' },
                { title: '5. Least Privilege Execution', desc: 'Web applications connect with read/write privileges only, never DROP or ALTER permissions.' },
                { title: '6. Web Application Firewalls (WAF)', desc: 'Inspects HTTP payloads to block malicious signatures before queries reach the database.' }
              ].map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-300 font-mono text-[11px]">{m.title}</div>
                  <div className="text-[10px] text-zinc-400 font-sans">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 11: DATABASE ENCRYPTION (AT REST VS. IN TRANSIT)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 11 of 17 • Cryptography
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Encryption: At Rest vs. In Transit</h2>
          </div>
        </div>

        {/* Encryption Mode Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'rest', label: '1. Encryption at Rest (TDE)', icon: HardDrive },
            { id: 'transit', label: '2. Encryption in Transit (TLS)', icon: Network },
            { id: 'hashing', label: '3. Salted Password Hashing', icon: Key }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setEncryptionView(tab.id as typeof encryptionView)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                encryptionView === tab.id
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-900 text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {encryptionView === 'rest' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">Transparent Data Encryption (TDE) &amp; Storage Disk Protection</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono">Disk Level</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                <strong>Encryption at Rest</strong> protects data written to physical storage media (SSD, HDD, database backup files, and WAL logs). If an unauthorized actor physically steals the hard drive or copies raw <code>.ibd</code> / <code>.mdf</code> files, the contents appear as unreadable ciphertext without the encryption master key.
              </p>
              <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-zinc-400">Plaintext Data: <span className="text-emerald-400">&quot;GPA: 3.95, Student: Rahim&quot;</span></div>
                <div className="text-zinc-400">AES-256 Encrypted on Disk: <span className="text-purple-300 font-mono">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></div>
              </div>
            </div>
          )}

          {encryptionView === 'transit' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">Transport Layer Security (TLS 1.3 / HTTPS)</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono">Network Wire</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                <strong>Encryption in Transit</strong> protects network packets moving between the client application, web server, and database cluster. Prevents packet sniffing, man-in-the-middle (MITM) attacks, and Wi-Fi eavesdropping.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded bg-rose-950/20 border border-rose-500/30 text-rose-300">
                  <div className="font-bold mb-1">Unencrypted (HTTP / Port 80):</div>
                  <div className="text-[11px] font-sans">Sniffed Packet: <code>SELECT password FROM Users WHERE id = 101;</code> (Cleartext visible to network eavesdroppers)</div>
                </div>
                <div className="p-3 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                  <div className="font-bold mb-1">Encrypted (HTTPS / Port 443 / TLS):</div>
                  <div className="text-[11px] font-sans">Sniffed Packet: <code>7f 83 2a b9 10 9c ee fa ...</code> (Pure cryptographic noise to eavesdroppers)</div>
                </div>
              </div>
            </div>
          )}

          {encryptionView === 'hashing' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">Salted Cryptographic Password Hashing (bcrypt / Argon2)</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono">Irreversible</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                <strong>Crucial Security Rule:</strong> Passwords must NEVER be stored using reversible encryption. If the decryption key is compromised, every user password is exposed. Passwords must be hashed using a one-way salted hashing algorithm with adaptive computational cost (e.g. bcrypt, Argon2id, PBKDF2).
              </p>
              <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-zinc-400">Plain Password: <code className="text-white">mypassword123</code></div>
                <div className="text-zinc-400">Generated Salt: <code className="text-cyan-300">$2b$12$e8J4xK.8L0Qz1P7mN9Y2Ou</code></div>
                <div className="text-zinc-400">Database Stored Hash: <code className="text-amber-300">$2b$12$e8J4xK.8L0Qz1P7mN9Y2Ou7hK2Q1aW8zM9VpL2sK3jH4gF5dE6aC7</code></div>
                <div className="text-emerald-400 text-[10px] pt-1 font-sans">&check; Mathematically impossible to reverse hash back into plaintext password!</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 12: DATABASE AUDITING & FORENSIC ACTIVITY TRAIL
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 12 of 17 • Compliance &amp; Forensics
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Database Auditing &amp; Activity Monitoring</h2>
            </div>
          </div>

          {/* Audit Filter Pills */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'all', label: 'All Events (5)' },
              { id: 'suspicious', label: 'Suspicious / Blocked (2)' },
              { id: 'updates', label: 'Updates / Grants (3)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setAuditFilter(f.id as typeof auditFilter)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  auditFilter === f.id ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          <strong>Database Auditing</strong> creates an immutable chronological record of database transactions. It answers: <em>Who accessed the database? When? From what IP? Which records were modified? Were any unauthorized operations attempted?</em>
        </p>

        {/* Live Forensic Audit Trail Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Client IP</th>
                <th className="p-3">Action / SQL Statement</th>
                <th className="p-3">Status</th>
                <th className="p-3">Security Alert Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
              {[
                { time: '2026-11-17 14:12:05', user: 'teacher_kamal', ip: '192.168.1.45', sql: 'UPDATE Results SET marks = 88 WHERE student_id = 101', status: 'SUCCESS', alert: 'Normal', type: 'updates' },
                { time: '2026-11-17 14:15:30', user: 'student_rahim', ip: '10.0.4.12', sql: 'UPDATE Results SET marks = 95 WHERE student_id = 101', status: 'DENIED (403)', alert: 'HIGH ALERT (Tampering Attempt)', type: 'suspicious' },
                { time: '2026-11-17 14:18:22', user: 'unknown_guest', ip: '185.220.101.5', sql: "SELECT * FROM Users WHERE pass = '' OR '1'='1'", status: 'BLOCKED (WAF)', alert: 'CRITICAL (SQL Injection)', type: 'suspicious' },
                { time: '2026-11-17 14:20:10', user: 'admin_super', ip: '192.168.1.1', sql: 'GRANT SELECT ON Students TO Karim', status: 'SUCCESS', alert: 'Admin Action', type: 'updates' },
                { time: '2026-11-17 14:22:45', user: 'accountant_selim', ip: '192.168.1.20', sql: 'UPDATE TuitionFees SET status = \'PAID\' WHERE invoice_id = 502', status: 'SUCCESS', alert: 'Normal', type: 'updates' }
              ]
                .filter(row => auditFilter === 'all' || row.type === auditFilter)
                .map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 text-zinc-400">{row.time}</td>
                    <td className="p-3 font-bold text-white">{row.user}</td>
                    <td className="p-3 text-cyan-300">{row.ip}</td>
                    <td className="p-3 font-mono text-[11px] text-zinc-300">{row.sql}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.status.includes('DENIED') || row.status.includes('BLOCKED')
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[11px] font-bold ${
                        row.alert.includes('CRITICAL') || row.alert.includes('HIGH')
                          ? 'text-rose-400 font-mono'
                          : row.alert.includes('Admin')
                          ? 'text-amber-400'
                          : 'text-zinc-400'
                      }`}>
                        {row.alert}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 13: DATABASE BACKUP AND RECOVERY STRATEGIES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 13 of 17 • Reliability &amp; Disaster Recovery
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Backup and Recovery Strategies</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Database security encompasses not only intrusion defense, but also resilience against <strong>hardware crashes, ransomware encryption, human error, and natural catastrophes</strong>.
        </p>

        {/* 3 Core Backup Archetypes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Full Backup',
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              bg: 'bg-cyan-950/20',
              desc: 'Makes a complete, byte-for-byte duplicate of the entire database, all tables, schemas, and indexes.',
              pros: 'Fastest and simplest recovery (only 1 file needed).',
              cons: 'Very slow to create; consumes massive storage space.'
            },
            {
              title: 'Incremental Backup',
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              bg: 'bg-emerald-950/20',
              desc: 'Copies ONLY data that changed since the previous backup (whether full or incremental).',
              pros: 'Fastest backup execution; minimal storage consumed.',
              cons: 'Slowest recovery: requires Full Backup + ALL sequential incrementals in order!'
            },
            {
              title: 'Differential Backup',
              color: 'text-amber-400',
              border: 'border-amber-500/30',
              bg: 'bg-amber-950/20',
              desc: 'Copies ALL data that changed since the LAST FULL BACKUP.',
              pros: 'Fast recovery: requires only Full Backup + LATEST differential.',
              cons: 'Backup size grows each day until the next full backup runs.'
            }
          ].map((b, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${b.border} ${b.bg} space-y-2`}>
              <div className={`text-sm font-bold font-mono ${b.color}`}>{b.title}</div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">{b.desc}</p>
              <div className="text-[11px] font-sans pt-1 space-y-0.5">
                <div className="text-emerald-300"><span className="font-bold font-mono">Pro: </span>{b.pros}</div>
                <div className="text-rose-300"><span className="font-bold font-mono">Con: </span>{b.cons}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Disaster Recovery Metrics (RPO vs RTO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold">RPO (Recovery Point Objective)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Data Loss Tolerance</span>
            </div>
            <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              The maximum acceptable age of files that must be recovered from backup storage for normal operations to resume (i.e. <em>how many minutes or hours of data can your organization afford to lose?</em>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-bold">RTO (Recovery Time Objective)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Downtime Tolerance</span>
            </div>
            <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              The maximum acceptable duration of time that a database or application can remain offline after a disaster before severe financial harm occurs (i.e. <em>how fast can you restore service?</em>).
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 14: MASTER SUMMARY TABLE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 14 of 17 • Master Review
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Master Summary of Database Security Concepts</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
              <tr>
                <th className="p-3">Security Concept</th>
                <th className="p-3">Core Definition &amp; Architectural Function</th>
                <th className="p-3">Primary Exam Takeaway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
              {[
                { concept: 'Database Security', def: 'Techniques and policies protecting database against unauthorized access and corruption', note: 'Enforces authorized-only operations' },
                { concept: 'Authentication (AuthN)', def: 'Verifying user identity before permitting system entry', note: 'Answers: "Who are you?"' },
                { concept: 'Authorization (AuthZ)', def: 'Determining which resources and tables an authenticated entity may access', note: 'Answers: "What can you do?"' },
                { concept: 'CIA Triad', def: 'Confidentiality (viewing), Integrity (tampering), Availability (uptime)', note: 'Cornerstone security framework' },
                { concept: 'Access Control', def: 'Managing granular operations (SELECT, INSERT, UPDATE, DELETE)', note: 'Governed by DAC, MAC, or RBAC' },
                { concept: 'DAC', def: 'Discretionary model where the object creator controls permission grants', note: 'Owner-controlled access' },
                { concept: 'MAC', def: 'Mandatory model where central security labels dictate access clearances', note: 'Strict policy / military classifications' },
                { concept: 'RBAC', def: 'Role-Based model where permissions belong to roles, and users belong to roles', note: 'Industry standard for scalability' },
                { concept: 'GRANT', def: 'SQL command conferring privileges on database tables to users or roles', note: 'Syntax: GRANT priv ON table TO user' },
                { concept: 'REVOKE', def: 'SQL command withdrawing previously conferred database privileges', note: 'Syntax: REVOKE priv ON table FROM user' },
                { concept: 'Least Privilege (PoLP)', def: 'Granting strictly the minimal privileges required to perform a function', note: 'Minimizes attack blast radius' },
                { concept: 'SQL Injection (SQLi)', def: 'Malicious manipulation of dynamic SQL syntax through untrusted inputs', note: 'Prevented via Prepared Statements' },
                { concept: 'Encryption at Rest/Transit', def: 'Ciphertext conversion protecting disk storage (TDE) and network packets (TLS)', note: 'Passkeys never stored reversible' },
                { concept: 'Auditing', def: 'Logging chronological database operations for forensics and compliance', note: 'Maintains non-repudiation' },
                { concept: 'Backup & Recovery', def: 'Creating redundant copies (Full/Inc/Diff) and restoring consistent states', note: 'Protects against hardware/disaster loss' }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-bold text-cyan-300">{row.concept}</td>
                  <td className="p-3 text-zinc-300 font-sans">{row.def}</td>
                  <td className="p-3 text-emerald-400 font-mono text-[11px]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 15: UNIVERSITY EXAMINATION PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 15 of 17 • University Exam Prep
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Examination Questions &amp; Practical Exercises</h2>
          </div>
        </div>

        {/* Section A: Short Questions (2-3 Marks) */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider">
            Section A: Short Questions (2–3 Marks)
          </h3>
          <div className="space-y-2">
            {[
              {
                id: 'sq1',
                q: 'Q1: What is database security?',
                a: 'Database security refers to the collective policies, technical controls, and cryptographic mechanisms used to protect a database against unauthorized access, malicious tampering, accidental deletion, theft, and operational disruption.'
              },
              {
                id: 'sq2',
                q: 'Q2: Define authentication and authorization.',
                a: '• Authentication: The process of verifying a user\'s identity ("Who are you?") using passwords, OTPs, or biometrics.\n• Authorization: The process of verifying an authenticated user\'s permissions ("What can you do?") on specific database tables and operations.'
              },
              {
                id: 'sq3',
                q: 'Q3: What is the CIA Triad in DBMS?',
                a: 'The CIA Triad is the foundational security model consisting of:\n1. Confidentiality: Protecting data against unauthorized viewing.\n2. Integrity: Protecting data against unauthorized modification or tampering.\n3. Availability: Ensuring legitimate authorized users have uninterrupted access when needed.'
              },
              {
                id: 'sq4',
                q: 'Q4: What is SQL Injection and how is it prevented?',
                a: 'SQL Injection is an attack where malicious SQL code is inserted into input fields to manipulate backend database queries. It is prevented primarily through Prepared Statements / Parameterized Queries, input validation, and the Principle of Least Privilege.'
              },
              {
                id: 'sq5',
                q: 'Q5: What is the Principle of Least Privilege (PoLP)?',
                a: 'The Principle of Least Privilege requires granting users and applications only the minimum necessary privileges required to accomplish their assigned responsibilities, thereby isolating potential breach damage.'
              },
              {
                id: 'sq6',
                q: 'Q6: Differentiate between Encryption at Rest and Encryption in Transit.',
                a: '• Encryption at Rest: Protects stored data on physical disks and backup media using Transparent Data Encryption (TDE).\n• Encryption in Transit: Protects data traveling across network wires between client and database server using TLS/HTTPS protocols.'
              },
              {
                id: 'sq7',
                q: 'Q7: Explain the syntax of SQL GRANT and REVOKE commands.',
                a: '• GRANT: GRANT privilege_list ON object_name TO user_name [WITH GRANT OPTION];\n• REVOKE: REVOKE privilege_list ON object_name FROM user_name;'
              },
              {
                id: 'sq8',
                q: 'Q8: What is Role-Based Access Control (RBAC)?',
                a: 'RBAC assigns permissions to abstract functional roles (e.g., student, teacher, accountant), and assigns users to those roles, simplifying privilege administration in large organizations.'
              },
              {
                id: 'sq9',
                q: 'Q9: What is database auditing?',
                a: 'Database auditing is the continuous recording and analysis of database events (logins, queries executed, rows modified, failed attempts) to maintain accountability, ensure compliance, and detect security breaches.'
              },
              {
                id: 'sq10',
                q: 'Q10: Differentiate between Incremental and Differential database backups.',
                a: '• Incremental Backup: Copies only the data that has changed since the previous backup of any kind (smallest size, slowest restore).\n• Differential Backup: Copies all data that has changed since the last FULL backup (larger size, faster restore).'
              }
            ].map(item => (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-[#14182d] overflow-hidden">
                <button
                  onClick={() => toggleExamQ(item.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {openExamQ[item.id] ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>
                {openExamQ[item.id] && (
                  <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Broad Essay Questions (5-10 Marks) */}
        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-purple-400 font-mono uppercase tracking-wider">
            Section B: Broad Questions (5–10 Marks)
          </h3>
          <div className="space-y-2">
            {[
              {
                id: 'bq1',
                q: 'Q1: Explain the CIA Triad in detail with university database examples.',
                a: '1. Confidentiality: Restricts viewing to authorized personas (e.g. students view own transcript; financial payment logs restricted to accounts department via encryption and views).\n2. Integrity: Protects data accuracy; guarantees marks cannot be altered arbitrarily; enforced via referential constraints, database triggers, and 2-phase validation.\n3. Availability: Guarantees 24/7 uptime during peak registration periods; prevented via server replication, automated backup clusters, and DDoS traffic scrubbing.'
              },
              {
                id: 'bq2',
                q: 'Q2: Compare DAC, MAC, and RBAC access control architectures.',
                a: '• DAC (Discretionary): Object owner holds total discretion to grant/revoke rights. Highly flexible but vulnerable to cascading privilege creep.\n• MAC (Mandatory): Central policy assigns security labels (Top Secret, Secret, Confidential, Public). Users can read down and write up (Bell-LaPadula model). Zero user discretion.\n• RBAC (Role-Based): Decouples users from permissions. Permissions -> Roles -> Users. Scales cleanly for enterprises with thousands of personnel.'
              },
              {
                id: 'bq3',
                q: 'Q3: What is SQL Injection? Provide vulnerable query examples and demonstrate Prepared Statement defense.',
                a: '• Vulnerability: Occurs when user inputs are directly concatenated: \n  SELECT * FROM Users WHERE user = \'$u\' AND pass = \'$p\';\n  Attacker enters: \' OR \'1\'=\'1\' -- \n  Resulting query: SELECT * FROM Users WHERE user = \'admin\' AND pass = \'\' OR \'1\'=\'1\' --\';\n• Defense via Parameterization:\n  Query template: SELECT * FROM Users WHERE user = ? AND pass = ?;\n  The database pre-compiles the query AST. User input is treated strictly as data literals, rendering syntax breakout mathematically impossible.'
              }
            ].map(item => (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-[#14182d] overflow-hidden">
                <button
                  onClick={() => toggleExamQ(item.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {openExamQ[item.id] ? <ChevronUp className="w-4 h-4 text-purple-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>
                {openExamQ[item.id] && (
                  <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section C: Practical SQL Exercises */}
        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider">
            Section C: Practical SQL Exercises (University Model Answers)
          </h3>
          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-zinc-300 font-sans">
              Assume a university table called <code>Students</code>. Write the exact SQL statements for each requirement:
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-zinc-400">1. Give SELECT permission to user Karim:</span>
                <div className="text-emerald-400 font-bold mt-1">GRANT SELECT ON Students TO Karim;</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-zinc-400">2. Give INSERT permission to user Karim:</span>
                <div className="text-emerald-400 font-bold mt-1">GRANT INSERT ON Students TO Karim;</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-zinc-400">3. Give SELECT and UPDATE permissions to user Rahim:</span>
                <div className="text-emerald-400 font-bold mt-1">GRANT SELECT, UPDATE ON Students TO Rahim;</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-zinc-400">4. Remove UPDATE permission from user Rahim:</span>
                <div className="text-rose-400 font-bold mt-1">REVOKE UPDATE ON Students FROM Rahim;</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-zinc-400">5. Remove INSERT permission from user Karim:</span>
                <div className="text-rose-400 font-bold mt-1">REVOKE INSERT ON Students FROM Karim;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 16: INTERACTIVE MCQ ASSESSMENT (10 QUESTIONS · 10 MARKS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 16 of 17 • University Assessment
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Lesson 14 Knowledge Test (10 Questions · 10 Marks)</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              {Object.keys(selectedAnswers).length} / 10 answered
            </span>
            <button
              onClick={resetQuiz}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 10 Quiz Questions */}
        <div className="space-y-4">
          {MCQ_DATA.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correct;
            return (
              <div
                key={q.id}
                className={`p-4 md:p-5 rounded-xl border transition-all ${
                  quizSubmitted
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-[#14182d] border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white">{q.question}</h3>
                  </div>

                  {quizSubmitted && (
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isCorrect ? '✓ Correct (+1)' : '✕ Incorrect (0)'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {q.options.map(opt => {
                    const isSelected = userAnswer === opt.key;
                    const isOptionCorrect = opt.key === q.correct;
                    return (
                      <button
                        key={opt.key}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, opt.key)}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          quizSubmitted
                            ? isOptionCorrect
                              ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200 font-bold'
                              : isSelected
                              ? 'bg-rose-900/40 border-rose-500 text-rose-200'
                              : 'bg-slate-900/60 border-slate-800 text-zinc-400'
                            : isSelected
                            ? 'bg-cyan-600/30 border-cyan-500 text-white font-bold'
                            : 'bg-slate-900/60 border-slate-800 text-zinc-300 hover:border-slate-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'bg-cyan-500 text-black' : 'bg-black/40 text-zinc-400'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="font-sans text-xs">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-3 p-3 rounded-lg bg-black/40 border border-slate-800 text-xs text-zinc-300 font-sans leading-relaxed">
                    <span className="font-bold text-cyan-300 font-mono">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          {!quizSubmitted ? (
            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              Submit Quiz &amp; Calculate Score
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-base font-bold font-mono text-white">
                Score: <span className="text-emerald-400 text-xl font-black">{quizScore}</span> / 10
              </div>
              <span className="text-xs font-sans text-zinc-400">
                {quizScore >= 8 ? 'Outstanding performance! University level mastery.' : quizScore >= 6 ? 'Good job! Review incorrect questions above.' : 'Keep studying! Review the summary and lecture notes.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 17: REVISION CHECKLIST & NAVIGATION BRIDGE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 17 of 17 • Final Review
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 14 Final Revision Checklist (16 Topics)</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Security &amp; Authorization Mastery</span>
            <span className="text-emerald-400 font-bold">{checklistDoneCount} of {checklistTotal} topics ({checklistPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        {/* 16 Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            'What is database security & core objectives',
            '6 Reasons why database security is vital',
            'CIA Triad: Confidentiality, Integrity, Availability',
            'Authentication ("Who are you?") vs Authorization',
            'Two-Factor Authentication (2FA) mechanics',
            'Access control on SELECT, INSERT, UPDATE, DELETE',
            'Discretionary Access Control (DAC) owner model',
            'Mandatory Access Control (MAC) clearance labels',
            'Role-Based Access Control (RBAC) enterprise model',
            'SQL GRANT command syntax and examples',
            'SQL REVOKE command syntax and examples',
            'Principle of Least Privilege (PoLP) blast radius',
            'SQL Injection mechanics and exploitation',
            'Prepared Statements & parameter binding defense',
            'Encryption at Rest (TDE) vs In Transit (TLS)',
            'Database Auditing & Backup/Recovery strategies'
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggleChecklist(idx)}
              className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer flex items-start gap-2.5 ${
                checkedChecklist[idx]
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-[#14182d] border-slate-800 text-zinc-300 hover:border-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border flex-shrink-0 transition-colors ${
                checkedChecklist[idx] ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600 bg-slate-900'
              }`}>
                {checkedChecklist[idx] && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Next Module Bridge Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-cyan-500/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Roadmap Connection
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module Complete
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 14 Complete &rarr; Ready for Lesson 15 &amp; Architecture Roadmap?
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            You have now mastered all 14 core DBMS lessons from relational foundations, transactions, concurrency, and distributed systems to modern NoSQL and database security! Next up: Explore the Database &amp; Systems Architecture Roadmap and high-dimensional AI vector embeddings.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson13')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 13: NoSQL &amp; Modern DBs</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-roadmap')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Explore Database Architecture Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
