import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { levels } from '../data/questions';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const HomePage = ({ onStartAssessment }) => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [instructor, setInstructor] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!studentName.trim()) {
      alert('请输入幼儿姓名');
      return;
    }
    
    if (!selectedClass) {
      alert('请选择拟报读班级');
      return;
    }

    if (!instructor.trim()) {
      alert('请输入指导师姓名');
      return;
    }

    // 探针：调试输出
    console.log('首页传过来的班级是:', selectedClass);
    console.log('学生信息:', { studentName, selectedClass, instructor, date });

    // 传递学生信息和选择的班级到答题页面
    onStartAssessment({
      studentInfo: {
        name: studentName.trim(),
        classLevel: selectedClass, // 严格使用中文
        instructor: instructor.trim(),
        date: date
      }
    });

    navigate('/assessment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-2">
              🌟 儿童入学综合能力测评
            </CardTitle>
            <p className="text-center text-gray-600">
              请填写学生信息，开始测评
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 学生姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  幼儿姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="请输入幼儿姓名"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              {/* 拟报读班级 - 关键：value 必须是中文 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  拟报读班级 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log('下拉菜单选择的班级是:', value);
                    setSelectedClass(value);
                  }}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">请选择班级</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {/* 探针：显示当前选择 */}
                {selectedClass && (
                  <p className="mt-2 text-sm text-gray-600">
                    已选择：<strong>{selectedClass}</strong>
                  </p>
                )}
              </div>

              {/* 指导师 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  指导师 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  placeholder="请输入指导师姓名"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                />
              </div>

              {/* 测评日期 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  测评日期
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>

              {/* 提交按钮 */}
              <Button
                type="submit"
                className="w-full py-4 text-lg font-bold"
              >
                🚀 开始测评
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;


