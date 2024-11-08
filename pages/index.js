import React, { useState } from 'react';
import styled from 'styled-components';
import MobileContainer from './MobileContainer';
import { FiSquare, FiPlusSquare, FiMinusSquare } from "react-icons/fi";

// 스타일 컴포넌트 정의
const StepIndicatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fafafa;
`;

const StepCircle = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 1rem;
  border-radius: 50%;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? '#4CAF50' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#666'};
`;

const PageWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  border-radius: 8px;
  background-color: #fafafa;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4CAF50;
  font-size: 1.2rem;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;


const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 0.5rem 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 1rem 0;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  button {
    flex: 1;
  }
`;

const CheckItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const MainCheck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SubCheck = styled.div`
  display: flex;
  align-items: center;
  padding-left: 24px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  margin-top: 4px;
`;

const CheckText = styled.span`
  flex: 1;
  margin-left: 8px;
`;

const ExcludeTag = styled.span`
  background-color: #f5f5f5;
  color: #ff6b6b;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 8px;
`;

const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  
  &.checked {
    color: #2ecc71;
  }
  
  &.excluded {
    color: #ff6b6b;
  }
`;

// 샘플 데이터
const sampleData = {
  "식품업": {
    "1. 과자류": {
      "(1) 과자": [
        {
          "검사항목": "산가",
          "단서조항": "유탕, 유처리 식품이 아닌 경우",
          "수수료": 17400
        },
        {
          "검사항목": "세균수(n=5)",
          "단서조항": "밀봉제품이 아닌경우 또는 발효제품 또는 유산균 함유제품인 경우",
          "수수료": 43600
        },
        {
          "검사항목": "총 아플라톡신(B1, B2, G1, G2의 합)",
          "단서조항": "땅콩 및 견과류를 함유한 식품이 아닌 경우",
          "수수료": 87000
        },
        {
          "검사항목": "황색포도상구균",
          "단서조항": "크림을 도포 또는 충전한 제품이 아닌 경우",
          "수수료": 29000
        }
      ],
      "(2) 캔디류": [
        {
          "검사항목": "허용외 타르색소",
          "단서조항": "",
          "수수료": 14400
        },
        {
          "검사항목": "세균수(n=5)",
          "단서조항": "밀봉제품이 아닌경우 또는 발효제품 또는 유산균 함유제품인 경우",
          "수수료": 43600
        },
        {
          "검사항목": "총 아플라톡신(B1, B2, G1, G2의 합)",
          "단서조항": "B1, B2, G1, G2의 합으로서, 땅콩 및 견과류를 함유한 식품이 아닌 경우",
          "수수료": 87000
        },
        {
          "검사항목": "압착강도",
          "단서조항": "컵모양 등 젤리가 아닌 경우",
          "수수료": "확인필요"
        },
        {
          "검사항목": "납",
          "단서조항": "사탕, 젤리가 아닌 경우",
          "수수료": 76700
        }
      ],
      "(3) 빙과류": [
        {
          "검사항목": "세균수(n=5)",
          "단서조항": "밀봉제품이 아닌경우 또는 발효제품 또는 유산균 함유제품인 경우",
          "수수료": 43600
        },
        {
          "검사항목": "대장균군",
          "단서조항": "",
          "수수료": 19900
        }
      ]
    },
    "2. 빵 또는 떡류": {
      "(1) 빵류": [
        {
          "검사항목": "타르색소(정량)",
          "단서조항": "식빵, 카스텔라 제품이 아닌 경우",
          "수수료": 70100
        },
        {
          "검사항목": "보존료",
          "단서조항": "크림을 도포 또는 충전한 제품이 아닌 경우",
          "수수료": 43000
        },
        {
          "검사항목": "살모넬라(n=5)",
          "단서조항": "크림을 도포 또는 충전한 제품이 아닌 경우",
          "수수료": 64900
        }
      ]
    }
  }
};

const StepIndicator = ({ currentStep }) => (
  <StepIndicatorWrapper>
    {[1, 2, 3].map((step) => (
      <StepCircle key={step} active={currentStep === step}>
        {step}
      </StepCircle>
    ))}
  </StepIndicatorWrapper>
);

