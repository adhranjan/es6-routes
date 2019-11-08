let BaseController = require('./base-controller')
let q = require('q');
let JaySchema = require("jayschema");
var js = new JaySchema();


class Controller extends BaseController {
    validateSchema(schema, data) {
        let deferred = q.defer();
        js.validate(data, schema, function (errs) {
            if (errs) {
                deferred.reject(errs[0]);
            }
            deferred.resolve(data);
        });
        return deferred.promise;
    };


// function Controller(actions, options) {
//     if (typeof options === "undefined") {
//         options = {};
//     }
//
//     var js = new JaySchema();
//
//     js.addFormat("time2", function (time) {
//         if (time.length === 5) {
//             var timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
//             if (timeRegex.test(time)) {
//                 return null;
//             }
//         }
//
//         if (time.length === 8) {
//             var timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
//             if (timeRegex.test(time)) {
//                 return null;
//             }
//         }
//         return "Invalid Time";
//     });
//

//     var loadFileData = function (req, res, data) {
//         const deferred = q.defer();
//         if (!req.files) deferred.resolve(data);
//         else {
//             fileKeys = Object.keys(req.files);
//
//             fileKeys.forEach(key => {
//                 console.log(req.files[key]);
//                 if (req.files[key].mimetype === "application/json")
//                     req.files[key].decodedData = JSON.parse(
//                         req.files[key].data
//                     );
//                 else if (req.files[key].mimetype === "text/csv" || req.files[key].mimetype === "application/vnd.ms-excel") {
//                     req.files[key].decodedData = req.files[key].data.toString();
//
//                     // Parse CSV files to header and lines
//                     const lines = req.files[key].decodedData.split("\r\n");
//                     const headers = lines[0].split(",");
//                     let rows = [];
//                     for (let i = 1; i < lines.length - 1; i++) {
//                         rows.push(lines[i].split(","));
//                     }
//
//                     // Create a JSON file of csv data
//                     let fileJson = [];
//                     for (let i = 0; i < rows.length; i++) {
//                         if (rows[i].length !== headers.length) {
//                             deferred.reject(
//                                 formatter.rejectError(
//                                     400,
//                                     `Error at line ${i +
//                                     2}. Invalid number of arguments. Expected ${
//                                         headers.length
//                                     } Received ${rows[i].length}`
//                                 )
//                             );
//                             return deferred.promise;
//                         }
//                         let rowJson = {};
//                         for (let j = 0; j < rows[i].length; j++) {
//                             rowJson[headers[j]] = rows[i][j];
//                         }
//                         fileJson.push(rowJson);
//                     }
//                     req.files[key].decodedData = fileJson;
//                 }
//             });
//             deferred.resolve(data);
//         }
//         return deferred.promise;
//     };
//
//     var checkUserValidity = function (options, req, res, data) {
//         var deferred = q.defer();
//         let token;
//         try {
//             if (options.auth === undefined || options.auth === null) {
//                 options.auth = true;
//             }
//             if (options.auth) {
//                 if (
//                     !req.headers["authorization"] &&
//                     !req.headers["Authorization"]
//                 ) {
//                     logger().warn(`Header Missing: Token Header Missing`);
//                     deferred.reject(
//                         formatter.rejectError(417, "Token Header Missing")
//                     );
//                 } else {
//                     token = req.headers["authorization"]
//                         ? req.headers["authorization"]
//                         : req.headers["Authorization"];
//                 }
//
//                 if (process.env.FAKE_AUTH === "true") {
//                     userLib.setId(1);
//                     userLib.setRole("admin");
//                     checkPermission(
//                         options.permission ? options.permission : [],
//                         data
//                     ).then(data => {
//                         console.log({ step5: true })
//                         deferred.resolve(data);
//                     }).catch((e => {
//                         deferred.reject(
//                             formatter.rejectError(e.statusCode || 401, e.message, e)
//                         );
//                     }));
//                 } else {
//                     userLib
//                         .validateUser(token)
//                         .then(res => {
//                             userLib.setId(res.data.userId);
//                             userLib.setRole(res.data.role);
//                             // deferred.resolve(data);
//                             checkPermission(
//                                 options.permission ? options.permission : [],
//                                 data
//                             ).then(data => {
//                                 deferred.resolve(data);
//                             }).catch((e => {
//                                 deferred.reject(
//                                     formatter.rejectError(e.statusCode || 401, e.message, e)
//                                 );
//                             }));
//                         })
//                         .catch(e => {
//                             deferred.reject(
//                                 formatter.rejectError(e.statusCode || 401, e.message, e)
//                             );
//                         });
//                 }
//             } else {
//                 deferred.resolve(data);
//             }
//         } catch (error) {
//             return deferred.reject(
//                 formatter.rejectError(
//                     401,
//                     "User is not authorized to access this api",
//                     "This could be caused if user is not logged in or not verified"
//                 )
//             );
//         }
//
//         return deferred.promise;
//     };
//
//     var validateSchema = function (options, req, res, data) {
//         var deferred = q.defer();
//
//         // process.exit()
//         if (typeof options.schema !== "undefined") {
//             var schema = require("../" + options.schema);
//             // console.log(req);
//             data = {
//                 ...data,
//                 ...req.body
//             };
//             if (options.useFileDataAsPayload) {
//                 keys = Object.keys(req.files);
//                 keys.forEach(key => {
//                     if (req.files[key].decodedData)
//                         data[key] = req.files[key].decodedData;
//                 });
//             }
//             js.validate(data, schema, function (errs) {
//                 if (errs) {
//                     // console.log(errs);
//                     // res.status(406).send(errs[0]);
//                     return deferred.reject(
//                         formatter.rejectError(406, "Validation Error", errs[0])
//                     );
//                 }
//
//                 deferred.resolve(data);
//             });
//         } else {
//             data = {
//                 ...data,
//                 ...req.body
//             };
//             deferred.resolve(data);
//         }
//         // console.log("step 0");
//         return deferred.promise;
//     };
//
//     function Action(action, options) {
//         if (typeof options === "undefined") {
//             options = {};
//         }
//
//         if (typeof action !== "function") {
//             throw "Invalid Action: \n" + action;
//         }
//         var stack = [];
//
//         var UserAgent = function (req, res, next) {
//             var ua = req.headers["user-agent"],
//                 $ = {};
//
//             if (/mobile/i.test(ua)) $.Mobile = true;
//
//             if (/like Mac OS X/.test(ua)) {
//                 $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/
//                     .exec(ua)[2]
//                     .replace(/_/g, ".");
//                 $.iPhone = /iPhone/.test(ua);
//                 $.iPad = /iPad/.test(ua);
//             }
//
//             if (/Android/.test(ua))
//                 $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
//
//             if (/webOS\//.test(ua))
//                 $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
//
//             if (/(Intel|PPC) Mac OS X/.test(ua))
//                 $.Mac =
//                     /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/
//                         .exec(ua)[2]
//                         .replace(/_/g, ".") || true;
//
//             if (/Windows NT/.test(ua))
//                 $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
//             logger().info(`Uger Agent: ${JSON.stringify($)}`);
//             //Set your user agent here
//         };
//
//         var apiAction = function (req, res, next) {
//             UserAgent(req, res, next);
//
//             q(loadParams(options, req, res, next))
//                 .then(function (data) {
//                     console.log({ step1: data })
//                     return checkUserValidity(options, req, res, data);
//                 })
//                 // .then((data) => {
//                 //     return checkPermission(options.permission ? options.permission : [], data);
//                 // })
//                 .then(function (data) {
//                     console.log({ step2: data })
//                     return loadFileData(req, res, data);
//                 })
//                 .then(function (data) {
//                     console.log({ step3: data })
//                     return validateSchema(options, req, res, data);
//                 })
//                 .then(function (data) {
//                     console.log({ step4: data })
//                     logger().info(JSON.stringify(data))
//                     return action.apply(this, [data]);
//                 })
//                 .then(ResponseHandler(res))
//                 .catch(ErrorHandler(next));
//         };
//
//         stack.push(apiAction);
//
//         return stack;
//     }
//
//     var ControllerActions = {};
//     for (var i in actions) {
//         ControllerActions[i] = Action(actions[i], options[i]);
//     }
//
//     return ControllerActions;
// }

}

module.exports = Controller;
