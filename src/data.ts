export interface NeedleworkType {
  id: string;
  name: string;
  description: string;
  application: string;
  digitalEffect: string;
  image: string;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  chapterTitle?: string;
  image: string;
  needlework?: string;
  needleworkDetails?: {
    name: string;
    desc: string;
    effect: 'ping' | 'kelin' | 'xushi' | 'panjin' | 'dazi' | 'liantiao' | 'rao' | 'gun' | 'luan';
  }[];
  dialogue?: {
    role: 'engineer' | 'embroideress' | 'planner' | 'apprentice';
    text: string;
  }[];
  choice?: {
    prompt: string;
    options: { id: string; text: string }[];
  };
}

export const NEEDLEWORK_TYPES: NeedleworkType[] = [
  {
    id: 'ping',
    name: '平针',
    description: '基础铺底，均匀不露底。',
    application: '建筑墙面、天空、河水底色、衣料色块。',
    digitalEffect: '整齐粒子做静态底色，平整干净。',
    image: 'https://images.unsplash.com/photo-1542223175-7582dd4ee4fb?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'rao',
    name: '绕针',
    description: '波形线条，转折灵活。',
    application: '水波纹、衣褶、发丝、旗幡。',
    digitalEffect: '波浪粒子轨迹，轻动流畅。',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'panjin',
    name: '盘金',
    description: '金线盘绕，华贵高光。',
    application: '建筑轮廓、招牌金边、器物描边。',
    digitalEffect: '鎏金粒子勾边，精致贵气。',
    image: 'https://images.unsplash.com/photo-1542223175-7582dd4ee4fb?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'xushi',
    name: '虚实针',
    description: '疏密浓淡，虚实渐变。',
    application: '云雾、远山、烟雨、光影。',
    digitalEffect: '粒子密度变化，朦胧层次。',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'luan',
    name: '乱针',
    description: '交错线条，肌理写实。',
    application: '山石、树木、斑驳墙面、人物光影。',
    digitalEffect: '不规则粒子，自然肌理。',
    image: 'https://images.unsplash.com/photo-1542223175-7582dd4ee4fb?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'liantiao',
    name: '链条针',
    description: '链状连续，装饰线条。',
    application: '栏杆、边框、纹样边缘。',
    digitalEffect: '连贯链状粒子，韵律清晰。',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'dazi',
    name: '打子绣',
    description: '线结颗粒，立体点缀。',
    application: '花蕊、装饰点、饰品、招牌细节。',
    digitalEffect: '点状粒子，饱满突出。',
    image: 'https://images.unsplash.com/photo-1542223175-7582dd4ee4fb?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'gun',
    name: '滚针',
    description: '紧逼流畅，动态线条。',
    application: '水波、柳枝、须发、衣纹、街道线条。',
    digitalEffect: '核心交互针法，粒子流动灵动。',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=400&auto=format&fit=crop'
  }
];

