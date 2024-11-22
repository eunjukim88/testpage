import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MobileContainer from '../components/MobileContainer';
import { sampleApplications } from '../constants/sampleData';
import { 
  Container, 
  Content, 
  LogoutButton, 
  AddButton, 
  Modal, 
  ModalContent, 
  Input, 
  Button,
  ApplicationList,
  ApplicationCard,
  StatusBadge,
  ProgressStatus,
  Notes,
  PageTitle,
  TitleContainer,
  AddButtonInline
} from '../components/styled/Common';

function UserDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const userPhone = typeof window !== 'undefined' ? localStorage.getItem('phone') : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApplication, setNewApplication] = useState({
    name: '',
    applicants: '',
    expectedDate: '',
    notes: ''
  });

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType || userType !== 'user') {
      router.push('/login');
    }

    const userApplications = sampleApplications.filter(app => app.phone === userPhone);
    setApplications(userApplications);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('phone');
    router.push('/login');
  };

  const handleAddApplication = (e) => {
    e.preventDefault();
    const userPhone = localStorage.getItem('phone');
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
        phone: userPhone,
        date,
        status: '접수진행중',
        progressStatus: '베트남 접수중',
        expectedDate: ''
      }
    ]);
    setIsModalOpen(false);
    setNewApplication({
      name: '',
      applicants: '',
      expectedDate: '',
      notes: ''
    });
  };

  return (
    <MobileContainer>
      <Container>
        <Content>
          <TitleContainer>
            <PageTitle>내 신청 현황</PageTitle>
            <AddButtonInline onClick={() => setIsModalOpen(true)}>
              신청하기
            </AddButtonInline>
          </TitleContainer>
          <ApplicationList>
            {applications.map(app => (
              <ApplicationCard key={app.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>{app.name}</h3>
                  <StatusBadge status={app.status}>{app.status}</StatusBadge>
                </div>
                <div>접수인원: {app.applicants}명</div>
                <div>접수일자: {app.date}</div>
                <ProgressStatus>
                  진행상태: {app.progressStatus}
                  <br />
                  완료예정일: {app.expectedDate}
                </ProgressStatus>
                <Notes>
                  비고: {app.notes}
                </Notes>
              </ApplicationCard>
            ))}
          </ApplicationList>
        </Content>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>

        {isModalOpen && (
          <Modal onClick={() => setIsModalOpen(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <h3>신규 접수 등록</h3>
              <form onSubmit={handleAddApplication}>
                <Input
                  placeholder="이름"
                  value={newApplication.name}
                  onChange={e => setNewApplication({...newApplication, name: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  placeholder="접수인원"
                  value={newApplication.applicants}
                  onChange={e => setNewApplication({...newApplication, applicants: e.target.value})}
                  required
                />
                <Input
                  type="date"
                  placeholder="완료예정일"
                  value={newApplication.expectedDate}
                  onChange={e => setNewApplication({...newApplication, expectedDate: e.target.value})}
                  required
                />
                <textarea
                  placeholder="비고 사항"
                  value={newApplication.notes}
                  onChange={e => setNewApplication({...newApplication, notes: e.target.value})}
                />
                <Button type="submit">접수하기</Button>
              </form>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </MobileContainer>
  );
}

export default UserDashboard;