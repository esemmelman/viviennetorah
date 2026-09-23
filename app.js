const passage = document.querySelector('#passage');
const status = document.querySelector('#status');
const tropeToggle = document.querySelector('#trope-toggle');
const scriptToggle = document.querySelector('#script-toggle');
const audioToggle = document.querySelector('#audio-toggle');
const SUPABASE_URL = 'https://fgomaujsdblpzxhnnqrg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_JOUqLZDnfGu_yCa6k6FVDQ_AYwpr72i';
const SUPABASE_STORAGE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnb21hdWpzZGJscHp4aG5ucXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNjM3MjYsImV4cCI6MjA5OTgzOTcyNn0.1iMPI_7F_8ioNVnuThxqAKfMfD7G4NbyXilXZEERScw';
const HIGHLIGHT_TABLE = 'vivienne_torah_highlight_groups_v1';
const RECORDING_TABLE = 'vivienne_torah_group_recordings_v1';
const RECORDING_BUCKET = 'vivienne-torah-group-recordings-v1';
const PASSAGE_KEY = 'deuteronomy-8-11-20-9-1-10';
const FIRST_VERSE = 1;
const verseRef = number => number <= 10 ? `8:${number + 10}` : `9:${number - 10}`;
const FALLBACK_VERSES = [
  "הִשָּׁ֣מֶר לְךָ֔ פֶּן־תִּשְׁכַּ֖ח אֶת־יְהֹוָ֣ה אֱלֹהֶ֑יךָ לְבִלְתִּ֨י שְׁמֹ֤ר מִצְוֺתָיו֙ וּמִשְׁפָּטָ֣יו וְחֻקֹּתָ֔יו אֲשֶׁ֛ר אָנֹכִ֥י מְצַוְּךָ֖ הַיּֽוֹם׃",
  "פֶּן־תֹּאכַ֖ל וְשָׂבָ֑עְתָּ וּבָתִּ֥ים טֹבִ֛ים תִּבְנֶ֖ה וְיָשָֽׁבְתָּ׃",
  "וּבְקָֽרְךָ֤ וְצֹֽאנְךָ֙ יִרְבְּיֻ֔ן וְכֶ֥סֶף וְזָהָ֖ב יִרְבֶּה־לָּ֑ךְ וְכֹ֥ל אֲשֶׁר־לְךָ֖ יִרְבֶּֽה׃",
  "וְרָ֖ם לְבָבֶ֑ךָ וְשָֽׁכַחְתָּ֙ אֶת־יְהֹוָ֣ה אֱלֹהֶ֔יךָ הַמּוֹצִיאֲךָ֛ מֵאֶ֥רֶץ מִצְרַ֖יִם מִבֵּ֥ית עֲבָדִֽים׃",
  "הַמּוֹלִ֨יכְךָ֜ בַּמִּדְבָּ֣ר ׀ הַגָּדֹ֣ל וְהַנּוֹרָ֗א נָחָ֤שׁ ׀ שָׂרָף֙ וְעַקְרָ֔ב וְצִמָּא֖וֹן אֲשֶׁ֣ר אֵֽין־מָ֑יִם הַמּוֹצִ֤יא לְךָ֙ מַ֔יִם מִצּ֖וּר הַֽחַלָּמִֽישׁ׃",
  "הַמַּאֲכִ֨לְךָ֥ מָן֙ בַּמִּדְבָּ֔ר אֲשֶׁ֥ר לֹא־יָדְע֖וּן אֲבֹתֶ֑יךָ לְמַ֣עַן עַנֹּֽתְךָ֗ וּלְמַ֙עַן֙ נַסֹּתֶ֔ךָ לְהֵיטִֽבְךָ֖ בְּאַחֲרִיתֶֽךָ׃",
  "וְאָמַרְתָּ֖ בִּלְבָבֶ֑ךָ כֹּחִי֙ וְעֹ֣צֶם יָדִ֔י עָ֥שָׂה לִ֖י אֶת־הַחַ֥יִל הַזֶּֽה׃",
  "וְזָֽכַרְתָּ֙ אֶת־יְהֹוָ֣ה אֱלֹהֶ֔יךָ כִּ֣י ה֗וּא הַנֹּתֵ֥ן לְךָ֛ כֹּ֖חַ לַעֲשׂ֣וֹת חָ֑יִל לְמַ֨עַן הָקִ֧ים אֶת־בְּרִית֛וֹ אֲשֶׁר־נִשְׁבַּ֥ע לַאֲבֹתֶ֖יךָ כַּיּ֥וֹם הַזֶּֽה׃ ",
  "וְהָיָ֗ה אִם־שָׁכֹ֤חַ תִּשְׁכַּח֙ אֶת־יְהֹוָ֣ה אֱלֹהֶ֔יךָ וְהָֽלַכְתָּ֗ אַחֲרֵי֙ אֱלֹהִ֣ים אֲחֵרִ֔ים וַעֲבַדְתָּ֖ם וְהִשְׁתַּחֲוִ֣יתָ לָהֶ֑ם הַעִדֹ֤תִי בָכֶם֙ הַיּ֔וֹם כִּ֥י אָבֹ֖ד תֹּאבֵדֽוּן׃",
  "כַּגּוֹיִ֗ם אֲשֶׁ֤ר יְהֹוָה֙ מַאֲבִ֣יד מִפְּנֵיכֶ֔ם כֵּ֖ן תֹּאבֵד֑וּן עֵ֚קֶב לֹ֣א תִשְׁמְע֔וּן בְּק֖וֹל יְהֹוָ֥ה אֱלֹהֵיכֶֽם׃ ",
  "שְׁמַ֣ע יִשְׂרָאֵ֗ל אַתָּ֨ה עֹבֵ֤ר הַיּוֹם֙ אֶת־הַיַּרְדֵּ֔ן לָבֹא֙ לָרֶ֣שֶׁת גּוֹיִ֔ם גְּדֹלִ֥ים וַעֲצֻמִ֖ים מִמֶּ֑ךָּ עָרִ֛ים גְּדֹלֹ֥ת וּבְצֻרֹ֖ת בַּשָּׁמָֽיִם׃",
  "עַֽם־גָּד֥וֹל וָרָ֖ם בְּנֵ֣י עֲנָקִ֑ים אֲשֶׁ֨ר אַתָּ֤ה יָדַ֙עְתָּ֙ וְאַתָּ֣ה שָׁמַ֔עְתָּ מִ֣י יִתְיַצֵּ֔ב לִפְנֵ֖י בְּנֵ֥י עֲנָֽק׃",
  "וְיָדַעְתָּ֣ הַיּ֗וֹם כִּי֩ יְהֹוָ֨ה אֱלֹהֶ֜יךָ הֽוּא־הָעֹבֵ֤ר לְפָנֶ֙יךָ֙ אֵ֣שׁ אֹֽכְלָ֔ה ה֧וּא יַשְׁמִידֵ֛ם וְה֥וּא יַכְנִיעֵ֖ם לְפָנֶ֑יךָ וְהֽוֹרַשְׁתָּ֤ם וְהַֽאֲבַדְתָּם֙ מַהֵ֔ר כַּאֲשֶׁ֛ר דִּבֶּ֥ר יְהֹוָ֖ה לָֽךְ׃",
  "אַל־תֹּאמַ֣ר בִּלְבָבְךָ֗ בַּהֲדֹ֣ף יְהֹוָה֩ אֱלֹהֶ֨יךָ אֹתָ֥ם ׀ מִלְּפָנֶ֘יךָ֮ לֵאמֹר֒ בְּצִדְקָתִי֙ הֱבִיאַ֣נִי יְהֹוָ֔ה לָרֶ֖שֶׁת אֶת־הָאָ֣רֶץ הַזֹּ֑את וּבְרִשְׁעַת֙ הַגּוֹיִ֣ם הָאֵ֔לֶּה יְהֹוָ֖ה מוֹרִישָׁ֥ם מִפָּנֶֽיךָ׃",
  "לֹ֣א בְצִדְקָתְךָ֗ וּבְיֹ֙שֶׁר֙ לְבָ֣בְךָ֔ אַתָּ֥ה בָ֖א לָרֶ֣שֶׁת אֶת־אַרְצָ֑ם כִּ֞י בְּרִשְׁעַ֣ת ׀ הַגּוֹיִ֣ם הָאֵ֗לֶּה יְהֹוָ֤ה אֱלֹהֶ֙יךָ֙ מוֹרִישָׁ֣ם מִפָּנֶ֔יךָ וּלְמַ֜עַן הָקִ֣ים אֶת־הַדָּבָ֗ר אֲשֶׁ֨ר נִשְׁבַּ֤ע יְהֹוָה֙ לַאֲבֹתֶ֔יךָ לְאַבְרָהָ֥ם לְיִצְחָ֖ק וּֽלְיַעֲקֹֽב׃",
  "וְיָדַעְתָּ֗ כִּ֠י לֹ֤א בְצִדְקָֽתְךָ֙ יְהֹוָ֣ה אֱ֠לֹהֶ֠יךָ נֹתֵ֨ן לְךָ֜ אֶת־הָאָ֧רֶץ הַטּוֹבָ֛ה הַזֹּ֖את לְרִשְׁתָּ֑הּ כִּ֥י עַם־קְשֵׁה־עֹ֖רֶף אָֽתָּה׃",
  "זְכֹר֙ אַל־תִּשְׁכַּ֔ח אֵ֧ת אֲשֶׁר־הִקְצַ֛פְתָּ אֶת־יְהֹוָ֥ה אֱלֹהֶ֖יךָ בַּמִּדְבָּ֑ר לְמִן־הַיּ֞וֹם אֲשֶׁר־יָצָ֣אתָ ׀ מֵאֶ֣רֶץ מִצְרַ֗יִם עַד־בֹּֽאֲכֶם֙ עַד־הַמָּק֣וֹם הַזֶּ֔ה מַמְרִ֥ים הֱיִיתֶ֖ם עִם־יְהֹוָֽה׃",
  "וּבְחֹרֵ֥ב הִקְצַפְתֶּ֖ם אֶת־יְהֹוָ֑ה וַיִּתְאַנַּ֧ף יְהֹוָ֛ה בָּכֶ֖ם לְהַשְׁמִ֥יד אֶתְכֶֽם׃",
  "בַּעֲלֹתִ֣י הָהָ֗רָה לָקַ֜חַת לוּחֹ֤ת הָֽאֲבָנִים֙ לוּחֹ֣ת הַבְּרִ֔ית אֲשֶׁר־כָּרַ֥ת יְהֹוָ֖ה עִמָּכֶ֑ם וָאֵשֵׁ֣ב בָּהָ֗ר אַרְבָּעִ֥ים יוֹם֙ וְאַרְבָּעִ֣ים לַ֔יְלָה לֶ֚חֶם לֹ֣א אָכַ֔לְתִּי וּמַ֖יִם לֹ֥א שָׁתִֽיתִי׃",
  "וַיִּתֵּ֨ן יְהֹוָ֜ה אֵלַ֗י אֶת־שְׁנֵי֙ לוּחֹ֣ת הָֽאֲבָנִ֔ים כְּתֻבִ֖ים בְּאֶצְבַּ֣ע אֱלֹהִ֑ים וַעֲלֵיהֶ֗ם כְּֽכׇל־הַדְּבָרִ֡ים אֲשֶׁ֣ר דִּבֶּר֩ יְהֹוָ֨ה עִמָּכֶ֥ם בָּהָ֛ר מִתּ֥וֹךְ הָאֵ֖שׁ בְּי֥וֹם הַקָּהָֽל׃"
];

