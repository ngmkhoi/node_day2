const validate = (schema) => {
    return (req, res, next) => {
        const data = req.body;

        for (let field in schema) {
            const rules = schema[field];
            const value = data[field];

            if (value !== undefined && value !== null && rules.type && typeof value !== rules.type) {
                return res.error(`${field} must be a ${rules.type}`, 422);
            }

            if (rules.required) {
                if (value === undefined || value === null) {
                    return res.error(`${field} is required`, 422);
                }
                if (typeof value === 'string' && value.trim() === '') {
                    return res.error(`${field} is required`, 422);
                }
            }

            if (value && rules.minLength && typeof value === 'string' && value. length < rules.minLength) {
                return res.error(`${field} must be at least ${rules.minLength} characters`, 422);
            }
        }

        next();
    }
}

module.exports = { validate };
