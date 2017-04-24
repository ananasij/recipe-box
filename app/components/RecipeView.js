var React = require('react');

var RecipeView = React.createClass({

    displayTitle: function() {
        var icons = '';
        if (this.props.source.view === 'expanded') {
            icons = (
                <div className="recipe-icons">
                    <i className="fa fa-pencil icon"
                       aria-hidden="true"
                       title="Edit"
                       onClick={this.props.onEdit}> </i>
                    <i className="fa fa-trash-o icon"
                       aria-hidden="true"
                       title="Delete this recipe"
                       onClick={this.props.onDelete}> </i>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="recipe-title"
                     onClick={this.props.onViewSwitch}>
                    {this.props.source.name}
                </div>
            {icons}
            </div>
        );
    },

    displayIngredients: function() {
        if (this.props.source.view === 'expanded') {
            var ingredients = this.props.source.ingredients
                .split(',')
                .map(function(ingredient, index) {
                    return (
                        <li key={index}>- {ingredient}</li>
                    );
                });
            return (
                <div className="row recipe-ingredients-list">
                    <ul> {ingredients} </ul>
                </div>
            );
        }
        return '';
    },

    displayComments: function() {
        if (this.props.source.view === 'expanded' && this.props.source.comments) {
            return (
                <div className="row">
                    {this.props.source.comments}
                </div>
            );
        }
        return '';
    },

    render: function() {
        return (
            <div className="container-fluid recipe">
                {this.displayTitle()}
                {this.displayIngredients()}
                {this.displayComments()}
            </div>
        );
    }
});

module.exports = RecipeView;
