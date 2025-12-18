import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 强制统一数据源：必须从 questions.js 导入，删除所有硬编码数据
import { questions, dimensions, getDimensionDisplayName } from '../data/questions';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const AssessmentForm = ({ studentInfo, onComplete }) => {
  const navigate = useNavigate();
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // 探针：调试输出 - 检查首页传过来的班级
  useEffect(() => {
    if (studentInfo && studentInfo.studentInfo) {
      const selectedClass = studentInfo.studentInfo.classLevel;
      console.log('首页传过来的班级是:', selectedClass);
      console.log('学生信息完整对象:', studentInfo);
    }
  }, [studentInfo]);

  // 强制中文匹配：严格筛选逻辑
  const selectedClass = studentInfo?.studentInfo?.classLevel || '';
  
  // 探针：调试输出 - 筛选结果
  const currentQuestions = useMemo(() => {
    if (!selectedClass) {
      console.warn('警告：selectedClass 为空，无法筛选题目');
      return [];
    }

    // 必须严格匹配中文 classLevel
    const filtered = questions.filter(q => q.classLevel === selectedClass);
    
    console.log('筛选出的题目数量:', filtered.length);
    console.log('筛选条件 classLevel ===', selectedClass);
    console.log('筛选结果示例（前3题）:', filtered.slice(0, 3));
    
    return filtered;
  }, [selectedClass]);

  // 按维度组织题目
  const questionsByDimension = useMemo(() => {
    const grouped = {};
    dimensions.forEach(dim => {
      grouped[dim] = currentQuestions.filter(q => q.domain === dim);
    });
    return grouped;
  }, [currentQuestions]);

  const currentDimension = dimensions[currentDimensionIndex];
  const dimensionQuestions = questionsByDimension[currentDimension] || [];

  // 探针：调试输出 - 当前维度题目
  useEffect(() => {
    console.log('当前维度:', currentDimension);
    console.log('当前维度题目数量:', dimensionQuestions.length);
    console.log('当前维度题目:', dimensionQuestions);
  }, [currentDimension, dimensionQuestions]);

  // 处理答题（Pass/Fail）
  const handleAnswer = (questionId, passed) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: passed
    }));
  };

  // 检查当前维度是否完成
  const isDimensionComplete = () => {
    return dimensionQuestions.every(q => answers[q.id] !== undefined);
  };

  // 检查所有维度是否完成
  const isAllComplete = () => {
    return dimensions.every(dim => {
      const dimQuestions = questionsByDimension[dim] || [];
      return dimQuestions.every(q => answers[q.id] !== undefined);
    });
  };

  // 下一维度
  const handleNext = () => {
    if (currentDimensionIndex < dimensions.length - 1) {
      setCurrentDimensionIndex(prev => prev + 1);
    } else if (isAllComplete()) {
      // 计算分数并提交
      const results = calculateResults();
      
      // 准备传递给报告页的数据
      const reportData = {
        studentInfo: studentInfo.studentInfo,
        results: results.dimensionScores,
        totalScore: results.totalScore,
        maxScore: results.maxScore,
        answers: answers,
        selectedClass: selectedClass
      };

      console.log('准备跳转到报告页，数据:', reportData);

      // 关键：使用 navigate 的 state 传递数据
      navigate('/report', { 
        state: reportData
      });
    }
  };

  // 上一维度
  const handlePrevious = () => {
    if (currentDimensionIndex > 0) {
      setCurrentDimensionIndex(prev => prev - 1);
    }
  };

  // 计算结果
  const calculateResults = () => {
    const dimensionScores = {};
    let totalScore = 0;

    dimensions.forEach(dim => {
      const dimQuestions = questionsByDimension[dim] || [];
      const score = dimQuestions.reduce((sum, q) => {
        return sum + (answers[q.id] === true ? q.score : 0);
      }, 0);
      dimensionScores[dim] = score;
      totalScore += score;
    });

    return {
      dimensionScores,
      totalScore,
      maxScore: 15
    };
  };

  // 跳转到指定维度
  const goToDimension = (index) => {
    setCurrentDimensionIndex(index);
  };

  // 安全检查：如果没有选择班级或没有题目
  if (!selectedClass) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-bold">错误：未选择班级</h2>
          <p className="text-red-600">请返回首页选择拟报读班级。</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  if (currentQuestions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-yellow-800 font-bold">未找到题目</h2>
          <p className="text-yellow-600">
            选择的班级：<strong>{selectedClass}</strong>
          </p>
          <p className="text-yellow-600">请检查 questions.js 数据文件。</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  const progress = ((currentDimensionIndex + 1) / dimensions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 头部信息 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          幼儿能力测评
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>👤 {studentInfo?.studentInfo?.name || '未填写'}</span>
          <span>📚 {selectedClass}</span>
          <span>📅 {studentInfo?.studentInfo?.date || ''}</span>
        </div>
      </div>

      {/* 维度导航 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {dimensions.map((dim, index) => {
              const dimQuestions = questionsByDimension[dim] || [];
              const isComplete = dimQuestions.every(q => answers[q.id] !== undefined);
              const isCurrent = index === currentDimensionIndex;
              
              return (
                <button
                  key={dim}
                  onClick={() => goToDimension(index)}
                  className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : isComplete
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {getDimensionDisplayName(dim)} {isComplete && '✓'}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {getDimensionDisplayName(currentDimension)} ({currentDimensionIndex + 1}/{dimensions.length})
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 题目区域 */}
      <Card>
        <CardHeader>
          <CardTitle>{getDimensionDisplayName(currentDimension)} 能力测评</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {dimensionQuestions.length > 0 ? (
              dimensionQuestions.map((question, index) => {
                const isPassed = answers[question.id];
                
                return (
                  <div
                    key={question.id}
                    className="border-2 rounded-2xl p-6 transition-all"
                    style={{
                      borderColor: isPassed === true 
                        ? '#10B981' 
                        : isPassed === false 
                        ? '#EF4444' 
                        : '#E5E7EB',
                      backgroundColor: isPassed === true 
                        ? '#F0FDF4' 
                        : isPassed === false 
                        ? '#FEF2F2' 
                        : '#FAFAFA'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-xl text-gray-800 mb-4">
                          {question.text}
                        </p>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleAnswer(question.id, true)}
                            className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                              isPassed === true
                                ? 'bg-green-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            ✓ 通过
                          </button>
                          <button
                            onClick={() => handleAnswer(question.id, false)}
                            className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                              isPassed === false
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            ✗ 未通过
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl">当前维度暂无题目</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 导航按钮 */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentDimensionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          上一维度
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isDimensionComplete()}
          className="flex items-center gap-2"
        >
          {currentDimensionIndex === dimensions.length - 1 ? '完成测评' : '下一维度'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentForm;
