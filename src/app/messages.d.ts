import * as $protobuf from "protobufjs";

/** Namespace bikemoves. */
export namespace bikemoves {

    /** LocationType enum. */
    enum LocationType {
        NOT_SPECIFIED = 0,
        HOME = 1,
        WORK = 2,
        K12_SCHOOL = 3,
        UNIVERSITY = 4,
        SHOPPING = 5,
        OTHER = 6
    }

    /** ActivityType enum. */
    enum ActivityType {
        UNKNOWN = 0,
        STILL = 1,
        FOOT = 2,
        WALK = 3,
        RUN = 4,
        VEHICLE = 5,
        BICYCLE = 6
    }

    /** EventType enum. */
    enum EventType {
        LOCATION = 0,
        MOTION = 1,
        GEOFENCE = 2,
        HEARTBEAT = 3,
        PROVIDER = 4
    }

    /** Gender enum. */
    enum Gender {
        NOT_SPECIFIED = 0,
        MALE = 1,
        FEMALE = 2,
        OTHER = 3
    }

    /** Age enum. */
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

    /** ExperienceLevel enum. */
    enum ExperienceLevel {
        NOT_SPECIFIED = 0,
        BEGINNER = 1,
        INTERMEDIATE = 2,
        ADVANCED = 3
    }

    /** Properties of a Location. */
    interface ILocation {

        /** Location longitude */
        longitude?: number;

        /** Location latitude */
        latitude?: number;

        /** Location time */
        time?: (number|Long);

        /** Location accuracy */
        accuracy?: number;

        /** Location altitude */
        altitude?: number;

        /** Location heading */
        heading?: number;

        /** Location speed */
        speed?: number;

        /** Location moving */
        moving?: boolean;

        /** Location event */
        event?: bikemoves.EventType;

        /** Location activity */
        activity?: bikemoves.ActivityType;

        /** Location confidence */
        confidence?: number;
    }

    /** Represents a Location. */
    class Location {

        /**
         * Constructs a new Location.
         * @param [properties] Properties to set
         */
        constructor(properties?: bikemoves.ILocation);

        /** Location longitude. */
        public longitude: number;

        /** Location latitude. */
        public latitude: number;

        /** Location time. */
        public time: (number|Long);

        /** Location accuracy. */
        public accuracy: number;

        /** Location altitude. */
        public altitude: number;

        /** Location heading. */
        public heading: number;

        /** Location speed. */
        public speed: number;

        /** Location moving. */
        public moving: boolean;

        /** Location event. */
        public event: bikemoves.EventType;

        /** Location activity. */
        public activity: bikemoves.ActivityType;

        /** Location confidence. */
        public confidence: number;

        /**
         * Creates a new Location instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Location instance
         */
        public static create(properties?: bikemoves.ILocation): bikemoves.Location;

        /**
         * Encodes the specified Location message. Does not implicitly {@link bikemoves.Location.verify|verify} messages.
         * @param message Location message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: bikemoves.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Location message, length delimited. Does not implicitly {@link bikemoves.Location.verify|verify} messages.
         * @param message Location message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: bikemoves.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.Location;

        /**
         * Decodes a Location message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.Location;

        /**
         * Verifies a Location message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Location
         */
        public static fromObject(object: { [k: string]: any }): bikemoves.Location;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param message Location
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: bikemoves.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Location to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Trip. */
    interface ITrip {

        /** Trip deviceUuid */
        deviceUuid?: string;

        /** Trip locations */
        locations?: bikemoves.ILocation[];

        /** Trip startTime */
        startTime?: (number|Long);

        /** Trip endTime */
        endTime?: (number|Long);

        /** Trip desiredAccuracy */
        desiredAccuracy?: number;

        /** Trip transit */
        transit?: boolean;

        /** Trip origin */
        origin?: bikemoves.LocationType;

        /** Trip destination */
        destination?: bikemoves.LocationType;

        /** Trip debug */
        debug?: boolean;

        /** Trip appVersion */
        appVersion?: string;
    }

    /** Represents a Trip. */
    class Trip {

        /**
         * Constructs a new Trip.
         * @param [properties] Properties to set
         */
        constructor(properties?: bikemoves.ITrip);

        /** Trip deviceUuid. */
        public deviceUuid: string;

        /** Trip locations. */
        public locations: bikemoves.ILocation[];

