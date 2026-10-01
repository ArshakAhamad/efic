import { motion } from "framer-motion";
import { useMemo } from "react";

const FloatingShapes = () => {
    const shapes = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            xMove: Math.random() * 20 - 10,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            color: ['#0071BC', '#39B54A', '#C0C0C0', '#ED1C24'][i % 4],
            radius: i % 2 === 0 ? '50%' : '0%',
        }));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute w-3 h-3 md:w-4 md:h-4"
                    style={{
                        left: `${shape.left}%`,
                        top: `${shape.top}%`,
                        backgroundColor: shape.color,
                        borderRadius: shape.radius,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, shape.xMove, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: shape.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingShapes;