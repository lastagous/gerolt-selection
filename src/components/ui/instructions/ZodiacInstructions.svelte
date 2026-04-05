<script lang="ts">
  import type { Relation } from "../../../stores/progress";
  import { ITEM_NAMES, INSTANCE_NAMES } from "../../../data/lookup";

  export let step: Relation;
  export let stepIndex: number;
  export let steps: Relation[];

  const LODESTONE_BASE = "https://jp.finalfantasyxiv.com/lodestone/playguide/db/";

  function tooltipUrl(id: number, type: string, tooltips: any[]): string {
    const t = tooltips.find((x: any) => x.id === id && x.urlType === type);
    return `${LODESTONE_BASE}${type}/${t ? t.tooltipId + "/" : ""}`;
  }

  export let tooltips: any[] = [];

  function questUrl(id: number) { return tooltipUrl(id, "quest", tooltips); }
  function itemUrl(id: number) { return tooltipUrl(id, "item", tooltips); }
  function instanceUrl(id: number) { return tooltipUrl(id, "duty", tooltips); }

  function partial(id: number | string, type: string): string {
    const p = step.quests?.[0]?.partials?.find(
      (x: any) => String(x.id) === String(id) && x.type === type
    );
    return p?.obj?.n ?? String(id);
  }

  const jobJa = step.classJobCategory?.Name_ja ?? step.classJobCategory?.Name ?? "";

  // ゾディアックウェポンのマテリア
  const materiaMap: Record<string, string> = {
    PLD: "剛柔のマテリダ", WAR: "剛柔のマテリダ",
    WHM: "詠唱のマテリダ", SCH: "詠唱のマテリダ",
    MNK: "武略のマテリダ", DRG: "武略のマテリダ",
    NIN: "天眼のマテリダ", BRD: "天眼のマテリダ",
    BLM: "雄略のマテリダ", SMN: "雄略のマテリダ",
  };
  const materia = materiaMap[step.classJobCategory?.Name] ?? "";

  const atmas = [
    { name: "処女のアートマ", map: "中央森林" },
    { name: "人馬のアートマ", map: "北部森林" },
    { name: "磨羯のアートマ", map: "東部森林" },
    { name: "天蠍のアートマ", map: "南ザナラーン" },
    { name: "金牛のアートマ", map: "東ザナラーン" },
    { name: "天秤のアートマ", map: "中央ザナラーン" },
    { name: "双子のアートマ", map: "西ザナラーン" },
    { name: "双魚のアートマ", map: "低地ラノシア" },
    { name: "白羊のアートマ", map: "中央ラノシア" },
    { name: "宝瓶のアートマ", map: "高地ラノシア" },
    { name: "獅子のアートマ", map: "外地ラノシア" },
    { name: "巨蟹のアートマ", map: "西ラノシア" },
  ];

  const prevItems = stepIndex > 0 ? (steps[stepIndex - 1]?.items ?? []) : [];
</script>

