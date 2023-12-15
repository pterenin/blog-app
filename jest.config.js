// jest.config.js
module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The test environment that will be used for testing
    testEnvironment: "jsdom",

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        "/node_modules/",
        "/public/"
    ],

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: "http://localhost",

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },

    // An array of regexp pattern strings that are matched against all source file paths before re-running tests in watch mode
    watchPathIgnorePatterns: [
        "/node_modules/",
        "/public/"
    ],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },

    // A preset that is used as a base for Jest's configuration
    preset: "react-app"
};
