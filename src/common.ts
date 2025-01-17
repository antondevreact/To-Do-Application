export const ACCESS_TOKEN_MAX_AGE = 15 * 60;
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

export enum STATUS {
  SUCCESS = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  UNAUTHORIZED,
}

export enum MESSAGES {
  TODO_CREATED = "Todo created",
  TODO_FETCHED = "Todos fetched",
  TODO_DELETED = "Todo deleted",
  TODO_UPDATED = "Todo updated",
  TODO_NOT_FOUND = "Todo not found",
  FAILED_TO_CREATE = "Failed to create todo",
  FAILED_TO_FETCH = "Failed to fetch todos",
  FAILED_TO_DELETE = "Failed to delete todo",
  FAILED_TO_UPDATE = "Failed to update todo",
  UNAUTHORIZED = "Unauthorized user",
  ADD_TODO = "Add them now!",
  EMPTY_TODOS = "You don't have any scheduled tasks"
}

export enum TOAST_MESSAGES {
  ADD_SUCCESS = "Task successfully added!",
  ADD_ERROR = "Something went wrong when adding the task :(",
  DELETE_SUCCESS = "Task successfully deleted!",
  DELETE_ERROR = "Something went wrong when deleting the task :(",
  FETCH_ERROR = "Something went wrong when fetching tasks :(",
  AUTH_ERROR = "Something went wrong. Please try again!",
  REGISTER_ERROR = "Something went wrong. Please check the data you entered!",
}
