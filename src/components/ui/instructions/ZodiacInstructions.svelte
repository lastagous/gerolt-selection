<script context="module">
  let _cache = null;
  let _loadPromise = null;

  function getZwData() {
    if (_cache) return Promise.resolve(_cache);
    if (!_loadPromise) {
      _loadPromise = Promise.all([
        fetch("/data/zw/quests.json").then(r => r.json()),
        fetch("/data/zw/atmas.json").then(r => r.json()),
        fetch("/data/zw/steps.json").then(r => r.json()),
      ]).then(([quests, atmas, steps]) => {
        _cache = { quests, atmas, steps };
        return _cache;
      });
    }
    return _loadPromise;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { ITEM_NAMES, INSTANCE_NAMES, ITEM_ICONS, makeHelpers, iconUrl, questUrl, itemUrl, instanceUrl } from "./_helpers.js";
  import { loadCurrencies } from "../../../stores/currencies.js";

  export let step;
  export let stepIndex;
  export let steps;
  export let job;

  $: ({ partial, itemIconUrl, questIconUrl, buildPrevItemLinks } = makeHelpers(step));
  $: jobJa = step.jobNameJa ?? "";
  $: prevItemLinks = buildPrevItemLinks(steps, stepIndex);

  function iIcon(id) { return ITEM_ICONS[id] ? iconUrl(ITEM_ICONS[id]) : ""; }

  const materiaMap = {
    PLD: "剛柔のマテリダ", WAR: "剛柔のマテリダ",
    WHM: "詠唱のマテリダ", SCH: "詠唱のマテリダ",
    MNK: "武略のマテリダ", DRG: "武略のマテリダ",
    NIN: "天眼のマテリダ", BRD: "天眼のマテリダ",
    BLM: "雄略のマテリダ", SMN: "雄略のマテリダ",
  };
  $: materia = materiaMap[job] ?? "";

  let zwQuests = {};
  let atmas = [];
  let zwStepsData = [];
  let currencies = null;
  let loaded = false;

  onMount(async () => {
    const [d, cur] = await Promise.all([getZwData(), loadCurrencies()]);
    zwQuests = d.quests;
    atmas = d.atmas;
    zwStepsData = d.steps;
    currencies = cur;
    loaded = true;
  });

  function qIcon(id) { return zwQuests[id] ? iconUrl(zwQuests[id].iconId) : ""; }
  function qName(id) { return zwQuests[id]?.name ?? `クエスト #${id}`; }

  $: prevItems = stepIndex > 0 ? (steps[stepIndex - 1]?.items ?? []) : [];
  $: q0 = step.quests?.[0];
  $: ui = (n) => q0?.usedItems?.[n];
  $: sd = zwStepsData[stepIndex] ?? null;
  $: sq = sd?.subQuestIds ?? [];
</script>

{#if !loaded}
<div class="text-xs text-gs-muted text-center py-2">読み込み中...</div>
{:else if stepIndex === 0}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p>北部森林の<strong>ゲロルト</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={questIconUrl(q0?.id, q0?.eventIcon ?? q0?.icon)} alt=""><a class="eorzeadb_link" href={questUrl(q0?.id)} target="_blank" rel="noopener">{q0?.name}</a>を受注する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>朽ち果てた武器を入手し、<strong>ジャルザーン</strong>に渡す。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(0))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(0))} target="_blank" rel="noopener">{partial(ui(0), "item")}</a>に{materia}を 2 つ装着する。</p>
  </li>
  <li class="pl-1"><p><a class="eorzeadb_link" href={instanceUrl(20019)} target="_blank" rel="noopener">{INSTANCE_NAMES[20019]}</a>をクリアする。</p></li>
  <li class="pl-1"><p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(5264)} alt=""><a class="eorzeadb_link" href={itemUrl(5264)} target="_blank" rel="noopener">{ITEM_NAMES[5264]}</a>を<strong>ジャルザーン</strong>に渡す。</p></li>
  <li class="pl-1"><p><strong>レヴナンツトール</strong>で<strong>ロウェナ</strong>と会話する。</p></li>
  <li class="pl-1"><p><a class="eorzeadb_link" href={instanceUrl(14)} target="_blank" rel="noopener">{INSTANCE_NAMES[14]}</a>をクリアする。</p></li>
  <li class="pl-1"><p>アムダプールの石版を<strong>ロウェナ</strong>に渡す。</p></li>
  <li class="pl-1"><p>写本：トリストラムの本を<strong>ジャルザーン</strong>に渡す。</p></li>
  <li class="pl-1"><p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(1))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(1))} target="_blank" rel="noopener">{partial(ui(1), "item")}</a>を入手する。</p></li>
  <li class="pl-1"><p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(1))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(1))} target="_blank" rel="noopener">{partial(ui(1), "item")}</a>を装備して指定のモンスター 24 体(8 体 + 8 体 + 8 体)を討伐する。</p></li>
  <li class="pl-1"><p><strong>ジャルザーン</strong>に報告する。</p></li>
  <li class="pl-1"><p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(1))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(1))} target="_blank" rel="noopener">{partial(ui(1), "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20020)} target="_blank" rel="noopener">{INSTANCE_NAMES[20020]}</a>をクリアする。</p></li>
  <li class="pl-1"><p><strong>ジャルザーン</strong>に<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(1))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(1))} target="_blank" rel="noopener">{partial(ui(1), "item")}</a>を渡す。</p></li>
  <li class="pl-1"><p>{jobJa}で<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(1))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(1))} target="_blank" rel="noopener">{partial(ui(1), "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20004)} target="_blank" rel="noopener">{INSTANCE_NAMES[20004]}</a>をクリアする。</p></li>
  <li class="pl-1"><p>{jobJa}で<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(1))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(1))} target="_blank" rel="noopener">{partial(ui(1), "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20005)} target="_blank" rel="noopener">{INSTANCE_NAMES[20005]}</a>をクリアする。</p></li>
  <li class="pl-1"><p>{jobJa}で<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(1))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(1))} target="_blank" rel="noopener">{partial(ui(1), "item")}</a>を装備して<a class="eorzeadb_link" href={instanceUrl(20006)} target="_blank" rel="noopener">{INSTANCE_NAMES[20006]}</a>をクリアする。</p></li>
  <li class="pl-1"><p><strong>ジャルザーン</strong>にイフリートの炎、ガルーダの風、タイタンの黄土を渡す。</p></li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={itemIconUrl(ui(2))} alt=""><a class="eorzeadb_link" href={itemUrl(ui(2))} target="_blank" rel="noopener">{partial(ui(2), "item")}</a>を 1 つ<strong>ジャルザーン</strong>に渡す。</p>
    <p class="text-xs text-gs-muted mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(6267)} alt=""><strong>ラザハン焼入油</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 15 個で購入できます。</p>
  </li>
