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

    componentDidUpdate: function() {
        localStorage.setItem('recipeBox', JSON.stringify(this.state.recipes));
    },

    updateRecipe: function(updatedRecipe) {
        this.setState(updatedRecipe);
    },

    deleteRecipe: function(recipeToDelete) {
        var recipes = this.state.recipes;
        var i = recipes.indexOf(recipeToDelete);
        recipes = recipes.slice(0,i).concat(recipes.slice(i + 1,recipes.length));
        this.setState({ recipes: recipes });
    },

    render: function() {
        var recipeList = [];
        var onSave = this.updateRecipe;
        var onDelete = this.deleteRecipe;
        this.state.recipes.map(function(recipe) {
            recipeList.push(
                <Recipe source={recipe}
                        onSave={onSave}
                        onDelete={onDelete} />
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
