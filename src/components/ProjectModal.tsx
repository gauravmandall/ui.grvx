"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  const configCode = `/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/${project.id}',
};

export default nextConfig;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(configCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl max-h-[85vh] flex flex-col bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {project.category}
            </span>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-foreground">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Route */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-secondary font-mono text-xs">
            <span className="text-muted-foreground">→</span>
            <span className="text-foreground">ui.grvx.dev/{project.id}</span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Directory
              </h4>
              <p className="font-mono text-xs text-foreground">
                {project.folder}
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Stack
              </h4>
              <p className="text-xs text-foreground">
                {project.tech.join(", ")}
              </p>
            </div>
          </div>

          {/* Config block */}
          <div className="p-4 border border-border rounded-xl flex flex-col gap-3 bg-secondary/30">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Required basePath Config
              </h4>
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded-md border border-border text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:border-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-secondary border border-border font-mono text-xs text-muted-foreground overflow-x-auto">
              {configCode}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-5 border-t border-border bg-secondary/20">
          <a
            href={`/${project.id}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center py-2.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-opacity text-xs font-semibold uppercase tracking-wider text-decoration-none"
          >
            Open Demo
          </a>
          <button
            onClick={onClose}
            className="flex-1 text-center py-2.5 rounded-lg border border-border bg-card text-foreground hover:border-foreground transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
