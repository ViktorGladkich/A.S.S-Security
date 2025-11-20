
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight } from 'lucide-react';

// --- PARTICLE SHADERS ---
const particleFragmentShader = `
    uniform vec3 u_color;
    void main() {
        if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
        gl_FragColor = vec4(u_color, 0.8);
    }
`;

const particleVertexShader = `
    uniform float u_time;
    void main() {
        vec3 p = position;
        float angle = u_time * 0.2 + p.y * 0.1;
        float c = cos(angle);
        float s = sin(angle);
        p.x = position.x * c - position.z * s;
        p.z = position.x * s + position.z * c;
        
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = 3.0 * (10.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const ShieldScene = React.memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;
        
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        container.appendChild(renderer.domElement);

        const clock = new THREE.Clock();
        const mouse = new THREE.Vector2();
        const targetRotation = new THREE.Vector2();

        // Mouse Move Listener
        const onMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            mouse.set(x, y);
        };
        window.addEventListener('mousemove', onMouseMove);

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
        dirLight.position.set(5, 5, 10);
        scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xD4AF37, 8, 50);
        pointLight.position.set(-5, 2, -5);
        scene.add(pointLight);

        // Warm bottom light to remove shadows
        const bottomLight = new THREE.PointLight(0xffeeb1, 5, 50);
        bottomLight.position.set(0, -8, 5);
        scene.add(bottomLight);

        // Extra Front Light for better visibility
        const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
        frontLight.position.set(0, 0, 10);
        scene.add(frontLight);

        // --- MATERIALS ---
        const goldMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xFFD700,
            metalness: 1.0,
            roughness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            reflectivity: 1.0,
            emissive: 0x332200,
            emissiveIntensity: 0.2
        });

        const blackMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x050505,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });

        const blackMatteMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // --- SHIELD GEOMETRY ---
        const shieldShape = new THREE.Shape();
        const sw = 2.4; 
        const sh = 2.8; 
        shieldShape.moveTo(-sw, sh * 0.8); 
        shieldShape.quadraticCurveTo(0, sh, sw, sh * 0.8);
        shieldShape.lineTo(sw, -sh * 0.2);
        shieldShape.quadraticCurveTo(sw, -sh, 0, -sh * 1.5); 
        shieldShape.quadraticCurveTo(-sw, -sh, -sw, -sh * 0.2);
        shieldShape.lineTo(-sw, sh * 0.8);

        const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, { 
            depth: 0.2, 
            bevelEnabled: true, 
            bevelSegments: 5, 
            steps: 1, 
            bevelSize: 0.35, 
            bevelThickness: 0.35 
        });
        shieldGeo.center();

        const shieldMesh = new THREE.Mesh(shieldGeo, [blackMaterial, goldMaterial]);
        mainGroup.add(shieldMesh);

        // --- LOCK GEOMETRY ---
        const lockGroup = new THREE.Group();
        lockGroup.position.z = 0.55;
        lockGroup.scale.set(1.3, 1.3, 1.3);
        mainGroup.add(lockGroup);

        const bodyGeo = new THREE.BoxGeometry(1.4, 1.2, 0.4);
        const bodyMesh = new THREE.Mesh(bodyGeo, goldMaterial);
        lockGroup.add(bodyMesh);

        // Keyhole
        const keyholeGroup = new THREE.Group();
        keyholeGroup.position.z = 0.21;
        lockGroup.add(keyholeGroup);
        
        const circleGeo = new THREE.CircleGeometry(0.15, 32);
        const circleMesh = new THREE.Mesh(circleGeo, blackMatteMaterial);
        circleMesh.position.y = 0.1;
        keyholeGroup.add(circleMesh);
        
        const stemGeo = new THREE.PlaneGeometry(0.15, 0.4);
        const stemMesh = new THREE.Mesh(stemGeo, blackMatteMaterial);
        stemMesh.position.y = -0.1;
        keyholeGroup.add(stemMesh);

        const shackleGeo = new THREE.TorusGeometry(0.55, 0.15, 16, 32, Math.PI); 
        const shackleMesh = new THREE.Mesh(shackleGeo, goldMaterial);
        shackleMesh.position.y = 0.6;
        lockGroup.add(shackleMesh);

        // --- PARTICLES ---
        const particlesGeo = new THREE.BufferGeometry();
        const pCount = 400;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 20;
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        
        // Use u_color uniform
        const particleMaterial = new THREE.ShaderMaterial({
            vertexShader: particleVertexShader,
            fragmentShader: particleFragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: { 
                u_time: { value: 0 },
                u_color: { value: new THREE.Color(0xD4AF37) } // Default gold
            }
        });
        const particles = new THREE.Points(particlesGeo, particleMaterial);
        scene.add(particles);

        // --- RESPONSIVE & THEME LOGIC ---
        const updatePositions = () => {
            if (!container) return;
            const w = window.innerWidth;
            const h = window.innerHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            const isMobile = w < 768;
            const isTablet = w >= 768 && w < 1024;

            if (isMobile) {
                // Mobile: Top center - Raised higher to be closer to menu
                mainGroup.position.set(0, 2.5, 0); 
                mainGroup.scale.set(0.55, 0.55, 0.55);
                camera.position.z = 16;
            } else if (isTablet) {
                // Tablet: Reduced size, raised higher
                mainGroup.position.set(2, 1.2, 0); 
                mainGroup.scale.set(0.5, 0.5, 0.5); 
                camera.position.z = 14;
            } else {
                // Desktop: Right side
                mainGroup.position.set(3.5, -0.5, 0); 
                mainGroup.scale.set(0.8, 0.8, 0.8);
                camera.position.z = 12;
            }
        };

        const updateTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            
            if (isDark) {
                blackMaterial.color.setHex(0x050505);
                blackMaterial.roughness = 0.1;
                // Increased brightness for dark mode
                ambientLight.intensity = 2.0; 
                dirLight.intensity = 4.0;
                frontLight.intensity = 2.0;
                // Bright Gold Particles on Dark BG
                particleMaterial.uniforms.u_color.value.setHex(0xD4AF37);
            } else {
                blackMaterial.color.setHex(0x1a1a1a); 
                blackMaterial.roughness = 0.2;
                ambientLight.intensity = 1.5; 
                dirLight.intensity = 2.0;
                frontLight.intensity = 1.5;
                // Darker Gold/Brown Particles on Light BG for visibility
                particleMaterial.uniforms.u_color.value.setHex(0x8B6914);
            }
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updateTheme();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });

        updatePositions();
        updateTheme();
        window.addEventListener('resize', updatePositions);

        // --- ANIMATION LOOP ---
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            
            particleMaterial.uniforms.u_time.value = time;

            targetRotation.x = mouse.y * 0.2;
            targetRotation.y = mouse.x * 0.2;
            
            // Mouse interaction effect
            mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.05;
            // Mouse Interaction Rotation (No continuous spin)
            mainGroup.rotation.y += (targetRotation.y - mainGroup.rotation.y) * 0.05;
            
            mainGroup.position.y += Math.sin(time * 0.8) * 0.001;
            
            pointLight.position.x = Math.sin(time * 0.5) * 10;
            pointLight.position.z = Math.cos(time * 0.5) * 10 - 5;
            pointLight.intensity = 8 + Math.sin(time * 2) * 2;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', updatePositions);
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            cancelAnimationFrame(frameId);
            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            shieldGeo.dispose();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0" />;
});

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]); 

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-dvh min-h-[600px] overflow-hidden bg-neutral-50 dark:bg-[#050505] transition-colors duration-500 font-['Host_Grotesk'] selection:bg-brand-500/30">
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <ShieldScene />
      </div>

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col md:flex-row">
         
         {/* Left Side: Text Content */}
         <div className="w-full md:w-1/2 h-full flex flex-col justify-end md:justify-start lg:justify-center md:pt-32 lg:pt-0 pb-24 md:pb-0 pointer-events-none">
            <motion.div 
                style={{ y: y1, opacity }}
                className="w-full pointer-events-auto"
            >
                {/* Super Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div className="h-0.5 w-16 bg-brand-500"></div>
                    <span className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-neutral-600 dark:text-brand-400">Premium Security Services</span>
                </motion.div>

                {/* Main Typography - Reduced Size */}
                <div className="relative mb-10 flex flex-col leading-none">
                    <motion.h1 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter mb-1"
                    >
                        ES IST IMMER
                    </motion.h1>
                    
                    <motion.h1 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 tracking-tight flex flex-wrap gap-x-4 items-baseline mb-1"
                    >
                        SCHÖN, EIN 
                        <span className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-brand-400 via-brand-500 to-brand-600 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            ASS
                        </span>
                    </motion.h1>

                     <motion.h1 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-400 dark:text-neutral-300 tracking-tight"
                    >
                        IM ÄRMEL ZU HABEN.
                    </motion.h1>
                </div>

                {/* Subtext Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="relative pl-8 border-l-4 border-brand-500 max-w-xl"
                >
                    <p className="text-neutral-900 dark:text-white text-base md:text-lg font-medium leading-relaxed">
                        Verlassen Sie sich nicht auf Glück. Vertrauen Sie auf zertifizierte Sicherheitsexperten, die im Hintergrund agieren, damit Sie im Vordergrund glänzen können.
                    </p>
                </motion.div>

                {/* Main Button */}
                <div className="mt-10 flex flex-wrap gap-4">
                    <motion.button 
                        whileHover={{ scale: 1.02, translateY: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={scrollToContact}
                        className="
                            cursor-pointer
                            relative overflow-hidden px-10 py-5 
                            bg-black dark:bg-brand-500 
                            text-white dark:text-black 
                            font-bold uppercase text-sm tracking-[0.25em] 
                            rounded-sm shadow-2xl 
                            flex items-center gap-4 
                            transition-all duration-300
                            group
                            border border-transparent
                            hover:bg-brand-500 dark:hover:bg-white
                            hover:text-black dark:hover:text-black
                        "
                    >
                        <span className="relative z-10">Jetzt Anfragen</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-all duration-300" />
                    </motion.button>
                </div>

            </motion.div>
         </div>

         {/* Right Side Spacer */}
         <div className="hidden md:block w-1/2 h-full pointer-events-none"></div>
      </div>
    </section>
  );
};
