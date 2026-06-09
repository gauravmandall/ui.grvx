"use client";

import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { id, name, description, category, tech, featured } = project;

  return (
    <button
      onClick={() => onSelect(project)}
      className="group flex flex-col w-full h-full p-6 rounded-xl border border-border bg-card text-foreground text-left transition-all hover:border-muted-foreground hover:shadow-lg hover:shadow-neutral-500/5 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
    >
      {/* Top row */}
      <div className="flex items-center justify-between w-full mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {category}
        </span>
        {featured && (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-foreground text-background">
            ★ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold tracking-tight text-foreground mb-1 leading-snug">
        {name}
      </h3>

      {/* Route */}
      <p className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors mb-3">
        ui.grvx.dev/{id}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-grow">
        {description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tech.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-secondary text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
