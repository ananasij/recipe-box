var React = require('react');

var Recipe = React.createClass({
    buildRecipe: function() {
        var recipe = this.props.source;
        return (
            <div className="container-fluid recipe">
                <div className="row recipe-title">
                    {recipe.name}
                </div>
                <div className="row recipe-ingredients-list">
                    <ul>
                        {buildIngredientsList(recipe.ingredients)}
                    </ul>
                </div>
                <div className="row">
                    {recipe.comments}
                </div>
            </div>
        );

        function buildIngredientsList(ingredients) {
            var ingredientsList = [];
            ingredients.map(function(ingredient) {
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
