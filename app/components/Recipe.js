var React = require('react');

var Recipe = React.createClass({
    getInitialState: function() {
        return { view: 'collapsed' };
    },

    switchRecipeView: function() {
        if (this.state.view === 'collapsed') {
            this.setState({ view: 'expanded' });
        } else {
            this.setState({ view: 'collapsed' });
        }
    },

    buildRecipe: function() {
        var recipe = this.props.source;
        var recipeStructured;
        var title = (
            <div
                className="row recipe-title"
                onClick={this.switchRecipeView}>
                {recipe.name}
            </div>);
        var ingredients = (
            <div className="row recipe-ingredients-list">
                <ul>
                    {buildIngredientsList(recipe.ingredients)}
                </ul>
            </div>
        );
        var comments = recipe.comments ? (<div className="row">
            {recipe.comments}
        </div>) : '';

        if (this.state.view === 'collapsed') {
            recipeStructured = (
                <div className="container-fluid recipe">
                    {title}
                </div>
            );
        } else if (this.state.view === 'expanded') {
            recipeStructured = (
                <div className="container-fluid recipe">
                    {title}
                    {ingredients}
                    {comments}
                </div>
            );
        }
        return recipeStructured;

        function buildIngredientsList(ingredientsArray) {
            var ingredientsList = [];
            ingredientsArray.map(function(ingredient) {
                ingredientsList.push(
                    <li>- {ingredient}</li>
                );
                return true;
            });
            return ingredientsList;
        }
    },

    render: function() {
        return (
            <div className="container-fluid">
                {this.buildRecipe()}
            </div>
        );
    }
});

module.exports = Recipe;