{#if stepIndex === 0}
  <p>北部森林の{partial(step.quests?.[0]?.quest?.issuer, "npc")}から<a class="eorzeadb_link" href={questUrl(step.quests?.[0]?.quest?.id)} target="_blank" rel="noopener">{step.quests?.[0]?.quest?.name}</a>を受注する。</p>
  <hr class="border-gs-border my-2" />
  <p>朽ち果てた武器を入手し、{partial(step.quests?.[0]?.quest?.target, "npc")}に渡す。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[0])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[0], "item")}</a>に{materia}を 2 つ装着する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={instanceUrl(20019)} target="_blank" rel="noopener">{INSTANCE_NAMES[20019]}</a>をクリアする。</p>
  <p>アルミナ研粒を{partial(step.quests?.[0]?.quest?.target, "npc")}に渡す。</p>
  <p>レヴナンツトールでロウェナと会話する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={instanceUrl(14)} target="_blank" rel="noopener">{INSTANCE_NAMES[14]}</a>をクリアする。</p>
  <p>アムダプールの石版をロウェナに渡す。</p>
  <p>写本：トリストラムの本を{partial(step.quests?.[0]?.quest?.target, "npc")}に渡す。</p>
  <p><a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を入手する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を装備して指定のモンスター 24 体(8 体 + 8 体 + 8 体)を討伐する。</p>
  <p>{partial(step.quests?.[0]?.quest?.target, "npc")}に報告する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20020)} target="_blank" rel="noopener">{INSTANCE_NAMES[20020]}</a>をクリアする。</p>
  <p>{partial(step.quests?.[0]?.quest?.target, "npc")}に<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を渡す。</p>
  <hr class="border-gs-border my-2" />
  <p>{jobJa}で<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20004)} target="_blank" rel="noopener">{INSTANCE_NAMES[20004]}</a>をクリアする。</p>
  <p>{jobJa}で<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20005)} target="_blank" rel="noopener">{INSTANCE_NAMES[20005]}</a>をクリアする。</p>
  <p>{jobJa}で<a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[1])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[1], "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20006)} target="_blank" rel="noopener">{INSTANCE_NAMES[20006]}</a>をクリアする。</p>
  <p>{partial(step.quests?.[0]?.quest?.target, "npc")}にイフリートの炎、ガルーダの風、タイタンの黄土を渡す。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(step.quests?.[0]?.quest?.usedItems?.[2])} target="_blank" rel="noopener">{partial(step.quests?.[0]?.quest?.usedItems?.[2], "item")}</a>を 1 つ{partial(step.quests?.[0]?.quest?.target, "npc")}に渡す。</p>

