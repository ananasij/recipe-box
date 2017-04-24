var React = require('react');

var RecipeEdit = React.createClass({

    displayTitle: function() {
        return (
            <div className="row">
                <input type="text"
                       className="form-control title-input"
                       data-field="name"
                       value={this.props.source.name}
                       onChange={this.props.onUpdate} />
                <i className="fa fa-check icon"
                   aria-hidden="true"
                   title="Save changes"
                   onClick={this.props.onSave}> </i>
                <i className="fa fa-trash-o icon"
                   aria-hidden="true"
                   title="Delete this recipe"
                   onClick={this.props.onDelete}> </i>
            </div>
        );
    },

    displayIngredients: function() {
        return (
            <div className="row recipe-ingredients-list">
                <div>
                    <span className="help-block">Enter a comma-separated list of ingredients.</span>
                    <textarea className="form-control"
                              rows="2"
                              value={this.props.source.ingredients}
                              data-field="ingredients"
                              onChange={this.props.onUpdate}>
                    </textarea>
                </div>
            </div>
        );
    },

    displayComments: function() {
        return (<div className="row">
            <textarea className="form-control"
                      rows="2"
                      defaultValue={this.props.source.comments}
                      data-field="comments"
                      onChange={this.props.onUpdate}>
            </textarea>
        </div>);
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

module.exports = RecipeEdit;
