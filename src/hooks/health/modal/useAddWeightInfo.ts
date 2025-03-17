// useAddWeightInfo.ts
import { useState, useEffect } from "react";

export const useAddWeightInfo = () => {
  const [weight, setWeight] = useState<string>("");
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bmi, setBmi] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleTargetWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetWeight(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const calculateBMI = () => {
    if (weight && height) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height) / 100; // cm to m
      
      if (weightNum > 0 && heightNum > 0) {
        const bmiValue = weightNum / (heightNum * heightNum);
        setBmi(bmiValue);
      }
    }
  };

  // 높이나 무게가 변경될 때 BMI 자동 계산
  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  const handleSubmit = async (onClose: () => void) => {
    if (!weight || !targetWeight || !height || !date) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // API 호출 예시
      /* 
      const response = await fetch('/api/health-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight: parseFloat(weight),
          target_weight: parseFloat(targetWeight),
          bmi: bmi,
          created_at: date
        }),
      });

      if (!response.ok) {
        throw new Error('데이터 저장 중 오류가 발생했습니다.');
      }
      */

      // 성공적으로 저장되었다고 가정
      console.log("체중 데이터 저장:", {
        weight: parseFloat(weight),
        target_weight: parseFloat(targetWeight),
        bmi: bmi,
        created_at: date
      });

      // API 호출 시뮬레이션 (실제로는 제거)
      await new Promise(resolve => setTimeout(resolve, 500));

      alert("체중 정보가 성공적으로 저장되었습니다.");
      
      // 폼 초기화
      setWeight("");
      setTargetWeight("");
      setHeight("");
      setDate(new Date().toISOString().split('T')[0]);
      setBmi(0);

      // 모달 닫기
      onClose();
    } catch (error) {
      console.error("체중 정보 저장 오류:", error);
      alert("체중 정보 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    weight,
    targetWeight,
    height,
    date,
    bmi,
    handleWeightChange,
    handleTargetWeightChange,
    handleHeightChange,
    handleDateChange,
    calculateBMI,
    handleSubmit,
    isSubmitting
  };
};