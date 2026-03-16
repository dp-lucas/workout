// ── Panel Navigation ──
var panels = ['a','b','c','r'];

function show(id) {
  panels.forEach(function(p) {
    document.getElementById('panel-' + p).classList.remove('active');
    document.getElementById('tab-' + p).className = 'tab';
  });
  document.getElementById('panel-' + id).classList.add('active');
  document.getElementById('tab-' + id).classList.add('active-' + id);
}

// ── Video Maps ──
var videoMap = {
  'Hanging Leg Raises': 'https://www.youtube.com/watch?v=Pr1ieGZ5atk',
  'Leg Press': 'https://www.youtube.com/watch?v=sEM_zo9w2ss',
  'Bulgarian Split Squats': 'https://www.youtube.com/watch?v=uqI3GVwfToU',
  'Weighted Dips (Lean Forward)': 'https://www.youtube.com/watch?v=ZQnPQG5d67E',
  'Weighted Chin-Ups': 'https://www.youtube.com/watch?v=-HV2bwkP6VU',
  'Standing Calf Raises': 'https://www.youtube.com/watch?v=RBslMmWqzzE',
  'L-Sit Progression Holds': 'https://www.youtube.com/watch?v=IUZJoSP66HI',
  'Pull-Ups / Lat Pulldowns': 'https://www.youtube.com/watch?v=poyr8KenUfc',
  'Standing Overhead Barbell Press': 'https://www.youtube.com/watch?v=j7ULT6dznNc',
  'Lateral Raises': 'https://www.youtube.com/watch?v=ufrFCjERMDc',
  'Face Pulls': 'https://www.youtube.com/watch?v=7ZvpXA_mFpQ',
  'Strict Barbell Curls + Rope Pushdowns': 'https://www.youtube.com/watch?v=LzwgB15UdO8',
  'Ab Wheel Rollouts': 'https://www.youtube.com/watch?v=rqiTPl9SZnU',
  'Barbell Romanian Deadlift': 'https://www.youtube.com/watch?v=7ADxnAcNjho',
  'Incline Bench Press': 'https://www.youtube.com/watch?v=uIzbJX5EVIY',
  'Seated Cable Rows': 'https://www.youtube.com/watch?v=GZbfZ033f74',
  'Barbell Hip Thrusts': 'https://www.youtube.com/watch?v=lAnqN0J_p5A',
  'Seated Calf Raises': 'https://www.youtube.com/watch?v=Yh5TXz99xwY'
};

var warmupVideoMap = {
  'World\'s Greatest Stretch': 'https://www.youtube.com/watch?v=-CiWQ2IvY34',
  '90/90 Hip Switches': 'https://www.youtube.com/watch?v=F1XdXdCjERk',
  'Wall Slides': 'https://www.youtube.com/watch?v=6Y3nRd9yd3M',
  'Band Pull-Aparts': 'https://www.youtube.com/watch?v=nMB_zabRo74',
  'Light Lateral Raises': 'https://www.youtube.com/watch?v=ufrFCjERMDc',
  'Cat-Cow': 'https://www.youtube.com/watch?v=y39PrKY_4JM',
  'Ankle Rockers': 'https://www.youtube.com/watch?v=Hb-Q3Iy1HOo',
  'Bodyweight Squats': 'https://www.youtube.com/watch?v=gsNoPYwWXeM',
  'Glute Bridges': 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E'
};

// ── Exercise Cards (collapsible + video links + tip formatting) ──
document.querySelectorAll('.ex-card').forEach(function(card) {
  var top = card.querySelector('.ex-top');
  var hint = document.createElement('span');
  hint.className = 'ex-hint';
  hint.textContent = 'Details';
  top.appendChild(hint);
  var arrow = document.createElement('span');
  arrow.className = 'ex-arrow';
  arrow.textContent = '\u25be';
  top.appendChild(arrow);

  var tip = card.querySelector('.ex-tip');
  if (!tip) return;

  // Split tip text into bullet list
  var raw = tip.textContent.trim().replace('Rev. Curls', 'Reverse Curls');
  var bullets = raw.split(/\s*\|\s*|\.\s+/)
    .map(function(s){ return s.replace(/\.$/, '').trim(); })
    .filter(Boolean);
  tip.innerHTML = '<ul>' + bullets.map(function(b){ return '<li>' + b + '</li>'; }).join('') + '</ul>';

  // Wrap in collapsible container
  var wrap = document.createElement('div');
  wrap.className = 'ex-detail-wrap';
  var inner = document.createElement('div');
  inner.className = 'ex-detail-inner';
  tip.parentNode.insertBefore(wrap, tip);
  wrap.appendChild(inner);
  inner.appendChild(tip);

  // Inject video link if available
  var exName = card.querySelector('.ex-name');
  var vidUrl = exName && videoMap[exName.textContent.trim()];
  if (vidUrl) {
    var a = document.createElement('a');
    a.className = 'ex-vid';
    a.href = vidUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = '\u25b6 Watch Tutorial';
    a.addEventListener('click', function(e) { e.stopPropagation(); });
    card.insertBefore(a, wrap);
  }

  card.addEventListener('click', function() { card.classList.toggle('expanded'); });
});

