import { useState } from 'react';
import { Heart, MessageCircle, CheckCircle } from 'lucide-react';

type MoodScore = 1 | 2 | 3 | 4 | 5;

type StudentMentalCheckInCardProps = {
  date: string;
  currentValue?: MoodScore;
  note?: string;
  isSubmitted: boolean;
  onSubmit: (mood: MoodScore, note?: string) => void;
};

const MOODS: { value: MoodScore; label: string; emoji: string; color: string }[] = [
  { value: 1, label: 'Very bad', emoji: '😢', color: 'from-red-500 to-pink-500' },
  { value: 2, label: 'Bad', emoji: '🙁', color: 'from-orange-500 to-red-500' },
  { value: 3, label: 'Okay', emoji: '😐', color: 'from-yellow-500 to-orange-500' },
  { value: 4, label: 'Good', emoji: '🙂', color: 'from-green-500 to-emerald-500' },
  { value: 5, label: 'Great', emoji: '😄', color: 'from-emerald-500 to-cyan-500' },
];

export function StudentMentalCheckInCard(props: StudentMentalCheckInCardProps) {
  const [selected, setSelected] = useState<MoodScore | undefined>(props.currentValue);
  const [note, setNote] = useState(props.note ?? '');

  const handleSubmit = () => {
    if (!selected) return;
    props.onSubmit(selected, note.trim() || undefined);
  };

  const selectedMood = MOODS.find(m => m.value === selected);

  return (
    <div className="w-full rounded-3xl border-2 border-cyan-400 bg-gradient-to-br from-sky-900 via-slate-900 to-cyan-900 p-6 shadow-xl text-slate-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">How are you feeling today?</h2>
            <p className="text-xs text-cyan-100 mt-1">
              🔒 Shared with your co-op teacher, not employers.
            </p>
          </div>
        </div>
        <span className="text-xs text-cyan-100 bg-cyan-500/20 px-3 py-1 rounded-full">
          {props.date}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {MOODS.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setSelected(m.value)}
            disabled={props.isSubmitted}
            className={
              'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ' +
              (selected === m.value
                ? `border-cyan-300 bg-gradient-to-br ${m.color} shadow-lg scale-105`
                : 'border-slate-700 bg-slate-900/60 hover:border-cyan-300/60 hover:bg-slate-800/80') +
              (props.isSubmitted ? ' cursor-not-allowed opacity-60' : ' cursor-pointer')
            }
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className={`text-xs font-bold text-center ${selected === m.value ? 'text-white' : 'text-slate-300'}`}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mb-4 p-4 bg-slate-800/60 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-cyan-300" />
            <label className="text-sm font-bold text-cyan-100">
              Want to share anything about today? (optional)
            </label>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={props.isSubmitted}
            rows={3}
            className="w-full rounded-xl border-2 border-slate-600 bg-slate-950/60 px-4 py-3 text-sm text-slate-50 placeholder-slate-400 focus:border-cyan-400 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            placeholder="You can share wins, worries, or anything else on your mind. This helps your teacher support you better."
          />
          <p className="text-xs text-slate-400 mt-2">
            Your thoughts are confidential and used only to support your well-being.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selected || props.isSubmitted}
        className={
          'w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold shadow-md transition-all ' +
          (props.isSubmitted
            ? 'bg-emerald-500/30 text-emerald-100 cursor-default'
            : selected
            ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-sky-950 hover:shadow-xl hover:scale-105'
            : 'bg-slate-700 text-slate-400 cursor-not-allowed')
        }
      >
        {props.isSubmitted ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Check-in submitted
          </>
        ) : (
          'Submit check-in'
        )}
      </button>

      {props.isSubmitted && selectedMood && (
        <div className="mt-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 rounded-2xl p-4">
          <p className="text-sm text-emerald-300 text-center">
            Thanks for sharing! Your teacher can see you're feeling{' '}
            <span className="font-bold">{selectedMood.label}</span> today {selectedMood.emoji}
          </p>
        </div>
      )}
    </div>
  );
}
