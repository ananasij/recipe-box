var React = require('react');

var RecipeView = React.createClass({

    displayTitle: function() {
        var titleText = this.props.source.name;
        var titleBlock = (
            <div className="recipe-title"
                 onClick={this.props.onViewSwitch}>
                {titleText}
            </div>
        );
        var titleView;
        if (this.props.source.view === 'collapsed') {
            titleView = titleBlock;
        } else if (this.props.source.view === 'expanded') {
            titleView = (
                <div>
                    {titleBlock}
                    <i className="fa fa-pencil icon" aria-hidden="true" title="Edit"
                       onClick={this.props.onEdit}> </i>
                    <i className="fa fa-trash-o icon" aria-hidden="true" title="Delete this recipe"
                       onClick={this.props.onDelete}> </i>
                </div>
            );
        } else if (this.props.source.view === 'edit') {
            titleView = (
                <div>
                    <input type="text" className="form-control title-input"
                           data-field="name"
                           value={titleText}
                           onChange={this.props.onUpdate}
                        />
                    <i className="fa fa-check icon" aria-hidden="true" title="Save changes"
                       onClick={this.props.onSave}> </i>
                    <i className="fa fa-trash-o icon" aria-hidden="true" title="Delete this recipe"
                       onClick={this.props.onDelete}> </i>
                </div>
            );
        }
        return (<div className="row">
            {titleView}
        </div>);
    },

    displayIngredients: function() {
        var ingredientsText = this.props.source.ingredients;
        var ingredientsView = null;
        if (this.props.source.view === 'expanded') {
            ingredientsView = (
                <ul>
                    {buildIngredientsList(ingredientsText)}
                </ul>
            );
        } else if (this.props.source.view === 'edit') {
            ingredientsView = (
                <div>
                    <span className="help-block">Ingredients should be comma-separated.</span>
                    <textarea className="form-control" rows="2"
                              value={ingredientsText}
                              data-field="ingredients"
                              onChange={this.props.onUpdate}>
                        </textarea>
                </div>
            );
        }

        if (ingredientsView) {
            return (<div className="row recipe-ingredients-list">
                {ingredientsView}
            </div>);
        }
        return '';

        function buildIngredientsList(ingredients) {
            return ingredients.split(',').map(function(ingredient, index) {
                return (
                    <li key={index}>- {ingredient}</li>
                );
            });
        }
    },

    displayComments: function() {
        var commentsText = this.props.source.comments;
        var commentsView = null;
        if (this.props.source.view === 'expanded' && commentsText) {
            commentsView = commentsText;
        } else if (this.props.source.view === 'edit') {
            commentsView = (
                <textarea className="form-control" rows="2"
                          defaultValue={commentsText}
                          data-field="comments"
                          onChange={this.props.onUpdate}>
                </textarea>
            );
        }

        if (commentsView) {
            return (<div className="row">
                {commentsView}
            </div>);
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
