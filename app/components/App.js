var React = require('react');
var Recipe = require('./Recipe');

var App = React.createClass({
    getInitialState: function() {
        return {
            recipes: [
                {
                    key: '1',
                    name: 'Greek salad',
                    ingredients: 'Tomatoes, Cucumbers, Black Olives, Feta cheese',
                    comments: 'Cut, mix, add some olive oil.'
                },
                {
                    key: '2',
                    name: 'Tuna salad',
                    ingredients: 'Tomatoes, Black olives, Canned tuna, Rocket salad',
                    comments: 'Cut, mix, add some olive oil.'
                },
                {
                    key: '3',
                    name: 'Cheese sandwich',
                    ingredients: 'Bread, Cheese',
                    comments: ''
                },
                {
                    key: '4',
                    name: 'Tuna salad',
                    ingredients: 'Tomatoes, Black olives, Canned tuna, Rocket salad',
                    comments: 'Cut, mix, add some olive oil.'
                },
                {
                    key: '5',
                    name: 'Cheese sandwich',
                    ingredients: 'Bread, Cheese',
                    comments: ''
                }
            ]
        };
    },

    componentWillMount: function() {
        if (localStorage.recipeBox) {
            this.setState( {recipes: JSON.parse(localStorage.recipeBox)})
        } else {
            localStorage.setItem('recipeBox', this.state.recipes);
        }
    },

    updateBox: function(updatedRecipe) {
        this.setState(updatedRecipe);
        localStorage.setItem('recipeBox', JSON.stringify(this.state.recipes));
    },

    render: function() {
        var recipeList = [];
        var onSave = this.updateBox;
        this.state.recipes.map(function(recipe) {
            recipeList.push(
                <Recipe source={recipe}
                        onSave={onSave}/>
            );
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
