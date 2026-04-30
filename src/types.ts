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
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/12p5byldyppxS0/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/12p5byldyppxS0/giphy.gif' }
    }
  },
  {
    id: 'f2',
    url: '',
    title: 'Itachi Mangekyou Sharingan',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/CchzkJJ6UrQmQ/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/CchzkJJ6UrQmQ/giphy.gif' }
    }
  },
  {
    id: 'f3',
    url: '',
    title: 'Pain Shinra Tensei',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/uS9id7YId695C/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/uS9id7YId695C/giphy.gif' }
    }
  },
  {
    id: 'f4',
    url: '',
    title: 'Kakashi Chidori',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/idS6YvDmjTshW/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/idS6YvDmjTshW/giphy.gif' }
    }
  },
  {
    id: 'f5',
    url: '',
    title: 'Madara Uchiha Dance',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/8SsqYhlSsk9vW/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/8SsqYhlSsk9vW/giphy.gif' }
    }
  },
  {
    id: 'f6',
    url: '',
    title: 'Might Guy Night Guy',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/K7Zk8SclYF0S4/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/K7Zk8SclYF0S4/giphy.gif' }
    }
  },
  {
    id: 'f7',
    url: '',
    title: 'Jiraiya Summoning',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/9G3gf72d4qSBy/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/9G3gf72d4qSBy/giphy.gif' }
    }
  },
  {
    id: 'f8',
    url: '',
    title: 'Obito Awaken',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/f3fT7bXYhU3XG/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/f3fT7bXYhU3XG/giphy.gif' }
    }
  },
  {
    id: 'f9',
    url: '',
    title: 'Naruto Sage Mode',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/pW2vS7S3R2pW0/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/pW2vS7S3R2pW0/giphy.gif' }
    }
  },
  {
    id: 'f10',
    url: '',
    title: 'Minato Yellow Flash',
    images: {
      fixed_height: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/7mU86E0r2ZIn6/giphy.gif' },
      original: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeHl4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/7mU86E0r2ZIn6/giphy.gif' }
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
];

export const CATEGORIES = [
  { name: 'Rasengan', query: 'naruto rasengan' },
  { name: 'Chidori', query: 'sasuke chidori' },
  { name: 'Sharingan', query: 'sharingan anime' },
  { name: 'Akatsuki', query: 'akatsuki naruto' },
  { name: 'Funny', query: 'naruto funny moments' },
  { name: 'Sad', query: 'naruto sad moments' },
];
