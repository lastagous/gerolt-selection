export interface Item {
  ClassJobCategory: ClassJobCategory;
  Description_ja: string;
  EquipSlotCategory: EquipSlotCategory;
  ID: number;
  Icon: string; // /i/034000/034693.png
  IconID: number;
  LevelEquip: number;
  LevelItem: number;
  Name: string;
  Name_de: string;
  Name_en: string;
  Name_fr: string;
  Name_ja: string;
  Patch: number;
  Url: string; // /Item/21965
  UrlType: string;
}

export interface ClassJobCategory {
  Name: string;
  Name_de: string;
  Name_en: string;
  Name_fr: string;
  Name_ja: string;
}

export interface EquipSlotCategory {
  Body: number;
  Ears: number;
  Feet: number;
  FingerL: number;
  FingerR: number;
  Gloves: number;
  Head: number;
  ID: number;
  Legs: number;
  MainHand: number;
  Neck: number;
  OffHand: string;
  SoulCrystal: number;
  Waist: number;
  Wrists: number;
}

declare module '*/assets/data/xivapi/items.json' {
  const value: Item[];
  export = value;
}
