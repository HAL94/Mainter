export default interface AppResponse<T> {
  success?: boolean;
  data?: T;
  error?: any;
  message?: string;
}
