var React = require('react');
var Recipe = require('./Recipe');

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
        var recipeList = [];
        this.state.recipes.map(function(recipe) {
            recipeList.push(<Recipe source={recipe}/>);
            return true;
        });
        return (
            <div className="container recipe-box">
                <h2>Recipe box</h2>
                {recipeList}
            </div>
        );
    }
});

module.exports = App;
