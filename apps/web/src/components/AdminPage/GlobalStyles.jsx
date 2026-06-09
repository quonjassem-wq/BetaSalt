export function GlobalStyles() {
  return (
    <style jsx global>{`
      body { margin: 0; }
      * { box-sizing: border-box; }
      .salt-scroll::-webkit-scrollbar { width: 4px; }
      .salt-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
      .salt-scroll::-webkit-scrollbar-thumb { background: rgba(239,68,68,0.3); border-radius: 10px; }
      .salt-scroll::-webkit-scrollbar-thumb:hover { background: rgba(239,68,68,0.5); }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @media (min-width: 860px) { .admin-grid { grid-template-columns: 340px 1fr !important; } }
    `}</style>
  );
}
