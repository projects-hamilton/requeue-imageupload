module.exports.validater = (search, data) => {
    for (let i = 0; i < search.length; i++) {
        if (
            data[search[i]] == "" ||
            data[search[i]] == undefined ||
            data[search[i]] == null
        ) {
            return [false, search[i]];
        }
    }
    return [true, ""];
};

module.exports.HandleRes = (res, status = 500, message = "Something went wrong", data = []) => {
    res.status(status).json({ status, message, data });
}