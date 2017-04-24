var React = require('react');
var RecipeBoxView = require('./RecipeBoxView');

var App = React.createClass({
    getInitialState: function() {
        return {
            recipes: [
                {
                    key: '1',
                    name: 'Greek salad',
                    ingredients: 'Tomatoes, Cucumbers, Black Olives, Feta cheese',
                    comments: 'Cut, mix, add some olive oil.',
                    view: 'collapsed'
                },
                {
                    key: '2',
                    name: 'Tuna salad',
                    ingredients: 'Tomatoes, Black olives, Canned tuna, Rocket salad',
                    comments: 'Cut, mix, add some olive oil.',
                    view: 'collapsed'
                },
                {
                    key: '3',
                    name: 'Cheese sandwich',
                    ingredients: 'Bread, Cheese',
                    comments: '',
                    view: 'collapsed'
                },
                {
                    key: '4',
                    name: 'Tuna salad',
                    ingredients: 'Tomatoes, Black olives, Canned tuna, Rocket salad',
                    comments: 'Cut, mix, add some olive oil.',
                    view: 'collapsed'
                },
                {
                    key: '5',
                    name: 'Cheese sandwich',
                    ingredients: 'Bread, Cheese',
                    comments: '',
                    view: 'collapsed'
                }
            ]
        };
    },

    componentWillMount: function() {
        if (localStorage.recipeBox) {
            this.setState({ recipes: JSON.parse(localStorage.recipeBox) });
        } else {
            this.updateLocalStorage();
        }
    },

    updateLocalStorage: function() {
        localStorage.setItem('recipeBox', JSON.stringify(this.collapseAllRecipes(this.state.recipes)));
    },

    updateRecipe: function(updatedRecipe) {
        var updatedRecipes = this.state.recipes.map(function(recipe) {
            if (recipe.key === updatedRecipe.key) {
                return updatedRecipe;
            }
            return Object.assign({}, recipe);
        });
        this.setState({ recipes: updatedRecipes }, this.updateLocalStorage);
    },

    deleteRecipe: function(recipeToDelete) {
        var recipes = this.state.recipes;
        this.state.recipes.forEach(function(recipe, i) {
            if (recipe.key === recipeToDelete.key) {
                recipes = recipes.slice(0, i).concat(recipes.slice(i + 1, recipes.length));
            }
        });
        this.setState({ recipes: recipes }, this.updateLocalStorage);
    },

    createRecipe: function() {
        var newKey = getLastKey(this.state.recipes) + 1;
        var updatedRecipes = [{
            key: newKey,
            name: 'New recipe scratch',
            ingredients: '',
            comments: '',
            view: 'edit'
        }].concat(this.state.recipes);
        this.setState({ recipes: updatedRecipes });

        function getLastKey(recipes) {
            var keys = [];
            recipes.map(function(recipe) {
                keys.push(recipe.key);
                return true;
            });
            return Math.max.apply(Math, keys);
        }
    },

    collapseAllRecipes: function() {
        return this.state.recipes.map(function(recipe) {
            return Object.assign({}, recipe, { view: 'collapsed' });
        });
    },

    updateIndexView: function(expandedRecipe) {
        var indexView = this.collapseAllRecipes(this.state.recipes).map(function(recipe) {
            if (recipe.key === expandedRecipe.key) {
                return expandedRecipe;
            }
            return recipe;
        });
        this.setState({ recipes: indexView });
    },

    render: function() {
        return (
            <RecipeBoxView
                recipes={this.state.recipes}
                onViewSwitch={this.updateIndexView}
                onSave={this.updateRecipe}
                onDelete={this.deleteRecipe}
                onCreateRecipe={this.createRecipe} />
        );
    }
});

module.exports = App;
