import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AssessmentForm from './pages/AssessmentForm';
import ReportPage from './pages/ReportPage';

function App() {
  const [assessmentData, setAssessmentData] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  // 调试：检查组件是否正常加载
  useEffect(() => {
    console.log('App component loaded');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onStartAssessment={(info) => {
                  console.log('App收到首页传递的学生信息:', info);
                  setStudentInfo(info);
                }} 
              />
            } 
          />
          <Route 
            path="/assessment" 
            element={
              studentInfo ? (
                <AssessmentForm 
                  studentInfo={studentInfo}
                  onComplete={setAssessmentData} 
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/report" 
            element={<ReportPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

