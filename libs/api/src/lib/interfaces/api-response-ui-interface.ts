export interface StoreApiResponse {
  success: boolean;
  response: SuccessResponse | ErrorResponse;
};

type SuccessResponse = {
  data: any;
};

type ErrorResponse = {
  error: any;
};
