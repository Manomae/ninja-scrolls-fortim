export interface GiphyGif {
  id: string;
  url: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
    original: {
      url: string;
    };
  };
  isCustom?: boolean;
}

export const FEATURED_GIFS: GiphyGif[] = [
  {
    id: 'f1',
    url: '',
    title: 'Naruto vs Sasuke Final Battle',
    images: {
      fixed_height: { url: 'https://i.giphy.com/12p5byldyppxS0.gif' },
      original: { url: 'https://i.giphy.com/12p5byldyppxS0.gif' }
    }
  },
  {
    id: 'f2',
    url: '',
    title: 'Itachi Mangekyou Sharingan',
    images: {
      fixed_height: { url: 'https://i.giphy.com/CchzkJJ6UrQmQ.gif' },
      original: { url: 'https://i.giphy.com/CchzkJJ6UrQmQ.gif' }
    }
  },
  {
    id: 'f3',
    url: '',
    title: 'Pain Shinra Tensei',
    images: {
      fixed_height: { url: 'https://i.giphy.com/uS9id7YId695C.gif' },
      original: { url: 'https://i.giphy.com/uS9id7YId695C.gif' }
    }
  },
  {
    id: 'f4',
    url: '',
    title: 'Kakashi Chidori',
    images: {
      fixed_height: { url: 'https://i.giphy.com/idS6YvDmjTshW.gif' },
      original: { url: 'https://i.giphy.com/idS6YvDmjTshW.gif' }
    }
  },
  {
    id: 'f5',
    url: '',
    title: 'Madara Uchiha Dance',
    images: {
      fixed_height: { url: 'https://i.giphy.com/8SsqYhlSsk9vW.gif' },
      original: { url: 'https://i.giphy.com/8SsqYhlSsk9vW.gif' }
    }
  },
  {
    id: 'f6',
    url: '',
    title: 'Might Guy Night Guy',
    images: {
      fixed_height: { url: 'https://i.giphy.com/K7Zk8SclYF0S4.gif' },
      original: { url: 'https://i.giphy.com/K7Zk8SclYF0S4.gif' }
    }
  },
  {
    id: 'f7',
    url: '',
    title: 'Jiraiya Summoning',
    images: {
      fixed_height: { url: 'https://i.giphy.com/9G3gf72d4qSBy.gif' },
      original: { url: 'https://i.giphy.com/9G3gf72d4qSBy.gif' }
    }
  },
  {
    id: 'f8',
    url: '',
    title: 'Obito Awaken',
    images: {
      fixed_height: { url: 'https://i.giphy.com/f3fT7bXYhU3XG.gif' },
      original: { url: 'https://i.giphy.com/f3fT7bXYhU3XG.gif' }
    }
  },
  {
    id: 'f9',
    url: '',
    title: 'Naruto Sage Mode',
    images: {
      fixed_height: { url: 'https://i.giphy.com/pW2vS7S3R2pW0.gif' },
      original: { url: 'https://i.giphy.com/pW2vS7S3R2pW0.gif' }
    }
  },
  {
    id: 'f10',
    url: '',
    title: 'Minato Yellow Flash',
    images: {
      fixed_height: { url: 'https://i.giphy.com/7mU86E0r2ZIn6.gif' },
      original: { url: 'https://i.giphy.com/7mU86E0r2ZIn6.gif' }
    }
  },
  {
    id: 'f11',
    url: '',
    title: 'Kakashi Susanoo',
    images: {
      fixed_height: { url: 'https://i.giphy.com/A6ZlX8fkKqCap9UkS2.gif' },
      original: { url: 'https://i.giphy.com/A6ZlX8fkKqCap9UkS2.gif' }
    }
  },
  {
    id: 'f12',
    url: '',
    title: 'Sasuke Rinnegan',
    images: {
      fixed_height: { url: 'https://i.giphy.com/fW6p5WFT7pE63j8f1h.gif' },
      original: { url: 'https://i.giphy.com/fW6p5WFT7pE63j8f1h.gif' }
    }
  }
];

export interface Character {
  name: string;
  query: string;
  icon: string;
  color: string;
}

export const CHARACTERS: Character[] = [
  { name: 'Naruto', query: 'naruto uzumaki', icon: '🦊', color: '#ff9c00' },
  { name: 'Sasuke', query: 'sasuke uchiha', icon: '⚡', color: '#4b0082' },
  { name: 'Kakashi', query: 'kakashi hatake', icon: '📖', color: '#31405e' },
  { name: 'Itachi', query: 'itachi uchiha', icon: '🦅', color: '#8b0000' },
  { name: 'Minato', query: 'minato namikaze', icon: '🟡', color: '#ffd700' },
  { name: 'Jiraiya', query: 'jiraiya naruto', icon: '🐸', color: '#8b0000' },
  { name: 'Pain', query: 'pain nagato', icon: '☁️', color: '#ff4500' },
  { name: 'Obito', query: 'obito uchiha', icon: '🎭', color: '#1a1a1a' },
  { name: 'Rock Lee', query: 'rock lee naruto', icon: '🍃', color: '#228b22' },
  { name: 'Gaara', query: 'gaara of the sand', icon: '🏜️', color: '#a0522d' },
  { name: 'Shikamaru', query: 'shikamaru nara', icon: '♟️', color: '#4b5320' },
  { name: 'Hinata', query: 'hinata hyuga', icon: '👁️', color: '#9370db' },
  { name: 'Sakura', query: 'sakura haruno', icon: '🌸', color: '#ff69b4' },
  { name: 'Madara', query: 'madara uchiha', icon: '☄️', color: '#000000' },
  { name: 'Orochimaru', query: 'orochimaru', icon: '🐍', color: '#483d8b' },
  { name: 'Tsunade', query: 'tsunade senju', icon: '🐌', color: '#105324' },
  { name: 'Killer Bee', query: 'killer bee naruto', icon: '🐙', color: '#c0c0c0' },
  { name: 'Neji', query: 'neji hyuga', icon: '☸️', color: '#f0f8ff' },
  { name: 'Might Guy', query: 'might guy', icon: '🔥', color: '#ff0000' },
  { name: 'Hidan', query: 'hidan akatsuki', icon: '🥀', color: '#000000' },
  { name: 'Deidara', query: 'deidara art', icon: '💥', color: '#ffff00' },
  { name: 'Kisame', query: 'kisame hoshigaki', icon: '🦈', color: '#0000ff' },
  { name: 'Konan', query: 'konan naruto', icon: '📄', color: '#add8e6' },
];

export const CATEGORIES = [
  { name: 'Rasengan', query: 'naruto rasengan' },
  { name: 'Chidori', query: 'sasuke chidori' },
  { name: 'Sharingan', query: 'sharingan anime' },
  { name: 'Akatsuki', query: 'akatsuki naruto' },
  { name: 'Funny', query: 'naruto funny moments' },
  { name: 'Sad', query: 'naruto sad moments' },
];
