import validate from 'validate.js';

/**
 Form validation
 * @class
 * @name FormValidator
 */
export default class FormValidator {
    /**
     * @constructs FormValidator
     */
    constructor(){
        this.errors = {};
        this.constraints = {};
    }

    /**
     * Validates data against field constraints
     * @param {Object} data - Current data in form (state)
     * @memberof FormValidator
     */
    validate(data, constraints){
        this.constraints = constraints;
        this.errors = validate(data, constraints, {format: 'grouped', });
        if (!this.errors){
            return true;
        }
        return false;
    }

    /**
     * returns the list of fields with errors and descriptions
     * @returns {Object} List of errors
     * @memberof FormValidator
     */
    getErrors(){
        return this.errors;
    }

    /**
     * Returns the error flags for each field
     * True means the field has error, false otherwise
     * @returns {Object} List of error flags.
     * @memberof FormValidator
     */
    getFieldsErrorFlags(){
        let fields = {};
        for (let field in this.constraints){
            fields[field] = field in this.errors ? true : false;
        }
        return fields;
    }

}
