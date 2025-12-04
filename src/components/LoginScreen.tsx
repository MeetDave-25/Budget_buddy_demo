import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4"
          >
            <Wallet className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BudgetBuddy
          </h1>
          <p className="text-muted-foreground">Track, Save, Succeed 🎓</p>
        </div>

        <Card className="p-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <Input type="email" placeholder="student@university.edu" />
            </div>
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block mb-2 text-sm">Confirm Password</label>
                <Input type="password" placeholder="••••••••" />
              </motion.div>
            )}
            <Button onClick={onLogin} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              {isSignup ? 'Sign Up' : 'Login'}
            </Button>
            <div className="text-center text-sm">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-600 hover:underline"
              >
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Smart budgeting for smarter students 💡
        </p>
      </motion.div>
    </div>
  );
}
