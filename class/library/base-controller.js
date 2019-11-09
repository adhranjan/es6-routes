class BaseController {

    /**
     * Parse each object in the array to JSON
     * @param {array} arrayOfObject
     * @returns {array} Each item in array will be parsed to JSON
     */

    static parseJsonArray(arrayOfObject) {
        let array = [];
        for (let i in arrayOfObject) {
            try {
                if (arrayOfObject.hasOwnProperty(i)) {
                    array[i] = JSON.parse(arrayOfObject[i])
                }
            } catch (e) {
                array[i] = (arrayOfObject[i])
            }
        }
        return array;
    }
}

module.exports = BaseController;
