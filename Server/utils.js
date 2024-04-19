function createSuccessResult(data) {
  return {
    status: "success",
    data,
  };
}

function createErrorResult(error) {
  return {
    status: "error",
    error,
  };
}

function createResult(error, data) {
  if (error) {
    return {
      status: "error",
      error,
    };
  } else {
    return {
      status: "success",
      data,
    };
  }
}

module.exports = { createResult,createSuccessResult,createErrorResult };