</ol>

{:else if stepIndex === 1}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p><strong>ゲロルト</strong>の横にある武具職人の鍛冶炉に下記を入れる。</p>
    <ul class="list-disc list-inside space-y-1">
      {#each prevItems as item}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={item.iconId ? iconUrl(item.iconId) : ""} alt=""><a class="eorzeadb_link" href={itemUrl(item.id)} target="_blank" rel="noopener">{item.nameJa}</a></li>
      {/each}
      <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(6268)} alt=""><a class="eorzeadb_link" href={itemUrl(6268)} target="_blank" rel="noopener">{ITEM_NAMES[6268]}</a>を 3 つ</li>
    </ul>
    <p class="text-xs text-gs-muted mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(6268)} alt=""><strong>サベネアの霊薬</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 20 個で購入できます。</p>
  </li>
</ol>

{:else if stepIndex === 2}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1"><p><strong>ゲロルト</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p></li>
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>に話しかけて<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>をクリアする。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={prevItems[0]?.iconId ? iconUrl(prevItems[0].iconId) : ""} alt=""><a class="eorzeadb_link" href={itemUrl(prevItems[0]?.id)} target="_blank" rel="noopener">{prevItems[0]?.nameJa}</a>を装備して各地の FATE をクリアし、アートマを入手する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
    <table class="text-sm border-collapse border border-gs-border mt-1">
      <thead>
        <tr class="bg-white/10">
          <th class="border border-gs-border px-2 py-1 text-left font-semibold whitespace-nowrap">素材名</th>
          <th class="border border-gs-border px-2 py-1 text-left font-semibold">場所</th>
        </tr>
      </thead>
      <tbody>
        {#each atmas as a}
          <tr>
            <td class="border border-gs-border px-2 py-1"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(a.itemId)} alt=""><a class="eorzeadb_link" href={itemUrl(a.itemId)} target="_blank" rel="noopener">{a.name}</a></td>
            <td class="border border-gs-border px-2 py-1"><strong>{a.zone}</strong></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </li>
  <li class="pl-1"><p>12 種類のアートマを<strong>ジャルザーン</strong>に渡す。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p></li>
