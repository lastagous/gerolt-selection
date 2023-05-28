import { MenuItem } from 'primeng/api';
import { XviapiAchievementModel } from './xivapi-achievement.model';
import { XivapiItemModel } from './xivapi-item.model';

export interface ProgressPanelMenuItem extends MenuItem {
  data?: ProgressPanelModel;
}

export interface ProgressPanelModel {
  progressJobs: ProgressJobModel[];
}

export interface ProgressJobModel {
  name: string;
  upgradeSteps: UpgradeStepModel[];
}

export interface UpgradeStepModel {
  achievement: XviapiAchievementModel;
  items: XivapiItemModel[];
}
