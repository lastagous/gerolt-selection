export class Util {
  public static getJobs(weapon: string): string[] {
    switch (weapon) {
      case 'ZW':
        return ['PLD', 'WAR', 'WHM', 'SCH', 'MNK', 'DRG', 'NIN', 'BRD', 'BLM', 'SMN'];
      case 'AW':
        return ['PLD', 'WAR', 'DRK', 'WHM', 'SCH', 'AST', 'MNK', 'DRG', 'NIN', 'BRD', 'MCH', 'BLM', 'SMN'];
      case 'EW':
        return [
          'PLD',
          'WAR',
          'DRK',
          'WHM',
          'SCH',
          'AST',
          'MNK',
          'DRG',
          'NIN',
          'SAM',
          'BRD',
          'MCH',
          'BLM',
          'SMN',
          'RDM',
        ];
      case 'RW':
        return [
          'PLD',
          'WAR',
          'DRK',
          'GNB',
          'WHM',
          'SCH',
          'AST',
          'MNK',
          'DRG',
          'NIN',
          'SAM',
          'BRD',
          'MCH',
          'DNC',
          'BLM',
          'SMN',
          'RDM',
        ];
      case 'MW':
        return [
          'PLD',
          'WAR',
          'DRK',
          'GNB',
          'WHM',
          'SCH',
          'AST',
          'SGE',
          'MNK',
          'DRG',
          'NIN',
          'SAM',
          'RPR',
          'BRD',
          'MCH',
          'DNC',
          'BLM',
          'SMN',
          'RDM',
        ];
      default:
        return [];
    }
  }

  public static getLevel(weapon: string): number {
    switch (weapon) {
      case 'ZW':
        return 50;
      case 'AW':
        return 60;
      case 'EW':
        return 70;
      case 'RW':
        return 80;
      case 'MW':
        return 90;
      default:
        return 0;
    }
  }
}
