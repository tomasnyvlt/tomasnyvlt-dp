interface Props {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: any;
  headers?: any;
  nonJsonResponse?: boolean;
  signal?: AbortSignal;
}

export interface ErrorType {
  message: string;
  errors: any;
  warnings: any;
  status: number;
  originalError: any;
}

const dpApiFetch = async <T = any>({
  method,
  url,
  body,
  headers,
  nonJsonResponse = false,
  signal,
}: Props): Promise<T> => {
  const localHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const response = await fetch(url, {
    method,
    headers: localHeaders,
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const error = await response.json();

    // eslint-disable-next-line no-throw-literal,@typescript-eslint/no-throw-literal
    throw {
      message: error.message,
      errors: error.errors,
      warnings: error.warnings,
      status: response.status,
      originalError: error,
    } as ErrorType;
  }

  if (nonJsonResponse) {
    return response as T;
  }

  const jsonResponse = await response.json();

  return jsonResponse;
};

export default dpApiFetch;
