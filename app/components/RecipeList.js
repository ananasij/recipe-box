var React = require('react');

var RecipeList = React.createClass({
    buildList: function() {
        var rawList = this.props.recipes;
        var listToRender = [];
        rawList.map(function(recipe) {
            listToRender.push(
                <div className="container">
                    <div className="row">
                        {recipe.name}
                    </div>
                    <div className="row">
                        {recipe.ingredients.join(', ')}
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