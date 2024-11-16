export type TaskHistoryLoadResponse = {
  task_history_id: number;
  type: string;
  task_id: number;
  task_name: string;
  task_created_at: Date;
  task_updated_at: Date;
  created_at: Date;
  from_state: string;
  to_state: string;
};
