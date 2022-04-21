"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolumePersistence = exports.MachineType = exports.Encoding = void 0;
/**
 * Type of Encoding
 */
var Encoding;
(function (Encoding) {
    Encoding["plain"] = "plain";
    Encoding["zip"] = "zip";
    Encoding["squashfs"] = "squashfs";
})(Encoding = exports.Encoding || (exports.Encoding = {}));
/**
 * Type of execution
 */
var MachineType;
(function (MachineType) {
    MachineType["vm_function"] = "vm-function";
})(MachineType = exports.MachineType || (exports.MachineType = {}));
var VolumePersistence;
(function (VolumePersistence) {
    VolumePersistence["host"] = "host";
    VolumePersistence["store"] = "store";
})(VolumePersistence = exports.VolumePersistence || (exports.VolumePersistence = {}));
