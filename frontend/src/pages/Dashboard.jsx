import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppData } from "../context/AppContext";
import { api } from "../config/axios-config";
import Loading from "../components/Loading";

const INITIAL_LOGS = [
  { id: 1, time: "13:04:11", type: "AUTH", msg: "Quantum handshake verified via Ed25519 signature", status: "OK" },
  { id: 2, time: "13:05:29", type: "SEC", msg: "Zero-trust firewall intercepted anomalous payload [198.51.100.42]", status: "BLOCKED" },
  { id: 3, time: "13:06:44", type: "REDIS", msg: "Session token cluster synchronized across 12 edge nodes", status: "SYNC" },
  { id: 4, time: "13:07:02", type: "CSRF", msg: "Double-submit cryptographic nonce rotated automatically", status: "OK" },
  { id: 5, time: "13:08:55", type: "OTP", msg: "6-digit temporal key dispatched & validated in 1.2s", status: "VERIFIED" },
];

const NODES = [
  { name: "US-EAST // HYPERION", load: 78, ping: "9ms", status: "OPTIMAL", color: "from-cyan-400 to-blue-600" },
  { name: "EU-CENTRAL // VALKYRIE", load: 64, ping: "14ms", status: "OPTIMAL", color: "from-fuchsia-500 to-purple-600" },
  { name: "AP-SOUTH // NEBULA", load: 91, ping: "6ms", status: "HIGH_FLUX", color: "from-amber-400 to-rose-600" },
  { name: "SA-EAST //ORTEX", load: 42, ping: "22ms", status: "OPTIMAL", color: "from-emerald-400 to-teal-600" },
];

