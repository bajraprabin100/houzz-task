module.exports = (plop) => {
  // create your generators here
  plop.setGenerator('component', {
    description: 'Generator for components',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'name of component'
      }
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}.tsx',
        templateFile: 'templates/components/component.hbs'
      },
      {
        type: 'add',
        path: 'src/tests/{{pascalCase name}}.test.tsx',
        templateFile: 'templates/components/test.hbs'
      },
      {
        type: 'modify',
        path: 'src/components/index.ts',
        pattern: /(\/\/ EXPORT NEW COMPONENTS)/g,
        templateFile: 'templates/components/add-barrel.hbs'
      }
    ] // array of actions
  });
  plop.setGenerator('view', {
    description: 'Generator for views',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'name of view'
      },
      {
        type: 'confirm',
        name: 'isPrivate',
        message: 'Is this a Private View?'
      }
    ], // array of inquirer prompts
    actions: (data) => {
      return [
        {
          type: 'add',
          path: 'src/views/{{pascalCase name}}.tsx',
          templateFile: data.isPrivate ? 'templates/views/private-view.hbs' : 'templates/views/public-view.hbs'
        },
        {
          type: 'add',
          path: 'src/tests/{{pascalCase name}}.test.tsx',
          templateFile: 'templates/views/test.hbs'
        },
        {
          type: 'modify',
          path: 'src/views/index.ts',
          pattern: /(\/\/ EXPORT NEW VIEWS)/g,
          templateFile: 'templates/views/add-barrel.hbs'
        }
      ]; // array of actions
    }
  });
};
