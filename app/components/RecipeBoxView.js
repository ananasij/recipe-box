var React = require('react');
var Recipe = require('./Recipe');

var RecipeBoxView = React.createClass({
    getRecipesList: function() {
        var onViewSwitch = this.props.onViewSwitch;
        var onEditStart = this.props.onEditStart;
        var onSave = this.props.onSave;
        var onDelete = this.props.onDelete;
        return this.props.recipes.map(function(recipe) {
            return (
                <Recipe key={recipe.key}
                        source={recipe}
                        onViewSwitch={onViewSwitch}
                        onEditStart={onEditStart}
                        onSave={onSave}
                        onDelete={onDelete} />
            );
        });
    },

    getNewRecipeButton: function() {
        if (this.props.editMode) {
            return (
                <button className="btn new-recipe-btn"
                        onClick={this.props.onCreateRecipe}
                        disabled="disabled">
                    Add new recipe
                </button>
            );
        }
        return (
            <button className="btn new-recipe-btn"
                    onClick={this.props.onCreateRecipe}>
                Add new recipe
            </button>
        );
    },

    render: function() {
        return (
            <div className="container recipe-box">
                <div className="row header">
                    <div className="col-xs-12 col-sm-8">
                        <h2>Recipe box</h2>
                    </div>
                    <div className="col-xs-12 col-sm-4 btn-container">
                        {this.getNewRecipeButton()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-10">
                        {this.getRecipesList()}
                    </div>
                </div>


            </div>
        );
    }
});

module.exports = RecipeBoxView;

