export type TimerPhase = 'Work' | 'Rest'

export interface Timer {
    type: string;
    settings: {
      currentPhase?: TimerPhase;
      totalSeconds?: number;
      rounds?: number;
      workSeconds?: number;
      restSeconds?: number;
    };
    state: 'not_started' | 'running' | 'completed';
}