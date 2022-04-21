import { BaseContent } from "../message";
/**
 * Type of Encoding
 */
export declare enum Encoding {
    plain = "plain",
    zip = "zip",
    squashfs = "squashfs"
}
/**
 * Type of execution
 */
export declare enum MachineType {
    vm_function = "vm-function"
}
/**
 * Code to execute
 */
export declare type CodeContent = {
    encoding: Encoding;
    entrypoint: string;
    ref: string;
    use_latest: boolean;
};
/**
 * Data to use during computation
 */
export declare type DataContent = {
    encoding: Encoding;
    mount: string;
    ref: string;
    use_latest: boolean;
};
/**
 * Data to export after computation
 */
export declare type Export = {
    encoding: Encoding;
    mount: string;
};
/**
 * Signals that trigger an execution
 */
export declare type FunctionTriggers = {
    http: boolean;
    message?: Record<string, unknown>[];
};
/**
 * Properties of the execution environment
 */
export declare type FunctionEnvironment = {
    reproducible: boolean;
    internet: boolean;
    aleph_api: boolean;
    shared_cache: boolean;
};
/**
 * System resources required
 */
export declare type MachineResources = {
    vcpus: number;
    memory: number;
    seconds: number;
};
/**
 * Execution runtime (rootfs with Python interpreter)
 */
export declare type FunctionRuntime = {
    ref: string;
    use_latest: boolean;
    comment: string;
};
export declare type AbstractVolume = {
    comment?: string[];
    mount?: string[];
    is_read_only: () => boolean;
};
/**
 * Immutable volumes contain extra files that can be used by a program and are stored on the Aleph network.
 * They can be shared by multiple programs and updated independently of the code of the program.
 *
 * You can use them to store Python libraries that your program depends on,
 * use them in multiple programs and update them independently of other programs.
 */
export declare type ImmutableVolume = AbstractVolume & {
    ref: string;
    use_latest: boolean;
    is_read_only: () => true;
};
/**
 * Ephemeral volumes provide temporary disk storage to a VM during its execution without requiring more memory.
 */
export declare type EphemeralVolume = AbstractVolume & {
    ephemeral: true;
    size_mib: number;
    is_read_only: () => false;
};
export declare enum VolumePersistence {
    host = "host",
    store = "store"
}
/**
 * Host persistent volumes are empty volumes that your program can use to store information that,
 * would be useful to persist between executions but can be recovered from other sources.
 *
 * There is no guarantee that these volumes will not be deleted anytime,
 * when the program is not running and important data must be persisted on the Aleph network.
 */
export declare type PersistentVolume = AbstractVolume & {
    persistence: VolumePersistence;
    name: string;
    size_mib: number;
    is_read_only: () => false;
};
export declare type MachineVolume = ImmutableVolume | EphemeralVolume | PersistentVolume;
export declare type ProgramContent = BaseContent & {
    type: MachineType;
    allow_amend: boolean;
    code: CodeContent;
    variables?: {
        [key: string]: string;
    };
    data?: DataContent;
    export?: Export;
    on: FunctionTriggers;
    environment: FunctionEnvironment;
    resources: MachineResources;
    runtime: FunctionRuntime;
    volumes: MachineVolume[];
    replaces?: string;
};
