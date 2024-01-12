export interface ApiResponse<T> {
    code: string;
    payload: T;
    message: string;
}