// ── Warmup Blocks (collapsible + video links) ──
document.querySelectorAll('.warmup').forEach(function(warmup) {
  var labelSpan = warmup.querySelector('span');
  var isMobility = labelSpan.textContent.indexOf('MOBILITY') !== -1;

  // Extract text content
  var contentText = '';
  warmup.childNodes.forEach(function(node) {
    if (node.nodeType === 3) contentText += node.textContent;
  });
  contentText = contentText.trim();

  // Split into bullet items
  var bullets = contentText.split(isMobility ? ' \u2014 ' : ' + ')
    .map(function(s){ return s.trim(); }).filter(Boolean);

  // Build collapsible label
  var labelRow = document.createElement('div');
  labelRow.className = 'warmup-label';
  labelRow.appendChild(labelSpan.cloneNode(true));
  var wArrow = document.createElement('span');
  wArrow.className = 'warmup-arrow';
  wArrow.textContent = '\u25be';
  labelRow.appendChild(wArrow);

  // Build detail list with video links
  var detail = document.createElement('div');
  detail.className = 'warmup-detail';
  var wInner = document.createElement('div');
  wInner.className = 'warmup-inner';
  var ul = document.createElement('ul');
  bullets.forEach(function(b) {
    var li = document.createElement('li');
    li.textContent = b;
    var wKey = Object.keys(warmupVideoMap).find(function(k){ return b.indexOf(k) === 0; });
    if (wKey) {
      var wa = document.createElement('a');
      wa.className = 'warmup-vid';
      wa.href = warmupVideoMap[wKey];
      wa.target = '_blank';
      wa.rel = 'noopener noreferrer';
      wa.textContent = '\u25b6';
      wa.addEventListener('click', function(e) { e.stopPropagation(); });
      li.appendChild(wa);
    }
    ul.appendChild(li);
  });
  wInner.appendChild(ul);
  detail.appendChild(wInner);

  // Replace warmup contents
  warmup.innerHTML = '';
  warmup.appendChild(labelRow);
  warmup.appendChild(detail);
  warmup.addEventListener('click', function() { warmup.classList.toggle('expanded'); });
});

// ── Weight Tracking ──
var WEIGHT_KEY = 'workout_weights';

function loadWeightData() {
  try { return JSON.parse(localStorage.getItem(WEIGHT_KEY)) || {}; }
  catch(e) { return {}; }
}

function saveWeightData(data) {
  localStorage.setItem(WEIGHT_KEY, JSON.stringify(data));
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months[d.getMonth()] + ' ' + d.getDate();
}

function parseSetCount(text) {
  var m = text.match(/^(\d+)\s*[×x]/);
  return m ? parseInt(m[1]) : 0;
}

function saveExerciseWeight(exKey, setIndex, value, setCount) {
  var data = loadWeightData();
  var today = getToday();
  var entry = data[exKey];

  // If existing entry is from a different date, archive to history
  if (entry && entry.date && entry.date !== today) {
    var hadWeights = entry.weights && entry.weights.some(function(w) { return w !== null; });
    if (hadWeights) {
      if (!entry.history) entry.history = [];
      entry.history.push({ weights: entry.weights.slice(), date: entry.date });
      if (entry.history.length > 50) entry.history = entry.history.slice(-50);
    }
    entry.weights = entry.weights.slice(); // copy previous as starting point
    entry.date = today;
  }

  if (!entry) {
    entry = { weights: [], date: today, history: [] };
  }

  while (entry.weights.length < setCount) entry.weights.push(null);
  entry.weights[setIndex] = value ? parseFloat(value) : null;
  entry.date = today;
  data[exKey] = entry;
  saveWeightData(data);
}

