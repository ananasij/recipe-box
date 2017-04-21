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
        localStorage.setItem('recipeBox', JSON.stringify(this.state.recipes));
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
        this.setState({ recipes: updatedRecipes }, function() {
            console.log(this.state.recipes);
        });

        function getLastKey(recipes) {
            var keys = [];
            recipes.map(function(recipe) {
                keys.push(recipe.key);
                return true;
            });
            return Math.max.apply(Math, keys);
        }
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
                <div className="row header">
                    <div className="col-xs-12 col-sm-8">
                        <h2>Recipe box</h2>
                    </div>
                    <div className="col-xs-12 col-sm-4 btn-container">
                        <button className="btn new-recipe-btn"
                                onClick={this.createRecipe}>
                            Add new recipe
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-10">
                        {recipeList}
                    </div>
                </div>


            </div>
        );
    }
});

module.exports = App;
