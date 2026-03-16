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
  'Leg Press': 'https://www.youtube.com/watch?v=sEM_zo9w2ss',
  'Standing Overhead Barbell Press': 'https://www.youtube.com/watch?v=j7ULT6dznNc',
  'Weighted Chin-Ups': 'https://www.youtube.com/watch?v=-HV2bwkP6VU',
  'Pull-Ups / Lat Pulldowns': 'https://www.youtube.com/watch?v=poyr8KenUfc',
  'Weighted Dips (Lean Forward)': 'https://www.youtube.com/watch?v=ZQnPQG5d67E',
  'Lateral Raises': 'https://www.youtube.com/watch?v=ufrFCjERMDc',
  'Face Pulls': 'https://www.youtube.com/watch?v=7ZvpXA_mFpQ',
  'Strict Barbell Curls + Rope Pushdowns': 'https://www.youtube.com/watch?v=LzwgB15UdO8',
  'Barbell Romanian Deadlift': 'https://www.youtube.com/watch?v=7ADxnAcNjho',
  'Incline Bench Press': 'https://www.youtube.com/watch?v=uIzbJX5EVIY',
  'Seated Cable Rows': 'https://www.youtube.com/watch?v=GZbfZ033f74'
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

// ── Touch: use passive listeners for scroll/touch performance ──
document.addEventListener('touchstart', function(){}, { passive: true });
document.addEventListener('touchmove', function(){}, { passive: true });

// ── Service Worker (network-only, enables PWA install without caching) ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
