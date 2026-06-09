"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { id, name, description, category, tech, featured } = project;
  const [isHovered, setIsHovered] = useState(false);

  // Determine gradient color based on category
  const getGradient = (cat: string) => {
    switch (cat) {
      case "Portfolios":
        return "from-indigo-600 via-purple-600 to-pink-600";
      case "WebGL":
        return "from-teal-500 via-emerald-600 to-cyan-700";
      case "Sliders":
        return "from-rose-500 via-orange-500 to-red-600";
      case "Menus":
        return "from-amber-500 via-amber-600 to-yellow-700";
      case "Monthly Templates":
        return "from-sky-400 via-blue-500 to-indigo-600";
      default:
        return "from-slate-600 via-slate-700 to-slate-800";
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Preview Container */}
      <button
        onClick={() => onSelect(project)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full aspect-[16/10] rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-foreground/40 hover:shadow-xl text-left cursor-pointer"
      >
        {/* Browser Mockup Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-muted/90 border-b border-border/80 flex items-center px-3 gap-1.5 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          <div className="mx-auto bg-background/50 border border-border/40 text-[8px] font-mono text-muted-foreground px-4 py-0.5 rounded flex items-center gap-1 max-w-[120px] truncate">
            {id}
          </div>
        </div>

        {/* Preview Frame Body */}
        <div className="absolute inset-0 pt-7 z-10 w-full h-full flex items-center justify-center">
          {/* Static Gradient Mockup */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${getGradient(category)} flex flex-col items-center justify-center p-4 text-center select-none`}>
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
            <h4 className="relative text-white font-extrabold text-sm tracking-tight px-3 py-1 rounded bg-black/25 border border-white/10 shadow-lg backdrop-blur-sm max-w-[85%] truncate uppercase">
              {name}
            </h4>
            <span className="relative text-[9px] font-mono font-medium text-white/80 mt-2 px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm">
              {tech[0]}
            </span>
          </div>

          {/* Interactive Live Preview (iframe loads only on hover) */}
          {isHovered && (
            <div className="absolute inset-0 pt-7 bg-background z-10">
              <iframe
                src={`/${id}`}
                loading="lazy"
                className="absolute w-[300%] h-[300%] border-none pointer-events-none origin-top-left"
                style={{
                  transform: "scale(0.333333)",
                  width: "300%",
                  height: "300%",
                }}
              />
              {/* Overlay to block iframe interactions */}
              <div className="absolute inset-0 bg-transparent z-20" />
            </div>
          )}
        </div>

        {/* Stacking / Featured Badge */}
        {featured && (
          <span className="absolute top-9 right-3 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-foreground text-background z-25 shadow-md">
            ★ Featured
          </span>
        )}

        {/* Text Overlay at bottom of screenshot area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-end pt-10">
          <p className="text-white text-[11px] leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </button>

      {/* Info under the preview */}
      <div className="mt-3 flex items-start justify-between px-1">
        <div>
          <h3
            onClick={() => onSelect(project)}
            className="text-sm font-bold tracking-tight text-foreground hover:text-muted-foreground transition-colors cursor-pointer leading-snug"
          >
            {name}
          </h3>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
            {category}
          </p>
        </div>
        
        {/* Tech Badges */}
        <div className="flex gap-1">
          {tech.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-muted text-muted-foreground font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
