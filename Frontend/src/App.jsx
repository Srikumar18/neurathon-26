import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { About } from './pages/About'

// Layouts
import { EmployerLayout } from './components/layout/EmployerLayout'
import { StudentLayout } from './components/layout/StudentLayout'
import { AdminLayout } from './components/layout/AdminLayout'

// Employer Pages
import { EmployerDashboard } from './pages/employer/Dashboard'
import { JobPosting } from './pages/employer/JobPosting'
import { EmployerJobs } from './pages/employer/Jobs'
import { CompanyProfile } from './pages/employer/CompanyProfile'
import { Recruiters } from './pages/employer/Recruiters'
import { Applicants } from './pages/employer/Applicants'
import { Notifications } from './pages/employer/Notifications'
import { Appeals } from './pages/employer/Appeals'

// Student Pages
import { StudentDashboard } from './pages/student/Dashboard'
import { StudentJobs } from './pages/student/Jobs'
import { JobDetail } from './pages/student/JobDetail'
import { StudentApplications } from './pages/student/Applications'

// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard'
import { Users } from './pages/admin/Users'
import { AdminJobs } from './pages/admin/Jobs'
import { Comments } from './pages/admin/Comments'
import { AdminAppeals } from './pages/admin/Appeals'

// Layout wrapper to conditionally render header/footer if needed
function Layout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/employer') ||
    location.pathname.startsWith('/student') ||
    location.pathname.startsWith('/admin');

  if (isDashboard) return children;

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Employer Routes */}
          <Route path="/employer/*" element={
            <EmployerLayout>
              <Routes>
                <Route path="dashboard" element={<EmployerDashboard />} />
                <Route path="jobs" element={<EmployerJobs />} />
                <Route path="jobs/new" element={<JobPosting />} />
                <Route path="profile" element={<CompanyProfile />} />
                <Route path="recruiters" element={<Recruiters />} />
                <Route path="applicants" element={<Applicants />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="appeals" element={<Appeals />} />
                <Route path="*" element={<div className="p-10 text-center text-gray-500">Page not found</div>} />
              </Routes>
            </EmployerLayout>
          } />

          {/* Student Routes */}
          <Route path="/student/*" element={
            <StudentLayout>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="jobs" element={<StudentJobs />} />
                <Route path="jobs/:id" element={<JobDetail />} />
                <Route path="applications" element={<StudentApplications />} />
                <Route path="*" element={<div className="p-10 text-center text-gray-500">Page not found</div>} />
              </Routes>
            </StudentLayout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="comments" element={<Comments />} />
                <Route path="appeals" element={<AdminAppeals />} />
                <Route path="*" element={<div className="p-10 text-center text-gray-500">Page not found</div>} />
              </Routes>
            </AdminLayout>
          } />

          <Route path="*" element={<div className="p-20 text-center text-gray-500">Page Not Found</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
