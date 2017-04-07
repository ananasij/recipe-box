var React = require('react');
var Recipe = require('Recipe');

var App = React.createClass({
    getInitialState: function() {
        return {
            recipes: [
                {
                    name: 'Greek salad',
                    ingredients: ['Tomatoes', 'Cucumbers', 'Black Olives', 'Feta cheese'],
                    comments: 'Cut, mix, add some olive oil.'
                },
                {
                    name: 'Tuna salad',
                    ingredients: ['Tomatoes', 'Black olives', 'Canned tuna', 'Rocket salad'],
                    comments: 'Cut, mix, add some olive oil.'
                },
                {
                    name: 'Cheese sandwich',
                    ingredients: ['Bread', 'Cheese'],
                    comments: ''
                }
            ]
        };
    },

    render: function() {
        return (
            <div>
                <Recipe />
                <Recipe />
                <Recipe />
            </div>
        );
    }
});

module.exports = App;
