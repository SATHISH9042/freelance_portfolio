import React, { useState } from 'react';
import { Train, ArrowRight, Check, MapPin, Calendar, Clock, Armchair, Shield, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface TrainOption {
  id: string;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  classes: { code: string; name: string; price: number; seats: number }[];
}

const TRAINS: TrainOption[] = [
  {
    id: 'uzhavan',
    name: 'Uzhavan Express',
    number: '16186',
    departure: '22:15',
    arrival: '04:45',
    duration: '6h 30m',
    classes: [
      { code: 'SL', name: 'Sleeper', price: 245, seats: 48 },
      { code: '3A', name: 'AC 3 Tier', price: 660, seats: 24 },
      { code: '2A', name: 'AC 2 Tier', price: 945, seats: 12 },
    ],
  },
  {
    id: 'cholan',
    name: 'Cholan Superfast',
    number: '22676',
    departure: '09:20',
    arrival: '15:10',
    duration: '5h 50m',
    classes: [
      { code: '2S', name: 'Second Sitting', price: 155, seats: 76 },
      { code: 'CC', name: 'AC Chair Car', price: 540, seats: 32 },
      { code: '3A', name: 'AC 3 Tier', price: 660, seats: 16 },
    ],
  },
];

export const SaffronLeafPreview: React.FC = () => {
  const { playClickSound, playPopSound } = useTheme();
  const [selectedTrain, setSelectedTrain] = useState<TrainOption>(TRAINS[0]);
  const [selectedClass, setSelectedClass] = useState<string>('SL');
  const [selectedSeat, setSelectedSeat] = useState<number>(23);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'trains' | 'seats' | 'ticket'>('trains');

  const handleSelectTrain = (t: TrainOption) => {
    playClickSound();
    setSelectedTrain(t);
    setSelectedClass(t.classes[0].code);
    setIsBooked(false);
  };

  const handleBook = () => {
    playPopSound();
    setIsBooked(true);
    setActiveTab('ticket');
  };

  const selectedClassInfo = selectedTrain.classes.find((c) => c.code === selectedClass) || selectedTrain.classes[0];

  return (
    <div className="w-full bg-white rounded-xl border border-black/10 overflow-hidden text-neutral-900 flex flex-col h-full shadow-sm">
      {/* Mini App Bar with macOS window traffic dots */}
      <div className="px-4 py-3 bg-neutral-50 border-b border-black/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* macOS window control dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-xs inline-block" title="Close" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-xs inline-block" title="Minimize" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-xs inline-block" title="Maximize" />
          </div>
          <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <Train className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-bold text-xs tracking-wide uppercase text-black">
            RailFlow Mobile UI
          </span>
          <span className="text-[10px] text-neutral-700 bg-black/5 px-2 py-0.5 rounded border border-black/10 hidden sm:inline-flex items-center gap-1 font-medium">
            <span>Jakob &bull; Hick &bull; Miller Laws</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('trains');
            }}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'trains' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Trains
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('seats');
            }}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'seats' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Coach S2
          </button>
          {isBooked && (
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('ticket');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeTab === 'ticket' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Ticket
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[360px] space-y-3.5">
        {/* Route Card (Jakob's Law: Standard travel pattern) */}
        <div className="p-3 rounded-xl bg-neutral-50 border border-black/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-black shrink-0" />
            <div>
              <span className="font-bold text-black font-mono-code">KMU</span>
              <span className="text-[11px] text-neutral-500 block">Kumbakonam</span>
            </div>
          </div>

          <div className="flex flex-col items-center px-3">
            <span className="text-[10px] font-mono-code text-neutral-400">Direct Route</span>
            <div className="flex items-center gap-1 my-0.5">
              <span className="w-8 h-[1px] bg-black/20" />
              <ArrowRight className="w-3 h-3 text-black" />
              <span className="w-8 h-[1px] bg-black/20" />
            </div>
            <span className="text-[10px] font-mono-code text-neutral-500">Tomorrow</span>
          </div>

          <div className="flex items-center gap-2 text-right">
            <div>
              <span className="font-bold text-black font-mono-code">MS</span>
              <span className="text-[11px] text-neutral-500 block">Chennai Egmore</span>
            </div>
            <MapPin className="w-4 h-4 text-black shrink-0" />
          </div>
        </div>

        {activeTab === 'trains' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-500">
              <span>Hick's Law: Curated Departure Slots</span>
              <span>2 Trains Available</span>
            </div>

            {TRAINS.map((train) => {
              const isSelected = selectedTrain.id === train.id;
              return (
                <div
                  key={train.id}
                  onClick={() => handleSelectTrain(train)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-black bg-white shadow-md ring-1 ring-black'
                      : 'border-black/10 bg-white hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-xs sm:text-sm text-black">
                          {train.name}
                        </span>
                        <span className="text-[10px] font-mono-code text-neutral-500 bg-black/5 px-1.5 py-0.5 rounded">
                          #{train.number}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{train.departure} &bull; {train.duration} journey &bull; {train.arrival}</span>
                      </span>
                    </div>

                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-mono-code font-bold">
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Class Chips (Miller's Law: 3 grouped chunks) */}
                  <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-black/5">
                    {train.classes.map((cls) => (
                      <button
                        key={cls.code}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          setSelectedTrain(train);
                          setSelectedClass(cls.code);
                        }}
                        className={`p-2 rounded-lg text-left text-[11px] border transition-all ${
                          isSelected && selectedClass === cls.code
                            ? 'bg-black text-white border-black font-semibold'
                            : 'bg-neutral-50 border-black/10 text-neutral-700 hover:border-black/30'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono-code text-[10px]">
                          <span>{cls.code}</span>
                          <span className={isSelected && selectedClass === cls.code ? 'text-white' : 'text-neutral-900 font-bold'}>
                            ₹{cls.price}
                          </span>
                        </div>
                        <span className="text-[9px] block opacity-80 mt-0.5">
                          {cls.seats} Available
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="pt-1 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-mono-code">
                Selected: <strong className="text-black">{selectedTrain.name} ({selectedClass})</strong> &bull; ₹{selectedClassInfo.price}
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('seats');
                }}
                className="px-4 py-2 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all shadow-sm"
              >
                Choose Seat &rarr;
              </button>
            </div>
          </div>
        )}

        {activeTab === 'seats' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-500">
              <span>Coach S2 &bull; Interactive Berths</span>
              <span>Seat Selected: #{selectedSeat}</span>
            </div>

            {/* Coach Berth Layout */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-black/10">
              <div className="text-[10px] font-mono-code text-center text-neutral-400 mb-3 uppercase tracking-wider">
                &larr; Engine Direction &bull; Window Side &larr;
              </div>

              <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto">
                {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32].map((seatNum) => {
                  const isSelected = selectedSeat === seatNum;
                  const isOccupied = seatNum === 22 || seatNum === 28 || seatNum === 29;

                  return (
                    <button
                      key={seatNum}
                      disabled={isOccupied}
                      onClick={() => {
                        playClickSound();
                        setSelectedSeat(seatNum);
                      }}
                      className={`h-10 rounded-lg text-xs font-mono-code flex flex-col items-center justify-center transition-all ${
                        isOccupied
                          ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-black text-white font-bold ring-2 ring-black scale-105 shadow-sm'
                          : 'bg-white border border-black/15 text-neutral-800 hover:border-black'
                      }`}
                    >
                      <Armchair className="w-3 h-3 mb-0.5" />
                      <span className="text-[10px]">{seatNum}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono-code text-neutral-500 mt-4 pt-3 border-t border-black/5">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-black inline-block" />
                  <span>Selected (#{selectedSeat})</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-white border border-black/20 inline-block" />
                  <span>Available</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-neutral-200 inline-block" />
                  <span>Reserved</span>
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-500 block font-mono-code">Total Fare</span>
                <span className="font-display font-extrabold text-base text-black">
                  ₹{selectedClassInfo.price}
                </span>
              </div>

              <button
                onClick={handleBook}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Confirm Passenger Berth</span>
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ticket' && (
          <div className="p-4 rounded-xl bg-neutral-50 border border-black/10 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-black">
                    E-Ticket Confirmed
                  </h4>
                  <span className="text-[10px] font-mono-code text-neutral-500">
                    PNR: 4218-9904-21 &bull; Status: CNF
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono-code font-bold text-black">
                ₹{selectedClassInfo.price}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-black/5">
                <span className="text-[10px] font-mono-code text-neutral-400 block">Train</span>
                <span className="font-bold text-black text-[11px]">{selectedTrain.name} (#{selectedTrain.number})</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-black/5">
                <span className="text-[10px] font-mono-code text-neutral-400 block">Berth Allocation</span>
                <span className="font-bold text-black text-[11px]">Coach S2 &bull; Berth {selectedSeat} (Window)</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-black/5 text-[11px] text-neutral-600 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-black shrink-0" />
              <span>Designed with Jakob's Law: 3-step checkout reduces mobile booking friction by 40%.</span>
            </div>

            <button
              onClick={() => {
                playClickSound();
                setIsBooked(false);
                setActiveTab('trains');
              }}
              className="w-full py-2 rounded-lg text-xs font-mono-code text-neutral-600 hover:text-black border border-black/10 hover:border-black transition-colors"
            >
              Reset Booking Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
