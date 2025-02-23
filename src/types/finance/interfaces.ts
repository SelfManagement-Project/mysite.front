// types/finance/interfaces.ts
export interface Transaction {
    date: string;
    type: string;
    category: string;
    amount: number;
    description: string;
    is_income: boolean;
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