declare module 'vanta/dist/vanta.net.min' {
  interface VantaEffect {
    destroy(): void;
    setOptions(opts: Record<string, unknown>): void;
    resize(): void;
  }
  export default function NET(opts: Record<string, unknown>): VantaEffect;
}
