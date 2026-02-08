import React from "react";

export const ServerMigration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Germany Server */}
      <g opacity="0.6">
        <rect x="50" y="150" width="120" height="100" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
        <line x1="70" y1="170" x2="150" y2="170" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
        <line x1="70" y1="190" x2="150" y2="190" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
        <line x1="70" y1="210" x2="150" y2="210" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
        <text x="110" y="270" fontSize="14" fill="currentColor" textAnchor="middle" className="text-muted-foreground">Germany</text>
      </g>

      {/* Arrow */}
      <g>
        <path d="M 200 200 Q 400 100, 600 200" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" className="text-primary" />
        <polygon points="600,200 590,195 590,205" fill="currentColor" className="text-primary" />
        <text x="400" y="90" fontSize="14" fill="currentColor" textAnchor="middle" className="text-primary">Migration</text>
      </g>

      {/* Singapore Server */}
      <g>
        <rect x="630" y="150" width="120" height="100" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
        <line x1="650" y1="170" x2="730" y2="170" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
        <line x1="650" y1="190" x2="730" y2="190" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
        <line x1="650" y1="210" x2="730" y2="210" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
        <circle cx="690" cy="230" r="8" fill="currentColor" className="text-primary" />
        <text x="690" y="270" fontSize="14" fill="currentColor" textAnchor="middle" className="text-foreground">Singapore</text>
      </g>
    </svg>
  );
};

export const DatabaseSync: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Source Database */}
      <g opacity="0.6">
        <ellipse cx="150" cy="150" rx="80" ry="30" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
        <line x1="70" y1="150" x2="70" y2="220" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
        <line x1="230" y1="150" x2="230" y2="220" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
        <ellipse cx="150" cy="220" rx="80" ry="30" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
        <text x="150" y="270" fontSize="14" fill="currentColor" textAnchor="middle" className="text-muted-foreground">Source DB</text>
      </g>

      {/* Sync Arrow */}
      <g>
        <path d="M 260 185 L 540 185" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <polygon points="540,185 530,180 530,190" fill="currentColor" className="text-primary" />
        <text x="400" y="175" fontSize="12" fill="currentColor" textAnchor="middle" className="text-primary">pg_dump → pg_restore</text>
      </g>

      {/* Target Database */}
      <g>
        <ellipse cx="650" cy="150" rx="80" ry="30" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
        <line x1="570" y1="150" x2="570" y2="220" stroke="currentColor" strokeWidth="2" className="text-foreground" />
        <line x1="730" y1="150" x2="730" y2="220" stroke="currentColor" strokeWidth="2" className="text-foreground" />
        <ellipse cx="650" cy="220" rx="80" ry="30" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
        <circle cx="650" cy="185" r="10" fill="currentColor" className="text-primary" />
        <path d="M 645 185 L 650 190 L 660 180" stroke="white" strokeWidth="2" fill="none" />
        <text x="650" y="270" fontSize="14" fill="currentColor" textAnchor="middle" className="text-foreground">Target DB</text>
      </g>
    </svg>
  );
};

export const NetworkTopology: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* User */}
      <g>
        <circle cx="300" cy="80" r="30" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
        <path d="M 300 110 L 300 160 M 280 130 L 320 130 M 300 160 L 280 200 M 300 160 L 320 200" stroke="currentColor" strokeWidth="2" className="text-foreground" />
        <text x="300" y="230" fontSize="14" fill="currentColor" textAnchor="middle" className="text-foreground">User (India)</text>
      </g>

      {/* Connection Lines */}
      <line x1="300" y1="240" x2="150" y2="300" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-muted-foreground" opacity="0.4" />
      <line x1="300" y1="240" x2="450" y2="300" stroke="currentColor" strokeWidth="2" className="text-primary" />

      {/* Old Server (US) */}
      <g opacity="0.4">
        <rect x="90" y="300" width="120" height="80" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
        <text x="150" y="350" fontSize="14" fill="currentColor" textAnchor="middle" className="text-muted-foreground">East US</text>
        <text x="150" y="370" fontSize="12" fill="currentColor" textAnchor="middle" className="text-muted-foreground">~5.6s</text>
      </g>

      {/* New Server (India) */}
      <g>
        <rect x="390" y="300" width="120" height="80" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
        <circle cx="450" cy="340" r="8" fill="currentColor" className="text-primary" />
        <text x="450" y="360" fontSize="14" fill="currentColor" textAnchor="middle" className="text-foreground">Central India</text>
        <text x="450" y="375" fontSize="12" fill="currentColor" textAnchor="middle" className="text-primary">~0.97s</text>
      </g>
    </svg>
  );
};

