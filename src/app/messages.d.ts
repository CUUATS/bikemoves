import * as $protobuf from "protobufjs";

/**
 * Namespace bikemoves.
 * @exports bikemoves
 * @namespace
 */
export namespace bikemoves {

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
    enum LocationType {
        NOT_SPECIFIED = 0,
        HOME = 1,
        WORK = 2,
        K12_SCHOOL = 3,
        UNIVERSITY = 4,
        SHOPPING = 5,
        OTHER = 6
    }

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
    enum ActivityType {
        UNKNOWN = 0,
        STILL = 1,
        FOOT = 2,
        WALK = 3,
        RUN = 4,
        VEHICLE = 5,
        BICYCLE = 6
    }

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
    enum EventType {
        LOCATION = 0,
        MOTION = 1,
        GEOFENCE = 2,
        HEARTBEAT = 3,
        PROVIDER = 4
    }

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
    enum Gender {
        NOT_SPECIFIED = 0,
        MALE = 1,
        FEMALE = 2,
        OTHER = 3
    }

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
    enum Age {
        NOT_SPECIFIED = 0,
        AGE_UNDER_15 = 1,
        AGE_15_TO_19 = 2,
        AGE_20_TO_24 = 3,
        AGE_25_TO_34 = 4,
        AGE_35_TO_44 = 5,
        AGE_45_TO_54 = 6,
        AGE_55_TO_64 = 7,
        AGE_65_TO_74 = 8,
        AGE_75_AND_OLDER = 9
    }

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
    enum ExperienceLevel {
        NOT_SPECIFIED = 0,
        BEGINNER = 1,
        INTERMEDIATE = 2,
        ADVANCED = 3
    }

    /**
     * Constructs a new Location.
     * @exports bikemoves.Location
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    class Location {

        /**
         * Constructs a new Location.
         * @exports bikemoves.Location
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        constructor(properties?: Object);

        /**
         * Location longitude.
         * @type {number|undefined}
         */
        longitude?: number;

        /**
         * Location latitude.
         * @type {number|undefined}
         */
        latitude?: number;

        /**
         * Location time.
         * @type {number|$protobuf.Long|undefined}
         */
        time?: (number|$protobuf.Long);

        /**
         * Location accuracy.
         * @type {number|undefined}
         */
        accuracy?: number;

        /**
         * Location altitude.
         * @type {number|undefined}
         */
        altitude?: number;

        /**
         * Location heading.
         * @type {number|undefined}
         */
        heading?: number;

        /**
         * Location speed.
         * @type {number|undefined}
         */
        speed?: number;

        /**
         * Location moving.
         * @type {boolean|undefined}
         */
        moving?: boolean;

        /**
         * Location event.
         * @type {number|undefined}
         */
        event?: number;

        /**
         * Location activity.
         * @type {number|undefined}
         */
        activity?: number;

        /**
         * Location confidence.
         * @type {number|undefined}
         */
        confidence?: number;

        /**
         * Creates a new Location instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.Location} Location instance
         */
        static create(properties?: Object): bikemoves.Location;