// Inject weight inputs into exercise cards (skip Run panel)
(function() {
  var allData = loadWeightData();

  document.querySelectorAll('.panel:not(#panel-r) .ex-card').forEach(function(card) {
    var nameEl = card.querySelector('.ex-name');
    var setTag = card.querySelector('.tag-sets');
    if (!nameEl || !setTag) return;

    var exName = nameEl.textContent.trim();
    var setText = setTag.textContent.trim();
    var setCount = parseSetCount(setText);
    if (setCount === 0) return;

    // Detect superset (name has " + ", sets have " / ")
    var isSuperset = exName.indexOf(' + ') !== -1 && setText.indexOf('/') !== -1;
    var parts = isSuperset
      ? exName.split(/\s*\+\s*/).map(function(s) { return s.trim(); })
      : [exName];

    var weightLog = document.createElement('div');
    weightLog.className = 'weight-log';

    parts.forEach(function(partName, partIdx) {
      var storageKey = isSuperset ? exName + '::' + partIdx : exName;
      var saved = allData[storageKey];

      if (isSuperset) {
        var partLabel = document.createElement('div');
        partLabel.className = 'weight-part-label';
        partLabel.textContent = partName;
        weightLog.appendChild(partLabel);
      }

      var row = document.createElement('div');
      row.className = 'weight-row';

      for (var i = 0; i < setCount; i++) {
        var setDiv = document.createElement('div');
        setDiv.className = 'weight-set';

        var label = document.createElement('span');
        label.className = 'weight-label';
        label.textContent = 'S' + (i + 1);

        var input = document.createElement('input');
        input.type = 'number';
        input.className = 'weight-input';
        input.placeholder = '\u2014';
        input.step = '0.5';
        input.inputMode = 'decimal';
        if (saved && saved.weights && saved.weights[i] != null) {
          input.value = saved.weights[i];
        }

        (function(key, idx) {
          input.addEventListener('change', function() {
            saveExerciseWeight(key, idx, this.value, setCount);
          });
          input.addEventListener('click', function(e) { e.stopPropagation(); });
          input.addEventListener('touchstart', function(e) { e.stopPropagation(); }, { passive: true });
          input.addEventListener('focus', function(e) { e.stopPropagation(); });
        })(storageKey, i);

        var unit = document.createElement('span');
        unit.className = 'weight-unit';
        unit.textContent = 'kg';

        setDiv.appendChild(label);
        setDiv.appendChild(input);
        setDiv.appendChild(unit);
        row.appendChild(setDiv);
      }

      weightLog.appendChild(row);
    });

    // Show last updated date
    var dateKey = isSuperset ? exName + '::0' : exName;
    var dateSaved = allData[dateKey];
    if (dateSaved && dateSaved.date) {
      var dateEl = document.createElement('div');
      dateEl.className = 'weight-date';
      dateEl.textContent = 'Last: ' + formatDate(dateSaved.date);
      weightLog.appendChild(dateEl);
    }

    // Insert after .ex-tags
    var tags = card.querySelector('.ex-tags');
    if (tags) {
      tags.parentNode.insertBefore(weightLog, tags.nextSibling);
    }
  });
})();

// Export weights as JSON file
function exportWeights() {
  var data = loadWeightData();
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'workout-weights-' + getToday() + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import weights from JSON file
function importWeights(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var imported = JSON.parse(e.target.result);
      if (typeof imported !== 'object' || imported === null) throw new Error('Invalid format');
      // Merge: imported data takes precedence
      var current = loadWeightData();
      Object.keys(imported).forEach(function(key) { current[key] = imported[key]; });
      saveWeightData(current);
      location.reload();
    } catch(err) {
      alert('Invalid JSON file');
    }
  };
  reader.readAsText(file);
  input.value = '';
}

// ── Touch: use passive listeners for scroll/touch performance ──
document.addEventListener('touchstart', function(){}, { passive: true });
document.addEventListener('touchmove', function(){}, { passive: true });

// ── Service Worker (network-only, enables PWA install without caching) ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
