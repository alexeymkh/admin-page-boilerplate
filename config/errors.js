module.exports = {
    // common http errors
    internalServerError: createError(500, 'Internal server error.'),
    notFound: createError(404, 'Not found.'),
    forbidden: createError(403, 'Forbidden.'),
    authFailed: createError(401, 'Authentication failed. Wrong email or password.'),
    badRequest: (additional) => { return createError(400, 'Bad request.', additional) }
}

function createError (status, message, additional) {
    let error = new Error(message);
    error.status = status;
    additional ? error.additional = additional : null;
    return error;
}