export const GUSU_HOTSPOTS: Hotspot[] = [
  {
    id: 'lingyan',
    x: 2,
    y: 35,
    title: '灵岩山',
    chapterTitle: '序灵 · 画卷灵韵',
    description: '画卷的起点。灵岩山矗立于姑苏城西。画卷灵韵的旁白响起：“从灵岩山到虎丘，这 12 米长卷，每一针都绣着姑苏的繁华。”',
    image: '/微信图片_20260513234838_1362_132.jpg',
    needlework: '虚实针',
    needleworkDetails: [
      { name: '虚实针', desc: '表现云雾远山的朦胧层次感。', effect: 'xushi' }
    ]
  },
  {
    id: 'mudu',
    x: 8,
    y: 45,
    title: '木渎',
    chapterTitle: '第一章 · 绣之底色',
    description: '江南古镇之首。老绣娘的旁白响起：“平针打底，刻鳞做瓦，这是苏绣最扎实的功夫。”',
    image: '/微信图片_20260513234840_1363_132.jpg',
    needlework: '平针、刻鳞针',
    needleworkDetails: [
      { name: '平针', desc: '苏绣的基础底色针法，数字转译为均匀排列的淡色粒子，铺在民居墙面的基础纹理上。', effect: 'ping' },
      { name: '刻鳞针', desc: '讲解屋瓦的明暗层次，数字转译为错落排列的深灰色粒子，还原屋瓦的鳞片状纹理。', effect: 'kelin' }
    ],
    dialogue: [
      { role: 'embroideress', text: '若想完成它，你必须先学会真正的针法。' },
      { role: 'engineer', text: '用 AI 扫描一下，3 分钟就能生成这部分，不用花几天绣平针。' }
    ]
  },
  {
    id: 'shihu',
    x: 18,
    y: 50,
    title: '石湖',
    chapterTitle: '第二章 · 水色朦胧',
    description: '石湖山水，烟雨朦胧。苏绣学者的旁白响起：“虚实针的疏密，就是江南山水的呼吸。”',
    image: '/微信图片_20260513234841_1364_132.jpg',
    needlework: '虚实针',
    needleworkDetails: [
      { name: '虚实针', desc: '虚与实之间的呼吸，粒子密度随水温波动。', effect: 'xushi' }
    ],
    dialogue: [
      { role: 'embroideress', text: '针愈稀，线愈淡，虚与实之间，才有东方山水的呼吸。' },
      { role: 'planner', text: '游客只看得到山水，谁会在意针脚的疏密？用 AI 生成渐变，效率高多了。' }
    ]
  },
  {
    id: 'panmen',
    x: 35,
    y: 55,
    title: '盘门',
    chapterTitle: '中章 · 水陆并行',
    description: '姑苏古城门。由于盘金绣的华贵，这里常被选作高光地带。',
    image: '/微信图片_20260513234838_1362_132.jpg',
    needlework: '盘金绣',
    needleworkDetails: [
      { name: '盘金绣', desc: '增强城墙与招牌的高光效果。', effect: 'panjin' }
    ]
  },
  {
    id: 'changmen',
    x: 55,
    y: 40,
    title: '阊门商业区',
    chapterTitle: '第三章 · 市井高光',
    description: '姑苏繁华之最。老绣娘的旁白响起：“阊门的招牌，每一条金边都绣着姑苏的热闹。”',
    image: '/微信图片_20260513234838_1362_132.jpg',
    needlework: '盘金绣、打子绣',
    needleworkDetails: [
      { name: '盘金绣', desc: '金线回旋缠绕，回旋、平整，具有礼器感与华丽质感。', effect: 'panjin' },
      { name: '打子绣', desc: '打子绣一针一粒，如同万物生长。', effect: 'dazi' }
    ],
    dialogue: [
      { role: 'embroideress', text: '打子绣一针一粒，如同万物生长。' }
    ],
    choice: {
      prompt: '为了赶上展览进度，你要不要同意用 AI 生成核心区域的招牌？',
      options: [
        { id: 'AI', text: '同意使用 AI' },
        { id: 'MANUAL', text: '坚持手工绣制' }
      ]
    }
  },
  {
    id: 'shantang',
    x: 75,
    y: 35,
    title: '山塘街水市',
    chapterTitle: '第四章 · 烟火韵律',
    description: '七里山塘，红栏三百。青年学徒的旁白响起：“链条针要绣得稳，绕针要绣得活。”',
    image: '/微信图片_20260513234840_1363_132.jpg',
    needlework: '链条针、绕针',
    needleworkDetails: [
      { name: '链条针', desc: '讲解桥梁栏杆的连续线条。', effect: 'liantiao' },
      { name: '绕针', desc: '绕针重在方向一致，针迹若乱，纹样便失去灵气。', effect: 'rao' }
    ],
    dialogue: [
      { role: 'embroideress', text: '绕针重在方向一致，针迹若乱，纹样便失去灵气。' },
      { role: 'engineer', text: '链条针和绕针的线条，AI 用算法一秒就能生成，何必一针一线慢慢绣？' }
    ]
  },
  {
    id: 'fengqiao',
    x: 88,
    y: 30,
    title: '枫桥运河',
    chapterTitle: '第五章 · 流水与心',
    description: '枫桥夜泊。老绣娘的旁白响起：“滚针绣的水，是有心跳的，你看，它活过来了。”',
    image: '/微信图片_20260513234841_1364_132.jpg',
    needlework: '滚针',
    needleworkDetails: [
      { name: '滚针', desc: '连续、转折、流动，让静态绣面产生生命感。', effect: 'gun' }
    ],
    dialogue: [
      { role: 'embroideress', text: '滚针重在连续与流动，针脚紧随流水的心跳。' }
    ]
  },
  {
    id: 'huqiu',
    x: 95,
    y: 25,
    title: '虎丘',
    chapterTitle: '第六章 · 时光肌理',
    description: '画卷的终点。苏绣学者的旁白响起：“乱针看似无序，实则藏着山水的肌理。”',
    image: '/微信图片_20260513234838_1362_132.jpg',
    needlework: '乱针',
    needleworkDetails: [
      { name: '乱针', desc: '讲解山石、树木的斑驳肌理，数字转译为不规则交错的粒子，模拟乱针的针脚，靠近时粒子更密集，还原古画岁月感。', effect: 'luan' }
    ],
    dialogue: [
      { role: 'embroideress', text: '乱针看似无序，实则藏着自然万物的规律。' }
    ]
  }
];

export const HISTORY_TIMELINE = [
  { year: '宋—明', title: '姑苏题材刺绣萌芽', description: '苏州成为刺绣中心，画绣结合，风格精细雅洁。' },
  { year: '清乾隆', title: '母本诞生', description: '徐扬完成《盛世滋生图》，确立了写实繁华的范本。' },
  { year: '20世纪', title: '现代成型', description: '顾文霞领衔复刻1:1长卷，苏州繁华图重焕生机。' },
  { year: '21世纪', title: '当代巅峰', description: '姚惠芬、张玉英等多位大师持续推陈出新，长卷记录丝绸文明。' }
];
