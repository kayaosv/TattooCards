import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.ticker.lagSmoothing(500, 33);

export { gsap, ScrollTrigger, useGSAP };
