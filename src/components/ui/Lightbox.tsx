"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

export type LightboxItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  eyebrow?: string;
  title?: string;
};

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  label: string;
};

const noopSubscribe = () => () => {};

export function Lightbox({ items, index, onClose, onIndexChange, label }: Props) {
  const reduce = useReducedMotion();
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const count = items.length;
  const multi = count > 1;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Remember the trigger, lock scroll, focus the close button; restore on close
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      returnFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && multi) {
        go(1);
      } else if (e.key === "ArrowLeft" && multi) {
        go(-1);
      } else if (e.key === "Tab" && dialogRef.current) {
        // Focus trap
        // Only visible controls: prev/next are rendered twice (desktop + mobile) and one set is display:none
        const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href]")].filter(
          (el) => el.getClientRects().length > 0,
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, multi, go, onClose]);

  if (!isClient) return null;
  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[80] flex flex-col bg-ink-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="eyebrow text-muted" aria-live="polite">
              {multi ? (
                <>
                  <span className="text-gold">{String((index ?? 0) + 1).padStart(2, "0")}</span>
                  <span className="mx-2 text-muted/60">/</span>
                  {String(count).padStart(2, "0")}
                </>
              ) : (
                label
              )}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-hairline text-cream transition-colors hover:border-gold hover:text-gold-light"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Image (click backdrop to close) */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={onClose}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full touch-pan-y rounded-[4px] object-contain shadow-2xl shadow-black"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
                drag={multi && !reduce ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
              />
            </AnimatePresence>

            {multi && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-ink-900/80 text-cream transition-colors hover:border-gold hover:text-gold-light sm:inline-flex"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-ink-900/80 text-cream transition-colors hover:border-gold hover:text-gold-light sm:inline-flex"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          {/* Caption + mobile controls */}
          <div className="flex items-center justify-between gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <div className="min-w-0">
              {item.eyebrow && <p className="eyebrow">{item.eyebrow}</p>}
              {item.title && <p className="display mt-1 truncate text-2xl text-cream sm:text-3xl">{item.title}</p>}
            </div>
            {multi && (
              <div className="flex shrink-0 gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-hairline text-cream"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-hairline text-cream"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