const audioByVerse = new Map();
let activeVerse = null;
let activePlaylist = null;
let sourceVerses = FALLBACK_VERSES;
let showTrope = true;
let scriptMode = false;
let audioEnabled = true;
const HIGHLIGHT_STORAGE_KEY = 'vivienne-torah-highlights-deuteronomy-8-9-v1';
let highlights = loadHighlights();
let highlightsReady = false;
const recordings = new Map();
let activeRecorder = null;
let playbackAudioContext = null;
let hoveredGroupAudio = null;
let hoveredGroupId = null;
function findRecording(value, verseNumber) {
  const candidates = [];

  function visit(item) {
    if (!item || typeof item !== 'object') return;
    const strings = Object.values(item).filter(child => typeof child === 'string');
    const url = strings.find(child => /\.(mp3|m4a|ogg|wav)(?:[?#]|$)/i.test(child));
    if (url) {
      const description = JSON.stringify(item);
      const exactRef = new RegExp(`Deuteronomy(?:\\.| )${verseRef(verseNumber).replace(':', '(?:\\.|:)')}(?!\\d)`, 'i');
      candidates.push({
        url,
        start: Number(item.start_time ?? item.startTime ?? item.start ?? 0),
        end: Number(item.end_time ?? item.endTime ?? item.end ?? 0),
        score: exactRef.test(description) ? 1 : 0
      });
    }
    Object.values(item).forEach(visit);
  }

  visit(value);
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0] || null;
}

function stripHtml(value) {
  const template = document.createElement('template');
  template.innerHTML = value;
  return template.content.textContent.trim();
}

function loadHighlights() {
  try {
    const saved = JSON.parse(localStorage.getItem(HIGHLIGHT_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    'Content-Type': 'application/json',
    ...extra
  };
}

function highlightForWord(verse, wordIndex) {
  return highlights.find(item => item.verse === verse && wordIndex >= item.start && wordIndex <= item.end);
}

function storedVerseNumber(displayVerse) {
  return displayVerse - FIRST_VERSE + 1;
}

function displayVerseNumber(storedVerse) {
  return storedVerse + FIRST_VERSE - 1;
}

async function loadRemoteHighlights() {
  const locallySaved = loadHighlights();
  try {
    if (locallySaved.length) {
      const migrationRows = locallySaved.map(item => ({
        passage_key: PASSAGE_KEY,
        verse: storedVerseNumber(item.verse),
        start_word: item.start,
        end_word: item.end,
        color: item.color
      }));
      const migrationResponse = await fetch(`${SUPABASE_URL}/rest/v1/${HIGHLIGHT_TABLE}?on_conflict=passage_key,verse,start_word,end_word`, {
        method: 'POST',
        headers: supabaseHeaders({ Prefer: 'resolution=ignore-duplicates' }),
        body: JSON.stringify(migrationRows)
      });
      if (!migrationResponse.ok) throw new Error('Local highlight migration failed');
      localStorage.removeItem(HIGHLIGHT_STORAGE_KEY);
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${HIGHLIGHT_TABLE}?passage_key=eq.${PASSAGE_KEY}&select=id,verse,start_word,end_word,color&order=id.asc`, {
      headers: supabaseHeaders()
    });
    if (!response.ok) throw new Error('Highlight request failed');
    highlights = (await response.json()).map(item => ({
      id: item.id,
      verse: displayVerseNumber(item.verse),
      start: item.start_word,
      end: item.end_word,
      color: item.color
    }));
    highlightsReady = true;
    await loadRecordings();
    updateDisplay();
  } catch (error) {
    status.textContent = 'Saved highlights could not be loaded. You can still read the passage.';
  }
}

async function loadRecordings() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${RECORDING_TABLE}?select=highlight_group_id,object_path,mime_type,byte_size,updated_at`, {
    headers: supabaseHeaders()
  });
  if (!response.ok) throw new Error('Recording request failed');
  recordings.clear();
  (await response.json()).forEach(item => recordings.set(item.highlight_group_id, item));
}

function recordingUrl(objectPath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${RECORDING_BUCKET}/${objectPath}`;
}

function currentRecordingUrl(recording) {
  return `${recordingUrl(recording.object_path)}?v=${encodeURIComponent(recording.updated_at || recording.byte_size)}`;
}

function preferredRecordingType() {
  const types = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/mp4'];
  return types.find(type => MediaRecorder.isTypeSupported(type)) || '';
}

function recordingExtension(mimeType) {
  if (mimeType.includes('ogg')) return 'ogg';
  if (mimeType.includes('mp4')) return 'mp4';
  return 'webm';
}

async function uploadRecording(groupId, blob) {
  const mimeType = blob.type.split(';')[0] || 'audio/webm';
  const objectPath = `groups/${groupId}.${recordingExtension(mimeType)}`;
  const uploadResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/${RECORDING_BUCKET}/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_STORAGE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_STORAGE_ANON_KEY}`,
      'Content-Type': mimeType,
      'x-upsert': 'true'
    },
    body: blob
  });
  if (!uploadResponse.ok) throw new Error('Audio upload failed');

  const metadataResponse = await fetch(`${SUPABASE_URL}/rest/v1/${RECORDING_TABLE}?on_conflict=highlight_group_id`, {
    method: 'POST',
    headers: supabaseHeaders({ Prefer: 'resolution=merge-duplicates,return=representation' }),
    body: JSON.stringify({
      highlight_group_id: groupId,
      object_path: objectPath,
      mime_type: mimeType,
      byte_size: blob.size,
      updated_at: new Date().toISOString()
    })
  });
  if (!metadataResponse.ok) throw new Error('Recording metadata save failed');
  const [saved] = await metadataResponse.json();
  recordings.set(groupId, saved);
}

async function toggleGroupRecording(button) {
  if (window.passageRecordingBusy) {
    status.textContent = 'Stop the passage recording before recording a group.';
    return;
  }
  if (!highlightsReady) {
    status.textContent = 'Please wait for saved groups to finish loading.';
    return;
  }
  const groupId = Number(button.dataset.groupId);
  if (activeRecorder) {
    if (activeRecorder.groupId !== groupId) {
      status.textContent = 'Stop the current recording before starting another group.';
      return;
    }
    activeRecorder.recorder.stop();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    status.textContent = 'Audio recording is not supported in this browser.';
    return;
  }

  try {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: { ideal: 48000 },
          channelCount: { ideal: 1 },
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
    } catch (error) {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    const mimeType = preferredRecordingType();
    let recorder;
    try {
      recorder = new MediaRecorder(stream, {
        ...(mimeType ? { mimeType } : {}),
        audioBitsPerSecond: 256000
      });
    } catch (error) {
      recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    }
    const chunks = [];
    recorder.ondataavailable = event => {
      if (event.data.size) chunks.push(event.data);
    };
    recorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      button.disabled = true;
      button.textContent = '↑';
      status.textContent = `Saving recording for group ${groupId}…`;
      try {
        const blob = new Blob(chunks, { type: recorder.mimeType || mimeType || 'audio/webm' });
        await uploadRecording(groupId, blob);
        status.textContent = `Recording saved for group ${groupId}.`;
      } catch (error) {
        status.textContent = 'The recording could not be saved. Please record this group again.';
      } finally {
        activeRecorder = null;
        updateDisplay();
      }
    };
    activeRecorder = { groupId, recorder };
    recorder.start(1000);
    button.classList.add('recording');
    button.textContent = '■';
    button.setAttribute('aria-label', `Stop recording group ${groupId}`);
    status.textContent = `Recording group ${groupId} in high quality. Select stop when finished.`;
  } catch (error) {
    status.textContent = 'Microphone access is required to record this group.';
  }
}

function playGroupRecording(button) {
  if (window.passageRecordingBusy) return;
  stopRecordedVerse();
  const groupId = Number(button.dataset.groupId);
  const recording = recordings.get(groupId);
  if (!recording) return;
  const audio = new Audio(`${recordingUrl(recording.object_path)}?v=${Date.now()}`);
  button.disabled = true;
  audio.onended = () => { button.disabled = false; };
  audio.onerror = () => {
    button.disabled = false;
    status.textContent = 'The saved group recording could not be played.';
  };
  audio.play();
  status.textContent = `Playing recording for group ${groupId}.`;
}

function stopHoveredGroup() {
  if (hoveredGroupAudio) {
    hoveredGroupAudio.pause();
    hoveredGroupAudio.src = '';
  }
  hoveredGroupAudio = null;
  hoveredGroupId = null;
  if (!activePlaylist) setPlayingGroup(null);
}

function playHoveredGroup(groupId) {
  if (window.passageRecordingBusy) return;
  if (!audioEnabled) return;
  if (hoveredGroupId === groupId) return;
  stopRecordedVerse();
  stopHoveredGroup();
  const recording = recordings.get(groupId);
  if (!recording) return;

  const audio = new Audio(currentRecordingUrl(recording));
  hoveredGroupId = groupId;
  hoveredGroupAudio = audio;
  setPlayingGroup(groupId);
  status.textContent = `Playing highlighted group ${groupId}.`;
  audio.onended = () => {
    if (hoveredGroupAudio !== audio) return;
    hoveredGroupAudio = null;
    hoveredGroupId = null;
    setPlayingGroup(null);
  };
  audio.onerror = () => {
    if (hoveredGroupAudio !== audio) return;
    stopHoveredGroup();
    status.textContent = 'The saved group recording could not be played.';
  };
  audio.play().catch(() => {
    if (hoveredGroupAudio !== audio) return;
    stopHoveredGroup();
  });
}

function displayText(text) {
  if (scriptMode) return text.normalize('NFD').replace(/[\u0591-\u05BD\u05BF-\u05C7]/g, '');
  if (!showTrope) return text.replace(/[\u0591-\u05AF]/g, '');
  return text;
}

function updateDisplay() {
  if (scriptMode && audioEnabled) setAudioEnabled(false);
  document.body.classList.toggle('script-mode', scriptMode);
  tropeToggle.classList.toggle('active', showTrope);
  tropeToggle.setAttribute('aria-pressed', String(showTrope));
  scriptToggle.classList.toggle('active', scriptMode);
  scriptToggle.setAttribute('aria-pressed', String(scriptMode));
  audioToggle.disabled = scriptMode;
  renderVerses(sourceVerses);
}

function renderVerses(texts) {
  passage.replaceChildren();
  texts.forEach((text, index) => {
    const number = index + FIRST_VERSE;
    const row = document.createElement('div');
    row.className = 'verse-row';
    row.dir = 'rtl';

    const button = document.createElement('button');
    button.className = 'verse-number';
    button.type = 'button';
    button.textContent = verseRef(number);
    button.dataset.verse = number;
    button.setAttribute('aria-label', `Play all saved group recordings for verse ${verseRef(number)}`);

    const words = document.createElement('span');
    words.className = 'verse-line';
    words.lang = 'he';
    words.dataset.verse = number;

    const displayedText = displayText(text);
    const tokens = displayedText.trim().split(/\s+/);
    tokens.forEach((token, wordIndex) => {
      const word = document.createElement('span');
      word.className = 'word';
      word.dataset.word = wordIndex;
      word.textContent = token;
      const highlight = highlightForWord(number, wordIndex);
      if (highlight) {
        word.classList.add(`highlight-${highlight.color}`);
        word.dataset.groupId = highlight.id;
      }
      words.append(word);

      if (wordIndex < tokens.length - 1) {
        const space = document.createElement('span');
        space.className = 'word-space';
        space.textContent = ' ';
        const nextHighlight = highlightForWord(number, wordIndex + 1);
        if (highlight && nextHighlight === highlight) {
          space.classList.add(`highlight-${highlight.color}`);
          space.dataset.groupId = highlight.id;
        }
        words.append(space);
      }

      if (!scriptMode && highlight && wordIndex === highlight.end) {
        const controls = document.createElement('span');
        controls.className = 'group-audio-controls';

        const recordButton = document.createElement('button');
        recordButton.type = 'button';
        recordButton.className = 'group-audio-button record-group';
        recordButton.dataset.groupId = highlight.id;
        recordButton.textContent = '●';
        recordButton.setAttribute('aria-label', `${recordings.has(highlight.id) ? 'Re-record' : 'Record'} highlighted group ${highlight.id}`);
        recordButton.title = recordings.has(highlight.id) ? 'Re-record this group' : 'Record this group';
        controls.append(recordButton);

        if (recordings.has(highlight.id)) {
          const playButton = document.createElement('button');
          playButton.type = 'button';
          playButton.className = 'group-audio-button play-group';
          playButton.dataset.groupId = highlight.id;
          playButton.textContent = '▶';
          playButton.setAttribute('aria-label', `Play recording for highlighted group ${highlight.id}`);
          playButton.title = 'Play saved recording';
          controls.append(playButton);
        }
        words.append(controls);
      }
    });

    row.append(button, words);
    passage.append(row);
    if ((index + 1) % 4 === 0) {
      const heading = document.createElement('h2');
      heading.className = 'aliyah-heading';
      heading.textContent = `Aliya ${(index + 1) / 4}`;
      passage.append(heading);
    }
  });
}

function resetActiveVerse() {
  if (!activeVerse) return;
  activeVerse.audio.pause();
  activeVerse.audio.ontimeupdate = null;
  activeVerse.button.classList.remove('playing');
  activeVerse.button.textContent = verseRef(activeVerse.number);
  activeVerse = null;
}

function stopRecordedVerse(message = '') {
  if (!activePlaylist) return;
  activePlaylist.sources?.forEach(source => {
    try { source.stop(); } catch (error) { /* The source may already have ended. */ }
  });
  activePlaylist.timers?.forEach(clearTimeout);
  activePlaylist.finishCurrent?.();
  activePlaylist.button.classList.remove('playing');
  activePlaylist.button.textContent = verseRef(activePlaylist.number);
  setPlayingGroup(null);
  activePlaylist = null;
  if (message) status.textContent = message;
}

function setPlayingGroup(groupId) {
  passage.querySelectorAll('.word.audio-active, .word-space.audio-active').forEach(element => element.classList.remove('audio-active'));
  if (!groupId) return;
  passage.querySelectorAll(`[data-group-id="${groupId}"]`).forEach(element => element.classList.add('audio-active'));
}

function speechBounds(buffer) {
  const windowSize = Math.max(1, Math.floor(buffer.sampleRate * .01));
  const totalWindows = Math.ceil(buffer.length / windowSize);
  const levels = [];
  for (let windowIndex = 0; windowIndex < totalWindows; windowIndex += 1) {
    const start = windowIndex * windowSize;
    const end = Math.min(start + windowSize, buffer.length);
    let sumSquares = 0;
    let sampleCount = 0;
    for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
      const samples = buffer.getChannelData(channel);
      for (let index = start; index < end; index += 1) {
        sumSquares += samples[index] * samples[index];
        sampleCount += 1;
      }
    }
    levels.push(Math.sqrt(sumSquares / sampleCount));
  }

  const threshold = Math.max(.003, Math.max(...levels) * .035);
  const firstWindow = levels.findIndex(level => level >= threshold);
  if (firstWindow < 0) return { start: 0, duration: buffer.duration };
  const start = Math.max(0, (firstWindow * windowSize / buffer.sampleRate) - .06);
  return { start, duration: Math.max(.1, buffer.duration - start) };
}

