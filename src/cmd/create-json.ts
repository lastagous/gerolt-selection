import {
  Achievement,
  Instance,
  Item,
  Npc,
  Quest,
  Relation,
  SummaryAchievement,
  SummaryInstance,
  SummaryQuest,
  Tooltip,
  // UrlType,
} from 'src/types/json-index';
import * as fs from 'fs';
import superagent from 'superagent';
import cheerio from 'cheerio';
// https://github.com/karashiiro/garlandtools-api
const garlandtools = require('garlandtools-api');
garlandtools.setLang('ja');
const XIVAPI = require('@xivapi/js');
const xivapi = new XIVAPI({ language: 'ja' });

const summaryAchievements = async () => {
  // (t == 62) === relic weapon
  // (t == 63) === zodiac weapon
  // (t == 64) === anima weapon
  // (t == 66) === eureka weapon
  // (t == 68) === resistance weapon
  // (t == 75) === manderville weapon
  const fetchAchievements = ((await garlandtools.achievements()) as SummaryAchievement[]).filter(
    (a) => a.t == 62 || a.t == 63 || a.t == 64 || a.t == 66 || a.t == 68 || a.t == 75
  );

  // [info] require relative path 'root' is this file in folder
  const localAchivements = require('../assets/data/garlandtools/summary-achievements.json') as SummaryAchievement[];

  if (fetchAchievements != localAchivements) {
    const jsonString = JSON.stringify(fetchAchievements, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync('src/assets/data/garlandtools/summary-achievements.json', jsonString);
  }
};

const achievements = async () => {
  // [info] require relative path 'root' is this file in folder
  const summaryAchievements = require('../assets/data/garlandtools/summary-achievements.json') as SummaryAchievement[];
  const achievements: Achievement[] = [];
  for (let summaryAchievement of summaryAchievements) {
    const result = await garlandtools.achievement(summaryAchievement.i);
    achievements.push(result);
  }
  const jsonString = JSON.stringify(achievements, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/garlandtools/achievements.json', jsonString);
};

const summaryQuests = async () => {
  // (g == 149-158) === zw job quest
  // (g == 74) === zodiac weapon
  // (g == 75) === anima weapon
  // (g == 76) === eureka weapon
  // (g == 77) === resistance weapon
  // (g == 73) === manderville weapon
  const fetchQuests = ((await garlandtools.quests()) as SummaryQuest[]).filter(
    (a) => (a.g >= 149 && a.g <= 158) || (a.g >= 73 && a.g <= 77)
  );

  // [info] require relative path 'root' is this file in folder
  const localQuests = require('../assets/data/garlandtools/summary-quests.json') as SummaryQuest[];

  if (fetchQuests != localQuests) {
    const jsonString = JSON.stringify(fetchQuests, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync('src/assets/data/garlandtools/summary-quests.json', jsonString);
  }
};

const quests = async () => {
  // [info] require relative path 'root' is this file in folder
  const summaryQuests = require('../assets/data/garlandtools/summary-quests.json') as SummaryQuest[];
  const quests: Quest[] = [];
  for (let summaryQuest of summaryQuests) {
    const result = await garlandtools.quest(summaryQuest.i);
    quests.push(result);
  }
  const jsonString = JSON.stringify(quests, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/garlandtools/quests.json', jsonString);
};

const npcs = async () => {
  // [info] require relative path 'root' is this file in folder
  const quests = require('../assets/data/garlandtools/quests.json') as Quest[];
  const npcs: Npc[] = [];
  for (let quest of quests) {
    if (!npcs.find((npc) => npc.npc.id === quest.quest.issuer) && quest.quest.issuer) {
      const issuer = await garlandtools.npc(quest.quest.issuer);
      npcs.push(issuer);
    }
    if (!npcs.find((npc) => npc.npc.id === quest.quest.target) && quest.quest.target) {
      const target = await garlandtools.npc(quest.quest.target);
      npcs.push(target);
    }
  }
  const jsonString = JSON.stringify(npcs, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/garlandtools/npcs.json', jsonString);
};

const summaryInstances = async () => {
  const fetchInstances = ((await garlandtools.instances()) as SummaryInstance[]).filter(
    (a) => a.t == 'ダンジョン' || a.t == '討伐・討滅戦'
  );

  // [info] require relative path 'root' is this file in folder
  const localInstances = require('../assets/data/garlandtools/summary-instances.json') as SummaryInstance[];

  if (fetchInstances != localInstances) {
    const jsonString = JSON.stringify(fetchInstances, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync('src/assets/data/garlandtools/summary-instances.json', jsonString);
  }
};

const instances = async () => {
  // [info] require relative path 'root' is this file in folder
  const summaryinstances = require('../assets/data/garlandtools/summary-instances.json') as SummaryInstance[];
  const instances: Instance[] = [];
  for (let summaryinstance of summaryinstances) {
    const result = await garlandtools.instance(summaryinstance.i);
    instances.push(result);
  }
  const jsonString = JSON.stringify(instances, null, 2);
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/garlandtools/instances.json', jsonString);
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
    '[エウレカウェポン完成形]',
    '[エウレカウェポン・カスタム]',
  ].forEach((queryDescription) => {
    query.body.query.bool.should.push({
      match: {
        Description_ja: queryDescription,
      },
    });
  });

  [
    '剛柔のマテリダ',
    '詠唱のマテリダ',
    '武略のマテリダ',
    '天眼のマテリダ',
    '雄略のマテリダ',
    'サベネアの霊薬',
    '処女のアートマ',
    '人馬のアートマ',
    '磨羯のアートマ',
    '天蠍のアートマ',
    '金牛のアートマ',
    '天秤のアートマ',
    '双子のアートマ',
    '双魚のアートマ',
    '白羊のアートマ',
    '宝瓶のアートマ',
    '獅子のアートマ',
    '巨蟹のアートマ',
    'アレキサンドライト',
    'クリスタルサンド',
    '硬霊性岩',
    '乱属性クリスタル',
    'パズズの羽根',
    '乱属性クリスタル【氷】',
    'パゴスクリスタル',
    'ロウヒの氷片',
    'ピューロスクリスタル',
    'ペンテシレイアの種火',
    'ヒュダトスクリスタル',
    '水晶龍の鱗',
    'エウレカの断片',
  ].forEach((queryName) => {
    query.body.query.bool.should.push({
      match: {
        Name_ja: queryName,
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
  const achievements = require('../assets/data/garlandtools/achievements.json') as Achievement[];

  const resultRelations: Relation[] = [];
  const resultPaladins: Relation[] = [];

  items.forEach((item) => {
    if (!item.ClassJobCategory.Name) return;
    if (!item.EquipSlotCategory.MainHand && !item.EquipSlotCategory.OffHand) return;
    if (item.Name_ja.includes('未完の')) return;

    const result = {
      classJobCategory: item.ClassJobCategory,
      quests: quests.filter((quest) => quest.quest.reward?.items?.some((i: { id: number }) => i.id == item.ID)),
      items: [item],
      achievements: achievements.filter((achievement) => {
        const regex = new RegExp(`.*：.*${item.Name_ja}{1}$|.*：${item.Name_ja}{1}＆.*`);
        return regex.test(achievement.achievement.name);
      }),
    } as Relation;

    if (item.LevelEquip == 50) {
      if (item.Description_ja == '[古の武器・アニムス]') {
        const achievement = achievements.find((achievemnt) => achievemnt.achievement.id == 925);
        if (achievement) {
          result.achievements.push(achievement);
        }
      } else if (item.Description_ja == '[古の武器・ノウス]') {
        const achievement = achievements.find((achievemnt) => achievemnt.achievement.id == 926);
        if (achievement) {
          result.achievements.push(achievement);
        }
      } else if (item.Description_ja == '[古の武器・ネクサス]') {
        const achievement = achievements.find((achievemnt) => achievemnt.achievement.id == 1028);
        if (achievement) {
          result.achievements.push(achievement);
        }
      } else if (item.Description_ja == '[ゾディアックウェポン]') {
        const achievement = achievements.find((achievemnt) => achievemnt.achievement.id == 1054);
        if (achievement) {
          result.achievements.push(achievement);
        }
      } else if (item.Description_ja == '[ゾディアックウェポン・ゼータ]') {
        const achievement = achievements.find((achievemnt) => achievemnt.achievement.id == 1081);
        if (achievement) {
          result.achievements.push(achievement);
        }
      }
    }

    if (item.ClassJobCategory.Name == 'PLD') {
      resultPaladins.push(result);
    } else {
      resultRelations.push(result);
    }
  });

  for (let i = 0; i < resultPaladins.length; i = i + 2) {
    const paladin = resultPaladins[i];
    try {
      paladin.items.push(resultPaladins[i + 1].items[0]);
    } catch (e) {
      console.log(resultPaladins.map((r) => r.items.map((i) => i.Name_ja)));
    }
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
      achievements: resultRelation.achievements.map((achievement) => achievement.achievement.name),
    });
  });
  // [info] fs relative path 'root' is execute command in folder
  fs.writeFileSync('src/assets/data/local/confirm.json', JSON.stringify(confirm, null, 2));
};

const tooltips = async () => {
  const items = require('../assets/data/xivapi/items.json') as Item[];
  const quests = require('../assets/data/garlandtools/quests.json') as Quest[];
  const achievements = require('../assets/data/garlandtools/achievements.json') as Achievement[];
  const instances = require('../assets/data/garlandtools/instances.json') as Instance[];
  const npcs = require('../assets/data/garlandtools/npcs.json') as Npc[];
  // The information registered in tooltips is not queried, so if new information is required, set tooltips to just an empty array.
  const tooltips = require('../assets/data/local/tooltips.json') as Tooltip[];
  const urlBase = 'https://jp.finalfantasyxiv.com/lodestone/playguide/db/';

  for (let item of items) {
    if (tooltips.find((tooltip) => tooltip.id == item.ID && tooltip.urlType == 'item')) continue;
    let tooltipId;
    if (item.ID === 21801) tooltipId = '1ddb5737b30';
    else if (item.ID === 24124) tooltipId = '86667932f8f';
    else if (item.ID === 24807) tooltipId = 'b368a0d7052';
    else if (item.ID === 24808) tooltipId = 'ad7f17e57e6';
    else {
      const url = `${urlBase}item/?&${[
        'db_search_category=item',
        `category2=${item.EquipSlotCategory ? (item.EquipSlotCategory.MainHand == 1 ? 1 : 3) : ''}`,
        `min_item_lv=${item.EquipSlotCategory ? item.LevelItem : ''}`,
        `max_item_lv=${item.EquipSlotCategory ? item.LevelItem : ''}`,
        `min_gear_lv=${item.EquipSlotCategory ? item.LevelEquip : ''}`,
        `max_gear_lv=${item.EquipSlotCategory ? item.LevelEquip : ''}`,
        `q=${encodeURIComponent(item.Name_ja)}`,
      ].join('&')}`;
      let page;
      try {
        page = await superagent.get(url);
      } catch (e) {
        console.log(`superagent.get(): failed. Wait 10 seconds and try again.`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        page = await superagent.get(url);
      }

      const $ = cheerio.load(page.text);
      tooltipId = $('.db-table__txt--detail_link').attr('href')?.split('/')[5];
    }

    console.log(`${item.Name_ja} -> ${tooltipId}`);

    if (!tooltipId) continue;
    tooltips.push({
      urlType: 'item',
      id: item.ID,
      tooltipId: tooltipId,
    } as Tooltip);

    const jsonString = JSON.stringify(tooltips, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync('src/assets/data/local/tooltips.json', jsonString);
  }

  for (let quest of quests) {
    if (tooltips.find((tooltip) => tooltip.id == quest.quest.id && tooltip.urlType == 'quest')) continue;
    const url = `${urlBase}quest/?&${['db_search_category=quest', `q=${encodeURIComponent(quest.quest.name)}`].join(
      '&'
    )}`;
    let page;
    try {
      page = await superagent.get(url);
    } catch (e) {
      console.log(`superagent.get(): failed. Wait 10 seconds and try again.`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      page = await superagent.get(url);
    }
    const $ = cheerio.load(page.text);
    const tooltipId = $('.db-table__txt--detail_link').attr('href')?.split('/')[5];
    console.log(`${quest.quest.name} -> ${tooltipId}`);

    if (!tooltipId) continue;
    tooltips.push({
      urlType: 'quest',
      id: quest.quest.id,
      tooltipId: tooltipId,
    } as Tooltip);

    const jsonString = JSON.stringify(tooltips, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync('src/assets/data/local/tooltips.json', jsonString);
  }

  for (let achievement of achievements) {
    if (tooltips.find((tooltip) => tooltip.id == achievement.achievement.id && tooltip.urlType == 'achievement'))
      continue;
    const url = `${urlBase}achievement/?&${[
      'db_search_category=achievement',
      `q=${encodeURIComponent(achievement.achievement.name)}`,
    ].join('&')}`;
    let page;
    try {
      page = await superagent.get(url);
    } catch (e) {
      console.log(`superagent.get(): failed. Wait 10 seconds and try again.`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      page = await superagent.get(url);
    }
    const $ = cheerio.load(page.text);
    const tooltipId = $('.db-table__txt--detail_link').attr('href')?.split('/')[5];
    console.log(`${achievement.achievement.name} -> ${tooltipId}`);

    if (!tooltipId) continue;
    tooltips.push({
      urlType: 'achievement',
      id: achievement.achievement.id,
      tooltipId: tooltipId,
    } as Tooltip);

    const jsonString = JSON.stringify(tooltips, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync('src/assets/data/local/tooltips.json', jsonString);
  }

  for (let instance of instances) {
    if (tooltips.find((tooltip) => tooltip.id == instance.instance.id && tooltip.urlType == 'duty')) continue;
    const url = `${urlBase}duty/?&${[
      'db_search_category=duty',
      `min_lv=${instance.instance.min_lvl}`,
      `max_lv=${instance.instance.max_lvl}`,
      `q=${encodeURIComponent(instance.instance.name.replace(/\(.+?\)/, ''))}`,
    ].join('&')}`;
    let page;
    try {
      page = await superagent.get(url);
    } catch (e) {
      console.log(`superagent.get(): failed. Wait 10 seconds and try again.`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      page = await superagent.get(url);
    }
    const $ = cheerio.load(page.text);
    const tooltipId = $('.db-table__txt--detail_link').attr('href')?.split('/')[5];
    console.log(`${instance.instance.name} -> ${tooltipId}`);

    if (!tooltipId) continue;
    tooltips.push({
      urlType: 'duty',
      id: instance.instance.id,
      tooltipId: tooltipId,
    } as Tooltip);

    const jsonString = JSON.stringify(tooltips, null, 2);
    // [info] fs relative path 'root' is execute command in folder
    fs.writeFileSync('src/assets/data/local/tooltips.json', jsonString);
  }
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
    case 'npcs':
      await npcs();
      break;
    case 'instances':
      await summaryInstances();
      await instances();
      break;
    case 'items':
      await items();
      break;
    case 'relations':
      await relations();
      break;
    case 'tooltips':
      await tooltips();
      break;
    case 'all':
      await summaryAchievements();
      await achievements();
      await summaryQuests();
      await quests();
      await items();
      await tooltips();
      await relations();
      break;
  }
};

main();
