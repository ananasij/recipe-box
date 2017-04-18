var React = require('react');

var Recipe = React.createClass({
    getInitialState: function() {
        return {
            view: 'collapsed',
            recipe: this.props.source
        };
    },

    switchRecipeView: function() {
        if (this.state.view === 'collapsed') {
            this.setState({ view: 'expanded' });
        } else {
            this.setState({ view: 'collapsed' });
        }
    },

    editRecipe: function() {
        this.setState({ view: 'edit' });
        return true;
    },

    updateRecipe: function(e) {
        var name = e.target.getAttribute('data-field');
        var value = e.target.value;
        var recipeNew = this.state.recipe;
        recipeNew[name] = value;
        this.setState({ recipe: recipeNew });
        return true;
    },

    saveRecipe: function() {
        this.setState({ view: 'expanded' });
        this.props.onSave(this.state.recipe);
        return true;
    },

    deleteRecipe: function() {
        this.props.onDelete(this.state.recipe);
        return true;
    },

    displayTitle: function() {
        var titleText = this.state.recipe.name;
        var titleBlock = (
            <div className="recipe-title"
                 onClick={this.switchRecipeView}>
                {titleText}
            </div>
        );
        var titleView;
        if (this.state.view === 'collapsed') {
            titleView = titleBlock;
        } else if (this.state.view === 'expanded') {
            titleView = (
                <div>
                    {titleBlock}
                    <i className="fa fa-pencil icon" aria-hidden="true" title="Edit"
                       onClick={this.editRecipe}> </i>
                    <i className="fa fa-trash-o icon" aria-hidden="true" title="Delete this recipe"
                       onClick={this.deleteRecipe}> </i>
                </div>
            );
        } else if (this.state.view === 'edit') {
            titleView = (
                <div>
                    <input type="text" className="form-control title-input"
                           data-field="name"
                           value={titleText}
                           onChange={this.updateRecipe}
                    />
                    <i className="fa fa-check icon" aria-hidden="true" title="Save changes"
                       onClick={this.saveRecipe}> </i>
                    <i className="fa fa-trash-o icon" aria-hidden="true" title="Delete this recipe"
                       onClick={this.deleteRecipe}> </i>
                </div>
            );
        }
        return (<div className="row">
            {titleView}
        </div>);
    },

    displayIngredients: function() {
        var ingredientsText = this.state.recipe.ingredients;
        var ingredientsView = null;
        if (this.state.view === 'expanded') {
            ingredientsView = (
                <ul>
                    {buildIngredientsList(ingredientsText)}
                </ul>
            );
        } else if (this.state.view === 'edit') {
            ingredientsView = (
                <div>
                    <span className="help-block">Ingredients should be comma-separated.</span>
                    <textarea className="form-control" rows="2"
                              value={ingredientsText}
                              data-field="ingredients"
                              onChange={this.updateRecipe}>
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
            var ingredientsArray = ingredients.split(',');
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

    displayComments: function() {
        var commentsText = this.state.recipe.comments;
        var commentsView = null;
        if (this.state.view === 'expanded' && commentsText) {
            commentsView = commentsText;
        } else if (this.state.view === 'edit') {
            commentsView = (
                <textarea className="form-control" rows="2"
                          defaultValue={commentsText}
                          data-field="comments"
                          onChange={this.updateRecipe}>
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

module.exports = Recipe;
