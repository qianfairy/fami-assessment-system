// 儿童入学综合能力测评题目数据
// 结构：扁平数组，每个题目包含 classLevel 和 domain

export const questions = [
  // ==========================================
  // 1. 衔接班 (Transition Class)
  // ==========================================
  
  // 领域一：语言基础
  {
    id: 'trans-L1',
    classLevel: '衔接班',
    domain: '领域一：语言基础',
    text: '词汇指认：能正确指认实物（如苹果、杯子）、身体部位（如鼻子）及关联声音（如猫狗叫声）。',
    score: 1
  },
  {
    id: 'trans-L2',
    classLevel: '衔接班',
    domain: '领域一：语言基础',
    text: '基础表达：想要东西时能说"要"或"给我"；能说出简单的词（如"哭"、"难过"）；能说出自己的名字。',
    score: 1
  },
  {
    id: 'trans-L3',
    classLevel: '衔接班',
    domain: '领域一：语言基础',
    text: '指令理解：能执行一步指令（如"拿积木"）；能执行两步连续指令（如"拍手然后坐下"）；能简单理解"为什么"。',
    score: 1
  },

  // 领域二：深度阅读 (注：衔接班重点在专注与兴趣)
  {
    id: 'trans-R1',
    classLevel: '衔接班',
    domain: '领域二：深度阅读',
    text: '听读专注：能安静听完2-3分钟的简短故事，不随意走动。',
    score: 1
  },
  {
    id: 'trans-R2',
    classLevel: '衔接班',
    domain: '领域二：深度阅读',
    text: '视觉跟随：听故事时，眼神能跟随老师或图书画面。',
    score: 1
  },
  {
    id: 'trans-R3',
    classLevel: '衔接班',
    domain: '领域二：深度阅读',
    text: '互动回应：在阅读过程中听到自己名字或简单提问时，能给予回应。',
    score: 1
  },

  // 领域三：社会适应
  {
    id: 'trans-S1',
    classLevel: '衔接班',
    domain: '领域三：社会适应',
    text: '规则适应：在引导下能安坐3-5分钟；能执行"收玩具"等简单集体指令。',
    score: 1
  },
  {
    id: 'trans-S2',
    classLevel: '衔接班',
    domain: '领域三：社会适应',
    text: '情绪表达：能指认"开心/难过"表情；能用简单词或动作表达"疼/怕"。',
    score: 1
  },
  {
    id: 'trans-S3',
    classLevel: '衔接班',
    domain: '领域三：社会适应',
    text: '情绪调节：在成人安抚下，能逐渐停止哭泣或发脾气。',
    score: 1
  },

  // 领域四：数学逻辑
  {
    id: 'trans-M1',
    classLevel: '衔接班',
    domain: '领域四：数学逻辑',
    text: '基础数感：能区分"1"和"许多"；能口头数数1-5；能按指令取出1-2个物品。',
    score: 1
  },
  {
    id: 'trans-M2',
    classLevel: '衔接班',
    domain: '领域四：数学逻辑',
    text: '图形认知：能指认圆形、方形、三角形；能完成3-4块的简单拼图。',
    score: 1
  },
  {
    id: 'trans-M3',
    classLevel: '衔接班',
    domain: '领域四：数学逻辑',
    text: '空间指令：能理解并执行"放在里面"或"放在上面"的空间指令。',
    score: 1
  },

  // 领域五：文化创意
  {
    id: 'trans-C1',
    classLevel: '衔接班',
    domain: '领域五：文化创意',
    text: '节日感知：知道"春节"等常见节日；能模仿简单的节日动作（如作揖）。',
    score: 1
  },
  {
    id: 'trans-C2',
    classLevel: '衔接班',
    domain: '领域五：文化创意',
    text: '涂鸦表现：能握笔自由涂鸦；能用彩泥进行简单的团圆或压扁。',
    score: 1
  },
  {
    id: 'trans-C3',
    classLevel: '衔接班',
    domain: '领域五：文化创意',
    text: '律动表达：能跟随音乐节奏自由摆动身体。',
    score: 1
  },

  // ==========================================
  // 2. 小班 (Small Class)
  // ==========================================

  // 领域一：语言基础
  {
    id: 'small-L1',
    classLevel: '小班',
    domain: '领域一：语言基础',
    text: '完整句表达：能用完整句子回答问题（如"小狗在跑步"、"它是红色的"）。',
    score: 1
  },
  {
    id: 'small-L2',
    classLevel: '小班',
    domain: '领域一：语言基础',
    text: '词汇运用：能说出3种水果名称；能使用"开心/生气"情绪词；能用"大/小"形容词。',
    score: 1
  },
  {
    id: 'small-L3',
    classLevel: '小班',
    domain: '领域一：语言基础',
    text: '基础运笔：能正确三指握笔；能描画偏差不大的横竖线；能描画简单图形轮廓。',
    score: 1
  },

  // 领域二：深度阅读
  {
    id: 'small-R1',
    classLevel: '小班',
    domain: '领域二：深度阅读',
    text: '预测情节：能根据封面猜测故事内容；能根据情节发展猜测"接下来发生什么"。',
    score: 1
  },
  {
    id: 'small-R2',
    classLevel: '小班',
    domain: '领域二：深度阅读',
    text: '联系自我：能将故事角色与自身经历联系（如"我也有时候会难过"）。',
    score: 1
  },
  {
    id: 'small-R3',
    classLevel: '小班',
    domain: '领域二：深度阅读',
    text: '角色喜好：能说出故事里喜欢谁，并简单尝试说明理由。',
    score: 1
  },

  // 领域三：社会适应
  {
    id: 'small-S1',
    classLevel: '小班',
    domain: '领域三：社会适应',
    text: '集体规则：理解轮流等待；知道玩具分享不抢夺；能参与集体拍手等活动。',
    score: 1
  },
  {
    id: 'small-S2',
    classLevel: '小班',
    domain: '领域三：社会适应',
    text: '情绪归因：能说出"我生气了"并简单描述原因；能识别故事角色的基本情绪。',
    score: 1
  },
  {
    id: 'small-S3',
    classLevel: '小班',
    domain: '领域三：社会适应',
    text: '抗挫能力：遇到困难（如积木倒塌）时，在鼓励下能再次尝试而非立即哭闹。',
    score: 1
  },

  // 领域四：数学逻辑
  {
    id: 'small-M1',
    classLevel: '小班',
    domain: '领域四：数学逻辑',
    text: '数与运算：能手口一致点数5以内物体；能比较"多/少/一样多"；感知简单的"添上一个"。',
    score: 1
  },
  {
    id: 'small-M2',
    classLevel: '小班',
    domain: '领域四：数学逻辑',
    text: '分类比较：能按颜色或形状分类；能比较长短、高矮、大小。',
    score: 1
  },
  {
    id: 'small-M3',
    classLevel: '小班',
    domain: '领域四：数学逻辑',
    text: '规律排序：能发现并延续简单的AB规律（如红蓝红蓝...）。',
    score: 1
  },

  // 领域五：文化创意
  {
    id: 'small-C1',
    classLevel: '小班',
    domain: '领域五：文化创意',
    text: '文化认知：知道春节吃饺子等习俗；认识京剧脸谱或剪纸等传统形式。',
    score: 1
  },
  {
    id: 'small-C2',
    classLevel: '小班',
    domain: '领域五：文化创意',
    text: '拼贴拓印：能使用树叶、棉签等材料进行简单的拓印或拼贴创作。',
    score: 1
  },
  {
    id: 'small-C3',
    classLevel: '小班',
    domain: '领域五：文化创意',
    text: '动作模仿：能根据音乐用动作表现简单形象（如小鸟飞、兔子跳）。',
    score: 1
  },

  // ==========================================
  // 3. 中班 (Middle Class)
  // ==========================================

  // 领域一：语言基础
  {
    id: 'mid-L1',
    classLevel: '中班',
    domain: '领域一：语言基础',
    text: '逻辑复句：能使用"因为...所以"回答问题；能用"如果...就"造句；能描述先后顺序。',
    score: 1
  },
  {
    id: 'mid-L2',
    classLevel: '中班',
    domain: '领域一：语言基础',
    text: '上下文猜词：能根据故事上下文推测陌生词语（如"鸦雀无声"）的大概意思。',
    score: 1
  },
  {
    id: 'mid-L3',
    classLevel: '中班',
    domain: '领域一：语言基础',
    text: '书写准备：能在田字格规范书写名字；书写姿势符合标准；能区分拼音基本笔画。',
    score: 1
  },

  // 领域二：深度阅读
  {
    id: 'mid-R1',
    classLevel: '中班',
    domain: '领域二：深度阅读',
    text: '图像化能力：听描述能想象画面（如"月亮像银盘"）；能将场景画出来或用动作演出来。',
    score: 1
  },
  {
    id: 'mid-R2',
    classLevel: '中班',
    domain: '领域二：深度阅读',
    text: '主动提问：阅读中能主动提出相关问题；能针对细节进行追问。',
    score: 1
  },
  {
    id: 'mid-R3',
    classLevel: '中班',
    domain: '领域二：深度阅读',
    text: '思考痕迹：提出的问题表明孩子在思考故事内容，而非无关发散。',
    score: 1
  },

  // 领域三：社会适应
  {
    id: 'mid-S1',
    classLevel: '中班',
    domain: '领域三：社会适应',
    text: '合作沟通：愿意交换材料或轮流扮演；冲突时尝试语言沟通而非动手。',
    score: 1
  },
  {
    id: 'mid-S2',
    classLevel: '中班',
    domain: '领域三：社会适应',
    text: '共情反应：能注意同伴情绪并做简单回应（如递纸巾、告诉老师）。',
    score: 1
  },
  {
    id: 'mid-S3',
    classLevel: '中班',
    domain: '领域三：社会适应',
    text: '责任感：能整理个人物品；能承担分发材料等简单值日任务。',
    score: 1
  },

  // 领域四：数学逻辑
  {
    id: 'mid-M1',
    classLevel: '中班',
    domain: '领域四：数学逻辑',
    text: '数概念：掌握10以内点数；理解"第几"序数；理解5以内的分成与合并。',
    score: 1
  },
  {
    id: 'mid-M2',
    classLevel: '中班',
    domain: '领域四：数学逻辑',
    text: '逻辑推理：能按双维度分类（如红色+圆形）；识别AABB/ABC规律；简单类比推理。',
    score: 1
  },
  {
    id: 'mid-M3',
    classLevel: '中班',
    domain: '领域四：数学逻辑',
    text: '时空概念：理解白天/黑夜、昨天/明天；能辨别以自身为中心的"前后左右"。',
    score: 1
  },

  // 领域五：文化创意
  {
    id: 'mid-C1',
    classLevel: '中班',
    domain: '领域五：文化创意',
    text: '文化寓意：说出春节/中秋的"团圆"寓意；了解《西游记》等经典角色。',
    score: 1
  },
  {
    id: 'mid-C2',
    classLevel: '中班',
    domain: '领域五：文化创意',
    text: '主题创作：能围绕主题（如"我的家"）绘画；能搭建结构复杂的积木作品。',
    score: 1
  },
  {
    id: 'mid-C3',
    classLevel: '中班',
    domain: '领域五：文化创意',
    text: '表演表达：能欣赏简单艺术品颜色形状；能进行简单的角色扮演。',
    score: 1
  },

  // ==========================================
  // 4. 大班 (Big Class)
  // ==========================================

  // 领域一：语言基础
  {
    id: 'big-L1',
    classLevel: '大班',
    domain: '领域一：语言基础',
    text: '拼音意识：能正确分音（如老-师）；能找出指定声母开头物品；尝试分解声韵母。',
    score: 1
  },
  {
    id: 'big-L2',
    classLevel: '大班',
    domain: '领域一：语言基础',
    text: '书写规范：坐姿握笔标准；能正确书写单韵母；能按笔顺书写简单独体字。',
    score: 1
  },
  {
    id: 'big-L3',
    classLevel: '大班',
    domain: '领域一：语言基础',
    text: '复杂表达：能用"首先...然后...最后"描述过程；能清晰转述长句；连贯叙述3-4句话。',
    score: 1
  },

  // 领域二：深度阅读
  {
    id: 'big-R1',
    classLevel: '大班',
    domain: '领域二：深度阅读',
    text: '概括能力：能说出故事主要讲了谁和什么事；能用一两句话概括情节；能起新标题。',
    score: 1
  },
  {
    id: 'big-R2',
    classLevel: '大班',
    domain: '领域二：深度阅读',
    text: '思辨评价：能评价角色行为（如大灰狼是否完全坏）；能提出不同结局想法。',
    score: 1
  },
  {
    id: 'big-R3',
    classLevel: '大班',
    domain: '领域二：深度阅读',
    text: '换位思考：如果自己是主人公，会怎么做，并能说出理由。',
    score: 1
  },

  // 领域三：社会适应
  {
    id: 'big-S1',
    classLevel: '大班',
    domain: '领域三：社会适应',
    text: '复杂社交：主动邀请或协商加入游戏；能进行小组任务分工合作。',
    score: 1
  },
  {
    id: 'big-S2',
    classLevel: '大班',
    domain: '领域三：社会适应',
    text: '冲突解决：能运用猜拳、协商等策略解决争端；能理解他人"失望/尴尬"等复杂情绪。',
    score: 1
  },
  {
    id: 'big-S3',
    classLevel: '大班',
    domain: '领域三：社会适应',
    text: '情绪助人：能想出帮助他人调节情绪的方法（如安慰、讲笑话）。',
    score: 1
  },

  // 领域四：数学逻辑
  {
    id: 'big-M1',
    classLevel: '大班',
    domain: '领域四：数学逻辑',
    text: '运算应用：掌握10以内分解组成；能进行10以内加减；解决简单应用题（如剩几颗糖）。',
    score: 1
  },
  {
    id: 'big-M2',
    classLevel: '大班',
    domain: '领域四：数学逻辑',
    text: '抽象逻辑：能进行多重属性分类；能填补复杂规律；理解简单等量代换。',
    score: 1
  },
  {
    id: 'big-M3',
    classLevel: '大班',
    domain: '领域四：数学逻辑',
    text: '逻辑推理：能根据图形、数字符号的规律进行推理。',
    score: 1
  },

  // 领域五：文化创意
  {
    id: 'big-C1',
    classLevel: '大班',
    domain: '领域五：文化创意',
    text: '文化比较：说出传统节日传说；能举例中西饮食/文化不同点。',
    score: 1
  },
  {
    id: 'big-C2',
    classLevel: '大班',
    domain: '领域五：文化创意',
    text: '综合创意：能综合运用绘画、手工等多形式创作；能为作品设计解说。',
    score: 1
  },
  {
    id: 'big-C3',
    classLevel: '大班',
    domain: '领域五：文化创意',
    text: '艺术评价：能尊重不同文化艺术；能对同伴作品提出具体的欣赏点或建议。',
    score: 1
  }
];

// 从题目数据中提取所有层级（中文）
export const levels = ['衔接班', '小班', '中班', '大班'];

// 从题目数据中提取所有维度（按顺序）
export const dimensions = [
  '领域一：语言基础',
  '领域二：深度阅读',
  '领域三：社会适应',
  '领域四：数学逻辑',
  '领域五：文化创意'
];

// 获取维度显示名称（去掉"领域X："前缀）
export const getDimensionDisplayName = (domain) => {
  return domain.replace(/^领域[一二三四五]：/, '');
};