const SelectionStep = ({ onNext, onPrev, currentStep }) => {
  const [selections, setSelections] = useState({
    업종: '',
    구분: '',
    유형: ''
  });

  // 선택된 구분에 따라 사용 가능한 유형 목록을 반환하는 함수
  const getAvailableTypes = () => {
    if (!selections.구분) return [];
    
    return Object.keys(sampleData[selections.업종][selections.구분] || {});
  };

  // 구분이 변경될 때 유형 초기화
  const handleDivisionChange = (e) => {
    setSelections(prev => ({
      ...prev,
      구분: e.target.value,
      유형: '' // 구분이 변경되면 유형 초기화
    }));
  };

  return (
    <PageWrapper>
      <Title>제품 선택</Title>
      <Select
        value={selections.업종}
        onChange={(e) => setSelections(prev => ({...prev, 업종: e.target.value, 구분: '', 유형: ''}))}
      >
        <option value="">업종 선택</option>
        <option value="식품업">식품업</option>
      </Select>
      
      <Select
        value={selections.구분}
        onChange={handleDivisionChange}
        disabled={!selections.업종}
      >
        <option value="">구분 선택</option>
        {selections.업종 && Object.keys(sampleData[selections.업종] || {}).map(division => (
          <option key={division} value={division}>{division}</option>
        ))}
      </Select>
      
      <Select
        value={selections.유형}
        onChange={(e) => setSelections(prev => ({...prev, 유형: e.target.value}))}
        disabled={!selections.구분}
      >
        <option value="">유형 선택</option>
        {getAvailableTypes().map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </Select>
      
      <ButtonContainer>
        {currentStep > 1 && <Button onClick={onPrev}>이전</Button>}
        <Button 
          onClick={() => onNext(selections)}
          disabled={!selections.업종 || !selections.구분 || !selections.유형}
        >
          다음
        </Button>
      </ButtonContainer>
    </PageWrapper>
  );
};

const ChecklistStep = ({ selections, onNext, onPrev }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const items = sampleData[selections.업종][selections.구분][selections.유형];

  console.log('Current Selections in Checklist:', selections); // 디버깅용
  console.log('Available Items:', items); // 디버깅용

  const handleCheck = (itemName, type) => {
    setCheckedItems(prev => {
      const newState = { ...prev };
      if (type === 'main') {
        // 메인 체크박스 토글
        newState[itemName] = !prev[itemName];
        // 메인이 해제되면 단서조항도 해제
        if (!newState[itemName]) {
          newState[`${itemName}_단서`] = false;
        }
      } else {
        // 단서조항은 메인이 체크된 경우에만 토글 가능
        if (prev[itemName]) {
          newState[`${itemName}_단서`] = !prev[`${itemName}_단서`];
        }
      }
      console.log('Updated CheckedItems:', newState); // 디버깅용
      return newState;
    });
  };

  return (
    <PageWrapper>
      <Title>검사항목 선택</Title>
      {items.map((item, index) => (
        <CheckItem key={index}>
          <MainCheck onClick={() => handleCheck(item.검사항목, 'main')}>
            <CheckIcon className={checkedItems[item.검사항목] ? 'checked' : ''}>
              {checkedItems[item.검사항목] ? 
                <FiPlusSquare size={20} /> : 
                <FiSquare size={20} />
              }
              <CheckText>{item.검사항목}</CheckText>
            </CheckIcon>
            {checkedItems[item.검사항목] && checkedItems[`${item.검사항목}_단서`] && (
              <ExcludeTag>검사제외</ExcludeTag>
            )}
          </MainCheck>
          
          {item.단서조항 && (
            <SubCheck 
              onClick={() => handleCheck(item.검사항목, 'sub')}
              style={{ opacity: checkedItems[item.검사항목] ? 1 : 0.5 }}
            >
              <CheckIcon className={checkedItems[`${item.검사항목}_단서`] ? 'excluded' : ''}>
                {checkedItems[`${item.검사항목}_단서`] ? 
                  <FiMinusSquare size={18} /> : 
                  <FiSquare size={18} />
                }
                <CheckText>{item.단서조항}</CheckText>
              </CheckIcon>
            </SubCheck>
          )}
        </CheckItem>
      ))}
      
      <ButtonContainer>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={() => onNext(checkedItems)}>다음</Button>
      </ButtonContainer>
    </PageWrapper>
  );
};

const ResultStep = ({ selections, checkedItems, onPrev }) => {
  const items = sampleData[selections.업종][selections.구분][selections.유형];

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (checkedItems[item.검사항목] && !checkedItems[`${item.검사항목}_단서`]) {
        return total + (typeof item.수수료 === 'number' ? item.수수료 : 0);
      }
      return total;
    }, 0);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <PageWrapper>
      <Title>검사 수수료 결과</Title>
      {items.map((item, index) => {
        if (checkedItems[item.검사항목] && !checkedItems[`${item.검사항목}_단서`]) {
          return (
            <ResultItem key={index}>
              <span>{item.검사항목}</span>
              <span>{typeof item.수수료 === 'number' ? item.수수료.toLocaleString() : item.수수료}원</span>
            </ResultItem>
          );
        }
        return null;
      }).filter(Boolean)}
      <Divider />
      <TotalAmount>
        <span>합계</span>
        <span>{calculateTotal().toLocaleString()}원</span>
      </TotalAmount>
      <ButtonContainer>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={handleReset}>처음으로</Button>
      </ButtonContainer>
    </PageWrapper>
  );
};

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState(null);
  const [checkedItems, setCheckedItems] = useState(null);

  const handleNext = (data) => {
    if (currentStep === 1) {
      setSelections(data);
    } else if (currentStep === 2) {
      setCheckedItems(data);
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <MobileContainer>
      <StepIndicator currentStep={currentStep} />
      {currentStep === 1 && (
        <SelectionStep 
          onNext={handleNext} 
          onPrev={handlePrev}
          currentStep={currentStep}
        />
      )}
      {currentStep === 2 && (
        <ChecklistStep 
          selections={selections} 
          onNext={handleNext} 
          onPrev={handlePrev} 
        />
      )}
      {currentStep === 3 && (
        <ResultStep 
          selections={selections} 
          checkedItems={checkedItems} 
          onPrev={handlePrev} 
        />
      )}
    </MobileContainer>
  );
};

export default App;