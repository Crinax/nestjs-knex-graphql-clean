export type TaskHistoryCreateResult = {
  id: number;
  historyType: string;
  createdAt: Date;
  fromState: string;
  toState: string;
  taskId: number;
};
