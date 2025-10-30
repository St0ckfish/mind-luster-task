export type ColumnType = "backlog" | "in-progress" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnType;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  column: ColumnType;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  column?: ColumnType;
}