async function prepareGroupAudio(group, audioContext) {
  const recording = recordings.get(group.id);
  const response = await fetch(currentRecordingUrl(recording));
  if (!response.ok) throw new Error('Recording download failed');
  const buffer = await audioContext.decodeAudioData(await response.arrayBuffer());
  return { group, buffer, ...speechBounds(buffer) };
}

async function playRecordedVerse(button) {
  const number = Number(button.dataset.verse);
  if (activePlaylist?.number === number) {
    stopRecordedVerse(`Verse ${verseRef(number)} playback stopped.`);
    return;
  }

  stopRecordedVerse();
  stopHoveredGroup();
  resetActiveVerse();
  const groups = highlights
    .filter(group => group.verse === number && recordings.has(group.id))
    .sort((a, b) => a.start - b.start);

  if (!groups.length) {
    status.textContent = `Verse ${verseRef(number)} has no saved group recordings.`;
    return;
  }

  const token = Symbol('verse-playlist');
  activePlaylist = { number, button, token, sources: [], timers: [], finishCurrent: null };
  button.classList.add('playing');
  button.textContent = '■';

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!playbackAudioContext) {
      try {
        playbackAudioContext = new AudioContextClass({ sampleRate: 48000 });
      } catch (error) {
        playbackAudioContext = new AudioContextClass();
      }
    }
    await playbackAudioContext.resume();
    status.textContent = `Preparing verse ${verseRef(number)}…`;
    const prepared = await Promise.all(groups.map(group => prepareGroupAudio(group, playbackAudioContext)));
    if (activePlaylist?.token !== token) return;

    let startAt = playbackAudioContext.currentTime + .08;
    const finished = new Promise(resolve => { activePlaylist.finishCurrent = resolve; });
    prepared.forEach((clip, index) => {
      const source = playbackAudioContext.createBufferSource();
      source.buffer = clip.buffer;
      source.connect(playbackAudioContext.destination);
      source.start(startAt, clip.start, clip.duration);
      activePlaylist.sources.push(source);
      const delay = Math.max(0, (startAt - playbackAudioContext.currentTime) * 1000);
      activePlaylist.timers.push(setTimeout(() => {
        if (activePlaylist?.token !== token) return;
        setPlayingGroup(clip.group.id);
        status.textContent = `Playing verse ${verseRef(number)}: group ${index + 1} of ${groups.length}.`;
      }, delay));
      if (index === prepared.length - 1) source.onended = activePlaylist.finishCurrent;
      startAt += clip.duration;
    });
    await finished;

    if (activePlaylist?.token === token) {
      stopRecordedVerse(`Verse ${verseRef(number)} complete.`);
    }
  } catch (error) {
    if (activePlaylist?.token === token) {
      stopRecordedVerse(`A saved recording in verse ${verseRef(number)} could not be played.`);
    }
  }
}

