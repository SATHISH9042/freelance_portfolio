import React, { useState } from 'react';
import { Utensils, Users, Clock, Check, Sparkles, Filter } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'desserts';
  price: string;
  diet: 'veg' | 'non-veg' | 'gluten-free';
  desc: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Truffle Saffron Risotto',
    category: 'mains',
    price: '$28',
    diet: 'veg',
    desc: 'Arborio rice, Persian saffron broth, shaved black truffle, aged parmesan.',
    badge: "Chef's Signature",
  },
  {
    id: 'm2',
    name: 'Pan-Seared Sea Bass',
    category: 'mains',
    price: '$34',
    diet: 'gluten-free',
    desc: 'Crisp skin wild bass, lemon-caper beurre blanc, charred asparagus.',
  },
  {
    id: 'm3',
    name: 'Crispy Artichoke Carpaccio',
    category: 'starters',
    price: '$18',
    diet: 'veg',
    desc: 'Flash-fried baby artichokes, microgreens, preserved lemon emulsion.',
  },
  {
    id: 'm4',
    name: 'Cardamom & Rose Panna Cotta',
    category: 'desserts',
    price: '$14',
    diet: 'gluten-free',
    desc: 'Velvety cream infusion, crushed pistachios, edible gold leaf.',
  },
];

export const SaffronLeafPreview: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();
  const [activeTab, setActiveTab] = useState<'menu' | 'reserve'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'starters' | 'mains' | 'desserts'>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'gluten-free'>('all');
  const [cartCount, setCartCount] = useState(0);

  // Reservation Form State
  const [partySize, setPartySize] = useState('2 Guests');
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [isBooked, setIsBooked] = useState(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDiet = dietFilter === 'all' || item.diet === dietFilter;
    return matchesCategory && matchesDiet;
  });

  const handleAddToCart = () => {
    playClickSound();
    setCartCount((prev) => prev + 1);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 4000);
  };

  return (
    <div className="w-full bg-midnight-950 rounded-xl border border-surface-border overflow-hidden text-slate-100 flex flex-col h-full shadow-2xl">
      {/* Mini App Navigation Bar */}
      <div className="px-4 py-3 bg-midnight-900 border-b border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="w-4 h-4 text-amber-400" />
          <span className="font-display font-bold text-xs tracking-wide uppercase text-amber-300">
            Saffron Leaf
          </span>
          <span className="text-[10px] text-slate-400 border-l border-surface-border pl-2 hidden sm:inline">
            Fine Dining &amp; Lounge
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('menu');
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'menu'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Menu ({filteredItems.length})
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('reserve');
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'reserve'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Reserve Table
          </button>
          {cartCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500 text-midnight-950 font-bold text-[10px]">
              {cartCount} ordered
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[360px]">
        {activeTab === 'menu' ? (
          <div className="space-y-3">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-surface-border text-[11px]">
              <div className="flex items-center gap-1">
                {(['all', 'starters', 'mains', 'desserts'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playClickSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-2 py-0.5 rounded capitalize ${
                      selectedCategory === cat
                        ? 'bg-slate-200 text-midnight-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-500" />
                {(['all', 'veg', 'gluten-free'] as const).map((diet) => (
                  <button
                    key={diet}
                    onClick={() => {
                      playClickSound();
                      setDietFilter(diet);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      dietFilter === diet
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {diet === 'all' ? 'Any' : diet}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-midnight-900/80 border border-surface-border hover:border-amber-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-display font-semibold text-xs text-slate-100">{item.name}</h5>
                      <span className="font-mono-code font-bold text-xs text-amber-400">{item.price}</span>
                    </div>
                    {item.badge && (
                      <span className="inline-block mt-0.5 text-[9px] font-mono-code text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                        {item.badge}
                      </span>
                    )}
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-surface-border flex items-center justify-between">
                    <span className="text-[9px] font-mono-code uppercase text-slate-500">
                      {item.diet}
                    </span>
                    <button
                      onClick={handleAddToCart}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Table Reservation Flow */
          <div className="py-2">
            {isBooked ? (
              <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h5 className="font-display font-bold text-sm text-emerald-300">Table Reserved Successfully!</h5>
                <p className="text-xs text-slate-300">
                  Confirmation sent for {partySize} at {timeSlot}. We look forward to hosting you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-3 max-w-sm mx-auto">
                <div className="text-center mb-3">
                  <h5 className="font-display font-semibold text-xs text-slate-200">
                    Instant Online Reservation
                  </h5>
                  <p className="text-[11px] text-slate-400">Guaranteed seating with zero booking fee</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-mono-code text-slate-400 mb-1">
                      Party Size
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['2 Guests', '4 Guests', '6+ Guests'].map((size) => (
                        <button
                          type="button"
                          key={size}
                          onClick={() => {
                            playClickSound();
                            setPartySize(size);
                          }}
                          className={`py-1.5 rounded text-[11px] border flex items-center justify-center gap-1 ${
                            partySize === size
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium'
                              : 'border-surface-border text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <Users className="w-3 h-3" />
                          <span>{size}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-code text-slate-400 mb-1">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['6:30 PM', '7:30 PM', '8:45 PM'].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => {
                            playClickSound();
                            setTimeSlot(slot);
                          }}
                          className={`py-1.5 rounded text-[11px] border flex items-center justify-center gap-1 ${
                            timeSlot === slot
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium'
                              : 'border-surface-border text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-midnight-950 transition-colors shadow-md mt-2"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Mini Footer / Tech highlight */}
      <div className="px-4 py-2 bg-midnight-900/90 border-t border-surface-border flex items-center justify-between text-[10px] font-mono-code text-slate-400">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Interactive State • Zero Reloads</span>
        </span>
        <span>Mobile-First Fluid Breakpoints</span>
      </div>
    </div>
  );
};
