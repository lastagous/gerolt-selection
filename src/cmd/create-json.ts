import {
  Achievement,
  Item,
  Quest,
  Relation,
  SummaryAchievement,
  SummaryQuest,
} from 'src/types/json-index';
import * as fs from 'fs';
const garlandtools = require('garlandtools-api');
garlandtools.setLang('ja');
const XIVAPI = require('@xivapi/js');
const xivapi = new XIVAPI({ language: 'ja' });

const summaryAchievements = async () => {
  // (t == 63) === zodiac weapon
  // (t == 64) === anima weapon
  // (t == 66) === eureka weapon
  // (t == 68) === resistance weapon
  // (t == 75) === manderville weapon
  const fetchAchievements = (
    (await garlandtools.achievements()) as SummaryAchievement[]
  ).filter(
    (a) => a.t == 63 || a.t == 64 || a.t == 66 || a.t == 68 || a.t == 75
  );

  // [info] require relative path 'root' is this file in folder
  const localAchivements =
    require('../assets/data/garlandtools/summary-achievements.json') as SummaryAchievement[];

  if (fetchAchievements != localAchivements) {
    const jsonString = JSON.stringify(fetchAchievements, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync(
      'src/assets/data/garlandtools/summary-achievements.json',
      jsonString
    );
  }
};

const achievements = async () => {
  // [info] require relative path 'root' is this file in folder
  const summaryAchievements =
    require('../assets/data/garlandtools/summary-achievements.json') as SummaryAchievement[];
  const achievements: Achievement[] = [];
  for (let summaryAchievement of summaryAchievements) {
    const result = await garlandtools.achievement(summaryAchievement.i);
    achievements.push(result);
  }
  const jsonString = JSON.stringify(achievements, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync(
    'src/assets/data/garlandtools/achievements.json',
    jsonString
  );
};

const summaryQuests = async () => {
  // (g == 74) === zodiac weapon
  // (g == 75) === anima weapon
  // (g == 76) === eureka weapon
  // (g == 77) === resistance weapon
  // (g == 73) === manderville weapon
  const fetchQuests = ((await garlandtools.quests()) as SummaryQuest[]).filter(
    (a) => a.g == 74 || a.g == 75 || a.g == 76 || a.g == 77 || a.g == 73
  );

  // [info] require relative path 'root' is this file in folder
  const localQuests =
    require('../assets/data/garlandtools/summary-quests.json') as SummaryQuest[];

  if (fetchQuests != localQuests) {
    const jsonString = JSON.stringify(fetchQuests, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync(
      'src/assets/data/garlandtools/summary-quests.json',
      jsonString
    );
  }
};

const quests = async () => {
  // [info] require relative path 'root' is this file in folder
  const summaryQuests =
    require('../assets/data/garlandtools/summary-quests.json') as SummaryQuest[];
  const quests: Quest[] = [];
  for (let summaryQuest of summaryQuests) {
    const result = await garlandtools.quest(summaryQuest.i);
    quests.push(result);
  }
  const jsonString = JSON.stringify(quests, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/garlandtools/quests.json', jsonString);
};

const items = async () => {
  // [info] require relative path 'root' is this file in folder
  const quests = require('../assets/data/garlandtools/quests.json') as Quest[];
  const query = require('../assets/elasticsearch/xivapi-item.json');

  quests.forEach((quest) => {
    quest.quest.usedItems?.forEach((usedItem) => {
      query.body.query.bool.should.push({
        match: {
          ID: usedItem,
        },
      });
    });
    quest.quest.reward?.items?.forEach((item: any) => {
      query.body.query.bool.should.push({
        match: {
          ID: item.id,
        },
      });
    });
  });

  [
    '[古の武器]',
    '[古の武器・ゼニス]',
    '[古の武器・アートマ]',
    '[古の武器・アニムス]',
    '[古の武器・ノウス]',
    '[古の武器・ネクサス]',
    '[ゾディアックウェポン]',
    '[ゾディアックウェポン・ゼータ]',
    '[エウレカウェポン]',
    '[エウレカウェポン+1]',
    '[エウレカウェポン+2]',
    '[エウレカウェポン・アネモス]',
    '[エウレカウェポン・パゴス]',
    '[エウレカウェポン・パゴス+1]',
    '[エウレカウェポン・エレメンタル]',
    '[エウレカウェポン・エレメンタル+1]',
    '[エウレカウェポン・エレメンタル+2]',
    '[エウレカウェポン・ピューロス]',
    '[エウレカウェポン・ヒュダトス]',
    '[エウレカウェポン・ヒュダトス+1]',
    '[新たなエウレカウェポン]',
    '[エウレカウェポン完成系]',
    '[エウレカウェポンカスタム]',
  ].forEach((queryDescription) => {
    query.body.query.bool.should.push({
      match: {
        Description_ja: queryDescription,
      },
    });
  });

  const item = await xivapi.search(query, {
    indexes: 'item',
    columns: [
      'ClassJobCategory.Name',
      'ClassJobCategory.Name_de',
      'ClassJobCategory.Name_en',
      'ClassJobCategory.Name_fr',
      'ClassJobCategory.Name_ja',
      'Description_ja',
      'EquipSlotCategory',
      'ID',
      'Icon',
      'IconID',
      'LevelEquip',
      'LevelItem',
      'Name',
      'Name_de',
      'Name_en',
      'Name_fr',
      'Name_ja',
      'Patch',
      'Url',
      'UrlType',
    ].join(','),
  });
  const jsonString = JSON.stringify(item.Results, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/xivapi/items.json', jsonString);
};

const relations = () => {
  // [info] require relative path 'root' is this file in folder
  const items = require('../assets/data/xivapi/items.json') as Item[];
  const quests = require('../assets/data/garlandtools/quests.json') as Quest[];
  const achievements =
    require('../assets/data/garlandtools/achievements.json') as Achievement[];

  const resultRelations: Relation[] = [];
  const resultPaladins: Relation[] = [];

  items.forEach((item) => {
    if (!item.ClassJobCategory.Name) return;
    if (!item.EquipSlotCategory.MainHand && !item.EquipSlotCategory.OffHand)
      return;

    if (item.ClassJobCategory.Name == 'PLD') {
      resultPaladins.push({
        classJobCategory: item.ClassJobCategory,
        quests: quests.filter((quest) =>
          quest.quest.reward?.items?.some(
            (i: { id: number }) => i.id == item.ID
          )
        ),
        items: [item],
        achievements: achievements.filter((achievement) => {
          const regex = new RegExp(
            `.*：.*${item.Name_ja}{1}$|.*：${item.Name_ja}{1}＆.*`
          );
          return regex.test(achievement.achievement.name);
        }),
      });
    } else {
      resultRelations.push({
        classJobCategory: item.ClassJobCategory,
        quests: quests.filter((quest) =>
          quest.quest.reward?.items?.some(
            (i: { id: number }) => i.id == item.ID
          )
        ),
        items: [item],
        achievements: achievements.filter((achievement) => {
          const regex = new RegExp(
            `.*：.*${item.Name_ja}{1}$|.*：${item.Name_ja}{1}＆.*`
          );
          return regex.test(achievement.achievement.name);
        }),
      });
    }
  });

  for (let i = 0; i < resultPaladins.length; i = i + 2) {
    const paladin = resultPaladins[i];
    paladin.items.push(resultPaladins[i + 1].items[0]);
    resultRelations.push(paladin);
  }

  const jsonString = JSON.stringify(resultRelations, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/local/relations.json', jsonString);

  const confirm: any[] = [];
  resultRelations.forEach((resultRelation) => {
    confirm.push({
      classJobCategory: resultRelation.classJobCategory.Name_ja,
      description: resultRelation.items[0].Description_ja,
      items: resultRelation.items.map((item) => item.Name_ja),
      quests: resultRelation.quests.map((quest) => quest.quest.name),
      achievements: resultRelation.achievements.map(
        (achievement) => achievement.achievement.name
      ),
    });
  });
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync(
    'src/assets/data/local/confirm.json',
    JSON.stringify(confirm)
  );
};

const main = async () => {
  switch (process.argv[2]) {
    case 'achievements':
      await summaryAchievements();
      await achievements();
      break;
    case 'quests':
      await summaryQuests();
      await quests();
      break;
    case 'items':
      await items();
      break;
    case 'relations':
      await relations();
      break;
    case 'all':
      await summaryAchievements();
      await achievements();
      await summaryQuests();
      await quests();
      await items();
      await relations();
      break;
  }
};

main();
