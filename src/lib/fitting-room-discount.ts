// Manages the 10-minute 10% off code unlocked by the Virtual Fitting Room.
export const FITTING_DISCOUNT_KEY = "izu_fitting_discount";
export const FITTING_DISCOUNT_RATE = 0.10;
export const FITTING_DISCOUNT_WINDOW_MS = 10 * 60 * 1000;

export type FittingDiscount = {
  code: string;
  expiresAt: number; // epoch ms
};

function generateCode(): string {
  // Short, recognizable, single-use feel.
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IZU-MIRROR-${rand}`;
}

export function issueFittingDiscount(): FittingDiscount {
  const existing = readFittingDiscount();
  if (existing) return existing; // don't overwrite an active one
  const code: FittingDiscount = {
    code: generateCode(),
    expiresAt: Date.now() + FITTING_DISCOUNT_WINDOW_MS,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(FITTING_DISCOUNT_KEY, JSON.stringify(code));
    window.dispatchEvent(new CustomEvent("izu:fitting-discount", { detail: code }));
  }
  return code;
}

export function readFittingDiscount(): FittingDiscount | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(FITTING_DISCOUNT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FittingDiscount;
    if (!parsed?.expiresAt || parsed.expiresAt < Date.now()) {
      localStorage.removeItem(FITTING_DISCOUNT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearFittingDiscount() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(FITTING_DISCOUNT_KEY);
    window.dispatchEvent(new CustomEvent("izu:fitting-discount", { detail: null }));
  }
}

export function isCodeValid(input: string): FittingDiscount | null {
  const active = readFittingDiscount();
  if (!active) return null;
  if (input.trim().toUpperCase() !== active.code.toUpperCase()) return null;
  return active;
}