</ol>

{:else if stepIndex === 3}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1"><p><strong>ジャルザーン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p></li>
  <li class="pl-1 space-y-1">
    <p><strong>レヴナンツトール</strong>の<strong>グ・ジュサナ</strong>に話しかけて黄道十二文書を交換する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>グ・ジュサナ</strong>から黄道十二文書を交換し、計 9 冊クリアする。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>に話しかけ、アートマの強化を選択する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
</ol>

{:else if stepIndex === 4}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1"><p><strong>ジャルザーン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestIds?.[0])} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestIds?.[0])} target="_blank" rel="noopener">{qName(sd?.onetimeQuestIds?.[0])}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p></li>
  <li class="pl-1 space-y-1"><p><strong>中央ザナラーン</strong>の狼煙の丘にいる<strong>ウベールタン</strong>に話しかけて<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(7885)} alt=""><a class="eorzeadb_link" href={itemUrl(7885)} target="_blank" rel="noopener">{ITEM_NAMES[7885]}</a>を 3 つ見せる。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p></li>
  <li class="pl-1 space-y-1"><p><strong>ウベールタン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestIds?.[1])} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestIds?.[1])} target="_blank" rel="noopener">{qName(sd?.onetimeQuestIds?.[1])}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p></li>
  <li class="pl-1 space-y-1">
    <p><strong>ウベールタン</strong>に話しかけて<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(7885)} alt=""><a class="eorzeadb_link" href={itemUrl(7885)} target="_blank" rel="noopener">{ITEM_NAMES[7885]}</a>を 3 つ渡し、スフィアスクロールを入手する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    <p class="text-xs text-gs-muted mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(7885)} alt=""><strong>ハイエンチャントインク</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 25 個で購入できます。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p>所持品からスフィアスクロールを使用して、特定のマテリア 1 個と<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(7883)} alt=""><a class="eorzeadb_link" href={itemUrl(7883)} target="_blank" rel="noopener">{ITEM_NAMES[7883]}</a> 1 個を使用して 75 回転写をする。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
    <p class="text-xs text-gs-muted mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(7883)} alt=""><strong>アレキサンドライト</strong>は各都市の<strong>モブハント担当官</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(27)} alt=""><strong>同盟記章</strong> × 50 個で購入できます。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>に話しかけ、アニムスの強化を選択する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
</ol>

{:else if stepIndex === 5}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注し、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(8659)} alt=""><a class="eorzeadb_link" href={itemUrl(8659)} target="_blank" rel="noopener">{ITEM_NAMES[8659]}</a>を入手する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
    <p class="text-xs text-gs-muted">※<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(8659)} alt=""><a class="eorzeadb_link" href={itemUrl(8659)} target="_blank" rel="noopener">{ITEM_NAMES[8659]}</a>がない場合は、<strong>ゲロルト</strong>の隣の<strong>ドレイク</strong>から入手する。</p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>に話しかけて<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={prevItems[0]?.iconId ? iconUrl(prevItems[0].iconId) : ""} alt=""><a class="eorzeadb_link" href={itemUrl(prevItems[0]?.id)} target="_blank" rel="noopener">{prevItems[0]?.nameJa}</a>を絶霊化してもらう。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={prevItems[0]?.iconId ? iconUrl(prevItems[0].iconId) : ""} alt=""><a class="eorzeadb_link" href={itemUrl(prevItems[0]?.id)} target="_blank" rel="noopener">{prevItems[0]?.nameJa}</a>を装備して新生 ID や、討滅戦を周回する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p>所持品から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(8659)} alt=""><a class="eorzeadb_link" href={itemUrl(8659)} target="_blank" rel="noopener">{ITEM_NAMES[8659]}</a>を使用し、「魂が完全に定着したようだ。」と表示されたら<strong>ジャルザーン</strong>に話しかけ、ノウスの強化を選択する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
