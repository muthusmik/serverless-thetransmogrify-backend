module.exports = (req, res, next) => {
    const trimObj = (obj) => {
        if ((!Array.isArray(obj) && typeof obj !== 'object') || obj === null) return obj;
        return Object.keys(obj).reduce(
            (acc, key) => {
                acc[key.toString().trim()] =
                    typeof obj[key.toString()] === 'string' ? obj[key.toString()].trim() : trimObj(obj[key.toString()]);
                return acc;
            },
            Array.isArray(obj) ? [] : {}
        );
    };

    req.body = trimObj(req.body);
    next();
};
