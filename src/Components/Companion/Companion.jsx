import React, { useRef, useState, useEffect } from "react";
import useMousePosition from "../hooks/useMousePosition";

const Companion = () => {
    const { x, y } = useMousePosition(); // Get mouse position
    const eyeRef = useRef(null); // Reference for the eye element
    const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!eyeRef.current) return;

        // Get the eye's position on the page
        const eyeRect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        // Calculate the angle to move the pupil
        const dx = x - eyeCenterX;
        const dy = y - eyeCenterY;
        const angle = Math.atan2(dy, dx);

        // Limit pupil movement within the eye
        const maxDistance = 20; // Adjust this to control how far the pupil moves
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);

        // Set the new pupil position
        setPupilPosition({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
        });

    }, [x, y]); // Recalculate when mouse moves

    return (
        <div className="companionContainer">
            {/* Eye */}
            <img src="/Wheatley.png" className="wheatley" ref={eyeRef} />

            {/* Pupil (moves dynamically) */}
            <img
                src="/Pupil.png"
                className="pupil"
                style={{
                    transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                }}
            />
        </div>
    );
};

export default Companion;
