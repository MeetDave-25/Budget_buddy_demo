import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { CategoryIcon } from './CategoryIcon';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Settings, AlertCircle, Trophy, Flame, Award, Star, Lock, LogOut, DollarSign } from 'lucide-react';

interface SettingsScreenProps {
  userData: any;
  onUpdateBudget: (totalBudget: number, categories: any[]) => void;
  onUpdateIncome?: (income: number) => void;
  onLogout?: () => void;
}

export function SettingsScreen({ userData, onUpdateBudget, onUpdateIncome, onLogout }: SettingsScreenProps) {
  const [totalBudget, setTotalBudget] = useState(userData.totalBudget.toString());
  const [categories, setCategories] = useState(userData.categories);
  const [monthlyIncome, setMonthlyIncome] = useState(userData.monthlyIncome?.toString() || '0');
  const [showBudgetSuccess, setShowBudgetSuccess] = useState(false);
  const [showCategorySuccess, setShowCategorySuccess] = useState(false);
  const [showIncomeSuccess, setShowIncomeSuccess] = useState(false);

  const handleCategoryLimitChange = (index: number, newLimit: string) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], limit: Number(newLimit) };
    setCategories(updated);
  };

  const handleSaveBudget = () => {
    onUpdateBudget(Number(totalBudget), userData.categories);
    setShowBudgetSuccess(true);
    setTimeout(() => setShowBudgetSuccess(false), 2000);
  };

  const handleSaveCategoryLimits = () => {
    onUpdateBudget(userData.totalBudget, categories);
    setShowCategorySuccess(true);
    setTimeout(() => setShowCategorySuccess(false), 2000);
  };

  const handleSaveIncome = () => {
    if (onUpdateIncome) {
      onUpdateIncome(Number(monthlyIncome));
    }
    setShowIncomeSuccess(true);
    setTimeout(() => setShowIncomeSuccess(false), 2000);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('budgetTrackerData');
      if (onLogout) {
        onLogout();
      }
    }
  };

  const totalCategoryLimits = categories.reduce((sum: number, cat: any) => sum + cat.limit, 0);
  const isOverBudget = totalCategoryLimits > Number(totalBudget);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4"
        >
          <h1 className="text-2xl mb-1">Budget Settings ⚙️</h1>
          <p className="text-muted-foreground text-sm">Manage your budget and limits</p>
        </motion.div>

        {/* Monthly Budget Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Monthly Budget
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block mb-2 text-sm text-muted-foreground">Total Budget (₹)</label>
                <Input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  placeholder="80000"
                  className="mb-3"
                />
              </div>
              <Button
                onClick={handleSaveBudget}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {showBudgetSuccess ? '✓ Saved!' : 'Save Budget'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Category Limits Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="mb-4">Category-wise Limits</h3>
            <div className="space-y-4">
              {categories.map((cat: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${cat.color}`}>
                      <CategoryIcon category={cat.name} className="w-4 h-4" />
                    </div>
                    <label className="flex-1 text-sm">{cat.name}</label>
                  </div>
                  <Input
                    type="number"
                    value={cat.limit}
                    onChange={(e) => handleCategoryLimitChange(i, e.target.value)}
                    placeholder="0"
                  />
                  {cat.spent > cat.limit && (
                    <p className="text-xs text-red-600">
                      ⚠️ Currently over budget by ₹{cat.spent - cat.limit}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 rounded-lg bg-muted space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Category Limits:</span>
                <span className={isOverBudget ? 'text-red-600' : ''}>
                  ₹{totalCategoryLimits.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Budget:</span>
                <span>₹{Number(totalBudget).toLocaleString()}</span>
              </div>
            </div>

            {isOverBudget && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-sm">
                  Category limits exceed total budget by ₹{(totalCategoryLimits - Number(totalBudget)).toLocaleString()}!
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSaveCategoryLimits}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {showCategorySuccess ? '✓ Saved!' : 'Save Category Limits'}
            </Button>
          </Card>
        </motion.div>

        {/* Achievements Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <h3 className="mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Your Achievements
            </h3>
            
            {/* Saving Streak */}
            <div className="mb-6 p-4 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-100">
                    <Flame className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-sm">Saving streak</p>
                </div>
              </div>
              <p className="text-center text-3xl mb-2">1 days 🔥</p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* First Step Badge - Unlocked */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-lg bg-white text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-xs">First Step</p>
              </motion.div>

              {/* Luckiest Badge - Locked */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                className="p-4 rounded-lg bg-white text-center opacity-50"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Luckiest</p>
              </motion.div>

              {/* Locked Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="p-4 rounded-lg bg-white text-center opacity-50"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Locked</p>
              </motion.div>

              {/* More Locked Badges */}
              {[1, 2, 3].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className="p-4 rounded-lg bg-white text-center opacity-50"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">Locked</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Monthly Income Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Monthly Income
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block mb-2 text-sm text-muted-foreground">
                  Update your monthly income (₹)
                </label>
                <Input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="100000"
                  className="mb-3"
                />
              </div>
              <Button
                onClick={handleSaveIncome}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {showIncomeSuccess ? '✓ Saved!' : 'Save Income'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-4"
        >
          <p className="text-xs text-muted-foreground">Made By Mool G. Dave</p>
        </motion.div>
      </div>
    </div>
  );
}
