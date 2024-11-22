import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MobileContainer from '../components/MobileContainer';
import { sampleApplications } from '../constants/sampleData';
import {
  SearchBar,
  SearchInput,
  ApplicationList,
  ApplicationCard,
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
              <ApplicationCard key={app.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>{app.name}</h3>
                  <StatusSelect
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    <option value="접수진행중">접수진행중</option>
                    <option value="접수완료">접수완료</option>
                  </StatusSelect>
                </div>
                <div>접수인원: {app.applicants}명</div>
                <div>접수일자: {app.date}</div>
                <ProgressStatus>
                  진행상태: 
                  <StatusSelect
                    value={app.progressStatus}
                    onChange={(e) => handleProgressStatusChange(app.id, e.target.value)}
                  >
                    <option value="베트남 접수중">베트남 접수중</option>
                    <option value="베트남 접수완료">베트남 접수완료</option>
                    <option value="입국심사중">입국심사중</option>
                    <option value="입국심사완료">입국심사완료</option>
                  </StatusSelect>
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
        <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
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
                  placeholder="전화번호"
                  value={newApplication.phone}
                  onChange={e => setNewApplication({...newApplication, phone: e.target.value})}
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
                  placeholder="비고"
                  value={newApplication.notes}
                  onChange={e => setNewApplication({...newApplication, notes: e.target.value})}
                />
                <Button type="submit">등록</Button>
              </form>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </MobileContainer>
  );
}

export default AdminDashboard;