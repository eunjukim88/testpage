import React from 'react';
import {
  ApplicationCard as Card,
  StatusBadge,
  ProgressStatus,
  Notes,
  StatusSelect
} from './styled/Common';

const ApplicationCard = ({ application, isAdmin, onStatusChange, onProgressStatusChange }) => {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{application.name}</h3>
        {isAdmin ? (
          <StatusSelect
            value={application.status}
            onChange={(e) => onStatusChange(application.id, e.target.value)}
          >
            <option value="접수진행중">접수진행중</option>
            <option value="접수완료">접수완료</option>
          </StatusSelect>
        ) : (
          <StatusBadge status={application.status}>{application.status}</StatusBadge>
        )}
      </div>
      <div>접수인원: {application.applicants}명</div>
      <div>접수일자: {application.date}</div>
      <ProgressStatus>
        진행상태: {
          isAdmin ? (
            <StatusSelect
              value={application.progressStatus}
              onChange={(e) => onProgressStatusChange(application.id, e.target.value)}
            >
              <option value="베트남 접수중">베트남 접수중</option>
              <option value="베트남 접수완료">베트남 접수완료</option>
              <option value="입국심사중">입국심사중</option>
              <option value="입국심사완료">입국심사완료</option>
            </StatusSelect>
          ) : application.progressStatus
        }
        <br />
        완료예정일: {application.expectedDate}
      </ProgressStatus>
      <Notes>
        비고: {application.notes}
      </Notes>
    </Card>
  );
};

export default ApplicationCard; 