</ol>

{:else if stepIndex === 6}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p>下記のクエストをクリアして入手できる 4 つのアイテムを<strong>ゲロルト</strong>に渡す。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
    <ul class="list-disc list-inside space-y-1">
      {#each sq as qid}
        <li><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(qid)} alt=""><a class="eorzeadb_link" href={questUrl(qid)} target="_blank" rel="noopener">{qName(qid)}</a></li>
      {/each}
    </ul>
  </li>
  <li class="pl-1 space-y-1">
    <h4 class="font-semibold"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sq[0])} alt=""><a class="eorzeadb_link" href={questUrl(sq[0])} target="_blank" rel="noopener">{qName(sq[0])}</a></h4>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      <li>トレードアイテム
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9538)} alt=""><a class="eorzeadb_link" href={itemUrl(9538)} target="_blank" rel="noopener">{ITEM_NAMES[9538]}</a>、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>を渡す。</p>
        <ul class="text-xs text-gs-muted ml-4 mt-1 space-y-0.5">
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9538)} alt=""><strong>ブロンズクリスタル</strong>は<strong>高地ラノシア</strong>（X:26.1 Y:26.4）の<strong>よろず屋</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(1)} alt="">ギル × 100,000 で購入できます。</li>
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><strong>大炎獣の心核</strong>は各都市の<strong>軍需品担当官</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(20)} alt="">各国軍票 × 20,000 個で購入できます。</li>
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><strong>霊峰の泉水</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 200 個で購入できます。</li>
        </ul>
      </li>
      <li>ID 攻略
        <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(13)} target="_blank" rel="noopener">{INSTANCE_NAMES[13]}</a>をクリアして入手できるバトラールの角、<a class="eorzeadb_link" href={instanceUrl(20)} target="_blank" rel="noopener">{INSTANCE_NAMES[20]}</a>をクリアして入手できるVI号ゴブリ鋼板を渡す。</p>
      </li>
      <li>ID 攻略
        <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(21)} target="_blank" rel="noopener">{INSTANCE_NAMES[21]}</a>をクリアして入手できるナラシンハの皮膜、<a class="eorzeadb_link" href={instanceUrl(27)} target="_blank" rel="noopener">{INSTANCE_NAMES[27]}</a>をクリアして入手できるフェンリルの牙を渡す。</p>
      </li>
      <li>クラフター制作、マケボ
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9510)} alt=""><a class="eorzeadb_link" href={itemUrl(9510)} target="_blank" rel="noopener">{ITEM_NAMES[9510]}</a>(HQ)、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9511)} alt=""><a class="eorzeadb_link" href={itemUrl(9511)} target="_blank" rel="noopener">{ITEM_NAMES[9511]}</a>(HQ)を渡す。</p>
        <p class="text-xs text-gs-muted ml-4 mt-1">※ HQ 品質のものをクラフターで制作するか、マーケットボードで購入できます。</p>
      </li>
    </ol>
  </li>
  <li class="pl-1 space-y-1">
    <h4 class="font-semibold"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sq[1])} alt=""><a class="eorzeadb_link" href={questUrl(sq[1])} target="_blank" rel="noopener">{qName(sq[1])}</a></h4>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      <li>トレードアイテム
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9542)} alt=""><a class="eorzeadb_link" href={itemUrl(9542)} target="_blank" rel="noopener">{ITEM_NAMES[9542]}</a>を渡す。</p>
        <p class="text-xs text-gs-muted ml-4 mt-1">※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9542)} alt=""><strong>アラグの樹脂</strong>は<strong>南ザナラーン</strong>（X:15.9 Y:29.0）の<strong>よろず屋</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(1)} alt="">ギル × 100,000 で購入できます。</p>
      </li>
      <li>ID 攻略
        <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(5)} target="_blank" rel="noopener">{INSTANCE_NAMES[5]}</a>をクリアして入手できる黄輝石、<a class="eorzeadb_link" href={instanceUrl(19)} target="_blank" rel="noopener">{INSTANCE_NAMES[19]}</a>をクリアして入手できる妖異の魔布を渡す。</p>
      </li>
      <li>ID 攻略
        <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(22)} target="_blank" rel="noopener">{INSTANCE_NAMES[22]}</a>をクリアして入手できるアムダプールの紙片、<a class="eorzeadb_link" href={instanceUrl(28)} target="_blank" rel="noopener">{INSTANCE_NAMES[28]}</a>をクリアして入手できる蒼茫玉を渡す。</p>
      </li>
      <li>クラフター制作、マケボ
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9512)} alt=""><a class="eorzeadb_link" href={itemUrl(9512)} target="_blank" rel="noopener">{ITEM_NAMES[9512]}</a>(HQ)、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9513)} alt=""><a class="eorzeadb_link" href={itemUrl(9513)} target="_blank" rel="noopener">{ITEM_NAMES[9513]}</a>(HQ)を渡す。</p>
        <p class="text-xs text-gs-muted ml-4 mt-1">※ HQ 品質のものをクラフターで制作するか、マーケットボードで購入できます。</p>
      </li>
      <li>トレードアイテム
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>を渡す。</p>
        <ul class="text-xs text-gs-muted ml-4 mt-1 space-y-0.5">
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><strong>大炎獣の心核</strong>は各都市の<strong>軍需品担当官</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(20)} alt="">各国軍票 × 20,000 個で購入できます。</li>
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><strong>霊峰の泉水</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 200 個で購入できます。</li>
        </ul>
      </li>
    </ol>
  </li>
  <li class="pl-1 space-y-1">
    <h4 class="font-semibold"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sq[2])} alt=""><a class="eorzeadb_link" href={questUrl(sq[2])} target="_blank" rel="noopener">{qName(sq[2])}</a></h4>
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
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9514)} alt=""><a class="eorzeadb_link" href={itemUrl(9514)} target="_blank" rel="noopener">{ITEM_NAMES[9514]}</a>(HQ)、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9515)} alt=""><a class="eorzeadb_link" href={itemUrl(9515)} target="_blank" rel="noopener">{ITEM_NAMES[9515]}</a>(HQ)を渡す。</p>
        <p class="text-xs text-gs-muted ml-4 mt-1">※ HQ 品質のものをクラフターで制作するか、マーケットボードで購入できます。</p>
      </li>
      <li>トレードアイテム
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9543)} alt=""><a class="eorzeadb_link" href={itemUrl(9543)} target="_blank" rel="noopener">{ITEM_NAMES[9543]}</a>を渡す。</p>
        <ul class="text-xs text-gs-muted ml-4 mt-1 space-y-0.5">
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><strong>大炎獣の心核</strong>は各都市の<strong>軍需品担当官</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(20)} alt="">各国軍票 × 20,000 個で購入できます。</li>
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><strong>霊峰の泉水</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 200 個で購入できます。</li>
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9543)} alt=""><strong>戦神砂</strong>は<strong>クルザス中央高地</strong>（X:13.2 Y:15.9）の<strong>よろず屋</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(1)} alt="">ギル × 100,000 で購入できます。</li>
        </ul>
      </li>
    </ol>
  </li>
  <li class="pl-1 space-y-1">
    <h4 class="font-semibold"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sq[3])} alt=""><a class="eorzeadb_link" href={questUrl(sq[3])} target="_blank" rel="noopener">{qName(sq[3])}</a></h4>
    <ol class="list-decimal list-inside space-y-1 ml-2">
      <li>トレードアイテム
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><a class="eorzeadb_link" href={itemUrl(9540)} target="_blank" rel="noopener">{ITEM_NAMES[9540]}</a>、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><a class="eorzeadb_link" href={itemUrl(9539)} target="_blank" rel="noopener">{ITEM_NAMES[9539]}</a>、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9544)} alt=""><a class="eorzeadb_link" href={itemUrl(9544)} target="_blank" rel="noopener">{ITEM_NAMES[9544]}</a>を渡す。</p>
        <ul class="text-xs text-gs-muted ml-4 mt-1 space-y-0.5">
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9539)} alt=""><strong>大炎獣の心核</strong>は各都市の<strong>軍需品担当官</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(20)} alt="">各国軍票 × 20,000 個で購入できます。</li>
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9540)} alt=""><strong>霊峰の泉水</strong>は<strong>モードゥナ</strong>の<strong>オーリアナ</strong>などから{#if currencies}<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iconUrl(currencies.tomestones.legacy.iconId)} alt=""><strong>{currencies.tomestones.legacy.name}</strong>{/if} × 200 個で購入できます。</li>
          <li>※ <img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9544)} alt=""><strong>ブラスケトル</strong>は<strong>黒衣森：北部森林</strong>（X:29.9 Y:18.9）の<strong>よろず屋</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(1)} alt="">ギル × 100,000 で購入できます。</li>
        </ul>
      </li>
      <li>ID 攻略
        <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(14)} target="_blank" rel="noopener">{INSTANCE_NAMES[14]}</a>をクリアして入手できる古城のお宝、<a class="eorzeadb_link" href={instanceUrl(17)} target="_blank" rel="noopener">{INSTANCE_NAMES[17]}</a>をクリアして入手できる大灯台のお宝、<a class="eorzeadb_link" href={instanceUrl(24)} target="_blank" rel="noopener">{INSTANCE_NAMES[24]}</a>をクリアして入手できる地下墓所のお宝を渡す。</p>
      </li>
      <li>ID 攻略
        <p class="ml-4"><a class="eorzeadb_link" href={instanceUrl(25)} target="_blank" rel="noopener">{INSTANCE_NAMES[25]}</a>をクリアして入手できる対竜要塞のお宝を渡す。</p>
      </li>
      <li>クラフター制作、マケボ
        <p class="ml-4"><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9516)} alt=""><a class="eorzeadb_link" href={itemUrl(9516)} target="_blank" rel="noopener">{ITEM_NAMES[9516]}</a>(HQ)、<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={iIcon(9517)} alt=""><a class="eorzeadb_link" href={itemUrl(9517)} target="_blank" rel="noopener">{ITEM_NAMES[9517]}</a>(HQ)を渡す。</p>
        <p class="text-xs text-gs-muted ml-4 mt-1">※ HQ 品質のものをクラフターで制作するか、マーケットボードで購入できます。</p>
      </li>
    </ol>
  </li>
