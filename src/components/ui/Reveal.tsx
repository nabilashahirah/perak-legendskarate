import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds before the fade starts once in view */
  delay?: number;
  /** Vertical offset in px before reveal */
  y?: number;
  as?: "div" | "li" | "article";
};

/**
 * Fades + lifts content in when it scrolls into view.
 *
 * Content is visible by default. The hidden "before" state only applies once the inline
 * script in layout.tsx (REVEAL_SCRIPT) has confirmed it's running, so text can never get stuck
 * invisible on a slow phone, an old browser, or if JavaScript fails. Reduced motion: no animation.
 */
export function Reveal({ children, className, delay = 0, y = 16, as: Tag = "div" }: Props) {
  const style = { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}

/**
 * Inline (no framework) observer for [data-reveal]. Runs in <head> before first paint.
 * - Adds `reveal-on` to <html> only if IntersectionObserver exists and motion isn't reduced.
 * - Marks elements `is-in` when they enter the viewport; new elements (client navigation) are picked up.
 * - Safety net: after 4s anything still hidden is shown.
 */
export const REVEAL_SCRIPT = `(function(){try{
var d=document.documentElement;
if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.classList.add('reveal-on');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px'});
var seen=new WeakSet();
function scan(){document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(function(el){if(!seen.has(el)){seen.add(el);io.observe(el);}});}
function start(){scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
setTimeout(function(){document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('is-in');});},4000);
}catch(e){document.documentElement.classList.remove('reveal-on');}})();`;
