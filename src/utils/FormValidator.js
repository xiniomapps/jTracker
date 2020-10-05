//@flow
import validate from 'validate.js';
export type ValidationErrors = {...}
export type ValidationErrorFlags = {...};
export type ValidationConstraints = {...};
export type ValidationData = {...};

/**
 Form validation
 * @class
 * @name FormValidator
 */
export class FormValidator {
    errors: ValidationErrors;
    constraints: ValidationConstraints;

    /**
     * @constructs FormValidator
     */
    constructor(){
        this.errors = {};
        this.constraints = {};
    }

    /**
     * Validates data against field constraints
     * @param {ValidationData} data - Current data in form (state)
     * @param {ValidationConstraints} constraints - Constraints
     * @memberof FormValidator
     */
    validate(data: ValidationData, constraints: ValidationConstraints): boolean {
        this.constraints = constraints;
        this.errors = validate(data, constraints, {format: 'grouped', });
        if (!this.errors){
            return true;
        }
        return false;
    }

    /**
     * returns the list of fields with errors and descriptions
     * @returns {ValidationErrors} List of errors
     * @memberof FormValidator
     */
    getErrors(): ValidationErrors {
        return this.errors;
    }

    /**
     * Returns the error flags for each field
     * True means the field has error, false otherwise
     * @returns {ValidationErrorFlags} List of error flags.
     * @memberof FormValidator
     */
    getFieldsErrorFlags(): ValidationErrorFlags {
        let fields = {};
        for (let field in this.constraints){
            fields[field] = field in this.errors ? true : false;
        }
        return fields;
    }

}
