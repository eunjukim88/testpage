import React, { useState } from 'react';
import {
  ApplicationCard as Card,
  StatusBadge,
  ProgressStatus,
  Notes,
  StatusSelect,
  Button
} from './styled/Common';

const ApplicationCard = ({ application, isAdmin, onStatusChange, onProgressStatusChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(application);

  const handleEdit = () => {
    if (isEditing) {
      onSave(editedData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (field, value) => {
    setEditedData({
      ...editedData,
      [field]: value
    });
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}>
        <h3 style={{ marginRight: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {application.name}
        </h3>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
            {isEditing ? (
              <StatusSelect
                value={editedData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="접수진행중">접수진행중</option>
                <option value="접수완료">접수완료</option>
              </StatusSelect>
            ) : (
              <StatusBadge status={application.status}>{application.status}</StatusBadge>
            )}
          </div>
        )}
      </div>
      <div style={{ whiteSpace: 'nowrap' }}>접수인원: {application.applicants}명</div>
      <div style={{ whiteSpace: 'nowrap' }}>접수일자: {application.date}</div>
      <ProgressStatus>
        <div style={{ whiteSpace: 'nowrap' }}>
          진행상태: {
            isAdmin && isEditing ? (
              <StatusSelect
                value={editedData.progressStatus}
                onChange={(e) => handleChange('progressStatus', e.target.value)}
              >
                <option value="베트남 접수중">베트남 접수중</option>
                <option value="베트남 접수완료">베트남 접수완료</option>
                <option value="입국심사중">입국심사중</option>
                <option value="입국심사완료">입국심사완료</option>
              </StatusSelect>
            ) : application.progressStatus
          }
        </div>
        <div style={{ whiteSpace: 'nowrap' }}>완료예정일: {application.expectedDate}</div>
      </ProgressStatus>
      <Notes>
        비고: {application.notes}
      </Notes>
      {isAdmin && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button onClick={handleEdit}>
            {isEditing ? '저장' : '수정'}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ApplicationCard; 