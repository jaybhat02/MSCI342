module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    }
};

module.exports = {
    moduleNameMapper: {
      "\\.(css|sass)$": "identity-obj-proxy",
    },
  };