{:else if stepIndex === 1}
  <p>ゲロルトの横にある武具職人の鍛冶炉に下記を入れる。</p>
  <ul class="list-disc list-inside space-y-1">
    {#each prevItems as item}
      <li><a class="eorzeadb_link" href={itemUrl(item.ID)} target="_blank" rel="noopener">{item.Name_ja}</a></li>
    {/each}
    <li><a class="eorzeadb_link" href={itemUrl(6268)} target="_blank" rel="noopener">{ITEM_NAMES[6268]}</a>を 3 つ</li>
  </ul>

{:else if stepIndex === 2}
  <p>1 本目作成時のみ、ゲロルトから<a class="eorzeadb_link" href={questUrl(66971)} target="_blank" rel="noopener">英雄の武器を求めて</a>を受注する。</p>
  <p>ジャルザーンに話しかけて<a class="eorzeadb_link" href={questUrl(66971)} target="_blank" rel="noopener">英雄の武器を求めて</a>をクリアする。</p>
  <p>※2 本目以降は直接アートマ集めをする。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(prevItems[0]?.ID)} target="_blank" rel="noopener">{prevItems[0]?.Name_ja}</a>を装備して各地の FATE をクリアし、アートマを入手する。</p>
  <p>12 種類のアートマをジャルザーンに渡す。</p>
  <hr class="border-gs-border my-2" />
  <table class="text-sm border-collapse border border-gs-border">
    <thead><tr><th class="border border-gs-border px-2 py-1">アートマ</th><th class="border border-gs-border px-2 py-1">場所</th></tr></thead>
    <tbody>
      {#each atmas as a}
        <tr><td class="border border-gs-border px-2 py-1">{a.name}</td><td class="border border-gs-border px-2 py-1">{a.map}</td></tr>
      {/each}
    </tbody>
  </table>

{:else if stepIndex === 3}
  <p>1 本目作成時のみ、ジャルザーンから<a class="eorzeadb_link" href={questUrl(66972)} target="_blank" rel="noopener">黄道十二文書</a>を受注する。</p>
  <p>レヴナンツトールのグ・ジュサナに話しかけて黄道十二文書を交換する。</p>
  <p>※2 本目以降は直接グ・ジュサナから黄道十二文書を交換する。</p>
  <hr class="border-gs-border my-2" />
  <p>グ・ジュサナから黄道十二文書を交換し、計 9 冊クリアする。</p>
  <hr class="border-gs-border my-2" />
  <p>ジャルザーンに話しかけ、アートマの強化を選択する。</p>

{:else if stepIndex === 4}
  <p>1 本目作成時のみ、ジャルザーンから<a class="eorzeadb_link" href={questUrl(66998)} target="_blank" rel="noopener">スフィアの輝き</a>を受注する。</p>
  <p>中央ザナラーンの狼煙の丘にいるウベールタンに話しかけて<a class="eorzeadb_link" href={itemUrl(7885)} target="_blank" rel="noopener">{ITEM_NAMES[7885]}</a>を 3 つ見せる。</p>
  <p>ウベールタンから<a class="eorzeadb_link" href={questUrl(67000)} target="_blank" rel="noopener">輝きは新星の如く</a>を受注する。</p>
  <p>ウベールタンに話しかけて<a class="eorzeadb_link" href={itemUrl(7885)} target="_blank" rel="noopener">{ITEM_NAMES[7885]}</a>を 3 つ渡し、スフィアスクロールを入手する。</p>
  <p>※2 本目以降は直接ウベールタンに話しかけて<a class="eorzeadb_link" href={itemUrl(7885)} target="_blank" rel="noopener">{ITEM_NAMES[7885]}</a>を 3 つ渡し、スフィアスクロールを入手する。</p>
  <hr class="border-gs-border my-2" />
  <p>所持品からスフィアスクロールを使用して、特定のマテリア 1 個と<a class="eorzeadb_link" href={itemUrl(7883)} target="_blank" rel="noopener">{ITEM_NAMES[7883]}</a> 1 個を使用して 75 回転写をする。</p>
  <hr class="border-gs-border my-2" />
  <p>ジャルザーンに話しかけ、アニムスの強化を選択する。</p>

{:else if stepIndex === 5}
  <p>1 本目作成時のみ、ジャルザーンから<a class="eorzeadb_link" href={questUrl(65742)} target="_blank" rel="noopener">器に込められた魂</a>を受注し、<a class="eorzeadb_link" href={itemUrl(8659)} target="_blank" rel="noopener">{ITEM_NAMES[8659]}</a>を入手する。</p>
  <p>※<a class="eorzeadb_link" href={itemUrl(8659)} target="_blank" rel="noopener">{ITEM_NAMES[8659]}</a>がない場合は、ゲロルトの隣のドレイクから入手する。</p>
  <hr class="border-gs-border my-2" />
  <p>ジャルザーンに話しかけて<a class="eorzeadb_link" href={itemUrl(prevItems[0]?.ID)} target="_blank" rel="noopener">{prevItems[0]?.Name_ja}</a>を絶霊化してもらう。</p>
  <p>※2 本目以降は直接ジャルザーンに話しかけて<a class="eorzeadb_link" href={itemUrl(prevItems[0]?.ID)} target="_blank" rel="noopener">{prevItems[0]?.Name_ja}</a>を絶霊化してもらう。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(prevItems[0]?.ID)} target="_blank" rel="noopener">{prevItems[0]?.Name_ja}</a>を装備して新生 ID や、討滅戦を周回する。</p>
  <hr class="border-gs-border my-2" />
  <p>所持品から<a class="eorzeadb_link" href={itemUrl(8659)} target="_blank" rel="noopener">{ITEM_NAMES[8659]}</a>を使用し、「魂が完全に定着したようだ。」と表示されたらジャルザーンに話しかけ、ノウスの強化を選択する。</p>

