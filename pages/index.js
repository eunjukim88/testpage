import React, { useState } from 'react';
import styled from 'styled-components';
import MobileContainer from '../components/MobileContainer';

const SearchBar = styled.div`
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #eee;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ApplicationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const ApplicationCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatusBadge = styled.span`
  background: ${props => props.status === '접수완료' ? '#2ecc71' : '#f1c40f'};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ProgressStatus = styled.div`
  margin-top: 0.5rem;
  color: #666;
`;

const Notes = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

// 임시 데이터
const sampleApplications = [
  {
    id: 1,
    name: '홍길동',
    applicants: 3,
    date: '2024년 03월 15일 14:30',
    status: '접수진행중',
    progressStatus: '베트남 접수중',
    expectedDate: '2024년 04월 20일',
    notes: '서류 추가 제출 필요'
  },
  {
    id: 2,
    name: '김철수',
    applicants: 1,
    date: '2024년 03월 14일 09:15',
    status: '접수완료',
    progressStatus: '입국심사완료',
    expectedDate: '2024년 03월 30일',
    notes: '특이사항 없음'
  }
];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState(sampleApplications);

  const filteredApplications = applications.filter(app => 
    app.name.includes(searchTerm)
  );

  return (
    <MobileContainer>
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
    </MobileContainer>
  );
}

export default Home;
