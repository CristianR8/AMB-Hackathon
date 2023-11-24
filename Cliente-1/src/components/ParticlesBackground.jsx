import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const loadParticles = async (main) => {
    await loadFull(main);
  };

  return (
      <Particles
        id="tsparticles"
        init={loadParticles}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          particles: {
            number: {
              value: 11,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: '#fff',
            },
            shape: {
              type: 'edge',
              options: {
                sides: 5,
              },
            },
            opacity: {
              value: 0.9,
              anim: {
                enable: false,
                speed: 2,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 2,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.9,
                sync: false,
              },
            },
            rotate: {
              value: 0,
              random: true,
              direction: 'clockwise',
              animation: {
                enable: true,
                speed: 9,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 600,
              color: '#ffffff',
              opacity: 0.5,
              width: 2,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              out_mode: 'out',
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'grab',
              },
              onclick: {
                enable: false,
                mode: 'bubble',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
              },
              push: {
                particles_nb: 9,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          background: {
            color: '#111',
            position: '50% 50%',
            repeat: 'no-repeat',
            size: 'cover',
          },
        }}
      />
  );
};

export default ParticlesBackground;
