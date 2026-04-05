import logosJson from "../assets/logo/logos.json";

export interface LogoDef {
  fileName: string;
  filePath: string;
  creatorName: string;
  link: string;
}

// assets/logo/... → /logo/... へパス変換
const rawLogos = logosJson as LogoDef[];
export const LOGOS: LogoDef[] = rawLogos.map((l) => ({
  ...l,
  filePath: l.filePath.replace(/^assets\//, "/"),
}));

export function randomLogo(): LogoDef {
  return LOGOS[Math.floor(Math.random() * LOGOS.length)];
}