const Dashboard = () => {
  const { user, isAuth, isLoading } = AppData();
  const navigate = useNavigate();

  const [overdrive, setOverdrive] = useState(false);
  const [shieldLevel, setShieldLevel] = useState(98.4);
  const [pulseBars, setPulseBars] = useState(() =>
    Array.from({ length: 28 }, () => Math.floor(Math.random() * 80) + 20)
  );
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [adminPingStatus, setAdminPingStatus] = useState("IDLE");
  const [activeProtocol, setActiveProtocol] = useState("AETHER-9");
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    if (!isLoading && (!isAuth || user?.role !== "admin")) {
      navigate("/");
    }
  }, [isLoading, isAuth, user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
      setPulseBars((prev) =>
        prev.map(() =>
          Math.floor(
            Math.random() * (overdrive ? 100 : 75) + (overdrive ? 25 : 15)
          )
        )
      );
      setShieldLevel((prev) => {
        const delta = (Math.random() - 0.48) * 0.3;
        return Number(Math.min(99.9, Math.max(94.0, prev + delta)).toFixed(2));
      });
    }, overdrive ? 450 : 1100);

    return () => clearInterval(timer);
  }, [overdrive]);

  if (isLoading) {
    return <Loading message="Initializing Neural Admin Core..." />;
  }

  const triggerAdminDiagnostic = async () => {
    setAdminPingStatus("PROBING...");
    try {
      const { data } = await api.post("/api/v1/admin");
      setAdminPingStatus("VERIFIED");
      toast.success(`Admin Core Verified: ${data.message}`);
      setLogs((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          type: "ROOT",
          msg: `Admin clearance confirmed for ${data.user?.email || user?.email}`,
          status: "AUTHORIZED",
        },
        ...prev.slice(0, 7),
      ]);
    } catch (error) {
      setAdminPingStatus("REJECTED");
      toast.error(
        error.response?.data?.message || "Diagnostic probe failed"
      );
      setLogs((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          type: "ALERT",
          msg: `Diagnostic probe rejected (${error.response?.status || "ERR"})`,
          status: "FAILED",
        },
        ...prev.slice(0, 7),
      ]);
    }
  };

  const injectQuantumEvent = () => {
    const events = [
      { type: "CRYPTO", msg: "Rotated 4096-bit lattice keys across all active vaults", status: "LOCKED" },
      { type: "PURGE", msg: "Evicted 1,420 stale Redis ghost tokens in 0.4ms", status: "CLEAN" },
      { type: "AI-GUARD", msg: "Neural anomaly filter neutralized brute-force swarm", status: "SHIELDED" },
      { type: "WARP", msg: "Sub-millisecond JWT validation cache warmed up", status: "BOOSTED" },
    ];
    const pick = events[Math.floor(Math.random() * events.length)];
    setLogs((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        ...pick,
      },
      ...prev.slice(0, 7),
    ]);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-[#030014] text-slate-100 selection:bg-fuchsia-500 selection:text-white transition-colors duration-700 ${
        overdrive ? "hue-rotate-15" : ""
      }`}
    >
      {/* Crazy Cyberpunk Grid & Floating Neon Orbs */}
      <div
        className="pointer-events-none fixed inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 70, 239, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none fixed -top-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-fuchsia-600/30 blur-[130px]" />
      <div className="pointer-events-none fixed top-1/3 -right-32 h-[28rem] w-[28rem] animate-pulse rounded-full bg-cyan-500/25 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-36 left-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-600/30 blur-[130px]" />

      {/* Top HUD Command Bar */}
      <header className="relative z-10 border-b border-cyan-500/20 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/50 bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-indigo-400 bg-clip-text text-lg font-black tracking-widest text-transparent sm:text-xl">
                  NEXUS // OVERLORD HUD
                </span>
                <span className="rounded-md border border-fuchsia-500/40 bg-fuchsia-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-fuchsia-300 shadow-[0_0_12px_rgba(217,70,239,0.3)]">
                  LVL-99 ADMIN
                </span>
              </div>
              <p className="font-mono text-xs text-slate-400">
                SYS_CLOCK: <span className="text-cyan-400">{clock}</span> // PROTOCOL:{" "}
                <span className="text-fuchsia-400">{activeProtocol}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setOverdrive((prev) => !prev)}
              className={`cursor-pointer rounded-xl border px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                overdrive
                  ? "animate-pulse border-rose-400 bg-rose-500/20 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.6)]"
                  : "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/20"
              }`}
            >
              {overdrive ? "⚡ OVERDRIVE: ENGAGED" : "⚡ ENGAGE OVERDRIVE"}
            </button>

            <Link
              to="/profile"
              className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 font-mono text-xs font-semibold text-indigo-300 transition hover:border-indigo-400 hover:bg-indigo-500/20"
            >
              ID_CARD
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 font-mono text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              &larr; EXIT_MATRIX
            </Link>
          </div>
        </div>
      </header>

      {/* Main Bento Grid */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Hero Telemetry Banner */}
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-fuchsia-500/30 bg-gradient-to-r from-slate-950/90 via-indigo-950/60 to-slate-950/90 p-6 shadow-[0_0_50px_-12px_rgba(217,70,239,0.35)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: "18s" }} />
          <div className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rounded-full border border-fuchsia-400/30 animate-spin" style={{ animationDuration: "10s", animationDirection: "reverse" }} />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                BIOMETRIC &amp; JWT CLEARANCE: SUPREME
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
                Welcome to the{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                  Quantum Command Core
                </span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                Commander <span className="font-bold text-cyan-300">{user?.name || "Root"}</span> (
                <span className="font-mono text-xs text-fuchsia-300">{user?.email}</span>) — you have
                unrestricted authority over cryptographic tokens, Redis neural caches, and zero-trust gateways.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={triggerAdminDiagnostic}
                className="cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-600 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] transition hover:scale-105 active:scale-95"
              >
                🛰️ Probe /api/v1/admin [{adminPingStatus}]
              </button>
              <button
                type="button"
                onClick={injectQuantumEvent}
                className="cursor-pointer rounded-2xl border border-fuchsia-500/40 bg-fuchsia-500/10 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-fuchsia-300 transition hover:bg-fuchsia-500/20 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)]"
              >
                + Inject Anomaly Pulse
              </button>
            </div>
          </div>
        </div>

        {/* 4 Crazy Holographic Stat Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-5 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                SHIELD INTEGRITY
              </span>
              <span className="rounded bg-cyan-500/15 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                LIVE
              </span>
            </div>
            <p className="mt-3 font-mono text-3xl font-black text-white">
              {shieldLevel}%
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{ width: `${shieldLevel}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-[11px] text-slate-400">
              CSRF + HTTPOnly Dual Armor
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-slate-900/60 p-5 backdrop-blur-md transition hover:-translate-y-1 hover:border-fuchsia-400 hover:shadow-[0_0_30px_rgba(217,70,239,0.25)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-fuchsia-400">
                ENTROPY FLUX
              </span>
              <span className="rounded bg-fuchsia-500/15 px-2 py-0.5 font-mono text-[10px] text-fuchsia-300">
                4096-BIT
              </span>
            </div>
            <p className="mt-3 font-mono text-3xl font-black text-white">
              {overdrive ? "9.84 THz" : "4.21 THz"}
            </p>
            <p className="mt-4 font-mono text-[11px] text-emerald-400">
              ▲ +18.4% cryptographic throughput
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-900/60 p-5 backdrop-blur-md transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                REDIS TELEMETRY
              </span>
              <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                IN-MEMORY
              </span>
            </div>
            <p className="mt-3 font-mono text-3xl font-black text-white">
              0.38 ms
            </p>
            <p className="mt-4 font-mono text-[11px] text-slate-400">
              OTP &amp; Rate-Limit Cache Latency
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-5 backdrop-blur-md transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                THREATS VAPORIZED
              </span>
              <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                ZERO-TRUST
              </span>
            </div>
            <p className="mt-3 font-mono text-3xl font-black text-white">
              14,902
            </p>
            <p className="mt-4 font-mono text-[11px] text-emerald-300">
              100% Sanitized via Mongo-Shield
            </p>
          </div>
        </div>

        {/* Centerpiece: Reactor Core + Live Waveform + Protocol Switcher */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Animated Cyber Reactor Core */}
          <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl lg:col-span-5">
            <div className="w-full flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                // QUANTUM AUTH REACTOR
              </span>
              <span className="font-mono text-xs text-fuchsia-400">
                {overdrive ? "CRITICAL_OVERCLOCK" : "STABLE_HARMONY"}
              </span>
            </div>

            {/* Concentric Animated Rings */}
            <div className="relative my-8 flex h-60 w-60 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/40 animate-spin"
                style={{ animationDuration: overdrive ? "4s" : "14s" }}
              />
              <div
                className="absolute inset-4 rounded-full border-2 border-fuchsia-500/40 animate-spin"
                style={{
                  animationDuration: overdrive ? "3s" : "9s",
                  animationDirection: "reverse",
                }}
              />
              <div
                className="absolute inset-9 rounded-full border border-dashed border-indigo-400/50 animate-spin"
                style={{ animationDuration: overdrive ? "2s" : "6s" }}
              />
              <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-indigo-600 to-fuchsia-600 shadow-[0_0_50px_rgba(217,70,239,0.7)]">
                <span className="font-mono text-[10px] font-bold tracking-widest text-cyan-100">
                  CORE
                </span>
                <span className="font-mono text-xl font-black text-white">
                  {overdrive ? "999%" : "100%"}
                </span>
                <span className="font-mono text-[9px] text-fuchsia-200">
                  {user?.role?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Protocol Selector Pills */}
            <div className="w-full">
              <p className="mb-2 text-center font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Select Active Defense Matrix
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["AETHER-9", "CHRONOS-X", "VOID-SHIELD"].map((proto) => (
                  <button
                    key={proto}
                    type="button"
                    onClick={() => setActiveProtocol(proto)}
                    className={`cursor-pointer rounded-xl border py-2 font-mono text-[11px] font-bold transition ${
                      activeProtocol === proto
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {proto}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Neural Waveform Equalizer & Regional Nodes */}
          <div className="flex flex-col justify-between rounded-3xl border border-fuchsia-500/30 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                    // NEURAL TOKEN SPECTRUM
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    Real-Time Cryptographic Pulse Visualizer
                  </h2>
                </div>
                <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-300">
                  28 CHANNELS ACTIVE
                </span>
              </div>

              {/* Animated Bars */}
              <div className="mt-5 flex h-36 items-end justify-between gap-1.5 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4">
                {pulseBars.map((height, idx) => (
                  <div
                    key={idx}
                    className="w-full rounded-t-full bg-gradient-to-t from-indigo-600 via-fuchsia-500 to-cyan-300 transition-all duration-500"
                    style={{ height: `${Math.min(100, height)}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Global Edge Node Matrix */}
            <div className="mt-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400">
                // GLOBAL EDGE CLUSTERS
              </span>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {NODES.map((node) => (
                  <div
                    key={node.name}
                    className="rounded-2xl border border-slate-800 bg-slate-900/75 p-3.5 transition hover:border-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">
                        {node.name}
                      </span>
                      <span className="font-mono text-[11px] text-cyan-400">
                        {node.ping}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${node.color}`}
                        style={{ width: `${node.load}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-slate-400">
                      <span>LOAD: {node.load}%</span>
                      <span className="text-emerald-400">{node.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Live Cyber Terminal Stream */}
        <div className="rounded-3xl border border-indigo-500/30 bg-slate-950/90 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-xs font-bold tracking-wider text-slate-300">
                root@nexus-overlord:~# tail -f /var/log/quantum-auth.stream
              </span>
            </div>
            <span className="font-mono text-[11px] text-cyan-400">
              STREAMING_LIVE
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 transition hover:border-cyan-500/40"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-slate-500">[{entry.time}]</span>
                  <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                    {entry.type}
                  </span>
                  <span className="text-slate-200">{entry.msg}</span>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
