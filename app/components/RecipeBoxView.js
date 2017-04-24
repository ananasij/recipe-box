var React = require('react');
var Recipe = require('./Recipe');

var RecipeBoxView = React.createClass({
    render: function() {
        var onSave = this.props.onSave;
        var onDelete = this.props.onDelete;
        var recipeList = this.props.recipes.map(function(recipe) {
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
                                onClick={this.props.onCreateRecipe}>
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

module.exports = RecipeBoxView;