async function playVerse(button) {
  if (window.passageRecordingBusy) return;
  const number = Number(button.dataset.verse);
  if (activeVerse?.number === number && !activeVerse.audio.paused) {
    resetActiveVerse();
    status.textContent = `Verse ${verseRef(number)} paused.`;
    return;
  }

  resetActiveVerse();
  status.textContent = `Loading verse ${verseRef(number)}…`;
  button.disabled = true;

  try {
    let audio = audioByVerse.get(number);
    if (!audio) {
      const response = await fetch(`https://www.sefaria.org/api/related/Deuteronomy.${verseRef(number).replace(':', '.')}?with_sheet_links=0`);
      if (!response.ok) throw new Error('Recording request failed');
      const recording = findRecording(await response.json(), number);
      if (!recording) throw new Error('Recording not found');
      audio = new Audio(recording.url);
      audio.clipStart = recording.start;
      audio.clipEnd = recording.end;
      audio.preload = 'auto';
      audioByVerse.set(number, audio);
    }

    activeVerse = { number, audio, button };
    button.classList.add('playing');
    button.textContent = '■';
    audio.currentTime = audio.clipStart || 0;
    audio.ontimeupdate = () => {
      if (audio.clipEnd > audio.clipStart && audio.currentTime >= audio.clipEnd) {
        audio.pause();
        audio.dispatchEvent(new Event('ended'));
      }
    };
    audio.onended = () => {
      if (activeVerse?.audio !== audio) return;
      resetActiveVerse();
      status.textContent = `Verse ${verseRef(number)} complete.`;
    };
    await audio.play();
    status.textContent = `Playing verse ${verseRef(number)}.`;
  } catch (error) {
    resetActiveVerse();
    status.innerHTML = `Verse ${verseRef(number)} could not be loaded here. <a href="https://www.sefaria.org/Deuteronomy.${verseRef(number).replace(':', '.')}?lang=bi&with=Torah%20Readings" target="_blank" rel="noopener">Listen on Sefaria</a>.`;
  } finally {
    button.disabled = false;
  }
}

