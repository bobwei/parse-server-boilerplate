const fn = definitions => env =>
  Object.keys(definitions).reduce((config, key) => {
    const value = env[definitions[key].env] || definitions[key].default;
    if (value !== undefined) {
      return {
        ...config,
        [key]: value,
      };
    }
    return config;
  }, {});

export default fn;
