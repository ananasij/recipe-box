var React = require('react');

var Recipe = React.createClass({
    getInitialState: function() {
        return {
            view: 'collapsed',
            recipe: this.props.source
        };
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

    displayTitle: function() {
        var titleText = this.state.recipe.name;
        var titleBlock = (
            <div className="recipe-title"
                 onClick={this.switchRecipeView}>
                {titleText}
            </div>
        );
        var titleView;
        if (this.state.recipe.view === 'collapsed') {
            titleView = titleBlock;
        } else if (this.state.recipe.view === 'expanded') {
            titleView = (
                <div>
                    {titleBlock}
                    <i className="fa fa-pencil icon" aria-hidden="true" title="Edit"
                       onClick={this.editRecipe}> </i>
                    <i className="fa fa-trash-o icon" aria-hidden="true" title="Delete this recipe"
                       onClick={this.deleteRecipe}> </i>
                </div>
            );
        } else if (this.state.recipe.view === 'edit') {
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
        if (this.state.recipe.view === 'expanded') {
            ingredientsView = (
                <ul>
                    {buildIngredientsList(ingredientsText)}
                </ul>
            );
        } else if (this.state.recipe.view === 'edit') {
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
            return ingredients.split(',').map(function(ingredient, index) {
                return (
                    <li key={index}>- {ingredient}</li>
                );
            });
        }
    },

    displayComments: function() {
        var commentsText = this.state.recipe.comments;
        var commentsView = null;
        if (this.state.recipe.view === 'expanded' && commentsText) {
            commentsView = commentsText;
        } else if (this.state.recipe.view === 'edit') {
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
