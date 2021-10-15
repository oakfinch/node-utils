export const JAVA_BIN = 'java' as const;
export const JAVA_FLAGS = ['-jar'] as const;
export const MACOS_GET_JAVA_HOME = '/usr/libexec/java_home' as const;
export const MACOS_GET_JAVA_HOME_VERSION_FLAG = '-v' as const;
export const COMMAND_VERSION = 'java -version 2>&1' as const;
export const VERSION_DELIMITER = '.' as const;
export const VERSION_DEFAULT = 0 as const;
export const ERROR_CANT_PARSE = 'Could not parse version string' as const;
export const REGEX_VERSION = /[^ ]* version "([^"]*)" .*/;
export const VERSION_FORMAT = {
  MAJOR: 'major',
  FULL: 'full',
} as const;