        /** Trip startTime. */
        public startTime: (number|Long);

        /** Trip endTime. */
        public endTime: (number|Long);

        /** Trip desiredAccuracy. */
        public desiredAccuracy: number;

        /** Trip transit. */
        public transit: boolean;

        /** Trip origin. */
        public origin: bikemoves.LocationType;

        /** Trip destination. */
        public destination: bikemoves.LocationType;

        /** Trip debug. */
        public debug: boolean;

        /** Trip appVersion. */
        public appVersion: string;

        /**
         * Creates a new Trip instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Trip instance
         */
        public static create(properties?: bikemoves.ITrip): bikemoves.Trip;

        /**
         * Encodes the specified Trip message. Does not implicitly {@link bikemoves.Trip.verify|verify} messages.
         * @param message Trip message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: bikemoves.ITrip, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Trip message, length delimited. Does not implicitly {@link bikemoves.Trip.verify|verify} messages.
         * @param message Trip message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: bikemoves.ITrip, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Trip message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Trip
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.Trip;

        /**
         * Decodes a Trip message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Trip
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.Trip;

        /**
         * Verifies a Trip message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Trip
         */
        public static fromObject(object: { [k: string]: any }): bikemoves.Trip;

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @param message Trip
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: bikemoves.Trip, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Trip to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Incident. */
    interface IIncident {

        /** Incident deviceUuid */
        deviceUuid?: string;

        /** Incident comment */
        comment?: string;

        /** Incident time */
        time?: (number|Long);

        /** Incident location */
        location?: bikemoves.ILocation;

        /** Incident category */
        category?: string;
    }

    /** Represents an Incident. */
    class Incident {

        /**
         * Constructs a new Incident.
         * @param [properties] Properties to set
         */
        constructor(properties?: bikemoves.IIncident);

        /** Incident deviceUuid. */
        public deviceUuid: string;

        /** Incident comment. */
        public comment: string;

        /** Incident time. */
        public time: (number|Long);

        /** Incident location. */
        public location?: (bikemoves.ILocation|null);

        /** Incident category. */
        public category: string;

        /**
         * Creates a new Incident instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Incident instance
         */
        public static create(properties?: bikemoves.IIncident): bikemoves.Incident;

        /**
         * Encodes the specified Incident message. Does not implicitly {@link bikemoves.Incident.verify|verify} messages.
         * @param message Incident message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: bikemoves.IIncident, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Incident message, length delimited. Does not implicitly {@link bikemoves.Incident.verify|verify} messages.
         * @param message Incident message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: bikemoves.IIncident, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Incident message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Incident
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.Incident;

        /**
         * Decodes an Incident message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Incident
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.Incident;

        /**
         * Verifies an Incident message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Incident message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Incident
         */
        public static fromObject(object: { [k: string]: any }): bikemoves.Incident;

        /**
         * Creates a plain object from an Incident message. Also converts values to other types if specified.
         * @param message Incident
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: bikemoves.Incident, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Incident to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a User. */
    interface IUser {

        /** User deviceUuid */
        deviceUuid?: string;

        /** User platformName */
        platformName?: string;

        /** User platformVersion */
        platformVersion?: number;

        /** User gender */
        gender?: bikemoves.Gender;

        /** User age */
        age?: bikemoves.Age;

        /** User cyclingExperience */
        cyclingExperience?: bikemoves.ExperienceLevel;
    }

    /** Represents a User. */
    class User {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: bikemoves.IUser);

        /** User deviceUuid. */
        public deviceUuid: string;

        /** User platformName. */
        public platformName: string;

        /** User platformVersion. */
        public platformVersion: number;

        /** User gender. */
        public gender: bikemoves.Gender;

        /** User age. */
        public age: bikemoves.Age;

        /** User cyclingExperience. */
        public cyclingExperience: bikemoves.ExperienceLevel;

        /**
         * Creates a new User instance using the specified properties.
         * @param [properties] Properties to set
         * @returns User instance
         */
        public static create(properties?: bikemoves.IUser): bikemoves.User;

        /**
         * Encodes the specified User message. Does not implicitly {@link bikemoves.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: bikemoves.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link bikemoves.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: bikemoves.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): bikemoves.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): bikemoves.User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): bikemoves.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: bikemoves.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
