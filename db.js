const DB_KEY = "sherlocked_db";

window.getDB = function() {
  const data = localStorage.getItem(DB_KEY);
  let parsed = { teams: [], clues: [], rounds: {1: false, 2: false, 3: false, 4: false, 5: false} };
  if (data) {
    try {
      parsed = JSON.parse(data);
    } catch(e) {}
  }

  if (!parsed.clues) parsed.clues = [];

  const addClueIfMissing = (round, payload) => {
    if (!parsed.clues.some(c => c.round === round)) {
      parsed.clues.push({
        id: window.generateId(),
        round,
        ...payload,
        released: true,
        createdAt: new Date().toISOString(),
        releasedAt: new Date().toISOString()
      });
      return true;
    }
    return false;
  };

  let updated = false;

  if (addClueIfMissing(1, {
    title: "Intercepted Transmission",
    description: "An audio file intercepted from the secure channel.",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    mediaType: "audio"
  })) updated = true;

  if (addClueIfMissing(2, {
    title: "Can You Solve It?",
    description: "A complex word search puzzle was recovered from the suspect's study. Search carefully for hidden clues to unlock the next piece of evidence.",
    mediaUrl: "puzzle.jpg",
    mediaType: "image"
  })) updated = true;

  if (addClueIfMissing(3, {
    title: "The Final Confrontation",
    description: "Our suspect has fled to the docks. Review the map detailing their known escape routes before time runs out.",
    mediaUrl: "https://images.unsplash.com/photo-1582299863261-000a6e87d468",
    mediaType: "image"
  })) updated = true;

  if (updated) {
    localStorage.setItem(DB_KEY, JSON.stringify(parsed));
  }
  
  return parsed;
};

window.saveDB = function(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('localDBUpdated'));
};

window.subscribeDB = function(callback) {
  const handler = () => callback(window.getDB());
  window.addEventListener('storage', handler);
  window.addEventListener('localDBUpdated', handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('localDBUpdated', handler);
  };
};

window.generateId = function() {
  return Math.random().toString(36).substring(2, 9);
};
