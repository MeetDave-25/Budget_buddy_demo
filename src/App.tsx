import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { Dashboard } from './components/Dashboard';
import { ExpenseScreen } from './components/ExpenseScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { AIScreen } from './components/AIScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNav } from './components/BottomNav';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import type { UserData, Category, Expense } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('budgetTrackerData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(parsed);
      setIsLoggedIn(true);
      setIsOnboarded(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('budgetTrackerData', JSON.stringify(userData));
    }
  }, [userData]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleOnboardingComplete = (monthlyIncome: number, totalBudget: number) => {
    const initialData = {
      monthlyIncome,
      totalBudget,
      spent: 9300,
      categories: [
        { name: 'Food', limit: 3000, spent: 2400, color: 'bg-orange-100' },
        { name: 'Rent', limit: 4000, spent: 4000, color: 'bg-blue-100' },
        { name: 'Travel', limit: 2000, spent: 1500, color: 'bg-green-100' },
        { name: 'Entertainment', limit: 2000, spent: 1800, color: 'bg-purple-100' },
        { name: 'Shopping', limit: 1500, spent: 600, color: 'bg-pink-100' },
        { name: 'Education', limit: 1000, spent: 0, color: 'bg-yellow-100' },
      ],
      expenses: [
        { amount: 250, category: 'Food', categoryColor: 'bg-orange-100', date: '2025-09-28', notes: 'Lunch at campus cafeteria' },
        { amount: 120, category: 'Travel', categoryColor: 'bg-green-100', date: '2025-09-27', notes: 'Bus pass' },
        { amount: 500, category: 'Entertainment', categoryColor: 'bg-purple-100', date: '2025-09-26', notes: 'Movie with friends' },
        { amount: 300, category: 'Food', categoryColor: 'bg-orange-100', date: '2025-09-25', notes: 'Dinner at restaurant' },
        { amount: 150, category: 'Shopping', categoryColor: 'bg-pink-100', date: '2025-09-24', notes: 'New notebook' },
        { amount: 200, category: 'Food', categoryColor: 'bg-orange-100', date: '2025-09-23', notes: 'Coffee shop' },
        { amount: 400, category: 'Travel', categoryColor: 'bg-green-100', date: '2025-09-22', notes: 'Weekend trip' },
      ],
      alerts: [
        { message: "You've exceeded your Entertainment budget by ₹200!" },
      ],
      aiSuggestions: [
        "You spent 30% more on food this month compared to last month.",
        "Consider setting aside ₹500 from your remaining budget for emergency savings.",
        "You're doing great with Travel - 25% under budget!",
        "Try meal prepping to save up to ₹600/month on food expenses.",
      ],
      badges: ['Smart Saver 🌟', 'Budget Master 💪', 'Streak King 🔥'],
      savingsGoal: 5000,
      currentSavings: 2300,
    };
    setUserData(initialData);
    setIsOnboarded(true);
    toast.success('Welcome to BudgetBuddy! 🎉');
  };

  const handleAddExpense = (expense: Expense) => {
    if (!userData) return;

    const updatedExpenses = [expense, ...userData.expenses];
    const updatedCategories = userData.categories.map((cat: Category) => {
      if (cat.name === expense.category) {
        return { ...cat, spent: cat.spent + expense.amount };
      }
      return cat;
    });

    const newSpent = userData.spent + expense.amount;
    const categoryData = updatedCategories.find((c: Category) => c.name === expense.category);

    let updatedAlerts = [...userData.alerts];
    if (categoryData && categoryData.spent > categoryData.limit) {
      const overAmount = categoryData.spent - categoryData.limit;
      const alertMessage = `You've exceeded your ${expense.category} budget by ₹${overAmount}!`;
      if (!updatedAlerts.some((a) => a.message.includes(expense.category))) {
        updatedAlerts.push({ message: alertMessage });
      }
    }

    setUserData({
      ...userData,
      expenses: updatedExpenses,
      categories: updatedCategories,
      spent: newSpent,
      alerts: updatedAlerts,
    });

    toast.success(`Added ₹${expense.amount} expense to ${expense.category}`);
    setCurrentScreen('dashboard');
  };

  const handleUpdateExpense = (index: number, updatedExpense: Expense) => {
    if (!userData) return;

    const oldExpense = userData.expenses[index];
    const updatedExpenses = [...userData.expenses];
    updatedExpenses[index] = updatedExpense;

    // Calculate the difference in amount
    const amountDiff = updatedExpense.amount - oldExpense.amount;

    // Update category spent amounts
    const updatedCategories = userData.categories.map((cat: Category) => {
      if (cat.name === oldExpense.category && oldExpense.category === updatedExpense.category) {
        // Same category - just add the difference
        return { ...cat, spent: cat.spent + amountDiff };
      } else if (cat.name === oldExpense.category) {
        // Removed from this category
        return { ...cat, spent: cat.spent - oldExpense.amount };
      } else if (cat.name === updatedExpense.category) {
        // Added to this category
        return { ...cat, spent: cat.spent + updatedExpense.amount };
      }
      return cat;
    });

    const newSpent = userData.spent + amountDiff;

    setUserData({
      ...userData,
      expenses: updatedExpenses,
      categories: updatedCategories,
      spent: newSpent,
    });

    toast.success(`Updated expense successfully`);
  };

  const handleDeleteExpense = (index: number) => {
    if (!userData) return;

    const expenseToDelete = userData.expenses[index];
    const updatedExpenses = userData.expenses.filter((_expense: Expense, i: number) => i !== index);

    // Update category spent amounts
    const updatedCategories = userData.categories.map((cat: Category) => {
      if (cat.name === expenseToDelete.category) {
        return { ...cat, spent: cat.spent - expenseToDelete.amount };
      }
      return cat;
    });

    const newSpent = userData.spent - expenseToDelete.amount;

    setUserData({
      ...userData,
      expenses: updatedExpenses,
      categories: updatedCategories,
      spent: newSpent,
    });

    toast.success(`Deleted expense: ₹${expenseToDelete.amount}`);
  };

  const handleUpdateBudget = (totalBudget: number, categories: Category[]) => {
    if (!userData) return;
    setUserData({
      ...userData,
      totalBudget,
      categories,
    });
  };

  const handleUpdateIncome = (income: number) => {
    if (!userData) return;
    setUserData({
      ...userData,
      monthlyIncome: income,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOnboarded(false);
    setUserData(null);
    setCurrentScreen('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!isOnboarded) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Safety check: userData should always be set after onboarding
  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {currentScreen === 'dashboard' && (
        <Dashboard
          userData={userData}
          onAddExpense={() => setCurrentScreen('expenses')}
        />
      )}
      {currentScreen === 'expenses' && (
        <ExpenseScreen
          userData={userData}
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      )}
      {currentScreen === 'reports' && (
        <ReportsScreen userData={userData} />
      )}
      {currentScreen === 'ai' && (
        <AIScreen userData={userData} />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen
          userData={userData}
          onUpdateBudget={handleUpdateBudget}
          onUpdateIncome={handleUpdateIncome}
          onLogout={handleLogout}
        />
      )}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
      />
      <Toaster />
    </div>
  );
}