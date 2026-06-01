export interface ApiResponse<T> {
  resultType: "SUCCESS";
  error: null;
  data: T;
}
export const success = <T>(data: T): ApiResponse<T> => ({
  resultType: "SUCCESS",
  error: null,
  data,
});

export interface ErrorResponse {
  resultType: "FAIL";
  error: {
    errorCode: string;
    message: string;
    data: unknown | null;
  };
  data: null;
}