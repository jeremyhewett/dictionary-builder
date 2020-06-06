const handlebars = require('handlebars');

handlebars.registerHelper('escape', text => text.replace(/"/g, "\\\""));
handlebars.registerPartial("args", "{{#each args}}{{name}}: {{type}}{{#unless @last}},{{/unless}}{{/each}}");

const type = `
{{#if description}}"{{escape description}}"{{/if}}
type {{name}} {
  {{#each fields}}
  {{#if description}}"{{escape description}}"{{/if}}
  {{name}}{{#if args}}({{> args}}){{/if}}: {{type}}
  {{/each}}
}
`;

const input = `
{{#if description}}"{{escape description}}"{{/if}}
input {{name}} {
  {{#each fields}}
  {{#if description}}"{{escape description}}"{{/if}}
  {{name}}: {{type}}
  {{/each}}
}
`;

module.exports = {
  type: handlebars.compile(type, { noEscape: true }),
  input: handlebars.compile(input, { noEscape: true })
};
