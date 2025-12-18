export const assessmentCriteria = [
  {
    category: "语言沟通",
    items: [
      { 
        id: "1.1", 
        label: "词汇理解与运用", 
        options: [
          { score: 1, text: "能理解并指认常见物品、动作的词汇（如苹果、跑）" },
          { score: 2, text: "能理解并运用一些形容词、方位词" },
          { score: 3, text: "能理解并尝试运用简单的关联词（如和、然后）" },
          { score: 4, text: "能理解并运用更丰富的词汇描述事物状态" }
        ]
      },
      { 
        id: "1.2", 
        label: "句式表达与复杂度", 
        options: [
          { score: 1, text: "主要使用单词句、电报句" },
          { score: 2, text: "能主动使用'主+谓+宾'完整句" },
          { score: 3, text: "能使用简单的复合句（因为...所以...）" },
          { score: 4, text: "能进行3-4句以上有逻辑的连贯讲述" }
        ]
      },
      { 
        id: "1.3", 
        label: "表达意愿与流畅度", 
        options: [
          { score: 1, text: "多在情境驱使下表达，偶有不流畅" },
          { score: 2, text: "愿意在集体面前表达，清晰自信" },
          { score: 3, text: "能主动发起对话，表达流畅" },
          { score: 4, text: "能自如地进行表达和交流，语言表达富有感染力" }
        ]
      },
      { 
        id: "1.4", 
        label: "倾听与回应", 
        options: [
          { score: 1, text: "能安静听简短故事，互动少" },
          { score: 2, text: "能回答'是什么'、'干什么'等简单问题" },
          { score: 3, text: "能就故事内容进行简单提问、回答" },
          { score: 4, text: "能深入讨论故事内容，提出有见地的问题和观点" }
        ]
      }
    ]
  },
  {
    category: "阅读思维",
    items: [
      { 
        id: "2.1", 
        label: "阅读习惯与兴趣", 
        options: [
          { score: 1, text: "能安坐听故事，不乱翻书" },
          { score: 2, text: "喜欢阅读，主动要求读绘本" },
          { score: 3, text: "能专注阅读较长时间，享受过程" },
          { score: 4, text: "有固定的阅读习惯和偏好，能自主选择阅读材料" }
        ]
      },
      { 
        id: "2.2", 
        label: "理解与预测", 
        options: [
          { score: 1, text: "能理解画面中的主要角色和简单动作" },
          { score: 2, text: "能根据封面预测故事，联系自身经历" },
          { score: 3, text: "能理解故事顺序，对3-4张图卡排序" },
          { score: 4, text: "能对故事内容提出自己的疑问和看法" }
        ]
      },
      { 
        id: "2.3", 
        label: "前识字与前书写", 
        options: [
          { score: 1, text: "建立书本概念，知道文字有意义" },
          { score: 2, text: "喜欢在环境中指认熟悉的符号、文字" },
          { score: 3, text: "能握笔进行有控制的涂鸦和描画" },
          { score: 4, text: "能书写简单的符号或名字，对文字有初步认知" }
        ]
      }
    ]
  },
  {
    category: "社会适应",
    items: [
      { 
        id: "3.1", 
        label: "情绪识别与表达", 
        options: [
          { score: 1, text: "能识别基本情绪（高兴、难过），表达方式简单" },
          { score: 2, text: "能识别多种情绪，能用语言描述自己的感受" },
          { score: 3, text: "能理解他人情绪，尝试安慰和帮助" },
          { score: 4, text: "能准确识别复杂情绪，恰当表达并调节情绪" }
        ]
      },
      { 
        id: "3.2", 
        label: "同伴交往与合作", 
        options: [
          { score: 1, text: "主要独自游戏，偶有平行游戏" },
          { score: 2, text: "愿意与同伴一起游戏，能分享玩具" },
          { score: 3, text: "能主动邀请同伴，进行简单的合作游戏" },
          { score: 4, text: "能组织小组活动，协调解决冲突，建立友谊" }
        ]
      },
      { 
        id: "3.3", 
        label: "规则意识与自控", 
        options: [
          { score: 1, text: "需要成人提醒遵守基本规则" },
          { score: 2, text: "能理解并遵守常见规则，偶尔需要提醒" },
          { score: 3, text: "能主动遵守规则，控制自己的行为" },
          { score: 4, text: "能理解规则的意义，自觉遵守并提醒他人" }
        ]
      },
      { 
        id: "3.4", 
        label: "生活自理能力", 
        options: [
          { score: 1, text: "在成人帮助下完成基本生活活动" },
          { score: 2, text: "能独立完成部分生活活动（如洗手、穿鞋）" },
          { score: 3, text: "能独立完成大部分生活活动，动作较熟练" },
          { score: 4, text: "生活自理能力强，能帮助他人完成生活活动" }
        ]
      }
    ]
  },
  {
    category: "学习品质",
    items: [
      { 
        id: "4.1", 
        label: "专注力与坚持性", 
        options: [
          { score: 1, text: "注意力容易分散，需要频繁提醒" },
          { score: 2, text: "能在感兴趣的活动上专注5-10分钟" },
          { score: 3, text: "能专注完成任务，遇到困难会尝试解决" },
          { score: 4, text: "能长时间专注，主动克服困难，坚持完成任务" }
        ]
      },
      { 
        id: "4.2", 
        label: "好奇心与探索欲", 
        options: [
          { score: 1, text: "对新鲜事物有短暂兴趣，观察较表面" },
          { score: 2, text: "喜欢提问，愿意尝试新活动" },
          { score: 3, text: "主动探索，能提出有深度的问题" },
          { score: 4, text: "有强烈的探索欲望，能进行深入思考和实验" }
        ]
      },
      { 
        id: "4.3", 
        label: "创造性思维", 
        options: [
          { score: 1, text: "主要模仿他人，创造性表现较少" },
          { score: 2, text: "能在模仿基础上进行简单变化" },
          { score: 3, text: "能提出新想法，进行创造性表达" },
          { score: 4, text: "能进行原创性思考，提出独特解决方案" }
        ]
      },
      { 
        id: "4.4", 
        label: "学习主动性", 
        options: [
          { score: 1, text: "多在成人引导下参与学习活动" },
          { score: 2, text: "能主动参与感兴趣的学习活动" },
          { score: 3, text: "主动寻找学习机会，积极提问和讨论" },
          { score: 4, text: "有强烈的学习动机，能自主规划和执行学习计划" }
        ]
      }
    ]
  }
];


