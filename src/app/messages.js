/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.bikemoves = (function() {

    /**
     * Namespace bikemoves.
     * @exports bikemoves
     * @namespace
     */
    var bikemoves = {};

    /**
     * LocationType enum.
     * @name LocationType
     * @memberof bikemoves
     * @enum {number}
     * @property {number} NOT_SPECIFIED=0 NOT_SPECIFIED value
     * @property {number} HOME=1 HOME value
     * @property {number} WORK=2 WORK value
     * @property {number} K12_SCHOOL=3 K12_SCHOOL value
     * @property {number} UNIVERSITY=4 UNIVERSITY value
     * @property {number} SHOPPING=5 SHOPPING value
     * @property {number} OTHER=6 OTHER value
     */
    bikemoves.LocationType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values["NOT_SPECIFIED"] = 0;
        values["HOME"] = 1;
        values["WORK"] = 2;
        values["K12_SCHOOL"] = 3;
        values["UNIVERSITY"] = 4;
        values["SHOPPING"] = 5;
        values["OTHER"] = 6;
        return values;
    })();

    /**
     * ActivityType enum.
     * @name ActivityType
     * @memberof bikemoves
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} STILL=1 STILL value
     * @property {number} FOOT=2 FOOT value
     * @property {number} WALK=3 WALK value
     * @property {number} RUN=4 RUN value
     * @property {number} VEHICLE=5 VEHICLE value
     * @property {number} BICYCLE=6 BICYCLE value
     */
    bikemoves.ActivityType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values["UNKNOWN"] = 0;
        values["STILL"] = 1;
        values["FOOT"] = 2;
        values["WALK"] = 3;
        values["RUN"] = 4;
        values["VEHICLE"] = 5;
        values["BICYCLE"] = 6;
        return values;
    })();

    /**
     * EventType enum.
     * @name EventType
     * @memberof bikemoves
     * @enum {number}
     * @property {number} LOCATION=0 LOCATION value
     * @property {number} MOTION=1 MOTION value
     * @property {number} GEOFENCE=2 GEOFENCE value
     * @property {number} HEARTBEAT=3 HEARTBEAT value
     * @property {number} PROVIDER=4 PROVIDER value
     */
    bikemoves.EventType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values["LOCATION"] = 0;
        values["MOTION"] = 1;
        values["GEOFENCE"] = 2;
        values["HEARTBEAT"] = 3;
        values["PROVIDER"] = 4;
        return values;
    })();

    /**
     * Gender enum.
     * @name Gender
     * @memberof bikemoves
     * @enum {number}
     * @property {number} NOT_SPECIFIED=0 NOT_SPECIFIED value
     * @property {number} MALE=1 MALE value
     * @property {number} FEMALE=2 FEMALE value
     * @property {number} OTHER=3 OTHER value
     */
    bikemoves.Gender = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values["NOT_SPECIFIED"] = 0;
        values["MALE"] = 1;
        values["FEMALE"] = 2;
        values["OTHER"] = 3;
        return values;
    })();

    /**
     * Age enum.
     * @name Age
     * @memberof bikemoves
     * @enum {number}
     * @property {number} NOT_SPECIFIED=0 NOT_SPECIFIED value
     * @property {number} AGE_UNDER_15=1 AGE_UNDER_15 value
     * @property {number} AGE_15_TO_19=2 AGE_15_TO_19 value
     * @property {number} AGE_20_TO_24=3 AGE_20_TO_24 value
     * @property {number} AGE_25_TO_34=4 AGE_25_TO_34 value
     * @property {number} AGE_35_TO_44=5 AGE_35_TO_44 value
     * @property {number} AGE_45_TO_54=6 AGE_45_TO_54 value
     * @property {number} AGE_55_TO_64=7 AGE_55_TO_64 value
     * @property {number} AGE_65_TO_74=8 AGE_65_TO_74 value
     * @property {number} AGE_75_AND_OLDER=9 AGE_75_AND_OLDER value
     */
    bikemoves.Age = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values["NOT_SPECIFIED"] = 0;
        values["AGE_UNDER_15"] = 1;
        values["AGE_15_TO_19"] = 2;
        values["AGE_20_TO_24"] = 3;
        values["AGE_25_TO_34"] = 4;
        values["AGE_35_TO_44"] = 5;
        values["AGE_45_TO_54"] = 6;
        values["AGE_55_TO_64"] = 7;
        values["AGE_65_TO_74"] = 8;
        values["AGE_75_AND_OLDER"] = 9;
        return values;
    })();

    /**
     * ExperienceLevel enum.
     * @name ExperienceLevel
     * @memberof bikemoves
     * @enum {number}
     * @property {number} NOT_SPECIFIED=0 NOT_SPECIFIED value
     * @property {number} BEGINNER=1 BEGINNER value
     * @property {number} INTERMEDIATE=2 INTERMEDIATE value
     * @property {number} ADVANCED=3 ADVANCED value
     */
    bikemoves.ExperienceLevel = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values["NOT_SPECIFIED"] = 0;
        values["BEGINNER"] = 1;
        values["INTERMEDIATE"] = 2;
        values["ADVANCED"] = 3;
        return values;
    })();

    bikemoves.Location = (function() {

        /**
         * Constructs a new Location.
         * @exports bikemoves.Location
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Location(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * Location longitude.
         * @type {number|undefined}
         */
        Location.prototype.longitude = 0;

        /**
         * Location latitude.
         * @type {number|undefined}
         */
        Location.prototype.latitude = 0;

        /**
         * Location time.
         * @type {number|$protobuf.Long|undefined}
         */
        Location.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Location accuracy.
         * @type {number|undefined}
         */
        Location.prototype.accuracy = 0;

        /**
         * Location altitude.
         * @type {number|undefined}
         */
        Location.prototype.altitude = 0;

        /**
         * Location heading.
         * @type {number|undefined}
         */
        Location.prototype.heading = 0;

        /**
         * Location speed.
         * @type {number|undefined}
         */
        Location.prototype.speed = 0;

        /**
         * Location moving.
         * @type {boolean|undefined}
         */
        Location.prototype.moving = false;

        /**
         * Location event.
         * @type {number|undefined}
         */
        Location.prototype.event = 0;

        /**
         * Location activity.
         * @type {number|undefined}
         */
        Location.prototype.activity = 0;

        /**
         * Location confidence.
         * @type {number|undefined}
         */
        Location.prototype.confidence = 0;

        // Lazily resolved type references
        var $types = {
            8: "bikemoves.EventType",
            9: "bikemoves.ActivityType"
        }; $lazyTypes.push($types);

        /**
         * Creates a new Location instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.Location} Location instance
         */
        Location.create = function create(properties) {
            return new Location(properties);
        };

        /**
         * Encodes the specified Location message.
         * @param {bikemoves.Location|Object} message Location message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Location.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.longitude !== undefined && message.hasOwnProperty("longitude"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.longitude);
            if (message.latitude !== undefined && message.hasOwnProperty("latitude"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.latitude);
            if (message.time !== undefined && message.time !== null && message.hasOwnProperty("time"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
            if (message.accuracy !== undefined && message.hasOwnProperty("accuracy"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.accuracy);
            if (message.altitude !== undefined && message.hasOwnProperty("altitude"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.altitude);
            if (message.heading !== undefined && message.hasOwnProperty("heading"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.heading);
            if (message.speed !== undefined && message.hasOwnProperty("speed"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.speed);
            if (message.moving !== undefined && message.hasOwnProperty("moving"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.moving);
            if (message.event !== undefined && message.hasOwnProperty("event"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.event);
            if (message.activity !== undefined && message.hasOwnProperty("activity"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.activity);
            if (message.confidence !== undefined && message.hasOwnProperty("confidence"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.confidence);
            return writer;
        };

        /**
         * Encodes the specified Location message, length delimited.
         * @param {bikemoves.Location|Object} message Location message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Location.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Location} Location
         */
        Location.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bikemoves.Location();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.longitude = reader.double();
                    break;
                case 2:
                    message.latitude = reader.double();
                    break;
                case 3:
                    message.time = reader.uint64();
                    break;
                case 4:
                    message.accuracy = reader.double();
                    break;
                case 5:
                    message.altitude = reader.double();
                    break;
                case 6:
                    message.heading = reader.double();
                    break;
                case 7:
                    message.speed = reader.double();
                    break;
                case 8:
                    message.moving = reader.bool();
                    break;
                case 9:
                    message.event = reader.uint32();
                    break;
                case 10:
                    message.activity = reader.uint32();
                    break;
                case 11:
                    message.confidence = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Location message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Location} Location
         */
        Location.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Location message.
         * @param {bikemoves.Location|Object} message Location message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Location.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.longitude !== undefined)
                if (typeof message.longitude !== "number")
                    return "longitude: number expected";
            if (message.latitude !== undefined)
                if (typeof message.latitude !== "number")
                    return "latitude: number expected";
            if (message.time !== undefined)
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.accuracy !== undefined)
                if (typeof message.accuracy !== "number")
                    return "accuracy: number expected";
            if (message.altitude !== undefined)
                if (typeof message.altitude !== "number")
                    return "altitude: number expected";
            if (message.heading !== undefined)
                if (typeof message.heading !== "number")
                    return "heading: number expected";
            if (message.speed !== undefined)
                if (typeof message.speed !== "number")
                    return "speed: number expected";
            if (message.moving !== undefined)
                if (typeof message.moving !== "boolean")
                    return "moving: boolean expected";
            if (message.event !== undefined)
                switch (message.event) {
                default:
                    return "event: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.activity !== undefined)
                switch (message.activity) {
                default:
                    return "activity: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.confidence !== undefined)
                if (!$util.isInteger(message.confidence))
                    return "confidence: integer expected";
            return null;
        };

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Location} Location
         */
        Location.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.Location)
                return object;
            var message = new $root.bikemoves.Location();
            if (object.longitude !== undefined && object.longitude !== null)
                message.longitude = Number(object.longitude);
            if (object.latitude !== undefined && object.latitude !== null)
                message.latitude = Number(object.latitude);
            if (object.time !== undefined && object.time !== null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
            if (object.accuracy !== undefined && object.accuracy !== null)
                message.accuracy = Number(object.accuracy);
            if (object.altitude !== undefined && object.altitude !== null)
                message.altitude = Number(object.altitude);
            if (object.heading !== undefined && object.heading !== null)
                message.heading = Number(object.heading);
            if (object.speed !== undefined && object.speed !== null)
                message.speed = Number(object.speed);
            if (object.moving !== undefined && object.moving !== null)
                message.moving = Boolean(object.moving);
            switch (object.event) {
            case "LOCATION":
            case 0:
                message.event = 0;
                break;
            case "MOTION":
            case 1:
                message.event = 1;
                break;
            case "GEOFENCE":
            case 2:
                message.event = 2;
                break;
            case "HEARTBEAT":
            case 3:
                message.event = 3;
                break;
            case "PROVIDER":
            case 4:
                message.event = 4;
                break;
            }
            switch (object.activity) {
            case "UNKNOWN":
            case 0:
                message.activity = 0;
                break;
            case "STILL":
            case 1:
                message.activity = 1;
                break;
            case "FOOT":
            case 2:
                message.activity = 2;
                break;
            case "WALK":
            case 3:
                message.activity = 3;
                break;
            case "RUN":
            case 4:
                message.activity = 4;
                break;
            case "VEHICLE":
            case 5:
                message.activity = 5;
                break;
            case "BICYCLE":
            case 6:
                message.activity = 6;
                break;
            }
            if (object.confidence !== undefined && object.confidence !== null)
                message.confidence = object.confidence >>> 0;
            return message;
        };

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.Location.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Location} Location
         */
        Location.from = Location.fromObject;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param {bikemoves.Location} message Location
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Location.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.longitude = 0;
                object.latitude = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.accuracy = 0;
                object.altitude = 0;
                object.heading = 0;
                object.speed = 0;
                object.moving = false;
                object.event = options.enums === String ? "LOCATION" : 0;
                object.activity = options.enums === String ? "UNKNOWN" : 0;
                object.confidence = 0;
            }
            if (message.longitude !== undefined && message.longitude !== null && message.hasOwnProperty("longitude"))
                object.longitude = message.longitude;
            if (message.latitude !== undefined && message.latitude !== null && message.hasOwnProperty("latitude"))
                object.latitude = message.latitude;
            if (message.time !== undefined && message.time !== null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
            if (message.accuracy !== undefined && message.accuracy !== null && message.hasOwnProperty("accuracy"))
                object.accuracy = message.accuracy;
            if (message.altitude !== undefined && message.altitude !== null && message.hasOwnProperty("altitude"))
                object.altitude = message.altitude;
            if (message.heading !== undefined && message.heading !== null && message.hasOwnProperty("heading"))
                object.heading = message.heading;
            if (message.speed !== undefined && message.speed !== null && message.hasOwnProperty("speed"))
                object.speed = message.speed;
            if (message.moving !== undefined && message.moving !== null && message.hasOwnProperty("moving"))
                object.moving = message.moving;
            if (message.event !== undefined && message.event !== null && message.hasOwnProperty("event"))
                object.event = options.enums === String ? $types[8][message.event] : message.event;
            if (message.activity !== undefined && message.activity !== null && message.hasOwnProperty("activity"))
                object.activity = options.enums === String ? $types[9][message.activity] : message.activity;
            if (message.confidence !== undefined && message.confidence !== null && message.hasOwnProperty("confidence"))
                object.confidence = message.confidence;
            return object;
        };

        /**
         * Creates a plain object from this Location message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Location.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Location to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Location.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Location;
    })();

    bikemoves.Trip = (function() {

        /**
         * Constructs a new Trip.
         * @exports bikemoves.Trip
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Trip(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trip deviceUuid.
         * @type {string|undefined}
         */
        Trip.prototype.deviceUuid = "";

        /**
         * Trip locations.
         * @type {Array.<bikemoves.Location>|undefined}
         */
        Trip.prototype.locations = $util.emptyArray;

        /**
         * Trip startTime.
         * @type {number|$protobuf.Long|undefined}
         */
        Trip.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Trip endTime.
         * @type {number|$protobuf.Long|undefined}
         */
        Trip.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Trip desiredAccuracy.
         * @type {number|undefined}
         */
        Trip.prototype.desiredAccuracy = 0;

        /**
         * Trip transit.
         * @type {boolean|undefined}
         */
        Trip.prototype.transit = false;

        /**
         * Trip origin.
         * @type {number|undefined}
         */
        Trip.prototype.origin = 0;

        /**
         * Trip destination.
         * @type {number|undefined}
         */
        Trip.prototype.destination = 0;

        /**
         * Trip debug.
         * @type {boolean|undefined}
         */
        Trip.prototype.debug = false;

        /**
         * Trip appVersion.
         * @type {string|undefined}
         */
        Trip.prototype.appVersion = "";

        // Lazily resolved type references
        var $types = {
            1: "bikemoves.Location",
            6: "bikemoves.LocationType",
            7: "bikemoves.LocationType"
        }; $lazyTypes.push($types);

        /**
         * Creates a new Trip instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.Trip} Trip instance
         */
        Trip.create = function create(properties) {
            return new Trip(properties);
        };

        /**
         * Encodes the specified Trip message.
         * @param {bikemoves.Trip|Object} message Trip message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trip.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceUuid !== undefined && message.hasOwnProperty("deviceUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceUuid);
            if (message.locations !== undefined && message.hasOwnProperty("locations"))
                for (var i = 0; i < message.locations.length; ++i)
                    $types[1].encode(message.locations[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.startTime !== undefined && message.startTime !== null && message.hasOwnProperty("startTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.startTime);
            if (message.endTime !== undefined && message.endTime !== null && message.hasOwnProperty("endTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.endTime);
            if (message.desiredAccuracy !== undefined && message.hasOwnProperty("desiredAccuracy"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.desiredAccuracy);
            if (message.transit !== undefined && message.hasOwnProperty("transit"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.transit);
            if (message.origin !== undefined && message.hasOwnProperty("origin"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.origin);
            if (message.destination !== undefined && message.hasOwnProperty("destination"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.destination);
            if (message.debug !== undefined && message.hasOwnProperty("debug"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.debug);
            if (message.appVersion !== undefined && message.hasOwnProperty("appVersion"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.appVersion);
            return writer;
        };

        /**
         * Encodes the specified Trip message, length delimited.
         * @param {bikemoves.Trip|Object} message Trip message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trip.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Trip message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Trip} Trip
         */
        Trip.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bikemoves.Trip();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.deviceUuid = reader.string();
                    break;
                case 2:
                    if (!(message.locations && message.locations.length))
                        message.locations = [];
                    message.locations.push($types[1].decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.startTime = reader.uint64();
                    break;
                case 4:
                    message.endTime = reader.uint64();
                    break;
                case 5:
                    message.desiredAccuracy = reader.double();
                    break;
                case 6:
                    message.transit = reader.bool();
                    break;
                case 7:
                    message.origin = reader.uint32();
                    break;
                case 8:
                    message.destination = reader.uint32();
                    break;
                case 9:
                    message.debug = reader.bool();
                    break;
                case 10:
                    message.appVersion = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Trip message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Trip} Trip
         */
        Trip.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Trip message.
         * @param {bikemoves.Trip|Object} message Trip message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Trip.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceUuid !== undefined)
                if (!$util.isString(message.deviceUuid))
                    return "deviceUuid: string expected";
            if (message.locations !== undefined) {
                if (!Array.isArray(message.locations))
                    return "locations: array expected";
                for (var i = 0; i < message.locations.length; ++i) {
                    var error = $types[1].verify(message.locations[i]);
                    if (error)
                        return "locations." + error;
                }
            }
            if (message.startTime !== undefined)
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            if (message.endTime !== undefined)
                if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high)))
                    return "endTime: integer|Long expected";
            if (message.desiredAccuracy !== undefined)
                if (typeof message.desiredAccuracy !== "number")
                    return "desiredAccuracy: number expected";
            if (message.transit !== undefined)
                if (typeof message.transit !== "boolean")
                    return "transit: boolean expected";
            if (message.origin !== undefined)
                switch (message.origin) {
                default:
                    return "origin: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.destination !== undefined)
                switch (message.destination) {
                default:
                    return "destination: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            if (message.debug !== undefined)
                if (typeof message.debug !== "boolean")
                    return "debug: boolean expected";
            if (message.appVersion !== undefined)
                if (!$util.isString(message.appVersion))
                    return "appVersion: string expected";
            return null;
        };

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Trip} Trip
         */
        Trip.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.Trip)
                return object;
            var message = new $root.bikemoves.Trip();
            if (object.deviceUuid !== undefined && object.deviceUuid !== null)
                message.deviceUuid = String(object.deviceUuid);
            if (object.locations) {
                if (!Array.isArray(object.locations))
                    throw TypeError(".bikemoves.Trip.locations: array expected");
                message.locations = [];
                for (var i = 0; i < object.locations.length; ++i) {
                    if (typeof object.locations[i] !== "object")
                        throw TypeError(".bikemoves.Trip.locations: object expected");
                    message.locations[i] = $types[1].fromObject(object.locations[i]);
                }
            }
            if (object.startTime !== undefined && object.startTime !== null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = true;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber(true);
            if (object.endTime !== undefined && object.endTime !== null)
                if ($util.Long)
                    (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = true;
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber(true);
            if (object.desiredAccuracy !== undefined && object.desiredAccuracy !== null)
                message.desiredAccuracy = Number(object.desiredAccuracy);
            if (object.transit !== undefined && object.transit !== null)
                message.transit = Boolean(object.transit);
            switch (object.origin) {
            case "NOT_SPECIFIED":
            case 0:
                message.origin = 0;
                break;
            case "HOME":
            case 1:
                message.origin = 1;
                break;
            case "WORK":
            case 2:
                message.origin = 2;
                break;
            case "K12_SCHOOL":
            case 3:
                message.origin = 3;
                break;
            case "UNIVERSITY":
            case 4:
                message.origin = 4;
                break;
            case "SHOPPING":
            case 5:
                message.origin = 5;
                break;
            case "OTHER":
            case 6:
                message.origin = 6;
                break;
            }
            switch (object.destination) {
            case "NOT_SPECIFIED":
            case 0:
                message.destination = 0;
                break;
            case "HOME":
            case 1:
                message.destination = 1;
                break;
            case "WORK":
            case 2:
                message.destination = 2;
                break;
            case "K12_SCHOOL":
            case 3:
                message.destination = 3;
                break;
            case "UNIVERSITY":
            case 4:
                message.destination = 4;
                break;
            case "SHOPPING":
            case 5:
                message.destination = 5;
                break;
            case "OTHER":
            case 6:
                message.destination = 6;
                break;
            }
            if (object.debug !== undefined && object.debug !== null)
                message.debug = Boolean(object.debug);
            if (object.appVersion !== undefined && object.appVersion !== null)
                message.appVersion = String(object.appVersion);
            return message;
        };

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.Trip.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Trip} Trip
         */
        Trip.from = Trip.fromObject;

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @param {bikemoves.Trip} message Trip
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trip.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.locations = [];
            if (options.defaults) {
                object.deviceUuid = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTime = options.longs === String ? "0" : 0;
                object.desiredAccuracy = 0;
                object.transit = false;
                object.origin = options.enums === String ? "NOT_SPECIFIED" : 0;
                object.destination = options.enums === String ? "NOT_SPECIFIED" : 0;
                object.debug = false;
                object.appVersion = "";
            }
            if (message.deviceUuid !== undefined && message.deviceUuid !== null && message.hasOwnProperty("deviceUuid"))
                object.deviceUuid = message.deviceUuid;
            if (message.locations !== undefined && message.locations !== null && message.hasOwnProperty("locations")) {
                object.locations = [];
                for (var j = 0; j < message.locations.length; ++j)
                    object.locations[j] = $types[1].toObject(message.locations[j], options);
            }
            if (message.startTime !== undefined && message.startTime !== null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber(true) : message.startTime;
            if (message.endTime !== undefined && message.endTime !== null && message.hasOwnProperty("endTime"))
                if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber(true) : message.endTime;
            if (message.desiredAccuracy !== undefined && message.desiredAccuracy !== null && message.hasOwnProperty("desiredAccuracy"))
                object.desiredAccuracy = message.desiredAccuracy;
            if (message.transit !== undefined && message.transit !== null && message.hasOwnProperty("transit"))
                object.transit = message.transit;
            if (message.origin !== undefined && message.origin !== null && message.hasOwnProperty("origin"))
                object.origin = options.enums === String ? $types[6][message.origin] : message.origin;
            if (message.destination !== undefined && message.destination !== null && message.hasOwnProperty("destination"))
                object.destination = options.enums === String ? $types[7][message.destination] : message.destination;
            if (message.debug !== undefined && message.debug !== null && message.hasOwnProperty("debug"))
                object.debug = message.debug;
            if (message.appVersion !== undefined && message.appVersion !== null && message.hasOwnProperty("appVersion"))
                object.appVersion = message.appVersion;
            return object;
        };

        /**
         * Creates a plain object from this Trip message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trip.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Trip to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Trip.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Trip;
    })();

    bikemoves.Incident = (function() {

        /**
         * Constructs a new Incident.
         * @exports bikemoves.Incident
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Incident(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * Incident deviceUuid.
         * @type {string|undefined}
         */
        Incident.prototype.deviceUuid = "";

        /**
         * Incident comment.
         * @type {string|undefined}
         */
        Incident.prototype.comment = "";

        /**
         * Incident time.
         * @type {number|$protobuf.Long|undefined}
         */
        Incident.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Incident location.
         * @type {bikemoves.Location|undefined}
         */
        Incident.prototype.location = null;

        /**
         * Incident category.
         * @type {string|undefined}
         */
        Incident.prototype.category = "";

        // Lazily resolved type references
        var $types = {
            3: "bikemoves.Location"
        }; $lazyTypes.push($types);

        /**
         * Creates a new Incident instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.Incident} Incident instance
         */
        Incident.create = function create(properties) {
            return new Incident(properties);
        };

        /**
         * Encodes the specified Incident message.
         * @param {bikemoves.Incident|Object} message Incident message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Incident.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceUuid !== undefined && message.hasOwnProperty("deviceUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceUuid);
            if (message.comment !== undefined && message.hasOwnProperty("comment"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.comment);
            if (message.time !== undefined && message.time !== null && message.hasOwnProperty("time"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
            if (message.location && message.hasOwnProperty("location"))
                $types[3].encode(message.location, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.category !== undefined && message.hasOwnProperty("category"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.category);
            return writer;
        };

        /**
         * Encodes the specified Incident message, length delimited.
         * @param {bikemoves.Incident|Object} message Incident message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Incident.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Incident message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Incident} Incident
         */
        Incident.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bikemoves.Incident();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.deviceUuid = reader.string();
                    break;
                case 2:
                    message.comment = reader.string();
                    break;
                case 3:
                    message.time = reader.uint64();
                    break;
                case 4:
                    message.location = $types[3].decode(reader, reader.uint32());
                    break;
                case 5:
                    message.category = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Incident message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Incident} Incident
         */
        Incident.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Incident message.
         * @param {bikemoves.Incident|Object} message Incident message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Incident.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceUuid !== undefined)
                if (!$util.isString(message.deviceUuid))
                    return "deviceUuid: string expected";
            if (message.comment !== undefined)
                if (!$util.isString(message.comment))
                    return "comment: string expected";
            if (message.time !== undefined)
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.location !== undefined && message.location !== null) {
                var error = $types[3].verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.category !== undefined)
                if (!$util.isString(message.category))
                    return "category: string expected";
            return null;
        };

        /**
         * Creates an Incident message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Incident} Incident
         */
        Incident.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.Incident)
                return object;
            var message = new $root.bikemoves.Incident();
            if (object.deviceUuid !== undefined && object.deviceUuid !== null)
                message.deviceUuid = String(object.deviceUuid);
            if (object.comment !== undefined && object.comment !== null)
                message.comment = String(object.comment);
            if (object.time !== undefined && object.time !== null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
            if (object.location !== undefined && object.location !== null) {
                if (typeof object.location !== "object")
                    throw TypeError(".bikemoves.Incident.location: object expected");
                message.location = $types[3].fromObject(object.location);
            }
            if (object.category !== undefined && object.category !== null)
                message.category = String(object.category);
            return message;
        };

        /**
         * Creates an Incident message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.Incident.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Incident} Incident
         */
        Incident.from = Incident.fromObject;

        /**
         * Creates a plain object from an Incident message. Also converts values to other types if specified.
         * @param {bikemoves.Incident} message Incident
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Incident.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.deviceUuid = "";
                object.comment = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.location = null;
                object.category = "";
            }
            if (message.deviceUuid !== undefined && message.deviceUuid !== null && message.hasOwnProperty("deviceUuid"))
                object.deviceUuid = message.deviceUuid;
            if (message.comment !== undefined && message.comment !== null && message.hasOwnProperty("comment"))
                object.comment = message.comment;
            if (message.time !== undefined && message.time !== null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
            if (message.location !== undefined && message.location !== null && message.hasOwnProperty("location"))
                object.location = $types[3].toObject(message.location, options);
            if (message.category !== undefined && message.category !== null && message.hasOwnProperty("category"))
                object.category = message.category;
            return object;
        };

        /**
         * Creates a plain object from this Incident message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Incident.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Incident to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Incident.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Incident;
    })();

    bikemoves.User = (function() {

        /**
         * Constructs a new User.
         * @exports bikemoves.User
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * User deviceUuid.
         * @type {string|undefined}
         */
        User.prototype.deviceUuid = "";

        /**
         * User platformName.
         * @type {string|undefined}
         */
        User.prototype.platformName = "";

        /**
         * User platformVersion.
         * @type {number|undefined}
         */
        User.prototype.platformVersion = 0;

        /**
         * User gender.
         * @type {number|undefined}
         */
        User.prototype.gender = 0;

        /**
         * User age.
         * @type {number|undefined}
         */
        User.prototype.age = 0;

        /**
         * User cyclingExperience.
         * @type {number|undefined}
         */
        User.prototype.cyclingExperience = 0;

        // Lazily resolved type references
        var $types = {
            3: "bikemoves.Gender",
            4: "bikemoves.Age",
            5: "bikemoves.ExperienceLevel"
        }; $lazyTypes.push($types);

        /**
         * Creates a new User instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message.
         * @param {bikemoves.User|Object} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceUuid !== undefined && message.hasOwnProperty("deviceUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceUuid);
            if (message.platformName !== undefined && message.hasOwnProperty("platformName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.platformName);
            if (message.platformVersion !== undefined && message.hasOwnProperty("platformVersion"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.platformVersion);
            if (message.gender !== undefined && message.hasOwnProperty("gender"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.gender);
            if (message.age !== undefined && message.hasOwnProperty("age"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.age);
            if (message.cyclingExperience !== undefined && message.hasOwnProperty("cyclingExperience"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.cyclingExperience);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited.
         * @param {bikemoves.User|Object} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.User} User
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bikemoves.User();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.deviceUuid = reader.string();
                    break;
                case 2:
                    message.platformName = reader.string();
                    break;
                case 3:
                    message.platformVersion = reader.float();
                    break;
                case 4:
                    message.gender = reader.uint32();
                    break;
                case 5:
                    message.age = reader.uint32();
                    break;
                case 6:
                    message.cyclingExperience = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.User} User
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @param {bikemoves.User|Object} message User message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceUuid !== undefined)
                if (!$util.isString(message.deviceUuid))
                    return "deviceUuid: string expected";
            if (message.platformName !== undefined)
                if (!$util.isString(message.platformName))
                    return "platformName: string expected";
            if (message.platformVersion !== undefined)
                if (typeof message.platformVersion !== "number")
                    return "platformVersion: number expected";
            if (message.gender !== undefined)
                switch (message.gender) {
                default:
                    return "gender: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.age !== undefined)
                switch (message.age) {
                default:
                    return "age: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.cyclingExperience !== undefined)
                switch (message.cyclingExperience) {
                default:
                    return "cyclingExperience: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.User)
                return object;
            var message = new $root.bikemoves.User();
            if (object.deviceUuid !== undefined && object.deviceUuid !== null)
                message.deviceUuid = String(object.deviceUuid);
            if (object.platformName !== undefined && object.platformName !== null)
                message.platformName = String(object.platformName);
            if (object.platformVersion !== undefined && object.platformVersion !== null)
                message.platformVersion = Number(object.platformVersion);
            switch (object.gender) {
            case "NOT_SPECIFIED":
            case 0:
                message.gender = 0;
                break;
            case "MALE":
            case 1:
                message.gender = 1;
                break;
            case "FEMALE":
            case 2:
                message.gender = 2;
                break;
            case "OTHER":
            case 3:
                message.gender = 3;
                break;
            }
            switch (object.age) {
            case "NOT_SPECIFIED":
            case 0:
                message.age = 0;
                break;
            case "AGE_UNDER_15":
            case 1:
                message.age = 1;
                break;
            case "AGE_15_TO_19":
            case 2:
                message.age = 2;
                break;
            case "AGE_20_TO_24":
            case 3:
                message.age = 3;
                break;
            case "AGE_25_TO_34":
            case 4:
                message.age = 4;
                break;
            case "AGE_35_TO_44":
            case 5:
                message.age = 5;
                break;
            case "AGE_45_TO_54":
            case 6:
                message.age = 6;
                break;
            case "AGE_55_TO_64":
            case 7:
                message.age = 7;
                break;
            case "AGE_65_TO_74":
            case 8:
                message.age = 8;
                break;
            case "AGE_75_AND_OLDER":
            case 9:
                message.age = 9;
                break;
            }
            switch (object.cyclingExperience) {
            case "NOT_SPECIFIED":
            case 0:
                message.cyclingExperience = 0;
                break;
            case "BEGINNER":
            case 1:
                message.cyclingExperience = 1;
                break;
            case "INTERMEDIATE":
            case 2:
                message.cyclingExperience = 2;
                break;
            case "ADVANCED":
            case 3:
                message.cyclingExperience = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.User.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.User} User
         */
        User.from = User.fromObject;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param {bikemoves.User} message User
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.deviceUuid = "";
                object.platformName = "";
                object.platformVersion = 0;
                object.gender = options.enums === String ? "NOT_SPECIFIED" : 0;
                object.age = options.enums === String ? "NOT_SPECIFIED" : 0;
                object.cyclingExperience = options.enums === String ? "NOT_SPECIFIED" : 0;
            }
            if (message.deviceUuid !== undefined && message.deviceUuid !== null && message.hasOwnProperty("deviceUuid"))
                object.deviceUuid = message.deviceUuid;
            if (message.platformName !== undefined && message.platformName !== null && message.hasOwnProperty("platformName"))
                object.platformName = message.platformName;
            if (message.platformVersion !== undefined && message.platformVersion !== null && message.hasOwnProperty("platformVersion"))
                object.platformVersion = message.platformVersion;
            if (message.gender !== undefined && message.gender !== null && message.hasOwnProperty("gender"))
                object.gender = options.enums === String ? $types[3][message.gender] : message.gender;
            if (message.age !== undefined && message.age !== null && message.hasOwnProperty("age"))
                object.age = options.enums === String ? $types[4][message.age] : message.age;
            if (message.cyclingExperience !== undefined && message.cyclingExperience !== null && message.hasOwnProperty("cyclingExperience"))
                object.cyclingExperience = options.enums === String ? $types[5][message.cyclingExperience] : message.cyclingExperience;
            return object;
        };

        /**
         * Creates a plain object from this User message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this User to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    return bikemoves;
})();

// Resolve lazy type references to actual types
$util.lazyResolve($root, $lazyTypes);

module.exports = $root;
