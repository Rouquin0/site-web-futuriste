import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// next/image : balise <img> simple en test
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, quality, sizes, onLoad, onError, ...rest } = props as Record<string, unknown>;
    void fill; void priority; void quality; void sizes; void onLoad; void onError;
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement("img", rest as React.ImgHTMLAttributes<HTMLImageElement>);
  },
}));

// Réduction des animations activée par défaut : les déplacements sont instantanés et testables
const mql = (matches: boolean) => ({
  matches, media: "", onchange: null,
  addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
});
Object.defineProperty(window, "matchMedia", { writable: true, value: (q: string) => mql(q.includes("prefers-reduced-motion")) });

class IO {
  constructor(private cb: IntersectionObserverCallback) {}
  observe() { this.cb([{ intersectionRatio: 1, isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
  unobserve() {} disconnect() {} takeRecords() { return []; }
}
Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IO });
class RO { observe() {} unobserve() {} disconnect() {} }
Object.defineProperty(window, "ResizeObserver", { writable: true, value: RO });
Element.prototype.scrollIntoView = () => {};
