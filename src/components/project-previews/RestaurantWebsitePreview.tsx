import React, { useState } from 'react';
import { Utensils, Users, Clock, Check, Sparkles, Filter, ExternalLink, Calendar } from 'lucide-react';
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

export const RestaurantWebsitePreview: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();
  const [activeTab, setActiveTab] = useState<'menu' | 'reserve'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'starters' | 'mains' | 'desserts'>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'gluten-free'>('all');
  const [cartCount, setCartCount] = useState(0);

  // Reservation Form State
  const [partySize, setPartySize] = useState('2 Guests');
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [isReserved, setIsReserved] = useState(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchDiet = dietFilter === 'all' || item.diet === dietFilter;
    return matchCat && matchDiet;
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setCartCount((c) => c + 1);
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    setIsReserved(true);
  };

  return (
    <div className="w-full bg-white rounded-xl border border-black/10 overflow-hidden text-neutral-900 flex flex-col h-full shadow-sm">
      {/* Mini App Navigation Bar */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-black/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* macOS window control dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-xs inline-block" title="Close" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-xs inline-block" title="Minimize" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-xs inline-block" title="Maximize" />
          </div>
          <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <Utensils className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-bold text-xs tracking-wide uppercase text-black">
            Saffron Leaf
          </span>
          <span className="text-[10px] text-neutral-500 border-l border-black/10 pl-2 hidden sm:inline">
            Fine Dining &bull; Live on Vercel
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
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black'
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
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Reserve Table
          </button>
          {cartCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-black text-white font-bold text-[10px]">
              {cartCount} in Order
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[360px]">
        {activeTab === 'menu' ? (
          <div className="space-y-3">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-black/5 text-[11px]">
              <div className="flex items-center gap-1">
                {(['all', 'starters', 'mains', 'desserts'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playClickSound();
                      setSelectedCategory(cat);
                    }}
                    className={`px-2.5 py-0.5 rounded capitalize ${
                      selectedCategory === cat
                        ? 'bg-black text-white font-semibold'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <Filter className="w-3 h-3 text-neutral-400" />
                {(['all', 'veg', 'gluten-free'] as const).map((diet) => (
                  <button
                    key={diet}
                    onClick={() => {
                      playClickSound();
                      setDietFilter(diet);
                    }}
                    className={`px-2 py-0.5 rounded capitalize ${
                      dietFilter === diet
                        ? 'bg-neutral-800 text-white font-medium'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-neutral-50/70 border border-black/5 hover:border-black/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h5 className="font-display font-bold text-xs text-black">
                        {item.name}
                      </h5>
                      <span className="font-mono-code font-bold text-xs text-black shrink-0">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-600 leading-snug line-clamp-2 mb-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5">
                    <span className="text-[10px] font-mono-code text-neutral-500 capitalize">
                      {item.diet}
                    </span>
                    <button
                      onClick={handleAddToCart}
                      className="px-2.5 py-1 rounded text-[10px] font-semibold bg-white hover:bg-neutral-100 border border-black/10 text-black transition-colors shadow-2xs"
                    >
                      + Add to Table
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 font-mono-code">
              <span>Interactive menu simulation</span>
              <a
                href="https://restaurant-website-chi-eosin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-semibold hover:underline flex items-center gap-1"
              >
                <span>Launch Full Restaurant App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 max-w-sm mx-auto">
            {isReserved ? (
              <div className="p-4 rounded-xl bg-neutral-50 border border-black/10 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mx-auto">
                  <Check className="w-4 h-4" />
                </div>
                <h5 className="font-display font-bold text-sm text-black">Table Reserved!</h5>
                <p className="text-xs text-neutral-600">
                  Reserved for <strong>{partySize}</strong> at <strong>{timeSlot}</strong> tonight. Confirmation SMS sent.
                </p>
                <button
                  onClick={() => setIsReserved(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono-code bg-white border border-black/15 text-black hover:bg-neutral-50 mt-2"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-3">
                <div className="text-center pb-1">
                  <h5 className="font-display font-bold text-sm text-black">Table Reservation</h5>
                  <p className="text-[11px] text-neutral-500">Fast 2-step booking with instant confirmation</p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code text-neutral-600 mb-1">Guests</label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {['2 Guests', '4 Guests', '6+ Guests'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPartySize(size)}
                        className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                          partySize === size
                            ? 'bg-black text-white font-medium border-black'
                            : 'bg-white border-black/10 text-neutral-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code text-neutral-600 mb-1">Time Slot</label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {['7:00 PM', '7:30 PM', '8:30 PM'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setTimeSlot(time)}
                        className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                          timeSlot === time
                            ? 'bg-black text-white font-medium border-black'
                            : 'bg-white border-black/10 text-neutral-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Confirm Reservation</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

