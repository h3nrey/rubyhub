/**
 * Base pagination request interface
 * Used for paginated API requests
 */
export interface PaginationRequest {
  page: number;
  per_page: number;
}

/**
 * Base pagination response interface
 * Used for paginated API responses
 */
export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

/**
 * Base filter request interface
 * Extended by specific filter types
 */
export interface BaseFilterRequest extends PaginationRequest {
  search?: string;
}
