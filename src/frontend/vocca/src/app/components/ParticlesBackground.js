import React, { useEffect } from 'react';

const ParticlesBackground = () => {
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      // Dynamically import particles.js
      import('particles.js').then(() => {
        // After particles.js is loaded and executed, it should be available on the window object
        const particlesJS = window.particlesJS;
        if (particlesJS) {
          particlesJS.load('particles-js', '/particlesjs-config.json', function() {
            console.log('callback - particles.js config loaded');
          });
        }
      });
    }
  }, []);

  return <div id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }} />;
};

export default ParticlesBackground;
