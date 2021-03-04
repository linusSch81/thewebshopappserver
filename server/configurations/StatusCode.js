/** https://en.wikipedia.org/wiki/List_of_HTTP_status_codes */

/** 2xx success */
const OK_200 = 200;
const CREATED_201 = 201;

/** 3xx redirection */

/** 4xx client errors (Front end) */
const BAD_REQUEST_400 = 400;
const UNAUTHORIZED_401 = 401;
const FORBIDDEN_403 = 403;
const NOT_FOUND_404 = 404;
const METHOD_NOT_ALLOWED_405 = 405;
const CONFLICT_409 = 409;

/** 5xx server errors */
const INTERNAL_SERVER_ERROR_500 = 500;

export default {
	OK_200,
	CREATED_201,
	BAD_REQUEST_400,
	UNAUTHORIZED_401,
	FORBIDDEN_403,
	NOT_FOUND_404,
	METHOD_NOT_ALLOWED_405,
	CONFLICT_409,
	INTERNAL_SERVER_ERROR_500
};
