// types/common/tabs.ts
export interface Tab {
    name: string;
    content: string;
}

export interface HeaderProps {
    onMenuClick: (menuName: string) => void;
    showNav?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface ForgotPasswordFormProps {
  onClose?: () => void;
}

export interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onSelectChat: (chatId: number) => void;  // 새로운 props 추가
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface DefaultLayoutProps {
  children: React.ReactNode;
  showNav?: boolean; // nav 표시 여부를 위한 prop 추가
}

export interface BlankLayoutProps {
    children: React.ReactNode;
  }