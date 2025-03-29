// types/finance/interfaces.ts
export interface ApiResponse<T> {
    apiData: T;
    message: string | null;
    result: string;
}
export interface Transaction {
    id: string;
    date: string;
    type: string;
    category: string;
    amount: number;
    description: string;
    income: boolean;
}
export interface FinanceState {
    transactions: Transaction[];
    categoryBudgets: CategoryBudget[];
    budgetStatus: BudgetStatus;
    savingsStatus: SavingsStatus;
    isLoading: boolean;
    error: string | null;
}


export interface CategoryBudget {
    category_name: string;
    amount: number;
    percentage: number;
}

export interface BudgetStatus {
    total_budget: number;
    used_amount: number;
    remaining: number;
    usage_percentage: number;
    total_income: number;    // 추가
    total_expense: number;   // 추가
}
export interface SavingsStatus {
    target_amount: number;
    current_amount: number;
    achievement_rate: number;
}

export interface CategoryChartProps {
    categoryBudgets: CategoryBudget[];
}

export interface IncomeExpenseChartProps {
    transactions: Transaction[];
}

export interface ProgressChartProps {
    percentage: number;
    label: string;
    color?: string;
}

export interface TransactionList {
    transactionId: number;
    amount: number;
    category: string;
    date: string;
    description: string;
    income: boolean;
    type: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface FilterOptions {
    type: string;
    category: string;
    search: string;
}

export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface SortOptions {
    field: string;
    direction: string;
}


export interface DateSelectionModalProps {
    onClose: () => void;
    onSelectDate?: (date: Date) => void;
}