export const LatencyGraph: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="80" y1="250" x2="750" y2="250" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <line x1="80" y1="50" x2="80" y2="250" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />

      {/* Y-axis labels */}
      <text x="60" y="55" fontSize="12" fill="currentColor" textAnchor="end" className="text-muted-foreground">6s</text>
      <text x="60" y="130" fontSize="12" fill="currentColor" textAnchor="end" className="text-muted-foreground">3s</text>
      <text x="60" y="255" fontSize="12" fill="currentColor" textAnchor="end" className="text-muted-foreground">0s</text>

      {/* Before bars (Germany + US) */}
      <rect x="150" y="70" width="100" height="180" fill="currentColor" className="text-muted-foreground" opacity="0.3" />
      <text x="200" y="265" fontSize="14" fill="currentColor" textAnchor="middle" className="text-muted-foreground">Before</text>
      <text x="200" y="60" fontSize="14" fill="currentColor" textAnchor="middle" className="text-muted-foreground">5.6s</text>

      {/* After bars (Singapore + India) */}
      <rect x="350" y="210" width="100" height="40" fill="currentColor" className="text-primary" opacity="0.8" />
      <text x="400" y="265" fontSize="14" fill="currentColor" textAnchor="middle" className="text-foreground">After</text>
      <text x="400" y="200" fontSize="14" fill="currentColor" textAnchor="middle" className="text-primary">0.97s</text>

      {/* Improvement arrow */}
      <path d="M 270 150 L 330 150" stroke="currentColor" strokeWidth="2" className="text-primary" markerEnd="url(#arrowhead)" />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-primary" />
        </marker>
      </defs>
      <text x="300" y="140" fontSize="12" fill="currentColor" textAnchor="middle" className="text-primary">5.7x faster</text>
    </svg>
  );
};

export const K8sDeployment: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Kubernetes Cluster */}
      <rect x="50" y="50" width="700" height="400" rx="12" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" fill="none" className="text-foreground" />
      <text x="400" y="35" fontSize="16" fill="currentColor" textAnchor="middle" className="text-foreground" fontWeight="600">Kubernetes Cluster</text>

      {/* Ingress */}
      <rect x="320" y="80" width="160" height="50" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
      <text x="400" y="110" fontSize="14" fill="currentColor" textAnchor="middle" className="text-primary">Ingress Controller</text>

      {/* Service */}
      <rect x="320" y="160" width="160" height="50" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-foreground" />
      <text x="400" y="190" fontSize="14" fill="currentColor" textAnchor="middle" className="text-foreground">LSTM Service</text>

      {/* Pods */}
      <g>
        <rect x="120" y="250" width="140" height="160" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
        <text x="190" y="275" fontSize="12" fill="currentColor" textAnchor="middle" className="text-muted-foreground">Pod 1</text>
        <rect x="140" y="290" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-foreground" />
        <text x="190" y="315" fontSize="11" fill="currentColor" textAnchor="middle" className="text-foreground">LSTM Model</text>
        <rect x="140" y="350" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-muted-foreground" />
        <text x="190" y="375" fontSize="11" fill="currentColor" textAnchor="middle" className="text-muted-foreground">API Server</text>
      </g>

      <g>
        <rect x="330" y="250" width="140" height="160" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
        <text x="400" y="275" fontSize="12" fill="currentColor" textAnchor="middle" className="text-muted-foreground">Pod 2</text>
        <rect x="350" y="290" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-foreground" />
        <text x="400" y="315" fontSize="11" fill="currentColor" textAnchor="middle" className="text-foreground">LSTM Model</text>
        <rect x="350" y="350" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-muted-foreground" />
        <text x="400" y="375" fontSize="11" fill="currentColor" textAnchor="middle" className="text-muted-foreground">API Server</text>
      </g>

      <g>
        <rect x="540" y="250" width="140" height="160" rx="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
        <text x="610" y="275" fontSize="12" fill="currentColor" textAnchor="middle" className="text-muted-foreground">Pod 3</text>
        <rect x="560" y="290" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-foreground" />
        <text x="610" y="315" fontSize="11" fill="currentColor" textAnchor="middle" className="text-foreground">LSTM Model</text>
        <rect x="560" y="350" width="100" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-muted-foreground" />
        <text x="610" y="375" fontSize="11" fill="currentColor" textAnchor="middle" className="text-muted-foreground">API Server</text>
      </g>

      {/* Connection lines */}
      <line x1="400" y1="130" x2="400" y2="160" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <line x1="400" y1="210" x2="190" y2="250" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <line x1="400" y1="210" x2="400" y2="250" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <line x1="400" y1="210" x2="610" y2="250" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
    </svg>
  );
};
