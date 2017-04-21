var React = require('react');
var RecipeView = require('./RecipeView');

var Recipe = React.createClass({
    getInitialState: function() {
        return { recipe: this.props.source };
    },

    setRecipeView: function(view) {
        var updatedRecipe = Object.assign({}, this.state.recipe);
        updatedRecipe.view = view;
        return updatedRecipe;
    },

    switchRecipeView: function() {
        if (this.state.recipe.view === 'collapsed') {
            this.setState({ recipe: this.setRecipeView('expanded') });
        } else {
            this.setState({ recipe: this.setRecipeView('collapsed') });
        }
    },

    editRecipe: function() {
        this.setState({ recipe: this.setRecipeView('edit') });
    },

    updateRecipe: function(e) {
        var name = e.target.getAttribute('data-field');
        var recipeNew = Object.assign({}, this.state.recipe);
        recipeNew[name] = e.target.value;
        this.setState({ recipe: recipeNew });
    },

    saveRecipe: function() {
        this.setState({ recipe: this.setRecipeView('expanded') }, function() {
            this.props.onSave(this.state.recipe);
        });
    },

    deleteRecipe: function() {
        this.props.onDelete(this.state.recipe);
    },

    render: function() {
        return (
            <RecipeView
                source={this.state.recipe}
                onViewSwitch={this.switchRecipeView}
                onEdit={this.editRecipe}
                onUpdate={this.updateRecipe}
                onSave={this.saveRecipe}
                onDelete={this.deleteRecipe} />
        );
    }
});

module.exports = Recipe;
