const Handlebars_members = require('../Handlebars.members');
const Handlebars = require("handlebars");
const variableForHandleBar =
{
    firstname: "Yehudaaaa", lastname: "Katzzzzz",
    specialChars: "& < > \" ' ` =" ,
    text: "Isn't this great?",
    person: {
      firstname: "Yehuda",
      lastname: "Katz",
    },
    persons: [
        { name: "Nils", age: 20 },
        { name: "Teddy", age: 10 },
        { name: "Nelson", age: 40 },
      ],
    people: [
        "Yehuda Katz",
        "Alan Johnson",
        "Charles Jolley",
      ],
      people_0: [
        {
            firstname: "Nils",
            lastname: "Knappmeier",
          },
          {
            firstname: "Yehuda",
            lastname: "Katz",
          },
          {
            firstname: "Alan",
            lastname: "Johnson",
          },
      ],
      prefix: "Hello",
      people_1: [
        { firstname: "Nils" },
        { firstname: "Yehuda" },
      ],
      comments: "COMMENT",
      array: [
        {
          item: "item1",
          "item-class": "class1",
        },
      ],
      true: "yes",
}
Handlebars.registerHelper('loud', function (aString) {
    return aString.toUpperCase()
})

Handlebars.registerPartial(
    "person", 
    "{{person.name}} is {{person.age}} years old.\n"
)
// Handlebars.registerHelper('loud_0', function(string) {
//    return string.toUpperCase()
// });

Handlebars.registerHelper('print_person', function () {
    return this.firstname + ' ' + this.lastname
})

Handlebars.registerHelper("list", function(items, options) {
    const itemsAsHtml = items.map(item => "<li>" + options.fn(item) + "</li>");
    return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
});

Handlebars.registerHelper("boldd", function(text) {
    var result = "<b>" + Handlebars.escapeExpression(text) + "</b>";
    return new Handlebars.SafeString(result);
});

exports.Handlebars_get_all = (req, res, next) =>
{
    console.log(Handlebars_members);
    res.render
    ('Utilities_for_layout',
    variableForHandleBar
    );
};
//Handlebars_Expressions_view
//Handlebars_Tutorial_view