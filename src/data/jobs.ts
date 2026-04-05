export type Roll = "タンク" | "ヒーラー" | "メレー" | "レンジ" | "キャスター";

export interface JobDef {
  abbr: string;
  nameJa: string;
  nameEn: string;
  roll: Roll;
  iconPath: string;
}

export const JOBS: JobDef[] = [
  // タンク
  { abbr: "PLD", nameJa: "ナイト",       nameEn: "Paladin",      roll: "タンク",    iconPath: "/icon/job/PLD.png" },
  { abbr: "WAR", nameJa: "戦士",         nameEn: "Warrior",      roll: "タンク",    iconPath: "/icon/job/WAR.png" },
  { abbr: "DRK", nameJa: "暗黒騎士",     nameEn: "Dark Knight",  roll: "タンク",    iconPath: "/icon/job/DRK.png" },
  { abbr: "GNB", nameJa: "ガンブレイカー",nameEn: "Gunbreaker",   roll: "タンク",    iconPath: "/icon/job/GNB.png" },
  // メレー
  { abbr: "MNK", nameJa: "モンク",       nameEn: "Monk",         roll: "メレー",    iconPath: "/icon/job/MNK.png" },
  { abbr: "DRG", nameJa: "竜騎士",       nameEn: "Dragoon",      roll: "メレー",    iconPath: "/icon/job/DRG.png" },
  { abbr: "NIN", nameJa: "忍者",         nameEn: "Ninja",        roll: "メレー",    iconPath: "/icon/job/NIN.png" },
  { abbr: "SAM", nameJa: "侍",           nameEn: "Samurai",      roll: "メレー",    iconPath: "/icon/job/SAM.png" },
  { abbr: "RPR", nameJa: "リーパー",     nameEn: "Reaper",       roll: "メレー",    iconPath: "/icon/job/RPR.png" },
  // レンジ
  { abbr: "BRD", nameJa: "吟遊詩人",     nameEn: "Bard",         roll: "レンジ",    iconPath: "/icon/job/BRD.png" },
  { abbr: "MCH", nameJa: "機工士",       nameEn: "Machinist",    roll: "レンジ",    iconPath: "/icon/job/MCH.png" },
  { abbr: "DNC", nameJa: "踊り子",       nameEn: "Dancer",       roll: "レンジ",    iconPath: "/icon/job/DNC.png" },
  // キャスター
  { abbr: "BLM", nameJa: "黒魔道士",     nameEn: "Black Mage",   roll: "キャスター", iconPath: "/icon/job/BLM.png" },
  { abbr: "SMN", nameJa: "召喚士",       nameEn: "Summoner",     roll: "キャスター", iconPath: "/icon/job/SMN.png" },
  { abbr: "RDM", nameJa: "赤魔道士",     nameEn: "Red Mage",     roll: "キャスター", iconPath: "/icon/job/RDM.png" },
  // ヒーラー
  { abbr: "WHM", nameJa: "白魔道士",     nameEn: "White Mage",   roll: "ヒーラー",  iconPath: "/icon/job/WHM.png" },
  { abbr: "SCH", nameJa: "学者",         nameEn: "Scholar",      roll: "ヒーラー",  iconPath: "/icon/job/SCH.png" },
  { abbr: "AST", nameJa: "占星術師",     nameEn: "Astrologian",  roll: "ヒーラー",  iconPath: "/icon/job/AST.png" },
  { abbr: "SGE", nameJa: "賢者",         nameEn: "Sage",         roll: "ヒーラー",  iconPath: "/icon/job/SGE.png" },
];

export const ROLLS: Roll[] = ["タンク", "ヒーラー", "メレー", "レンジ", "キャスター"];

export function getJobsByRoll(roll: Roll): JobDef[] {
  return JOBS.filter((j) => j.roll === roll);
}
