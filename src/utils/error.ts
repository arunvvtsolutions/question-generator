import { NextResponse } from "next/server";

// Base AppError class
class AppError extends Error {
  status: number;
  errorCode: string;

  constructor(message: string, status: number, errorCode: string) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 400 - Bad Request
class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400, "BAD_REQUEST");
  }
}

// 401 - Unauthorized
class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized: Authentication required") {
    super(message, 401, "UNAUTHORIZED");
  }
}

// 403 - Forbidden
class ForbiddenError extends AppError {
  constructor(message = "Forbidden: You do not have permission to perform this action") {
    super(message, 403, "FORBIDDEN");
  }
}

// 404 - Not Found
class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404, "NOT_FOUND");
  }
}

// 405 - Method Not Allowed
class MethodNotAllowedError extends AppError {
  constructor(message = "Method Not Allowed") {
    super(message, 405, "METHOD_NOT_ALLOWED");
  }
}

// 408 - Request Timeout
class RequestTimeoutError extends AppError {
  constructor(message = "Request Timeout") {
    super(message, 408, "REQUEST_TIMEOUT");
  }
}

// 409 - Conflict
class ConflictError extends AppError {
  constructor(message = "Resource conflict detected") {
    super(message, 409, "CONFLICT");
  }
}

// 422 - Unprocessable Entity
class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422, "UNPROCESSABLE_ENTITY");
  }
}

// 500 - Internal Server Error
class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500, "INTERNAL_SERVER_ERROR");
  }
}

// 502 - Bad Gateway
class BadGatewayError extends AppError {
  constructor(message = "Bad Gateway") {
    super(message, 502, "BAD_GATEWAY");
  }
}

// 503 - Service Unavailable
class ServiceUnavailableError extends AppError {
  constructor(message = "Service Unavailable") {
    super(message, 503, "SERVICE_UNAVAILABLE");
  }
}

export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  RequestTimeoutError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError,
  BadGatewayError,
  ServiceUnavailableError,
};

// Error Handler Function
export const errorHandler = (error: any) => {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message, errorCode: error.errorCode }, { status: error.status });
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
