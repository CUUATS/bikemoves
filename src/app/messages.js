/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

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
     * @enum {string}
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
        values[valuesById[0] = "NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "HOME"] = 1;
        values[valuesById[2] = "WORK"] = 2;
        values[valuesById[3] = "K12_SCHOOL"] = 3;
        values[valuesById[4] = "UNIVERSITY"] = 4;
        values[valuesById[5] = "SHOPPING"] = 5;
        values[valuesById[6] = "OTHER"] = 6;
        return values;
    })();

    /**
     * ActivityType enum.
     * @enum {string}
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
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "STILL"] = 1;
        values[valuesById[2] = "FOOT"] = 2;
        values[valuesById[3] = "WALK"] = 3;
        values[valuesById[4] = "RUN"] = 4;
        values[valuesById[5] = "VEHICLE"] = 5;
        values[valuesById[6] = "BICYCLE"] = 6;
        return values;
    })();

    /**
     * EventType enum.
     * @enum {string}
     * @property {number} LOCATION=0 LOCATION value
     * @property {number} MOTION=1 MOTION value
     * @property {number} GEOFENCE=2 GEOFENCE value
     * @property {number} HEARTBEAT=3 HEARTBEAT value
     * @property {number} PROVIDER=4 PROVIDER value
     */
    bikemoves.EventType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "LOCATION"] = 0;
        values[valuesById[1] = "MOTION"] = 1;
        values[valuesById[2] = "GEOFENCE"] = 2;
        values[valuesById[3] = "HEARTBEAT"] = 3;
        values[valuesById[4] = "PROVIDER"] = 4;
        return values;
    })();

    /**
     * Gender enum.
     * @enum {string}
     * @property {number} NOT_SPECIFIED=0 NOT_SPECIFIED value
     * @property {number} MALE=1 MALE value
     * @property {number} FEMALE=2 FEMALE value
     * @property {number} OTHER=3 OTHER value
     */
    bikemoves.Gender = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "MALE"] = 1;
        values[valuesById[2] = "FEMALE"] = 2;
        values[valuesById[3] = "OTHER"] = 3;
        return values;
    })();

    /**
     * Age enum.
     * @enum {string}
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
        values[valuesById[0] = "NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "AGE_UNDER_15"] = 1;
        values[valuesById[2] = "AGE_15_TO_19"] = 2;
        values[valuesById[3] = "AGE_20_TO_24"] = 3;
        values[valuesById[4] = "AGE_25_TO_34"] = 4;
        values[valuesById[5] = "AGE_35_TO_44"] = 5;
        values[valuesById[6] = "AGE_45_TO_54"] = 6;
        values[valuesById[7] = "AGE_55_TO_64"] = 7;
        values[valuesById[8] = "AGE_65_TO_74"] = 8;
        values[valuesById[9] = "AGE_75_AND_OLDER"] = 9;
        return values;
    })();

    /**
     * ExperienceLevel enum.
     * @enum {string}
     * @property {number} NOT_SPECIFIED=0 NOT_SPECIFIED value
     * @property {number} BEGINNER=1 BEGINNER value
     * @property {number} INTERMEDIATE=2 INTERMEDIATE value
     * @property {number} ADVANCED=3 ADVANCED value
     */
    bikemoves.ExperienceLevel = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "BEGINNER"] = 1;
        values[valuesById[2] = "INTERMEDIATE"] = 2;
        values[valuesById[3] = "ADVANCED"] = 3;
        return values;
    })();

    bikemoves.Location = (function() {

        /**
         * Properties of a Location.
         * @memberof bikemoves
         * @interface ILocation
         * @property {number} [longitude] Location longitude
         * @property {number} [latitude] Location latitude
         * @property {number|Long} [time] Location time
         * @property {number} [accuracy] Location accuracy
         * @property {number} [altitude] Location altitude
         * @property {number} [heading] Location heading
         * @property {number} [speed] Location speed
         * @property {boolean} [moving] Location moving
         * @property {bikemoves.EventType} [event] Location event
         * @property {bikemoves.ActivityType} [activity] Location activity
         * @property {number} [confidence] Location confidence
         */

        /**
         * Constructs a new Location.
         * @memberof bikemoves
         * @classdesc Represents a Location.
         * @constructor
         * @param {bikemoves.ILocation=} [properties] Properties to set
         */
        function Location(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Location longitude.
         * @member {number}longitude
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.longitude = 0;

        /**
         * Location latitude.
         * @member {number}latitude
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.latitude = 0;

        /**
         * Location time.
         * @member {number|Long}time
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Location accuracy.
         * @member {number}accuracy
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.accuracy = 0;

        /**
         * Location altitude.
         * @member {number}altitude
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.altitude = 0;

        /**
         * Location heading.
         * @member {number}heading
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.heading = 0;

        /**
         * Location speed.
         * @member {number}speed
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.speed = 0;

        /**
         * Location moving.
         * @member {boolean}moving
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.moving = false;

        /**
         * Location event.
         * @member {bikemoves.EventType}event
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.event = 0;

        /**
         * Location activity.
         * @member {bikemoves.ActivityType}activity
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.activity = 0;

        /**
         * Location confidence.
         * @member {number}confidence
         * @memberof bikemoves.Location
         * @instance
         */
        Location.prototype.confidence = 0;

        /**
         * Creates a new Location instance using the specified properties.
         * @function create
         * @memberof bikemoves.Location
         * @static
         * @param {bikemoves.ILocation=} [properties] Properties to set
         * @returns {bikemoves.Location} Location instance
         */
        Location.create = function create(properties) {
            return new Location(properties);
        };

        /**
         * Encodes the specified Location message. Does not implicitly {@link bikemoves.Location.verify|verify} messages.
         * @function encode
         * @memberof bikemoves.Location
         * @static
         * @param {bikemoves.ILocation} message Location message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Location.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.longitude != null && message.hasOwnProperty("longitude"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.longitude);
            if (message.latitude != null && message.hasOwnProperty("latitude"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.latitude);
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
            if (message.accuracy != null && message.hasOwnProperty("accuracy"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.accuracy);
            if (message.altitude != null && message.hasOwnProperty("altitude"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.altitude);
            if (message.heading != null && message.hasOwnProperty("heading"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.heading);
            if (message.speed != null && message.hasOwnProperty("speed"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.speed);
            if (message.moving != null && message.hasOwnProperty("moving"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.moving);
            if (message.event != null && message.hasOwnProperty("event"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.event);
            if (message.activity != null && message.hasOwnProperty("activity"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.activity);
            if (message.confidence != null && message.hasOwnProperty("confidence"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.confidence);
            return writer;
        };

        /**
         * Encodes the specified Location message, length delimited. Does not implicitly {@link bikemoves.Location.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bikemoves.Location
         * @static
         * @param {bikemoves.ILocation} message Location message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Location.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @function decode
         * @memberof bikemoves.Location
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Location} Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
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
                    message.event = reader.int32();
                    break;
                case 10:
                    message.activity = reader.int32();
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
         * @function decodeDelimited
         * @memberof bikemoves.Location
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Location} Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Location.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Location message.
         * @function verify
         * @memberof bikemoves.Location
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Location.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.longitude != null && message.hasOwnProperty("longitude"))
                if (typeof message.longitude !== "number")
                    return "longitude: number expected";
            if (message.latitude != null && message.hasOwnProperty("latitude"))
                if (typeof message.latitude !== "number")
                    return "latitude: number expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.accuracy != null && message.hasOwnProperty("accuracy"))
                if (typeof message.accuracy !== "number")
                    return "accuracy: number expected";
            if (message.altitude != null && message.hasOwnProperty("altitude"))
                if (typeof message.altitude !== "number")
                    return "altitude: number expected";
            if (message.heading != null && message.hasOwnProperty("heading"))
                if (typeof message.heading !== "number")
                    return "heading: number expected";
            if (message.speed != null && message.hasOwnProperty("speed"))
                if (typeof message.speed !== "number")
                    return "speed: number expected";
            if (message.moving != null && message.hasOwnProperty("moving"))
                if (typeof message.moving !== "boolean")
                    return "moving: boolean expected";
            if (message.event != null && message.hasOwnProperty("event"))
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
            if (message.activity != null && message.hasOwnProperty("activity"))
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
            if (message.confidence != null && message.hasOwnProperty("confidence"))
                if (!$util.isInteger(message.confidence))
                    return "confidence: integer expected";
            return null;
        };

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bikemoves.Location
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Location} Location
         */
        Location.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.Location)
                return object;
            var message = new $root.bikemoves.Location();
            if (object.longitude != null)
                message.longitude = Number(object.longitude);
            if (object.latitude != null)
                message.latitude = Number(object.latitude);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
            if (object.accuracy != null)
                message.accuracy = Number(object.accuracy);
            if (object.altitude != null)
                message.altitude = Number(object.altitude);
            if (object.heading != null)
                message.heading = Number(object.heading);
            if (object.speed != null)
                message.speed = Number(object.speed);
            if (object.moving != null)
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
            if (object.confidence != null)
                message.confidence = object.confidence >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bikemoves.Location
         * @static
         * @param {bikemoves.Location} message Location
         * @param {$protobuf.IConversionOptions} [options] Conversion options
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
            if (message.longitude != null && message.hasOwnProperty("longitude"))
                object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
            if (message.latitude != null && message.hasOwnProperty("latitude"))
                object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
            if (message.accuracy != null && message.hasOwnProperty("accuracy"))
                object.accuracy = options.json && !isFinite(message.accuracy) ? String(message.accuracy) : message.accuracy;
            if (message.altitude != null && message.hasOwnProperty("altitude"))
                object.altitude = options.json && !isFinite(message.altitude) ? String(message.altitude) : message.altitude;
            if (message.heading != null && message.hasOwnProperty("heading"))
                object.heading = options.json && !isFinite(message.heading) ? String(message.heading) : message.heading;
            if (message.speed != null && message.hasOwnProperty("speed"))
                object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
            if (message.moving != null && message.hasOwnProperty("moving"))
                object.moving = message.moving;
            if (message.event != null && message.hasOwnProperty("event"))
                object.event = options.enums === String ? $root.bikemoves.EventType[message.event] : message.event;
            if (message.activity != null && message.hasOwnProperty("activity"))
                object.activity = options.enums === String ? $root.bikemoves.ActivityType[message.activity] : message.activity;
            if (message.confidence != null && message.hasOwnProperty("confidence"))
                object.confidence = message.confidence;
            return object;
        };

        /**
         * Converts this Location to JSON.
         * @function toJSON
         * @memberof bikemoves.Location
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Location.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Location;
    })();

    bikemoves.Trip = (function() {

        /**
         * Properties of a Trip.
         * @memberof bikemoves
         * @interface ITrip
         * @property {string} [deviceUuid] Trip deviceUuid
         * @property {Array.<bikemoves.ILocation>} [locations] Trip locations
         * @property {number|Long} [startTime] Trip startTime
         * @property {number|Long} [endTime] Trip endTime
         * @property {number} [desiredAccuracy] Trip desiredAccuracy
         * @property {boolean} [transit] Trip transit
         * @property {bikemoves.LocationType} [origin] Trip origin
         * @property {bikemoves.LocationType} [destination] Trip destination
         * @property {boolean} [debug] Trip debug
         * @property {string} [appVersion] Trip appVersion
         */

        /**
         * Constructs a new Trip.
         * @memberof bikemoves
         * @classdesc Represents a Trip.
         * @constructor
         * @param {bikemoves.ITrip=} [properties] Properties to set
         */
        function Trip(properties) {
            this.locations = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trip deviceUuid.
         * @member {string}deviceUuid
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.deviceUuid = "";

        /**
         * Trip locations.
         * @member {Array.<bikemoves.ILocation>}locations
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.locations = $util.emptyArray;

        /**
         * Trip startTime.
         * @member {number|Long}startTime
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Trip endTime.
         * @member {number|Long}endTime
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Trip desiredAccuracy.
         * @member {number}desiredAccuracy
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.desiredAccuracy = 0;

        /**
         * Trip transit.
         * @member {boolean}transit
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.transit = false;

        /**
         * Trip origin.
         * @member {bikemoves.LocationType}origin
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.origin = 0;

        /**
         * Trip destination.
         * @member {bikemoves.LocationType}destination
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.destination = 0;

        /**
         * Trip debug.
         * @member {boolean}debug
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.debug = false;

        /**
         * Trip appVersion.
         * @member {string}appVersion
         * @memberof bikemoves.Trip
         * @instance
         */
        Trip.prototype.appVersion = "";

        /**
         * Creates a new Trip instance using the specified properties.
         * @function create
         * @memberof bikemoves.Trip
         * @static
         * @param {bikemoves.ITrip=} [properties] Properties to set
         * @returns {bikemoves.Trip} Trip instance
         */
        Trip.create = function create(properties) {
            return new Trip(properties);
        };

        /**
         * Encodes the specified Trip message. Does not implicitly {@link bikemoves.Trip.verify|verify} messages.
         * @function encode
         * @memberof bikemoves.Trip
         * @static
         * @param {bikemoves.ITrip} message Trip message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trip.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceUuid);
            if (message.locations != null && message.locations.length)
                for (var i = 0; i < message.locations.length; ++i)
                    $root.bikemoves.Location.encode(message.locations[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.startTime);
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.endTime);
            if (message.desiredAccuracy != null && message.hasOwnProperty("desiredAccuracy"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.desiredAccuracy);
            if (message.transit != null && message.hasOwnProperty("transit"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.transit);
            if (message.origin != null && message.hasOwnProperty("origin"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.origin);
            if (message.destination != null && message.hasOwnProperty("destination"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.destination);
            if (message.debug != null && message.hasOwnProperty("debug"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.debug);
            if (message.appVersion != null && message.hasOwnProperty("appVersion"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.appVersion);
            return writer;
        };

        /**
         * Encodes the specified Trip message, length delimited. Does not implicitly {@link bikemoves.Trip.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bikemoves.Trip
         * @static
         * @param {bikemoves.ITrip} message Trip message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trip.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Trip message from the specified reader or buffer.
         * @function decode
         * @memberof bikemoves.Trip
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Trip} Trip
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
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
                    message.locations.push($root.bikemoves.Location.decode(reader, reader.uint32()));
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
                    message.origin = reader.int32();
                    break;
                case 8:
                    message.destination = reader.int32();
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
         * @function decodeDelimited
         * @memberof bikemoves.Trip
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Trip} Trip
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trip.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Trip message.
         * @function verify
         * @memberof bikemoves.Trip
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Trip.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                if (!$util.isString(message.deviceUuid))
                    return "deviceUuid: string expected";
            if (message.locations != null && message.hasOwnProperty("locations")) {
                if (!Array.isArray(message.locations))
                    return "locations: array expected";
                for (var i = 0; i < message.locations.length; ++i) {
                    var error = $root.bikemoves.Location.verify(message.locations[i]);
                    if (error)
                        return "locations." + error;
                }
            }
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                    return "startTime: integer|Long expected";
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high)))
                    return "endTime: integer|Long expected";
            if (message.desiredAccuracy != null && message.hasOwnProperty("desiredAccuracy"))
                if (typeof message.desiredAccuracy !== "number")
                    return "desiredAccuracy: number expected";
            if (message.transit != null && message.hasOwnProperty("transit"))
                if (typeof message.transit !== "boolean")
                    return "transit: boolean expected";
            if (message.origin != null && message.hasOwnProperty("origin"))
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
            if (message.destination != null && message.hasOwnProperty("destination"))
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
            if (message.debug != null && message.hasOwnProperty("debug"))
                if (typeof message.debug !== "boolean")
                    return "debug: boolean expected";
            if (message.appVersion != null && message.hasOwnProperty("appVersion"))
                if (!$util.isString(message.appVersion))
                    return "appVersion: string expected";
            return null;
        };

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bikemoves.Trip
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Trip} Trip
         */
        Trip.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.Trip)
                return object;
            var message = new $root.bikemoves.Trip();
            if (object.deviceUuid != null)
                message.deviceUuid = String(object.deviceUuid);
            if (object.locations) {
                if (!Array.isArray(object.locations))
                    throw TypeError(".bikemoves.Trip.locations: array expected");
                message.locations = [];
                for (var i = 0; i < object.locations.length; ++i) {
                    if (typeof object.locations[i] !== "object")
                        throw TypeError(".bikemoves.Trip.locations: object expected");
                    message.locations[i] = $root.bikemoves.Location.fromObject(object.locations[i]);
                }
            }
            if (object.startTime != null)
                if ($util.Long)
                    (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = true;
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber(true);
            if (object.endTime != null)
                if ($util.Long)
                    (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = true;
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber(true);
            if (object.desiredAccuracy != null)
                message.desiredAccuracy = Number(object.desiredAccuracy);
            if (object.transit != null)
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
            if (object.debug != null)
                message.debug = Boolean(object.debug);
            if (object.appVersion != null)
                message.appVersion = String(object.appVersion);
            return message;
        };

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bikemoves.Trip
         * @static
         * @param {bikemoves.Trip} message Trip
         * @param {$protobuf.IConversionOptions} [options] Conversion options
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
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                object.deviceUuid = message.deviceUuid;
            if (message.locations && message.locations.length) {
                object.locations = [];
                for (var j = 0; j < message.locations.length; ++j)
                    object.locations[j] = $root.bikemoves.Location.toObject(message.locations[j], options);
            }
            if (message.startTime != null && message.hasOwnProperty("startTime"))
                if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber(true) : message.startTime;
            if (message.endTime != null && message.hasOwnProperty("endTime"))
                if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber(true) : message.endTime;
            if (message.desiredAccuracy != null && message.hasOwnProperty("desiredAccuracy"))
                object.desiredAccuracy = options.json && !isFinite(message.desiredAccuracy) ? String(message.desiredAccuracy) : message.desiredAccuracy;
            if (message.transit != null && message.hasOwnProperty("transit"))
                object.transit = message.transit;
            if (message.origin != null && message.hasOwnProperty("origin"))
                object.origin = options.enums === String ? $root.bikemoves.LocationType[message.origin] : message.origin;
            if (message.destination != null && message.hasOwnProperty("destination"))
                object.destination = options.enums === String ? $root.bikemoves.LocationType[message.destination] : message.destination;
            if (message.debug != null && message.hasOwnProperty("debug"))
                object.debug = message.debug;
            if (message.appVersion != null && message.hasOwnProperty("appVersion"))
                object.appVersion = message.appVersion;
            return object;
        };

        /**
         * Converts this Trip to JSON.
         * @function toJSON
         * @memberof bikemoves.Trip
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Trip.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Trip;
    })();

    bikemoves.Incident = (function() {

        /**
         * Properties of an Incident.
         * @memberof bikemoves
         * @interface IIncident
         * @property {string} [deviceUuid] Incident deviceUuid
         * @property {string} [comment] Incident comment
         * @property {number|Long} [time] Incident time
         * @property {bikemoves.ILocation} [location] Incident location
         * @property {string} [category] Incident category
         */

        /**
         * Constructs a new Incident.
         * @memberof bikemoves
         * @classdesc Represents an Incident.
         * @constructor
         * @param {bikemoves.IIncident=} [properties] Properties to set
         */
        function Incident(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Incident deviceUuid.
         * @member {string}deviceUuid
         * @memberof bikemoves.Incident
         * @instance
         */
        Incident.prototype.deviceUuid = "";

        /**
         * Incident comment.
         * @member {string}comment
         * @memberof bikemoves.Incident
         * @instance
         */
        Incident.prototype.comment = "";

        /**
         * Incident time.
         * @member {number|Long}time
         * @memberof bikemoves.Incident
         * @instance
         */
        Incident.prototype.time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Incident location.
         * @member {(bikemoves.ILocation|null|undefined)}location
         * @memberof bikemoves.Incident
         * @instance
         */
        Incident.prototype.location = null;

        /**
         * Incident category.
         * @member {string}category
         * @memberof bikemoves.Incident
         * @instance
         */
        Incident.prototype.category = "";

        /**
         * Creates a new Incident instance using the specified properties.
         * @function create
         * @memberof bikemoves.Incident
         * @static
         * @param {bikemoves.IIncident=} [properties] Properties to set
         * @returns {bikemoves.Incident} Incident instance
         */
        Incident.create = function create(properties) {
            return new Incident(properties);
        };

        /**
         * Encodes the specified Incident message. Does not implicitly {@link bikemoves.Incident.verify|verify} messages.
         * @function encode
         * @memberof bikemoves.Incident
         * @static
         * @param {bikemoves.IIncident} message Incident message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Incident.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceUuid);
            if (message.comment != null && message.hasOwnProperty("comment"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.comment);
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.time);
            if (message.location != null && message.hasOwnProperty("location"))
                $root.bikemoves.Location.encode(message.location, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.category != null && message.hasOwnProperty("category"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.category);
            return writer;
        };

        /**
         * Encodes the specified Incident message, length delimited. Does not implicitly {@link bikemoves.Incident.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bikemoves.Incident
         * @static
         * @param {bikemoves.IIncident} message Incident message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Incident.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Incident message from the specified reader or buffer.
         * @function decode
         * @memberof bikemoves.Incident
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Incident} Incident
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
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
                    message.location = $root.bikemoves.Location.decode(reader, reader.uint32());
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
         * @function decodeDelimited
         * @memberof bikemoves.Incident
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Incident} Incident
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Incident.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Incident message.
         * @function verify
         * @memberof bikemoves.Incident
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Incident.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                if (!$util.isString(message.deviceUuid))
                    return "deviceUuid: string expected";
            if (message.comment != null && message.hasOwnProperty("comment"))
                if (!$util.isString(message.comment))
                    return "comment: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.location != null && message.hasOwnProperty("location")) {
                var error = $root.bikemoves.Location.verify(message.location);
                if (error)
                    return "location." + error;
            }
            if (message.category != null && message.hasOwnProperty("category"))
                if (!$util.isString(message.category))
                    return "category: string expected";
            return null;
        };

        /**
         * Creates an Incident message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof bikemoves.Incident
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Incident} Incident
         */
        Incident.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.Incident)
                return object;
            var message = new $root.bikemoves.Incident();
            if (object.deviceUuid != null)
                message.deviceUuid = String(object.deviceUuid);
            if (object.comment != null)
                message.comment = String(object.comment);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = true;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber(true);
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".bikemoves.Incident.location: object expected");
                message.location = $root.bikemoves.Location.fromObject(object.location);
            }
            if (object.category != null)
                message.category = String(object.category);
            return message;
        };

        /**
         * Creates a plain object from an Incident message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bikemoves.Incident
         * @static
         * @param {bikemoves.Incident} message Incident
         * @param {$protobuf.IConversionOptions} [options] Conversion options
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
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                object.deviceUuid = message.deviceUuid;
            if (message.comment != null && message.hasOwnProperty("comment"))
                object.comment = message.comment;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber(true) : message.time;
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.bikemoves.Location.toObject(message.location, options);
            if (message.category != null && message.hasOwnProperty("category"))
                object.category = message.category;
            return object;
        };

        /**
         * Converts this Incident to JSON.
         * @function toJSON
         * @memberof bikemoves.Incident
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Incident.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Incident;
    })();

    bikemoves.User = (function() {

        /**
         * Properties of a User.
         * @memberof bikemoves
         * @interface IUser
         * @property {string} [deviceUuid] User deviceUuid
         * @property {string} [platformName] User platformName
         * @property {number} [platformVersion] User platformVersion
         * @property {bikemoves.Gender} [gender] User gender
         * @property {bikemoves.Age} [age] User age
         * @property {bikemoves.ExperienceLevel} [cyclingExperience] User cyclingExperience
         */

        /**
         * Constructs a new User.
         * @memberof bikemoves
         * @classdesc Represents a User.
         * @constructor
         * @param {bikemoves.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User deviceUuid.
         * @member {string}deviceUuid
         * @memberof bikemoves.User
         * @instance
         */
        User.prototype.deviceUuid = "";

        /**
         * User platformName.
         * @member {string}platformName
         * @memberof bikemoves.User
         * @instance
         */
        User.prototype.platformName = "";

        /**
         * User platformVersion.
         * @member {number}platformVersion
         * @memberof bikemoves.User
         * @instance
         */
        User.prototype.platformVersion = 0;

        /**
         * User gender.
         * @member {bikemoves.Gender}gender
         * @memberof bikemoves.User
         * @instance
         */
        User.prototype.gender = 0;

        /**
         * User age.
         * @member {bikemoves.Age}age
         * @memberof bikemoves.User
         * @instance
         */
        User.prototype.age = 0;

        /**
         * User cyclingExperience.
         * @member {bikemoves.ExperienceLevel}cyclingExperience
         * @memberof bikemoves.User
         * @instance
         */
        User.prototype.cyclingExperience = 0;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof bikemoves.User
         * @static
         * @param {bikemoves.IUser=} [properties] Properties to set
         * @returns {bikemoves.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link bikemoves.User.verify|verify} messages.
         * @function encode
         * @memberof bikemoves.User
         * @static
         * @param {bikemoves.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceUuid);
            if (message.platformName != null && message.hasOwnProperty("platformName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.platformName);
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.platformVersion);
            if (message.gender != null && message.hasOwnProperty("gender"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.gender);
            if (message.age != null && message.hasOwnProperty("age"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.age);
            if (message.cyclingExperience != null && message.hasOwnProperty("cyclingExperience"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.cyclingExperience);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link bikemoves.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof bikemoves.User
         * @static
         * @param {bikemoves.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof bikemoves.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
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
                    message.gender = reader.int32();
                    break;
                case 5:
                    message.age = reader.int32();
                    break;
                case 6:
                    message.cyclingExperience = reader.int32();
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
         * @function decodeDelimited
         * @memberof bikemoves.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof bikemoves.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                if (!$util.isString(message.deviceUuid))
                    return "deviceUuid: string expected";
            if (message.platformName != null && message.hasOwnProperty("platformName"))
                if (!$util.isString(message.platformName))
                    return "platformName: string expected";
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
                if (typeof message.platformVersion !== "number")
                    return "platformVersion: number expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                switch (message.gender) {
                default:
                    return "gender: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.age != null && message.hasOwnProperty("age"))
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
            if (message.cyclingExperience != null && message.hasOwnProperty("cyclingExperience"))
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
         * @function fromObject
         * @memberof bikemoves.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.bikemoves.User)
                return object;
            var message = new $root.bikemoves.User();
            if (object.deviceUuid != null)
                message.deviceUuid = String(object.deviceUuid);
            if (object.platformName != null)
                message.platformName = String(object.platformName);
            if (object.platformVersion != null)
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
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof bikemoves.User
         * @static
         * @param {bikemoves.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
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
            if (message.deviceUuid != null && message.hasOwnProperty("deviceUuid"))
                object.deviceUuid = message.deviceUuid;
            if (message.platformName != null && message.hasOwnProperty("platformName"))
                object.platformName = message.platformName;
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
                object.platformVersion = options.json && !isFinite(message.platformVersion) ? String(message.platformVersion) : message.platformVersion;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = options.enums === String ? $root.bikemoves.Gender[message.gender] : message.gender;
            if (message.age != null && message.hasOwnProperty("age"))
                object.age = options.enums === String ? $root.bikemoves.Age[message.age] : message.age;
            if (message.cyclingExperience != null && message.hasOwnProperty("cyclingExperience"))
                object.cyclingExperience = options.enums === String ? $root.bikemoves.ExperienceLevel[message.cyclingExperience] : message.cyclingExperience;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof bikemoves.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    return bikemoves;
})();

module.exports = $root;
