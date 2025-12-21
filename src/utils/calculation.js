/**
 * 计算单项得分
 */
export const calculateItemScore = (selectedScore) => {
  return selectedScore || 0;
};

/**
 * 计算领域得分（平均分）
 */
export const calculateCategoryScore = (items) => {
  if (!items || items.length === 0) return 0;
  const sum = items.reduce((acc, item) => acc + (item.score || 0), 0);
  return parseFloat((sum / items.length).toFixed(1));
};

/**
 * 计算综合得分
 */
export const calculateOverallScore = (categoryScores) => {
  if (!categoryScores || categoryScores.length === 0) return 0;
  const sum = categoryScores.reduce((acc, score) => acc + score, 0);
  return parseFloat((sum / categoryScores.length).toFixed(1));
};

/**
 * 根据得分确定阶段
 */
export const determineStage = (score) => {
  if (score >= 1.0 && score <= 1.5) return { level: "Q1", name: "阶段 Q1" };
  if (score >= 1.6 && score <= 2.5) return { level: "Q2", name: "阶段 Q2" };
  if (score >= 2.6 && score <= 3.5) return { level: "Q3", name: "阶段 Q3" };
  if (score >= 3.6 && score <= 4.0) return { level: "Q4", name: "阶段 Q4" };
  return { level: "Q1", name: "阶段 Q1" };
};

/**
 * 获取最高分领域
 */
export const getHighestCategory = (results) => {
  if (!results || results.length === 0) return null;
  return results.reduce((max, result) => 
    result.categoryScore > max.categoryScore ? result : max
  );
};

/**
 * 获取最低分领域
 */
export const getLowestCategory = (results) => {
  if (!results || results.length === 0) return null;
  return results.reduce((min, result) => 
    result.categoryScore < min.categoryScore ? result : min
  );
};

/**
 * 根据阶段推荐课程
 */
export const getRecommendedCourse = (stage) => {
  const courseMap = {
    Q1: { name: "秋季班（Q1）", description: "习惯与表达" },
    Q2: { name: "寒假班（Q2）", description: "观察与联系" },
    Q3: { name: "春季班（Q3）", description: "逻辑与创造" },
    Q4: { name: "暑假班（Q4）", description: "整合与展示" }
  };
  return courseMap[stage] || courseMap.Q1;
};

/**
 * 获取完整课程路径
 */
export const getCoursePath = (currentStage) => {
  const stages = ["Q1", "Q2", "Q3", "Q4"];
  const courseMap = {
    Q1: { name: "秋季班", description: "习惯与表达" },
    Q2: { name: "寒假班", description: "观察与联系" },
    Q3: { name: "春季班", description: "逻辑与创造" },
    Q4: { name: "暑假班", description: "整合与展示" }
  };
  
  const currentIndex = stages.indexOf(currentStage);
  return stages.slice(currentIndex).map((stage, index) => ({
    stage,
    order: index + 1,
    name: courseMap[stage].name,
    description: courseMap[stage].description,
    isCurrent: index === 0
  }));
};



