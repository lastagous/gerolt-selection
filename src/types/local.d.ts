import { Achievement, Quest } from './garlandtools';
import { ClassJobCategory, Item } from './xivapi';

export interface Relation {
  classJobCategory: ClassJobCategory;
  quests: Quest[];
  items: Item[];
  achievements: Achievement[];
}

export interface Tooltip {
  id: number;
  tooltipId: string;
  urlType: string;
}

declare module '*/assets/data/local/relations.json' {
  const value: Relation[];
  export = value;
}

declare module '*/assets/data/local/tooltips.json' {
  const value: Tooltip[];
  export = value;
}
