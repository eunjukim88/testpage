import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MobileContainer from '../components/MobileContainer';
import { sampleApplications } from '../constants/sampleData';
import ApplicationCard from '../components/ApplicationCard';
import {
  SearchBar,
  SearchInput,
  ApplicationList,
  ProgressStatus,
  Notes,
  StatusSelect,
  LogoutButton,
  Container,
  Content,
  PageTitle,
  AddButton,
  Modal,
  ModalContent
} from '../components/styled/Common';

function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState(sampleApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApplication, setNewApplication] = useState({
    name: '',
    phone: '',
    applicants: '',
    status: '접수진행중',
    progressStatus: '베트남 접수중',
    expectedDate: '',
    notes: ''
  });

  useEffect(() => {
    // 로그인 체크
    const userType = localStorage.getItem('userType');
    if (!userType || userType !== 'admin') {
      router.push('/login');
    }
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const handleProgressStatusChange = (id, newProgressStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, progressStatus: newProgressStatus } : app
    ));
  };

  const filteredApplications = applications.filter(app => 
    app.name.includes(searchTerm)
  );

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('phone');
    router.push('/login');
  };

  const handleAddApplication = (e) => {
    e.preventDefault();
    const newId = applications.length + 1;
    const date = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    setApplications([
      ...applications,
      {
        id: newId,
        ...newApplication,
        date
      }
    ]);
    setIsModalOpen(false);
    setNewApplication({
      name: '',
      phone: '',
      applicants: '',
      status: '접수진행중',
      progressStatus: '베트남 접수중',
      expectedDate: '',
      notes: ''
    });
  };

  return (
    <MobileContainer>
      <Container>
        <Content>
          <PageTitle>관리자 대시보드</PageTitle>
          <SearchBar>
            <SearchInput 
              type="text"
              placeholder="이름으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <ApplicationList>
            {filteredApplications.map(app => (
              <ApplicationCard 
                key={app.id}
                application={app}
                isAdmin={true}
                onStatusChange={handleStatusChange}
                onProgressStatusChange={handleProgressStatusChange}
                onSave={(editedData) => {
                  setApplications(applications.map(a => 
                    a.id === editedData.id ? editedData : a
                  ));
                }}
              />
            ))}
          </ApplicationList>
        </Content>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>

      </Container>
    </MobileContainer>
  );
}

export default AdminDashboard;