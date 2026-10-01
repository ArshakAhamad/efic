import React, { useRef, useState, useCallback, useEffect } from "react";
import { useAnimationFrame } from "framer-motion";
import * as Icons from "lucide-react";
import { projects } from "../data/eficData";

interface ProjectsGridProps {
    hoveredCard: number | null;
    setHoveredCard: (index: number | null) => void;
}

const iconMap: Record<string, React.ElementType> = {
    GraduationCap: Icons.GraduationCap,
    BookOpen: Icons.BookOpen,
    FlaskConical: Icons.FlaskConical,
    Library: Icons.Library,
    Trophy: Icons.Trophy,
    PenTool: Icons.PenTool,
    Heart: Icons.Heart,
};

const cardAnimConfigs = [
    { anim: "floatY" },
    { anim: "sway" },
    { anim: "pulse" },
    { anim: "bounce" },
    { anim: "tilt" },
    { anim: "floatDiag" },
    { anim: "wiggle" },
];

const GAP = 16;
const SPEED = 0.4;
const SWIPE_THRESHOLD = 30;

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ hoveredCard, setHoveredCard }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const xRef = useRef(0);
    const isPaused = useRef(false);
    const manualScrolling = useRef(false);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Drag state
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartY = useRef(0);
    const dragStartXPos = useRef(0);
    const lockAxis = useRef<"x" | "y" | null>(null);

    // Idle animation time
    const animT = useRef(0);

    const [activeIndex, setActiveIndex] = useState(0);

    const loopedProjects = [...projects, ...projects];
    const totalCards = projects.length;

    const cardWidth = () =>
        typeof window !== "undefined"
            ? window.innerWidth < 640
                ? window.innerWidth - 80
                : 420
            : 420;

    const stepW = () => cardWidth() + GAP;
    const totalW = () => totalCards * stepW();

    const wrap = useCallback(() => {
        // Improved wrapping with better boundary handling
        const total = totalW();
        if (xRef.current <= -total) {
            xRef.current += total;
        } else if (xRef.current >= 0) {
            xRef.current -= total;
        }
    }, []);

    const applyX = useCallback(() => {
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${xRef.current}px)`;
        }
    }, []);

    const updateDots = useCallback(() => {
        const total = totalW();
        let pos = (-xRef.current) % total;
        if (pos < 0) pos += total;
        const idx = Math.round(pos / stepW()) % totalCards;
        setActiveIndex(idx);
    }, [totalCards]);

    const snapTo = useCallback((idx: number) => {
        manualScrolling.current = true;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);

        // Ensure idx is within bounds
        const targetIdx = ((idx % totalCards) + totalCards) % totalCards;
        let target = -(targetIdx * stepW());
        
        // Find the closest representation of target position
        const currentPos = xRef.current;
        const total = totalW();
        
        // Calculate the shortest distance to target
        let delta = target - currentPos;
        if (Math.abs(delta + total) < Math.abs(delta)) delta += total;
        if (Math.abs(delta - total) < Math.abs(delta)) delta -= total;
        
        const endPos = currentPos + delta;
        
        const start = xRef.current;
        const duration = 380;
        const t0 = performance.now();

        const step = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            xRef.current = start + (endPos - start) * eased;
            wrap();
            applyX();
            updateDots();
            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                resumeTimer.current = setTimeout(() => {
                    manualScrolling.current = false;
                }, 1500);
            }
        };
        requestAnimationFrame(step);
    }, [wrap, applyX, updateDots, totalCards]);

    const snapNearest = useCallback(() => {
        const total = totalW();
        let pos = (-xRef.current) % total;
        if (pos < 0) pos += total;
        const idx = Math.round(pos / stepW()) % totalCards;
        snapTo(idx);
    }, [totalCards, snapTo]);

    // Auto scroll
    useAnimationFrame(() => {
        if (!isPaused.current && !manualScrolling.current) {
            xRef.current -= SPEED;
            wrap();
            applyX();
            updateDots();
        }

        // Idle card animations
        animT.current += 0.02;
        cardRefs.current.forEach((card, i) => {
            if (!card || card.matches(":hover")) return;
            const ri = i % totalCards;
            const ph = ri * 0.8;
            const t = animT.current;
            const a = cardAnimConfigs[ri].anim;
            let ty = 0, tx = 0, rot = 0, sc = 1;
            if (a === "floatY")    ty = Math.sin(t + ph) * 8;
            if (a === "sway")      rot = Math.sin(t * 0.8 + ph) * 1.5;
            if (a === "pulse")     sc = 1 + Math.sin(t * 1.1 + ph) * 0.02;
            if (a === "bounce")    ty = Math.abs(Math.sin(t * 1.2 + ph)) * 8;
            if (a === "tilt")      rot = Math.sin(t * 0.7 + ph) * 1.5;
            if (a === "floatDiag") { ty = Math.sin(t + ph) * 10; tx = Math.sin(t * 0.6 + ph) * 4; }
            if (a === "wiggle")    rot = Math.sin(t * 1.3 + ph) * 2;
            card.style.transform = `translateY(${ty}px) translateX(${tx}px) rotate(${rot}deg) scale(${sc})`;
        });
    });

    // Resize handler — update card widths
    useEffect(() => {
        const onResize = () => {
            cardRefs.current.forEach(card => {
                if (card) card.style.width = cardWidth() + "px";
            });
            snapNearest(); // Re-snap on resize
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [snapNearest]);

    // ── Pointer handlers (mouse) ──
    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartY.current = e.clientY;
        dragStartXPos.current = xRef.current;
        isPaused.current = true;
        manualScrolling.current = true;
        lockAxis.current = null;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStartX.current;
        const dy = e.clientY - dragStartY.current;
        if (!lockAxis.current) {
            if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
                lockAxis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
            }
            return;
        }
        if (lockAxis.current === "y") return;
        xRef.current = dragStartXPos.current + dx;
        wrap();
        applyX();
        updateDots();
    }, [wrap, applyX, updateDots]);

    const onMouseUp = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        isPaused.current = false;
        const dx = e.clientX - dragStartX.current;
        if (lockAxis.current === "x" && Math.abs(dx) > SWIPE_THRESHOLD) {
            const total = totalW();
            let pos = (-dragStartXPos.current) % total;
            if (pos < 0) pos += total;
            const currentIdx = Math.round(pos / stepW()) % totalCards;
            const nextIdx = dx < 0
                ? (currentIdx + 1) % totalCards
                : (currentIdx - 1 + totalCards) % totalCards;
            snapTo(nextIdx);
        } else {
            snapNearest();
        }
    }, [totalCards, snapTo, snapNearest]);

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [onMouseMove, onMouseUp]);

    // ── Touch handlers ──
    const onTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        dragStartX.current = e.touches[0].clientX;
        dragStartY.current = e.touches[0].clientY;
        dragStartXPos.current = xRef.current;
        isPaused.current = true;
        manualScrolling.current = true;
        lockAxis.current = null;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        const dx = e.touches[0].clientX - dragStartX.current;
        const dy = e.touches[0].clientY - dragStartY.current;
        if (!lockAxis.current) {
            if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
                lockAxis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
            }
            return;
        }
        if (lockAxis.current === "y") return;
        e.preventDefault();
        xRef.current = dragStartXPos.current + dx;
        wrap();
        applyX();
        updateDots();
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        isPaused.current = false;
        const dx = e.changedTouches[0].clientX - dragStartX.current;
        if (lockAxis.current === "x" && Math.abs(dx) > SWIPE_THRESHOLD) {
            const total = totalW();
            let pos = (-dragStartXPos.current) % total;
            if (pos < 0) pos += total;
            const currentIdx = Math.round(pos / stepW()) % totalCards;
            const nextIdx = dx < 0
                ? (currentIdx + 1) % totalCards
                : (currentIdx - 1 + totalCards) % totalCards;
            snapTo(nextIdx);
        } else {
            snapNearest();
        }
    };

    return (
        <div className="relative pt-2 pb-4 select-none">
            {/* Carousel wrapper with edge fades - IMPROVED */}
            <div className="relative overflow-hidden">
                {/* Left fade - WIDER and using gradient with transparency */}
                <div
                    className="pointer-events-none absolute left-0 top-0 h-full z-10"
                    style={{
                        width: "20px",
                        background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 30%, transparent 100%)",
                    }}
                />

                {/* Right fade - WIDER and using gradient with transparency */}
                <div
                    className="pointer-events-none absolute right-0 top-0 h-full z-10"
                    style={{
                        width: "20px",
                        background: "linear-gradient(to left, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 30%, transparent 100%)",
                    }}
                />

                {/* Track */}
                <div
                    ref={trackRef}
                    className="flex w-max"
                    style={{
                        gap: `${GAP}px`,
                        padding: "12px 40px 20px 40px",
                        willChange: "transform",
                        cursor: isDragging.current ? "grabbing" : "grab",
                    }}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {loopedProjects.map((project, index) => {
                        const IconComponent = iconMap[project.icon] || Icons.HelpCircle;
                        const realIndex = index % totalCards;

                        return (
                            <div
                                key={`${project.id}-${index}`}
                                ref={el => { cardRefs.current[index] = el; }}
                                className="flex-shrink-0 relative bg-white rounded-3xl border border-gray-100 overflow-hidden group cursor-pointer"
                                style={{
                                    width: `${cardWidth()}px`,
                                    padding: "24px",
                                    boxSizing: "border-box",
                                    transition: "box-shadow 0.3s ease",
                                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
                                }}
                                onMouseEnter={() => {
                                    isPaused.current = true;
                                    setHoveredCard(realIndex);
                                }}
                                onMouseLeave={() => {
                                    isPaused.current = false;
                                    setHoveredCard(null);
                                }}
                            >
                                {/* Hover colour overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div
                                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}
                                        >
                                            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center items-center gap-2 mt-4">
                {projects.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => snapTo(i)}
                        className="rounded-full border-none focus:outline-none transition-all duration-300"
                        style={{
                            height: "8px",
                            width: activeIndex === i ? "28px" : "8px",
                            backgroundColor: activeIndex === i ? "#2563eb" : "#d1d5db",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsGrid;
