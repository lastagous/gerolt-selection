import { Job_EN, Job_EN_Abbreviation, Job_JP, LegacyJobIcon, QuestJobIcon } from '../enum/job';
import { RollBaseImage, RollIcon, Roll_JP } from '../enum/roll';
import { JobModel } from '../model/job';

export class JobUtil {
  public static jobList = [
    {
      roll: Roll_JP.TANK,
      name: {
        en: Job_EN.PLD,
        jp: Job_JP.PLD,
        en_abbreviation: Job_EN_Abbreviation.PLD,
      },
      jobIcon: {
        legacy: LegacyJobIcon.PLD,
        quest: QuestJobIcon.PLD,
      },
      rollIcon: {
        base: RollBaseImage.TANK,
        icon: RollIcon.TANK,
      },
    } as JobModel,
    {
      roll: Roll_JP.TANK,
      name: {
        en: Job_EN.WAR,
        jp: Job_JP.WAR,
        en_abbreviation: Job_EN_Abbreviation.WAR,
      },
      jobIcon: {
        legacy: LegacyJobIcon.WAR,
        quest: QuestJobIcon.WAR,
      },
      rollIcon: {
        base: RollBaseImage.TANK,
        icon: RollIcon.TANK,
      },
    } as JobModel,
    {
      roll: Roll_JP.TANK,
      name: {
        en: Job_EN.DRK,
        jp: Job_JP.DRK,
        en_abbreviation: Job_EN_Abbreviation.DRK,
      },
      jobIcon: {
        legacy: LegacyJobIcon.DRK,
        quest: QuestJobIcon.DRK,
      },
      rollIcon: {
        base: RollBaseImage.TANK,
        icon: RollIcon.TANK,
      },
    } as JobModel,
    {
      roll: Roll_JP.TANK,
      name: {
        en: Job_EN.GNB,
        jp: Job_JP.GNB,
        en_abbreviation: Job_EN_Abbreviation.GNB,
      },
      jobIcon: {
        legacy: LegacyJobIcon.GNB,
        quest: QuestJobIcon.GNB,
      },
      rollIcon: {
        base: RollBaseImage.TANK,
        icon: RollIcon.TANK,
      },
    } as JobModel,
    {
      roll: Roll_JP.MELEE,
      name: {
        en: Job_EN.MNK,
        jp: Job_JP.MNK,
        en_abbreviation: Job_EN_Abbreviation.MNK,
      },
      jobIcon: {
        legacy: LegacyJobIcon.MNK,
        quest: QuestJobIcon.MNK,
      },
      rollIcon: {
        base: RollBaseImage.MELEE,
        icon: RollIcon.MELEE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MELEE,
      name: {
        en: Job_EN.DRG,
        jp: Job_JP.DRG,
        en_abbreviation: Job_EN_Abbreviation.DRG,
      },
      jobIcon: {
        legacy: LegacyJobIcon.DRG,
        quest: QuestJobIcon.DRG,
      },
      rollIcon: {
        base: RollBaseImage.MELEE,
        icon: RollIcon.MELEE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MELEE,
      name: {
        en: Job_EN.NIN,
        jp: Job_JP.NIN,
        en_abbreviation: Job_EN_Abbreviation.NIN,
      },
      jobIcon: {
        legacy: LegacyJobIcon.NIN,
        quest: QuestJobIcon.NIN,
      },
      rollIcon: {
        base: RollBaseImage.MELEE,
        icon: RollIcon.MELEE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MELEE,
      name: {
        en: Job_EN.SAM,
        jp: Job_JP.SAM,
        en_abbreviation: Job_EN_Abbreviation.SAM,
      },
      jobIcon: {
        legacy: LegacyJobIcon.SAM,
        quest: QuestJobIcon.SAM,
      },
      rollIcon: {
        base: RollBaseImage.MELEE,
        icon: RollIcon.MELEE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MELEE,
      name: {
        en: Job_EN.RPR,
        jp: Job_JP.RPR,
        en_abbreviation: Job_EN_Abbreviation.RPR,
      },
      jobIcon: {
        legacy: LegacyJobIcon.RPR,
        quest: QuestJobIcon.RPR,
      },
      rollIcon: {
        base: RollBaseImage.MELEE,
        icon: RollIcon.MELEE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MELEE,
      name: {
        en: Job_EN.VPR,
        jp: Job_JP.VPR,
        en_abbreviation: Job_EN_Abbreviation.VPR,
      },
      jobIcon: {
        legacy: LegacyJobIcon.VPR,
        quest: QuestJobIcon.VPR,
      },
      rollIcon: {
        base: RollBaseImage.MELEE,
        icon: RollIcon.MELEE,
      },
    } as JobModel,
    {
      roll: Roll_JP.PHYSICAL_RANGE,
      name: {
        en: Job_EN.BRD,
        jp: Job_JP.BRD,
        en_abbreviation: Job_EN_Abbreviation.BRD,
      },
      jobIcon: {
        legacy: LegacyJobIcon.BRD,
        quest: QuestJobIcon.BRD,
      },
      rollIcon: {
        base: RollBaseImage.PHYSICAL_RANGE,
        icon: RollIcon.PHYSICAL_RANGE,
      },
    } as JobModel,
    {
      roll: Roll_JP.PHYSICAL_RANGE,
      name: {
        en: Job_EN.MCH,
        jp: Job_JP.MCH,
        en_abbreviation: Job_EN_Abbreviation.MCH,
      },
      jobIcon: {
        legacy: LegacyJobIcon.MCH,
        quest: QuestJobIcon.MCH,
      },
      rollIcon: {
        base: RollBaseImage.PHYSICAL_RANGE,
        icon: RollIcon.PHYSICAL_RANGE,
      },
    } as JobModel,
    {
      roll: Roll_JP.PHYSICAL_RANGE,
      name: {
        en: Job_EN.DNC,
        jp: Job_JP.DNC,
        en_abbreviation: Job_EN_Abbreviation.DNC,
      },
      jobIcon: {
        legacy: LegacyJobIcon.DNC,
        quest: QuestJobIcon.DNC,
      },
      rollIcon: {
        base: RollBaseImage.PHYSICAL_RANGE,
        icon: RollIcon.PHYSICAL_RANGE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MAGICAL_RANGE,
      name: {
        en: Job_EN.BLM,
        jp: Job_JP.BLM,
        en_abbreviation: Job_EN_Abbreviation.BLM,
      },
      jobIcon: {
        legacy: LegacyJobIcon.BLM,
        quest: QuestJobIcon.BLM,
      },
      rollIcon: {
        base: RollBaseImage.MAGICAL_RANGE,
        icon: RollIcon.MAGICAL_RANGE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MAGICAL_RANGE,
      name: {
        en: Job_EN.SMN,
        jp: Job_JP.SMN,
        en_abbreviation: Job_EN_Abbreviation.SMN,
      },
      jobIcon: {
        legacy: LegacyJobIcon.SMN,
        quest: QuestJobIcon.SMN,
      },
      rollIcon: {
        base: RollBaseImage.MAGICAL_RANGE,
        icon: RollIcon.MAGICAL_RANGE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MAGICAL_RANGE,
      name: {
        en: Job_EN.RDM,
        jp: Job_JP.RDM,
        en_abbreviation: Job_EN_Abbreviation.RDM,
      },
      jobIcon: {
        legacy: LegacyJobIcon.RDM,
        quest: QuestJobIcon.RDM,
      },
      rollIcon: {
        base: RollBaseImage.MAGICAL_RANGE,
        icon: RollIcon.MAGICAL_RANGE,
      },
    } as JobModel,
    {
      roll: Roll_JP.MAGICAL_RANGE,
      name: {
        en: Job_EN.PCT,
        jp: Job_JP.PCT,
        en_abbreviation: Job_EN_Abbreviation.PCT,
      },
      jobIcon: {
        legacy: LegacyJobIcon.PCT,
        quest: QuestJobIcon.PCT,
      },
      rollIcon: {
        base: RollBaseImage.MAGICAL_RANGE,
        icon: RollIcon.MAGICAL_RANGE,
      },
    } as JobModel,
    {
      roll: Roll_JP.HEALER,
      name: {
        en: Job_EN.WHM,
        jp: Job_JP.WHM,
        en_abbreviation: Job_EN_Abbreviation.WHM,
      },
      jobIcon: {
        legacy: LegacyJobIcon.WHM,
        quest: QuestJobIcon.WHM,
      },
      rollIcon: {
        base: RollBaseImage.HEALER,
        icon: RollIcon.HEALER,
      },
    } as JobModel,
    {
      roll: Roll_JP.HEALER,
      name: {
        en: Job_EN.SCH,
        jp: Job_JP.SCH,
        en_abbreviation: Job_EN_Abbreviation.SCH,
      },
      jobIcon: {
        legacy: LegacyJobIcon.SCH,
        quest: QuestJobIcon.SCH,
      },
      rollIcon: {
        base: RollBaseImage.HEALER,
        icon: RollIcon.HEALER,
      },
    } as JobModel,
    {
      roll: Roll_JP.HEALER,
      name: {
        en: Job_EN.AST,
        jp: Job_JP.AST,
        en_abbreviation: Job_EN_Abbreviation.AST,
      },
      jobIcon: {
        legacy: LegacyJobIcon.AST,
        quest: QuestJobIcon.AST,
      },
      rollIcon: {
        base: RollBaseImage.HEALER,
        icon: RollIcon.HEALER,
      },
    } as JobModel,
    {
      roll: Roll_JP.HEALER,
      name: {
        en: Job_EN.SGE,
        jp: Job_JP.SGE,
        en_abbreviation: Job_EN_Abbreviation.SGE,
      },
      jobIcon: {
        legacy: LegacyJobIcon.SGE,
        quest: QuestJobIcon.SGE,
      },
      rollIcon: {
        base: RollBaseImage.HEALER,
        icon: RollIcon.HEALER,
      },
    } as JobModel,
  ];
}