{:else if stepIndex === 6}
  <p>1 本目作成時のみ、ジャルザーンから<a class="eorzeadb_link" href={questUrl(65892)} target="_blank" rel="noopener">ゾディアックウェポン</a>を受注する。</p>
  <p>※2 本目以降はジャルザーンからゾディアックウェポンの再創造を選択して、4 つのアイテムをジャルザーンに渡す。</p>
  <hr class="border-gs-border my-2" />
  <p>下記のクエストをクリアして入手できる 4 つのアイテムをゲロルトに渡す。</p>
  <ul class="list-disc list-inside space-y-1">
    <li><a class="eorzeadb_link" href={questUrl(65893)} target="_blank" rel="noopener">パパナ借金道</a></li>
    <li><a class="eorzeadb_link" href={questUrl(65894)} target="_blank" rel="noopener">真摯なる職人の挑戦</a></li>
    <li><a class="eorzeadb_link" href={questUrl(65895)} target="_blank" rel="noopener">情熱と夢を込めて</a></li>
    <li><a class="eorzeadb_link" href={questUrl(65896)} target="_blank" rel="noopener">母の想い、息子の願い</a></li>
  </ul>
  <hr class="border-gs-border my-2" />
  <h4 class="font-semibold mt-2"><a class="eorzeadb_link" href={questUrl(65893)} target="_blank" rel="noopener">パパナ借金道</a></h4>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li>トレードアイテム
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9538)} target="_blank" rel="noopener">{ITEM_NAMES[9538]}</a>、<a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(13)} target="_blank" rel="noopener">{INSTANCE_NAMES[13]}</a>をクリアして入手できるバトラールの角、<a class="eorzeadb_link" href={instanceUrl(20)} target="_blank" rel="noopener">{INSTANCE_NAMES[20]}</a>をクリアして入手できるVI号ゴブリ鋼板を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(21)} target="_blank" rel="noopener">{INSTANCE_NAMES[21]}</a>をクリアして入手できるナラシンハの皮膜、<a class="eorzeadb_link" href={instanceUrl(27)} target="_blank" rel="noopener">{INSTANCE_NAMES[27]}</a>をクリアして入手できるフェンリルの牙を渡す。</p>
    </li>
    <li>クラフター制作、マケボ
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9510)} target="_blank" rel="noopener">{ITEM_NAMES[9510]}</a>(HQ)、<a class="eorzeadb_link" href={itemUrl(9511)} target="_blank" rel="noopener">{ITEM_NAMES[9511]}</a>(HQ)を渡す。</p>
    </li>
  </ol>
  <hr class="border-gs-border my-2" />
  <h4 class="font-semibold mt-2"><a class="eorzeadb_link" href={questUrl(65894)} target="_blank" rel="noopener">真摯なる職人の挑戦</a></h4>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li>トレードアイテム
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9542)} target="_blank" rel="noopener">{ITEM_NAMES[9542]}</a>を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(5)} target="_blank" rel="noopener">{INSTANCE_NAMES[5]}</a>をクリアして入手できる黄輝石、<a class="eorzeadb_link" href={instanceUrl(19)} target="_blank" rel="noopener">{INSTANCE_NAMES[19]}</a>をクリアして入手できる妖異の魔布を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(22)} target="_blank" rel="noopener">{INSTANCE_NAMES[22]}</a>をクリアして入手できるアムダプールの紙片、<a class="eorzeadb_link" href={instanceUrl(28)} target="_blank" rel="noopener">{INSTANCE_NAMES[28]}</a>をクリアして入手できる蒼茫玉を渡す。</p>
    </li>
    <li>クラフター制作、マケボ
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9512)} target="_blank" rel="noopener">{ITEM_NAMES[9512]}</a>(HQ)、<a class="eorzeadb_link" href={itemUrl(9513)} target="_blank" rel="noopener">{ITEM_NAMES[9513]}</a>(HQ)を渡す。</p>
    </li>
    <li>トレードアイテム
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>を渡す。</p>
    </li>
  </ol>
  <hr class="border-gs-border my-2" />
  <h4 class="font-semibold mt-2"><a class="eorzeadb_link" href={questUrl(65895)} target="_blank" rel="noopener">情熱と夢を込めて</a></h4>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(10)} target="_blank" rel="noopener">{INSTANCE_NAMES[10]}</a>をクリアして入手できるトンベリ王の血を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(18)} target="_blank" rel="noopener">{INSTANCE_NAMES[18]}</a>をクリアして入手できる巌窟王の血玉を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(23)} target="_blank" rel="noopener">{INSTANCE_NAMES[23]}</a>をクリアして入手できる大王烏賊の血を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(26)} target="_blank" rel="noopener">{INSTANCE_NAMES[26]}</a>をクリアして入手できる古代王の血を渡す。</p>
    </li>
    <li>クラフター制作、マケボ
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9514)} target="_blank" rel="noopener">{ITEM_NAMES[9514]}</a>(HQ)、<a class="eorzeadb_link" href={itemUrl(9515)} target="_blank" rel="noopener">{ITEM_NAMES[9515]}</a>(HQ)を渡す。</p>
    </li>
    <li>トレードアイテム
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>、<a class="eorzeadb_link" href={itemUrl(9543)} target="_blank" rel="noopener">{ITEM_NAMES[9543]}</a>を渡す。</p>
    </li>
  </ol>
  <hr class="border-gs-border my-2" />
  <h4 class="font-semibold mt-2"><a class="eorzeadb_link" href={questUrl(65896)} target="_blank" rel="noopener">母の想い、息子の願い</a></h4>
  <ol class="list-decimal list-inside space-y-1 ml-2">
    <li>トレードアイテム
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>、<a class="eorzeadb_link" href={itemUrl(9544)} target="_blank" rel="noopener">{ITEM_NAMES[9544]}</a>を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(14)} target="_blank" rel="noopener">{INSTANCE_NAMES[14]}</a>をクリアして入手できる古城のお宝、<a class="eorzeadb_link" href={instanceUrl(17)} target="_blank" rel="noopener">{INSTANCE_NAMES[17]}</a>をクリアして入手できる大灯台のお宝、<a class="eorzeadb_link" href={instanceUrl(24)} target="_blank" rel="noopener">{INSTANCE_NAMES[24]}</a>をクリアして入手できる地下墓所のお宝を渡す。</p>
    </li>
    <li>ID 攻略
      <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(25)} target="_blank" rel="noopener">{INSTANCE_NAMES[25]}</a>をクリアして入手できる対竜要塞のお宝を渡す。</p>
    </li>
    <li>クラフター制作、マケボ
      <p class="ml-4"><a class="eorzeadb_link" href={itemUrl(9516)} target="_blank" rel="noopener">{ITEM_NAMES[9516]}</a>(HQ)、<a class="eorzeadb_link" href={itemUrl(9517)} target="_blank" rel="noopener">{ITEM_NAMES[9517]}</a>(HQ)を渡す。</p>
    </li>
  </ol>

{:else if stepIndex === 7}
  <p>1 本目作成時のみ、ジャルザーンから<a class="eorzeadb_link" href={questUrl(66096)} target="_blank" rel="noopener">目覚めし力</a>を受注し、スウィフトパーチ入植地へ移動する。</p>
  <p>※2 本目以降は直接スウィフトパーチ入植地へ移動する。</p>
  <hr class="border-gs-border my-2" />
  <p>レモンからマハトマを入手する。</p>
  <hr class="border-gs-border my-2" />
  <p><a class="eorzeadb_link" href={itemUrl(prevItems[0]?.ID)} target="_blank" rel="noopener">{prevItems[0]?.Name_ja}</a>を装備して新生 ID や、討滅戦を周回する。</p>
  <hr class="border-gs-border my-2" />
  <p>マハトマ 12 個分輝きを溜める。</p>
  <hr class="border-gs-border my-2" />
  <p>ジャルザーンに話しかけ、「ゾディアックウェポン」の再創造を選択する。</p>
{/if}