</ol>

{:else if stepIndex === 7}
<ol class="list-decimal space-y-2 pl-5">
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>から<img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={qIcon(sd?.onetimeQuestId)} alt=""><a class="eorzeadb_link" href={questUrl(sd?.onetimeQuestId)} target="_blank" rel="noopener">{qName(sd?.onetimeQuestId)}</a>を受注し、<strong>スウィフトパーチ入植地</strong>へ移動する。<span class="ml-1 text-[10px] font-normal text-gs-muted bg-white/5 border border-gs-border/50 rounded px-1 py-0.5">初回のみ</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>レモン</strong>からマハトマを入手する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><img class="inline-block w-4 h-4 object-contain align-middle mr-0.5" src={prevItems[0]?.iconId ? iconUrl(prevItems[0].iconId) : ""} alt=""><a class="eorzeadb_link" href={itemUrl(prevItems[0]?.id)} target="_blank" rel="noopener">{prevItems[0]?.nameJa}</a>を装備して新生 ID や、討滅戦を周回する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p>マハトマ 12 個分輝きを溜める。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
  <li class="pl-1 space-y-1">
    <p><strong>ジャルザーン</strong>に話しかけ、「ゾディアックウェポン」の再創造を選択する。<span class="ml-1 text-[10px] font-normal text-gs-gold/70 bg-gs-gold/10 border border-gs-gold/30 rounded px-1 py-0.5">繰り返し</span></p>
  </li>
</ol>
{/if}
