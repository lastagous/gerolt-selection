import { Job_EN, Job_EN_Abbreviation, Job_JP, LegacyJobIcon, QuestJobIcon } from '../enum/job';
import { Roll_JP, RollBaseImage, RollIcon } from '../enum/roll';

export class JobModel {
  roll: Roll_JP;
  name: JobNameModel;
  jobIcon: JobIconModel;
  rollIcon: RollIconModel;
  check: boolean;
}

export class JobNameModel {
  en: Job_EN;
  jp: Job_JP;
  en_abbreviation: Job_EN_Abbreviation;
}

export class JobIconModel {
  legacy: LegacyJobIcon;
  quest: QuestJobIcon;
}

export class RollIconModel {
  base: RollBaseImage;
  icon: RollIcon;
}
