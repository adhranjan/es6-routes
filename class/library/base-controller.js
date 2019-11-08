class BaseController {

    /**
     * Parse each object in the array to JSON
     * @param {array} arrayOfObject
     * @returns {array} Each item in array will be parsed to JSON
     */

    parseJsonArray(arrayOfObject) {
        for (let i in arrayOfObject) {
            try {
                if (arrayOfObject.hasOwnProperty(i)) {
                    arrayOfObject[i] = JSON.parse(arrayOfObject[i])
                }
            } catch (e) {
                throw new Error(e)
            }
        }
        return arrayOfObject;
    }
}

module.exports = BaseController;
