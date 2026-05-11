export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  tracking_type: 'boolean' | 'count' | 'duration';
  metadata?: Record<string, unknown>;
  created_at: Date;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  entry_date: string;
  value: number;
  note?: string;
  updated_at: Date;
}