        /**
         * Encodes the specified Location message.
         * @param {bikemoves.Location|Object} message Location message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encode(message: (bikemoves.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Location message, length delimited.
         * @param {bikemoves.Location|Object} message Location message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encodeDelimited(message: (bikemoves.Location|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Location} Location
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.Location;

        /**
         * Decodes a Location message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Location} Location
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.Location;

        /**
         * Verifies a Location message.
         * @param {bikemoves.Location|Object} message Location message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        static verify(message: (bikemoves.Location|Object)): string;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Location} Location
         */
        static fromObject(object: { [k: string]: any }): bikemoves.Location;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.Location.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Location} Location
         */
        static from(object: { [k: string]: any }): bikemoves.Location;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param {bikemoves.Location} message Location
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        static toObject(message: bikemoves.Location, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Location message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Location to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        toJSON(): { [k: string]: any };
    }

    /**
     * Constructs a new Trip.
     * @exports bikemoves.Trip
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    class Trip {

        /**
         * Constructs a new Trip.
         * @exports bikemoves.Trip
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        constructor(properties?: Object);

        /**
         * Trip deviceUuid.
         * @type {string|undefined}
         */
        deviceUuid?: string;

        /**
         * Trip locations.
         * @type {Array.<bikemoves.Location>|undefined}
         */
        locations?: bikemoves.Location[];

        /**
         * Trip startTime.
         * @type {number|$protobuf.Long|undefined}
         */
        startTime?: (number|$protobuf.Long);

        /**
         * Trip endTime.
         * @type {number|$protobuf.Long|undefined}
         */
        endTime?: (number|$protobuf.Long);

        /**
         * Trip desiredAccuracy.
         * @type {number|undefined}
         */
        desiredAccuracy?: number;

        /**
         * Trip transit.
         * @type {boolean|undefined}
         */
        transit?: boolean;

        /**
         * Trip origin.
         * @type {number|undefined}
         */
        origin?: number;

        /**
         * Trip destination.
         * @type {number|undefined}
         */
        destination?: number;

        /**
         * Trip debug.
         * @type {boolean|undefined}
         */
        debug?: boolean;

        /**
         * Trip appVersion.
         * @type {string|undefined}
         */
        appVersion?: string;

        /**
         * Creates a new Trip instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.Trip} Trip instance
         */
        static create(properties?: Object): bikemoves.Trip;

        /**
         * Encodes the specified Trip message.
         * @param {bikemoves.Trip|Object} message Trip message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encode(message: (bikemoves.Trip|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Trip message, length delimited.
         * @param {bikemoves.Trip|Object} message Trip message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encodeDelimited(message: (bikemoves.Trip|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Trip message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Trip} Trip
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.Trip;

        /**
         * Decodes a Trip message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Trip} Trip
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.Trip;

        /**
         * Verifies a Trip message.
         * @param {bikemoves.Trip|Object} message Trip message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        static verify(message: (bikemoves.Trip|Object)): string;

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Trip} Trip
         */
        static fromObject(object: { [k: string]: any }): bikemoves.Trip;

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.Trip.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Trip} Trip
         */
        static from(object: { [k: string]: any }): bikemoves.Trip;

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @param {bikemoves.Trip} message Trip
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        static toObject(message: bikemoves.Trip, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Trip message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Trip to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        toJSON(): { [k: string]: any };
    }

    /**
     * Constructs a new Incident.
     * @exports bikemoves.Incident
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    class Incident {

        /**
         * Constructs a new Incident.
         * @exports bikemoves.Incident
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        constructor(properties?: Object);

        /**
         * Incident deviceUuid.
         * @type {string|undefined}
         */
        deviceUuid?: string;

        /**
         * Incident comment.
         * @type {string|undefined}
         */
        comment?: string;

        /**
         * Incident time.
         * @type {number|$protobuf.Long|undefined}
         */
        time?: (number|$protobuf.Long);

        /**
         * Incident location.
         * @type {bikemoves.Location|undefined}
         */
        location?: bikemoves.Location;

        /**
         * Incident category.
         * @type {string|undefined}
         */
        category?: string;

        /**
         * Creates a new Incident instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.Incident} Incident instance
         */
        static create(properties?: Object): bikemoves.Incident;

        /**
         * Encodes the specified Incident message.
         * @param {bikemoves.Incident|Object} message Incident message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encode(message: (bikemoves.Incident|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Incident message, length delimited.
         * @param {bikemoves.Incident|Object} message Incident message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encodeDelimited(message: (bikemoves.Incident|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Incident message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.Incident} Incident
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.Incident;

        /**
         * Decodes an Incident message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.Incident} Incident
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.Incident;

        /**
         * Verifies an Incident message.
         * @param {bikemoves.Incident|Object} message Incident message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        static verify(message: (bikemoves.Incident|Object)): string;

        /**
         * Creates an Incident message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Incident} Incident
         */
        static fromObject(object: { [k: string]: any }): bikemoves.Incident;

        /**
         * Creates an Incident message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.Incident.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.Incident} Incident
         */
        static from(object: { [k: string]: any }): bikemoves.Incident;

        /**
         * Creates a plain object from an Incident message. Also converts values to other types if specified.
         * @param {bikemoves.Incident} message Incident
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        static toObject(message: bikemoves.Incident, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Incident message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Incident to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        toJSON(): { [k: string]: any };
    }

    /**
     * Constructs a new User.
     * @exports bikemoves.User
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    class User {

        /**
         * Constructs a new User.
         * @exports bikemoves.User
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        constructor(properties?: Object);

        /**
         * User deviceUuid.
         * @type {string|undefined}
         */
        deviceUuid?: string;

        /**
         * User platformName.
         * @type {string|undefined}
         */
        platformName?: string;

        /**
         * User platformVersion.
         * @type {number|undefined}
         */
        platformVersion?: number;

        /**
         * User gender.
         * @type {number|undefined}
         */
        gender?: number;

        /**
         * User age.
         * @type {number|undefined}
         */
        age?: number;

        /**
         * User cyclingExperience.
         * @type {number|undefined}
         */
        cyclingExperience?: number;

        /**
         * Creates a new User instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {bikemoves.User} User instance
         */
        static create(properties?: Object): bikemoves.User;

        /**
         * Encodes the specified User message.
         * @param {bikemoves.User|Object} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encode(message: (bikemoves.User|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited.
         * @param {bikemoves.User|Object} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        static encodeDelimited(message: (bikemoves.User|Object), writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {bikemoves.User} User
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {bikemoves.User} User
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.User;

        /**
         * Verifies a User message.
         * @param {bikemoves.User|Object} message User message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        static verify(message: (bikemoves.User|Object)): string;

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.User} User
         */
        static fromObject(object: { [k: string]: any }): bikemoves.User;

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link bikemoves.User.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {bikemoves.User} User
         */
        static from(object: { [k: string]: any }): bikemoves.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param {bikemoves.User} message User
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        static toObject(message: bikemoves.User, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this User message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        toJSON(): { [k: string]: any };
    }
}
