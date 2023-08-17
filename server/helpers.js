function getOffset(currentPage =1, itemsPerPage) {
    return (currentPage - 1) * itemsPerPage;
}

function emptyOrRows(rows) {
    if (!rows) return [];

    return rows;
}

function success(data, message='Your request was executed successfully!') {
    return {
        success: true,
        message,
        data
    }
}

function failure(data, message='There was an error executing your request.') {
    return {
        success: false,
        message,
        data
    }
}

module.exports = {
    getOffset,
    emptyOrRows,
    success,
    failure,
}