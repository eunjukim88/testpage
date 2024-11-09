import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import MobileContainer from './MobileContainer';
import styled from 'styled-components';
import Select from 'react-select';
import { FiSquare, FiPlusSquare, FiMinusSquare } from "react-icons/fi";

const Content = styled.div`
  flex: 1;
  padding: 0.8rem;
  overflow-y: auto;
`;

const StepIndicatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? '#27ae60' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 2px 8px rgba(30,136,229,0.3)' : 'none'};
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding: 0 1rem;
`;

const StyledButton = styled.button`
  flex: 1;
  background-color: ${props => props.primary ? '#2ecc71' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#2ecc71'};
  border: 1px solid #2ecc71;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? '#27ae60' : '#f0f9f0'};
  }
`;

const SectionTitle = styled.h2`
  color: #28a745;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
  font-weight: bold;
`;

const FormSection = styled.div`
  padding: 0.8rem;
  margin: 0 auto;
`;

const ChecklistItem = styled.div`
  padding: 0.7rem;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
`;

const InspectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const InspectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ConditionClause = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
  color: #666;
`;

const SubCheckbox = styled.div`
  margin-top: 0.5rem;
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExclusionLabel = styled.span`
  color: red;
  margin-left: 1rem;
  font-weight: bold;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #999;
  margin-top: 2rem;
`;

const Notice = styled.div`
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  
  &.total {
    border-top: 1px solid #ddd;
    margin-top: 1rem;
    padding-top: 1rem;
    font-weight: bold;
  }
`;

const ReceiptContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(
      45deg,
      white 25%,
      transparent 25%,
      transparent 75%,
      white 75%
    );
    background-size: 16px 16px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(
      45deg,
      white 25%,
      transparent 25%,
      transparent 75%,
      white 75%
    );
    background-size: 16px 16px;
  }
`;

const ReceiptHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px dashed #eee;
  
  h3 {
    font-size: 1.2rem;
    color: #333;
  }
`;

const ReceiptRow = styled(ResultRow)`
  color: #444;
  font-size: 0.95rem;
  padding-bottom: 0.7rem;
  
  span:first-child {
    flex: 0.60;
  }
  
  span:last-child {
    flex: 0.40;
    text-align: right;
  }

  &.total {
    border-top: 2px dashed #eee;
    margin-top: 0.8rem;
    padding-top: 0.8rem;
    font-weight: bold;
    font-size: 1.1rem;
    
    span {
      flex: 1;
      text-align: right;
    }
  }
`;

const ReceiptFooter = styled.div`
  text-align: center;
  border-top: 2px dashed #eee;
  color: #666;
  font-size: 0.85rem;
  padding-top: 1rem;
