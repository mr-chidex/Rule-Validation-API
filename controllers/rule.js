module.exports = {
    getData: (req, res, next) => {
        res.json({
            message: "My Rule-validation API",
            status: "success",
            data: {
                name: "Chimobi Mbah",
                github: "@mr-chidex",
                email: "mbahchiboy2@gmail.com",
                mobile: "08056301107",
                twitter: "@mr-chidex"
            }
        })
    },

    postValidationRule: (req, res, next) => {
        const { rule, data, ...invalid } = req.body

        //check if rule exist
        if (!rule) {
            return res.status(400).json({
                message: "rule is required.",
                status: "error",
                data: null
            })
        }

        //check rule type
        if (typeof rule === "number") {
            return res.status(400).json({
                message: "rule should be an object.",
                status: "error",
                data: null
            })
        }

        //since rule exist, destructure rule
        const { field, condition, condition_value } = rule;


        //check if field exist
        if (!field) {
            return res.status(400).json({
                message: "field is required.",
                status: "error",
                data: null
            })
        }

        //check if condition exist
        if (!condition) {
            return res.status(400).json({
                message: "condition is required.",
                status: "error",
                data: null
            })
        }

        //check if condition exist
        if (!condition_value) {
            return res.status(400).json({
                message: "condition_value is required.",
                status: "error",
                data: null
            })
        }

        // check if data exist
        if (!data) {
            return res.status(400).json({
                message: "data is required.",
                status: "error",
                data: null
            })
        }

        //check data type
        if (typeof data === "number") {
            return res.status(400).json({
                message: "data should be an object, array or string.",
                status: "error",
                data: null
            })
        }

        // check If an invalid JSON payload is passed to your API
        if (Object.keys(invalid).length !== 0) {
            return res.status(400).json({
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null
            })
        }

        // check If the field specified in the rule object is missing from the data passed
        if (!data[field]) {
            return res.status(400).json({
                message: `field ${field} is missing from data.`,
                status: "error",
                data: null
            })
        }

        //validate rule
        switch (condition) {
            case "eq":
                if (data[field] === condition_value) {
                    return res.json({
                        message: `field ${field} successfully validated.`,
                        status: "success",
                        data: {
                            validation: {
                                error: false,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: `field ${field} failed validation.`,
                        status: "error",
                        data: {
                            validation: {
                                error: true,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                }
            case "neq":
                if (data[field] !== condition_value) {
                    return res.json({
                        message: `field ${field} successfully validated.`,
                        status: "success",
                        data: {
                            validation: {
                                error: false,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: `field ${field} failed validation.`,
                        status: "error",
                        data: {
                            validation: {
                                error: true,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                }
            case "gt":
                if (data[field] > condition_value) {
                    return res.json({
                        message: `field ${field} successfully validated.`,
                        status: "success",
                        data: {
                            validation: {
                                error: false,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: `field ${field} failed validation.`,
                        status: "error",
                        data: {
                            validation: {
                                error: true,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                }
            case "gte":
                if (data[field] >= condition_value) {
                    return res.json({
                        message: `field ${field} successfully validated.`,
                        status: "success",
                        data: {
                            validation: {
                                error: false,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                } else {
                    return res.status(400).json({
                        message: `field ${field} failed validation.`,
                        status: "error",
                        data: {
                            validation: {
                                error: true,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                }
            case "contains":
                const fieldValue = `${data[field]}`;
                const conditionValue = `${condition_value}`;
                const isContain = fieldValue.includes(conditionValue)

                if (isContain) {
                    return res.json({
                        message: `field ${field} successfully validated.`,
                        status: "success",
                        data: {
                            validation: {
                                error: false,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                }
                else {
                    return res.status(400).json({
                        message: `field ${field} failed validation.`,
                        status: "error",
                        data: {
                            validation: {
                                error: true,
                                field: field,
                                field_value: data[field],
                                condition: condition,
                                condition_value: condition_value
                            }
                        }
                    })
                }

            default:
                return res.status(400).json({
                    message: `field ${field} failed validation.`,
                    status: "error",
                    data: {
                        validation: {
                            error: true,
                            field: field,
                            field_value: data[field],
                            condition: condition,
                            condition_value: condition_value
                        }
                    }
                })
        }

    }
}