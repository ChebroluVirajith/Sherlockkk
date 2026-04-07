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

  const syncDefaultClueByTitle = (title, round, payload) => {
    let existing = parsed.clues.find(c => c.title === title);
    let changed = false;
    
    if (!existing) {
      existing = {
        id: window.generateId(),
        round,
        title,
        released: true,
        createdAt: new Date().toISOString(),
        releasedAt: new Date().toISOString()
      };
      parsed.clues.push(existing);
      changed = true;
    }
    
    if (existing.round !== round) {
      existing.round = round;
      changed = true;
    }
    
    for (let key in payload) {
      if (existing[key] !== payload[key]) {
        existing[key] = payload[key];
        changed = true;
      }
    }
    return changed;
  };

  let updated = false;

  if (syncDefaultClueByTitle("Intercepted Transmission", 1, {
    description: "An audio file intercepted from the secure channel.",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    mediaType: "audio"
  })) updated = true;

  if (syncDefaultClueByTitle("Can You Solve It?", 2, {
    description: "A complex word search puzzle was recovered from the suspect's study. Search carefully for hidden clues to unlock the next piece of evidence.",
    mediaUrl: "puzzle.jpg",
    mediaType: "image"
  })) updated = true;

  if (syncDefaultClueByTitle("PIRATE QUEST", 3, {
    description: "A mysterious document outlining a pirate quest has been discovered. Download the case file to investigate further.",
    mediaUrl: "PIRATE QUEST.docx",
    mediaType: "document"
  })) updated = true;

  if (syncDefaultClueByTitle("Classified Testimony", 3, {
    description: "A secondary document has arrived in your feed. Review the Girivarun files for extra context.",
    mediaUrl: "girivarun.docx",
    mediaType: "document"
  })) updated = true;

  if (syncDefaultClueByTitle("Investigation Hint 1", 4, {
    description: "A mysterious image has been uncovered. Examine it closely.",
    mediaUrl: "Hint1.jpeg",
    mediaType: "image"
  })) updated = true;

  if (syncDefaultClueByTitle("Investigation Hint 2", 5, {
    description: "Another mysterious image has been uncovered. Examine it carefully.",
    mediaUrl: "Hint2.jpeg",
    mediaType: "image"
  })) updated = true;

  if (syncDefaultClueByTitle("Investigation Hint 3", 6, {
    description: "The final transmission has arrived.",
    mediaUrl: "Hint3.jpeg",
    mediaType: "image"
  })) updated = true;

  if (syncDefaultClueByTitle("Final Death Certificate", 7, {
    description: "The official death certificate. Review the findings.",
    mediaUrl: "DC.pdf",
    mediaType: "document"
  })) updated = true;

  if (syncDefaultClueByTitle("Final Case Summary", 7, {
    description: "The comprehensive case summary.",
    mediaUrl: "Case summary .pdf",
    mediaType: "document"
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
