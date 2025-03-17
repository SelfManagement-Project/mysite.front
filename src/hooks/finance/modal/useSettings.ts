// useSettings.ts
import { useState, useEffect } from "react";

export const useSettings = () => {
  const [currency, setCurrency] = useState<string>("KRW");
  const [dateFormat, setDateFormat] = useState<string>("YYYY-MM-DD");
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("ko");

  // 초기 설정값 로드
  useEffect(() => {
    // 로컬 스토리지나 API에서 설정값 로드
    const savedSettings = localStorage.getItem("financeSettings");
    
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setCurrency(parsedSettings.currency || "KRW");
      setDateFormat(parsedSettings.dateFormat || "YYYY-MM-DD");
      setNotificationEnabled(parsedSettings.notificationEnabled !== undefined ? parsedSettings.notificationEnabled : true);
      setDarkMode(parsedSettings.darkMode || false);
      setLanguage(parsedSettings.language || "ko");
    }
  }, []);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleDateFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFormat(e.target.value);
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const saveSettings = (onClose: () => void) => {
    // 설정값 저장 로직
    const settings = {
      currency,
      dateFormat,
      notificationEnabled,
      darkMode,
      language
    };

    // 로컬 스토리지에 저장
    localStorage.setItem("financeSettings", JSON.stringify(settings));

    // API로 서버에 저장할 경우
    // const saveToServer = async () => {
    //   try {
    //     const response = await fetch('/api/settings', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(settings),
    //     });
    //
    //     if (!response.ok) {
    //       throw new Error('설정 저장 중 오류가 발생했습니다.');
    //     }
    //   } catch (error) {
    //     console.error('설정 저장 오류:', error);
    //     alert('설정을 저장하는 중 오류가 발생했습니다.');
    //   }
    // };
    //
    // saveToServer();

    // 다크 모드 설정 적용
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    alert("설정이 저장되었습니다.");
    onClose();
  };

  return {
    currency,
    dateFormat,
    notificationEnabled,
    darkMode,
    language,
    handleCurrencyChange,
    handleDateFormatChange,
    handleNotificationToggle,
    handleDarkModeToggle,
    handleLanguageChange,
    saveSettings
  };
};