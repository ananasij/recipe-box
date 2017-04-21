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
            this.setState({ recipes: JSON.parse(localStorage.recipeBox) });
        } else {
            localStorage.setItem('recipeBox', JSON.stringify(this.state.recipes));
        }
    },

    componentDidUpdate: function() {
        localStorage.setItem('recipeBox', JSON.stringify(this.state.recipes));
    },

    updateRecipe: function(updatedRecipe) {
        var updatedRecipes = this.state.recipes.map(function(recipe) {
            if (recipe.key === updatedRecipe.key) {
                return updatedRecipe;
            }
            return Object.assign({}, recipe);
        });
        this.setState({ recipes: updatedRecipes });
    },

    deleteRecipe: function(recipeToDelete) {
        var recipes = this.state.recipes;
        var i = recipes.indexOf(recipeToDelete);
        recipes = recipes.slice(0, i).concat(recipes.slice(i + 1, recipes.length));
        this.setState({ recipes: recipes });
    },

    render: function() {
        var onSave = this.updateRecipe;
        var onDelete = this.deleteRecipe;
        var recipeList = this.state.recipes.map(function(recipe) {
            return (
                <Recipe key = {recipe.key}
                        source={recipe}
                        onSave={onSave}
                        onDelete={onDelete} />
            );
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
