// Type definitions for the Budget Tracker App

export interface Category {
    name: string;
    limit: number;
    spent: number;
    color: string;
}

export interface Expense {
    amount: number;
    category: string;
    categoryColor: string;
    date: string;
    notes: string;
}

export interface Alert {
    message: string;
}

export interface UserData {
    monthlyIncome: number;
    totalBudget: number;
    spent: number;
    categories: Category[];
    expenses: Expense[];
    alerts: Alert[];
    aiSuggestions: string[];
    badges: string[];
    savingsGoal: number;
    currentSavings: number;
}

export interface ChartDataItem {
    name: string;
    value: number;
    fill: string;
}
