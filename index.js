const rule = {
    create: (context) => {
        return {
            TemplateLiteral: (node) => {
                context.report( {
                    node,
                    message: "NOOP",
                    fix: (fixer) => node.quasis
                        .filter(q => q.type === 'TemplateElement')
                        .map(q => {
                            return fixer.replaceTextRange(q.range, q.value.raw)
                        })
                } );
            }
        }
    }
}

var RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester({ env: { es6: true } });
ruleTester.run("my-rule", rule, {
    valid: [],
    invalid: [
        {
            code: "console.log(`test`);",

            output: "console.log(`test`);",   //Throws `[ERR_ASSERTION]: Output is incorrect`
            //output: "console.log(`test`);", //Does not throw

            errors: [ { message: "NOOP" } ]
        }
    ]
});