`;

const StepIndicator = ({ currentStep }) => (
  <StepIndicatorWrapper>
    {[1, 2, 3, 4].map((step) => (
      <StepCircle key={step} active={currentStep === step}>
        {step}
      </StepCircle>
    ))}
  </StepIndicatorWrapper>
);

export default function FeeCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [foodTypeOptions, setFoodTypeOptions] = useState([]);
  const [industry, setIndustry] = useState('');
  const [category, setCategory] = useState('');
  const [foodType, setFoodType] = useState('');
  const [inspectionItems, setInspectionItems] = useState([]);
  const [excludedItems, setExcludedItems] = useState([]);
  const [commonCriteria, setCommonCriteria] = useState([]);
  const [selectedCommonCriteria, setSelectedCommonCriteria] = useState([]);
  const [groupedCommonCriteria, setGroupedCommonCriteria] = useState({});
  const [totalFee, setTotalFee] = useState(0);
  const [loading, setLoading] = useState(true);
  const [calculatedItems, setCalculatedItems] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      const { data: industryData, error: industryError } = await supabase
        .from('food_inspection')
        .select('industry_type');

      if (industryError) console.error('Error fetching industry options:', industryError);
      else setIndustryOptions([...new Set(industryData.map(d => d.industry_type))].map(industry_type => ({ value: industry_type, label: industry_type })));
      setLoading(false);
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (industry) {
      setLoading(true);
      const fetchCategoryOptions = async () => {
        const { data: categoryData, error: categoryError } = await supabase
          .from('food_inspection')
          .select('category')
          .eq('industry_type', industry);

        if (categoryError) console.error('Error fetching category options:', categoryError);
        else setCategoryOptions([...new Set(categoryData.map(d => d.category))].map(category => ({ value: category, label: category })));
        setLoading(false);
      };

      fetchCategoryOptions();
    }
  }, [industry]);

  useEffect(() => {
    if (category) {
      setLoading(true);
      const fetchFoodTypeOptions = async () => {
        const { data: foodTypeData, error: foodTypeError } = await supabase
          .from('food_inspection')
          .select('food_type')
          .eq('industry_type', industry)
          .eq('category', category);

        if (foodTypeError) console.error('Error fetching food type options:', foodTypeError);
        else setFoodTypeOptions([...new Set(foodTypeData.map(d => d.food_type))].map(food_type => ({ value: food_type, label: food_type })));
        setLoading(false);
      };

      fetchFoodTypeOptions();
    }
  }, [category]);

  const fetchInspectionItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('food_inspection')
      .select('*')
      .eq('industry_type', industry)
      .eq('category', category)
      .eq('food_type', foodType);

    if (error) {
      console.error('Error fetching inspection items:', error);
    } else {
      setInspectionItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (industry && category && foodType) {
      setExcludedItems([]);
      fetchInspectionItems();
    }
  }, [industry, category, foodType]);

  useEffect(() => {
    const fetchCommonCriteria = async () => {
      const { data, error } = await supabase
        .from('common_inspection')
        .select('*')
        .order('id');
      
      if (error) console.error('Error fetching common criteria:', error);
      else {
        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.criterion_name]) {
            acc[item.criterion_name] = [];
          }
          acc[item.criterion_name].push(item);
          return acc;
        }, {});
        setCommonCriteria(data);
        setGroupedCommonCriteria(groupedData);
      }
    };

    fetchCommonCriteria();
  }, []);

  const handleNextStep = () => {
    if (currentStep < 4) {
      if (currentStep === 3) {
        calculateFee();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateFee = () => {
    const includedItems = inspectionItems.filter(item => {
      if (item.condition_clause) {
        return !excludedItems.includes(item.id);
      }
      return true;
    });
    
    const selectedCommonItems = commonCriteria.filter(item => 
      selectedCommonCriteria.includes(item.id) && !excludedItems.includes(item.id)
    );
    
    const allCalculatedItems = [
      ...includedItems,
      ...selectedCommonItems
    ];
    
    setCalculatedItems(allCalculatedItems);
    
    const total = allCalculatedItems.reduce((sum, item) => sum + (Number(item.fee) || 0), 0);
    setTotalFee(total);
  };

  const commonQuestions = [
    {
      id: 1,
      question: '식품을 금속재질의 분쇄기로 분쇄를 하였나?'
    },
    {
      id: 2,
      question: '통,병조림 식품 인가요?'
    },
    {
      id: 3,
      question: '레토르트식품 인가요?'
    },
    {
      id: 4,
      question: '냉동식품 인가요?'
    }
  ];


  return (
    <MobileContainer>
      <Content>
        <StepIndicator currentStep={currentStep} />
        {loading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : (
          <>
            {currentStep === 1 && (
              <FormSection>
                <SectionTitle>수수료 계산기</SectionTitle>
                <Label>업종:</Label>
                <Select
                  options={industryOptions}
                  value={industryOptions.find(option => option.value === industry)}
                  onChange={(selectedOption) => setIndustry(selectedOption?.value || '')}
                  placeholder="업종을 선택하세요"
                />
                <Label>구분:</Label>
                <Select
                  options={categoryOptions}
                  value={categoryOptions.find(option => option.value === category)}
                  onChange={(selectedOption) => setCategory(selectedOption?.value || '')}
                  isDisabled={!industry}
                  placeholder="구분을 선택하세요"
                />
                <Label>식품 유형:</Label>
                <Select
                  options={foodTypeOptions}
                  value={foodTypeOptions.find(option => option.value === foodType)}
                  onChange={(selectedOption) => setFoodType(selectedOption?.value || '')}
                  isDisabled={!category}
                  isSearchable
                  placeholder="식품 유형을 선택하세요"
                />
                <ButtonContainer>
                  <StyledButton onClick={() => window.close()}>계산종료</StyledButton>
                  <StyledButton primary onClick={handleNextStep}>다음</StyledButton>
                </ButtonContainer>
              </FormSection>
            )}
            {currentStep === 2 && (
              <FormSection>
                <SectionTitle>검사항목 확인</SectionTitle>
                {inspectionItems.map(item => (
                  <ChecklistItem key={item.id}>
                    <InspectionContent>
                      <InspectionHeader>
                        <Label>{item.inspection_item}</Label>
                        {excludedItems.includes(item.id) && 
                          <ExclusionLabel>검사 제외</ExclusionLabel>
                        }
                      </InspectionHeader>
                      {item.condition_clause && (
                        <ConditionClause>
                          <input
                            type="checkbox"
                            checked={excludedItems.includes(item.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setExcludedItems([...excludedItems, item.id]);
                              } else {
                                setExcludedItems(excludedItems.filter(id => id !== item.id));
                              }
                            }}
                          />
                          <span>{item.condition_clause}</span>
                        </ConditionClause>
                      )}
                    </InspectionContent>
                  </ChecklistItem>
                ))}
                <ButtonContainer>
                  <StyledButton onClick={handlePrevStep}>이전</StyledButton>
                  <StyledButton primary onClick={handleNextStep}>다음</StyledButton>
                </ButtonContainer>
              </FormSection>
            )}
            {currentStep === 3 && (
              <FormSection>
                <SectionTitle>검사 관련 추가 확인 사항</SectionTitle>
                {commonQuestions.map((question) => {
                  const relatedCriteriaItems = (() => {
                    switch(question.id) {
                      case 1: return commonCriteria.filter(item => item.id === 1);
                      case 2: return commonCriteria.filter(item => [2,3].includes(item.id));
                      case 3: return commonCriteria.filter(item => [4,5].includes(item.id));
                      case 4: return commonCriteria.filter(item => [6,7,8,9].includes(item.id));
                      default: return [];
                    }
                  })();

                  return (
                    <div key={question.id} style={{ marginBottom: '2rem' }}>
                      <ChecklistItem>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', width: '100%' }}>
                          <input
                            type="checkbox"
                            checked={relatedCriteriaItems.some(item => selectedCommonCriteria.includes(item.id))}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCommonCriteria([...selectedCommonCriteria, ...relatedCriteriaItems.map(item => item.id)]);
                              } else {
                                setSelectedCommonCriteria(
                                  selectedCommonCriteria.filter(id => !relatedCriteriaItems.map(item => item.id).includes(id))
                                );
                              }
                            }}
                          />
                          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <span>{question.question}</span>
                            {relatedCriteriaItems.some(item => excludedItems.includes(item.id)) && 
                              <ExclusionLabel>검사 제외</ExclusionLabel>
                            }
                          </div>
                        </div>
                      </ChecklistItem>
                      {relatedCriteriaItems.some(item => selectedCommonCriteria.includes(item.id)) && 
                        relatedCriteriaItems.map(item => item.condition_clause && (
                          <SubCheckbox key={item.id}>
                            <input
                              type="checkbox"
                              checked={excludedItems.includes(item.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setExcludedItems([...excludedItems, item.id]);
                                } else {
                                  setExcludedItems(excludedItems.filter(id => id !== item.id));
                                }
                              }}
                            />
                            <span>{item.condition_clause}</span>
                          </SubCheckbox>
                        ))
                      }
                    </div>
                  );
                })}
                <ButtonContainer>
                  <StyledButton onClick={handlePrevStep}>이전</StyledButton>
                  <StyledButton primary onClick={handleNextStep}>다음</StyledButton>
                </ButtonContainer>
              </FormSection>
            )}
            {currentStep === 4 && (
              <FormSection>
                <ReceiptContainer>
                  <ReceiptHeader>
                    <h3>수수료 계산 결과</h3>
                  </ReceiptHeader>
                  {calculatedItems.length > 0 ? (
                    <>
                      {calculatedItems.map(item => (
                        <ReceiptRow key={item.id}>
                          <span>{item.inspection_item}</span>
                          <span>{Number(item.fee).toLocaleString()}원</span>
                        </ReceiptRow>
                      ))}
                      <ReceiptRow className="total">
                        <span>{totalFee.toLocaleString()}원</span>
                      </ReceiptRow>
                    </>
                  ) : (
                    <Notice>선택된 검사 항목이 없습니다.</Notice>
                  )}
                  <ReceiptFooter>
                    ※ 해당 수수료는 식약처 고시 금액 기준으로 산정되었으며, 인건비와 일반관리비는 제외됩니다. 
                    민간 기관과는 시약비와 장비 구매 비용 등의 차이로 수수료가 다를 수 있습니다.
                  </ReceiptFooter>
                </ReceiptContainer>
                <ButtonContainer>
                  <StyledButton onClick={() => setCurrentStep(1)}>처음으로</StyledButton>
                  <StyledButton primary onClick={() => window.close()}>계산종료</StyledButton>
                </ButtonContainer>
              </FormSection>
            )}
          </>
        )}
      </Content>
    </MobileContainer>
  );
}