passage.addEventListener('click', event => {
  const recordButton = event.target.closest('.record-group');
  if (recordButton) {
    toggleGroupRecording(recordButton);
    return;
  }
  const playButton = event.target.closest('.play-group');
  if (playButton) {
    playGroupRecording(playButton);
    return;
  }
  const button = event.target.closest('.verse-number');
  if (button && audioEnabled) playRecordedVerse(button);
});

passage.addEventListener('mouseover', event => {
  const target = event.target.closest('.word[data-group-id], .word-space[data-group-id]');
  if (!target || !passage.contains(target)) return;
  playHoveredGroup(Number(target.dataset.groupId));
});

passage.addEventListener('mouseout', event => {
  const target = event.target.closest('.word[data-group-id], .word-space[data-group-id]');
  if (!target || Number(target.dataset.groupId) !== hoveredGroupId) return;
  const nextTarget = event.relatedTarget?.closest?.('.word[data-group-id], .word-space[data-group-id]');
  if (nextTarget && Number(nextTarget.dataset.groupId) === hoveredGroupId) return;
  stopHoveredGroup();
});

passage.addEventListener('mouseup', async () => {
  if (scriptMode) return;
  if (!highlightsReady) {
    status.textContent = 'Please wait for saved highlights to finish loading.';
    return;
  }
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const selectedWords = [...passage.querySelectorAll('.verse-line .word')].filter(word => {
    try {
      return range.intersectsNode(word);
    } catch (error) {
      return false;
    }
  });
  if (!selectedWords.length) return;

  const line = selectedWords[0].closest('.verse-line');
  if (!selectedWords.every(word => word.closest('.verse-line') === line)) {
    selection.removeAllRanges();
    status.textContent = 'Highlight one verse at a time.';
    return;
  }

  const verse = Number(line.dataset.verse);
  const indices = selectedWords.map(word => Number(word.dataset.word));
  const start = Math.min(...indices);
  const end = Math.max(...indices);
  const overlapping = highlights.filter(item => item.verse === verse && item.start <= end && item.end >= start);

  if (overlapping.length) {
    try {
      const ids = overlapping.map(item => item.id).filter(Boolean).join(',');
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${HIGHLIGHT_TABLE}?id=in.(${ids})`, {
        method: 'DELETE',
        headers: supabaseHeaders()
      });
      if (!response.ok) throw new Error('Delete failed');
      highlights = highlights.filter(item => !overlapping.includes(item));
      selection.removeAllRanges();
      updateDisplay();
      status.textContent = `Cleared highlighting in verse ${verseRef(verse)}.`;
    } catch (error) {
      status.textContent = 'The highlight could not be cleared. Please try again.';
    }
    return;
  }

  const nextColor = highlights.length ? (highlights.at(-1).color % 2) + 1 : 1;
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${HIGHLIGHT_TABLE}`, {
      method: 'POST',
      headers: supabaseHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify({
        passage_key: PASSAGE_KEY,
        verse: storedVerseNumber(verse),
        start_word: start,
        end_word: end,
        color: nextColor
      })
    });
    if (!response.ok) throw new Error('Save failed');
    const [saved] = await response.json();
    highlights.push({ id: saved.id, verse, start, end, color: nextColor });
    selection.removeAllRanges();
    updateDisplay();
    status.textContent = `Highlighted and saved a word group in verse ${verseRef(verse)}.`;
  } catch (error) {
    status.textContent = 'The highlight could not be saved. Please try again.';
  }
});

tropeToggle.addEventListener('click', () => {
  showTrope = !showTrope;
  updateDisplay();
});

function setAudioEnabled(enabled) {
  audioEnabled = enabled;
  audioToggle.checked = enabled;
  if (!enabled) {
    stopHoveredGroup();
    stopRecordedVerse();
    resetActiveVerse();
  }
}

scriptToggle.addEventListener('click', () => {
  scriptMode = !scriptMode;
  if (scriptMode) setAudioEnabled(false);
  updateDisplay();
});

audioToggle.addEventListener('change', () => {
  setAudioEnabled(scriptMode ? false : audioToggle.checked);
});

updateDisplay();

loadRemoteHighlights();
