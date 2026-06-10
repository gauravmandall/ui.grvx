"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { PROJECTS_DATA, type Project } from "@/data/projects";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { SearchFilter } from "@/components/SearchFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";

function ShowcaseContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ports, setPorts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/ports")
        .then((res) => res.json())
        .then((data) => setPorts(data))
        .catch((err) => console.error("Failed to load ports config:", err));
    }
  }, []);

  const getProjectUrl = (id: string) => {
    if (process.env.NODE_ENV === "development" && ports[id]) {
      return `http://localhost:${ports[id]}`;
    }
    return `/${id}`;
  };

  const gridRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category)))],
    []
  );

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.folder.toLowerCase().includes(q) ||
        project.id.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredProjects = useMemo(
    () => filteredProjects.filter((p) => p.featured),
    [filteredProjects]
  );
  const regularProjects = useMemo(
    () => filteredProjects.filter((p) => !p.featured),
    [filteredProjects]
  );

  useGSAP(
    () => {
      if (filteredProjects.length === 0) return;
      gsap.fromTo(
        ".project-card-item",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.025, ease: "power1.out" }
      );
    },
    { dependencies: [searchQuery, activeCategory], scope: gridRef }
  );

  const stats = useMemo(() => {
    const cats = new Set(PROJECTS_DATA.map((p) => p.category));
    return {
      total: PROJECTS_DATA.length,
      featured: PROJECTS_DATA.filter((p) => p.featured).length,
      categories: cats.size,
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-none">
            ui.grvx.dev
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            A collection of creative web experiments — scroll animations, 3D sliders,
            interactive menus, and WebGL visualizations.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-row items-center gap-8 md:gap-12 flex-wrap">
            {[
              { value: stats.total, label: "Projects" },
              { value: stats.featured, label: "Featured" },
              { value: stats.categories, label: "Categories" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8 md:gap-12">
                {i > 0 && <div className="h-8 w-px bg-border" />}
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tabular-nums leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-2 leading-none">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Search & Filter */}
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          resultCount={filteredProjects.length}
        />

        {/* Project Grid */}
        <div ref={gridRef}>
          {filteredProjects.length > 0 ? (
            <div className="space-y-12">
              {/* Featured */}
              {featuredProjects.length > 0 && (
                <section>
                  {activeCategory === "All" && !searchQuery && (
                    <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-6 leading-none">
                      Featured
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project) => (
                      <div key={project.id} className="project-card-item opacity-0">
                        <ProjectCard project={project} onSelect={setSelectedProject} getProjectUrl={getProjectUrl} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Regular */}
              {regularProjects.length > 0 && (
                <section>
                  {featuredProjects.length > 0 && activeCategory === "All" && !searchQuery && (
                    <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-6 leading-none">
                      All Projects
                    </h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularProjects.map((project) => (
                      <div key={project.id} className="project-card-item opacity-0">
                        <ProjectCard project={project} onSelect={setSelectedProject} getProjectUrl={getProjectUrl} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-border bg-card text-center">
              <p className="text-sm text-muted-foreground">
                No projects match your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:border-foreground transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-8 pb-12 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span>© {new Date().getFullYear()} Gorlabs</span>
          <span>Cloudflare Worker Proxy Routing</span>
        </footer>
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} getProjectUrl={getProjectUrl} />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ShowcaseContent />
    </ThemeProvider>
  );
}
