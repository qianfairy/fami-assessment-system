import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  determineStage,
  getHighestCategory,
  getLowestCategory,
  getRecommendedCourse,
  getCoursePath
} from '../utils/calculation';
import { Download, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { dimensions } from '../data/questions';

// 引入 Logo 图片 - Vite 会自动处理静态导入
import logoImg from './logo.png';

// 调试：检查图片路径是否正确引入
console.log('Logo Image Path:', logoImg);
console.log('Logo Image Type:', typeof logoImg);

// 课程愿景数据（完整版）
const courseVisionData = {
  "衔接班": {
    title: "启蒙探险家计划 (衔接班 → 小班)",
    goal: "引爆语言潜能，完成从家庭个体到集体小成员的快乐过渡，建立对学习的原始热爱。",
    surprises: [
      '✨ 从"用手指"到"用语言"：孩子不再是哼哼或哭闹，而是能清晰地说出"老师，我要喝水"、"妈妈，抱抱我"。',
      '✨ 从"坐不住"到"小书迷"：能够津津有味地听完一个完整故事，并会主动去书角拿书，要求"再讲一遍"！',
      "✨ '小社交家'初现：在游戏中学会轮流等待，会主动观察和模仿小伙伴，发出一起玩的邀请。",
      '✨ "发现世界的眼睛"：会对周围的一切充满好奇，"这是什么？""为什么？"成为口头禅。'
    ]
  },
  "小班": {
    title: "小小思想家计划 (小班 → 中班)",
    goal: "实现语言表达的完整化、逻辑化，成为会观察、会提问、会合作的'小大人'。",
    surprises: [
      '✨ "金句小达人"：告别单词蹦跳，能声情并茂地描述一件事："今天在幼儿园，我和明明一起搭了一个好高的城堡！"',
      '✨ "故事小侦探"：读完绘本，能自信地预测情节："我猜大灰狼最后肯定没得逞！"，并能在生活中找到故事影子。',
      '✨ "文化小传承人"：过节时，他能头头是道地告诉您"中秋节要吃月饼，因为要纪念嫦娥姐姐"。',
      '✨ "项目小搭档"：在小组活动中，能明确自己的任务，和小伙伴一起完成一次"搭桥"或"种豆"实验。'
    ]
  },
  "中班": {
    title: "智慧创造者计划 (中班 → 大班)",
    goal: "掌握深度思考的'工具'，能从'是什么'进阶到'为什么'，展现初步的批判性思维和创造力。",
    surprises: [
      '✨ "逻辑小讲师"：能条理清晰地解释事件原因："因为下雨了，所以我们要打伞，不然会淋湿生病。"',
      '✨ "成语小高手"：会在恰当场合蹦出成语，比如看完比赛会说"我们队反败为胜了！"，让您大吃一惊。',
      '✨ "小小辩论手"：不再人云亦云，会对故事提出自己的看法："我觉得小红帽也有错，她不该和陌生人说话。"',
      '✨ "解决方案专家"：面对"如何让鸡蛋从高处落下不碎"的挑战，能提出天马行空却自有道理的方案，并动手验证。'
    ]
  },
  "大班": {
    title: "小学预备领袖计划 (大班强化课程)",
    goal: "全面对接小学核心素养，不仅在知识上，更在心态和习惯上，成为自信、从容的'准小学生'。",
    surprises: [
      "✨ '小学老师眼中的优等生'：具备清晰的拼音意识，能工整书写自己的名字，握笔姿势标准，具备远超同龄人的听讲意识。",
      '✨ "故事大王"：能用"五指复述法"流利、有条理地复述一个复杂故事，概括中心思想，这是小学语文的绝对优势！',
      "✨ '自信演讲家'：能落落大方地站在台前，向全班同学推荐一本好书，眼神坚定，声音洪亮。",
      '✨ "项目小领袖"：能带领小组同学，完成一个关于"恐龙"或"太空"的主题研究，并制作海报进行演讲。'
    ]
  }
};

// 获取下一级别
const getNextLevel = (currentLevel) => {
  const levelMap = {
    "衔接班": "小班",
    "小班": "中班",
    "中班": "大班",
    "大班": "大班强化"
  };
  return levelMap[currentLevel] || "大班强化";
};

// 页眉组件
const PageHeader = ({ date }) => {
  // 调试：在组件内部再次检查图片路径
  console.log('PageHeader - Logo Image Path:', logoImg);
  console.log('PageHeader - Logo Image Type:', typeof logoImg);
  
  // 如果静态导入失败，使用 new URL 作为备用方案
  const getLogoPath = () => {
    if (logoImg && typeof logoImg === 'string' && logoImg.length > 0) {
      return logoImg;
    }
    // 备用方案：使用 new URL
    try {
      const fallbackPath = new URL('./logo.png', import.meta.url).href;
      console.log('Using fallback path with new URL():', fallbackPath);
      return fallbackPath;
    } catch (error) {
      console.error('Failed to create fallback URL:', error);
      return null;
    }
  };
  
  const logoSource = getLogoPath();
  
  return (
    <div className="shrink-0" style={{ pageBreakInside: 'avoid' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-row items-center gap-3 flex-1">
          {/* Logo 图片 */}
          {logoSource ? (
            <img
              src={logoSource}
              alt="饭米多蔻 Logo"
              className="h-10 w-auto object-contain mt-[2px]"
              style={{ display: 'block', marginTop: '2px' }}
              onError={(e) => {
                console.error('❌ Logo image failed to load!');
                console.error('Attempted path:', logoSource);
                console.error('LogoImg original value:', logoImg);
                // 隐藏图片，显示占位符
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('✅ Logo image loaded successfully:', logoSource);
              }}
            />
          ) : (
            <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500 flex-shrink-0 mt-[2px]" style={{ marginTop: '2px' }}>
              Logo
            </div>
          )}
          <h1 className="text-lg font-bold text-slate-800 tracking-wide font-sans leading-none">
            饭米多蔻中英文绘本馆
          </h1>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">入学综合能力测评报告</div>
          <div className="text-xs text-gray-400 mt-1">{date}</div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-orange-400 to-red-400 h-1 rounded-full"></div>
    </div>
  );
};

// 页脚组件
const PageFooter = () => (
  <div className="shrink-0 text-center" style={{ pageBreakInside: 'avoid' }}>
    <p className="text-sm text-gray-400 italic">让阅读成为孩子一生的礼物</p>
  </div>
);

// 学习路径方案组件（简化版，移除重复的惊喜蜕变）
const LearningPathPlans = ({ currentLevel }) => {
  const nextLevel = getNextLevel(currentLevel);

  const plans = [
    {
      id: 'A',
      name: '基础版',
      title: '进阶一级·稳步提升',
      period: '3-4个月',
      description: `仅包含${currentLevel}课程`,
      suitableFor: '适合希望稳步提升，打好基础的家庭',
      expectedEffect: '完成当前级别的核心能力培养',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      isRecommended: false
    },
    {
      id: 'B',
      name: '进阶版',
      title: '进阶二级·跨越成长',
      period: '7-9个月',
      description: `包含${currentLevel} + ${nextLevel}课程`,
      suitableFor: '适合追求跨越式成长，希望孩子快速进阶的家庭',
      expectedEffect: '完成两个级别的系统培养，实现能力跨越',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      isRecommended: true
    },
    {
      id: 'C',
      name: '长线版',
      title: '完整路径·直通小学',
      period: '12个月+',
      description: `从${currentLevel}直通小学入学`,
      suitableFor: '适合追求长期规划，希望全面对接小学的家庭',
      expectedEffect: '全面对接小学核心素养，成为自信的准小学生',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-400',
      isRecommended: false
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 print-card" style={{ pageBreakInside: 'avoid' }}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`${plan.bgColor} rounded-2xl border-2 ${plan.borderColor} p-4 relative shadow-sm border border-orange-100`}
          style={{ pageBreakInside: 'avoid' }}
        >
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">方案 {plan.id}</span>
              <span className="text-sm font-bold text-slate-800">{plan.name}</span>
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-2 leading-tight">{plan.title}</h4>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">{plan.description}</p>
            <div className="text-sm font-semibold text-orange-600 mb-3">
              预计周期：{plan.period}
            </div>
          </div>
          <div className="mb-3">
            <div className="text-sm font-semibold text-slate-800 mb-2">适合对象：</div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">{plan.suitableFor}</p>
            <div className="text-sm font-semibold text-slate-800 mb-2">预期效果：</div>
            <p className="text-sm text-gray-700 leading-relaxed">{plan.expectedEffect}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 防崩卫士：如果 location.state 是空的，防止白屏
  const { 
    studentInfo, 
    results, 
    totalScore, 
    maxScore,
    selectedClass 
  } = location.state || {};

  // 如果数据丢失，显示错误提示
  if (!location.state || !studentInfo || !results) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-red-800 font-bold text-xl mb-4">数据丢失</h2>
          <p className="text-red-600 mb-4">测评数据未找到，请返回首页重新测评。</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  // 转换 results 格式（如果是对象，转换为数组）
  const resultsArray = Array.isArray(results) 
    ? results 
    : Object.entries(results).map(([category, score]) => ({
        category: category.replace(/^领域[一二三四五]：/, ''),
        categoryScore: score
      }));

  const overallScore = totalScore || 0;
  const stage = determineStage(overallScore);
  const highestCategory = getHighestCategory(resultsArray);
  const lowestCategory = getLowestCategory(resultsArray);
  const recommendedCourse = getRecommendedCourse(stage.level);
  const coursePath = getCoursePath(stage.level);

  // 准备雷达图数据
  const radarData = resultsArray.map(result => ({
    category: result.category,
    score: result.categoryScore,
    fullMark: 3 // 每个维度满分是3分（3道题）
  }));

  // 定义点评话术库
  const feedbackDatabase = {
    "领域一：语言基础": {
      weak: "能进行基础表达，但在使用逻辑关联词（如'因为...所以...'）或复杂句式时略显吃力。建议：在课程中通过复述故事、情景对话加强逻辑表达训练。",
      strong: "语言表达能力出色，词汇量丰富，能流畅地描述事件和表达观点，具备极佳的语言天赋！"
    },
    "领域二：深度阅读": {
      weak: "想象力丰富，能将文字图像化，但在概括故事主要内容（抓重点）的能力上有待提升。建议：学习使用'谁-在哪里-做了什么-结果怎样'的句式进行概括练习。",
      strong: "阅读理解能力很强，不仅能读懂故事，还能进行预测和思辨，具备成为'深度阅读者'的潜质。"
    },
    "领域三：社会适应": {
      weak: "规则意识初步建立，但在复杂社交场景（如解决冲突、情绪管理）方面需要更多引导。建议：通过角色扮演游戏，模拟社交冲突，练习正确的解决策略。",
      strong: "情商很高，适应能力强，懂得合作与分享，是集体中受欢迎的小伙伴。"
    },
    "领域四：数学逻辑": {
      weak: "数感良好，但在抽象逻辑推理（如规律排序、多重分类）方面需要具象化训练。建议：利用积木、拼图等教具，加强对空间和逻辑规律的感知。",
      strong: "逻辑思维清晰，对数字和图形规律非常敏感，具备很强的理科思维潜力。"
    },
    "领域五：文化创意": {
      weak: "有基础的动手能力，但在创意发散和文化内涵的理解上可以更进一步。建议：多接触不同风格的艺术作品，鼓励天马行空的创作。",
      strong: "创意十足，审美能力独特，能自信地用多种形式表达自己的想法。"
    }
  };

  // 生成详细分析与学习建议
  const generateFeedback = () => {
    const feedbacks = [];
    let allFullScore = true;

    // 遍历5个领域
    dimensions.forEach(dimension => {
      let score = null;
      
      // 方法1：从 resultsArray 中查找（category 已去掉前缀）
      const dimensionNameWithoutPrefix = dimension.replace(/^领域[一二三四五]：/, '');
      const result = resultsArray.find(r => r.category === dimensionNameWithoutPrefix);
      if (result) {
        score = result.categoryScore;
      } else {
        // 方法2：从原始 results 对象中查找（使用完整维度名）
        if (results && typeof results === 'object' && !Array.isArray(results)) {
          score = results[dimension];
        }
      }

      // 如果找到了得分，生成反馈
      if (score !== null && score !== undefined) {
        const feedback = feedbackDatabase[dimension];
        
        if (feedback) {
          if (score < 3) {
            allFullScore = false;
            feedbacks.push({
              dimension: dimensionNameWithoutPrefix,
              score: score,
              text: feedback.weak,
              type: 'weak'
            });
          } else if (score === 3) {
            feedbacks.push({
              dimension: dimensionNameWithoutPrefix,
              score: score,
              text: feedback.strong,
              type: 'strong'
            });
          } else {
            // 如果分数超过3分（理论上不应该），也标记为未满分
            allFullScore = false;
          }
        }
      }
    });

    // 如果全部满分，返回特殊提示
    if (allFullScore && feedbacks.length === 5) {
      return {
        allFullScore: true,
        message: "孩子各方面发展非常均衡且优秀，建议进行拔高培养！",
        feedbacks: feedbacks
      };
    }

    return {
      allFullScore: false,
      feedbacks: feedbacks
    };
  };

  const feedbackResult = generateFeedback();

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 高亮"建议"部分的函数
  const highlightSuggestion = (text) => {
    const parts = text.split(/(建议[：:])/);
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <span className="font-bold text-blue-600">{parts[1]}</span>
          {parts.slice(2).map((part, index) => (
            <span key={index} className="text-blue-700 font-medium">{part}</span>
          ))}
        </>
      );
    }
    return text;
  };

  // 导出PDF - 离屏克隆方案（A4 标准宽度，解决缩放和留白问题）
  const handleExportPDF = async () => {
    const originalPages = document.querySelectorAll('.pdf-page');
    if (originalPages.length === 0) {
      alert('未找到页面容器，请检查代码');
      return;
    }

    // 1. 创建沙盒：宽度严格设为 800px (A4 像素宽)
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-10000px';
    container.style.left = '-10000px';
    container.style.width = '800px'; // 🌟 关键修改：回归 A4 标准宽
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      // 🌟 在循环外获取源 Logo（确保获取到屏幕上现有的 Logo）
      const sourceLogo = document.querySelector('.logo') || document.querySelector('header img') || document.querySelector('img');
      console.log('🔍 Logo 获取结果:', sourceLogo ? '成功' : '失败', sourceLogo?.src || sourceLogo?.getAttribute('src'));

      for (let i = 0; i < originalPages.length; i++) {
        // 2. 克隆页面
        const clone = originalPages[i].cloneNode(true);
        
        // ============================================================
        // 1. 🧹 强力清理：移除所有旧页眉元素
        // ============================================================
        const allChildren = Array.from(clone.children);
        allChildren.forEach((child, index) => {
          const text = child.innerText || '';
          const hasImg = child.querySelector('img') || child.tagName === 'IMG';
          
          // 只要包含馆名、报告名，或者在前 3 个元素里包含图片，就隐藏
          if (text.includes('饭米多蔻') || text.includes('入学综合能力') || (index < 3 && hasImg)) {
            child.style.display = 'none';
          }
        });
        
        // ============================================================
        // 2. 🏗️ 重建标准页眉 (使用源 src 零延迟)
        // ============================================================
        const headerContainer = document.createElement('div');
        Object.assign(headerContainer.style, {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
          paddingBottom: '20px',
          marginBottom: '30px',
          borderBottom: '1px solid #eee',
          backgroundColor: '#fff'
        });
        
        // --- [左侧] Logo + 馆名 ---
        const leftPart = document.createElement('div');
        Object.assign(leftPart.style, {
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        });
        
        // 🌟 关键修改：直接使用 sourceLogo.src（浏览器会直接使用缓存，无需网络请求）
        if (sourceLogo) {
          const newLogo = document.createElement('img');
          newLogo.src = sourceLogo.src; // ✅ 直接复用内存中的图片数据
          Object.assign(newLogo.style, {
            width: '50px',
            height: 'auto',
            display: 'block',
            margin: '0'
          });
          leftPart.appendChild(newLogo);
          console.log(`✅ 第 ${i + 1} 页 Logo 插入成功，src:`, sourceLogo.src);
        } else {
          console.warn(`⚠️ 第 ${i + 1} 页无法找到 Logo`);
        }
        
        const libName = document.createElement('h1');
        libName.innerText = '饭米多蔻中英文绘本馆';
        Object.assign(libName.style, {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
          margin: '0',
          lineHeight: '1.4'
        });
        leftPart.appendChild(libName);
        
        // --- [右侧] 报告名 + 日期 ---
        const rightPart = document.createElement('div');
        Object.assign(rightPart.style, {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center'
        });
        
        const reportName = document.createElement('div');
        reportName.innerText = '入学综合能力测评报告';
        Object.assign(reportName.style, {
          fontSize: '12px',
          color: '#666',
          marginBottom: '4px'
        });
        
        const dateEl = Array.from(clone.querySelectorAll('*')).find(el => el.innerText && el.innerText.match(/\d{4}年\d{1,2}月\d{1,2}日/));
        const dateText = dateEl ? dateEl.innerText : new Date().toLocaleDateString('zh-CN', {year: 'numeric', month: 'long', day: 'numeric'});
        const dateDiv = document.createElement('div');
        dateDiv.innerText = dateText;
        Object.assign(dateDiv.style, {
          fontSize: '12px',
          color: '#999'
        });
        
        rightPart.appendChild(reportName);
        rightPart.appendChild(dateDiv);
        
        // --- 插入 ---
        headerContainer.appendChild(leftPart);
        headerContainer.appendChild(rightPart);
        clone.prepend(headerContainer);
        
        // ============================================================
        // 3. 📐 布局重置 (确保内容不顶头)
        // ============================================================
        Object.assign(clone.style, {
          width: '100%',
          minHeight: '1125px',
          padding: '40px',
          paddingTop: '40px', // 确保页眉有空间
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
          boxSizing: 'border-box'
        });
        
        // ==========================================
        // 5. 📏 维持红线间距 (防止正文挤压)
        // ==========================================
        const allDivs = Array.from(clone.querySelectorAll('*'));
        const nameLabel = allDivs.find(el => el.innerText && el.innerText.includes('幼儿姓名'));
        
        if (nameLabel) {
          // 找到红线行并推开下面的距离
          let infoRow = nameLabel.parentElement;
          while (infoRow && infoRow !== clone) {
            const style = window.getComputedStyle(infoRow);
            if (style.borderBottomWidth !== '0px' || infoRow.className.includes('border-b') || infoRow.clientWidth > 400) {
              break;
            }
            infoRow = infoRow.parentElement;
          }
          
          if (infoRow && infoRow !== clone) {
            // 红线下面依然保持 60px 间距，让正文有呼吸感
            infoRow.style.marginBottom = '60px';
          }
        }
        
        // 6. (可选) 确保页脚沉底
        const footer = clone.querySelector('footer') || clone.querySelector('.footer') || clone.querySelector('[class*="footer"]');
        if (footer) {
          footer.style.marginTop = 'auto';
        }
        
        // ==========================================
        // 🎯 雷达图完美居中修正（保守方案：只调整图表，不改变容器）
        // ==========================================
        // 1. 直接查找包含图表的容器（有边框的那个 div）
        const chartEl = clone.querySelector('.recharts-wrapper') || 
                       clone.querySelector('.recharts-surface') ||
                       clone.querySelector('svg') || 
                       clone.querySelector('canvas');
        
        if (chartEl) {
          // 2. 向上查找有边框的容器（保持外边框不变）
          let chartContainer = chartEl.parentElement;
          while (chartContainer && chartContainer !== clone) {
            const style = window.getComputedStyle(chartContainer);
            // 查找有边框、阴影或圆角的容器
            if (style.borderWidth !== '0px' || 
                style.boxShadow !== 'none' || 
                style.borderRadius !== '0px' ||
                chartContainer.className.includes('border') ||
                chartContainer.className.includes('rounded')) {
              break;
            }
            chartContainer = chartContainer.parentElement;
          }
          
          // 3. 如果找到容器，通过减少上下 padding 来缩小边框高度，实现居中
          if (chartContainer && chartContainer !== clone) {
            // 🌟 核心策略：减少容器的上下 padding，缩小边框的上下高度
            const containerStyle = window.getComputedStyle(chartContainer);
            const currentPaddingTop = parseFloat(containerStyle.paddingTop) || 16; // 默认 p-4 是 16px
            const currentPaddingBottom = parseFloat(containerStyle.paddingBottom) || 16;
            const currentPaddingLeft = containerStyle.paddingLeft;
            const currentPaddingRight = containerStyle.paddingRight;
            
            // 减少上下 padding（从 16px 减少到 8px 或更小），保持左右 padding 不变
            Object.assign(chartContainer.style, {
              paddingTop: '8px',      // 减少上边距
              paddingBottom: '8px',    // 减少下边距
              paddingLeft: currentPaddingLeft,   // 保持左边距
              paddingRight: currentPaddingRight, // 保持右边距
              boxSizing: 'border-box'  // 确保 padding 包含在尺寸内
            });
            
            // 4. 确保容器使用 flex 布局实现居中
            const currentDisplay = containerStyle.display;
            if (currentDisplay !== 'flex' && currentDisplay !== 'grid') {
              chartContainer.style.display = 'flex';
              chartContainer.style.justifyContent = 'center';
              chartContainer.style.alignItems = 'center';
            }
            
            // 5. 处理 ResponsiveContainer（Recharts 的响应式容器）
            const responsiveContainer = chartContainer.querySelector('.recharts-responsive-container');
            if (responsiveContainer) {
              // 让图表填满容器（因为已经减少了 padding，图表会自动居中）
              Object.assign(responsiveContainer.style, {
                width: '100%',
                height: '100%',
                margin: '0',
                display: 'block'
              });
            }
            
            // 6. 处理图表元素本身（.recharts-wrapper 或 svg）
            const actualChart = chartContainer.querySelector('.recharts-wrapper') || 
                               chartContainer.querySelector('.recharts-surface') ||
                               chartContainer.querySelector('svg');
            if (actualChart) {
              // 确保图表元素填满 ResponsiveContainer
              Object.assign(actualChart.style, {
                width: '100%',
                height: '100%',
                margin: '0',
                display: 'block'
              });
            }
          }
        }
        
        // 3.2 🌟 核心修复：防止右侧切割！
        // 找到克隆体内所有可能撑破宽度的元素，强制它们缩放
        // 但排除页眉中的 Logo（headerContainer 中的图片）
        const bigElements = clone.querySelectorAll('img, canvas, svg, .echarts-for-react'); 
        bigElements.forEach(el => {
          // 如果元素在 headerContainer 中，跳过处理（保持 Logo 原始大小）
          if (headerContainer && headerContainer.contains(el)) {
            return;
          }
          el.style.maxWidth = '100%'; // 强制缩进 800px 内
          el.style.height = 'auto';
        });
        
        // 3.3 字体微调 (可选)
        container.style.fontSize = '16px'; 
        container.innerHTML = ''; 
        container.appendChild(clone);
        
        // 4. 截图
        const dataUrl = await toJpeg(clone, {
          quality: 0.9,
          pixelRatio: 2, // 保持2倍高清
          width: 800,    // 锁定截图宽度
          backgroundColor: '#ffffff',
          cacheBust: true, // 🌟 关键：防止图片跨域缓存导致白屏
          useCORS: true,   // 🌟 关键：允许跨域图片加载
        });
        
        const imgProps = pdf.getImageProperties(dataUrl);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, imgHeight);
      }

      pdf.save(`${studentInfo.name}_入学测评报告.pdf`);
    } catch (err) {
      console.error(err);
      alert('导出失败');
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* 按钮区域 - 在 report-content 外面 */}
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回测评
        </Button>
        <Button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
        >
          <Download className="w-5 h-5" />
          📄 导出 PDF 报告
        </Button>
      </div>

      {/* 报告内容容器 - 用于导出 PDF */}
      <div id="report-content" className="bg-orange-50/30">
        {/* === 第 1 页：诊断页 === */}
        <div id="page-1" className="pdf-page a4-page-container" style={{ width: '100%', minHeight: '297mm', background: 'white' }}>
          {/* 顶部页眉 */}
          <PageHeader date={formatDate(studentInfo.date)} />
          
          {/* 学生信息 */}
          <div className="mb-8 pb-4 border-b-2 border-orange-200 shrink-0">
            <div className="flex flex-row items-center gap-6 text-gray-700 text-base">
              <div className="flex items-center whitespace-nowrap">
                <span className="text-gray-500">幼儿姓名：</span>
                <span className="font-semibold ml-2 text-slate-800">{studentInfo.name}</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <span className="text-gray-500 whitespace-nowrap">测评日期：</span>
                <span className="font-semibold ml-2 text-slate-800 whitespace-nowrap">{formatDate(studentInfo.date)}</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <span className="text-gray-500">指导师：</span>
                <span className="font-semibold ml-2 text-slate-800">{studentInfo.instructor}</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <span className="text-gray-500">拟报读班型：</span>
                <span className="font-semibold ml-2 text-slate-800 whitespace-nowrap">{selectedClass || '待定'}</span>
              </div>
            </div>
          </div>
          
          {/* 中间核心内容 (使用固定高度 + justify-between 均分空间) */}
          <div className="flex-1 flex flex-col justify-between min-h-0">
            {/* 雷达图区域 (固定高度 h-80) */}
            <div className="h-80 mb-4 shrink-0">
              <div className="flex flex-row items-center h-full">
                {/* 左侧：雷达图 */}
                <div className="w-1/2 h-full flex flex-col">
                  <h2 className="text-xl font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>能力雷达图</span>
                  </h2>
                  <div className="h-full w-full bg-white/60 rounded-3xl p-4 shadow-sm border border-orange-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis
                          dataKey="category"
                          tick={{ fontSize: 12, fill: '#4B5563' }}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 3]}
                          tick={{ fontSize: 10, fill: '#6B7280' }}
                        />
                        <Radar
                          name="得分"
                          dataKey="score"
                          stroke="#F97316"
                          fill="#F97316"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 右侧：得分列表 */}
                <div className="w-1/2 pl-6 flex flex-col justify-center h-full">
                  <h2 className="text-xl font-semibold text-indigo-900 mb-3">各维度得分</h2>
                  <div className="flex flex-col justify-center gap-2 flex-1">
                    {resultsArray.map((result) => {
                      const getScoreLabel = (score) => {
                        if (score === 3) return '优秀';
                        if (score >= 2) return '良好';
                        if (score >= 1) return '待加强';
                        return '需关注';
                      };
                      
                      return (
                        <div key={result.category} className="flex items-center justify-between p-3 bg-white/80 rounded-2xl shadow-sm border border-orange-100">
                          <span className="text-gray-700 text-sm font-medium">{result.category}：</span>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-orange-600">{result.categoryScore}分</span>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              result.categoryScore === 3 
                                ? 'bg-green-100 text-green-700' 
                                : result.categoryScore >= 2
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              ({getScoreLabel(result.categoryScore)})
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 详细分析 (双列 + text-sm，使用 flex-1 拉伸) */}
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <span>📝</span>
                <span>详细分析与学习建议</span>
              </h3>
              {feedbackResult.allFullScore ? (
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-orange-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🌟</span>
                    <h3 className="text-base font-bold text-yellow-800">全面发展优秀</h3>
                  </div>
                  <p className="text-sm text-yellow-900 font-medium leading-relaxed">
                    {feedbackResult.message}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {feedbackResult.feedbacks.map((feedback, index) => (
                    <div
                      key={index}
                      className="bg-white/80 p-4 rounded-2xl text-sm border-l-4 shadow-sm border border-orange-100"
                      style={{
                        borderLeftColor: feedback.type === 'strong' ? '#10b981' : '#f59e0b'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-sm font-semibold ${
                          feedback.type === 'strong' ? 'text-green-800' : 'text-amber-800'
                        }`}>
                          {feedback.dimension}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          feedback.type === 'strong'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {feedback.score}/3
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        feedback.type === 'strong' ? 'text-green-900' : 'text-amber-900'
                      }`}>
                        {highlightSuggestion(feedback.text)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 底部页脚 */}
          <PageFooter />
        </div>

        {/* === 强制切割线 1 === */}
        <div className="html2pdf__page-break"></div>

        {/* === 第 2 页：愿景页 === */}
        <div id="page-2" className="pdf-page a4-page-container" style={{ width: '100%', minHeight: '297mm', background: 'white' }}>
          {/* 页眉 */}
          <PageHeader date={formatDate(studentInfo.date)} />
          
          <div className="flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
            {/* 测评结论 (顶部小结，固定高度) */}
            <div className="mb-3 shrink-0">
              <h2 className="text-xl font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                <span>📋</span>
                <span>测评结论</span>
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-white/80 rounded-2xl border-l-4 border-blue-400 shadow-sm border border-orange-100">
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm">当前定位</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {studentInfo.name}目前处于<strong className="text-blue-600">{selectedClass || '未知'} {stage.level} 阶段</strong>，
                    综合得分为 <strong className="text-blue-600">{overallScore}</strong> 分。
                  </p>
                </div>

                {highestCategory && (
                  <div className="p-4 bg-white/80 rounded-2xl border-l-4 border-green-400 shadow-sm border border-orange-100">
                    <h3 className="font-semibold text-slate-800 mb-2 text-sm">优势领域</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <strong className="text-green-600">{highestCategory.category}</strong>表现突出，
                      得分为 {highestCategory.categoryScore} 分。建议继续保持并深化该领域的学习。
                    </p>
                  </div>
                )}

                {lowestCategory && (
                  <div className="p-4 bg-white/80 rounded-2xl border-l-4 border-yellow-400 shadow-sm border border-orange-100">
                    <h3 className="font-semibold text-slate-800 mb-2 text-sm">重点关注</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <strong className="text-amber-600">{lowestCategory.category}</strong>需要加强，
                      得分为 {lowestCategory.categoryScore} 分。建议在后续学习中重点关注该领域的发展。
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* 成长路径愿景 - Hero Card (巨大高光卡片，flex-1 撑满剩余空间) */}
            <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-5 shadow-xl border-l-8 border-indigo-500 flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
              {/* 标题区域 */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2 flex items-center gap-3">
                  <span className="text-3xl">🚀</span>
                  <span>成长路径愿景</span>
                </h3>
                <p className="text-sm text-gray-500 italic ml-11">
                  这是我们为您孩子量身定制的成长蓝图
                </p>
              </div>

              {/* 路径标题 */}
              <h4 className="text-xl font-bold text-indigo-800 mb-3">
                {courseVisionData[selectedClass]?.title || '路径规划'}
              </h4>

              {/* 目标描述 */}
              <p className="text-sm text-indigo-700 italic mb-4 leading-snug">
                {courseVisionData[selectedClass]?.goal || '全面培养幼儿综合能力'}
              </p>

              {/* 惊喜蜕变列表 - Grid 布局 */}
              <div className="grid grid-cols-1 gap-3">
                {courseVisionData[selectedClass]?.surprises.map((surprise, index) => {
                  // 提取重点词汇（用引号或单引号包裹的词）
                  const highlightText = (text) => {
                    // 移除开头的✨图标（如果存在）
                    let cleanText = text.replace(/^✨\s*/, '');
                    
                    // 使用 matchAll 来找到所有重点词汇，然后手动分割
                    const matches = [...cleanText.matchAll(/(['"'"]([^'"]+)['"'])/g)];
                    if (matches.length === 0) {
                      return <span>{cleanText}</span>;
                    }
                    
                    const result = [];
                    let lastIndex = 0;
                    
                    matches.forEach((match, i) => {
                      // 添加匹配前的文本
                      if (match.index > lastIndex) {
                        result.push(
                          <span key={`text-${i}`}>{cleanText.substring(lastIndex, match.index)}</span>
                        );
                      }
                      
                      // 添加高亮的重点词汇（只取内容，不包括引号）
                      const word = match[2] || match[1].replace(/['"'"']/g, '');
                      result.push(
                        <span key={`highlight-${i}`} className="text-indigo-600 font-bold">
                          "{word}"
                        </span>
                      );
                      
                      lastIndex = match.index + match[0].length;
                    });
                    
                    // 添加最后剩余的文本
                    if (lastIndex < cleanText.length) {
                      result.push(
                        <span key="text-end">{cleanText.substring(lastIndex)}</span>
                      );
                    }
                    
                    return result;
                  };

                  // 根据索引选择不同的图标
                  const icons = ['✨', '🗣️', '📖', '🤝'];
                  const icon = icons[index] || '✨';

                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/60 rounded-xl border border-indigo-200/50 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div className="text-sm text-gray-700 leading-snug flex-1">
                        {highlightText(surprise)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* 页脚 */}
          <PageFooter />
        </div>

        {/* === 强制切割线 2 === */}
        <div className="html2pdf__page-break"></div>

        {/* === 第 3 页：落地页 === */}
        <div id="page-3" className="pdf-page a4-page-container pb-8" style={{ width: '100%', minHeight: '297mm', background: 'white' }}>
          {/* 页眉 */}
          <PageHeader date={formatDate(studentInfo.date)} />
          
          <div className="flex-1 flex flex-col justify-between min-h-0">
            {/* 课包方案 */}
            <div className="mb-8 shrink-0">
              <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <span>🛒</span>
                <span>个性化课包配置方案</span>
              </h2>
              <LearningPathPlans currentLevel={selectedClass || '衔接班'} />
            </div>
            
            {/* 年度规划表 (使用 flex-1 自动拉伸，表格充气法) */}
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <span>📅</span>
                <span>推荐完整学年规划</span>
              </h2>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8 shadow-lg border border-orange-200 flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-6 py-3">
                  推荐 {stage.level} 至 Q4 完整学年规划
                </h3>
                <p className="text-orange-50 mb-6 text-base py-3 leading-relaxed">55课时 · 系统性培养 · 成果可预期</p>
                <div className="flex flex-wrap gap-4 mb-6 py-3">
                  <span className="px-5 py-4 bg-white/20 backdrop-blur-sm rounded-full text-base font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    系统性
                  </span>
                  <span className="px-5 py-4 bg-white/20 backdrop-blur-sm rounded-full text-base font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    经济性
                  </span>
                  <span className="px-5 py-4 bg-white/20 backdrop-blur-sm rounded-full text-base font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    成果可预期
                  </span>
                </div>
                <p className="text-orange-50 text-base leading-relaxed py-3">
                  从当前阶段开始，系统性地完成四个阶段的学习，全面提升幼儿的综合能力。
                </p>
              </div>
            </div>
          </div>
          
          {/* 页脚 */}
          <PageFooter />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;

