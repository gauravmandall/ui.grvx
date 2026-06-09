"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-7xl h-[90vh] flex flex-col md:flex-row bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Sidebar */}
        <div className="w-full md:w-[360px] flex flex-col bg-card border-b md:border-b-0 md:border-r border-border h-full overflow-y-auto">
          {/* Back Button / Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Library
            </button>
            
            {/* Close Button for mobile */}
            <button
              onClick={onClose}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Info */}
          <div className="flex-1 p-6 space-y-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {project.category}
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground leading-tight">
                {project.name}
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`/${project.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors text-xs font-bold uppercase tracking-wider text-decoration-none shadow-lg shadow-emerald-500/10"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open Demo in New Tab
              </a>
            </div>

            {/* Design Reference Metadata */}
            <div className="border-t border-border pt-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Design Reference
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Directory Folder
                  </span>
                  <p className="font-mono text-xs text-foreground mt-1 bg-secondary/50 px-2.5 py-1.5 rounded border border-border/60">
                    {project.folder}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-muted text-muted-foreground font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Deployment Domain
                  </span>
                  <p className="font-mono text-xs text-foreground mt-1 break-all bg-secondary/50 px-2.5 py-1.5 rounded border border-border/60">
                    {project.id}.pages.dev
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Frame */}
        <div className="flex-1 flex flex-col bg-muted/20 h-full overflow-hidden">
          {/* Top Address Bar / Browser Mockup */}
          <div className="h-12 bg-card border-b border-border flex items-center px-4 justify-between select-none">
            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Window buttons */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              {/* Navigation arrows (disabled) */}
              <div className="hidden sm:flex items-center gap-3 text-muted-foreground/60">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-md mx-4 bg-secondary/80 border border-border/60 text-xs font-mono text-muted-foreground px-4 py-1.5 rounded-lg flex items-center gap-2 truncate justify-center">
              <svg className="h-3 w-3 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              https://ui.grvx.dev/{project.id}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <a
                href={`/${project.id}`}
                target="_blank"
                rel="noreferrer"
                title="Open in new tab"
                className="p-1 rounded hover:bg-secondary cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Iframe Viewport Container */}
          <div className="flex-1 relative bg-background overflow-hidden">
            <iframe
              src={`/${project.id}`}
              className="absolute inset-0 w-full h-full border-none bg-background pointer-events-auto"
              title={project.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
