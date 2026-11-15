import tryCatch from "../middlewares/tryCatch.js";
import sanitize from 'mongo-sanitize'
import { registerUserValidation } from "../validations/user.validation.js";

export const registerUser = tryCatch(
    async (req, res, next) => {

        const sanitizedBody = sanitize(req.body);
        const validation = registerUserValidation.safeParse(sanitizedBody);

        if(!validation.success) {
            const flattened = validation.error.flatten();
            return res.status(400).json({
                message: flattened.fieldErrors,
                formErrors: flattened.formErrors
            })
        }

        const {name, email, password} = validation.data;


        return res.status(201).json({
            message: validation.data
        })

    }
)