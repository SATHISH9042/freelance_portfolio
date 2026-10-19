import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Plus, Database, ShieldCheck, Tag } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Freelance Client Retainer', amount: 3200, type: 'income', category: 'Client Work', date: 'Today' },
  { id: '2', title: 'AWS Cloud Hosting', amount: 84.50, type: 'expense', category: 'Infrastructure', date: 'Yesterday' },
  { id: '3', title: 'Figma Professional License', amount: 15.00, type: 'expense', category: 'Software', date: 'Oct 16' },
  { id: '4', title: 'Technical Writing Honorarium', amount: 450, type: 'income', category: 'Writing', date: 'Oct 14' }
];

export const FinanceTrackerPreview: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'income' | 'expense'>('expense');
  const [newCategory] = useState('Workspace');
  const [showAddForm, setShowAddForm] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('demo_portfolio_transactions');
      if (saved) {
        setTransactions(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  const saveTransactions = (updated: Transaction[]) => {
    setTransactions(updated);
    try {
      localStorage.setItem('demo_portfolio_transactions', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount) return;

    const parsedAmount = parseFloat(newAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    playPopSound();
    const newItem: Transaction = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      amount: parsedAmount,
      type: newType,
      category: newCategory,
      date: 'Just now'
    };

    const updated = [newItem, ...transactions];
    saveTransactions(updated);
    setNewTitle('');
    setNewAmount('');
    setShowAddForm(false);
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="w-full bg-white rounded-xl border border-black/10 overflow-hidden text-neutral-900 flex flex-col h-full shadow-sm">
      {/* Mini App Bar */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-black/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* macOS window control dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-xs inline-block" title="Close" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-xs inline-block" title="Minimize" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-xs inline-block" title="Maximize" />
          </div>
          <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs shadow-sm">
            $
          </div>
          <span className="font-display font-bold text-xs tracking-wide uppercase text-black">
            VaultFinance
          </span>
          <span className="text-[10px] text-neutral-600 bg-black/5 px-2 py-0.5 rounded border border-black/10 hidden sm:inline-flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3 h-3 text-black" />
            <span>Zero-Server / LocalStorage Only</span>
          </span>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setShowAddForm(!showAddForm);
          }}
          className="px-2.5 py-1 rounded text-[11px] font-semibold bg-black text-white hover:bg-neutral-800 transition-colors flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3 h-3" />
          <span>{showAddForm ? 'Close Form' : 'Log Entry'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[360px] space-y-3.5">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-neutral-50 border border-black/10">
            <span className="block text-[10px] font-mono-code text-neutral-500">Net Balance</span>
            <span className="font-mono-code font-bold text-sm sm:text-base text-black">
              ${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-50 border border-black/10">
            <div className="flex items-center gap-1 text-[10px] font-mono-code text-black font-semibold">
              <ArrowUpRight className="w-3 h-3" />
              <span>Income</span>
            </div>
            <span className="font-mono-code font-bold text-sm sm:text-base text-black">
              +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-50 border border-black/10">
            <div className="flex items-center gap-1 text-[10px] font-mono-code text-neutral-700 font-semibold">
              <ArrowDownRight className="w-3 h-3" />
              <span>Expenses</span>
            </div>
            <span className="font-mono-code font-bold text-sm sm:text-base text-neutral-800">
              -${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* Quick Add Form Drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddTransaction}
            className="p-3 rounded-lg bg-neutral-50 border border-black/15 space-y-2 text-xs"
          >
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Description (e.g. Domain renew)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-2.5 py-1.5 rounded bg-white border border-black/15 text-neutral-900 placeholder-neutral-400 text-xs focus:outline-none focus:border-black"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Amount (USD)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="px-2.5 py-1.5 rounded bg-white border border-black/15 text-neutral-900 placeholder-neutral-400 text-xs focus:outline-none focus:border-black"
                required
              />
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNewType('expense')}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    newType === 'expense'
                      ? 'bg-black text-white font-semibold'
                      : 'bg-white border border-black/10 text-neutral-600'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('income')}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    newType === 'income'
                      ? 'bg-black text-white font-semibold'
                      : 'bg-white border border-black/10 text-neutral-600'
                  }`}
                >
                  Income
                </button>
              </div>

              <button
                type="submit"
                className="px-3 py-1 rounded bg-black hover:bg-neutral-800 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Save Entry
              </button>
            </div>
          </form>
        )}

        {/* Transaction History List */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-500 pb-1.5 mb-1.5 border-b border-black/5">
            <span>Recent Activity ({transactions.length})</span>
            <span className="flex items-center gap-1 text-[10px] text-black font-medium">
              <Database className="w-3 h-3 text-black" />
              <span>localStorage Live</span>
            </span>
          </div>

          <div className="space-y-1.5">
            {transactions.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="p-2 rounded-lg bg-neutral-50 border border-black/10 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                      t.type === 'income' ? 'bg-black/10 text-black' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {t.type === 'income' ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-black block text-xs">{t.title}</span>
                    <span className="text-[10px] text-neutral-500 font-mono-code flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> {t.category} • {t.date}
                    </span>
                  </div>
                </div>

                <div className="font-mono-code font-semibold text-xs text-black">
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini App Footer */}
      <div className="px-4 py-2 bg-neutral-50 border-t border-black/5 flex items-center justify-between text-[10px] font-mono-code text-neutral-500">
        <span>Persistent Browser State</span>
        <span className="text-black font-semibold">100% Client-Side Privacy</span>
      </div>
    </div>
  );
};
