var React = require('react');

var RecipeList = React.createClass({
    buildList: function() {
        var rawList = this.props.recipes;
        var listToRender = [];
        rawList.map(function(recipe) {
            var ingredientsList = [];
            recipe.ingredients.map(function(ingredient) {
                ingredientsList.push(
                    <li>- {ingredient}</li>
                );
            });
            listToRender.push(
                <div className="container-fluid recipe">
                    <div className="row recipe-title">
                        {recipe.name}
                    </div>
                    <div className="row recipe-ingredients-list">
                        <ul>
                            {ingredientsList}
                        </ul>
                    </div>
                    <div className="row">
                        {recipe.comments}
                    </div>
                </div>
            );
        });
        return listToRender;
    },

    render: function() {
        return (
            <div className="container-fluid">
                {this.buildList()}
            </div>
        );
    }
});

module.exports = RecipeList;
